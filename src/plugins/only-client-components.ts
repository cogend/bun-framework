import { Transpiler } from "bun";

export function createOnlyClientComponentsPlugin({
  filesMap,
}: {
  filesMap: Record<string, any>;
}) {
  const transpiler = new Transpiler({ loader: "tsx" });

  return {
    name: "only-client-components",
    setup(build) {
      build.onLoad({ filter: /\.tsx?$/ }, async (args) => {
        const { isClient } = filesMap[args.path];

        if (!isClient) {
          const source = await Bun.file(args.path).text();
          const imports = transpiler.scanImports(source);
          const importStatements = imports
            .map((imp) =>
              imp.kind === "import-statement"
                ? `import "${imp.path}";`
                : imp.kind === "require-call"
                ? `require("${imp.path}");`
                : ``
            )
            .join("\n");

          return {
            contents: importStatements,
          };
        }
      });
    },
  };
}
