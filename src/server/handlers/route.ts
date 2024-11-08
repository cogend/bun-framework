import { join } from "path";

export const routeHandler = async (
  c,
  next,
  routeHandlers,
  ABSOLUTE_SERVER_OUT_DIR
) => {
  const { path, method } = c.req;

  if (routeHandlers[path]?.[method]) {
    const routeHandler = await import(
      join(ABSOLUTE_SERVER_OUT_DIR, routeHandlers[path][method])
    ).then((mod) => mod[method]);

    try {
      return await routeHandler(c.req.raw);
    } catch (e) {
      console.log({ message: e.message, "res headers": c.res.headers });
      const json = JSON.parse(e.message);
      if (json.url) {
        return new Response(null, {
          headers: {
            ...c.res.headers,
            "X-COGEND-REDIRECT": json.url,
            "X-COGEND-STATUS-CODE": 307,
          },
        });
      }
    }
  }

  await next();
};
