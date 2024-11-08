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
  const config = createBuildConfig(deploymentId);
  const buildConfig = config.build;

  // delete out dir
  await rmdir(config.paths.out.absoluteDir, { recursive: true });

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

  await installDependencies(config.paths.in.absoluteDir, packageJsonChanged);

  const entrypoints = await createEntrypoints(config.paths.src.absoluteDir);

  const {
    clientModuleIdMap: initialClientModuleIdMap,
    serverModuleIdMap: initialServerModuleIdMap,
    filesMap,
    serverActionIds: initialServerActionIds,
    deployment,
  } = await createMaps({ entrypoints });

  const [ssr, client, rsc, routes]: any = await Promise.all([
    buildClient({
      ...buildConfig,
      type: "ssr",
      target: "node",
      external: ["react"],
      entrypoints: entrypoints.serverEntryCode,
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
      entrypoints: entrypoints.code,
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
    buildRoutes({
      ...buildConfig,
      target: "node",
      type: "routes",
      splitting: false,
      entrypoints: entrypoints.routes,
      outdir: config.paths.handlers.absoluteDir,
    }),
  ]);

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

  const [
    rscRoutes,
    ssrRoutes,
    clientSourceMap,
    serverSourceMap,
    routeHandlers,
    ssrSourceMap,
  ] = await Promise.all([
    processRoutes(rsc.outputs, config.paths.sourcemap.path),
    processRoutes(ssr.outputs, config.paths.sourcemap.path),
    renameModules(client.outputs, clientModuleIdMap, config.paths.sourcemap),
    renameModules(rsc.outputs, serverModuleIdMap, config.paths.sourcemap),
    processRouteHandlers(routes.outputs, config.paths.sourcemap.path),
    renameModules(ssr.outputs, clientModuleIdMap, config.paths.sourcemap),
  ]);

  deployment["routes"] = { rsc: rscRoutes, ssr: ssrRoutes };
  deployment["bootstrapModules"] = [
    clientSourceMap
      .get("__cogend_client.tsx")
      .replace(`${config.paths.client.absoluteDir}/`, ""),
  ];

  const serverActionIdMap = await processServerActions(
    serverSourceMap,
    serverActionIds,
    config.paths.src.absoluteDir
  );
  deployment["serverActionIdMap"] = serverActionIdMap;

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
      routeHandlers,
    }),
  ]);

  await cleanupOutputFiles(config.paths.out.absoluteDir);
}
