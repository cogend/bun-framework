import { join } from "path";

export async function processServerActions(
  serverSourceMap,
  serverActionIds,
  absoluteSrcDir
) {
  const serverActionIdMap = {};

  await Promise.all(
    Array.from(Object.entries(serverActionIds)).map(
      async ([filePath, actions]) => {
        const lookupPath = filePath.replace(join(absoluteSrcDir, "/"), "");

        const serverSourcePath = serverSourceMap.get(lookupPath);

        if (serverSourcePath) {
          const serverFileName = serverSourcePath.split("/").pop();
          Object.entries(actions).forEach(([actionName, actionId]) => {
            serverActionIdMap[actionId] = `${serverFileName}#${actionName}`;
          });
        }
      }
    )
  );

  return serverActionIdMap;
}
