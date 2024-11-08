const encoder = new TextEncoder();
const trailer = "</body></html>";

export function injectRSCPayload(rscStream) {
  let decoder = new TextDecoder();
  let resolveFlightDataPromise;
  let flightDataPromise = new Promise(
    (resolve) => (resolveFlightDataPromise = resolve)
  );
  let started = false;
  return new TransformStream({
    transform(chunk, controller) {
      let buf = decoder.decode(chunk);
      if (buf.endsWith(trailer)) {
        buf = buf.slice(0, -trailer.length);
      }
      controller.enqueue(encoder.encode(buf));

      if (!started) {
        started = true;
        setTimeout(async () => {
          try {
            await writeRSCStream(rscStream, controller);
          } catch (err) {
            controller.error(err);
          }
          resolveFlightDataPromise();
        }, 0);
      }
    },
    async flush(controller) {
      await flightDataPromise;
      controller.enqueue(encoder.encode(trailer));
    },
  });
}

async function writeRSCStream(rscStream, controller) {
  let decoder = new TextDecoder("utf-8", { fatal: true });
  for await (let chunk of rscStream) {
    try {
      writeChunk(
        JSON.stringify(decoder.decode(chunk, { stream: true })),
        controller
      );
    } catch (err) {
      let base64 = JSON.stringify(btoa(String.fromCodePoint(...chunk)));
      writeChunk(
        `Uint8Array.from(atob(${base64}), m => m.codePointAt(0))`,
        controller
      );
    }
  }

  let remaining = decoder.decode();
  if (remaining.length) {
    writeChunk(JSON.stringify(remaining), controller);
  }
}

function writeChunk(chunk, controller) {
  controller.enqueue(
    encoder.encode(
      `<script>${escapeScript(
        `(self.__cogend_f||=[]).push(${chunk})`
      )}</script>`
    )
  );
}

function escapeScript(script) {
  return script.replace(/<!--/g, "<\\!--").replace(/<\/(script)/gi, "</\\$1");
}
