import { readThirdLine } from "../utils/read-third-line.ts";

export async function processRouteHandlers(outputs, sourcemapPath) {
  const routes = {};

  await Promise.all(
    outputs.map(async (output) => {
      if (output.kind === "entry-point") {
        const sourcesLine = await readThirdLine(output.sourcemap.path);
        const sources = JSON.parse(
          sourcesLine.split(": ")[1].trim().slice(0, -1)
        ).filter((source) => source.startsWith(`${sourcemapPath}/src/app`));

        const routeKey = sources[0]
          .replace(`${sourcemapPath}/src/app`, "")
          .split("/route.ts")[0];

        const routeHandlerFileName = output.path.split("/").pop();

        routes[routeKey] = {
          GET: routeHandlerFileName,
        };
      }
    })
  );

  return routes;
}
