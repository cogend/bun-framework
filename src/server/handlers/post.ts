import { resolve } from "path";
import { createElement } from "react";
import { getRouteInfo } from "@/server/utils/get-route-info.ts";
import {
  renderToPipeableStream,
  decodeReply,
} from "@/server/_packages/rsde-server.js";

export const postHandler = async (
  c,
  { serverActionIdMap, routes, ABSOLUTE_SERVER_PATH, MODULE_BASE_URL }
) => {
  let body;
  if (c.req.header("content-type")?.includes("multipart/form-data")) {
    body = await c.req.parseBody();

    const data = new FormData();
    for (const [key, value] of Object.entries(body)) {
      data.set(key, value as string);
    }
  } else {
    body = await c.req.text();
  }

  const actionReference = c.req.header("Action");
  const actionOrigin = c.req.path;

  if (!actionReference || !actionOrigin) {
    return c.text("Missing required headers", 400);
  }

  const lookupKey = String(actionReference).split("#")[0];

  const [filepath, name] = serverActionIdMap[lookupKey].split("#");

  const actionFilePath = resolve(ABSOLUTE_SERVER_PATH, filepath);
  const action = (await import(actionFilePath))[name];

  let args;
  if (c.req.header("content-type")?.includes("multipart/form-data")) {
    const data = new FormData();
    for (const [key, value] of Object.entries(body)) {
      data.set(key, value as string);
    }

    args = await decodeReply(data, MODULE_BASE_URL);
  } else {
    if (body) {
      args = await decodeReply(body, MODULE_BASE_URL);
    }
  }

  console.log("running action", { args });

  const returnValue = await action.apply(null, args);

  console.log({ returnValue });

  const rscRouteMap = routes["rsc"];

  const rscRouteInfo = getRouteInfo(actionOrigin, rscRouteMap);

  if (!rscRouteInfo) {
    c.status(404);
    return c.text("Not Found");
  }
  const { layouts, page, params } = rscRouteInfo;

  const [rootLayout] = layouts;

  console.log({ rootLayout });

  // const root = (await import(rootLayout)).default(c.req.query());
  // console.log({ page, layouts });

  const [rscPageModule, ...rscLayoutModules] = await Promise.all([
    import(page),
    ...layouts.map((layout) => import(layout)),
  ]);

  const PageComponent = rscPageModule.default;

  // const root = rscPageModule.default(c.req.query());
  const root = [...rscLayoutModules].reduceRight((children, mod) => {
    const LayoutComponent = mod.default;
    return createElement(LayoutComponent, {}, children);
  }, createElement(PageComponent));

  const { pipe } = await renderToPipeableStream({ returnValue, root }, "");

  return new Response(
    new ReadableStream({
      start(controller) {
        pipe({
          write: (chunk) => controller.enqueue(chunk),
          end: () => controller.close(),
          on: () => {},
          emit: () => {},
        });
      },
    }),
    {
      headers: {
        ...c.res.headers,
        "Transfer-Encoding": "chunked",
      },
    }
  );
};
