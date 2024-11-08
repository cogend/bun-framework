export function createCreateServerReferencesPlugin({
  filesMap,
  serverActionIds,
  type,
}: {
  filesMap: Record<string, any>;
  serverActionIds: Record<string, Record<string, string>>;
  type: "ssr" | "client";
}) {
  const createServerReferencesPlugin = {
    name: "create-server-reference",
    setup(build) {
      build.onLoad({ filter: /\.tsx?$/ }, async (args) => {
        const { exports, isServerComponent, isClientComponent } =
          filesMap[args.path];

        if (isServerComponent) {
          const newCode = exports
            .map(
              (exportName) =>
                `export const ${exportName} = createServerReference("${
                  serverActionIds[args.path][exportName]
                }", callServer);`
            )
            .join("\n");

          return {
            contents: `
import {
  createFromReadableStream,
  createServerReference,
  encodeReply,
} from "react-server-dom-esm/client.browser";

const moduleBaseURL = "/_cogend/";

const getUrl = () => {
  const url = new URL(location.href);
  return url;
};

const callServer = async (id, args) => {
  const response = await fetch(getUrl(), {
    method: "POST",
    body: await encodeReply(args),
    headers: {
      Action: id,
    },
  });

  console.log("response.status", response.status);
  if (response.status === 303) {
    const redirectUrl = response.headers.get("x-cogend-redirect");
    window.location.href = redirectUrl;
  }

  const { returnValue } = await createFromReadableStream(response.body, {
    callServer,
    moduleBaseURL,
  });

  return returnValue;
};

${newCode}
`.trim(),
          };
        }
      });
    },
  };

  return createServerReferencesPlugin;
}
