import { createElement, use } from "react";
import { renderToReadableStream } from "react-dom/server.edge";
import { PassThrough } from "stream";
import { join } from "path";
import { getRouteInfo } from "@/server/utils/get-route-info.ts";
import { injectRSCPayload } from "@/server/utils/inject-rsc-payload.ts";
import { injectCssStyles } from "@/server/utils/inject-css-styles.ts";
import { renderToPipeableStream } from "@/server/_packages/react-server-dom-esm.js";
import { createFromReadableStream } from "@/server/_packages/react-server-dom-esm-client.js";

export const getHandler = async (
  c,
  {
    ABSOLUTE_MODULE_BASE_URL,
    MODULE_BASE_URL,
    ABSOLUTE_SERVER_PATH,
    routes,
    bootstrapModules,
    cssFileNames,
  }
) => {
  const path = c.req.path;

  const url = new URL(c.req.url);

  const isRSC = url.searchParams.get("rsc") === "1";
  if (isRSC) {
    url.searchParams.delete("rsc");
  }

  const rscRouteMap = routes["rsc"];

  const rscRouteInfo = getRouteInfo(path, rscRouteMap);

  if (!rscRouteInfo) {
    c.status(404);
    return c.text("Not Found");
  }

  const { layouts, page, params } = rscRouteInfo;

  const [rscPageModule, ...rscLayoutModules] = await Promise.all([
    import(join(ABSOLUTE_SERVER_PATH, page)),
    ...layouts.map((layout) => import(join(ABSOLUTE_SERVER_PATH, layout))),
  ]);

  const PageComponent = rscPageModule.default;
  const LayoutComponent = rscLayoutModules[0].default;

  const WrappedPageElement = createElement(LayoutComponent, {
    children: createElement(PageComponent),
  });

  const { pipe } = await renderToPipeableStream(WrappedPageElement, "");

  const passThrough = new PassThrough();

  pipe(passThrough);

  const rscStream = new ReadableStream({
    start(controller) {
      passThrough.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      passThrough.on("end", () => {
        controller.close();
      });
      passThrough.on("error", (err) => {
        controller.error(err);
      });
    },
  });

  if (isRSC) {
    return new Response(rscStream, {
      headers: {
        "Content-Type": "text/x-component",
      },
    });
  }

  const [s1, s2] = rscStream.tee();

  const data = createFromReadableStream(s1, {
    moduleBaseURL: ABSOLUTE_SERVER_PATH,
  });

  function Root() {
    return use(data);
  }

  const htmlStream = await renderToReadableStream(createElement(Root), {
    bootstrapModules: bootstrapModules.map((module) =>
      join(MODULE_BASE_URL, module)
    ),
  });

  const cssPaths = cssFileNames.map((cssPath) =>
    join(ABSOLUTE_MODULE_BASE_URL, cssPath)
  );

  const stream = htmlStream
    .pipeThrough(injectCssStyles(cssPaths))
    .pipeThrough(injectRSCPayload(s2));

  return new Response(stream);
};
