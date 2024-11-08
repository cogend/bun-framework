import { join } from "path";

export function createRscPlugin({
  filesMap,
  clientModuleIdMap,
  serverModuleIdMap,
  serverActionIds,
  absoluteSrcDir,
}: {
  filesMap: Record<string, any>;
  clientModuleIdMap: Record<string, string>;
  serverModuleIdMap: Record<string, string>;
  serverActionIds: Record<string, Record<string, string>>;
  absoluteSrcDir: string;
}) {
  const rscPlugin = {
    name: "cogend-rsc",
    setup(build) {
      build.onLoad({ filter: /\.tsx?$/ }, (args) => {
        const { code, exports, id, isClientComponent, isServerComponent } =
          filesMap[args.path];

        if (isClientComponent) {
          clientModuleIdMap[id] = args.path.replace(
            join(absoluteSrcDir, "/"),
            ""
          );

          console.log("isClientComponent", id, clientModuleIdMap[id]);

          const newCode = exports
            .map((exportName) => {
              if (exportName === "default") {
                return `export default __cogend_proxy["${exportName}"];`;
              } else {
                return `export const ${exportName} = __cogend_proxy["${exportName}"];`;
              }
            })
            .join("\n");

          const contents = `
import { createClientModuleProxy } from "react-server-dom-webpack/server.edge";

const __cogend_proxy = createClientModuleProxy("${id}.js");

${newCode}
`;
          return { contents };
        } else if (isServerComponent) {
          serverModuleIdMap[id] = args.path.replace(
            join(absoluteSrcDir, "/"),
            ""
          );
          const newCode = exports
            .map(
              (exportName) =>
                `registerServerReference(${exportName}, "${
                  serverActionIds[args.path][exportName]
                }", "${exportName}");`
            )
            .join("\n");

          return {
            contents: `
import { registerServerReference } from "react-server-dom-esm/server.node";

${code}

${newCode}
`.trim(),
          };
        }
      });
    },
  };

  return rscPlugin;
}
