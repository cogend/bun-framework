import { copyFile } from "fs/promises";
import { join } from "path";

export async function copyAssetFiles({
  assets,
  clientAbsoluteDir,
  rscOutputs,
}) {
  await Promise.all([
    assets.map(async (path) => {
      const fileName = path.split("/").pop();
      return await copyFile(path, join(clientAbsoluteDir, fileName));
    }),
    rscOutputs
      .filter((output) => output.kind === "asset")
      .map((output) => output.path)
      .map(async (path) => {
        const fileName = path.split("/").pop();
        return await copyFile(path, join(clientAbsoluteDir, fileName));
      }),
  ]);
}
