import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";
import { join } from "path";

export async function buildCss(cssPaths, deploymentId) {
  console.time("tailwind-v4-postcss-build");
  const cssResults = await Promise.all(
    cssPaths.map(async (cssPath) => {
      const cssContent = await Bun.file(cssPath).text();

      const base = join(process.cwd(), `./app/in/${deploymentId}/src/`);

      const processor = postcss([
        tailwindcss({
          base,
          optimize: true,
        }),
      ]);

      const { css } = await processor.process(cssContent, { from: undefined });

      const hash = Bun.hash(css);

      return { css, path: cssPath, hash };
    })
  );

  console.timeEnd("tailwind-v4-postcss-build");
  return cssResults;
}
