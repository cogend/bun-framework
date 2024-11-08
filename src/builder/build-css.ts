import { join } from "path";

import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import postcss from "postcss";
import tailwindcss from "tailwindcss";

export async function buildCss(cssPaths, base) {
  console.time("tailwind-v4-postcss-build");
  const cssResults = await Promise.all(
    cssPaths.map(async (cssPath) => {
      try {
        const cssContent = await Bun.file(cssPath).text();

        const tailwindConfigPath = join(base, "tailwind.config.ts");
        const tailwindConfigModule = await import(tailwindConfigPath).then(
          (mod) => mod.default
        );

        const ABSOLUTE_SRC_DIR = join(base, "src");

        const processor = postcss([
          autoprefixer(),
          tailwindcss({
            ...tailwindConfigModule,
            content: [
              join(ABSOLUTE_SRC_DIR, "**/*.tsx"),
              join(ABSOLUTE_SRC_DIR, "**/*.ts"),
              join(ABSOLUTE_SRC_DIR, "**/*.jsx"),
              join(ABSOLUTE_SRC_DIR, "**/*.js"),
            ],
          }),
          cssnano(),
        ]);
        const { css } = await processor.process(cssContent, {
          from: undefined,
        });

        const hash = Bun.hash(css);

        return { css, path: cssPath, hash };
      } catch (e) {
        console.error("CSS FAIL", { cssPath, e });
        return { css: "", path: cssPath, hash: "" };
      }
    })
  );

  console.timeEnd("tailwind-v4-postcss-build");
  return cssResults;
}
