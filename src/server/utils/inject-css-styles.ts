export function injectCssStyles(cssPaths) {
  const encoder = new TextEncoder();
  let injected = false;

  return new TransformStream({
    transform(chunk, controller) {
      if (!injected) {
        const decoded = new TextDecoder().decode(chunk);
        const headEndIndex = decoded.indexOf("</head>");

        if (headEndIndex !== -1) {
          const before = decoded.slice(0, headEndIndex);
          const after = decoded.slice(headEndIndex);

          const cssTags = cssPaths
            .map(
              (path) =>
                `<link rel="stylesheet" href="/_cogend/${path
                  .split("/")
                  .pop()}"/>`
            )
            .join("");

          controller.enqueue(encoder.encode(before + cssTags + after));
          injected = true;
        } else {
          controller.enqueue(chunk);
        }
      } else {
        controller.enqueue(chunk);
      }
    },
  });
}
