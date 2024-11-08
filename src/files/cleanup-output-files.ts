import { readdir, unlink } from "fs/promises";
import { join } from "path";

export async function cleanupOutputFiles(outDir: string) {
  const absoluteOutDir = outDir;
  const outFiles = await readdir(absoluteOutDir, {
    recursive: true,
  });

  const mapFiles = outFiles.filter((file) => file.endsWith(".js.map"));
  const jsFiles = outFiles.filter((file) => file.endsWith(".js"));

  async function removeJsMapFile(file: string) {
    const path = join(absoluteOutDir, file);
    await unlink(path);
  }

  async function cleanJsFile(file: string) {
    const path = join(absoluteOutDir, file);
    const content = await Bun.file(path).text();
    const newContent = content.replace(/^\s*\/\/# debugId=.*\n/gm, "");
    await Bun.write(path, newContent);
  }

  async function removeJsMapFiles() {
    await Promise.all(mapFiles.map((file) => removeJsMapFile(file)));
  }

  async function cleanJsFiles() {
    await Promise.all(jsFiles.map((file) => cleanJsFile(file)));
  }

  await Promise.all([removeJsMapFiles(), cleanJsFiles()]);
}
