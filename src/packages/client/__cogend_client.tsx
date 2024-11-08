"use client";

import React, {
  createElement,
  use,
  type FC,
  type ReactNode,
  useState,
  useCallback,
  createContext,
  useEffect,
} from "react";
import { hydrateRoot } from "react-dom/client";
import {
  createFromFetch,
  createFromReadableStream,
  encodeReply,
} from "@physis/react-server-dom-esm/client";

export const Link = ({ href, children, className, ref, ...props }: any) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a
      ref={ref}
      href={href}
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
};

export const RouterContext = createContext<ReturnType<typeof useRouter>>({
  push: () => Promise.resolve(),
  preload: () => Promise.resolve(),
  loading: false,
});

const getRscUrl = (href: string) => {
  const url = new URL(href, window.location.origin);
  url.port = "3000";
  // add `?rsc` to the URL to force the server to return RSC
  url.searchParams.set("rsc", "1");
  return url;
};

const getActionUrl = () => {
  const url = new URL(location.href);
  url.port = "3000";
  return url;
};

export const useRouter = () => {
  const [loading, setLoading] = useState(false);

  const push = useCallback(async (href: string) => {
    setLoading(true);

    window.history.pushState({}, "", href);

    await render(href);

    setLoading(false);
  }, []);

  const preload = useCallback(async (href: string) => {
    const url = getRscUrl(href);
    await fetch(url, { priority: "low" });
  }, []);

  // Add a new effect to handle popstate events
  useEffect(() => {
    const handlePopState = async () => {
      setLoading(true);
      await render(window.location.pathname + window.location.search);
      setLoading(false);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return { push, preload, loading };
};

async function render(href) {
  // The *server* path of the modules
  const moduleBaseURL = "/_cogend/";

  // This is the one that will handle the calls to resolve the actions
  const callServer = async (id: string, args: unknown[]) =>
    (
      await createFromFetch(
        fetch(getActionUrl(), {
          method: "POST",
          body: await encodeReply(args),
          headers: {
            Action: id, // Tells the server which action is being called
          },
        }),
        { callServer, moduleBaseURL }
      )
    ).returnValue;

  const data = createFromFetch(fetch(getRscUrl(href)), {
    callServer,
    moduleBaseURL,
  });

  const Shell: FC<{ data: ReactNode }> = ({ data }) => {
    const router = useRouter();
    return createElement(RouterContext.Provider, { value: router }, use(data));
  };

  // @ts-ignore
  window._cogend_root.render(createElement(Shell, { data }));
}

const moduleBaseURL = "/_cogend/";

const getUrl = () => {
  const url = new URL(location.href);
  // url.port = "3000";
  return url;
};

const callServer = async (id: string, args: unknown[]) =>
  (
    await createFromFetch(
      fetch(getUrl(), {
        method: "POST",
        body: await encodeReply(args),
        headers: {
          Action: id,
        },
      }),
      { callServer, moduleBaseURL }
    )
  ).returnValue;

let encoder = new TextEncoder();
let streamController;
export let rscStream = new ReadableStream({
  start(controller) {
    if (typeof window === "undefined") {
      console.log("window undefined");
      return;
    }
    let handleChunk = (chunk) => {
      console.log({ chunk });
      if (typeof chunk === "string") {
        controller.enqueue(encoder.encode(chunk));
      } else {
        controller.enqueue(chunk);
      }
    };
    // @ts-ignore
    window.__cogend_f ||= [];
    // @ts-ignore
    window.__cogend_f.forEach(handleChunk);
    // @ts-ignore
    window.__cogend_f.push = (chunk) => {
      handleChunk(chunk);
    };
    streamController = controller;
  },
});

if (typeof document !== "undefined" && document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    streamController?.close();
  });
} else {
  streamController?.close();
}

const data = createFromReadableStream(rscStream, { callServer, moduleBaseURL });

export const Shell: FC<{ data: ReactNode }> = ({ data }) => {
  const router = useRouter();
  return createElement(RouterContext.Provider, { value: router }, use(data));
};

// @ts-ignore
window._cogend_root = hydrateRoot(document, createElement(Shell, { data }));
