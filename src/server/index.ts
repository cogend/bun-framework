import { join } from "path";
import { Hono } from "hono";
import { getDeploymentConfig } from "@/server/utils/get-deployment-config.ts";
import { routeHandler } from "@/server/handlers/route.ts";
import { getHandler } from "@/server/handlers/get.ts";
import { postHandler } from "@/server/handlers/post.ts";

const workerId = "cogend";

const OUT_DIR = `./app/out/${workerId}`;
const ABSOLUTE_OUT_DIR = join(process.cwd(), OUT_DIR);

const ABSOLUTE_CLIENT_OUT_DIR = join(ABSOLUTE_OUT_DIR, "client");
const ABSOLUTE_SERVER_OUT_DIR = join(ABSOLUTE_OUT_DIR, "server");

const MODULE_BASE_URL = "/_cogend/";
const ABSOLUTE_MODULE_BASE_URL = join(
  process.cwd(),
  OUT_DIR,
  MODULE_BASE_URL,
  "/"
);

const ABSOLUTE_SERVER_PATH = join(ABSOLUTE_OUT_DIR, "server/");

const app = new Hono();

const {
  routes,
  bootstrapModules,
  routeHandlers,
  serverActionIdMap,
  cssFileNames,
} = await getDeploymentConfig(ABSOLUTE_OUT_DIR);

app.get("/_cogend/*", async (c) => {
  const filePath = join(
    ABSOLUTE_CLIENT_OUT_DIR,
    c.req.path.split("/_cogend/")[1]
  );

  try {
    const file = Bun.file(filePath);
    const content = await file.arrayBuffer();

    return new Response(content, {
      headers: {
        "Content-Type": file.type,
      },
    });
  } catch (error) {
    return c.notFound();
  }
});

app.use(
  async (c, next) =>
    await routeHandler(c, next, routeHandlers, ABSOLUTE_SERVER_OUT_DIR)
);

app.get(
  "*",
  async (c) =>
    await getHandler(c, {
      ABSOLUTE_MODULE_BASE_URL,
      MODULE_BASE_URL,
      ABSOLUTE_SERVER_PATH,
      routes,
      bootstrapModules,
      cssFileNames,
    })
);

app.post(
  "*",
  async (c) =>
    await postHandler(c, {
      serverActionIdMap,
      routes,
      ABSOLUTE_SERVER_PATH,
      MODULE_BASE_URL,
    })
);

export default app;
