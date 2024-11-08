import { readdir } from "fs/promises";
import { join, parse } from "path";

const inDir = "./src/packages/in";
const outDir = "./src/server/_packages";
async function buildSsrPackages() {
  try {
    const rscFile = "react-server-dom-esm-client.ts";
    await buildPackages([rscFile], "ssr");
  } catch (error) {
    console.error("Error building RSC packages:", error);
    process.exit(1);
  }
}

async function buildRscPackages() {
  try {
    const files = await readdir(inDir);
    const tsFiles = files.filter(
      (file) =>
        file.endsWith(".ts") && file !== "react-server-dom-esm-client.ts"
    );
    await buildPackages(tsFiles, "rsc");
  } catch (error) {
    console.error("Error building SSR packages:", error);
    process.exit(1);
  }
}

async function buildPackages(files: string[], type: "rsc" | "ssr") {
  for (const file of files) {
    const { name } = parse(file);
    const entrypoint = join(inDir, file);

    const result = await Bun.build({
      entrypoints: [entrypoint],
      outdir: outDir,
      naming: `${name}.js`,
      minify: true,
      format: "esm",
      target: type === "ssr" ? "browser" : "node",
      external: type === "ssr" ? ["react"] : [],
      conditions: type === "rsc" ? ["react-server"] : [],
    });

    if (!result.success) {
      console.error(`Build failed for ${file}:`);
      for (const message of result.logs) {
        console.error(message);
      }
    } else {
      console.log(`Successfully built ${file} to ${outDir}/${name}.js`);

      let content = await Bun.file(`${outDir}/${name}.js`).text();

      ["async_hooks", "util", "crypto"].forEach((pkg) => {
        content = content.replace(`"${pkg}"`, `"node:${pkg}"`);
      });

      await Bun.write(`${outDir}/${name}.js`, content);
    }
  }
}

await Promise.all([buildRscPackages(), buildSsrPackages()]);
