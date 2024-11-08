import { createRscPlugin } from "../plugins/rsc.js";

export async function buildRsc(config) {
  console.time(`${config.type}-build`);

  const {
    filesMap,
    clientModuleIdMap,
    serverModuleIdMap,
    serverActionIds,
    absoluteSrcDir,
    absoluteInputRootDir,
  } = config.pluginArgs;

  const build = await Bun.build({
    ...config,
    plugins: [
      createRscPlugin({
        filesMap,
        clientModuleIdMap,
        serverModuleIdMap,
        serverActionIds,
        absoluteSrcDir,
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
