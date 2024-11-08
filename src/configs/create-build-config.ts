import { join } from "path";

export function createBuildConfig(deploymentId) {
  const BUILD_CONFIG = {
    minify: true,
    splitting: true,
    sourcemap: "external" as const,
    naming: {
      entry: "[hash].[ext]",
      chunk: "[hash].[ext]",
      asset: "[hash].[ext]",
    },
  };

  const cwd = process.cwd();

  const OUT_DIR = `./app/out/${deploymentId}`;
  const ABSOLUTE_OUT_DIR = join(cwd, OUT_DIR);

  const IN_DIR = `./app/in/${deploymentId}`;
  const ABSOLUTE_IN_DIR = join(cwd, IN_DIR);

  const SRC_DIR = join(IN_DIR, "src");
  const ABSOLUTE_SRC_DIR = join(cwd, SRC_DIR);

  const SERVER_OUT_DIR = join(OUT_DIR, "server");
  const ABSOLUTE_SERVER_OUT_DIR = join(ABSOLUTE_OUT_DIR, "server");

  const RSC_OUT_DIR = SERVER_OUT_DIR;
  const SSR_OUT_DIR = SERVER_OUT_DIR;

  const COGEND_DIR = "client";
  const CLIENT_OUT_DIR = join(OUT_DIR, COGEND_DIR);
  const ABSOLUTE_CLIENT_OUT_DIR = join(ABSOLUTE_OUT_DIR, COGEND_DIR);

  const HANDLERS_OUT_DIR = SERVER_OUT_DIR;
  const ABSOLUTE_HANDLERS_OUT_DIR = ABSOLUTE_SERVER_OUT_DIR;

  const RELATIVE_SOURCEMAP_PATH = `../../../in/${deploymentId}`;
  const RELATIVE_SOURCEMAP_NODE_MODULES_PATH = `../../../../node_modules`;

  return {
    paths: {
      in: {
        dir: IN_DIR,
        absoluteDir: ABSOLUTE_IN_DIR,
      },
      out: {
        dir: OUT_DIR,
        absoluteDir: ABSOLUTE_OUT_DIR,
      },
      src: {
        dir: SRC_DIR,
        absoluteDir: ABSOLUTE_SRC_DIR,
      },
      rsc: {
        outDir: RSC_OUT_DIR,
      },
      ssr: {
        outDir: SSR_OUT_DIR,
      },
      client: {
        outDir: CLIENT_OUT_DIR,
        absoluteDir: ABSOLUTE_CLIENT_OUT_DIR,
      },
      handlers: {
        outDir: HANDLERS_OUT_DIR,
        absoluteDir: ABSOLUTE_HANDLERS_OUT_DIR,
      },
      sourcemap: {
        path: RELATIVE_SOURCEMAP_PATH,
        nodeModulesPath: RELATIVE_SOURCEMAP_NODE_MODULES_PATH,
      },
    },
    build: {
      ...BUILD_CONFIG,
    },
  };
}
