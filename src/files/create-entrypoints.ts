import { join } from "path";
import { readdir } from "fs/promises";

export async function createEntrypoints(absoluteSrcDir) {
  const files = await readdir(absoluteSrcDir, { recursive: true });

  const entrypoints = files.reduce(
    (acc, file) => {
      const ext = file.match(/\..+$/)?.[0];
      if (!ext) return acc;

      const path = join(absoluteSrcDir, file);

      if (file.endsWith("route.ts")) {
        acc.routes.push(path);
      } else if (/\.(js|jsx|ts|tsx)$/.test(ext)) {
        acc.code.push(path);

        if (
          file.endsWith("__cogend_client.tsx") ||
          file.endsWith("/page.tsx") ||
          file.endsWith("/layout.tsx")
        ) {
          acc.entryCode.push(path);
          if (!file.endsWith("__cogend_client.tsx")) {
            acc.serverEntryCode.push(path);
          }
        }
      } else if (ext === ".css") {
        acc.css.push(path);
      } else {
        acc.assets.push(path);
      }

      return acc;
    },
    {
      code: [],
      entryCode: [],
      serverEntryCode: [],
      assets: [],
      css: [],
      routes: [],
    }
  );

  return entrypoints;
}
