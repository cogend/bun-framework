import { createBuildConfig } from "@/configs/create-build-config.ts";
import { createEntrypoints } from "@/files/create-entrypoints.ts";
import { createMaps } from "@/configs/create-maps.ts";
import { cleanupOutputFiles } from "@/files/cleanup-output-files.ts";
import { copyAssetFiles } from "@/files/copy-asset-files.ts";
import { saveDeploymentConfig } from "@/configs/save-deployment-config.ts";
import { processRoutes } from "@/processing/process-routes.ts";
import { renameModules } from "@/processing/rename-modules.ts";
import { processServerActions } from "@/processing/process-server-actions.ts";
import { checkLastDeployment } from "@/configs/check-last-deployment.ts";
import { rmdir } from "fs/promises";
import { buildRsc } from "@/builder/build-rsc.ts";
import { buildClient } from "@/builder/build-client.ts";
import { buildCss } from "@/builder/build-css.ts";
import { saveCssFiles } from "@/files/save-css-files.ts";
import { buildRoutes } from "@/builder/build-routes.ts";
import { processRouteHandlers } from "@/processing/process-route-handlers.ts";
import { installDependencies } from "@/files/install-dependencies.ts";
import { readdir, readFile, writeFile } from "fs/promises";
import { join } from "path";

export async function build({ deploymentId }) {
  console.log("start build, deploymentId: ", deploymentId);
  console.time("total build time");

  console.time("create build config");
  const config = createBuildConfig(deploymentId);
  const buildConfig = config.build;
  console.timeEnd("create build config");

  // delete out dir
  await rmdir(config.paths.out.absoluteDir, { recursive: true });

  console.time("check last deployment");
  const {
    newDeploymentId,
    newVersion,
    currentPackageJsonHash,
    packageJsonChanged,
  } = await checkLastDeployment({
    outDir: config.paths.out.absoluteDir,
    deploymentId,
    absoluteInputRootDir: config.paths.in.absoluteDir,
  });
  console.timeEnd("check last deployment");

  console.time("install dependencies");
  await installDependencies(config.paths.in.absoluteDir, packageJsonChanged);
  console.timeEnd("install dependencies");

  console.time("initial setup");
  const entrypoints = await createEntrypoints(config.paths.src.absoluteDir);
  console.timeEnd("initial setup");

  console.time("create maps");
  const {
    clientModuleIdMap: initialClientModuleIdMap,
    serverModuleIdMap: initialServerModuleIdMap,
    filesMap,
    serverActionIds: initialServerActionIds,
    deployment,
  } = await createMaps({ entrypoints });
  console.timeEnd("create maps");

  console.time("build operations");

  const ssrEntrypoints = [
    ...entrypoints.code,
    join(process.cwd(), "./src/server/index.ts"),
  ];

  console.time("run-build");
  const [ssr, client, rsc, css, routes]: any = await Promise.all([
    buildClient({
      ...buildConfig,
      type: "ssr",
      target: "node",
      // external: ["react"],
      entrypoints: ssrEntrypoints,
      outdir: config.paths.ssr.outDir,
      pluginArgs: {
        filesMap,
        serverActionIds: initialServerActionIds,
      },
      absoluteInputRootDir: config.paths.in.absoluteDir,
    }),
    buildClient({
      ...buildConfig,
      type: "client",
      target: "browser",
      entrypoints: entrypoints.code,
      outdir: config.paths.client.outDir,
      pluginArgs: {
        filesMap,
        serverActionIds: initialServerActionIds,
      },
    }),
    buildRsc({
      ...buildConfig,
      type: "rsc",
      conditions: ["react-server"],
      target: "node",
      entrypoints: entrypoints.entryCode,
      outdir: config.paths.rsc.outDir,
      pluginArgs: {
        absoluteInputRootDir: config.paths.in.absoluteDir,
        filesMap,
        clientModuleIdMap: initialClientModuleIdMap,
        serverModuleIdMap: initialServerModuleIdMap,
        serverActionIds: initialServerActionIds,
        absoluteSrcDir: config.paths.src.absoluteDir,
      },
    }),
    buildCss(entrypoints.css, config.paths.in.absoluteDir),
    buildRoutes({
      ...buildConfig,
      target: "node",
      type: "routes",
      splitting: false,
      entrypoints: entrypoints.routes,
      outdir: config.paths.handlers.absoluteDir,
    }),
  ]);
  console.timeEnd("run-build");

  console.timeEnd("build operations");

  if (!rsc.success || !ssr.success || !client.success) {
    console.error("build error: ", {
      rsc: rsc.success,
      ssr: ssr.success,
      client: client.success,
    });
  }

  const clientModuleIdMap = rsc.clientModuleIdMap;
  const serverModuleIdMap = rsc.serverModuleIdMap;
  const serverActionIds = rsc.serverActionIds;

  console.time("process routes and rename modules");
  const [
    cssFileNames,
    rscRoutes,
    ssrRoutes,
    clientSourceMap,
    serverSourceMap,
    routeHandlers,
    ssrSourceMap,
  ] = await Promise.all([
    saveCssFiles({
      css: css,
      cogendOutDir: config.paths.client.absoluteDir,
    }),
    processRoutes(rsc.outputs, config.paths.sourcemap.path),
    processRoutes(ssr.outputs, config.paths.sourcemap.path),
    renameModules(client.outputs, clientModuleIdMap, config.paths.sourcemap),
    renameModules(rsc.outputs, serverModuleIdMap, config.paths.sourcemap),
    processRouteHandlers(routes.outputs, config.paths.sourcemap.path),
    renameModules(ssr.outputs, clientModuleIdMap, config.paths.sourcemap),
  ]);
  console.timeEnd("process routes and rename modules");

  deployment["routes"] = { rsc: rscRoutes, ssr: ssrRoutes };
  deployment["bootstrapModules"] = [
    clientSourceMap
      .get("__cogend_client.tsx")
      .replace(`${config.paths.client.absoluteDir}/`, ""),
  ];

  console.time("process server actions");
  const serverActionIdMap = await processServerActions(
    serverSourceMap,
    serverActionIds,
    config.paths.src.absoluteDir
  );
  console.timeEnd("process server actions");
  deployment["serverActionIdMap"] = serverActionIdMap;

  console.time("final operations");
  await Promise.all([
    copyAssetFiles({
      assets: entrypoints.assets,
      clientAbsoluteDir: config.paths.client.absoluteDir,
      rscOutputs: rsc.outputs,
    }),
    saveDeploymentConfig({
      outDir: config.paths.out.absoluteDir,
      newDeploymentId,
      newVersion,
      currentPackageJsonHash,
      deployment,
      cssFileNames,
      routeHandlers,
    }),
    (async () => {
      const mainServerFile = ssrSourceMap.get("src/server/index.ts");
      const content = await Bun.file(mainServerFile).text();

      const polyfill = `
      globalThis.process = {
      ...process,
      cwd: () => "/",
    };
    if (typeof import.meta.url === "undefined") {
      import.meta.url = "file:///index.js";
    }
    `;

      const newContents = polyfill + content;

      const outDir = join(process.cwd(), `./app/out/${deploymentId}`);
      const outFile = join(outDir, "index.mjs");
      await Bun.write(outFile, newContents);
    })(),
  ]);
  console.timeEnd("final operations");

  const serverDir = config.paths.handlers.absoluteDir;
  const files = await readdir(serverDir);
  for (const file of files) {
    const filePath = join(serverDir, file);
    const fileName = filePath.split("/").pop();
    const content = await readFile(filePath, "utf8");
    const updatedContent = content.replace(
      /import\.meta\.url/g,
      `"file://${fileName}"`
    );
    await writeFile(filePath, updatedContent);
  }

  console.time("cleanup output files");
  await cleanupOutputFiles(config.paths.out.absoluteDir);
  console.timeEnd("cleanup output files");

  console.timeEnd("total build time");
}
