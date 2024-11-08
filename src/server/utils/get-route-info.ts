export function getRouteInfo(path: string, routes) {
  const segments = path.split("/").filter(Boolean);
  let currentPath = "";
  let matchedRoute = null;
  let params = {};

  for (let i = segments.length; i >= 0; i--) {
    currentPath = "/" + segments.slice(0, i).join("/");

    if (routes[currentPath]) {
      matchedRoute = currentPath;
      break;
    }

    const dynamicMatch = Object.keys(routes).find((route) => {
      const routeSegments = route.split("/").filter(Boolean);
      if (routeSegments.length !== segments.slice(0, i).length) return false;

      return routeSegments.every((segment, index) => {
        if (segment.startsWith("[") && segment.endsWith("]")) {
          params[segment.slice(1, -1)] = segments[index];
          return true;
        }
        return segment === segments[index];
      });
    });

    if (dynamicMatch) {
      matchedRoute = dynamicMatch;
      break;
    }
  }

  if (matchedRoute) {
    return {
      ...(routes[matchedRoute] as any),
      params: Object.keys(params).length > 0 ? params : undefined,
    };
  }

  return null;
}
