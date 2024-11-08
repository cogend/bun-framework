import { join } from "path";
import { readFile } from "fs/promises";

export const getDeploymentConfig = async (absoluteOutDir: string) => {
  const path = join(absoluteOutDir, "manifest.json");
  const file = await readFile(path, "utf8");
  const config = JSON.parse(file);

  return config;
};
