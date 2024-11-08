import { createCreateServerReferencesPlugin } from "../plugins/create-server-references.js";

export async function buildClient(config) {
  console.time(`${config.type}-build`);

  const { filesMap, clientModuleIdMap, serverModuleIdMap, serverActionIds } =
    config.pluginArgs;

  const build = await Bun.build({
    ...config,
    plugins: [
      createCreateServerReferencesPlugin({
        filesMap,
        serverActionIds,
        type: config.type,
      }),
    ],
  });

  if (!build.success) {
    console.error(build);
  }

  console.timeEnd(`${config.type}-build`);

  return {
    success: build.success,
    outputs: build.outputs,
    clientModuleIdMap,
    serverModuleIdMap,
    serverActionIds,
  };
}
