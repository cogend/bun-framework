var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

// node_modules/react-dom/cjs/react-dom.development.js
import * as React from "react";
var require_react_dom_development = __commonJS((exports) => {
  if (true) {
    (function() {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error);
      }
      var ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
      function error(format) {
        {
          {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1;_key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }
            printWarning("error", format, args);
          }
        }
      }
      function printWarning(level, format, args) {
        {
          var stack = ReactSharedInternals.getStackAddendum();
          if (stack !== "") {
            format += "%s";
            args = args.concat([stack]);
          }
          var argsWithFormat = args.map(function(item) {
            return String(item);
          });
          argsWithFormat.unshift("Warning: " + format);
          Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      }
      var disableCommentsAsDOMContainers = true;
      var NoLane = 0;
      var SyncLane = 2;
      var NoEventPriority = NoLane;
      var DiscreteEventPriority = SyncLane;
      function noop() {
      }
      function requestFormReset$1(element) {
        throw new Error("Invalid form element. requestFormReset must be passed a form that was " + "rendered by React.");
      }
      var DefaultDispatcher = {
        f: noop,
        r: requestFormReset$1,
        D: noop,
        C: noop,
        L: noop,
        m: noop,
        X: noop,
        S: noop,
        M: noop
      };
      var Internals = {
        d: DefaultDispatcher,
        p: NoEventPriority,
        findDOMNode: null
      };
      var ReactVersion = "19.0.0-rc-57fbe3ba37-20240520";
      var ELEMENT_NODE = 1;
      var DOCUMENT_NODE = 9;
      var DOCUMENT_FRAGMENT_NODE = 11;
      function isValidContainer(node) {
        return !!(node && (node.nodeType === ELEMENT_NODE || node.nodeType === DOCUMENT_NODE || node.nodeType === DOCUMENT_FRAGMENT_NODE || !disableCommentsAsDOMContainers));
      }
      var REACT_PORTAL_TYPE = Symbol.for("react.portal");
      function typeName(value) {
        {
          var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
          var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          return type;
        }
      }
      function willCoercionThrow(value) {
        {
          try {
            testStringCoercion(value);
            return false;
          } catch (e) {
            return true;
          }
        }
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkKeyStringCoercion(value) {
        {
          if (willCoercionThrow(value)) {
            error("The provided key is an unsupported type %s." + " This value must be coerced to a string before using it here.", typeName(value));
            return testStringCoercion(value);
          }
        }
      }
      function createPortal$1(children, containerInfo, implementation) {
        var key = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
        {
          checkKeyStringCoercion(key);
        }
        return {
          $$typeof: REACT_PORTAL_TYPE,
          key: key == null ? null : "" + key,
          children,
          containerInfo,
          implementation
        };
      }
      function flushSyncImpl(fn) {
        var previousTransition = ReactSharedInternals.T;
        var previousUpdatePriority = Internals.p;
        try {
          ReactSharedInternals.T = null;
          Internals.p = DiscreteEventPriority;
          if (fn) {
            return fn();
          } else {
            return;
          }
        } finally {
          ReactSharedInternals.T = previousTransition;
          Internals.p = previousUpdatePriority;
          var wasInRender = Internals.d.f();
          {
            if (wasInRender) {
              error("flushSync was called from inside a lifecycle method. React cannot " + "flush when React is already rendering. Consider moving this call to " + "a scheduler task or micro task.");
            }
          }
        }
      }
      var flushSync = flushSyncImpl;
      function getCrossOriginString(input) {
        if (typeof input === "string") {
          return input === "use-credentials" ? input : "";
        }
        return;
      }
      function getCrossOriginStringAs(as, input) {
        if (as === "font") {
          return "";
        }
        if (typeof input === "string") {
          return input === "use-credentials" ? input : "";
        }
        return;
      }
      function prefetchDNS(href) {
        {
          if (typeof href !== "string" || !href) {
            error("ReactDOM.prefetchDNS(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", getValueDescriptorExpectingObjectForWarning(href));
          } else if (arguments.length > 1) {
            var options = arguments[1];
            if (typeof options === "object" && options.hasOwnProperty("crossOrigin")) {
              error("ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. It looks like the you are attempting to set a crossOrigin property for this DNS lookup hint. Browsers do not perform DNS queries using CORS and setting this attribute on the resource hint has no effect. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.", getValueDescriptorExpectingEnumForWarning(options));
            } else {
              error("ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.", getValueDescriptorExpectingEnumForWarning(options));
            }
          }
        }
        if (typeof href === "string") {
          Internals.d.D(href);
        }
      }
      function preconnect(href, options) {
        {
          if (typeof href !== "string" || !href) {
            error("ReactDOM.preconnect(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", getValueDescriptorExpectingObjectForWarning(href));
          } else if (options != null && typeof options !== "object") {
            error("ReactDOM.preconnect(): Expected the `options` argument (second) to be an object but encountered %s instead. The only supported option at this time is `crossOrigin` which accepts a string.", getValueDescriptorExpectingEnumForWarning(options));
          } else if (options != null && typeof options.crossOrigin !== "string") {
            error("ReactDOM.preconnect(): Expected the `crossOrigin` option (second argument) to be a string but encountered %s instead. Try removing this option or passing a string value instead.", getValueDescriptorExpectingObjectForWarning(options.crossOrigin));
          }
        }
        if (typeof href === "string") {
          var crossOrigin = options ? getCrossOriginString(options.crossOrigin) : null;
          Internals.d.C(href, crossOrigin);
        }
      }
      function preload(href, options) {
        {
          var encountered = "";
          if (typeof href !== "string" || !href) {
            encountered += " The `href` argument encountered was " + getValueDescriptorExpectingObjectForWarning(href) + ".";
          }
          if (options == null || typeof options !== "object") {
            encountered += " The `options` argument encountered was " + getValueDescriptorExpectingObjectForWarning(options) + ".";
          } else if (typeof options.as !== "string" || !options.as) {
            encountered += " The `as` option encountered was " + getValueDescriptorExpectingObjectForWarning(options.as) + ".";
          }
          if (encountered) {
            error('ReactDOM.preload(): Expected two arguments, a non-empty `href` string and an `options` object with an `as` property valid for a `<link rel="preload" as="..." />` tag.%s', encountered);
          }
        }
        if (typeof href === "string" && typeof options === "object" && options !== null && typeof options.as === "string") {
          var as = options.as;
          var crossOrigin = getCrossOriginStringAs(as, options.crossOrigin);
          Internals.d.L(href, as, {
            crossOrigin,
            integrity: typeof options.integrity === "string" ? options.integrity : undefined,
            nonce: typeof options.nonce === "string" ? options.nonce : undefined,
            type: typeof options.type === "string" ? options.type : undefined,
            fetchPriority: typeof options.fetchPriority === "string" ? options.fetchPriority : undefined,
            referrerPolicy: typeof options.referrerPolicy === "string" ? options.referrerPolicy : undefined,
            imageSrcSet: typeof options.imageSrcSet === "string" ? options.imageSrcSet : undefined,
            imageSizes: typeof options.imageSizes === "string" ? options.imageSizes : undefined,
            media: typeof options.media === "string" ? options.media : undefined
          });
        }
      }
      function preloadModule(href, options) {
        {
          var encountered = "";
          if (typeof href !== "string" || !href) {
            encountered += " The `href` argument encountered was " + getValueDescriptorExpectingObjectForWarning(href) + ".";
          }
          if (options !== undefined && typeof options !== "object") {
            encountered += " The `options` argument encountered was " + getValueDescriptorExpectingObjectForWarning(options) + ".";
          } else if (options && "as" in options && typeof options.as !== "string") {
            encountered += " The `as` option encountered was " + getValueDescriptorExpectingObjectForWarning(options.as) + ".";
          }
          if (encountered) {
            error('ReactDOM.preloadModule(): Expected two arguments, a non-empty `href` string and, optionally, an `options` object with an `as` property valid for a `<link rel="modulepreload" as="..." />` tag.%s', encountered);
          }
        }
        if (typeof href === "string") {
          if (options) {
            var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
            Internals.d.m(href, {
              as: typeof options.as === "string" && options.as !== "script" ? options.as : undefined,
              crossOrigin,
              integrity: typeof options.integrity === "string" ? options.integrity : undefined
            });
          } else {
            Internals.d.m(href);
          }
        }
      }
      function preinit(href, options) {
        {
          if (typeof href !== "string" || !href) {
            error("ReactDOM.preinit(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", getValueDescriptorExpectingObjectForWarning(href));
          } else if (options == null || typeof options !== "object") {
            error("ReactDOM.preinit(): Expected the `options` argument (second) to be an object with an `as` property describing the type of resource to be preinitialized but encountered %s instead.", getValueDescriptorExpectingEnumForWarning(options));
          } else if (options.as !== "style" && options.as !== "script") {
            error('ReactDOM.preinit(): Expected the `as` property in the `options` argument (second) to contain a valid value describing the type of resource to be preinitialized but encountered %s instead. Valid values for `as` are "style" and "script".', getValueDescriptorExpectingEnumForWarning(options.as));
          }
        }
        if (typeof href === "string" && options && typeof options.as === "string") {
          var as = options.as;
          var crossOrigin = getCrossOriginStringAs(as, options.crossOrigin);
          var integrity = typeof options.integrity === "string" ? options.integrity : undefined;
          var fetchPriority = typeof options.fetchPriority === "string" ? options.fetchPriority : undefined;
          if (as === "style") {
            Internals.d.S(href, typeof options.precedence === "string" ? options.precedence : undefined, {
              crossOrigin,
              integrity,
              fetchPriority
            });
          } else if (as === "script") {
            Internals.d.X(href, {
              crossOrigin,
              integrity,
              fetchPriority,
              nonce: typeof options.nonce === "string" ? options.nonce : undefined
            });
          }
        }
      }
      function preinitModule(href, options) {
        {
          var encountered = "";
          if (typeof href !== "string" || !href) {
            encountered += " The `href` argument encountered was " + getValueDescriptorExpectingObjectForWarning(href) + ".";
          }
          if (options !== undefined && typeof options !== "object") {
            encountered += " The `options` argument encountered was " + getValueDescriptorExpectingObjectForWarning(options) + ".";
          } else if (options && "as" in options && options.as !== "script") {
            encountered += " The `as` option encountered was " + getValueDescriptorExpectingEnumForWarning(options.as) + ".";
          }
          if (encountered) {
            error("ReactDOM.preinitModule(): Expected up to two arguments, a non-empty `href` string and, optionally, an `options` object with a valid `as` property.%s", encountered);
          } else {
            var as = options && typeof options.as === "string" ? options.as : "script";
            switch (as) {
              case "script": {
                break;
              }
              default: {
                var typeOfAs = getValueDescriptorExpectingEnumForWarning(as);
                error('ReactDOM.preinitModule(): Currently the only supported "as" type for this function is "script"' + ' but received "%s" instead. This warning was generated for `href` "%s". In the future other' + " module types will be supported, aligning with the import-attributes proposal. Learn more here:" + " (https://github.com/tc39/proposal-import-attributes)", typeOfAs, href);
              }
            }
          }
        }
        if (typeof href === "string") {
          if (typeof options === "object" && options !== null) {
            if (options.as == null || options.as === "script") {
              var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
              Internals.d.M(href, {
                crossOrigin,
                integrity: typeof options.integrity === "string" ? options.integrity : undefined,
                nonce: typeof options.nonce === "string" ? options.nonce : undefined
              });
            }
          } else if (options == null) {
            Internals.d.M(href);
          }
        }
      }
      function getValueDescriptorExpectingObjectForWarning(thing) {
        return thing === null ? "`null`" : thing === undefined ? "`undefined`" : thing === "" ? "an empty string" : "something with type \"" + typeof thing + "\"";
      }
      function getValueDescriptorExpectingEnumForWarning(thing) {
        return thing === null ? "`null`" : thing === undefined ? "`undefined`" : thing === "" ? "an empty string" : typeof thing === "string" ? JSON.stringify(thing) : typeof thing === "number" ? "`" + thing + "`" : "something with type \"" + typeof thing + "\"";
      }
      function resolveDispatcher() {
        var dispatcher = ReactSharedInternals.H;
        {
          if (dispatcher === null) {
            error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for" + " one of the following reasons:\n" + "1. You might have mismatching versions of React and the renderer (such as React DOM)\n" + "2. You might be breaking the Rules of Hooks\n" + "3. You might have more than one copy of React in the same app\n" + "See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.");
          }
        }
        return dispatcher;
      }
      function useFormStatus() {
        {
          var dispatcher = resolveDispatcher();
          return dispatcher.useHostTransitionStatus();
        }
      }
      function useFormState(action, initialState, permalink) {
        {
          var dispatcher = resolveDispatcher();
          return dispatcher.useFormState(action, initialState, permalink);
        }
      }
      function requestFormReset(form) {
        Internals.d.r(form);
      }
      {
        if (typeof Map !== "function" || Map.prototype == null || typeof Map.prototype.forEach !== "function" || typeof Set !== "function" || Set.prototype == null || typeof Set.prototype.clear !== "function" || typeof Set.prototype.forEach !== "function") {
          error("React depends on Map and Set built-in types. Make sure that you load a " + "polyfill in older browsers. https://reactjs.org/link/react-polyfills");
        }
      }
      function batchedUpdates(fn, a) {
        return fn(a);
      }
      function createPortal(children, container) {
        var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        if (!isValidContainer(container)) {
          throw new Error("Target container is not a DOM element.");
        }
        return createPortal$1(children, container, null, key);
      }
      exports.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
      exports.createPortal = createPortal;
      exports.flushSync = flushSync;
      exports.preconnect = preconnect;
      exports.prefetchDNS = prefetchDNS;
      exports.preinit = preinit;
      exports.preinitModule = preinitModule;
      exports.preload = preload;
      exports.preloadModule = preloadModule;
      exports.requestFormReset = requestFormReset;
      exports.unstable_batchedUpdates = batchedUpdates;
      exports.useFormState = useFormState;
      exports.useFormStatus = useFormStatus;
      exports.version = ReactVersion;
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error);
      }
    })();
  }
});

// node_modules/react-dom/index.js
var require_react_dom = __commonJS((exports, module) => {
  var react_dom_development = __toESM(require_react_dom_development(), 1);
  if (false) {
  } else {
    module.exports = react_dom_development;
  }
});

// node_modules/@physis/react-server-dom-esm/cjs/react-server-dom-esm-client.browser.development.js
import * as React2 from "react";
var require_react_server_dom_esm_client_browser_development = __commonJS((exports) => {
  var ReactDOM = __toESM(require_react_dom(), 1);
  if (true) {
    (function() {
      function _defineProperty(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          obj[key] = value;
        }
        return obj;
      }
      function createStringDecoder() {
        return new TextDecoder;
      }
      var decoderOptions = {
        stream: true
      };
      function readPartialStringChunk(decoder, buffer) {
        return decoder.decode(buffer, decoderOptions);
      }
      function readFinalStringChunk(decoder, buffer) {
        return decoder.decode(buffer);
      }
      var badgeFormat = "%c%s%c ";
      var badgeStyle = "background: #e6e6e6;" + "background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));" + "color: #000000;" + "color: light-dark(#000000, #ffffff);" + "border-radius: 2px";
      var resetStyle = "";
      var pad = " ";
      function printToConsole(methodName, args, badgeName) {
        var offset = 0;
        switch (methodName) {
          case "dir":
          case "dirxml":
          case "groupEnd":
          case "table": {
            console[methodName].apply(console, args);
            return;
          }
          case "assert": {
            offset = 1;
          }
        }
        var newArgs = args.slice(0);
        if (typeof newArgs[offset] === "string") {
          newArgs.splice(offset, 1, badgeFormat + newArgs[offset], badgeStyle, pad + badgeName + pad, resetStyle);
        } else {
          newArgs.splice(offset, 0, badgeFormat, badgeStyle, pad + badgeName + pad, resetStyle);
        }
        console[methodName].apply(console, newArgs);
        return;
      }
      function resolveClientReference(bundlerConfig, metadata) {
        var baseURL = bundlerConfig;
        return {
          specifier: baseURL + metadata[0],
          name: metadata[1]
        };
      }
      var asyncModuleCache = new Map;
      function preloadModule(metadata) {
        var existingPromise = asyncModuleCache.get(metadata.specifier);
        if (existingPromise) {
          if (existingPromise.status === "fulfilled") {
            return null;
          }
          return existingPromise;
        } else {
          var modulePromise = import(metadata.specifier);
          modulePromise.then(function(value) {
            var fulfilledThenable = modulePromise;
            fulfilledThenable.status = "fulfilled";
            fulfilledThenable.value = value;
          }, function(reason) {
            var rejectedThenable = modulePromise;
            rejectedThenable.status = "rejected";
            rejectedThenable.reason = reason;
          });
          asyncModuleCache.set(metadata.specifier, modulePromise);
          return modulePromise;
        }
      }
      function requireModule(metadata) {
        var moduleExports;
        var promise = asyncModuleCache.get(metadata.specifier);
        if (promise.status === "fulfilled") {
          moduleExports = promise.value;
        } else {
          throw promise.reason;
        }
        return moduleExports[metadata.name];
      }
      var ReactDOMSharedInternals = ReactDOM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
      function dispatchHint(code, model) {
        var dispatcher = ReactDOMSharedInternals.d;
        switch (code) {
          case "D": {
            var refined = refineModel(code, model);
            var href = refined;
            dispatcher.D(href);
            return;
          }
          case "C": {
            var _refined = refineModel(code, model);
            if (typeof _refined === "string") {
              var _href = _refined;
              dispatcher.C(_href);
            } else {
              var _href2 = _refined[0];
              var crossOrigin = _refined[1];
              dispatcher.C(_href2, crossOrigin);
            }
            return;
          }
          case "L": {
            var _refined2 = refineModel(code, model);
            var _href3 = _refined2[0];
            var as = _refined2[1];
            if (_refined2.length === 3) {
              var options = _refined2[2];
              dispatcher.L(_href3, as, options);
            } else {
              dispatcher.L(_href3, as);
            }
            return;
          }
          case "m": {
            var _refined3 = refineModel(code, model);
            if (typeof _refined3 === "string") {
              var _href4 = _refined3;
              dispatcher.m(_href4);
            } else {
              var _href5 = _refined3[0];
              var _options = _refined3[1];
              dispatcher.m(_href5, _options);
            }
            return;
          }
          case "X": {
            var _refined4 = refineModel(code, model);
            if (typeof _refined4 === "string") {
              var _href6 = _refined4;
              dispatcher.X(_href6);
            } else {
              var _href7 = _refined4[0];
              var _options2 = _refined4[1];
              dispatcher.X(_href7, _options2);
            }
            return;
          }
          case "S": {
            var _refined5 = refineModel(code, model);
            if (typeof _refined5 === "string") {
              var _href8 = _refined5;
              dispatcher.S(_href8);
            } else {
              var _href9 = _refined5[0];
              var precedence = _refined5[1] === 0 ? undefined : _refined5[1];
              var _options3 = _refined5.length === 3 ? _refined5[2] : undefined;
              dispatcher.S(_href9, precedence, _options3);
            }
            return;
          }
          case "M": {
            var _refined6 = refineModel(code, model);
            if (typeof _refined6 === "string") {
              var _href10 = _refined6;
              dispatcher.M(_href10);
            } else {
              var _href11 = _refined6[0];
              var _options4 = _refined6[1];
              dispatcher.M(_href11, _options4);
            }
            return;
          }
        }
      }
      function refineModel(code, model) {
        return model;
      }
      var ReactSharedInternals = React2.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
      function error(format) {
        {
          {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1;_key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }
            printWarning("error", format, args);
          }
        }
      }
      function printWarning(level, format, args) {
        {
          var stack = ReactSharedInternals.getStackAddendum();
          if (stack !== "") {
            format += "%s";
            args = args.concat([stack]);
          }
          var argsWithFormat = args.map(function(item) {
            return String(item);
          });
          argsWithFormat.unshift("Warning: " + format);
          Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      }
      var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
      var REACT_CONTEXT_TYPE = Symbol.for("react.context");
      var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
      var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
      var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
      var REACT_MEMO_TYPE = Symbol.for("react.memo");
      var REACT_LAZY_TYPE = Symbol.for("react.lazy");
      var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        if (maybeIterable === null || typeof maybeIterable !== "object") {
          return null;
        }
        var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
        if (typeof maybeIterator === "function") {
          return maybeIterator;
        }
        return null;
      }
      var ASYNC_ITERATOR = Symbol.asyncIterator;
      var isArrayImpl = Array.isArray;
      function isArray(a) {
        return isArrayImpl(a);
      }
      var getPrototypeOf = Object.getPrototypeOf;
      var jsxPropsParents = new WeakMap;
      var jsxChildrenParents = new WeakMap;
      function isObjectPrototype(object) {
        if (!object) {
          return false;
        }
        var ObjectPrototype2 = Object.prototype;
        if (object === ObjectPrototype2) {
          return true;
        }
        if (getPrototypeOf(object)) {
          return false;
        }
        var names = Object.getOwnPropertyNames(object);
        for (var i = 0;i < names.length; i++) {
          if (!(names[i] in ObjectPrototype2)) {
            return false;
          }
        }
        return true;
      }
      function isSimpleObject(object) {
        if (!isObjectPrototype(getPrototypeOf(object))) {
          return false;
        }
        var names = Object.getOwnPropertyNames(object);
        for (var i = 0;i < names.length; i++) {
          var descriptor = Object.getOwnPropertyDescriptor(object, names[i]);
          if (!descriptor) {
            return false;
          }
          if (!descriptor.enumerable) {
            if ((names[i] === "key" || names[i] === "ref") && typeof descriptor.get === "function") {
              continue;
            }
            return false;
          }
        }
        return true;
      }
      function objectName(object) {
        var name = Object.prototype.toString.call(object);
        return name.replace(/^\[object (.*)\]$/, function(m, p0) {
          return p0;
        });
      }
      function describeKeyForErrorMessage(key) {
        var encodedKey = JSON.stringify(key);
        return '"' + key + '"' === encodedKey ? key : encodedKey;
      }
      function describeValueForErrorMessage(value) {
        switch (typeof value) {
          case "string": {
            return JSON.stringify(value.length <= 10 ? value : value.slice(0, 10) + "...");
          }
          case "object": {
            if (isArray(value)) {
              return "[...]";
            }
            if (value !== null && value.$$typeof === CLIENT_REFERENCE_TAG) {
              return describeClientReference();
            }
            var name = objectName(value);
            if (name === "Object") {
              return "{...}";
            }
            return name;
          }
          case "function": {
            if (value.$$typeof === CLIENT_REFERENCE_TAG) {
              return describeClientReference();
            }
            var _name = value.displayName || value.name;
            return _name ? "function " + _name : "function";
          }
          default:
            return String(value);
        }
      }
      function describeElementType(type) {
        if (typeof type === "string") {
          return type;
        }
        switch (type) {
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
        }
        if (typeof type === "object") {
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              return describeElementType(type.render);
            case REACT_MEMO_TYPE:
              return describeElementType(type.type);
            case REACT_LAZY_TYPE: {
              var lazyComponent = type;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;
              try {
                return describeElementType(init(payload));
              } catch (x) {
              }
            }
          }
        }
        return "";
      }
      var CLIENT_REFERENCE_TAG = Symbol.for("react.client.reference");
      function describeClientReference(ref) {
        return "client";
      }
      function describeObjectForErrorMessage(objectOrArray, expandedName) {
        var objKind = objectName(objectOrArray);
        if (objKind !== "Object" && objKind !== "Array") {
          return objKind;
        }
        var str = "";
        var start = -1;
        var length = 0;
        if (isArray(objectOrArray)) {
          if (jsxChildrenParents.has(objectOrArray)) {
            var type = jsxChildrenParents.get(objectOrArray);
            str = "<" + describeElementType(type) + ">";
            var array = objectOrArray;
            for (var i = 0;i < array.length; i++) {
              var value = array[i];
              var substr = undefined;
              if (typeof value === "string") {
                substr = value;
              } else if (typeof value === "object" && value !== null) {
                substr = "{" + describeObjectForErrorMessage(value) + "}";
              } else {
                substr = "{" + describeValueForErrorMessage(value) + "}";
              }
              if ("" + i === expandedName) {
                start = str.length;
                length = substr.length;
                str += substr;
              } else if (substr.length < 15 && str.length + substr.length < 40) {
                str += substr;
              } else {
                str += "{...}";
              }
            }
            str += "</" + describeElementType(type) + ">";
          } else {
            str = "[";
            var _array = objectOrArray;
            for (var _i = 0;_i < _array.length; _i++) {
              if (_i > 0) {
                str += ", ";
              }
              var _value = _array[_i];
              var _substr = undefined;
              if (typeof _value === "object" && _value !== null) {
                _substr = describeObjectForErrorMessage(_value);
              } else {
                _substr = describeValueForErrorMessage(_value);
              }
              if ("" + _i === expandedName) {
                start = str.length;
                length = _substr.length;
                str += _substr;
              } else if (_substr.length < 10 && str.length + _substr.length < 40) {
                str += _substr;
              } else {
                str += "...";
              }
            }
            str += "]";
          }
        } else {
          if (objectOrArray.$$typeof === REACT_ELEMENT_TYPE) {
            str = "<" + describeElementType(objectOrArray.type) + "/>";
          } else if (objectOrArray.$$typeof === CLIENT_REFERENCE_TAG) {
            return describeClientReference();
          } else if (jsxPropsParents.has(objectOrArray)) {
            var _type = jsxPropsParents.get(objectOrArray);
            str = "<" + (describeElementType(_type) || "...");
            var object = objectOrArray;
            var names = Object.keys(object);
            for (var _i2 = 0;_i2 < names.length; _i2++) {
              str += " ";
              var name = names[_i2];
              str += describeKeyForErrorMessage(name) + "=";
              var _value2 = object[name];
              var _substr2 = undefined;
              if (name === expandedName && typeof _value2 === "object" && _value2 !== null) {
                _substr2 = describeObjectForErrorMessage(_value2);
              } else {
                _substr2 = describeValueForErrorMessage(_value2);
              }
              if (typeof _value2 !== "string") {
                _substr2 = "{" + _substr2 + "}";
              }
              if (name === expandedName) {
                start = str.length;
                length = _substr2.length;
                str += _substr2;
              } else if (_substr2.length < 10 && str.length + _substr2.length < 40) {
                str += _substr2;
              } else {
                str += "...";
              }
            }
            str += ">";
          } else {
            str = "{";
            var _object = objectOrArray;
            var _names = Object.keys(_object);
            for (var _i3 = 0;_i3 < _names.length; _i3++) {
              if (_i3 > 0) {
                str += ", ";
              }
              var _name2 = _names[_i3];
              str += describeKeyForErrorMessage(_name2) + ": ";
              var _value3 = _object[_name2];
              var _substr3 = undefined;
              if (typeof _value3 === "object" && _value3 !== null) {
                _substr3 = describeObjectForErrorMessage(_value3);
              } else {
                _substr3 = describeValueForErrorMessage(_value3);
              }
              if (_name2 === expandedName) {
                start = str.length;
                length = _substr3.length;
                str += _substr3;
              } else if (_substr3.length < 10 && str.length + _substr3.length < 40) {
                str += _substr3;
              } else {
                str += "...";
              }
            }
            str += "}";
          }
        }
        if (expandedName === undefined) {
          return str;
        }
        if (start > -1 && length > 0) {
          var highlight = " ".repeat(start) + "^".repeat(length);
          return "\n  " + str + "\n  " + highlight;
        }
        return "\n  " + str;
      }
      function createTemporaryReferenceSet() {
        return new Map;
      }
      function writeTemporaryReference(set, reference, object) {
        set.set(reference, object);
      }
      function readTemporaryReference(set, reference) {
        return set.get(reference);
      }
      var ObjectPrototype = Object.prototype;
      var knownServerReferences = new WeakMap;
      function serializeByValueID(id) {
        return "$" + id.toString(16);
      }
      function serializePromiseID(id) {
        return "$@" + id.toString(16);
      }
      function serializeServerReferenceID(id) {
        return "$F" + id.toString(16);
      }
      function serializeTemporaryReferenceMarker() {
        return "$T";
      }
      function serializeFormDataReference(id) {
        return "$K" + id.toString(16);
      }
      function serializeNumber(number) {
        if (Number.isFinite(number)) {
          if (number === 0 && 1 / number === -Infinity) {
            return "$-0";
          } else {
            return number;
          }
        } else {
          if (number === Infinity) {
            return "$Infinity";
          } else if (number === -Infinity) {
            return "$-Infinity";
          } else {
            return "$NaN";
          }
        }
      }
      function serializeUndefined() {
        return "$undefined";
      }
      function serializeDateFromDateJSON(dateJSON) {
        return "$D" + dateJSON;
      }
      function serializeBigInt(n) {
        return "$n" + n.toString(10);
      }
      function serializeMapID(id) {
        return "$Q" + id.toString(16);
      }
      function serializeSetID(id) {
        return "$W" + id.toString(16);
      }
      function serializeBlobID(id) {
        return "$B" + id.toString(16);
      }
      function serializeIteratorID(id) {
        return "$i" + id.toString(16);
      }
      function escapeStringValue(value) {
        if (value[0] === "$") {
          return "$" + value;
        } else {
          return value;
        }
      }
      function processReply(root, formFieldPrefix, temporaryReferences, resolve, reject) {
        var nextPartId = 1;
        var pendingParts = 0;
        var formData = null;
        var writtenObjects = new WeakMap;
        var modelRoot = root;
        function serializeTypedArray(tag, typedArray) {
          var blob = new Blob([
            new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength)
          ]);
          var blobId = nextPartId++;
          if (formData === null) {
            formData = new FormData;
          }
          formData.append(formFieldPrefix + blobId, blob);
          return "$" + tag + blobId.toString(16);
        }
        function serializeBinaryReader(reader) {
          if (formData === null) {
            formData = new FormData;
          }
          var data = formData;
          pendingParts++;
          var streamId = nextPartId++;
          var buffer = [];
          function progress(entry) {
            if (entry.done) {
              var blobId = nextPartId++;
              data.append(formFieldPrefix + blobId, new Blob(buffer));
              data.append(formFieldPrefix + streamId, '"$o' + blobId.toString(16) + '"');
              data.append(formFieldPrefix + streamId, "C");
              pendingParts--;
              if (pendingParts === 0) {
                resolve(data);
              }
            } else {
              buffer.push(entry.value);
              reader.read(new Uint8Array(1024)).then(progress, reject);
            }
          }
          reader.read(new Uint8Array(1024)).then(progress, reject);
          return "$r" + streamId.toString(16);
        }
        function serializeReader(reader) {
          if (formData === null) {
            formData = new FormData;
          }
          var data = formData;
          pendingParts++;
          var streamId = nextPartId++;
          function progress(entry) {
            if (entry.done) {
              data.append(formFieldPrefix + streamId, "C");
              pendingParts--;
              if (pendingParts === 0) {
                resolve(data);
              }
            } else {
              try {
                var partJSON = JSON.stringify(entry.value, resolveToJSON);
                data.append(formFieldPrefix + streamId, partJSON);
                reader.read().then(progress, reject);
              } catch (x) {
                reject(x);
              }
            }
          }
          reader.read().then(progress, reject);
          return "$R" + streamId.toString(16);
        }
        function serializeReadableStream(stream) {
          var binaryReader;
          try {
            binaryReader = stream.getReader({
              mode: "byob"
            });
          } catch (x) {
            return serializeReader(stream.getReader());
          }
          return serializeBinaryReader(binaryReader);
        }
        function serializeAsyncIterable(iterable, iterator) {
          if (formData === null) {
            formData = new FormData;
          }
          var data = formData;
          pendingParts++;
          var streamId = nextPartId++;
          var isIterator = iterable === iterator;
          function progress(entry) {
            if (entry.done) {
              if (entry.value === undefined) {
                data.append(formFieldPrefix + streamId, "C");
              } else {
                try {
                  var partJSON = JSON.stringify(entry.value, resolveToJSON);
                  data.append(formFieldPrefix + streamId, "C" + partJSON);
                } catch (x) {
                  reject(x);
                  return;
                }
              }
              pendingParts--;
              if (pendingParts === 0) {
                resolve(data);
              }
            } else {
              try {
                var _partJSON = JSON.stringify(entry.value, resolveToJSON);
                data.append(formFieldPrefix + streamId, _partJSON);
                iterator.next().then(progress, reject);
              } catch (x) {
                reject(x);
                return;
              }
            }
          }
          iterator.next().then(progress, reject);
          return "$" + (isIterator ? "x" : "X") + streamId.toString(16);
        }
        function resolveToJSON(key, value) {
          var parent = this;
          {
            var originalValue = parent[key];
            if (typeof originalValue === "object" && originalValue !== value && !(originalValue instanceof Date)) {
              if (objectName(originalValue) !== "Object") {
                error("Only plain objects can be passed to Server Functions from the Client. %s objects are not supported.%s", objectName(originalValue), describeObjectForErrorMessage(parent, key));
              } else {
                error("Only plain objects can be passed to Server Functions from the Client. Objects with toJSON methods are not supported. Convert it manually to a simple value before passing it to props.%s", describeObjectForErrorMessage(parent, key));
              }
            }
          }
          if (value === null) {
            return null;
          }
          if (typeof value === "object") {
            switch (value.$$typeof) {
              case REACT_ELEMENT_TYPE: {
                if (temporaryReferences !== undefined && key.indexOf(":") === -1) {
                  var parentReference = writtenObjects.get(parent);
                  if (parentReference !== undefined) {
                    var reference = parentReference + ":" + key;
                    writeTemporaryReference(temporaryReferences, reference, value);
                    return serializeTemporaryReferenceMarker();
                  }
                }
                throw new Error("React Element cannot be passed to Server Functions from the Client without a temporary reference set. Pass a TemporaryReferenceSet to the options." + describeObjectForErrorMessage(parent, key));
              }
              case REACT_LAZY_TYPE: {
                var lazy = value;
                var payload = lazy._payload;
                var init = lazy._init;
                if (formData === null) {
                  formData = new FormData;
                }
                pendingParts++;
                try {
                  var resolvedModel = init(payload);
                  var lazyId = nextPartId++;
                  var partJSON = serializeModel(resolvedModel, lazyId);
                  var data = formData;
                  data.append(formFieldPrefix + lazyId, partJSON);
                  return serializeByValueID(lazyId);
                } catch (x) {
                  if (typeof x === "object" && x !== null && typeof x.then === "function") {
                    pendingParts++;
                    var _lazyId = nextPartId++;
                    var thenable = x;
                    var retry = function() {
                      try {
                        var _partJSON2 = serializeModel(value, _lazyId);
                        var _data = formData;
                        _data.append(formFieldPrefix + _lazyId, _partJSON2);
                        pendingParts--;
                        if (pendingParts === 0) {
                          resolve(_data);
                        }
                      } catch (reason) {
                        reject(reason);
                      }
                    };
                    thenable.then(retry, retry);
                    return serializeByValueID(_lazyId);
                  } else {
                    reject(x);
                    return null;
                  }
                } finally {
                  pendingParts--;
                }
              }
            }
            if (typeof value.then === "function") {
              if (formData === null) {
                formData = new FormData;
              }
              pendingParts++;
              var promiseId = nextPartId++;
              var _thenable = value;
              _thenable.then(function(partValue) {
                try {
                  var _partJSON3 = serializeModel(partValue, promiseId);
                  var _data2 = formData;
                  _data2.append(formFieldPrefix + promiseId, _partJSON3);
                  pendingParts--;
                  if (pendingParts === 0) {
                    resolve(_data2);
                  }
                } catch (reason) {
                  reject(reason);
                }
              }, reject);
              return serializePromiseID(promiseId);
            }
            var existingReference = writtenObjects.get(value);
            if (existingReference !== undefined) {
              if (modelRoot === value) {
                modelRoot = null;
              } else {
                return existingReference;
              }
            } else if (key.indexOf(":") === -1) {
              var _parentReference = writtenObjects.get(parent);
              if (_parentReference !== undefined) {
                var _reference = _parentReference + ":" + key;
                writtenObjects.set(value, _reference);
                if (temporaryReferences !== undefined) {
                  writeTemporaryReference(temporaryReferences, _reference, value);
                }
              }
            }
            if (isArray(value)) {
              return value;
            }
            if (value instanceof FormData) {
              if (formData === null) {
                formData = new FormData;
              }
              var _data3 = formData;
              var refId = nextPartId++;
              var prefix = formFieldPrefix + refId + "_";
              value.forEach(function(originalValue2, originalKey) {
                _data3.append(prefix + originalKey, originalValue2);
              });
              return serializeFormDataReference(refId);
            }
            if (value instanceof Map) {
              var mapId = nextPartId++;
              var _partJSON4 = serializeModel(Array.from(value), mapId);
              if (formData === null) {
                formData = new FormData;
              }
              formData.append(formFieldPrefix + mapId, _partJSON4);
              return serializeMapID(mapId);
            }
            if (value instanceof Set) {
              var setId = nextPartId++;
              var _partJSON5 = serializeModel(Array.from(value), setId);
              if (formData === null) {
                formData = new FormData;
              }
              formData.append(formFieldPrefix + setId, _partJSON5);
              return serializeSetID(setId);
            }
            {
              if (value instanceof ArrayBuffer) {
                var blob = new Blob([value]);
                var blobId = nextPartId++;
                if (formData === null) {
                  formData = new FormData;
                }
                formData.append(formFieldPrefix + blobId, blob);
                return "$A" + blobId.toString(16);
              }
              if (value instanceof Int8Array) {
                return serializeTypedArray("O", value);
              }
              if (value instanceof Uint8Array) {
                return serializeTypedArray("o", value);
              }
              if (value instanceof Uint8ClampedArray) {
                return serializeTypedArray("U", value);
              }
              if (value instanceof Int16Array) {
                return serializeTypedArray("S", value);
              }
              if (value instanceof Uint16Array) {
                return serializeTypedArray("s", value);
              }
              if (value instanceof Int32Array) {
                return serializeTypedArray("L", value);
              }
              if (value instanceof Uint32Array) {
                return serializeTypedArray("l", value);
              }
              if (value instanceof Float32Array) {
                return serializeTypedArray("G", value);
              }
              if (value instanceof Float64Array) {
                return serializeTypedArray("g", value);
              }
              if (value instanceof BigInt64Array) {
                return serializeTypedArray("M", value);
              }
              if (value instanceof BigUint64Array) {
                return serializeTypedArray("m", value);
              }
              if (value instanceof DataView) {
                return serializeTypedArray("V", value);
              }
              if (typeof Blob === "function" && value instanceof Blob) {
                if (formData === null) {
                  formData = new FormData;
                }
                var _blobId = nextPartId++;
                formData.append(formFieldPrefix + _blobId, value);
                return serializeBlobID(_blobId);
              }
            }
            var iteratorFn = getIteratorFn(value);
            if (iteratorFn) {
              var iterator = iteratorFn.call(value);
              if (iterator === value) {
                var iteratorId = nextPartId++;
                var _partJSON6 = serializeModel(Array.from(iterator), iteratorId);
                if (formData === null) {
                  formData = new FormData;
                }
                formData.append(formFieldPrefix + iteratorId, _partJSON6);
                return serializeIteratorID(iteratorId);
              }
              return Array.from(iterator);
            }
            {
              if (typeof ReadableStream === "function" && value instanceof ReadableStream) {
                return serializeReadableStream(value);
              }
              var getAsyncIterator = value[ASYNC_ITERATOR];
              if (typeof getAsyncIterator === "function") {
                return serializeAsyncIterable(value, getAsyncIterator.call(value));
              }
            }
            var proto = getPrototypeOf(value);
            if (proto !== ObjectPrototype && (proto === null || getPrototypeOf(proto) !== null)) {
              if (temporaryReferences === undefined) {
                throw new Error("Only plain objects, and a few built-ins, can be passed to Server Actions. Classes or null prototypes are not supported.");
              }
              return serializeTemporaryReferenceMarker();
            }
            {
              if (value.$$typeof === REACT_CONTEXT_TYPE) {
                error("React Context Providers cannot be passed to Server Functions from the Client.%s", describeObjectForErrorMessage(parent, key));
              } else if (objectName(value) !== "Object") {
                error("Only plain objects can be passed to Server Functions from the Client. %s objects are not supported.%s", objectName(value), describeObjectForErrorMessage(parent, key));
              } else if (!isSimpleObject(value)) {
                error("Only plain objects can be passed to Server Functions from the Client. Classes or other objects with methods are not supported.%s", describeObjectForErrorMessage(parent, key));
              } else if (Object.getOwnPropertySymbols) {
                var symbols = Object.getOwnPropertySymbols(value);
                if (symbols.length > 0) {
                  error("Only plain objects can be passed to Server Functions from the Client. Objects with symbol properties like %s are not supported.%s", symbols[0].description, describeObjectForErrorMessage(parent, key));
                }
              }
            }
            return value;
          }
          if (typeof value === "string") {
            if (value[value.length - 1] === "Z") {
              var _originalValue = parent[key];
              if (_originalValue instanceof Date) {
                return serializeDateFromDateJSON(value);
              }
            }
            return escapeStringValue(value);
          }
          if (typeof value === "boolean") {
            return value;
          }
          if (typeof value === "number") {
            return serializeNumber(value);
          }
          if (typeof value === "undefined") {
            return serializeUndefined();
          }
          if (typeof value === "function") {
            var metaData = knownServerReferences.get(value);
            if (metaData !== undefined) {
              var metaDataJSON = JSON.stringify(metaData, resolveToJSON);
              if (formData === null) {
                formData = new FormData;
              }
              var _refId = nextPartId++;
              formData.set(formFieldPrefix + _refId, metaDataJSON);
              return serializeServerReferenceID(_refId);
            }
            if (temporaryReferences !== undefined && key.indexOf(":") === -1) {
              var _parentReference2 = writtenObjects.get(parent);
              if (_parentReference2 !== undefined) {
                var _reference2 = _parentReference2 + ":" + key;
                writeTemporaryReference(temporaryReferences, _reference2, value);
                return serializeTemporaryReferenceMarker();
              }
            }
            throw new Error("Client Functions cannot be passed directly to Server Functions. Only Functions passed from the Server can be passed back again.");
          }
          if (typeof value === "symbol") {
            if (temporaryReferences !== undefined && key.indexOf(":") === -1) {
              var _parentReference3 = writtenObjects.get(parent);
              if (_parentReference3 !== undefined) {
                var _reference3 = _parentReference3 + ":" + key;
                writeTemporaryReference(temporaryReferences, _reference3, value);
                return serializeTemporaryReferenceMarker();
              }
            }
            throw new Error("Symbols cannot be passed to a Server Function without a temporary reference set. Pass a TemporaryReferenceSet to the options." + describeObjectForErrorMessage(parent, key));
          }
          if (typeof value === "bigint") {
            return serializeBigInt(value);
          }
          throw new Error("Type " + typeof value + " is not supported as an argument to a Server Function.");
        }
        function serializeModel(model, id) {
          if (typeof model === "object" && model !== null) {
            var reference = serializeByValueID(id);
            writtenObjects.set(model, reference);
            if (temporaryReferences !== undefined) {
              writeTemporaryReference(temporaryReferences, reference, model);
            }
          }
          modelRoot = model;
          return JSON.stringify(model, resolveToJSON);
        }
        var json = serializeModel(root, 0);
        if (formData === null) {
          resolve(json);
        } else {
          formData.set(formFieldPrefix + "0", json);
          if (pendingParts === 0) {
            resolve(formData);
          }
        }
      }
      function registerServerReference(proxy, reference, encodeFormAction) {
        knownServerReferences.set(proxy, reference);
      }
      function createServerReference(id, callServer, encodeFormAction) {
        var proxy = function() {
          var args = Array.prototype.slice.call(arguments);
          return callServer(id, args);
        };
        registerServerReference(proxy, {
          id,
          bound: null
        });
        return proxy;
      }
      var ROW_ID = 0;
      var ROW_TAG = 1;
      var ROW_LENGTH = 2;
      var ROW_CHUNK_BY_NEWLINE = 3;
      var ROW_CHUNK_BY_LENGTH = 4;
      var PENDING = "pending";
      var BLOCKED = "blocked";
      var CYCLIC = "cyclic";
      var RESOLVED_MODEL = "resolved_model";
      var RESOLVED_MODULE = "resolved_module";
      var INITIALIZED = "fulfilled";
      var ERRORED = "rejected";
      function Chunk(status, value, reason, response) {
        this.status = status;
        this.value = value;
        this.reason = reason;
        this._response = response;
        {
          this._debugInfo = null;
        }
      }
      Chunk.prototype = Object.create(Promise.prototype);
      Chunk.prototype.then = function(resolve, reject) {
        var chunk = this;
        switch (chunk.status) {
          case RESOLVED_MODEL:
            initializeModelChunk(chunk);
            break;
          case RESOLVED_MODULE:
            initializeModuleChunk(chunk);
            break;
        }
        switch (chunk.status) {
          case INITIALIZED:
            resolve(chunk.value);
            break;
          case PENDING:
          case BLOCKED:
          case CYCLIC:
            if (resolve) {
              if (chunk.value === null) {
                chunk.value = [];
              }
              chunk.value.push(resolve);
            }
            if (reject) {
              if (chunk.reason === null) {
                chunk.reason = [];
              }
              chunk.reason.push(reject);
            }
            break;
          default:
            if (reject) {
              reject(chunk.reason);
            }
            break;
        }
      };
      function readChunk(chunk) {
        switch (chunk.status) {
          case RESOLVED_MODEL:
            initializeModelChunk(chunk);
            break;
          case RESOLVED_MODULE:
            initializeModuleChunk(chunk);
            break;
        }
        switch (chunk.status) {
          case INITIALIZED:
            return chunk.value;
          case PENDING:
          case BLOCKED:
          case CYCLIC:
            throw chunk;
          default:
            throw chunk.reason;
        }
      }
      function getRoot(response) {
        var chunk = getChunk(response, 0);
        return chunk;
      }
      function createPendingChunk(response) {
        return new Chunk(PENDING, null, null, response);
      }
      function createBlockedChunk(response) {
        return new Chunk(BLOCKED, null, null, response);
      }
      function createErrorChunk(response, error2) {
        return new Chunk(ERRORED, null, error2, response);
      }
      function wakeChunk(listeners, value) {
        for (var i = 0;i < listeners.length; i++) {
          var listener = listeners[i];
          listener(value);
        }
      }
      function wakeChunkIfInitialized(chunk, resolveListeners, rejectListeners) {
        switch (chunk.status) {
          case INITIALIZED:
            wakeChunk(resolveListeners, chunk.value);
            break;
          case PENDING:
          case BLOCKED:
          case CYCLIC:
            chunk.value = resolveListeners;
            chunk.reason = rejectListeners;
            break;
          case ERRORED:
            if (rejectListeners) {
              wakeChunk(rejectListeners, chunk.reason);
            }
            break;
        }
      }
      function triggerErrorOnChunk(chunk, error2) {
        if (chunk.status !== PENDING && chunk.status !== BLOCKED) {
          {
            var streamChunk = chunk;
            var controller = streamChunk.reason;
            controller.error(error2);
          }
          return;
        }
        var listeners = chunk.reason;
        var erroredChunk = chunk;
        erroredChunk.status = ERRORED;
        erroredChunk.reason = error2;
        if (listeners !== null) {
          wakeChunk(listeners, error2);
        }
      }
      function createResolvedModelChunk(response, value) {
        return new Chunk(RESOLVED_MODEL, value, null, response);
      }
      function createResolvedModuleChunk(response, value) {
        return new Chunk(RESOLVED_MODULE, value, null, response);
      }
      function createInitializedTextChunk(response, value) {
        return new Chunk(INITIALIZED, value, null, response);
      }
      function createInitializedBufferChunk(response, value) {
        return new Chunk(INITIALIZED, value, null, response);
      }
      function createInitializedIteratorResultChunk(response, value, done) {
        return new Chunk(INITIALIZED, {
          done,
          value
        }, null, response);
      }
      function createInitializedStreamChunk(response, value, controller) {
        return new Chunk(INITIALIZED, value, controller, response);
      }
      function createResolvedIteratorResultChunk(response, value, done) {
        var iteratorResultJSON = (done ? '{"done":true,"value":' : '{"done":false,"value":') + value + "}";
        return new Chunk(RESOLVED_MODEL, iteratorResultJSON, null, response);
      }
      function resolveIteratorResultChunk(chunk, value, done) {
        var iteratorResultJSON = (done ? '{"done":true,"value":' : '{"done":false,"value":') + value + "}";
        resolveModelChunk(chunk, iteratorResultJSON);
      }
      function resolveModelChunk(chunk, value) {
        if (chunk.status !== PENDING) {
          {
            var streamChunk = chunk;
            var controller = streamChunk.reason;
            controller.enqueueModel(value);
          }
          return;
        }
        var resolveListeners = chunk.value;
        var rejectListeners = chunk.reason;
        var resolvedChunk = chunk;
        resolvedChunk.status = RESOLVED_MODEL;
        resolvedChunk.value = value;
        if (resolveListeners !== null) {
          initializeModelChunk(resolvedChunk);
          wakeChunkIfInitialized(chunk, resolveListeners, rejectListeners);
        }
      }
      function resolveModuleChunk(chunk, value) {
        if (chunk.status !== PENDING && chunk.status !== BLOCKED) {
          return;
        }
        var resolveListeners = chunk.value;
        var rejectListeners = chunk.reason;
        var resolvedChunk = chunk;
        resolvedChunk.status = RESOLVED_MODULE;
        resolvedChunk.value = value;
        if (resolveListeners !== null) {
          initializeModuleChunk(resolvedChunk);
          wakeChunkIfInitialized(chunk, resolveListeners, rejectListeners);
        }
      }
      var initializingChunk = null;
      var initializingChunkBlockedModel = null;
      function initializeModelChunk(chunk) {
        var prevChunk = initializingChunk;
        var prevBlocked = initializingChunkBlockedModel;
        initializingChunk = chunk;
        initializingChunkBlockedModel = null;
        var resolvedModel = chunk.value;
        var cyclicChunk = chunk;
        cyclicChunk.status = CYCLIC;
        cyclicChunk.value = null;
        cyclicChunk.reason = null;
        try {
          var value = parseModel(chunk._response, resolvedModel);
          if (initializingChunkBlockedModel !== null && initializingChunkBlockedModel.deps > 0) {
            initializingChunkBlockedModel.value = value;
            var blockedChunk = chunk;
            blockedChunk.status = BLOCKED;
            blockedChunk.value = null;
            blockedChunk.reason = null;
          } else {
            var resolveListeners = cyclicChunk.value;
            var initializedChunk = chunk;
            initializedChunk.status = INITIALIZED;
            initializedChunk.value = value;
            if (resolveListeners !== null) {
              wakeChunk(resolveListeners, value);
            }
          }
        } catch (error2) {
          var erroredChunk = chunk;
          erroredChunk.status = ERRORED;
          erroredChunk.reason = error2;
        } finally {
          initializingChunk = prevChunk;
          initializingChunkBlockedModel = prevBlocked;
        }
      }
      function initializeModuleChunk(chunk) {
        try {
          var value = requireModule(chunk.value);
          var initializedChunk = chunk;
          initializedChunk.status = INITIALIZED;
          initializedChunk.value = value;
        } catch (error2) {
          var erroredChunk = chunk;
          erroredChunk.status = ERRORED;
          erroredChunk.reason = error2;
        }
      }
      function reportGlobalError(response, error2) {
        response._chunks.forEach(function(chunk) {
          if (chunk.status === PENDING) {
            triggerErrorOnChunk(chunk, error2);
          }
        });
      }
      function nullRefGetter() {
        {
          return null;
        }
      }
      function createElement(type, key, props, owner, stack) {
        var element;
        {
          element = {
            $$typeof: REACT_ELEMENT_TYPE,
            type,
            key,
            props,
            _owner: owner
          };
          Object.defineProperty(element, "ref", {
            enumerable: false,
            get: nullRefGetter
          });
        }
        {
          element._store = {};
          Object.defineProperty(element._store, "validated", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: true
          });
          Object.defineProperty(element, "_debugInfo", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: null
          });
          if (initializingChunkBlockedModel !== null) {
            var freeze = Object.freeze.bind(Object, element.props);
            initializingChunk.then(freeze, freeze);
          } else {
            Object.freeze(element.props);
          }
        }
        return element;
      }
      function createLazyChunkWrapper(chunk) {
        var lazyType = {
          $$typeof: REACT_LAZY_TYPE,
          _payload: chunk,
          _init: readChunk
        };
        {
          var chunkDebugInfo = chunk._debugInfo || (chunk._debugInfo = []);
          lazyType._debugInfo = chunkDebugInfo;
        }
        return lazyType;
      }
      function getChunk(response, id) {
        var chunks = response._chunks;
        var chunk = chunks.get(id);
        if (!chunk) {
          chunk = createPendingChunk(response);
          chunks.set(id, chunk);
        }
        return chunk;
      }
      function createModelResolver(chunk, parentObject, key, cyclic, response, map, path) {
        var blocked;
        if (initializingChunkBlockedModel) {
          blocked = initializingChunkBlockedModel;
          if (!cyclic) {
            blocked.deps++;
          }
        } else {
          blocked = initializingChunkBlockedModel = {
            deps: cyclic ? 0 : 1,
            value: null
          };
        }
        return function(value) {
          for (var i = 1;i < path.length; i++) {
            value = value[path[i]];
          }
          parentObject[key] = map(response, value);
          if (key === "" && blocked.value === null) {
            blocked.value = parentObject[key];
          }
          blocked.deps--;
          if (blocked.deps === 0) {
            if (chunk.status !== BLOCKED) {
              return;
            }
            var resolveListeners = chunk.value;
            var initializedChunk = chunk;
            initializedChunk.status = INITIALIZED;
            initializedChunk.value = blocked.value;
            if (resolveListeners !== null) {
              wakeChunk(resolveListeners, blocked.value);
            }
          }
        };
      }
      function createModelReject(chunk) {
        return function(error2) {
          return triggerErrorOnChunk(chunk, error2);
        };
      }
      function createServerReferenceProxy(response, metaData) {
        var callServer = response._callServer;
        var proxy = function() {
          var args = Array.prototype.slice.call(arguments);
          var p = metaData.bound;
          if (!p) {
            return callServer(metaData.id, args);
          }
          if (p.status === INITIALIZED) {
            var bound = p.value;
            return callServer(metaData.id, bound.concat(args));
          }
          return Promise.resolve(p).then(function(bound2) {
            return callServer(metaData.id, bound2.concat(args));
          });
        };
        registerServerReference(proxy, metaData);
        return proxy;
      }
      function getOutlinedModel(response, reference, parentObject, key, map) {
        var path = reference.split(":");
        var id = parseInt(path[0], 16);
        var chunk = getChunk(response, id);
        switch (chunk.status) {
          case RESOLVED_MODEL:
            initializeModelChunk(chunk);
            break;
          case RESOLVED_MODULE:
            initializeModuleChunk(chunk);
            break;
        }
        switch (chunk.status) {
          case INITIALIZED:
            var value = chunk.value;
            for (var i = 1;i < path.length; i++) {
              value = value[path[i]];
            }
            var chunkValue = map(response, value);
            if (chunk._debugInfo) {
              if (typeof chunkValue === "object" && chunkValue !== null && (Array.isArray(chunkValue) || typeof chunkValue[ASYNC_ITERATOR] === "function" || chunkValue.$$typeof === REACT_ELEMENT_TYPE) && !chunkValue._debugInfo) {
                Object.defineProperty(chunkValue, "_debugInfo", {
                  configurable: false,
                  enumerable: false,
                  writable: true,
                  value: chunk._debugInfo
                });
              }
            }
            return chunkValue;
          case PENDING:
          case BLOCKED:
          case CYCLIC:
            var parentChunk = initializingChunk;
            chunk.then(createModelResolver(parentChunk, parentObject, key, chunk.status === CYCLIC, response, map, path), createModelReject(parentChunk));
            return null;
          default:
            throw chunk.reason;
        }
      }
      function createMap(response, model) {
        return new Map(model);
      }
      function createSet(response, model) {
        return new Set(model);
      }
      function createBlob(response, model) {
        return new Blob(model.slice(1), {
          type: model[0]
        });
      }
      function createFormData(response, model) {
        var formData = new FormData;
        for (var i = 0;i < model.length; i++) {
          formData.append(model[i][0], model[i][1]);
        }
        return formData;
      }
      function extractIterator(response, model) {
        return model[Symbol.iterator]();
      }
      function createModel(response, model) {
        return model;
      }
      function parseModelString(response, parentObject, key, value) {
        if (value[0] === "$") {
          if (value === "$") {
            return REACT_ELEMENT_TYPE;
          }
          switch (value[1]) {
            case "$": {
              return value.slice(1);
            }
            case "L": {
              var id = parseInt(value.slice(2), 16);
              var chunk = getChunk(response, id);
              return createLazyChunkWrapper(chunk);
            }
            case "@": {
              if (value.length === 2) {
                return new Promise(function() {
                });
              }
              var _id = parseInt(value.slice(2), 16);
              var _chunk = getChunk(response, _id);
              return _chunk;
            }
            case "S": {
              return Symbol.for(value.slice(2));
            }
            case "F": {
              var ref = value.slice(2);
              return getOutlinedModel(response, ref, parentObject, key, createServerReferenceProxy);
            }
            case "T": {
              var reference = "$" + value.slice(2);
              var temporaryReferences = response._tempRefs;
              if (temporaryReferences == null) {
                throw new Error("Missing a temporary reference set but the RSC response returned a temporary reference. Pass a temporaryReference option with the set that was used with the reply.");
              }
              return readTemporaryReference(temporaryReferences, reference);
            }
            case "Q": {
              var _ref = value.slice(2);
              return getOutlinedModel(response, _ref, parentObject, key, createMap);
            }
            case "W": {
              var _ref2 = value.slice(2);
              return getOutlinedModel(response, _ref2, parentObject, key, createSet);
            }
            case "B": {
              {
                var _ref3 = value.slice(2);
                return getOutlinedModel(response, _ref3, parentObject, key, createBlob);
              }
            }
            case "K": {
              var _ref4 = value.slice(2);
              return getOutlinedModel(response, _ref4, parentObject, key, createFormData);
            }
            case "i": {
              var _ref5 = value.slice(2);
              return getOutlinedModel(response, _ref5, parentObject, key, extractIterator);
            }
            case "I": {
              return Infinity;
            }
            case "-": {
              if (value === "$-0") {
                return -0;
              } else {
                return -Infinity;
              }
            }
            case "N": {
              return NaN;
            }
            case "u": {
              return;
            }
            case "D": {
              return new Date(Date.parse(value.slice(2)));
            }
            case "n": {
              return BigInt(value.slice(2));
            }
            case "E": {
              {
                try {
                  return (0, eval)(value.slice(2));
                } catch (x) {
                  return function() {
                  };
                }
              }
            }
            default: {
              var _ref6 = value.slice(1);
              return getOutlinedModel(response, _ref6, parentObject, key, createModel);
            }
          }
        }
        return value;
      }
      function parseModelTuple(response, value) {
        var tuple = value;
        if (tuple[0] === REACT_ELEMENT_TYPE) {
          return createElement(tuple[1], tuple[2], tuple[3], tuple[4]);
        }
        return value;
      }
      function missingCall() {
        throw new Error('Trying to call a function from "use server" but the callServer option was not implemented in your router runtime.');
      }
      function createResponse(bundlerConfig, moduleLoading, callServer, encodeFormAction, nonce, temporaryReferences) {
        var chunks = new Map;
        var response = {
          _bundlerConfig: bundlerConfig,
          _moduleLoading: moduleLoading,
          _callServer: callServer !== undefined ? callServer : missingCall,
          _encodeFormAction: encodeFormAction,
          _nonce: nonce,
          _chunks: chunks,
          _stringDecoder: createStringDecoder(),
          _fromJSON: null,
          _rowState: 0,
          _rowID: 0,
          _rowTag: 0,
          _rowLength: 0,
          _buffer: [],
          _tempRefs: temporaryReferences
        };
        response._fromJSON = createFromJSONCallback(response);
        return response;
      }
      function resolveModel(response, id, model) {
        var chunks = response._chunks;
        var chunk = chunks.get(id);
        if (!chunk) {
          chunks.set(id, createResolvedModelChunk(response, model));
        } else {
          resolveModelChunk(chunk, model);
        }
      }
      function resolveText(response, id, text) {
        var chunks = response._chunks;
        {
          var chunk = chunks.get(id);
          if (chunk && chunk.status !== PENDING) {
            var streamChunk = chunk;
            var controller = streamChunk.reason;
            controller.enqueueValue(text);
            return;
          }
        }
        chunks.set(id, createInitializedTextChunk(response, text));
      }
      function resolveBuffer(response, id, buffer) {
        var chunks = response._chunks;
        {
          var chunk = chunks.get(id);
          if (chunk && chunk.status !== PENDING) {
            var streamChunk = chunk;
            var controller = streamChunk.reason;
            controller.enqueueValue(buffer);
            return;
          }
        }
        chunks.set(id, createInitializedBufferChunk(response, buffer));
      }
      function resolveModule(response, id, model) {
        var chunks = response._chunks;
        var chunk = chunks.get(id);
        var clientReferenceMetadata = parseModel(response, model);
        var clientReference = resolveClientReference(response._bundlerConfig, clientReferenceMetadata);
        var promise = preloadModule(clientReference);
        if (promise) {
          var blockedChunk;
          if (!chunk) {
            blockedChunk = createBlockedChunk(response);
            chunks.set(id, blockedChunk);
          } else {
            blockedChunk = chunk;
            blockedChunk.status = BLOCKED;
          }
          promise.then(function() {
            return resolveModuleChunk(blockedChunk, clientReference);
          }, function(error2) {
            return triggerErrorOnChunk(blockedChunk, error2);
          });
        } else {
          if (!chunk) {
            chunks.set(id, createResolvedModuleChunk(response, clientReference));
          } else {
            resolveModuleChunk(chunk, clientReference);
          }
        }
      }
      function resolveStream(response, id, stream, controller) {
        var chunks = response._chunks;
        var chunk = chunks.get(id);
        if (!chunk) {
          chunks.set(id, createInitializedStreamChunk(response, stream, controller));
          return;
        }
        if (chunk.status !== PENDING) {
          return;
        }
        var resolveListeners = chunk.value;
        var resolvedChunk = chunk;
        resolvedChunk.status = INITIALIZED;
        resolvedChunk.value = stream;
        resolvedChunk.reason = controller;
        if (resolveListeners !== null) {
          wakeChunk(resolveListeners, chunk.value);
        }
      }
      function startReadableStream(response, id, type) {
        var controller = null;
        var stream = new ReadableStream({
          type,
          start: function(c) {
            controller = c;
          }
        });
        var previousBlockedChunk = null;
        var flightController = {
          enqueueValue: function(value) {
            if (previousBlockedChunk === null) {
              controller.enqueue(value);
            } else {
              previousBlockedChunk.then(function() {
                controller.enqueue(value);
              });
            }
          },
          enqueueModel: function(json) {
            if (previousBlockedChunk === null) {
              var chunk = createResolvedModelChunk(response, json);
              initializeModelChunk(chunk);
              var initializedChunk = chunk;
              if (initializedChunk.status === INITIALIZED) {
                controller.enqueue(initializedChunk.value);
              } else {
                chunk.then(function(v) {
                  return controller.enqueue(v);
                }, function(e) {
                  return controller.error(e);
                });
                previousBlockedChunk = chunk;
              }
            } else {
              var blockedChunk = previousBlockedChunk;
              var _chunk2 = createPendingChunk(response);
              _chunk2.then(function(v) {
                return controller.enqueue(v);
              }, function(e) {
                return controller.error(e);
              });
              previousBlockedChunk = _chunk2;
              blockedChunk.then(function() {
                if (previousBlockedChunk === _chunk2) {
                  previousBlockedChunk = null;
                }
                resolveModelChunk(_chunk2, json);
              });
            }
          },
          close: function(json) {
            if (previousBlockedChunk === null) {
              controller.close();
            } else {
              var blockedChunk = previousBlockedChunk;
              previousBlockedChunk = null;
              blockedChunk.then(function() {
                return controller.close();
              });
            }
          },
          error: function(error2) {
            if (previousBlockedChunk === null) {
              controller.error(error2);
            } else {
              var blockedChunk = previousBlockedChunk;
              previousBlockedChunk = null;
              blockedChunk.then(function() {
                return controller.error(error2);
              });
            }
          }
        };
        resolveStream(response, id, stream, flightController);
      }
      function asyncIterator() {
        return this;
      }
      function createIterator(next) {
        var iterator = {
          next
        };
        iterator[ASYNC_ITERATOR] = asyncIterator;
        return iterator;
      }
      function startAsyncIterable(response, id, iterator) {
        var buffer = [];
        var closed = false;
        var nextWriteIndex = 0;
        var flightController = {
          enqueueValue: function(value) {
            if (nextWriteIndex === buffer.length) {
              buffer[nextWriteIndex] = createInitializedIteratorResultChunk(response, value, false);
            } else {
              var chunk = buffer[nextWriteIndex];
              var resolveListeners = chunk.value;
              var rejectListeners = chunk.reason;
              var initializedChunk = chunk;
              initializedChunk.status = INITIALIZED;
              initializedChunk.value = {
                done: false,
                value
              };
              if (resolveListeners !== null) {
                wakeChunkIfInitialized(chunk, resolveListeners, rejectListeners);
              }
            }
            nextWriteIndex++;
          },
          enqueueModel: function(value) {
            if (nextWriteIndex === buffer.length) {
              buffer[nextWriteIndex] = createResolvedIteratorResultChunk(response, value, false);
            } else {
              resolveIteratorResultChunk(buffer[nextWriteIndex], value, false);
            }
            nextWriteIndex++;
          },
          close: function(value) {
            closed = true;
            if (nextWriteIndex === buffer.length) {
              buffer[nextWriteIndex] = createResolvedIteratorResultChunk(response, value, true);
            } else {
              resolveIteratorResultChunk(buffer[nextWriteIndex], value, true);
            }
            nextWriteIndex++;
            while (nextWriteIndex < buffer.length) {
              resolveIteratorResultChunk(buffer[nextWriteIndex++], '"$undefined"', true);
            }
          },
          error: function(error2) {
            closed = true;
            if (nextWriteIndex === buffer.length) {
              buffer[nextWriteIndex] = createPendingChunk(response);
            }
            while (nextWriteIndex < buffer.length) {
              triggerErrorOnChunk(buffer[nextWriteIndex++], error2);
            }
          }
        };
        var iterable = _defineProperty({}, ASYNC_ITERATOR, function() {
          var nextReadIndex = 0;
          return createIterator(function(arg) {
            if (arg !== undefined) {
              throw new Error("Values cannot be passed to next() of AsyncIterables passed to Client Components.");
            }
            if (nextReadIndex === buffer.length) {
              if (closed) {
                return new Chunk(INITIALIZED, {
                  done: true,
                  value: undefined
                }, null, response);
              }
              buffer[nextReadIndex] = createPendingChunk(response);
            }
            return buffer[nextReadIndex++];
          });
        });
        resolveStream(response, id, iterator ? iterable[ASYNC_ITERATOR]() : iterable, flightController);
      }
      function stopStream(response, id, row) {
        var chunks = response._chunks;
        var chunk = chunks.get(id);
        if (!chunk || chunk.status !== INITIALIZED) {
          return;
        }
        var streamChunk = chunk;
        var controller = streamChunk.reason;
        controller.close(row === "" ? '"$undefined"' : row);
      }
      function resolveErrorDev(response, id, digest, message, stack) {
        var error2 = new Error(message || "An error occurred in the Server Components render but no message was provided");
        error2.stack = stack;
        error2.digest = digest;
        var errorWithDigest = error2;
        var chunks = response._chunks;
        var chunk = chunks.get(id);
        if (!chunk) {
          chunks.set(id, createErrorChunk(response, errorWithDigest));
        } else {
          triggerErrorOnChunk(chunk, errorWithDigest);
        }
      }
      function resolveHint(response, code, model) {
        var hintModel = parseModel(response, model);
        dispatchHint(code, hintModel);
      }
      function resolveDebugInfo(response, id, debugInfo) {
        var chunk = getChunk(response, id);
        var chunkDebugInfo = chunk._debugInfo || (chunk._debugInfo = []);
        chunkDebugInfo.push(debugInfo);
      }
      function resolveConsoleEntry(response, value) {
        var payload = parseModel(response, value);
        var methodName = payload[0];
        var env = payload[3];
        var args = payload.slice(4);
        printToConsole(methodName, args, env);
      }
      function mergeBuffer(buffer, lastChunk) {
        var l = buffer.length;
        var byteLength = lastChunk.length;
        for (var i = 0;i < l; i++) {
          byteLength += buffer[i].byteLength;
        }
        var result = new Uint8Array(byteLength);
        var offset = 0;
        for (var _i = 0;_i < l; _i++) {
          var chunk = buffer[_i];
          result.set(chunk, offset);
          offset += chunk.byteLength;
        }
        result.set(lastChunk, offset);
        return result;
      }
      function resolveTypedArray(response, id, buffer, lastChunk, constructor, bytesPerElement) {
        var chunk = buffer.length === 0 && lastChunk.byteOffset % bytesPerElement === 0 ? lastChunk : mergeBuffer(buffer, lastChunk);
        var view = new constructor(chunk.buffer, chunk.byteOffset, chunk.byteLength / bytesPerElement);
        resolveBuffer(response, id, view);
      }
      function processFullRow(response, id, tag, buffer, chunk) {
        {
          switch (tag) {
            case 65:
              resolveBuffer(response, id, mergeBuffer(buffer, chunk).buffer);
              return;
            case 79:
              resolveTypedArray(response, id, buffer, chunk, Int8Array, 1);
              return;
            case 111:
              resolveBuffer(response, id, buffer.length === 0 ? chunk : mergeBuffer(buffer, chunk));
              return;
            case 85:
              resolveTypedArray(response, id, buffer, chunk, Uint8ClampedArray, 1);
              return;
            case 83:
              resolveTypedArray(response, id, buffer, chunk, Int16Array, 2);
              return;
            case 115:
              resolveTypedArray(response, id, buffer, chunk, Uint16Array, 2);
              return;
            case 76:
              resolveTypedArray(response, id, buffer, chunk, Int32Array, 4);
              return;
            case 108:
              resolveTypedArray(response, id, buffer, chunk, Uint32Array, 4);
              return;
            case 71:
              resolveTypedArray(response, id, buffer, chunk, Float32Array, 4);
              return;
            case 103:
              resolveTypedArray(response, id, buffer, chunk, Float64Array, 8);
              return;
            case 77:
              resolveTypedArray(response, id, buffer, chunk, BigInt64Array, 8);
              return;
            case 109:
              resolveTypedArray(response, id, buffer, chunk, BigUint64Array, 8);
              return;
            case 86:
              resolveTypedArray(response, id, buffer, chunk, DataView, 1);
              return;
          }
        }
        var stringDecoder = response._stringDecoder;
        var row = "";
        for (var i = 0;i < buffer.length; i++) {
          row += readPartialStringChunk(stringDecoder, buffer[i]);
        }
        row += readFinalStringChunk(stringDecoder, chunk);
        switch (tag) {
          case 73: {
            resolveModule(response, id, row);
            return;
          }
          case 72: {
            var code = row[0];
            resolveHint(response, code, row.slice(1));
            return;
          }
          case 69: {
            var errorInfo = JSON.parse(row);
            {
              resolveErrorDev(response, id, errorInfo.digest, errorInfo.message, errorInfo.stack);
            }
            return;
          }
          case 84: {
            resolveText(response, id, row);
            return;
          }
          case 68: {
            {
              var debugInfo = parseModel(response, row);
              resolveDebugInfo(response, id, debugInfo);
              return;
            }
          }
          case 87: {
            {
              resolveConsoleEntry(response, row);
              return;
            }
          }
          case 82: {
            {
              startReadableStream(response, id, undefined);
              return;
            }
          }
          case 114: {
            {
              startReadableStream(response, id, "bytes");
              return;
            }
          }
          case 88: {
            {
              startAsyncIterable(response, id, false);
              return;
            }
          }
          case 120: {
            {
              startAsyncIterable(response, id, true);
              return;
            }
          }
          case 67: {
            {
              stopStream(response, id, row);
              return;
            }
          }
          case 80:
          default: {
            resolveModel(response, id, row);
            return;
          }
        }
      }
      function processBinaryChunk(response, chunk) {
        var i = 0;
        var rowState = response._rowState;
        var rowID = response._rowID;
        var rowTag = response._rowTag;
        var rowLength = response._rowLength;
        var buffer = response._buffer;
        var chunkLength = chunk.length;
        while (i < chunkLength) {
          var lastIdx = -1;
          switch (rowState) {
            case ROW_ID: {
              var byte = chunk[i++];
              if (byte === 58) {
                rowState = ROW_TAG;
              } else {
                rowID = rowID << 4 | (byte > 96 ? byte - 87 : byte - 48);
              }
              continue;
            }
            case ROW_TAG: {
              var resolvedRowTag = chunk[i];
              if (resolvedRowTag === 84 || (resolvedRowTag === 65 || resolvedRowTag === 79 || resolvedRowTag === 111 || resolvedRowTag === 85 || resolvedRowTag === 83 || resolvedRowTag === 115 || resolvedRowTag === 76 || resolvedRowTag === 108 || resolvedRowTag === 71 || resolvedRowTag === 103 || resolvedRowTag === 77 || resolvedRowTag === 109 || resolvedRowTag === 86)) {
                rowTag = resolvedRowTag;
                rowState = ROW_LENGTH;
                i++;
              } else if (resolvedRowTag > 64 && resolvedRowTag < 91 || resolvedRowTag === 114 || resolvedRowTag === 120) {
                rowTag = resolvedRowTag;
                rowState = ROW_CHUNK_BY_NEWLINE;
                i++;
              } else {
                rowTag = 0;
                rowState = ROW_CHUNK_BY_NEWLINE;
              }
              continue;
            }
            case ROW_LENGTH: {
              var _byte = chunk[i++];
              if (_byte === 44) {
                rowState = ROW_CHUNK_BY_LENGTH;
              } else {
                rowLength = rowLength << 4 | (_byte > 96 ? _byte - 87 : _byte - 48);
              }
              continue;
            }
            case ROW_CHUNK_BY_NEWLINE: {
              lastIdx = chunk.indexOf(10, i);
              break;
            }
            case ROW_CHUNK_BY_LENGTH: {
              lastIdx = i + rowLength;
              if (lastIdx > chunk.length) {
                lastIdx = -1;
              }
              break;
            }
          }
          var offset = chunk.byteOffset + i;
          if (lastIdx > -1) {
            var length = lastIdx - i;
            var lastChunk = new Uint8Array(chunk.buffer, offset, length);
            processFullRow(response, rowID, rowTag, buffer, lastChunk);
            i = lastIdx;
            if (rowState === ROW_CHUNK_BY_NEWLINE) {
              i++;
            }
            rowState = ROW_ID;
            rowTag = 0;
            rowID = 0;
            rowLength = 0;
            buffer.length = 0;
          } else {
            var _length = chunk.byteLength - i;
            var remainingSlice = new Uint8Array(chunk.buffer, offset, _length);
            buffer.push(remainingSlice);
            rowLength -= remainingSlice.byteLength;
            break;
          }
        }
        response._rowState = rowState;
        response._rowID = rowID;
        response._rowTag = rowTag;
        response._rowLength = rowLength;
      }
      function parseModel(response, json) {
        return JSON.parse(json, response._fromJSON);
      }
      function createFromJSONCallback(response) {
        return function(key, value) {
          if (typeof value === "string") {
            return parseModelString(response, this, key, value);
          }
          if (typeof value === "object" && value !== null) {
            return parseModelTuple(response, value);
          }
          return value;
        };
      }
      function close(response) {
        reportGlobalError(response, new Error("Connection closed."));
      }
      function createResponseFromOptions(options) {
        return createResponse(options && options.moduleBaseURL ? options.moduleBaseURL : "", null, options && options.callServer ? options.callServer : undefined, undefined, undefined, options && options.temporaryReferences ? options.temporaryReferences : undefined);
      }
      function startReadingFromStream(response, stream) {
        var reader = stream.getReader();
        function progress(_ref) {
          var { done, value } = _ref;
          if (done) {
            close(response);
            return;
          }
          var buffer = value;
          processBinaryChunk(response, buffer);
          return reader.read().then(progress).catch(error2);
        }
        function error2(e) {
          reportGlobalError(response, e);
        }
        reader.read().then(progress).catch(error2);
      }
      function createFromReadableStream(stream, options) {
        var response = createResponseFromOptions(options);
        startReadingFromStream(response, stream);
        return getRoot(response);
      }
      function createFromFetch(promiseForResponse, options) {
        var response = createResponseFromOptions(options);
        promiseForResponse.then(function(r) {
          startReadingFromStream(response, r.body);
        }, function(e) {
          reportGlobalError(response, e);
        });
        return getRoot(response);
      }
      function encodeReply(value, options) {
        return new Promise(function(resolve, reject) {
          processReply(value, "", options && options.temporaryReferences ? options.temporaryReferences : undefined, resolve, reject);
        });
      }
      exports.createFromFetch = createFromFetch;
      exports.createFromReadableStream = createFromReadableStream;
      exports.createServerReference = createServerReference;
      exports.createTemporaryReferenceSet = createTemporaryReferenceSet;
      exports.encodeReply = encodeReply;
    })();
  }
});

// node_modules/@physis/react-server-dom-esm/client.browser.js
var require_client_browser = __commonJS((exports, module) => {
  if (false) {
  } else {
    module.exports = require_react_server_dom_esm_client_browser_development();
  }
});

// src/packages/in/react-server-dom-esm-client.ts
var import_client = __toESM(require_client_browser(), 1);
var export_createFromReadableStream = import_client.createFromReadableStream;

export {
  export_createFromReadableStream as createFromReadableStream
};
