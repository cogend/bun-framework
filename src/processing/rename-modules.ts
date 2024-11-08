import { copyFile } from "fs/promises";

export async function renameModules(outputs, moduleIdMap, sourcemapPath) {
  const sourcePathToHashedPathMap = new Map<string, string>();

  await Promise.all(
    outputs.map(async (output) => {
      if (output.sourcemap) {
        const sourcesLine = await readThirdLine(output.sourcemap.path);
        const sources = JSON.parse(
          sourcesLine.split(": ")[1].trim().slice(0, -1)
        );

        sources.forEach((source) => {
          if (source.startsWith(`${sourcemapPath.path}/src/`)) {
            sourcePathToHashedPathMap.set(
              source.replace(`${sourcemapPath.path}/src/`, ""),
              output.path
            );
          } else if (source.startsWith(`${sourcemapPath.nodeModulesPath}/`)) {
            sourcePathToHashedPathMap.set(
              source.replace(`${sourcemapPath.nodeModulesPath}/`, ""),
              output.path
            );
          } else if (source === "../../../../src/server/index.ts") {
            sourcePathToHashedPathMap.set(
              source.replace("../../../../", ""),
              output.path
            );
          }
        });
      }
    })
  );

  await Promise.all(
    Object.entries(moduleIdMap).map(async ([key, value]: any) => {
      let path = sourcePathToHashedPathMap.get(value);
      if (!path) {
        path = sourcePathToHashedPathMap.get(value.split("/node_modules/")[1]);

        if (!path) {
          console.log("no path", value);
          return;
        }
      }

      const currentPathFileName = path.split("/").pop().replace(".js", "");
      const newPath = path.replace(currentPathFileName, key);

      try {
        await copyFile(path, newPath);
      } catch (error) {
        console.error(
          `Error renaming ${path} to ${newPath}`,
          {
            key,
            value,
            moduleIdMap,
            sourcePathToHashedPathMap,
          },
          error
        );
      }

      return [key, value];
    })
  );

  return sourcePathToHashedPathMap;
}

async function readThirdLine(filePath: string): Promise<string> {
  const file = Bun.file(filePath);
  const reader = file.stream().getReader();
  let lineCount = 0;
  let thirdLine = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = new TextDecoder().decode(value);
    const lines = chunk.split("\n");

    for (const line of lines) {
      lineCount++;
      if (lineCount === 3) {
        thirdLine = line;
        reader.releaseLock();
        return thirdLine;
      }
    }
  }

  throw new Error("File does not have a third line");
}
