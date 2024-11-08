import { createCreateServerReferencesPlugin } from "../plugins/create-server-references.js";
import { join } from "path";

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
      config.type === "ssr"
        ? {
            name: "ssr",
            async setup(build) {
              build.onResolve({ filter: /.*/ }, async (args) => {
                if (args.path === "react") {
                  return {
                    path: join(
                      config.absoluteInputRootDir,
                      "node_modules/react/index.js"
                    ),
                  };
                } else if (args.path === "react-dom") {
                  return {
                    path: join(
                      config.absoluteInputRootDir,
                      "node_modules/react-dom/index.js"
                    ),
                  };
                }
              });
            },
          }
        : [],
    ].flat(),
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
