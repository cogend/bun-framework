export async function createMaps({ entrypoints }) {
  const clientModuleIdMap = {};
  const serverModuleIdMap = {};
  const filesMap = {};
  const serverActionIds = {};
  const clientComponentsPaths = [];

  const deployment = {
    routes: null,
  };

  const transpiler = new Bun.Transpiler({
    loader: "tsx",
  });

  await Promise.all(
    entrypoints.code.map(async (path) => {
      const code = await Bun.file(path).text();
      const transpiled = await transpiler.transform(code);

      const isClientComponent = transpiled.startsWith(`"use client";`);
      const isServerComponent = transpiled.startsWith(`"use server";`);

      if (isClientComponent) {
        clientComponentsPaths.push(path);
      }

      const fileId = `${Bun.hash(transpiled).toString(16).slice(0, 8)}`;
      const { exports } = transpiler.scan(code);
      filesMap[path] = {
        id: fileId,
        code,
        transpiled,
        exports,
        isClientComponent,
        isServerComponent,
      };

      if (isServerComponent) {
        exports.forEach((exportName) => {
          serverActionIds[path] = {
            ...serverActionIds[path],
            [exportName]: `${Bun.hash(`${fileId}#${exportName}`)
              .toString(16)
              .slice(0, 8)}`,
          };
        });
      }
    })
  );

  return {
    clientModuleIdMap,
    serverModuleIdMap,
    filesMap,
    serverActionIds,
    clientComponentsPaths,
    deployment,
  };
}
