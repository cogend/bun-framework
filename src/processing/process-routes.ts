import { readThirdLine } from "../utils/read-third-line.ts";

export async function processRoutes(outputs, sourcemapPath) {
  const routes = {};

  await Promise.all(
    outputs.map(async (output) => {
      if (output.kind === "entry-point") {
        const sourcesLine = await readThirdLine(output.sourcemap.path);
        const sources = JSON.parse(
          sourcesLine.split(": ")[1].trim().slice(0, -1)
        );

        const validSources = sources
          .filter(
            (source) =>
              source.startsWith(`${sourcemapPath}/src/app/`) &&
              (source.endsWith("page.tsx") || source.endsWith("layout.tsx"))
          )
          .map((source) => ({
            path: source
              .replace(`${sourcemapPath}/src/app`, "")
              .replace(/\.tsx?$/, ""),
            depth: source.split("/").length,
          }));

        validSources.forEach(({ path: source, depth }) => {
          const route = source.replace(/\/(page|layout)$/, "") || "/";
          const sourceType = source.endsWith("page") ? "page" : "layout";

          if (!routes[route]) {
            routes[route] = { layouts: [], page: null };
          }

          if (sourceType === "page") {
            routes[route].page = output.path.split("/").pop();
          } else {
            Object.keys(routes).forEach((existingRoute) => {
              if (
                existingRoute === route ||
                existingRoute.startsWith(route + "/")
              ) {
                routes[existingRoute].layouts.push({
                  path: output.path.split("/").pop(),
                  depth,
                });
              }
            });
          }
        });
      }
    })
  );

  Object.values(routes).forEach((entry: any) => {
    entry.layouts.sort((a, b) => a.depth - b.depth);
    entry.layouts = [
      ...new Set(entry.layouts.map((layout: any) => layout.path)),
    ];
  });

  const rootLayout = routes["/"]?.layouts[0];
  if (rootLayout) {
    Object.values(routes).forEach((entry: any) => {
      if (!entry.layouts.includes(rootLayout)) {
        entry.layouts.unshift(rootLayout);
      }
    });
  }

  Object.values(routes).forEach((entry: any) => {
    if (!entry.page) {
      entry.page = "/404.js";
    }
  });

  return routes;
}
