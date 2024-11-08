import { build } from "bun";
import { join } from "path";

export async function buildServer({ deploymentId }) {
  const res = await build({
    entrypoints: ["./src/server/index.ts"],
    // minify: true,
    target: "node",
    conditions: ["server", "node", "server.node", "default"],
    outdir: `./app/out/${deploymentId}`,
    naming: "index.mjs",
  });

  const polyfill = `
  globalThis.process = {
  ...process,
  cwd: () => "/",
};
if (typeof import.meta.url === "undefined") {
  import.meta.url = "file:///index.js";
}
`;

  const outDir = join(process.cwd(), `./app/out/${deploymentId}`);
  const outFile = join(outDir, "index.mjs");

  const content = await Bun.file(outFile).text();

  const newContents = polyfill + content;

  await Bun.write(outFile, newContents);
}
