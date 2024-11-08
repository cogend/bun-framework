export async function buildRoutes(config) {
  console.time(`${config.type}-build`);

  if (!config.entrypoints.length) {
    return {
      success: true,
      outputs: [],
    };
  }

  const build = await Bun.build(config);

  if (!build.success) {
    console.error(build);
  }

  const outputsJsonArray = build.outputs.map((o) => {
    return {
      path: o.path,
      hash: o.hash,
      loader: o.loader,
      kind: o.kind,
      sourcemap: o.sourcemap
        ? {
            path: o.sourcemap.path,
          }
        : null,
    };
  });

  console.timeEnd(`${config.type}-build`);

  return {
    success: build.success,
    outputs: outputsJsonArray,
  };
}
