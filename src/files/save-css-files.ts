import { join } from "path";

export async function saveCssFiles({ css, cogendOutDir }) {
  return await Promise.all(
    css.map(async (cssResult) => {
      const fileName = `${cssResult.hash.toString(16).slice(0, 8)}.css`;
      const path = join(cogendOutDir, fileName);

      await Bun.write(path, cssResult.css);

      return fileName;
    })
  );
}
