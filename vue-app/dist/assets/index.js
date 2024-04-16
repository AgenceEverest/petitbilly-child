(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
function makeMap(str, expectsLowerCase) {
  const map = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}
function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value)) {
    return value;
  } else if (isObject(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*.*?\*\//gs;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
const EMPTY_OBJ = {};
const EMPTY_ARR = [];
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const toNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this.active = true;
    this.effects = [];
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
    }
  }
  run(fn) {
    if (this.active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    activeEffectScope = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this.active) {
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
      this.active = false;
    }
  }
}
function recordEffectScope(effect, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
const createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect) => {
  const { deps } = effect;
  if (deps.length) {
    let ptr = 0;
    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
const targetMap = /* @__PURE__ */ new WeakMap();
let effectTrackDepth = 0;
let trackOpBit = 1;
const maxMarkerBits = 30;
let activeEffect;
const ITERATE_KEY = Symbol("");
const MAP_KEY_ITERATE_KEY = Symbol("");
class ReactiveEffect {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this.parent = void 0;
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    let parent = activeEffect;
    let lastShouldTrack = shouldTrack;
    while (parent) {
      if (parent === this) {
        return;
      }
      parent = parent.parent;
    }
    try {
      this.parent = activeEffect;
      activeEffect = this;
      shouldTrack = true;
      trackOpBit = 1 << ++effectTrackDepth;
      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this);
      } else {
        cleanupEffect(this);
      }
      return this.fn();
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this);
      }
      trackOpBit = 1 << --effectTrackDepth;
      activeEffect = this.parent;
      shouldTrack = lastShouldTrack;
      this.parent = void 0;
      if (this.deferStop) {
        this.stop();
      }
    }
  }
  stop() {
    if (activeEffect === this) {
      this.deferStop = true;
    } else if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect) {
  const { deps } = effect;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect);
    }
    deps.length = 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep());
    }
    trackEffects(dep);
  }
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray(target)) {
    const newLength = toNumber(newValue);
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newLength) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  if (deps.length === 1) {
    if (deps[0]) {
      {
        triggerEffects(deps[0]);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    {
      triggerEffects(createDep(effects));
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  const effects = isArray(dep) ? dep : [...dep];
  for (const effect of effects) {
    if (effect.computed) {
      triggerEffect(effect);
    }
  }
  for (const effect of effects) {
    if (!effect.computed) {
      triggerEffect(effect);
    }
  }
}
function triggerEffect(effect, debuggerEventExtraInfo) {
  if (effect !== activeEffect || effect.allowRecurse) {
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
const get = /* @__PURE__ */ createGetter();
const shallowGet = /* @__PURE__ */ createGetter(false, true);
const readonlyGet = /* @__PURE__ */ createGetter(true);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function createGetter(isReadonly2 = false, shallow = false) {
  return function get2(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return shallow;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2 && targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver);
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
}
const set = /* @__PURE__ */ createSetter();
const shallowSet = /* @__PURE__ */ createSetter(true);
function createSetter(shallow = false) {
  return function set2(target, key, value, receiver) {
    let oldValue = target[key];
    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      return false;
    }
    if (!shallow) {
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value);
      }
    }
    return result;
  };
}
function deleteProperty(target, key) {
  const hadKey = hasOwn(target, key);
  target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger(target, "delete", key, void 0);
  }
  return result;
}
function has(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
}
function ownKeys(target) {
  track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
const mutableHandlers = {
  get,
  set,
  deleteProperty,
  has,
  ownKeys
};
const readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    return true;
  },
  deleteProperty(target, key) {
    return true;
  }
};
const shallowReactiveHandlers = /* @__PURE__ */ extend({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet
});
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get$1(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has$1(key, isReadonly2 = false) {
  const target = this[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$1(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  }
  get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get$1(this, key);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get$1(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: createReadonlyMethod(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: createReadonlyMethod(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: createReadonlyMethod(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: createReadonlyMethod(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: createReadonlyMethod(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: createReadonlyMethod(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value[
    "__v_skip"
    /* ReactiveFlags.SKIP */
  ] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    return target;
  }
  if (target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ] && !(isReadonly2 && target[
    "__v_isReactive"
    /* ReactiveFlags.IS_REACTIVE */
  ])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ]);
  }
  return !!(value && value[
    "__v_isReactive"
    /* ReactiveFlags.IS_REACTIVE */
  ]);
}
function isReadonly(value) {
  return !!(value && value[
    "__v_isReadonly"
    /* ReactiveFlags.IS_READONLY */
  ]);
}
function isShallow(value) {
  return !!(value && value[
    "__v_isShallow"
    /* ReactiveFlags.IS_SHALLOW */
  ]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  def(value, "__v_skip", true);
  return value;
}
const toReactive = (value) => isObject(value) ? reactive(value) : value;
const toReadonly = (value) => isObject(value) ? readonly(value) : value;
function trackRefValue(ref) {
  if (shouldTrack && activeEffect) {
    ref = toRaw(ref);
    {
      trackEffects(ref.dep || (ref.dep = createDep()));
    }
  }
}
function triggerRefValue(ref, newVal) {
  ref = toRaw(ref);
  if (ref.dep) {
    {
      triggerEffects(ref.dep);
    }
  }
}
function isRef(r) {
  return !!(r && r.__v_isRef === true);
}
function unref(ref) {
  return isRef(ref) ? ref.value : ref;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
var _a;
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this[_a] = false;
    this._dirty = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this[
      "__v_isReadonly"
      /* ReactiveFlags.IS_READONLY */
    ] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    trackRefValue(self2);
    if (self2._dirty || !self2._cacheable) {
      self2._dirty = false;
      self2._value = self2.effect.run();
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
_a = "__v_isReadonly";
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = NOOP;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  return cRef;
}
function warn(msg, ...args) {
  return;
}
function callWithErrorHandling(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    console.error(err);
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
function nextTick(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJobId = getId(queue[middle]);
    middleJobId < id ? start = middle + 1 : end = middle;
  }
  return start;
}
function queueJob(job) {
  if (!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function invalidateJob(job) {
  const i = queue.indexOf(job);
  if (i > flushIndex) {
    queue.splice(i, 1);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(cb, cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex)) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(seen, i = isFlushing ? flushIndex + 1 : 0) {
  for (; i < queue.length; i++) {
    const cb = queue[i];
    if (cb && cb.pre) {
      queue.splice(i, 1);
      i--;
      cb();
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
const comparator = (a, b) => {
  const diff = getId(a) - getId(b);
  if (diff === 0) {
    if (a.pre && !b.pre)
      return -1;
    if (b.pre && !a.pre)
      return 1;
  }
  return diff;
};
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  queue.sort(comparator);
  const check = NOOP;
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (false)
          ;
        callWithErrorHandling(
          job,
          null,
          14
          /* ErrorCodes.SCHEDULER */
        );
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs();
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs();
    }
  }
}
function emit$1(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ;
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a) => isString(a) ? a.trim() : a);
    }
    if (number) {
      args = rawArgs.map(toNumber);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(handler, instance, 6, args);
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(onceHandler, instance, 6, args);
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function pushScopeId(id) {
  currentScopeId = id;
}
function popScopeId() {
  currentScopeId = null;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx)
    return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    let res;
    try {
      res = fn(...args);
    } finally {
      setCurrentRenderingInstance(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
function markAttrsAccessed() {
}
function renderComponentRoot(instance) {
  const { type: Component, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit, render, renderCache, data, setupState, ctx, inheritAttrs } = instance;
  let result;
  let fallthroughAttrs;
  const prev = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      result = normalizeVNode(render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx));
      fallthroughAttrs = attrs;
    } else {
      const render2 = Component;
      if (false)
        ;
      result = normalizeVNode(render2.length > 1 ? render2(props, false ? {
        get attrs() {
          markAttrsAccessed();
          return attrs;
        },
        slots,
        emit
      } : { attrs, slots, emit }) : render2(
        props,
        null
        /* we know it doesn't need it */
      ));
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(
      err,
      instance,
      1
      /* ErrorCodes.RENDER_FUNCTION */
    );
    result = createVNode(Comment);
  }
  let root = result;
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
        }
        root = cloneVNode(root, fallthroughAttrs);
      }
    }
  }
  if (vnode.dirs) {
    root = cloneVNode(root);
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    root.transition = vnode.transition;
  }
  {
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i = 0; i < dynamicProps.length; i++) {
        const key = dynamicProps[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent && parent.subTree === vnode) {
    (vnode = parent.vnode).el = el;
    parent = parent.parent;
  }
}
const isSuspense = (type) => type.__isSuspense;
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
function provide(key, value) {
  if (!currentInstance)
    ;
  else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance) {
    const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
    } else
      ;
  }
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
  const instance = currentInstance;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
    getter = () => source.map((s) => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return traverse(s);
      } else if (isFunction(s)) {
        return callWithErrorHandling(
          s,
          instance,
          2
          /* ErrorCodes.WATCH_GETTER */
        );
      } else
        ;
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(
        source,
        instance,
        2
        /* ErrorCodes.WATCH_GETTER */
      );
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
      };
    }
  } else {
    getter = NOOP;
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(
        fn,
        instance,
        4
        /* ErrorCodes.WATCH_CLEANUP */
      );
    };
  };
  let ssrCleanup;
  if (isInSSRComponentSetup) {
    onCleanup = NOOP;
    if (!cb) {
      getter();
    } else if (immediate) {
      callWithAsyncErrorHandling(cb, instance, 3, [
        getter(),
        isMultiSource ? [] : void 0,
        onCleanup
      ]);
    }
    if (flush === "sync") {
      const ctx = useSSRContext();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else {
      return NOOP;
    }
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect.active) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance)
      job.id = instance.uid;
    scheduler = () => queueJob(job);
  }
  const effect = new ReactiveEffect(getter, scheduler);
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(effect.run.bind(effect), instance && instance.suspense);
  } else {
    effect.run();
  }
  const unwatch = () => {
    effect.stop();
    if (instance && instance.scope) {
      remove(instance.scope.effects, effect);
    }
  };
  if (ssrCleanup)
    ssrCleanup.push(unwatch);
  return unwatch;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function traverse(value, seen) {
  if (!isObject(value) || value[
    "__v_skip"
    /* ReactiveFlags.SKIP */
  ]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, seen);
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], seen);
    }
  }
  return value;
}
function useTransitionState() {
  const state = {
    isMounted: false,
    isLeaving: false,
    isUnmounting: false,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  onMounted(() => {
    state.isMounted = true;
  });
  onBeforeUnmount(() => {
    state.isUnmounting = true;
  });
  return state;
}
const TransitionHookValidator = [Function, Array];
const BaseTransitionImpl = {
  name: `BaseTransition`,
  props: {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    // enter
    onBeforeEnter: TransitionHookValidator,
    onEnter: TransitionHookValidator,
    onAfterEnter: TransitionHookValidator,
    onEnterCancelled: TransitionHookValidator,
    // leave
    onBeforeLeave: TransitionHookValidator,
    onLeave: TransitionHookValidator,
    onAfterLeave: TransitionHookValidator,
    onLeaveCancelled: TransitionHookValidator,
    // appear
    onBeforeAppear: TransitionHookValidator,
    onAppear: TransitionHookValidator,
    onAfterAppear: TransitionHookValidator,
    onAppearCancelled: TransitionHookValidator
  },
  setup(props, { slots }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    let prevTransitionKey;
    return () => {
      const children = slots.default && getTransitionRawChildren(slots.default(), true);
      if (!children || !children.length) {
        return;
      }
      let child = children[0];
      if (children.length > 1) {
        for (const c of children) {
          if (c.type !== Comment) {
            child = c;
            break;
          }
        }
      }
      const rawProps = toRaw(props);
      const { mode } = rawProps;
      if (state.isLeaving) {
        return emptyPlaceholder(child);
      }
      const innerChild = getKeepAliveChild(child);
      if (!innerChild) {
        return emptyPlaceholder(child);
      }
      const enterHooks = resolveTransitionHooks(innerChild, rawProps, state, instance);
      setTransitionHooks(innerChild, enterHooks);
      const oldChild = instance.subTree;
      const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
      let transitionKeyChanged = false;
      const { getTransitionKey } = innerChild.type;
      if (getTransitionKey) {
        const key = getTransitionKey();
        if (prevTransitionKey === void 0) {
          prevTransitionKey = key;
        } else if (key !== prevTransitionKey) {
          prevTransitionKey = key;
          transitionKeyChanged = true;
        }
      }
      if (oldInnerChild && oldInnerChild.type !== Comment && (!isSameVNodeType(innerChild, oldInnerChild) || transitionKeyChanged)) {
        const leavingHooks = resolveTransitionHooks(oldInnerChild, rawProps, state, instance);
        setTransitionHooks(oldInnerChild, leavingHooks);
        if (mode === "out-in") {
          state.isLeaving = true;
          leavingHooks.afterLeave = () => {
            state.isLeaving = false;
            if (instance.update.active !== false) {
              instance.update();
            }
          };
          return emptyPlaceholder(child);
        } else if (mode === "in-out" && innerChild.type !== Comment) {
          leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
            const leavingVNodesCache = getLeavingNodesForType(state, oldInnerChild);
            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
            el._leaveCb = () => {
              earlyRemove();
              el._leaveCb = void 0;
              delete enterHooks.delayedLeave;
            };
            enterHooks.delayedLeave = delayedLeave;
          };
        }
      }
      return child;
    };
  }
};
const BaseTransition = BaseTransitionImpl;
function getLeavingNodesForType(state, vnode) {
  const { leavingVNodes } = state;
  let leavingVNodesCache = leavingVNodes.get(vnode.type);
  if (!leavingVNodesCache) {
    leavingVNodesCache = /* @__PURE__ */ Object.create(null);
    leavingVNodes.set(vnode.type, leavingVNodesCache);
  }
  return leavingVNodesCache;
}
function resolveTransitionHooks(vnode, props, state, instance) {
  const { appear, mode, persisted = false, onBeforeEnter, onEnter, onAfterEnter, onEnterCancelled, onBeforeLeave, onLeave, onAfterLeave, onLeaveCancelled, onBeforeAppear, onAppear, onAfterAppear, onAppearCancelled } = props;
  const key = String(vnode.key);
  const leavingVNodesCache = getLeavingNodesForType(state, vnode);
  const callHook2 = (hook, args) => {
    hook && callWithAsyncErrorHandling(hook, instance, 9, args);
  };
  const callAsyncHook = (hook, args) => {
    const done = args[1];
    callHook2(hook, args);
    if (isArray(hook)) {
      if (hook.every((hook2) => hook2.length <= 1))
        done();
    } else if (hook.length <= 1) {
      done();
    }
  };
  const hooks = {
    mode,
    persisted,
    beforeEnter(el) {
      let hook = onBeforeEnter;
      if (!state.isMounted) {
        if (appear) {
          hook = onBeforeAppear || onBeforeEnter;
        } else {
          return;
        }
      }
      if (el._leaveCb) {
        el._leaveCb(
          true
          /* cancelled */
        );
      }
      const leavingVNode = leavingVNodesCache[key];
      if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el._leaveCb) {
        leavingVNode.el._leaveCb();
      }
      callHook2(hook, [el]);
    },
    enter(el) {
      let hook = onEnter;
      let afterHook = onAfterEnter;
      let cancelHook = onEnterCancelled;
      if (!state.isMounted) {
        if (appear) {
          hook = onAppear || onEnter;
          afterHook = onAfterAppear || onAfterEnter;
          cancelHook = onAppearCancelled || onEnterCancelled;
        } else {
          return;
        }
      }
      let called = false;
      const done = el._enterCb = (cancelled) => {
        if (called)
          return;
        called = true;
        if (cancelled) {
          callHook2(cancelHook, [el]);
        } else {
          callHook2(afterHook, [el]);
        }
        if (hooks.delayedLeave) {
          hooks.delayedLeave();
        }
        el._enterCb = void 0;
      };
      if (hook) {
        callAsyncHook(hook, [el, done]);
      } else {
        done();
      }
    },
    leave(el, remove2) {
      const key2 = String(vnode.key);
      if (el._enterCb) {
        el._enterCb(
          true
          /* cancelled */
        );
      }
      if (state.isUnmounting) {
        return remove2();
      }
      callHook2(onBeforeLeave, [el]);
      let called = false;
      const done = el._leaveCb = (cancelled) => {
        if (called)
          return;
        called = true;
        remove2();
        if (cancelled) {
          callHook2(onLeaveCancelled, [el]);
        } else {
          callHook2(onAfterLeave, [el]);
        }
        el._leaveCb = void 0;
        if (leavingVNodesCache[key2] === vnode) {
          delete leavingVNodesCache[key2];
        }
      };
      leavingVNodesCache[key2] = vnode;
      if (onLeave) {
        callAsyncHook(onLeave, [el, done]);
      } else {
        done();
      }
    },
    clone(vnode2) {
      return resolveTransitionHooks(vnode2, props, state, instance);
    }
  };
  return hooks;
}
function emptyPlaceholder(vnode) {
  if (isKeepAlive(vnode)) {
    vnode = cloneVNode(vnode);
    vnode.children = null;
    return vnode;
  }
}
function getKeepAliveChild(vnode) {
  return isKeepAlive(vnode) ? vnode.children ? vnode.children[0] : void 0 : vnode;
}
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
function getTransitionRawChildren(children, keepComment = false, parentKey) {
  let ret = [];
  let keyedFragmentCount = 0;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i);
    if (child.type === Fragment) {
      if (child.patchFlag & 128)
        keyedFragmentCount++;
      ret = ret.concat(getTransitionRawChildren(child.children, keepComment, key));
    } else if (keepComment || child.type !== Comment) {
      ret.push(key != null ? cloneVNode(child, { key }) : child);
    }
  }
  if (keyedFragmentCount > 1) {
    for (let i = 0; i < ret.length; i++) {
      ret[i].patchFlag = -2;
    }
  }
  return ret;
}
const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      unsetCurrentInstance();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target)
);
const onBeforeMount = createHook(
  "bm"
  /* LifecycleHooks.BEFORE_MOUNT */
);
const onMounted = createHook(
  "m"
  /* LifecycleHooks.MOUNTED */
);
const onBeforeUpdate = createHook(
  "bu"
  /* LifecycleHooks.BEFORE_UPDATE */
);
const onUpdated = createHook(
  "u"
  /* LifecycleHooks.UPDATED */
);
const onBeforeUnmount = createHook(
  "bum"
  /* LifecycleHooks.BEFORE_UNMOUNT */
);
const onUnmounted = createHook(
  "um"
  /* LifecycleHooks.UNMOUNTED */
);
const onServerPrefetch = createHook(
  "sp"
  /* LifecycleHooks.SERVER_PREFETCH */
);
const onRenderTriggered = createHook(
  "rtg"
  /* LifecycleHooks.RENDER_TRIGGERED */
);
const onRenderTracked = createHook(
  "rtc"
  /* LifecycleHooks.RENDER_TRACKED */
);
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
function withDirectives(vnode, directives) {
  const internalInstance = currentRenderingInstance;
  if (internalInstance === null) {
    return vnode;
  }
  const instance = getExposeProxy(internalInstance) || internalInstance.proxy;
  const bindings = vnode.dirs || (vnode.dirs = []);
  for (let i = 0; i < directives.length; i++) {
    let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
    if (dir) {
      if (isFunction(dir)) {
        dir = {
          mounted: dir,
          updated: dir
        };
      }
      if (dir.deep) {
        traverse(value);
      }
      bindings.push({
        dir,
        instance,
        value,
        oldValue: void 0,
        arg,
        modifiers
      });
    }
  }
  return vnode;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i = 0; i < bindings.length; i++) {
    const binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
const NULL_DYNAMIC_COMPONENT = Symbol();
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(
        Component,
        false
        /* do not include inferred name to avoid breaking existing code */
      );
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component;
      }
    }
    const res = (
      // local registration
      // check instance[type] first which is resolved for options API
      resolve(instance[type] || Component[type], name) || // global registration
      resolve(instance.appContext[type], name)
    );
    if (!res && maybeSelfReference) {
      return Component;
    }
    return res;
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
function renderList(source, renderItem, cache, index) {
  let ret;
  const cached = cache && cache[index];
  if (isArray(source) || isString(source)) {
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(source[i], i, void 0, cached && cached[i]);
    }
  } else if (typeof source === "number") {
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, void 0, cached && cached[i]);
    }
  } else if (isObject(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, (item, i) => renderItem(item, i, void 0, cached && cached[i]));
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i, cached && cached[i]);
      }
    }
  } else {
    ret = [];
  }
  if (cache) {
    cache[index] = ret;
  }
  return ret;
}
const getPublicInstance = (i) => {
  if (!i)
    return null;
  if (isStatefulComponent(i))
    return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    $: (i) => i,
    $el: (i) => i.vnode.el,
    $data: (i) => i.data,
    $props: (i) => i.props,
    $attrs: (i) => i.attrs,
    $slots: (i) => i.slots,
    $refs: (i) => i.refs,
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $emit: (i) => i.emit,
    $options: (i) => resolveMergedOptions(i),
    $forceUpdate: (i) => i.f || (i.f = () => queueJob(i.update)),
    $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
    $watch: (i) => instanceWatch.bind(i)
  })
);
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    let normalizedProps;
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== void 0) {
        switch (n) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)
      ) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else
      ;
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      return false;
    } else {
      {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
let shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook(
      options.beforeCreate,
      instance,
      "bc"
      /* LifecycleHooks.BEFORE_CREATE */
    );
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = null;
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          ctx[key] = methodHandler.bind(publicThis);
        }
      }
    }
  }
  if (dataOptions) {
    const data = dataOptions.call(publicThis, publicThis);
    if (!isObject(data))
      ;
    else {
      instance.data = reactive(data);
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : NOOP;
      const c = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook(
      created,
      instance,
      "c"
      /* LifecycleHooks.CREATED */
    );
  }
  function registerLifecycleHook(register, hook) {
    if (isArray(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP, unwrapRef = false) {
  if (isArray(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
          /* treat default function as factory */
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      if (unwrapRef) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v) => injected.value = v
        });
      } else {
        ctx[key] = injected;
      }
    } else {
      ctx[key] = injected;
    }
  }
}
function callHook(hook, instance, type) {
  callWithAsyncErrorHandling(isArray(hook) ? hook.map((h) => h.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject(raw)) {
    if (isArray(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      }
    }
  } else
    ;
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach((m) => mergeOptions(resolved, m, optionMergeStrategies, true));
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach((m) => mergeOptions(to, m, strats, true));
  }
  for (const key in from) {
    if (asMixin && key === "expose")
      ;
    else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeObjectOptions,
  emits: mergeObjectOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(extend(/* @__PURE__ */ Object.create(null), to), from) : from;
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  def(attrs, InternalObjectKey, 1);
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const { props, attrs, vnode: { patchFlag } } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
              /* isAbsent */
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
              /* isAbsent */
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn(castValues, key));
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(null, props);
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[
      0
      /* BooleanFlags.shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* BooleanFlags.shouldCastTrue */
      ] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray(raw)) {
    for (let i = 0; i < raw.length; i++) {
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : Object.assign({}, opt);
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[
            0
            /* BooleanFlags.shouldCast */
          ] = booleanIndex > -1;
          prop[
            1
            /* BooleanFlags.shouldCastTrue */
          ] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$") {
    return true;
  }
  return false;
}
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ctor === null ? "null" : "";
}
function isSameType(a, b) {
  return getType(a) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray(expectedTypes)) {
    return expectedTypes.findIndex((t) => isSameType(t, type));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
const isInternalKey = (key) => key[0] === "_" || key === "$stable";
const normalizeSlotValue = (value) => isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  const normalized = withCtx((...args) => {
    if (false)
      ;
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key))
      continue;
    const value = rawSlots[key];
    if (isFunction(value)) {
      slots[key] = normalizeSlot(key, value, ctx);
    } else if (value != null) {
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance, children) => {
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
const initSlots = (instance, children) => {
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      instance.slots = toRaw(children);
      def(children, "_", type);
    } else {
      normalizeObjectSlots(children, instance.slots = {});
    }
  } else {
    instance.slots = {};
    if (children) {
      normalizeVNodeSlots(instance, children);
    }
  }
  def(instance.slots, InternalObjectKey, 1);
};
const updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        extend(slots, children);
        if (!optimized && type === 1) {
          delete slots._;
        }
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
        delete slots[key];
      }
    }
  }
};
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = Object.assign({}, rootComponent);
    }
    if (rootProps != null && !isObject(rootProps)) {
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new Set();
    let isMounted = false;
    const app2 = context.app = {
      _uid: uid++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin))
          ;
        else if (plugin && isFunction(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app2, ...options);
        } else if (isFunction(plugin)) {
          installedPlugins.add(plugin);
          plugin(app2, ...options);
        } else
          ;
        return app2;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          }
        }
        return app2;
      },
      component(name, component) {
        if (!component) {
          return context.components[name];
        }
        context.components[name] = component;
        return app2;
      },
      directive(name, directive) {
        if (!directive) {
          return context.directives[name];
        }
        context.directives[name] = directive;
        return app2;
      },
      mount(rootContainer, isHydrate, isSVG) {
        if (!isMounted) {
          const vnode = createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          if (isHydrate && hydrate) {
            hydrate(vnode, rootContainer);
          } else {
            render(vnode, rootContainer, isSVG);
          }
          isMounted = true;
          app2._container = rootContainer;
          rootContainer.__vue_app__ = app2;
          return getExposeProxy(vnode.component) || vnode.component.proxy;
        }
      },
      unmount() {
        if (isMounted) {
          render(null, app2._container);
          delete app2._container.__vue_app__;
        }
      },
      provide(key, value) {
        context.provides[key] = value;
        return app2;
      }
    };
    return app2;
  };
}
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray(rawRef)) {
    rawRef.forEach((r, i) => setRef(r, oldRawRef && (isArray(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount));
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref } = rawRef;
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  if (oldRef != null && oldRef !== ref) {
    if (isString(oldRef)) {
      refs[oldRef] = null;
      if (hasOwn(setupState, oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isFunction(ref)) {
    callWithErrorHandling(ref, owner, 12, [value, refs]);
  } else {
    const _isString = isString(ref);
    const _isRef = isRef(ref);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? hasOwn(setupState, ref) ? setupState[ref] : refs[ref] : ref.value;
          if (isUnmount) {
            isArray(existing) && remove(existing, refValue);
          } else {
            if (!isArray(existing)) {
              if (_isString) {
                refs[ref] = [refValue];
                if (hasOwn(setupState, ref)) {
                  setupState[ref] = refs[ref];
                }
              } else {
                ref.value = [refValue];
                if (rawRef.k)
                  refs[rawRef.k] = ref.value;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref] = value;
          if (hasOwn(setupState, ref)) {
            setupState[ref] = value;
          }
        } else if (_isRef) {
          ref.value = value;
          if (rawRef.k)
            refs[rawRef.k] = value;
        } else
          ;
      };
      if (value) {
        doSet.id = -1;
        queuePostRenderEffect(doSet, parentSuspense);
      } else {
        doSet();
      }
    }
  }
}
const queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(options) {
  return baseCreateRenderer(options);
}
function baseCreateRenderer(options, createHydrationFns) {
  const target = getGlobalThis();
  target.__VUE__ = true;
  const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = NOOP, insertStaticContent: hostInsertStaticContent } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, isSVG);
        }
        break;
      case Fragment:
        processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        break;
      default:
        if (shapeFlag & 1) {
          processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (shapeFlag & 6) {
          processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (shapeFlag & 64) {
          type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
        } else if (shapeFlag & 128) {
          type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
        } else
          ;
    }
    if (ref != null && parentComponent) {
      setRef(ref, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, isSVG) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG, n2.el, n2.anchor);
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    isSVG = isSVG || n2.type === "svg";
    if (n1 == null) {
      mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      patchElement(n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { type, props, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(vnode.type, isSVG, props && props.is, props);
    if (shapeFlag & 8) {
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & 16) {
      mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type !== "foreignObject", slotScopeIds, optimized);
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "created");
    }
    if (props) {
      for (const key in props) {
        if (key !== "value" && !isReservedProp(key)) {
          hostPatchProp(el, key, null, props[key], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
        }
      }
      if ("value" in props) {
        hostPatchProp(el, "value", null, props.value);
      }
      if (vnodeHook = props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
    }
    setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (vnode === subTree) {
        const parentVNode = parentComponent.vnode;
        setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start = 0) => {
    for (let i = start; i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    const areChildrenSVG = isSVG && n2.type !== "foreignObject";
    if (dynamicChildren) {
      patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds);
    } else if (!optimized) {
      patchChildren(n1, n2, el, null, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds, false);
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, isSVG);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, isSVG);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(el, key, prev, next, isSVG, n1.children, parentComponent, parentSuspense, unmountChildren);
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) => {
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i];
      const container = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
        oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          fallbackContainer
        )
      );
      patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, true);
    }
  };
  const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(el, key, oldProps[key], null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
      }
      for (const key in newProps) {
        if (isReservedProp(key))
          continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(el, key, prev, next, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(n2.children, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
      // of renderSlot() with no valid children
      n1.dynamicChildren) {
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, isSVG, slotScopeIds);
        if (
          // #2080 if the stable fragment has a key, it's a <template v-for> that may
          //  get moved around. Make sure all root level vnodes inherit el.
          // #2134 or if it's a component root, it may also get moved around
          // as the component is being moved.
          n2.key != null || parentComponent && n2 === parentComponent.subTree
        ) {
          traverseStaticChildren(
            n1,
            n2,
            true
            /* shallow */
          );
        }
      } else {
        patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(n2, container, anchor, isSVG, optimized);
      } else {
        mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
    const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      setupComponent(instance);
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }
      return;
    }
    setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        updateComponentPreRender(instance, n2, optimized);
        return;
      } else {
        instance.next = n2;
        invalidateJob(instance.update);
        instance.update();
      }
    } else {
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m, parent } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        if (el && hydrateNode) {
          const hydrateSubTree = () => {
            instance.subTree = renderComponentRoot(instance);
            hydrateNode(el, instance.subTree, instance, parentSuspense, null);
          };
          if (isAsyncWrapperVNode) {
            initialVNode.type.__asyncLoader().then(
              // note: we are moving the render call into an async callback,
              // which means it won't track dependencies - but it's ok because
              // a server-rendered async wrapper is already in resolved state
              // and it will never need to change.
              () => !instance.isUnmounted && hydrateSubTree()
            );
          } else {
            hydrateSubTree();
          }
        } else {
          const subTree = instance.subTree = renderComponentRoot(instance);
          patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
        }
        if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u, parent, vnode } = instance;
        let originNext = next;
        let vnodeHook;
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        const nextTree = renderComponentRoot(instance);
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        patch(
          prevTree,
          nextTree,
          // parent may have changed if it's in a teleport
          hostParentNode(prevTree.el),
          // anchor may have changed if it's in a fragment
          getNextHostNode(prevTree),
          instance,
          parentSuspense,
          isSVG
        );
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, next, vnode), parentSuspense);
        }
      }
    };
    const effect = instance.effect = new ReactiveEffect(
      componentUpdateFn,
      () => queueJob(update),
      instance.scope
      // track it in component's effect scope
    );
    const update = instance.update = () => effect.run();
    update.id = instance.uid;
    toggleRecurse(instance, true);
    update();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs();
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;
    for (i = 0; i < commonLength; i++) {
      const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
    if (oldLength > newLength) {
      unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
    } else {
      mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, commonLength);
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]), container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      const s1 = i;
      const s2 = i;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i = s2; i <= e2; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (nextChild.key != null) {
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      let j;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0; i < toBePatched; i++)
        newIndexToOldIndexMap[i] = 0;
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j = s2; j <= e2; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j = increasingNewIndexSequence.length - 1;
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(null, nextChild, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(
              nextChild,
              container,
              anchor,
              2
              /* MoveType.REORDER */
            );
          } else {
            j--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment) {
      hostInsert(el, container, anchor);
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove3 = () => hostInsert(el, container, anchor);
        const performLeave = () => {
          leave(el, () => {
            remove3();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove3, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const { type, props, ref, children, dynamicChildren, shapeFlag, patchFlag, dirs } = vnode;
    if (ref != null) {
      setRef(ref, null, parentSuspense, vnode, true);
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(vnode, parentComponent, parentSuspense, optimized, internals, doRemove);
      } else if (dynamicChildren && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
      {
        removeFragment(el, anchor);
      }
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    const { bum, scope, update, subTree, um } = instance;
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (update) {
      update.active = false;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
    if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
      parentSuspense.deps--;
      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i = start; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    return hostNextSibling(vnode.anchor || vnode.el);
  };
  const render = (vnode, container, isSVG) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(container._vnode || null, vnode, container, null, null, null, isSVG);
    }
    flushPreFlushCbs();
    flushPostFlushCbs();
    container._vnode = vnode;
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  let hydrateNode;
  if (createHydrationFns) {
    [hydrate, hydrateNode] = createHydrationFns(internals);
  }
  return {
    render,
    hydrate,
    createApp: createAppAPI(render, hydrate)
  };
}
function toggleRecurse({ effect, update }, allowed) {
  effect.allowRecurse = update.allowRecurse = allowed;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray(ch1) && isArray(ch2)) {
    for (let i = 0; i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow)
          traverseStaticChildren(c1, c2);
      }
      if (c2.type === Text) {
        c2.el = c1.el;
      }
    }
  }
}
function getSequence(arr) {
  const p2 = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p2[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = u + v >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p2[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p2[v];
  }
  return result;
}
const isTeleport = (type) => type.__isTeleport;
const Fragment = Symbol(void 0);
const Text = Symbol(void 0);
const Comment = Symbol(void 0);
const Static = Symbol(void 0);
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value) {
  isBlockTreeEnabled += value;
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(createBaseVNode(
    type,
    props,
    children,
    patchFlag,
    dynamicProps,
    shapeFlag,
    true
    /* isBlock */
  ));
}
function createBlock(type, props, children, patchFlag, dynamicProps) {
  return setupBlock(createVNode(
    type,
    props,
    children,
    patchFlag,
    dynamicProps,
    true
    /* isBlock: prevent a block from tracking itself */
  ));
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key;
}
const InternalObjectKey = `__vInternal`;
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({ ref, ref_key, ref_for }) => {
  return ref != null ? isString(ref) || isRef(ref) || isFunction(ref) ? { i: currentRenderingInstance, r: ref, k: ref_key, f: !!ref_for } : ref : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString(children) ? 8 : 16;
  }
  if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
  !isBlockNode && // has current parent block
  currentBlock && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode = _createVNode;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(
      type,
      props,
      true
      /* mergeRef: true */
    );
    if (children) {
      normalizeChildren(cloned, children);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6) {
        currentBlock[currentBlock.indexOf(type)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }
    cloned.patchFlag |= -2;
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !isString(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject(style)) {
      if (isProxy(style) && !isArray(style)) {
        style = extend({}, style);
      }
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
  return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
}
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false) {
  const { props, ref, patchFlag, children } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      mergeRef && ref ? isArray(ref) ? ref.concat(normalizeRef(extraProps)) : [ref, normalizeRef(extraProps)] : normalizeRef(extraProps)
    ) : ref,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children,
    target: vnode.target,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition: vnode.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor,
    ctx: vnode.ctx
  };
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function createStaticVNode(content, numberOfNodes) {
  const vnode = createVNode(Static, null, content);
  vnode.staticCount = numberOfNodes;
  return vnode;
}
function createCommentVNode(text = "", asBlock = false) {
  return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray(child)) {
    return createVNode(
      Fragment,
      null,
      // #3666, avoid reference pollution when reusing vnode
      child.slice()
    );
  } else if (typeof child === "object") {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !(InternalObjectKey in children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}
const emptyAppContext = createAppContext();
let uid$1 = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid$1++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = { _: instance };
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit$1.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
const setCurrentInstance = (instance) => {
  currentInstance = instance;
  instance.scope.on();
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  currentInstance = null;
};
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isInSSRComponentSetup = false;
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component = instance.type;
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  const { setup } = Component;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(setup, instance, 0, [instance.props, setupContext]);
    resetTracking();
    unsetCurrentInstance();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult, isSSR);
        }).catch((e) => {
          handleError(
            e,
            instance,
            0
            /* ErrorCodes.SETUP_FUNCTION */
          );
        });
      } else {
        instance.asyncDep = setupResult;
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject(setupResult)) {
    instance.setupState = proxyRefs(setupResult);
  } else
    ;
  finishComponentSetup(instance, isSSR);
}
let compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    if (!isSSR && compile && !Component.render) {
      const template = Component.template || resolveMergedOptions(instance).template;
      if (template) {
        const { isCustomElement, compilerOptions } = instance.appContext.config;
        const { delimiters, compilerOptions: componentCompilerOptions } = Component;
        const finalCompilerOptions = extend(extend({
          isCustomElement,
          delimiters
        }, compilerOptions), componentCompilerOptions);
        Component.render = compile(template, finalCompilerOptions);
      }
    }
    instance.render = Component.render || NOOP;
  }
  {
    setCurrentInstance(instance);
    pauseTracking();
    applyOptions(instance);
    resetTracking();
    unsetCurrentInstance();
  }
}
function createAttrsProxy(instance) {
  return new Proxy(instance.attrs, {
    get(target, key) {
      track(instance, "get", "$attrs");
      return target[key];
    }
  });
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    instance.exposed = exposed || {};
  };
  let attrs;
  {
    return {
      get attrs() {
        return attrs || (attrs = createAttrsProxy(instance));
      },
      slots: instance.slots,
      emit: instance.emit,
      expose
    };
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  }
}
function getComponentName(Component, includeInferred = true) {
  return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function isClassComponent(value) {
  return isFunction(value) && "__vccOpts" in value;
}
const computed = (getterOrOptions, debugOptions) => {
  return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
const ssrContextKey = Symbol(``);
const useSSRContext = () => {
  {
    const ctx = inject(ssrContextKey);
    return ctx;
  }
};
const version = "3.2.45";
const svgNS = "http://www.w3.org/2000/svg";
const doc = typeof document !== "undefined" ? document : null;
const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, isSVG, is, props) => {
    const el = isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, is ? { is } : void 0);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(content, parent, anchor, isSVG, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling))
          break;
      }
    } else {
      templateContainer.innerHTML = isSVG ? `<svg>${content}</svg>` : content;
      const template = templateContainer.content;
      if (isSVG) {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      // first
      before ? before.nextSibling : parent.firstChild,
      // last
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
function patchClass(el, value, isSVG) {
  const transitionClasses = el._vtc;
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString(next);
  if (next && !isCssString) {
    for (const key in next) {
      setStyle(style, key, next[key]);
    }
    if (prev && !isString(prev)) {
      for (const key in prev) {
        if (next[key] == null) {
          setStyle(style, key, "");
        }
      }
    }
  } else {
    const currentDisplay = style.display;
    if (isCssString) {
      if (prev !== next) {
        style.cssText = next;
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
    if ("_vod" in el) {
      style.display = currentDisplay;
    }
  }
}
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray(val)) {
    val.forEach((v) => setStyle(style, name, v));
  } else {
    if (val == null)
      val = "";
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    const isBoolean = isSpecialBooleanAttr(key);
    if (value == null || isBoolean && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, isBoolean ? "" : value);
    }
  }
}
function patchDOMProp(el, key, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
  if (key === "innerHTML" || key === "textContent") {
    if (prevChildren) {
      unmountChildren(prevChildren, parentComponent, parentSuspense);
    }
    el[key] = value == null ? "" : value;
    return;
  }
  if (key === "value" && el.tagName !== "PROGRESS" && // custom elements may use _value internally
  !el.tagName.includes("-")) {
    el._value = value;
    const newValue = value == null ? "" : value;
    if (el.value !== newValue || // #4956: always set for OPTION elements because its value falls back to
    // textContent if no value attribute is present. And setting .value for
    // OPTION has no side effect
    el.tagName === "OPTION") {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      value = includeBooleanAttr(value);
    } else if (value == null && type === "string") {
      value = "";
      needRemove = true;
    } else if (type === "number") {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value;
  } catch (e) {
  }
  needRemove && el.removeAttribute(key);
}
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el._vei || (el._vei = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(nextValue, instance);
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m;
    while (m = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }
  const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
  return [event, options];
}
let cachedNow = 0;
const p = /* @__PURE__ */ Promise.resolve();
const getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
function createInvoker(initialValue, instance) {
  const invoker = (e) => {
    if (!e._vts) {
      e._vts = Date.now();
    } else if (e._vts <= invoker.attached) {
      return;
    }
    callWithAsyncErrorHandling(patchStopImmediatePropagation(e, invoker.value), instance, 5, [e]);
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e, value) {
  if (isArray(value)) {
    const originalStop = e.stopImmediatePropagation;
    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };
    return value.map((fn) => (e2) => !e2._stopped && fn && fn(e2));
  } else {
    return value;
  }
}
const nativeOnRE = /^on[a-z]/;
const patchProp = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(el, key, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && nativeOnRE.test(key) && isFunction(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (nativeOnRE.test(key) && isString(value)) {
    return false;
  }
  return key in el;
}
const DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: true
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
/* @__PURE__ */ extend({}, BaseTransition.props, DOMTransitionPropsValidators);
const getModelAssigner = (vnode) => {
  const fn = vnode.props["onUpdate:modelValue"] || false;
  return isArray(fn) ? (value) => invokeArrayFns(fn, value) : fn;
};
function onCompositionStart(e) {
  e.target.composing = true;
}
function onCompositionEnd(e) {
  const target = e.target;
  if (target.composing) {
    target.composing = false;
    target.dispatchEvent(new Event("input"));
  }
}
const vModelText = {
  created(el, { modifiers: { lazy, trim, number } }, vnode) {
    el._assign = getModelAssigner(vnode);
    const castToNumber = number || vnode.props && vnode.props.type === "number";
    addEventListener(el, lazy ? "change" : "input", (e) => {
      if (e.target.composing)
        return;
      let domValue = el.value;
      if (trim) {
        domValue = domValue.trim();
      }
      if (castToNumber) {
        domValue = toNumber(domValue);
      }
      el._assign(domValue);
    });
    if (trim) {
      addEventListener(el, "change", () => {
        el.value = el.value.trim();
      });
    }
    if (!lazy) {
      addEventListener(el, "compositionstart", onCompositionStart);
      addEventListener(el, "compositionend", onCompositionEnd);
      addEventListener(el, "change", onCompositionEnd);
    }
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(el, { value }) {
    el.value = value == null ? "" : value;
  },
  beforeUpdate(el, { value, modifiers: { lazy, trim, number } }, vnode) {
    el._assign = getModelAssigner(vnode);
    if (el.composing)
      return;
    if (document.activeElement === el && el.type !== "range") {
      if (lazy) {
        return;
      }
      if (trim && el.value.trim() === value) {
        return;
      }
      if ((number || el.type === "number") && toNumber(el.value) === value) {
        return;
      }
    }
    const newValue = value == null ? "" : value;
    if (el.value !== newValue) {
      el.value = newValue;
    }
  }
};
const vShow = {
  beforeMount(el, { value }, { transition }) {
    el._vod = el.style.display === "none" ? "" : el.style.display;
    if (transition && value) {
      transition.beforeEnter(el);
    } else {
      setDisplay(el, value);
    }
  },
  mounted(el, { value }, { transition }) {
    if (transition && value) {
      transition.enter(el);
    }
  },
  updated(el, { value, oldValue }, { transition }) {
    if (!value === !oldValue)
      return;
    if (transition) {
      if (value) {
        transition.beforeEnter(el);
        setDisplay(el, true);
        transition.enter(el);
      } else {
        transition.leave(el, () => {
          setDisplay(el, false);
        });
      }
    } else {
      setDisplay(el, value);
    }
  },
  beforeUnmount(el, { value }) {
    setDisplay(el, value);
  }
};
function setDisplay(el, value) {
  el.style.display = value ? el._vod : "none";
}
const rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
let renderer;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
const createApp = (...args) => {
  const app2 = ensureRenderer().createApp(...args);
  const { mount } = app2;
  app2.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container)
      return;
    const component = app2._component;
    if (!isFunction(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    container.innerHTML = "";
    const proxy = mount(container, false, container instanceof SVGElement);
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app2;
};
function normalizeContainer(container) {
  if (isString(container)) {
    const res = document.querySelector(container);
    return res;
  }
  return container;
}
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$8 = {
  name: "AllFilterSvg"
};
const _hoisted_1$7 = {
  preserveAspectRatio: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "126.705",
  height: "49.779",
  viewBox: "0 0 126.705 49.779",
  class: "all-filter-svg"
};
const _hoisted_2$7 = /* @__PURE__ */ createBaseVNode("g", {
  "data-name": "Tracé 342",
  transform: "translate(4.095 0.511)",
  fill: "none"
}, [
  /* @__PURE__ */ createBaseVNode("path", {
    d: "M38.526.109C68.481-1.71,68.892.874,89.757,2.693s18-2.533,27.382,4.69,4.637,26.36.883,33.947-7.839,7.938-26.941,7.938-29.19-1.424-48.361-2.588c-29.954-1.819-29.563,4.474-40.632-5.35S-2.769,8.3,2.09,2.693,8.572,1.927,38.526.109Z",
    stroke: "none",
    class: "bg-button-filter"
  }),
  /* @__PURE__ */ createBaseVNode("path", {
    d: "M 55.70505142211914 1.488597869873047 C 51.05695343017578 1.488658905029297 45.47733306884766 1.690258026123047 38.64734649658203 2.104915618896484 C 33.85643005371094 2.395778656005859 29.30924987792969 2.543258666992188 25.13211059570312 2.543258666992188 C 19.46694946289062 2.543258666992188 15.43064880371094 2.278636932373047 12.48345184326172 2.085418701171875 C 10.77657318115234 1.973495483398438 9.428390502929688 1.885116577148438 8.344329833984375 1.885116577148438 C 5.952651977539062 1.885116577148438 5.110366821289062 2.261157989501953 3.6009521484375 4.002758026123047 C 2.537071228027344 5.230297088623047 1.359733581542969 7.552818298339844 0.37078857421875 10.37481689453125 C -0.4183883666992188 12.62677764892578 -1.451766967773438 16.23381805419922 -1.89312744140625 20.62917709350586 C -2.295967102050781 24.64093780517578 -2.103607177734375 28.28411674499512 -1.32135009765625 31.45755767822266 C -0.448211669921875 34.99969863891602 1.146072387695312 37.81781768798828 3.417213439941406 39.8336181640625 C 5.947769165039062 42.07969665527344 7.732368469238281 43.35205841064453 9.384468078613281 44.08805847167969 C 10.86480712890625 44.74755859375 12.35353088378906 45.01655578613281 14.52301025390625 45.01655578613281 C 15.91947174072266 45.01655578613281 17.50242614746094 44.91269683837891 19.50653076171875 44.78121566772461 C 22.59561157226562 44.57853698730469 26.44004821777344 44.32631683349609 31.65155029296875 44.32631683349609 C 35.22411346435547 44.32631683349609 38.88475036621094 44.44311904907227 42.84271240234375 44.68341827392578 C 48.81536865234375 45.04601669311523 53.81864929199219 45.42691802978516 58.65721130371094 45.7952766418457 C 69.03231048583984 46.58513641357422 77.9925537109375 47.26727676391602 91.08209228515625 47.26727676391602 C 100.2635345458984 47.26727676391602 106.1044082641602 47.19619750976562 109.7914276123047 46.21117782592773 C 111.4017105102539 45.78097534179688 112.6023864746094 45.17073822021484 113.5700531005859 44.29075622558594 C 114.5205688476562 43.42633819580078 115.3409729003906 42.23947906494141 116.2301483154297 40.44243621826172 C 118.034553527832 36.79575729370117 120.0587692260742 30.32043647766113 120.5134506225586 24.07463645935059 C 120.8773498535156 19.07603645324707 120.375732421875 12.39757919311523 115.919548034668 8.967796325683594 C 111.2813720703125 5.397918701171875 110.1018524169922 5.009017944335938 107.4448699951172 5.009037017822266 C 106.7678909301758 5.009037017822266 105.9860534667969 5.039276123046875 105.0807495117188 5.074275970458984 C 103.7868728637695 5.124317169189453 102.1765670776367 5.186595916748047 100.1695098876953 5.186595916748047 C 96.91638946533203 5.186595916748047 93.45376586914062 5.022636413574219 89.58374786376953 4.685337066650391 C 83.32398986816406 4.139778137207031 78.88713073730469 3.525356292724609 74.97254943847656 2.983257293701172 C 68.94183349609375 2.148117065429688 64.17839050292969 1.488475799560547 55.70505142211914 1.488597869873047 M 55.70503234863281 -0.5114059448242188 C 69.86276245117188 -0.5116004943847656 73.9080810546875 1.311550140380859 89.75740814208984 2.692897796630859 C 99.84519195556641 3.572101593017578 104.3855285644531 3.009048461914062 107.4448776245117 3.009033203125 C 110.7135696411133 3.009014129638672 112.2916793823242 3.651718139648438 117.1394119262695 7.382877349853516 C 126.5243911743164 14.60621643066406 121.7767105102539 33.74259948730469 118.0227127075195 41.32941818237305 C 114.2687301635742 48.91623687744141 110.1833877563477 49.26727676391602 91.08209228515625 49.26727676391602 C 71.98078918457031 49.26727676391602 61.89228820800781 47.8436164855957 42.72151184082031 46.67973709106445 C 38.45798492431641 46.42089462280273 34.80608367919922 46.32630920410156 31.65154266357422 46.32630920410156 C 12.64315795898438 46.32630920410156 11.58274078369141 49.75531768798828 2.089569091796875 41.32941818237305 C -8.979011535644531 31.50519752502441 -2.769027709960938 8.298957824707031 2.089569091796875 2.692897796630859 C 6.089996337890625 -1.922939300537109 7.898468017578125 0.5432662963867188 25.13211059570312 0.5432662963867188 C 28.82923126220703 0.5432662963867188 33.23513793945312 0.4298248291015625 38.52615356445312 0.1085968017578125 C 45.72770690917969 -0.3286170959472656 51.22393035888672 -0.5113410949707031 55.70503234863281 -0.5114059448242188 Z",
    stroke: "none",
    class: "term-filter-bg"
  })
], -1);
const _hoisted_3$6 = [
  _hoisted_2$7
];
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1$7, _hoisted_3$6);
}
const AllFilterSvg = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8]]);
const _sfc_main$7 = {
  name: "SearchLoop"
};
const _hoisted_1$6 = {
  class: "svg-loop-searchbox",
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  width: "26.861",
  height: "23.813",
  viewBox: "0 0 26.861 23.813"
};
const _hoisted_2$6 = /* @__PURE__ */ createStaticVNode('<defs><clipPath id="clip-path"><rect id="Rectangle_692" data-name="Rectangle 692" width="22.712" height="14.384" transform="translate(0 0)" fill="#106637"></rect></clipPath></defs><g id="Groupe_1429" data-name="Groupe 1429" transform="translate(7.192 0) rotate(30)"><g id="Groupe_1428" data-name="Groupe 1428" transform="translate(0 0)" clip-path="url(#clip-path)"><path id="Tracé_195" data-name="Tracé 195" d="M13.092,20.157a4.814,4.814,0,0,1-4.8-4.516,4.735,4.735,0,0,1,.5-2.444,4.8,4.8,0,0,1,3.9-2.639,4.734,4.734,0,0,1,2.519.477,4.8,4.8,0,0,1,2.668,3.912,4.736,4.736,0,0,1-.481,2.536,4.817,4.817,0,0,1-4.312,2.675m0-8.794a3.986,3.986,0,1,0,3.911,3.225A4,4,0,0,0,13.1,11.362" transform="translate(-6.583 -8.375)" fill="#106637"></path><path id="Tracé_196" data-name="Tracé 196" d="M20.467,14.384a5.979,5.979,0,0,1-2.235-.815l-.442-.211c-1.06-.5-2.127-.994-3.17-1.454a.409.409,0,0,1-.237-.3l-.069-.353-2.091-.8A7.007,7.007,0,0,1,7.94,13.407a6.609,6.609,0,0,1-5.131-.915,6.868,6.868,0,0,1-1.669-9.37C2.743.707,6.261-.91,9.375.563a6.647,6.647,0,0,1,3.607,6.623l2.267,1.081.8-.236a.409.409,0,0,1,.218,0,31.249,31.249,0,0,1,4.1,1.373c1.508.626,1.985.965,2.219,1.576a2.489,2.489,0,0,1-.153,1.913,2.608,2.608,0,0,1-1.446,1.4,1.578,1.578,0,0,1-.519.091m-5.318-3.145c.988.438,1.994.9,2.995,1.377l.443.212c1.369.656,1.743.822,2.134.688a1.818,1.818,0,0,0,.968-.974,1.7,1.7,0,0,0,.129-1.272c-.116-.3-.41-.548-1.767-1.111a30.305,30.305,0,0,0-3.464-1.2,1.5,1.5,0,0,0-.826.008L15.33,9.1a.41.41,0,0,1-.293-.023L12.364,7.8a.406.406,0,0,1-.231-.417,5.838,5.838,0,0,0-3.11-6.079,5.9,5.9,0,0,0-7.2,2.271,6.035,6.035,0,0,0,1.443,8.235,5.78,5.78,0,0,0,4.491.795A6.1,6.1,0,0,0,11.7,9.74a.411.411,0,0,1,.5-.174l2.619,1a.411.411,0,0,1,.256.305Z" transform="translate(0 0)" fill="#106637"></path><path id="Tracé_197" data-name="Tracé 197" d="M24.7,24.733a.341.341,0,0,1-.083-.093.411.411,0,0,1,.12-.568l1.8-1.175a.412.412,0,0,1,.448.688l-1.8,1.175a.527.527,0,0,1-.485-.027" transform="translate(-19.509 -18.163)" fill="#106637"></path><path id="Tracé_198" data-name="Tracé 198" d="M24.489,35.351a.411.411,0,0,1-.373-.239.428.428,0,0,1,.194-.542l2.3-1.294a.411.411,0,0,1,.578.194.426.426,0,0,1-.2.533L24.69,35.3a.41.41,0,0,1-.2.053" transform="translate(-19.136 -26.402)" fill="#106637"></path></g></g>', 2);
const _hoisted_4$3 = [
  _hoisted_2$6
];
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1$6, _hoisted_4$3);
}
const SearchLoop = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7]]);
const _sfc_main$6 = {
  name: "SearchBox"
};
const _hoisted_1$5 = {
  class: "svg-searchbox",
  preserveAspectRatio: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "566.068",
  height: "46.058",
  viewBox: "0 0 566.068 46.058"
};
const _hoisted_2$5 = /* @__PURE__ */ createBaseVNode("path", {
  id: "GettyImages-812274250",
  d: "M3945.411,1788.229c57.269-2.873,105.794.092,141.263,0,10.783-.028,32.27-.085,45.572,0,29.546.189,80.731,0,95.333,0,19-.082,84.7-.152,99.286.662,15.052.813,20.227,5.041,20.227,7.968.941,2.2,5.183,27.237-4.8,31.456s-195.1,2.9-212.565,1.268-157.41.634-173.921,0-144.322,1.268-161.444-.528-6.833-23.938-3.751-28.589-1.752-9.461,11.7-11.046S3945.411,1788.229,3945.411,1788.229Z",
  transform: "translate(-3783.726 -1786.086)",
  fill: "none",
  stroke: "#00693e",
  "stroke-width": "2"
}, null, -1);
const _hoisted_3$5 = [
  _hoisted_2$5
];
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1$5, _hoisted_3$5);
}
const SearchBox = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6]]);
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var he$1 = { exports: {} };
/*! https://mths.be/he v1.2.0 by @mathias | MIT license */
he$1.exports;
(function(module, exports) {
  (function(root) {
    var freeExports = exports;
    var freeModule = module && module.exports == freeExports && module;
    var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal;
    if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
      root = freeGlobal;
    }
    var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
    var regexAsciiWhitelist = /[\x01-\x7F]/g;
    var regexBmpWhitelist = /[\x01-\t\x0B\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g;
    var regexEncodeNonAscii = /<\u20D2|=\u20E5|>\u20D2|\u205F\u200A|\u219D\u0338|\u2202\u0338|\u2220\u20D2|\u2229\uFE00|\u222A\uFE00|\u223C\u20D2|\u223D\u0331|\u223E\u0333|\u2242\u0338|\u224B\u0338|\u224D\u20D2|\u224E\u0338|\u224F\u0338|\u2250\u0338|\u2261\u20E5|\u2264\u20D2|\u2265\u20D2|\u2266\u0338|\u2267\u0338|\u2268\uFE00|\u2269\uFE00|\u226A\u0338|\u226A\u20D2|\u226B\u0338|\u226B\u20D2|\u227F\u0338|\u2282\u20D2|\u2283\u20D2|\u228A\uFE00|\u228B\uFE00|\u228F\u0338|\u2290\u0338|\u2293\uFE00|\u2294\uFE00|\u22B4\u20D2|\u22B5\u20D2|\u22D8\u0338|\u22D9\u0338|\u22DA\uFE00|\u22DB\uFE00|\u22F5\u0338|\u22F9\u0338|\u2933\u0338|\u29CF\u0338|\u29D0\u0338|\u2A6D\u0338|\u2A70\u0338|\u2A7D\u0338|\u2A7E\u0338|\u2AA1\u0338|\u2AA2\u0338|\u2AAC\uFE00|\u2AAD\uFE00|\u2AAF\u0338|\u2AB0\u0338|\u2AC5\u0338|\u2AC6\u0338|\u2ACB\uFE00|\u2ACC\uFE00|\u2AFD\u20E5|[\xA0-\u0113\u0116-\u0122\u0124-\u012B\u012E-\u014D\u0150-\u017E\u0192\u01B5\u01F5\u0237\u02C6\u02C7\u02D8-\u02DD\u0311\u0391-\u03A1\u03A3-\u03A9\u03B1-\u03C9\u03D1\u03D2\u03D5\u03D6\u03DC\u03DD\u03F0\u03F1\u03F5\u03F6\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E\u045F\u2002-\u2005\u2007-\u2010\u2013-\u2016\u2018-\u201A\u201C-\u201E\u2020-\u2022\u2025\u2026\u2030-\u2035\u2039\u203A\u203E\u2041\u2043\u2044\u204F\u2057\u205F-\u2063\u20AC\u20DB\u20DC\u2102\u2105\u210A-\u2113\u2115-\u211E\u2122\u2124\u2127-\u2129\u212C\u212D\u212F-\u2131\u2133-\u2138\u2145-\u2148\u2153-\u215E\u2190-\u219B\u219D-\u21A7\u21A9-\u21AE\u21B0-\u21B3\u21B5-\u21B7\u21BA-\u21DB\u21DD\u21E4\u21E5\u21F5\u21FD-\u2205\u2207-\u2209\u220B\u220C\u220F-\u2214\u2216-\u2218\u221A\u221D-\u2238\u223A-\u2257\u2259\u225A\u225C\u225F-\u2262\u2264-\u228B\u228D-\u229B\u229D-\u22A5\u22A7-\u22B0\u22B2-\u22BB\u22BD-\u22DB\u22DE-\u22E3\u22E6-\u22F7\u22F9-\u22FE\u2305\u2306\u2308-\u2310\u2312\u2313\u2315\u2316\u231C-\u231F\u2322\u2323\u232D\u232E\u2336\u233D\u233F\u237C\u23B0\u23B1\u23B4-\u23B6\u23DC-\u23DF\u23E2\u23E7\u2423\u24C8\u2500\u2502\u250C\u2510\u2514\u2518\u251C\u2524\u252C\u2534\u253C\u2550-\u256C\u2580\u2584\u2588\u2591-\u2593\u25A1\u25AA\u25AB\u25AD\u25AE\u25B1\u25B3-\u25B5\u25B8\u25B9\u25BD-\u25BF\u25C2\u25C3\u25CA\u25CB\u25EC\u25EF\u25F8-\u25FC\u2605\u2606\u260E\u2640\u2642\u2660\u2663\u2665\u2666\u266A\u266D-\u266F\u2713\u2717\u2720\u2736\u2758\u2772\u2773\u27C8\u27C9\u27E6-\u27ED\u27F5-\u27FA\u27FC\u27FF\u2902-\u2905\u290C-\u2913\u2916\u2919-\u2920\u2923-\u292A\u2933\u2935-\u2939\u293C\u293D\u2945\u2948-\u294B\u294E-\u2976\u2978\u2979\u297B-\u297F\u2985\u2986\u298B-\u2996\u299A\u299C\u299D\u29A4-\u29B7\u29B9\u29BB\u29BC\u29BE-\u29C5\u29C9\u29CD-\u29D0\u29DC-\u29DE\u29E3-\u29E5\u29EB\u29F4\u29F6\u2A00-\u2A02\u2A04\u2A06\u2A0C\u2A0D\u2A10-\u2A17\u2A22-\u2A27\u2A29\u2A2A\u2A2D-\u2A31\u2A33-\u2A3C\u2A3F\u2A40\u2A42-\u2A4D\u2A50\u2A53-\u2A58\u2A5A-\u2A5D\u2A5F\u2A66\u2A6A\u2A6D-\u2A75\u2A77-\u2A9A\u2A9D-\u2AA2\u2AA4-\u2AB0\u2AB3-\u2AC8\u2ACB\u2ACC\u2ACF-\u2ADB\u2AE4\u2AE6-\u2AE9\u2AEB-\u2AF3\u2AFD\uFB00-\uFB04]|\uD835[\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDD6B]/g;
    var encodeMap = { "­": "shy", "‌": "zwnj", "‍": "zwj", "‎": "lrm", "⁣": "ic", "⁢": "it", "⁡": "af", "‏": "rlm", "​": "ZeroWidthSpace", "⁠": "NoBreak", "̑": "DownBreve", "⃛": "tdot", "⃜": "DotDot", "	": "Tab", "\n": "NewLine", " ": "puncsp", " ": "MediumSpace", " ": "thinsp", " ": "hairsp", " ": "emsp13", " ": "ensp", " ": "emsp14", " ": "emsp", " ": "numsp", " ": "nbsp", "  ": "ThickSpace", "‾": "oline", "_": "lowbar", "‐": "dash", "–": "ndash", "—": "mdash", "―": "horbar", ",": "comma", ";": "semi", "⁏": "bsemi", ":": "colon", "⩴": "Colone", "!": "excl", "¡": "iexcl", "?": "quest", "¿": "iquest", ".": "period", "‥": "nldr", "…": "mldr", "·": "middot", "'": "apos", "‘": "lsquo", "’": "rsquo", "‚": "sbquo", "‹": "lsaquo", "›": "rsaquo", '"': "quot", "“": "ldquo", "”": "rdquo", "„": "bdquo", "«": "laquo", "»": "raquo", "(": "lpar", ")": "rpar", "[": "lsqb", "]": "rsqb", "{": "lcub", "}": "rcub", "⌈": "lceil", "⌉": "rceil", "⌊": "lfloor", "⌋": "rfloor", "⦅": "lopar", "⦆": "ropar", "⦋": "lbrke", "⦌": "rbrke", "⦍": "lbrkslu", "⦎": "rbrksld", "⦏": "lbrksld", "⦐": "rbrkslu", "⦑": "langd", "⦒": "rangd", "⦓": "lparlt", "⦔": "rpargt", "⦕": "gtlPar", "⦖": "ltrPar", "⟦": "lobrk", "⟧": "robrk", "⟨": "lang", "⟩": "rang", "⟪": "Lang", "⟫": "Rang", "⟬": "loang", "⟭": "roang", "❲": "lbbrk", "❳": "rbbrk", "‖": "Vert", "§": "sect", "¶": "para", "@": "commat", "*": "ast", "/": "sol", "undefined": null, "&": "amp", "#": "num", "%": "percnt", "‰": "permil", "‱": "pertenk", "†": "dagger", "‡": "Dagger", "•": "bull", "⁃": "hybull", "′": "prime", "″": "Prime", "‴": "tprime", "⁗": "qprime", "‵": "bprime", "⁁": "caret", "`": "grave", "´": "acute", "˜": "tilde", "^": "Hat", "¯": "macr", "˘": "breve", "˙": "dot", "¨": "die", "˚": "ring", "˝": "dblac", "¸": "cedil", "˛": "ogon", "ˆ": "circ", "ˇ": "caron", "°": "deg", "©": "copy", "®": "reg", "℗": "copysr", "℘": "wp", "℞": "rx", "℧": "mho", "℩": "iiota", "←": "larr", "↚": "nlarr", "→": "rarr", "↛": "nrarr", "↑": "uarr", "↓": "darr", "↔": "harr", "↮": "nharr", "↕": "varr", "↖": "nwarr", "↗": "nearr", "↘": "searr", "↙": "swarr", "↝": "rarrw", "↝̸": "nrarrw", "↞": "Larr", "↟": "Uarr", "↠": "Rarr", "↡": "Darr", "↢": "larrtl", "↣": "rarrtl", "↤": "mapstoleft", "↥": "mapstoup", "↦": "map", "↧": "mapstodown", "↩": "larrhk", "↪": "rarrhk", "↫": "larrlp", "↬": "rarrlp", "↭": "harrw", "↰": "lsh", "↱": "rsh", "↲": "ldsh", "↳": "rdsh", "↵": "crarr", "↶": "cularr", "↷": "curarr", "↺": "olarr", "↻": "orarr", "↼": "lharu", "↽": "lhard", "↾": "uharr", "↿": "uharl", "⇀": "rharu", "⇁": "rhard", "⇂": "dharr", "⇃": "dharl", "⇄": "rlarr", "⇅": "udarr", "⇆": "lrarr", "⇇": "llarr", "⇈": "uuarr", "⇉": "rrarr", "⇊": "ddarr", "⇋": "lrhar", "⇌": "rlhar", "⇐": "lArr", "⇍": "nlArr", "⇑": "uArr", "⇒": "rArr", "⇏": "nrArr", "⇓": "dArr", "⇔": "iff", "⇎": "nhArr", "⇕": "vArr", "⇖": "nwArr", "⇗": "neArr", "⇘": "seArr", "⇙": "swArr", "⇚": "lAarr", "⇛": "rAarr", "⇝": "zigrarr", "⇤": "larrb", "⇥": "rarrb", "⇵": "duarr", "⇽": "loarr", "⇾": "roarr", "⇿": "hoarr", "∀": "forall", "∁": "comp", "∂": "part", "∂̸": "npart", "∃": "exist", "∄": "nexist", "∅": "empty", "∇": "Del", "∈": "in", "∉": "notin", "∋": "ni", "∌": "notni", "϶": "bepsi", "∏": "prod", "∐": "coprod", "∑": "sum", "+": "plus", "±": "pm", "÷": "div", "×": "times", "<": "lt", "≮": "nlt", "<⃒": "nvlt", "=": "equals", "≠": "ne", "=⃥": "bne", "⩵": "Equal", ">": "gt", "≯": "ngt", ">⃒": "nvgt", "¬": "not", "|": "vert", "¦": "brvbar", "−": "minus", "∓": "mp", "∔": "plusdo", "⁄": "frasl", "∖": "setmn", "∗": "lowast", "∘": "compfn", "√": "Sqrt", "∝": "prop", "∞": "infin", "∟": "angrt", "∠": "ang", "∠⃒": "nang", "∡": "angmsd", "∢": "angsph", "∣": "mid", "∤": "nmid", "∥": "par", "∦": "npar", "∧": "and", "∨": "or", "∩": "cap", "∩︀": "caps", "∪": "cup", "∪︀": "cups", "∫": "int", "∬": "Int", "∭": "tint", "⨌": "qint", "∮": "oint", "∯": "Conint", "∰": "Cconint", "∱": "cwint", "∲": "cwconint", "∳": "awconint", "∴": "there4", "∵": "becaus", "∶": "ratio", "∷": "Colon", "∸": "minusd", "∺": "mDDot", "∻": "homtht", "∼": "sim", "≁": "nsim", "∼⃒": "nvsim", "∽": "bsim", "∽̱": "race", "∾": "ac", "∾̳": "acE", "∿": "acd", "≀": "wr", "≂": "esim", "≂̸": "nesim", "≃": "sime", "≄": "nsime", "≅": "cong", "≇": "ncong", "≆": "simne", "≈": "ap", "≉": "nap", "≊": "ape", "≋": "apid", "≋̸": "napid", "≌": "bcong", "≍": "CupCap", "≭": "NotCupCap", "≍⃒": "nvap", "≎": "bump", "≎̸": "nbump", "≏": "bumpe", "≏̸": "nbumpe", "≐": "doteq", "≐̸": "nedot", "≑": "eDot", "≒": "efDot", "≓": "erDot", "≔": "colone", "≕": "ecolon", "≖": "ecir", "≗": "cire", "≙": "wedgeq", "≚": "veeeq", "≜": "trie", "≟": "equest", "≡": "equiv", "≢": "nequiv", "≡⃥": "bnequiv", "≤": "le", "≰": "nle", "≤⃒": "nvle", "≥": "ge", "≱": "nge", "≥⃒": "nvge", "≦": "lE", "≦̸": "nlE", "≧": "gE", "≧̸": "ngE", "≨︀": "lvnE", "≨": "lnE", "≩": "gnE", "≩︀": "gvnE", "≪": "ll", "≪̸": "nLtv", "≪⃒": "nLt", "≫": "gg", "≫̸": "nGtv", "≫⃒": "nGt", "≬": "twixt", "≲": "lsim", "≴": "nlsim", "≳": "gsim", "≵": "ngsim", "≶": "lg", "≸": "ntlg", "≷": "gl", "≹": "ntgl", "≺": "pr", "⊀": "npr", "≻": "sc", "⊁": "nsc", "≼": "prcue", "⋠": "nprcue", "≽": "sccue", "⋡": "nsccue", "≾": "prsim", "≿": "scsim", "≿̸": "NotSucceedsTilde", "⊂": "sub", "⊄": "nsub", "⊂⃒": "vnsub", "⊃": "sup", "⊅": "nsup", "⊃⃒": "vnsup", "⊆": "sube", "⊈": "nsube", "⊇": "supe", "⊉": "nsupe", "⊊︀": "vsubne", "⊊": "subne", "⊋︀": "vsupne", "⊋": "supne", "⊍": "cupdot", "⊎": "uplus", "⊏": "sqsub", "⊏̸": "NotSquareSubset", "⊐": "sqsup", "⊐̸": "NotSquareSuperset", "⊑": "sqsube", "⋢": "nsqsube", "⊒": "sqsupe", "⋣": "nsqsupe", "⊓": "sqcap", "⊓︀": "sqcaps", "⊔": "sqcup", "⊔︀": "sqcups", "⊕": "oplus", "⊖": "ominus", "⊗": "otimes", "⊘": "osol", "⊙": "odot", "⊚": "ocir", "⊛": "oast", "⊝": "odash", "⊞": "plusb", "⊟": "minusb", "⊠": "timesb", "⊡": "sdotb", "⊢": "vdash", "⊬": "nvdash", "⊣": "dashv", "⊤": "top", "⊥": "bot", "⊧": "models", "⊨": "vDash", "⊭": "nvDash", "⊩": "Vdash", "⊮": "nVdash", "⊪": "Vvdash", "⊫": "VDash", "⊯": "nVDash", "⊰": "prurel", "⊲": "vltri", "⋪": "nltri", "⊳": "vrtri", "⋫": "nrtri", "⊴": "ltrie", "⋬": "nltrie", "⊴⃒": "nvltrie", "⊵": "rtrie", "⋭": "nrtrie", "⊵⃒": "nvrtrie", "⊶": "origof", "⊷": "imof", "⊸": "mumap", "⊹": "hercon", "⊺": "intcal", "⊻": "veebar", "⊽": "barvee", "⊾": "angrtvb", "⊿": "lrtri", "⋀": "Wedge", "⋁": "Vee", "⋂": "xcap", "⋃": "xcup", "⋄": "diam", "⋅": "sdot", "⋆": "Star", "⋇": "divonx", "⋈": "bowtie", "⋉": "ltimes", "⋊": "rtimes", "⋋": "lthree", "⋌": "rthree", "⋍": "bsime", "⋎": "cuvee", "⋏": "cuwed", "⋐": "Sub", "⋑": "Sup", "⋒": "Cap", "⋓": "Cup", "⋔": "fork", "⋕": "epar", "⋖": "ltdot", "⋗": "gtdot", "⋘": "Ll", "⋘̸": "nLl", "⋙": "Gg", "⋙̸": "nGg", "⋚︀": "lesg", "⋚": "leg", "⋛": "gel", "⋛︀": "gesl", "⋞": "cuepr", "⋟": "cuesc", "⋦": "lnsim", "⋧": "gnsim", "⋨": "prnsim", "⋩": "scnsim", "⋮": "vellip", "⋯": "ctdot", "⋰": "utdot", "⋱": "dtdot", "⋲": "disin", "⋳": "isinsv", "⋴": "isins", "⋵": "isindot", "⋵̸": "notindot", "⋶": "notinvc", "⋷": "notinvb", "⋹": "isinE", "⋹̸": "notinE", "⋺": "nisd", "⋻": "xnis", "⋼": "nis", "⋽": "notnivc", "⋾": "notnivb", "⌅": "barwed", "⌆": "Barwed", "⌌": "drcrop", "⌍": "dlcrop", "⌎": "urcrop", "⌏": "ulcrop", "⌐": "bnot", "⌒": "profline", "⌓": "profsurf", "⌕": "telrec", "⌖": "target", "⌜": "ulcorn", "⌝": "urcorn", "⌞": "dlcorn", "⌟": "drcorn", "⌢": "frown", "⌣": "smile", "⌭": "cylcty", "⌮": "profalar", "⌶": "topbot", "⌽": "ovbar", "⌿": "solbar", "⍼": "angzarr", "⎰": "lmoust", "⎱": "rmoust", "⎴": "tbrk", "⎵": "bbrk", "⎶": "bbrktbrk", "⏜": "OverParenthesis", "⏝": "UnderParenthesis", "⏞": "OverBrace", "⏟": "UnderBrace", "⏢": "trpezium", "⏧": "elinters", "␣": "blank", "─": "boxh", "│": "boxv", "┌": "boxdr", "┐": "boxdl", "└": "boxur", "┘": "boxul", "├": "boxvr", "┤": "boxvl", "┬": "boxhd", "┴": "boxhu", "┼": "boxvh", "═": "boxH", "║": "boxV", "╒": "boxdR", "╓": "boxDr", "╔": "boxDR", "╕": "boxdL", "╖": "boxDl", "╗": "boxDL", "╘": "boxuR", "╙": "boxUr", "╚": "boxUR", "╛": "boxuL", "╜": "boxUl", "╝": "boxUL", "╞": "boxvR", "╟": "boxVr", "╠": "boxVR", "╡": "boxvL", "╢": "boxVl", "╣": "boxVL", "╤": "boxHd", "╥": "boxhD", "╦": "boxHD", "╧": "boxHu", "╨": "boxhU", "╩": "boxHU", "╪": "boxvH", "╫": "boxVh", "╬": "boxVH", "▀": "uhblk", "▄": "lhblk", "█": "block", "░": "blk14", "▒": "blk12", "▓": "blk34", "□": "squ", "▪": "squf", "▫": "EmptyVerySmallSquare", "▭": "rect", "▮": "marker", "▱": "fltns", "△": "xutri", "▴": "utrif", "▵": "utri", "▸": "rtrif", "▹": "rtri", "▽": "xdtri", "▾": "dtrif", "▿": "dtri", "◂": "ltrif", "◃": "ltri", "◊": "loz", "○": "cir", "◬": "tridot", "◯": "xcirc", "◸": "ultri", "◹": "urtri", "◺": "lltri", "◻": "EmptySmallSquare", "◼": "FilledSmallSquare", "★": "starf", "☆": "star", "☎": "phone", "♀": "female", "♂": "male", "♠": "spades", "♣": "clubs", "♥": "hearts", "♦": "diams", "♪": "sung", "✓": "check", "✗": "cross", "✠": "malt", "✶": "sext", "❘": "VerticalSeparator", "⟈": "bsolhsub", "⟉": "suphsol", "⟵": "xlarr", "⟶": "xrarr", "⟷": "xharr", "⟸": "xlArr", "⟹": "xrArr", "⟺": "xhArr", "⟼": "xmap", "⟿": "dzigrarr", "⤂": "nvlArr", "⤃": "nvrArr", "⤄": "nvHarr", "⤅": "Map", "⤌": "lbarr", "⤍": "rbarr", "⤎": "lBarr", "⤏": "rBarr", "⤐": "RBarr", "⤑": "DDotrahd", "⤒": "UpArrowBar", "⤓": "DownArrowBar", "⤖": "Rarrtl", "⤙": "latail", "⤚": "ratail", "⤛": "lAtail", "⤜": "rAtail", "⤝": "larrfs", "⤞": "rarrfs", "⤟": "larrbfs", "⤠": "rarrbfs", "⤣": "nwarhk", "⤤": "nearhk", "⤥": "searhk", "⤦": "swarhk", "⤧": "nwnear", "⤨": "toea", "⤩": "tosa", "⤪": "swnwar", "⤳": "rarrc", "⤳̸": "nrarrc", "⤵": "cudarrr", "⤶": "ldca", "⤷": "rdca", "⤸": "cudarrl", "⤹": "larrpl", "⤼": "curarrm", "⤽": "cularrp", "⥅": "rarrpl", "⥈": "harrcir", "⥉": "Uarrocir", "⥊": "lurdshar", "⥋": "ldrushar", "⥎": "LeftRightVector", "⥏": "RightUpDownVector", "⥐": "DownLeftRightVector", "⥑": "LeftUpDownVector", "⥒": "LeftVectorBar", "⥓": "RightVectorBar", "⥔": "RightUpVectorBar", "⥕": "RightDownVectorBar", "⥖": "DownLeftVectorBar", "⥗": "DownRightVectorBar", "⥘": "LeftUpVectorBar", "⥙": "LeftDownVectorBar", "⥚": "LeftTeeVector", "⥛": "RightTeeVector", "⥜": "RightUpTeeVector", "⥝": "RightDownTeeVector", "⥞": "DownLeftTeeVector", "⥟": "DownRightTeeVector", "⥠": "LeftUpTeeVector", "⥡": "LeftDownTeeVector", "⥢": "lHar", "⥣": "uHar", "⥤": "rHar", "⥥": "dHar", "⥦": "luruhar", "⥧": "ldrdhar", "⥨": "ruluhar", "⥩": "rdldhar", "⥪": "lharul", "⥫": "llhard", "⥬": "rharul", "⥭": "lrhard", "⥮": "udhar", "⥯": "duhar", "⥰": "RoundImplies", "⥱": "erarr", "⥲": "simrarr", "⥳": "larrsim", "⥴": "rarrsim", "⥵": "rarrap", "⥶": "ltlarr", "⥸": "gtrarr", "⥹": "subrarr", "⥻": "suplarr", "⥼": "lfisht", "⥽": "rfisht", "⥾": "ufisht", "⥿": "dfisht", "⦚": "vzigzag", "⦜": "vangrt", "⦝": "angrtvbd", "⦤": "ange", "⦥": "range", "⦦": "dwangle", "⦧": "uwangle", "⦨": "angmsdaa", "⦩": "angmsdab", "⦪": "angmsdac", "⦫": "angmsdad", "⦬": "angmsdae", "⦭": "angmsdaf", "⦮": "angmsdag", "⦯": "angmsdah", "⦰": "bemptyv", "⦱": "demptyv", "⦲": "cemptyv", "⦳": "raemptyv", "⦴": "laemptyv", "⦵": "ohbar", "⦶": "omid", "⦷": "opar", "⦹": "operp", "⦻": "olcross", "⦼": "odsold", "⦾": "olcir", "⦿": "ofcir", "⧀": "olt", "⧁": "ogt", "⧂": "cirscir", "⧃": "cirE", "⧄": "solb", "⧅": "bsolb", "⧉": "boxbox", "⧍": "trisb", "⧎": "rtriltri", "⧏": "LeftTriangleBar", "⧏̸": "NotLeftTriangleBar", "⧐": "RightTriangleBar", "⧐̸": "NotRightTriangleBar", "⧜": "iinfin", "⧝": "infintie", "⧞": "nvinfin", "⧣": "eparsl", "⧤": "smeparsl", "⧥": "eqvparsl", "⧫": "lozf", "⧴": "RuleDelayed", "⧶": "dsol", "⨀": "xodot", "⨁": "xoplus", "⨂": "xotime", "⨄": "xuplus", "⨆": "xsqcup", "⨍": "fpartint", "⨐": "cirfnint", "⨑": "awint", "⨒": "rppolint", "⨓": "scpolint", "⨔": "npolint", "⨕": "pointint", "⨖": "quatint", "⨗": "intlarhk", "⨢": "pluscir", "⨣": "plusacir", "⨤": "simplus", "⨥": "plusdu", "⨦": "plussim", "⨧": "plustwo", "⨩": "mcomma", "⨪": "minusdu", "⨭": "loplus", "⨮": "roplus", "⨯": "Cross", "⨰": "timesd", "⨱": "timesbar", "⨳": "smashp", "⨴": "lotimes", "⨵": "rotimes", "⨶": "otimesas", "⨷": "Otimes", "⨸": "odiv", "⨹": "triplus", "⨺": "triminus", "⨻": "tritime", "⨼": "iprod", "⨿": "amalg", "⩀": "capdot", "⩂": "ncup", "⩃": "ncap", "⩄": "capand", "⩅": "cupor", "⩆": "cupcap", "⩇": "capcup", "⩈": "cupbrcap", "⩉": "capbrcup", "⩊": "cupcup", "⩋": "capcap", "⩌": "ccups", "⩍": "ccaps", "⩐": "ccupssm", "⩓": "And", "⩔": "Or", "⩕": "andand", "⩖": "oror", "⩗": "orslope", "⩘": "andslope", "⩚": "andv", "⩛": "orv", "⩜": "andd", "⩝": "ord", "⩟": "wedbar", "⩦": "sdote", "⩪": "simdot", "⩭": "congdot", "⩭̸": "ncongdot", "⩮": "easter", "⩯": "apacir", "⩰": "apE", "⩰̸": "napE", "⩱": "eplus", "⩲": "pluse", "⩳": "Esim", "⩷": "eDDot", "⩸": "equivDD", "⩹": "ltcir", "⩺": "gtcir", "⩻": "ltquest", "⩼": "gtquest", "⩽": "les", "⩽̸": "nles", "⩾": "ges", "⩾̸": "nges", "⩿": "lesdot", "⪀": "gesdot", "⪁": "lesdoto", "⪂": "gesdoto", "⪃": "lesdotor", "⪄": "gesdotol", "⪅": "lap", "⪆": "gap", "⪇": "lne", "⪈": "gne", "⪉": "lnap", "⪊": "gnap", "⪋": "lEg", "⪌": "gEl", "⪍": "lsime", "⪎": "gsime", "⪏": "lsimg", "⪐": "gsiml", "⪑": "lgE", "⪒": "glE", "⪓": "lesges", "⪔": "gesles", "⪕": "els", "⪖": "egs", "⪗": "elsdot", "⪘": "egsdot", "⪙": "el", "⪚": "eg", "⪝": "siml", "⪞": "simg", "⪟": "simlE", "⪠": "simgE", "⪡": "LessLess", "⪡̸": "NotNestedLessLess", "⪢": "GreaterGreater", "⪢̸": "NotNestedGreaterGreater", "⪤": "glj", "⪥": "gla", "⪦": "ltcc", "⪧": "gtcc", "⪨": "lescc", "⪩": "gescc", "⪪": "smt", "⪫": "lat", "⪬": "smte", "⪬︀": "smtes", "⪭": "late", "⪭︀": "lates", "⪮": "bumpE", "⪯": "pre", "⪯̸": "npre", "⪰": "sce", "⪰̸": "nsce", "⪳": "prE", "⪴": "scE", "⪵": "prnE", "⪶": "scnE", "⪷": "prap", "⪸": "scap", "⪹": "prnap", "⪺": "scnap", "⪻": "Pr", "⪼": "Sc", "⪽": "subdot", "⪾": "supdot", "⪿": "subplus", "⫀": "supplus", "⫁": "submult", "⫂": "supmult", "⫃": "subedot", "⫄": "supedot", "⫅": "subE", "⫅̸": "nsubE", "⫆": "supE", "⫆̸": "nsupE", "⫇": "subsim", "⫈": "supsim", "⫋︀": "vsubnE", "⫋": "subnE", "⫌︀": "vsupnE", "⫌": "supnE", "⫏": "csub", "⫐": "csup", "⫑": "csube", "⫒": "csupe", "⫓": "subsup", "⫔": "supsub", "⫕": "subsub", "⫖": "supsup", "⫗": "suphsub", "⫘": "supdsub", "⫙": "forkv", "⫚": "topfork", "⫛": "mlcp", "⫤": "Dashv", "⫦": "Vdashl", "⫧": "Barv", "⫨": "vBar", "⫩": "vBarv", "⫫": "Vbar", "⫬": "Not", "⫭": "bNot", "⫮": "rnmid", "⫯": "cirmid", "⫰": "midcir", "⫱": "topcir", "⫲": "nhpar", "⫳": "parsim", "⫽": "parsl", "⫽⃥": "nparsl", "♭": "flat", "♮": "natur", "♯": "sharp", "¤": "curren", "¢": "cent", "$": "dollar", "£": "pound", "¥": "yen", "€": "euro", "¹": "sup1", "½": "half", "⅓": "frac13", "¼": "frac14", "⅕": "frac15", "⅙": "frac16", "⅛": "frac18", "²": "sup2", "⅔": "frac23", "⅖": "frac25", "³": "sup3", "¾": "frac34", "⅗": "frac35", "⅜": "frac38", "⅘": "frac45", "⅚": "frac56", "⅝": "frac58", "⅞": "frac78", "𝒶": "ascr", "𝕒": "aopf", "𝔞": "afr", "𝔸": "Aopf", "𝔄": "Afr", "𝒜": "Ascr", "ª": "ordf", "á": "aacute", "Á": "Aacute", "à": "agrave", "À": "Agrave", "ă": "abreve", "Ă": "Abreve", "â": "acirc", "Â": "Acirc", "å": "aring", "Å": "angst", "ä": "auml", "Ä": "Auml", "ã": "atilde", "Ã": "Atilde", "ą": "aogon", "Ą": "Aogon", "ā": "amacr", "Ā": "Amacr", "æ": "aelig", "Æ": "AElig", "𝒷": "bscr", "𝕓": "bopf", "𝔟": "bfr", "𝔹": "Bopf", "ℬ": "Bscr", "𝔅": "Bfr", "𝔠": "cfr", "𝒸": "cscr", "𝕔": "copf", "ℭ": "Cfr", "𝒞": "Cscr", "ℂ": "Copf", "ć": "cacute", "Ć": "Cacute", "ĉ": "ccirc", "Ĉ": "Ccirc", "č": "ccaron", "Č": "Ccaron", "ċ": "cdot", "Ċ": "Cdot", "ç": "ccedil", "Ç": "Ccedil", "℅": "incare", "𝔡": "dfr", "ⅆ": "dd", "𝕕": "dopf", "𝒹": "dscr", "𝒟": "Dscr", "𝔇": "Dfr", "ⅅ": "DD", "𝔻": "Dopf", "ď": "dcaron", "Ď": "Dcaron", "đ": "dstrok", "Đ": "Dstrok", "ð": "eth", "Ð": "ETH", "ⅇ": "ee", "ℯ": "escr", "𝔢": "efr", "𝕖": "eopf", "ℰ": "Escr", "𝔈": "Efr", "𝔼": "Eopf", "é": "eacute", "É": "Eacute", "è": "egrave", "È": "Egrave", "ê": "ecirc", "Ê": "Ecirc", "ě": "ecaron", "Ě": "Ecaron", "ë": "euml", "Ë": "Euml", "ė": "edot", "Ė": "Edot", "ę": "eogon", "Ę": "Eogon", "ē": "emacr", "Ē": "Emacr", "𝔣": "ffr", "𝕗": "fopf", "𝒻": "fscr", "𝔉": "Ffr", "𝔽": "Fopf", "ℱ": "Fscr", "ﬀ": "fflig", "ﬃ": "ffilig", "ﬄ": "ffllig", "ﬁ": "filig", "fj": "fjlig", "ﬂ": "fllig", "ƒ": "fnof", "ℊ": "gscr", "𝕘": "gopf", "𝔤": "gfr", "𝒢": "Gscr", "𝔾": "Gopf", "𝔊": "Gfr", "ǵ": "gacute", "ğ": "gbreve", "Ğ": "Gbreve", "ĝ": "gcirc", "Ĝ": "Gcirc", "ġ": "gdot", "Ġ": "Gdot", "Ģ": "Gcedil", "𝔥": "hfr", "ℎ": "planckh", "𝒽": "hscr", "𝕙": "hopf", "ℋ": "Hscr", "ℌ": "Hfr", "ℍ": "Hopf", "ĥ": "hcirc", "Ĥ": "Hcirc", "ℏ": "hbar", "ħ": "hstrok", "Ħ": "Hstrok", "𝕚": "iopf", "𝔦": "ifr", "𝒾": "iscr", "ⅈ": "ii", "𝕀": "Iopf", "ℐ": "Iscr", "ℑ": "Im", "í": "iacute", "Í": "Iacute", "ì": "igrave", "Ì": "Igrave", "î": "icirc", "Î": "Icirc", "ï": "iuml", "Ï": "Iuml", "ĩ": "itilde", "Ĩ": "Itilde", "İ": "Idot", "į": "iogon", "Į": "Iogon", "ī": "imacr", "Ī": "Imacr", "ĳ": "ijlig", "Ĳ": "IJlig", "ı": "imath", "𝒿": "jscr", "𝕛": "jopf", "𝔧": "jfr", "𝒥": "Jscr", "𝔍": "Jfr", "𝕁": "Jopf", "ĵ": "jcirc", "Ĵ": "Jcirc", "ȷ": "jmath", "𝕜": "kopf", "𝓀": "kscr", "𝔨": "kfr", "𝒦": "Kscr", "𝕂": "Kopf", "𝔎": "Kfr", "ķ": "kcedil", "Ķ": "Kcedil", "𝔩": "lfr", "𝓁": "lscr", "ℓ": "ell", "𝕝": "lopf", "ℒ": "Lscr", "𝔏": "Lfr", "𝕃": "Lopf", "ĺ": "lacute", "Ĺ": "Lacute", "ľ": "lcaron", "Ľ": "Lcaron", "ļ": "lcedil", "Ļ": "Lcedil", "ł": "lstrok", "Ł": "Lstrok", "ŀ": "lmidot", "Ŀ": "Lmidot", "𝔪": "mfr", "𝕞": "mopf", "𝓂": "mscr", "𝔐": "Mfr", "𝕄": "Mopf", "ℳ": "Mscr", "𝔫": "nfr", "𝕟": "nopf", "𝓃": "nscr", "ℕ": "Nopf", "𝒩": "Nscr", "𝔑": "Nfr", "ń": "nacute", "Ń": "Nacute", "ň": "ncaron", "Ň": "Ncaron", "ñ": "ntilde", "Ñ": "Ntilde", "ņ": "ncedil", "Ņ": "Ncedil", "№": "numero", "ŋ": "eng", "Ŋ": "ENG", "𝕠": "oopf", "𝔬": "ofr", "ℴ": "oscr", "𝒪": "Oscr", "𝔒": "Ofr", "𝕆": "Oopf", "º": "ordm", "ó": "oacute", "Ó": "Oacute", "ò": "ograve", "Ò": "Ograve", "ô": "ocirc", "Ô": "Ocirc", "ö": "ouml", "Ö": "Ouml", "ő": "odblac", "Ő": "Odblac", "õ": "otilde", "Õ": "Otilde", "ø": "oslash", "Ø": "Oslash", "ō": "omacr", "Ō": "Omacr", "œ": "oelig", "Œ": "OElig", "𝔭": "pfr", "𝓅": "pscr", "𝕡": "popf", "ℙ": "Popf", "𝔓": "Pfr", "𝒫": "Pscr", "𝕢": "qopf", "𝔮": "qfr", "𝓆": "qscr", "𝒬": "Qscr", "𝔔": "Qfr", "ℚ": "Qopf", "ĸ": "kgreen", "𝔯": "rfr", "𝕣": "ropf", "𝓇": "rscr", "ℛ": "Rscr", "ℜ": "Re", "ℝ": "Ropf", "ŕ": "racute", "Ŕ": "Racute", "ř": "rcaron", "Ř": "Rcaron", "ŗ": "rcedil", "Ŗ": "Rcedil", "𝕤": "sopf", "𝓈": "sscr", "𝔰": "sfr", "𝕊": "Sopf", "𝔖": "Sfr", "𝒮": "Sscr", "Ⓢ": "oS", "ś": "sacute", "Ś": "Sacute", "ŝ": "scirc", "Ŝ": "Scirc", "š": "scaron", "Š": "Scaron", "ş": "scedil", "Ş": "Scedil", "ß": "szlig", "𝔱": "tfr", "𝓉": "tscr", "𝕥": "topf", "𝒯": "Tscr", "𝔗": "Tfr", "𝕋": "Topf", "ť": "tcaron", "Ť": "Tcaron", "ţ": "tcedil", "Ţ": "Tcedil", "™": "trade", "ŧ": "tstrok", "Ŧ": "Tstrok", "𝓊": "uscr", "𝕦": "uopf", "𝔲": "ufr", "𝕌": "Uopf", "𝔘": "Ufr", "𝒰": "Uscr", "ú": "uacute", "Ú": "Uacute", "ù": "ugrave", "Ù": "Ugrave", "ŭ": "ubreve", "Ŭ": "Ubreve", "û": "ucirc", "Û": "Ucirc", "ů": "uring", "Ů": "Uring", "ü": "uuml", "Ü": "Uuml", "ű": "udblac", "Ű": "Udblac", "ũ": "utilde", "Ũ": "Utilde", "ų": "uogon", "Ų": "Uogon", "ū": "umacr", "Ū": "Umacr", "𝔳": "vfr", "𝕧": "vopf", "𝓋": "vscr", "𝔙": "Vfr", "𝕍": "Vopf", "𝒱": "Vscr", "𝕨": "wopf", "𝓌": "wscr", "𝔴": "wfr", "𝒲": "Wscr", "𝕎": "Wopf", "𝔚": "Wfr", "ŵ": "wcirc", "Ŵ": "Wcirc", "𝔵": "xfr", "𝓍": "xscr", "𝕩": "xopf", "𝕏": "Xopf", "𝔛": "Xfr", "𝒳": "Xscr", "𝔶": "yfr", "𝓎": "yscr", "𝕪": "yopf", "𝒴": "Yscr", "𝔜": "Yfr", "𝕐": "Yopf", "ý": "yacute", "Ý": "Yacute", "ŷ": "ycirc", "Ŷ": "Ycirc", "ÿ": "yuml", "Ÿ": "Yuml", "𝓏": "zscr", "𝔷": "zfr", "𝕫": "zopf", "ℨ": "Zfr", "ℤ": "Zopf", "𝒵": "Zscr", "ź": "zacute", "Ź": "Zacute", "ž": "zcaron", "Ž": "Zcaron", "ż": "zdot", "Ż": "Zdot", "Ƶ": "imped", "þ": "thorn", "Þ": "THORN", "ŉ": "napos", "α": "alpha", "Α": "Alpha", "β": "beta", "Β": "Beta", "γ": "gamma", "Γ": "Gamma", "δ": "delta", "Δ": "Delta", "ε": "epsi", "ϵ": "epsiv", "Ε": "Epsilon", "ϝ": "gammad", "Ϝ": "Gammad", "ζ": "zeta", "Ζ": "Zeta", "η": "eta", "Η": "Eta", "θ": "theta", "ϑ": "thetav", "Θ": "Theta", "ι": "iota", "Ι": "Iota", "κ": "kappa", "ϰ": "kappav", "Κ": "Kappa", "λ": "lambda", "Λ": "Lambda", "μ": "mu", "µ": "micro", "Μ": "Mu", "ν": "nu", "Ν": "Nu", "ξ": "xi", "Ξ": "Xi", "ο": "omicron", "Ο": "Omicron", "π": "pi", "ϖ": "piv", "Π": "Pi", "ρ": "rho", "ϱ": "rhov", "Ρ": "Rho", "σ": "sigma", "Σ": "Sigma", "ς": "sigmaf", "τ": "tau", "Τ": "Tau", "υ": "upsi", "Υ": "Upsilon", "ϒ": "Upsi", "φ": "phi", "ϕ": "phiv", "Φ": "Phi", "χ": "chi", "Χ": "Chi", "ψ": "psi", "Ψ": "Psi", "ω": "omega", "Ω": "ohm", "а": "acy", "А": "Acy", "б": "bcy", "Б": "Bcy", "в": "vcy", "В": "Vcy", "г": "gcy", "Г": "Gcy", "ѓ": "gjcy", "Ѓ": "GJcy", "д": "dcy", "Д": "Dcy", "ђ": "djcy", "Ђ": "DJcy", "е": "iecy", "Е": "IEcy", "ё": "iocy", "Ё": "IOcy", "є": "jukcy", "Є": "Jukcy", "ж": "zhcy", "Ж": "ZHcy", "з": "zcy", "З": "Zcy", "ѕ": "dscy", "Ѕ": "DScy", "и": "icy", "И": "Icy", "і": "iukcy", "І": "Iukcy", "ї": "yicy", "Ї": "YIcy", "й": "jcy", "Й": "Jcy", "ј": "jsercy", "Ј": "Jsercy", "к": "kcy", "К": "Kcy", "ќ": "kjcy", "Ќ": "KJcy", "л": "lcy", "Л": "Lcy", "љ": "ljcy", "Љ": "LJcy", "м": "mcy", "М": "Mcy", "н": "ncy", "Н": "Ncy", "њ": "njcy", "Њ": "NJcy", "о": "ocy", "О": "Ocy", "п": "pcy", "П": "Pcy", "р": "rcy", "Р": "Rcy", "с": "scy", "С": "Scy", "т": "tcy", "Т": "Tcy", "ћ": "tshcy", "Ћ": "TSHcy", "у": "ucy", "У": "Ucy", "ў": "ubrcy", "Ў": "Ubrcy", "ф": "fcy", "Ф": "Fcy", "х": "khcy", "Х": "KHcy", "ц": "tscy", "Ц": "TScy", "ч": "chcy", "Ч": "CHcy", "џ": "dzcy", "Џ": "DZcy", "ш": "shcy", "Ш": "SHcy", "щ": "shchcy", "Щ": "SHCHcy", "ъ": "hardcy", "Ъ": "HARDcy", "ы": "ycy", "Ы": "Ycy", "ь": "softcy", "Ь": "SOFTcy", "э": "ecy", "Э": "Ecy", "ю": "yucy", "Ю": "YUcy", "я": "yacy", "Я": "YAcy", "ℵ": "aleph", "ℶ": "beth", "ℷ": "gimel", "ℸ": "daleth" };
    var regexEscape = /["&'<>`]/g;
    var escapeMap = {
      '"': "&quot;",
      "&": "&amp;",
      "'": "&#x27;",
      "<": "&lt;",
      // See https://mathiasbynens.be/notes/ambiguous-ampersands: in HTML, the
      // following is not strictly necessary unless it’s part of a tag or an
      // unquoted attribute value. We’re only escaping it to support those
      // situations, and for XML support.
      ">": "&gt;",
      // In Internet Explorer ≤ 8, the backtick character can be used
      // to break out of (un)quoted attribute values or HTML comments.
      // See http://html5sec.org/#102, http://html5sec.org/#108, and
      // http://html5sec.org/#133.
      "`": "&#x60;"
    };
    var regexInvalidEntity = /&#(?:[xX][^a-fA-F0-9]|[^0-9xX])/;
    var regexInvalidRawCodePoint = /[\0-\x08\x0B\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]|[\uD83F\uD87F\uD8BF\uD8FF\uD93F\uD97F\uD9BF\uD9FF\uDA3F\uDA7F\uDABF\uDAFF\uDB3F\uDB7F\uDBBF\uDBFF][\uDFFE\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
    var regexDecode = /&(CounterClockwiseContourIntegral|DoubleLongLeftRightArrow|ClockwiseContourIntegral|NotNestedGreaterGreater|NotSquareSupersetEqual|DiacriticalDoubleAcute|NotRightTriangleEqual|NotSucceedsSlantEqual|NotPrecedesSlantEqual|CloseCurlyDoubleQuote|NegativeVeryThinSpace|DoubleContourIntegral|FilledVerySmallSquare|CapitalDifferentialD|OpenCurlyDoubleQuote|EmptyVerySmallSquare|NestedGreaterGreater|DoubleLongRightArrow|NotLeftTriangleEqual|NotGreaterSlantEqual|ReverseUpEquilibrium|DoubleLeftRightArrow|NotSquareSubsetEqual|NotDoubleVerticalBar|RightArrowLeftArrow|NotGreaterFullEqual|NotRightTriangleBar|SquareSupersetEqual|DownLeftRightVector|DoubleLongLeftArrow|leftrightsquigarrow|LeftArrowRightArrow|NegativeMediumSpace|blacktriangleright|RightDownVectorBar|PrecedesSlantEqual|RightDoubleBracket|SucceedsSlantEqual|NotLeftTriangleBar|RightTriangleEqual|SquareIntersection|RightDownTeeVector|ReverseEquilibrium|NegativeThickSpace|longleftrightarrow|Longleftrightarrow|LongLeftRightArrow|DownRightTeeVector|DownRightVectorBar|GreaterSlantEqual|SquareSubsetEqual|LeftDownVectorBar|LeftDoubleBracket|VerticalSeparator|rightleftharpoons|NotGreaterGreater|NotSquareSuperset|blacktriangleleft|blacktriangledown|NegativeThinSpace|LeftDownTeeVector|NotLessSlantEqual|leftrightharpoons|DoubleUpDownArrow|DoubleVerticalBar|LeftTriangleEqual|FilledSmallSquare|twoheadrightarrow|NotNestedLessLess|DownLeftTeeVector|DownLeftVectorBar|RightAngleBracket|NotTildeFullEqual|NotReverseElement|RightUpDownVector|DiacriticalTilde|NotSucceedsTilde|circlearrowright|NotPrecedesEqual|rightharpoondown|DoubleRightArrow|NotSucceedsEqual|NonBreakingSpace|NotRightTriangle|LessEqualGreater|RightUpTeeVector|LeftAngleBracket|GreaterFullEqual|DownArrowUpArrow|RightUpVectorBar|twoheadleftarrow|GreaterEqualLess|downharpoonright|RightTriangleBar|ntrianglerighteq|NotSupersetEqual|LeftUpDownVector|DiacriticalAcute|rightrightarrows|vartriangleright|UpArrowDownArrow|DiacriticalGrave|UnderParenthesis|EmptySmallSquare|LeftUpVectorBar|leftrightarrows|DownRightVector|downharpoonleft|trianglerighteq|ShortRightArrow|OverParenthesis|DoubleLeftArrow|DoubleDownArrow|NotSquareSubset|bigtriangledown|ntrianglelefteq|UpperRightArrow|curvearrowright|vartriangleleft|NotLeftTriangle|nleftrightarrow|LowerRightArrow|NotHumpDownHump|NotGreaterTilde|rightthreetimes|LeftUpTeeVector|NotGreaterEqual|straightepsilon|LeftTriangleBar|rightsquigarrow|ContourIntegral|rightleftarrows|CloseCurlyQuote|RightDownVector|LeftRightVector|nLeftrightarrow|leftharpoondown|circlearrowleft|SquareSuperset|OpenCurlyQuote|hookrightarrow|HorizontalLine|DiacriticalDot|NotLessGreater|ntriangleright|DoubleRightTee|InvisibleComma|InvisibleTimes|LowerLeftArrow|DownLeftVector|NotSubsetEqual|curvearrowleft|trianglelefteq|NotVerticalBar|TildeFullEqual|downdownarrows|NotGreaterLess|RightTeeVector|ZeroWidthSpace|looparrowright|LongRightArrow|doublebarwedge|ShortLeftArrow|ShortDownArrow|RightVectorBar|GreaterGreater|ReverseElement|rightharpoonup|LessSlantEqual|leftthreetimes|upharpoonright|rightarrowtail|LeftDownVector|Longrightarrow|NestedLessLess|UpperLeftArrow|nshortparallel|leftleftarrows|leftrightarrow|Leftrightarrow|LeftRightArrow|longrightarrow|upharpoonleft|RightArrowBar|ApplyFunction|LeftTeeVector|leftarrowtail|NotEqualTilde|varsubsetneqq|varsupsetneqq|RightTeeArrow|SucceedsEqual|SucceedsTilde|LeftVectorBar|SupersetEqual|hookleftarrow|DifferentialD|VerticalTilde|VeryThinSpace|blacktriangle|bigtriangleup|LessFullEqual|divideontimes|leftharpoonup|UpEquilibrium|ntriangleleft|RightTriangle|measuredangle|shortparallel|longleftarrow|Longleftarrow|LongLeftArrow|DoubleLeftTee|Poincareplane|PrecedesEqual|triangleright|DoubleUpArrow|RightUpVector|fallingdotseq|looparrowleft|PrecedesTilde|NotTildeEqual|NotTildeTilde|smallsetminus|Proportional|triangleleft|triangledown|UnderBracket|NotHumpEqual|exponentiale|ExponentialE|NotLessTilde|HilbertSpace|RightCeiling|blacklozenge|varsupsetneq|HumpDownHump|GreaterEqual|VerticalLine|LeftTeeArrow|NotLessEqual|DownTeeArrow|LeftTriangle|varsubsetneq|Intersection|NotCongruent|DownArrowBar|LeftUpVector|LeftArrowBar|risingdotseq|GreaterTilde|RoundImplies|SquareSubset|ShortUpArrow|NotSuperset|quaternions|precnapprox|backepsilon|preccurlyeq|OverBracket|blacksquare|MediumSpace|VerticalBar|circledcirc|circleddash|CircleMinus|CircleTimes|LessGreater|curlyeqprec|curlyeqsucc|diamondsuit|UpDownArrow|Updownarrow|RuleDelayed|Rrightarrow|updownarrow|RightVector|nRightarrow|nrightarrow|eqslantless|LeftCeiling|Equilibrium|SmallCircle|expectation|NotSucceeds|thickapprox|GreaterLess|SquareUnion|NotPrecedes|NotLessLess|straightphi|succnapprox|succcurlyeq|SubsetEqual|sqsupseteq|Proportion|Laplacetrf|ImaginaryI|supsetneqq|NotGreater|gtreqqless|NotElement|ThickSpace|TildeEqual|TildeTilde|Fouriertrf|rmoustache|EqualTilde|eqslantgtr|UnderBrace|LeftVector|UpArrowBar|nLeftarrow|nsubseteqq|subsetneqq|nsupseteqq|nleftarrow|succapprox|lessapprox|UpTeeArrow|upuparrows|curlywedge|lesseqqgtr|varepsilon|varnothing|RightFloor|complement|CirclePlus|sqsubseteq|Lleftarrow|circledast|RightArrow|Rightarrow|rightarrow|lmoustache|Bernoullis|precapprox|mapstoleft|mapstodown|longmapsto|dotsquare|downarrow|DoubleDot|nsubseteq|supsetneq|leftarrow|nsupseteq|subsetneq|ThinSpace|ngeqslant|subseteqq|HumpEqual|NotSubset|triangleq|NotCupCap|lesseqgtr|heartsuit|TripleDot|Leftarrow|Coproduct|Congruent|varpropto|complexes|gvertneqq|LeftArrow|LessTilde|supseteqq|MinusPlus|CircleDot|nleqslant|NotExists|gtreqless|nparallel|UnionPlus|LeftFloor|checkmark|CenterDot|centerdot|Mellintrf|gtrapprox|bigotimes|OverBrace|spadesuit|therefore|pitchfork|rationals|PlusMinus|Backslash|Therefore|DownBreve|backsimeq|backprime|DownArrow|nshortmid|Downarrow|lvertneqq|eqvparsl|imagline|imagpart|infintie|integers|Integral|intercal|LessLess|Uarrocir|intlarhk|sqsupset|angmsdaf|sqsubset|llcorner|vartheta|cupbrcap|lnapprox|Superset|SuchThat|succnsim|succneqq|angmsdag|biguplus|curlyvee|trpezium|Succeeds|NotTilde|bigwedge|angmsdah|angrtvbd|triminus|cwconint|fpartint|lrcorner|smeparsl|subseteq|urcorner|lurdshar|laemptyv|DDotrahd|approxeq|ldrushar|awconint|mapstoup|backcong|shortmid|triangle|geqslant|gesdotol|timesbar|circledR|circledS|setminus|multimap|naturals|scpolint|ncongdot|RightTee|boxminus|gnapprox|boxtimes|andslope|thicksim|angmsdaa|varsigma|cirfnint|rtriltri|angmsdab|rppolint|angmsdac|barwedge|drbkarow|clubsuit|thetasym|bsolhsub|capbrcup|dzigrarr|doteqdot|DotEqual|dotminus|UnderBar|NotEqual|realpart|otimesas|ulcorner|hksearow|hkswarow|parallel|PartialD|elinters|emptyset|plusacir|bbrktbrk|angmsdad|pointint|bigoplus|angmsdae|Precedes|bigsqcup|varkappa|notindot|supseteq|precneqq|precnsim|profalar|profline|profsurf|leqslant|lesdotor|raemptyv|subplus|notnivb|notnivc|subrarr|zigrarr|vzigzag|submult|subedot|Element|between|cirscir|larrbfs|larrsim|lotimes|lbrksld|lbrkslu|lozenge|ldrdhar|dbkarow|bigcirc|epsilon|simrarr|simplus|ltquest|Epsilon|luruhar|gtquest|maltese|npolint|eqcolon|npreceq|bigodot|ddagger|gtrless|bnequiv|harrcir|ddotseq|equivDD|backsim|demptyv|nsqsube|nsqsupe|Upsilon|nsubset|upsilon|minusdu|nsucceq|swarrow|nsupset|coloneq|searrow|boxplus|napprox|natural|asympeq|alefsym|congdot|nearrow|bigstar|diamond|supplus|tritime|LeftTee|nvinfin|triplus|NewLine|nvltrie|nvrtrie|nwarrow|nexists|Diamond|ruluhar|Implies|supmult|angzarr|suplarr|suphsub|questeq|because|digamma|Because|olcross|bemptyv|omicron|Omicron|rotimes|NoBreak|intprod|angrtvb|orderof|uwangle|suphsol|lesdoto|orslope|DownTee|realine|cudarrl|rdldhar|OverBar|supedot|lessdot|supdsub|topfork|succsim|rbrkslu|rbrksld|pertenk|cudarrr|isindot|planckh|lessgtr|pluscir|gesdoto|plussim|plustwo|lesssim|cularrp|rarrsim|Cayleys|notinva|notinvb|notinvc|UpArrow|Uparrow|uparrow|NotLess|dwangle|precsim|Product|curarrm|Cconint|dotplus|rarrbfs|ccupssm|Cedilla|cemptyv|notniva|quatint|frac35|frac38|frac45|frac56|frac58|frac78|tridot|xoplus|gacute|gammad|Gammad|lfisht|lfloor|bigcup|sqsupe|gbreve|Gbreve|lharul|sqsube|sqcups|Gcedil|apacir|llhard|lmidot|Lmidot|lmoust|andand|sqcaps|approx|Abreve|spades|circeq|tprime|divide|topcir|Assign|topbot|gesdot|divonx|xuplus|timesd|gesles|atilde|solbar|SOFTcy|loplus|timesb|lowast|lowbar|dlcorn|dlcrop|softcy|dollar|lparlt|thksim|lrhard|Atilde|lsaquo|smashp|bigvee|thinsp|wreath|bkarow|lsquor|lstrok|Lstrok|lthree|ltimes|ltlarr|DotDot|simdot|ltrPar|weierp|xsqcup|angmsd|sigmav|sigmaf|zeetrf|Zcaron|zcaron|mapsto|vsupne|thetav|cirmid|marker|mcomma|Zacute|vsubnE|there4|gtlPar|vsubne|bottom|gtrarr|SHCHcy|shchcy|midast|midcir|middot|minusb|minusd|gtrdot|bowtie|sfrown|mnplus|models|colone|seswar|Colone|mstpos|searhk|gtrsim|nacute|Nacute|boxbox|telrec|hairsp|Tcedil|nbumpe|scnsim|ncaron|Ncaron|ncedil|Ncedil|hamilt|Scedil|nearhk|hardcy|HARDcy|tcedil|Tcaron|commat|nequiv|nesear|tcaron|target|hearts|nexist|varrho|scedil|Scaron|scaron|hellip|Sacute|sacute|hercon|swnwar|compfn|rtimes|rthree|rsquor|rsaquo|zacute|wedgeq|homtht|barvee|barwed|Barwed|rpargt|horbar|conint|swarhk|roplus|nltrie|hslash|hstrok|Hstrok|rmoust|Conint|bprime|hybull|hyphen|iacute|Iacute|supsup|supsub|supsim|varphi|coprod|brvbar|agrave|Supset|supset|igrave|Igrave|notinE|Agrave|iiiint|iinfin|copysr|wedbar|Verbar|vangrt|becaus|incare|verbar|inodot|bullet|drcorn|intcal|drcrop|cularr|vellip|Utilde|bumpeq|cupcap|dstrok|Dstrok|CupCap|cupcup|cupdot|eacute|Eacute|supdot|iquest|easter|ecaron|Ecaron|ecolon|isinsv|utilde|itilde|Itilde|curarr|succeq|Bumpeq|cacute|ulcrop|nparsl|Cacute|nprcue|egrave|Egrave|nrarrc|nrarrw|subsup|subsub|nrtrie|jsercy|nsccue|Jsercy|kappav|kcedil|Kcedil|subsim|ulcorn|nsimeq|egsdot|veebar|kgreen|capand|elsdot|Subset|subset|curren|aacute|lacute|Lacute|emptyv|ntilde|Ntilde|lagran|lambda|Lambda|capcap|Ugrave|langle|subdot|emsp13|numero|emsp14|nvdash|nvDash|nVdash|nVDash|ugrave|ufisht|nvHarr|larrfs|nvlArr|larrhk|larrlp|larrpl|nvrArr|Udblac|nwarhk|larrtl|nwnear|oacute|Oacute|latail|lAtail|sstarf|lbrace|odblac|Odblac|lbrack|udblac|odsold|eparsl|lcaron|Lcaron|ograve|Ograve|lcedil|Lcedil|Aacute|ssmile|ssetmn|squarf|ldquor|capcup|ominus|cylcty|rharul|eqcirc|dagger|rfloor|rfisht|Dagger|daleth|equals|origof|capdot|equest|dcaron|Dcaron|rdquor|oslash|Oslash|otilde|Otilde|otimes|Otimes|urcrop|Ubreve|ubreve|Yacute|Uacute|uacute|Rcedil|rcedil|urcorn|parsim|Rcaron|Vdashl|rcaron|Tstrok|percnt|period|permil|Exists|yacute|rbrack|rbrace|phmmat|ccaron|Ccaron|planck|ccedil|plankv|tstrok|female|plusdo|plusdu|ffilig|plusmn|ffllig|Ccedil|rAtail|dfisht|bernou|ratail|Rarrtl|rarrtl|angsph|rarrpl|rarrlp|rarrhk|xwedge|xotime|forall|ForAll|Vvdash|vsupnE|preceq|bigcap|frac12|frac13|frac14|primes|rarrfs|prnsim|frac15|Square|frac16|square|lesdot|frac18|frac23|propto|prurel|rarrap|rangle|puncsp|frac25|Racute|qprime|racute|lesges|frac34|abreve|AElig|eqsim|utdot|setmn|urtri|Equal|Uring|seArr|uring|searr|dashv|Dashv|mumap|nabla|iogon|Iogon|sdote|sdotb|scsim|napid|napos|equiv|natur|Acirc|dblac|erarr|nbump|iprod|erDot|ucirc|awint|esdot|angrt|ncong|isinE|scnap|Scirc|scirc|ndash|isins|Ubrcy|nearr|neArr|isinv|nedot|ubrcy|acute|Ycirc|iukcy|Iukcy|xutri|nesim|caret|jcirc|Jcirc|caron|twixt|ddarr|sccue|exist|jmath|sbquo|ngeqq|angst|ccaps|lceil|ngsim|UpTee|delta|Delta|rtrif|nharr|nhArr|nhpar|rtrie|jukcy|Jukcy|kappa|rsquo|Kappa|nlarr|nlArr|TSHcy|rrarr|aogon|Aogon|fflig|xrarr|tshcy|ccirc|nleqq|filig|upsih|nless|dharl|nlsim|fjlig|ropar|nltri|dharr|robrk|roarr|fllig|fltns|roang|rnmid|subnE|subne|lAarr|trisb|Ccirc|acirc|ccups|blank|VDash|forkv|Vdash|langd|cedil|blk12|blk14|laquo|strns|diams|notin|vDash|larrb|blk34|block|disin|uplus|vdash|vBarv|aelig|starf|Wedge|check|xrArr|lates|lbarr|lBarr|notni|lbbrk|bcong|frasl|lbrke|frown|vrtri|vprop|vnsup|gamma|Gamma|wedge|xodot|bdquo|srarr|doteq|ldquo|boxdl|boxdL|gcirc|Gcirc|boxDl|boxDL|boxdr|boxdR|boxDr|TRADE|trade|rlhar|boxDR|vnsub|npart|vltri|rlarr|boxhd|boxhD|nprec|gescc|nrarr|nrArr|boxHd|boxHD|boxhu|boxhU|nrtri|boxHu|clubs|boxHU|times|colon|Colon|gimel|xlArr|Tilde|nsime|tilde|nsmid|nspar|THORN|thorn|xlarr|nsube|nsubE|thkap|xhArr|comma|nsucc|boxul|boxuL|nsupe|nsupE|gneqq|gnsim|boxUl|boxUL|grave|boxur|boxuR|boxUr|boxUR|lescc|angle|bepsi|boxvh|varpi|boxvH|numsp|Theta|gsime|gsiml|theta|boxVh|boxVH|boxvl|gtcir|gtdot|boxvL|boxVl|boxVL|crarr|cross|Cross|nvsim|boxvr|nwarr|nwArr|sqsup|dtdot|Uogon|lhard|lharu|dtrif|ocirc|Ocirc|lhblk|duarr|odash|sqsub|Hacek|sqcup|llarr|duhar|oelig|OElig|ofcir|boxvR|uogon|lltri|boxVr|csube|uuarr|ohbar|csupe|ctdot|olarr|olcir|harrw|oline|sqcap|omacr|Omacr|omega|Omega|boxVR|aleph|lneqq|lnsim|loang|loarr|rharu|lobrk|hcirc|operp|oplus|rhard|Hcirc|orarr|Union|order|ecirc|Ecirc|cuepr|szlig|cuesc|breve|reals|eDDot|Breve|hoarr|lopar|utrif|rdquo|Umacr|umacr|efDot|swArr|ultri|alpha|rceil|ovbar|swarr|Wcirc|wcirc|smtes|smile|bsemi|lrarr|aring|parsl|lrhar|bsime|uhblk|lrtri|cupor|Aring|uharr|uharl|slarr|rbrke|bsolb|lsime|rbbrk|RBarr|lsimg|phone|rBarr|rbarr|icirc|lsquo|Icirc|emacr|Emacr|ratio|simne|plusb|simlE|simgE|simeq|pluse|ltcir|ltdot|empty|xharr|xdtri|iexcl|Alpha|ltrie|rarrw|pound|ltrif|xcirc|bumpe|prcue|bumpE|asymp|amacr|cuvee|Sigma|sigma|iiint|udhar|iiota|ijlig|IJlig|supnE|imacr|Imacr|prime|Prime|image|prnap|eogon|Eogon|rarrc|mdash|mDDot|cuwed|imath|supne|imped|Amacr|udarr|prsim|micro|rarrb|cwint|raquo|infin|eplus|range|rangd|Ucirc|radic|minus|amalg|veeeq|rAarr|epsiv|ycirc|quest|sharp|quot|zwnj|Qscr|race|qscr|Qopf|qopf|qint|rang|Rang|Zscr|zscr|Zopf|zopf|rarr|rArr|Rarr|Pscr|pscr|prop|prod|prnE|prec|ZHcy|zhcy|prap|Zeta|zeta|Popf|popf|Zdot|plus|zdot|Yuml|yuml|phiv|YUcy|yucy|Yscr|yscr|perp|Yopf|yopf|part|para|YIcy|Ouml|rcub|yicy|YAcy|rdca|ouml|osol|Oscr|rdsh|yacy|real|oscr|xvee|andd|rect|andv|Xscr|oror|ordm|ordf|xscr|ange|aopf|Aopf|rHar|Xopf|opar|Oopf|xopf|xnis|rhov|oopf|omid|xmap|oint|apid|apos|ogon|ascr|Ascr|odot|odiv|xcup|xcap|ocir|oast|nvlt|nvle|nvgt|nvge|nvap|Wscr|wscr|auml|ntlg|ntgl|nsup|nsub|nsim|Nscr|nscr|nsce|Wopf|ring|npre|wopf|npar|Auml|Barv|bbrk|Nopf|nopf|nmid|nLtv|beta|ropf|Ropf|Beta|beth|nles|rpar|nleq|bnot|bNot|nldr|NJcy|rscr|Rscr|Vscr|vscr|rsqb|njcy|bopf|nisd|Bopf|rtri|Vopf|nGtv|ngtr|vopf|boxh|boxH|boxv|nges|ngeq|boxV|bscr|scap|Bscr|bsim|Vert|vert|bsol|bull|bump|caps|cdot|ncup|scnE|ncap|nbsp|napE|Cdot|cent|sdot|Vbar|nang|vBar|chcy|Mscr|mscr|sect|semi|CHcy|Mopf|mopf|sext|circ|cire|mldr|mlcp|cirE|comp|shcy|SHcy|vArr|varr|cong|copf|Copf|copy|COPY|malt|male|macr|lvnE|cscr|ltri|sime|ltcc|simg|Cscr|siml|csub|Uuml|lsqb|lsim|uuml|csup|Lscr|lscr|utri|smid|lpar|cups|smte|lozf|darr|Lopf|Uscr|solb|lopf|sopf|Sopf|lneq|uscr|spar|dArr|lnap|Darr|dash|Sqrt|LJcy|ljcy|lHar|dHar|Upsi|upsi|diam|lesg|djcy|DJcy|leqq|dopf|Dopf|dscr|Dscr|dscy|ldsh|ldca|squf|DScy|sscr|Sscr|dsol|lcub|late|star|Star|Uopf|Larr|lArr|larr|uopf|dtri|dzcy|sube|subE|Lang|lang|Kscr|kscr|Kopf|kopf|KJcy|kjcy|KHcy|khcy|DZcy|ecir|edot|eDot|Jscr|jscr|succ|Jopf|jopf|Edot|uHar|emsp|ensp|Iuml|iuml|eopf|isin|Iscr|iscr|Eopf|epar|sung|epsi|escr|sup1|sup2|sup3|Iota|iota|supe|supE|Iopf|iopf|IOcy|iocy|Escr|esim|Esim|imof|Uarr|QUOT|uArr|uarr|euml|IEcy|iecy|Idot|Euml|euro|excl|Hscr|hscr|Hopf|hopf|TScy|tscy|Tscr|hbar|tscr|flat|tbrk|fnof|hArr|harr|half|fopf|Fopf|tdot|gvnE|fork|trie|gtcc|fscr|Fscr|gdot|gsim|Gscr|gscr|Gopf|gopf|gneq|Gdot|tosa|gnap|Topf|topf|geqq|toea|GJcy|gjcy|tint|gesl|mid|Sfr|ggg|top|ges|gla|glE|glj|geq|gne|gEl|gel|gnE|Gcy|gcy|gap|Tfr|tfr|Tcy|tcy|Hat|Tau|Ffr|tau|Tab|hfr|Hfr|ffr|Fcy|fcy|icy|Icy|iff|ETH|eth|ifr|Ifr|Eta|eta|int|Int|Sup|sup|ucy|Ucy|Sum|sum|jcy|ENG|ufr|Ufr|eng|Jcy|jfr|els|ell|egs|Efr|efr|Jfr|uml|kcy|Kcy|Ecy|ecy|kfr|Kfr|lap|Sub|sub|lat|lcy|Lcy|leg|Dot|dot|lEg|leq|les|squ|div|die|lfr|Lfr|lgE|Dfr|dfr|Del|deg|Dcy|dcy|lne|lnE|sol|loz|smt|Cup|lrm|cup|lsh|Lsh|sim|shy|map|Map|mcy|Mcy|mfr|Mfr|mho|gfr|Gfr|sfr|cir|Chi|chi|nap|Cfr|vcy|Vcy|cfr|Scy|scy|ncy|Ncy|vee|Vee|Cap|cap|nfr|scE|sce|Nfr|nge|ngE|nGg|vfr|Vfr|ngt|bot|nGt|nis|niv|Rsh|rsh|nle|nlE|bne|Bfr|bfr|nLl|nlt|nLt|Bcy|bcy|not|Not|rlm|wfr|Wfr|npr|nsc|num|ocy|ast|Ocy|ofr|xfr|Xfr|Ofr|ogt|ohm|apE|olt|Rho|ape|rho|Rfr|rfr|ord|REG|ang|reg|orv|And|and|AMP|Rcy|amp|Afr|ycy|Ycy|yen|yfr|Yfr|rcy|par|pcy|Pcy|pfr|Pfr|phi|Phi|afr|Acy|acy|zcy|Zcy|piv|acE|acd|zfr|Zfr|pre|prE|psi|Psi|qfr|Qfr|zwj|Or|ge|Gg|gt|gg|el|oS|lt|Lt|LT|Re|lg|gl|eg|ne|Im|it|le|DD|wp|wr|nu|Nu|dd|lE|Sc|sc|pi|Pi|ee|af|ll|Ll|rx|gE|xi|pm|Xi|ic|pr|Pr|in|ni|mp|mu|ac|Mu|or|ap|Gt|GT|ii);|&(Aacute|Agrave|Atilde|Ccedil|Eacute|Egrave|Iacute|Igrave|Ntilde|Oacute|Ograve|Oslash|Otilde|Uacute|Ugrave|Yacute|aacute|agrave|atilde|brvbar|ccedil|curren|divide|eacute|egrave|frac12|frac14|frac34|iacute|igrave|iquest|middot|ntilde|oacute|ograve|oslash|otilde|plusmn|uacute|ugrave|yacute|AElig|Acirc|Aring|Ecirc|Icirc|Ocirc|THORN|Ucirc|acirc|acute|aelig|aring|cedil|ecirc|icirc|iexcl|laquo|micro|ocirc|pound|raquo|szlig|thorn|times|ucirc|Auml|COPY|Euml|Iuml|Ouml|QUOT|Uuml|auml|cent|copy|euml|iuml|macr|nbsp|ordf|ordm|ouml|para|quot|sect|sup1|sup2|sup3|uuml|yuml|AMP|ETH|REG|amp|deg|eth|not|reg|shy|uml|yen|GT|LT|gt|lt)(?!;)([=a-zA-Z0-9]?)|&#([0-9]+)(;?)|&#[xX]([a-fA-F0-9]+)(;?)|&([0-9a-zA-Z]+)/g;
    var decodeMap = { "aacute": "á", "Aacute": "Á", "abreve": "ă", "Abreve": "Ă", "ac": "∾", "acd": "∿", "acE": "∾̳", "acirc": "â", "Acirc": "Â", "acute": "´", "acy": "а", "Acy": "А", "aelig": "æ", "AElig": "Æ", "af": "⁡", "afr": "𝔞", "Afr": "𝔄", "agrave": "à", "Agrave": "À", "alefsym": "ℵ", "aleph": "ℵ", "alpha": "α", "Alpha": "Α", "amacr": "ā", "Amacr": "Ā", "amalg": "⨿", "amp": "&", "AMP": "&", "and": "∧", "And": "⩓", "andand": "⩕", "andd": "⩜", "andslope": "⩘", "andv": "⩚", "ang": "∠", "ange": "⦤", "angle": "∠", "angmsd": "∡", "angmsdaa": "⦨", "angmsdab": "⦩", "angmsdac": "⦪", "angmsdad": "⦫", "angmsdae": "⦬", "angmsdaf": "⦭", "angmsdag": "⦮", "angmsdah": "⦯", "angrt": "∟", "angrtvb": "⊾", "angrtvbd": "⦝", "angsph": "∢", "angst": "Å", "angzarr": "⍼", "aogon": "ą", "Aogon": "Ą", "aopf": "𝕒", "Aopf": "𝔸", "ap": "≈", "apacir": "⩯", "ape": "≊", "apE": "⩰", "apid": "≋", "apos": "'", "ApplyFunction": "⁡", "approx": "≈", "approxeq": "≊", "aring": "å", "Aring": "Å", "ascr": "𝒶", "Ascr": "𝒜", "Assign": "≔", "ast": "*", "asymp": "≈", "asympeq": "≍", "atilde": "ã", "Atilde": "Ã", "auml": "ä", "Auml": "Ä", "awconint": "∳", "awint": "⨑", "backcong": "≌", "backepsilon": "϶", "backprime": "‵", "backsim": "∽", "backsimeq": "⋍", "Backslash": "∖", "Barv": "⫧", "barvee": "⊽", "barwed": "⌅", "Barwed": "⌆", "barwedge": "⌅", "bbrk": "⎵", "bbrktbrk": "⎶", "bcong": "≌", "bcy": "б", "Bcy": "Б", "bdquo": "„", "becaus": "∵", "because": "∵", "Because": "∵", "bemptyv": "⦰", "bepsi": "϶", "bernou": "ℬ", "Bernoullis": "ℬ", "beta": "β", "Beta": "Β", "beth": "ℶ", "between": "≬", "bfr": "𝔟", "Bfr": "𝔅", "bigcap": "⋂", "bigcirc": "◯", "bigcup": "⋃", "bigodot": "⨀", "bigoplus": "⨁", "bigotimes": "⨂", "bigsqcup": "⨆", "bigstar": "★", "bigtriangledown": "▽", "bigtriangleup": "△", "biguplus": "⨄", "bigvee": "⋁", "bigwedge": "⋀", "bkarow": "⤍", "blacklozenge": "⧫", "blacksquare": "▪", "blacktriangle": "▴", "blacktriangledown": "▾", "blacktriangleleft": "◂", "blacktriangleright": "▸", "blank": "␣", "blk12": "▒", "blk14": "░", "blk34": "▓", "block": "█", "bne": "=⃥", "bnequiv": "≡⃥", "bnot": "⌐", "bNot": "⫭", "bopf": "𝕓", "Bopf": "𝔹", "bot": "⊥", "bottom": "⊥", "bowtie": "⋈", "boxbox": "⧉", "boxdl": "┐", "boxdL": "╕", "boxDl": "╖", "boxDL": "╗", "boxdr": "┌", "boxdR": "╒", "boxDr": "╓", "boxDR": "╔", "boxh": "─", "boxH": "═", "boxhd": "┬", "boxhD": "╥", "boxHd": "╤", "boxHD": "╦", "boxhu": "┴", "boxhU": "╨", "boxHu": "╧", "boxHU": "╩", "boxminus": "⊟", "boxplus": "⊞", "boxtimes": "⊠", "boxul": "┘", "boxuL": "╛", "boxUl": "╜", "boxUL": "╝", "boxur": "└", "boxuR": "╘", "boxUr": "╙", "boxUR": "╚", "boxv": "│", "boxV": "║", "boxvh": "┼", "boxvH": "╪", "boxVh": "╫", "boxVH": "╬", "boxvl": "┤", "boxvL": "╡", "boxVl": "╢", "boxVL": "╣", "boxvr": "├", "boxvR": "╞", "boxVr": "╟", "boxVR": "╠", "bprime": "‵", "breve": "˘", "Breve": "˘", "brvbar": "¦", "bscr": "𝒷", "Bscr": "ℬ", "bsemi": "⁏", "bsim": "∽", "bsime": "⋍", "bsol": "\\", "bsolb": "⧅", "bsolhsub": "⟈", "bull": "•", "bullet": "•", "bump": "≎", "bumpe": "≏", "bumpE": "⪮", "bumpeq": "≏", "Bumpeq": "≎", "cacute": "ć", "Cacute": "Ć", "cap": "∩", "Cap": "⋒", "capand": "⩄", "capbrcup": "⩉", "capcap": "⩋", "capcup": "⩇", "capdot": "⩀", "CapitalDifferentialD": "ⅅ", "caps": "∩︀", "caret": "⁁", "caron": "ˇ", "Cayleys": "ℭ", "ccaps": "⩍", "ccaron": "č", "Ccaron": "Č", "ccedil": "ç", "Ccedil": "Ç", "ccirc": "ĉ", "Ccirc": "Ĉ", "Cconint": "∰", "ccups": "⩌", "ccupssm": "⩐", "cdot": "ċ", "Cdot": "Ċ", "cedil": "¸", "Cedilla": "¸", "cemptyv": "⦲", "cent": "¢", "centerdot": "·", "CenterDot": "·", "cfr": "𝔠", "Cfr": "ℭ", "chcy": "ч", "CHcy": "Ч", "check": "✓", "checkmark": "✓", "chi": "χ", "Chi": "Χ", "cir": "○", "circ": "ˆ", "circeq": "≗", "circlearrowleft": "↺", "circlearrowright": "↻", "circledast": "⊛", "circledcirc": "⊚", "circleddash": "⊝", "CircleDot": "⊙", "circledR": "®", "circledS": "Ⓢ", "CircleMinus": "⊖", "CirclePlus": "⊕", "CircleTimes": "⊗", "cire": "≗", "cirE": "⧃", "cirfnint": "⨐", "cirmid": "⫯", "cirscir": "⧂", "ClockwiseContourIntegral": "∲", "CloseCurlyDoubleQuote": "”", "CloseCurlyQuote": "’", "clubs": "♣", "clubsuit": "♣", "colon": ":", "Colon": "∷", "colone": "≔", "Colone": "⩴", "coloneq": "≔", "comma": ",", "commat": "@", "comp": "∁", "compfn": "∘", "complement": "∁", "complexes": "ℂ", "cong": "≅", "congdot": "⩭", "Congruent": "≡", "conint": "∮", "Conint": "∯", "ContourIntegral": "∮", "copf": "𝕔", "Copf": "ℂ", "coprod": "∐", "Coproduct": "∐", "copy": "©", "COPY": "©", "copysr": "℗", "CounterClockwiseContourIntegral": "∳", "crarr": "↵", "cross": "✗", "Cross": "⨯", "cscr": "𝒸", "Cscr": "𝒞", "csub": "⫏", "csube": "⫑", "csup": "⫐", "csupe": "⫒", "ctdot": "⋯", "cudarrl": "⤸", "cudarrr": "⤵", "cuepr": "⋞", "cuesc": "⋟", "cularr": "↶", "cularrp": "⤽", "cup": "∪", "Cup": "⋓", "cupbrcap": "⩈", "cupcap": "⩆", "CupCap": "≍", "cupcup": "⩊", "cupdot": "⊍", "cupor": "⩅", "cups": "∪︀", "curarr": "↷", "curarrm": "⤼", "curlyeqprec": "⋞", "curlyeqsucc": "⋟", "curlyvee": "⋎", "curlywedge": "⋏", "curren": "¤", "curvearrowleft": "↶", "curvearrowright": "↷", "cuvee": "⋎", "cuwed": "⋏", "cwconint": "∲", "cwint": "∱", "cylcty": "⌭", "dagger": "†", "Dagger": "‡", "daleth": "ℸ", "darr": "↓", "dArr": "⇓", "Darr": "↡", "dash": "‐", "dashv": "⊣", "Dashv": "⫤", "dbkarow": "⤏", "dblac": "˝", "dcaron": "ď", "Dcaron": "Ď", "dcy": "д", "Dcy": "Д", "dd": "ⅆ", "DD": "ⅅ", "ddagger": "‡", "ddarr": "⇊", "DDotrahd": "⤑", "ddotseq": "⩷", "deg": "°", "Del": "∇", "delta": "δ", "Delta": "Δ", "demptyv": "⦱", "dfisht": "⥿", "dfr": "𝔡", "Dfr": "𝔇", "dHar": "⥥", "dharl": "⇃", "dharr": "⇂", "DiacriticalAcute": "´", "DiacriticalDot": "˙", "DiacriticalDoubleAcute": "˝", "DiacriticalGrave": "`", "DiacriticalTilde": "˜", "diam": "⋄", "diamond": "⋄", "Diamond": "⋄", "diamondsuit": "♦", "diams": "♦", "die": "¨", "DifferentialD": "ⅆ", "digamma": "ϝ", "disin": "⋲", "div": "÷", "divide": "÷", "divideontimes": "⋇", "divonx": "⋇", "djcy": "ђ", "DJcy": "Ђ", "dlcorn": "⌞", "dlcrop": "⌍", "dollar": "$", "dopf": "𝕕", "Dopf": "𝔻", "dot": "˙", "Dot": "¨", "DotDot": "⃜", "doteq": "≐", "doteqdot": "≑", "DotEqual": "≐", "dotminus": "∸", "dotplus": "∔", "dotsquare": "⊡", "doublebarwedge": "⌆", "DoubleContourIntegral": "∯", "DoubleDot": "¨", "DoubleDownArrow": "⇓", "DoubleLeftArrow": "⇐", "DoubleLeftRightArrow": "⇔", "DoubleLeftTee": "⫤", "DoubleLongLeftArrow": "⟸", "DoubleLongLeftRightArrow": "⟺", "DoubleLongRightArrow": "⟹", "DoubleRightArrow": "⇒", "DoubleRightTee": "⊨", "DoubleUpArrow": "⇑", "DoubleUpDownArrow": "⇕", "DoubleVerticalBar": "∥", "downarrow": "↓", "Downarrow": "⇓", "DownArrow": "↓", "DownArrowBar": "⤓", "DownArrowUpArrow": "⇵", "DownBreve": "̑", "downdownarrows": "⇊", "downharpoonleft": "⇃", "downharpoonright": "⇂", "DownLeftRightVector": "⥐", "DownLeftTeeVector": "⥞", "DownLeftVector": "↽", "DownLeftVectorBar": "⥖", "DownRightTeeVector": "⥟", "DownRightVector": "⇁", "DownRightVectorBar": "⥗", "DownTee": "⊤", "DownTeeArrow": "↧", "drbkarow": "⤐", "drcorn": "⌟", "drcrop": "⌌", "dscr": "𝒹", "Dscr": "𝒟", "dscy": "ѕ", "DScy": "Ѕ", "dsol": "⧶", "dstrok": "đ", "Dstrok": "Đ", "dtdot": "⋱", "dtri": "▿", "dtrif": "▾", "duarr": "⇵", "duhar": "⥯", "dwangle": "⦦", "dzcy": "џ", "DZcy": "Џ", "dzigrarr": "⟿", "eacute": "é", "Eacute": "É", "easter": "⩮", "ecaron": "ě", "Ecaron": "Ě", "ecir": "≖", "ecirc": "ê", "Ecirc": "Ê", "ecolon": "≕", "ecy": "э", "Ecy": "Э", "eDDot": "⩷", "edot": "ė", "eDot": "≑", "Edot": "Ė", "ee": "ⅇ", "efDot": "≒", "efr": "𝔢", "Efr": "𝔈", "eg": "⪚", "egrave": "è", "Egrave": "È", "egs": "⪖", "egsdot": "⪘", "el": "⪙", "Element": "∈", "elinters": "⏧", "ell": "ℓ", "els": "⪕", "elsdot": "⪗", "emacr": "ē", "Emacr": "Ē", "empty": "∅", "emptyset": "∅", "EmptySmallSquare": "◻", "emptyv": "∅", "EmptyVerySmallSquare": "▫", "emsp": " ", "emsp13": " ", "emsp14": " ", "eng": "ŋ", "ENG": "Ŋ", "ensp": " ", "eogon": "ę", "Eogon": "Ę", "eopf": "𝕖", "Eopf": "𝔼", "epar": "⋕", "eparsl": "⧣", "eplus": "⩱", "epsi": "ε", "epsilon": "ε", "Epsilon": "Ε", "epsiv": "ϵ", "eqcirc": "≖", "eqcolon": "≕", "eqsim": "≂", "eqslantgtr": "⪖", "eqslantless": "⪕", "Equal": "⩵", "equals": "=", "EqualTilde": "≂", "equest": "≟", "Equilibrium": "⇌", "equiv": "≡", "equivDD": "⩸", "eqvparsl": "⧥", "erarr": "⥱", "erDot": "≓", "escr": "ℯ", "Escr": "ℰ", "esdot": "≐", "esim": "≂", "Esim": "⩳", "eta": "η", "Eta": "Η", "eth": "ð", "ETH": "Ð", "euml": "ë", "Euml": "Ë", "euro": "€", "excl": "!", "exist": "∃", "Exists": "∃", "expectation": "ℰ", "exponentiale": "ⅇ", "ExponentialE": "ⅇ", "fallingdotseq": "≒", "fcy": "ф", "Fcy": "Ф", "female": "♀", "ffilig": "ﬃ", "fflig": "ﬀ", "ffllig": "ﬄ", "ffr": "𝔣", "Ffr": "𝔉", "filig": "ﬁ", "FilledSmallSquare": "◼", "FilledVerySmallSquare": "▪", "fjlig": "fj", "flat": "♭", "fllig": "ﬂ", "fltns": "▱", "fnof": "ƒ", "fopf": "𝕗", "Fopf": "𝔽", "forall": "∀", "ForAll": "∀", "fork": "⋔", "forkv": "⫙", "Fouriertrf": "ℱ", "fpartint": "⨍", "frac12": "½", "frac13": "⅓", "frac14": "¼", "frac15": "⅕", "frac16": "⅙", "frac18": "⅛", "frac23": "⅔", "frac25": "⅖", "frac34": "¾", "frac35": "⅗", "frac38": "⅜", "frac45": "⅘", "frac56": "⅚", "frac58": "⅝", "frac78": "⅞", "frasl": "⁄", "frown": "⌢", "fscr": "𝒻", "Fscr": "ℱ", "gacute": "ǵ", "gamma": "γ", "Gamma": "Γ", "gammad": "ϝ", "Gammad": "Ϝ", "gap": "⪆", "gbreve": "ğ", "Gbreve": "Ğ", "Gcedil": "Ģ", "gcirc": "ĝ", "Gcirc": "Ĝ", "gcy": "г", "Gcy": "Г", "gdot": "ġ", "Gdot": "Ġ", "ge": "≥", "gE": "≧", "gel": "⋛", "gEl": "⪌", "geq": "≥", "geqq": "≧", "geqslant": "⩾", "ges": "⩾", "gescc": "⪩", "gesdot": "⪀", "gesdoto": "⪂", "gesdotol": "⪄", "gesl": "⋛︀", "gesles": "⪔", "gfr": "𝔤", "Gfr": "𝔊", "gg": "≫", "Gg": "⋙", "ggg": "⋙", "gimel": "ℷ", "gjcy": "ѓ", "GJcy": "Ѓ", "gl": "≷", "gla": "⪥", "glE": "⪒", "glj": "⪤", "gnap": "⪊", "gnapprox": "⪊", "gne": "⪈", "gnE": "≩", "gneq": "⪈", "gneqq": "≩", "gnsim": "⋧", "gopf": "𝕘", "Gopf": "𝔾", "grave": "`", "GreaterEqual": "≥", "GreaterEqualLess": "⋛", "GreaterFullEqual": "≧", "GreaterGreater": "⪢", "GreaterLess": "≷", "GreaterSlantEqual": "⩾", "GreaterTilde": "≳", "gscr": "ℊ", "Gscr": "𝒢", "gsim": "≳", "gsime": "⪎", "gsiml": "⪐", "gt": ">", "Gt": "≫", "GT": ">", "gtcc": "⪧", "gtcir": "⩺", "gtdot": "⋗", "gtlPar": "⦕", "gtquest": "⩼", "gtrapprox": "⪆", "gtrarr": "⥸", "gtrdot": "⋗", "gtreqless": "⋛", "gtreqqless": "⪌", "gtrless": "≷", "gtrsim": "≳", "gvertneqq": "≩︀", "gvnE": "≩︀", "Hacek": "ˇ", "hairsp": " ", "half": "½", "hamilt": "ℋ", "hardcy": "ъ", "HARDcy": "Ъ", "harr": "↔", "hArr": "⇔", "harrcir": "⥈", "harrw": "↭", "Hat": "^", "hbar": "ℏ", "hcirc": "ĥ", "Hcirc": "Ĥ", "hearts": "♥", "heartsuit": "♥", "hellip": "…", "hercon": "⊹", "hfr": "𝔥", "Hfr": "ℌ", "HilbertSpace": "ℋ", "hksearow": "⤥", "hkswarow": "⤦", "hoarr": "⇿", "homtht": "∻", "hookleftarrow": "↩", "hookrightarrow": "↪", "hopf": "𝕙", "Hopf": "ℍ", "horbar": "―", "HorizontalLine": "─", "hscr": "𝒽", "Hscr": "ℋ", "hslash": "ℏ", "hstrok": "ħ", "Hstrok": "Ħ", "HumpDownHump": "≎", "HumpEqual": "≏", "hybull": "⁃", "hyphen": "‐", "iacute": "í", "Iacute": "Í", "ic": "⁣", "icirc": "î", "Icirc": "Î", "icy": "и", "Icy": "И", "Idot": "İ", "iecy": "е", "IEcy": "Е", "iexcl": "¡", "iff": "⇔", "ifr": "𝔦", "Ifr": "ℑ", "igrave": "ì", "Igrave": "Ì", "ii": "ⅈ", "iiiint": "⨌", "iiint": "∭", "iinfin": "⧜", "iiota": "℩", "ijlig": "ĳ", "IJlig": "Ĳ", "Im": "ℑ", "imacr": "ī", "Imacr": "Ī", "image": "ℑ", "ImaginaryI": "ⅈ", "imagline": "ℐ", "imagpart": "ℑ", "imath": "ı", "imof": "⊷", "imped": "Ƶ", "Implies": "⇒", "in": "∈", "incare": "℅", "infin": "∞", "infintie": "⧝", "inodot": "ı", "int": "∫", "Int": "∬", "intcal": "⊺", "integers": "ℤ", "Integral": "∫", "intercal": "⊺", "Intersection": "⋂", "intlarhk": "⨗", "intprod": "⨼", "InvisibleComma": "⁣", "InvisibleTimes": "⁢", "iocy": "ё", "IOcy": "Ё", "iogon": "į", "Iogon": "Į", "iopf": "𝕚", "Iopf": "𝕀", "iota": "ι", "Iota": "Ι", "iprod": "⨼", "iquest": "¿", "iscr": "𝒾", "Iscr": "ℐ", "isin": "∈", "isindot": "⋵", "isinE": "⋹", "isins": "⋴", "isinsv": "⋳", "isinv": "∈", "it": "⁢", "itilde": "ĩ", "Itilde": "Ĩ", "iukcy": "і", "Iukcy": "І", "iuml": "ï", "Iuml": "Ï", "jcirc": "ĵ", "Jcirc": "Ĵ", "jcy": "й", "Jcy": "Й", "jfr": "𝔧", "Jfr": "𝔍", "jmath": "ȷ", "jopf": "𝕛", "Jopf": "𝕁", "jscr": "𝒿", "Jscr": "𝒥", "jsercy": "ј", "Jsercy": "Ј", "jukcy": "є", "Jukcy": "Є", "kappa": "κ", "Kappa": "Κ", "kappav": "ϰ", "kcedil": "ķ", "Kcedil": "Ķ", "kcy": "к", "Kcy": "К", "kfr": "𝔨", "Kfr": "𝔎", "kgreen": "ĸ", "khcy": "х", "KHcy": "Х", "kjcy": "ќ", "KJcy": "Ќ", "kopf": "𝕜", "Kopf": "𝕂", "kscr": "𝓀", "Kscr": "𝒦", "lAarr": "⇚", "lacute": "ĺ", "Lacute": "Ĺ", "laemptyv": "⦴", "lagran": "ℒ", "lambda": "λ", "Lambda": "Λ", "lang": "⟨", "Lang": "⟪", "langd": "⦑", "langle": "⟨", "lap": "⪅", "Laplacetrf": "ℒ", "laquo": "«", "larr": "←", "lArr": "⇐", "Larr": "↞", "larrb": "⇤", "larrbfs": "⤟", "larrfs": "⤝", "larrhk": "↩", "larrlp": "↫", "larrpl": "⤹", "larrsim": "⥳", "larrtl": "↢", "lat": "⪫", "latail": "⤙", "lAtail": "⤛", "late": "⪭", "lates": "⪭︀", "lbarr": "⤌", "lBarr": "⤎", "lbbrk": "❲", "lbrace": "{", "lbrack": "[", "lbrke": "⦋", "lbrksld": "⦏", "lbrkslu": "⦍", "lcaron": "ľ", "Lcaron": "Ľ", "lcedil": "ļ", "Lcedil": "Ļ", "lceil": "⌈", "lcub": "{", "lcy": "л", "Lcy": "Л", "ldca": "⤶", "ldquo": "“", "ldquor": "„", "ldrdhar": "⥧", "ldrushar": "⥋", "ldsh": "↲", "le": "≤", "lE": "≦", "LeftAngleBracket": "⟨", "leftarrow": "←", "Leftarrow": "⇐", "LeftArrow": "←", "LeftArrowBar": "⇤", "LeftArrowRightArrow": "⇆", "leftarrowtail": "↢", "LeftCeiling": "⌈", "LeftDoubleBracket": "⟦", "LeftDownTeeVector": "⥡", "LeftDownVector": "⇃", "LeftDownVectorBar": "⥙", "LeftFloor": "⌊", "leftharpoondown": "↽", "leftharpoonup": "↼", "leftleftarrows": "⇇", "leftrightarrow": "↔", "Leftrightarrow": "⇔", "LeftRightArrow": "↔", "leftrightarrows": "⇆", "leftrightharpoons": "⇋", "leftrightsquigarrow": "↭", "LeftRightVector": "⥎", "LeftTee": "⊣", "LeftTeeArrow": "↤", "LeftTeeVector": "⥚", "leftthreetimes": "⋋", "LeftTriangle": "⊲", "LeftTriangleBar": "⧏", "LeftTriangleEqual": "⊴", "LeftUpDownVector": "⥑", "LeftUpTeeVector": "⥠", "LeftUpVector": "↿", "LeftUpVectorBar": "⥘", "LeftVector": "↼", "LeftVectorBar": "⥒", "leg": "⋚", "lEg": "⪋", "leq": "≤", "leqq": "≦", "leqslant": "⩽", "les": "⩽", "lescc": "⪨", "lesdot": "⩿", "lesdoto": "⪁", "lesdotor": "⪃", "lesg": "⋚︀", "lesges": "⪓", "lessapprox": "⪅", "lessdot": "⋖", "lesseqgtr": "⋚", "lesseqqgtr": "⪋", "LessEqualGreater": "⋚", "LessFullEqual": "≦", "LessGreater": "≶", "lessgtr": "≶", "LessLess": "⪡", "lesssim": "≲", "LessSlantEqual": "⩽", "LessTilde": "≲", "lfisht": "⥼", "lfloor": "⌊", "lfr": "𝔩", "Lfr": "𝔏", "lg": "≶", "lgE": "⪑", "lHar": "⥢", "lhard": "↽", "lharu": "↼", "lharul": "⥪", "lhblk": "▄", "ljcy": "љ", "LJcy": "Љ", "ll": "≪", "Ll": "⋘", "llarr": "⇇", "llcorner": "⌞", "Lleftarrow": "⇚", "llhard": "⥫", "lltri": "◺", "lmidot": "ŀ", "Lmidot": "Ŀ", "lmoust": "⎰", "lmoustache": "⎰", "lnap": "⪉", "lnapprox": "⪉", "lne": "⪇", "lnE": "≨", "lneq": "⪇", "lneqq": "≨", "lnsim": "⋦", "loang": "⟬", "loarr": "⇽", "lobrk": "⟦", "longleftarrow": "⟵", "Longleftarrow": "⟸", "LongLeftArrow": "⟵", "longleftrightarrow": "⟷", "Longleftrightarrow": "⟺", "LongLeftRightArrow": "⟷", "longmapsto": "⟼", "longrightarrow": "⟶", "Longrightarrow": "⟹", "LongRightArrow": "⟶", "looparrowleft": "↫", "looparrowright": "↬", "lopar": "⦅", "lopf": "𝕝", "Lopf": "𝕃", "loplus": "⨭", "lotimes": "⨴", "lowast": "∗", "lowbar": "_", "LowerLeftArrow": "↙", "LowerRightArrow": "↘", "loz": "◊", "lozenge": "◊", "lozf": "⧫", "lpar": "(", "lparlt": "⦓", "lrarr": "⇆", "lrcorner": "⌟", "lrhar": "⇋", "lrhard": "⥭", "lrm": "‎", "lrtri": "⊿", "lsaquo": "‹", "lscr": "𝓁", "Lscr": "ℒ", "lsh": "↰", "Lsh": "↰", "lsim": "≲", "lsime": "⪍", "lsimg": "⪏", "lsqb": "[", "lsquo": "‘", "lsquor": "‚", "lstrok": "ł", "Lstrok": "Ł", "lt": "<", "Lt": "≪", "LT": "<", "ltcc": "⪦", "ltcir": "⩹", "ltdot": "⋖", "lthree": "⋋", "ltimes": "⋉", "ltlarr": "⥶", "ltquest": "⩻", "ltri": "◃", "ltrie": "⊴", "ltrif": "◂", "ltrPar": "⦖", "lurdshar": "⥊", "luruhar": "⥦", "lvertneqq": "≨︀", "lvnE": "≨︀", "macr": "¯", "male": "♂", "malt": "✠", "maltese": "✠", "map": "↦", "Map": "⤅", "mapsto": "↦", "mapstodown": "↧", "mapstoleft": "↤", "mapstoup": "↥", "marker": "▮", "mcomma": "⨩", "mcy": "м", "Mcy": "М", "mdash": "—", "mDDot": "∺", "measuredangle": "∡", "MediumSpace": " ", "Mellintrf": "ℳ", "mfr": "𝔪", "Mfr": "𝔐", "mho": "℧", "micro": "µ", "mid": "∣", "midast": "*", "midcir": "⫰", "middot": "·", "minus": "−", "minusb": "⊟", "minusd": "∸", "minusdu": "⨪", "MinusPlus": "∓", "mlcp": "⫛", "mldr": "…", "mnplus": "∓", "models": "⊧", "mopf": "𝕞", "Mopf": "𝕄", "mp": "∓", "mscr": "𝓂", "Mscr": "ℳ", "mstpos": "∾", "mu": "μ", "Mu": "Μ", "multimap": "⊸", "mumap": "⊸", "nabla": "∇", "nacute": "ń", "Nacute": "Ń", "nang": "∠⃒", "nap": "≉", "napE": "⩰̸", "napid": "≋̸", "napos": "ŉ", "napprox": "≉", "natur": "♮", "natural": "♮", "naturals": "ℕ", "nbsp": " ", "nbump": "≎̸", "nbumpe": "≏̸", "ncap": "⩃", "ncaron": "ň", "Ncaron": "Ň", "ncedil": "ņ", "Ncedil": "Ņ", "ncong": "≇", "ncongdot": "⩭̸", "ncup": "⩂", "ncy": "н", "Ncy": "Н", "ndash": "–", "ne": "≠", "nearhk": "⤤", "nearr": "↗", "neArr": "⇗", "nearrow": "↗", "nedot": "≐̸", "NegativeMediumSpace": "​", "NegativeThickSpace": "​", "NegativeThinSpace": "​", "NegativeVeryThinSpace": "​", "nequiv": "≢", "nesear": "⤨", "nesim": "≂̸", "NestedGreaterGreater": "≫", "NestedLessLess": "≪", "NewLine": "\n", "nexist": "∄", "nexists": "∄", "nfr": "𝔫", "Nfr": "𝔑", "nge": "≱", "ngE": "≧̸", "ngeq": "≱", "ngeqq": "≧̸", "ngeqslant": "⩾̸", "nges": "⩾̸", "nGg": "⋙̸", "ngsim": "≵", "ngt": "≯", "nGt": "≫⃒", "ngtr": "≯", "nGtv": "≫̸", "nharr": "↮", "nhArr": "⇎", "nhpar": "⫲", "ni": "∋", "nis": "⋼", "nisd": "⋺", "niv": "∋", "njcy": "њ", "NJcy": "Њ", "nlarr": "↚", "nlArr": "⇍", "nldr": "‥", "nle": "≰", "nlE": "≦̸", "nleftarrow": "↚", "nLeftarrow": "⇍", "nleftrightarrow": "↮", "nLeftrightarrow": "⇎", "nleq": "≰", "nleqq": "≦̸", "nleqslant": "⩽̸", "nles": "⩽̸", "nless": "≮", "nLl": "⋘̸", "nlsim": "≴", "nlt": "≮", "nLt": "≪⃒", "nltri": "⋪", "nltrie": "⋬", "nLtv": "≪̸", "nmid": "∤", "NoBreak": "⁠", "NonBreakingSpace": " ", "nopf": "𝕟", "Nopf": "ℕ", "not": "¬", "Not": "⫬", "NotCongruent": "≢", "NotCupCap": "≭", "NotDoubleVerticalBar": "∦", "NotElement": "∉", "NotEqual": "≠", "NotEqualTilde": "≂̸", "NotExists": "∄", "NotGreater": "≯", "NotGreaterEqual": "≱", "NotGreaterFullEqual": "≧̸", "NotGreaterGreater": "≫̸", "NotGreaterLess": "≹", "NotGreaterSlantEqual": "⩾̸", "NotGreaterTilde": "≵", "NotHumpDownHump": "≎̸", "NotHumpEqual": "≏̸", "notin": "∉", "notindot": "⋵̸", "notinE": "⋹̸", "notinva": "∉", "notinvb": "⋷", "notinvc": "⋶", "NotLeftTriangle": "⋪", "NotLeftTriangleBar": "⧏̸", "NotLeftTriangleEqual": "⋬", "NotLess": "≮", "NotLessEqual": "≰", "NotLessGreater": "≸", "NotLessLess": "≪̸", "NotLessSlantEqual": "⩽̸", "NotLessTilde": "≴", "NotNestedGreaterGreater": "⪢̸", "NotNestedLessLess": "⪡̸", "notni": "∌", "notniva": "∌", "notnivb": "⋾", "notnivc": "⋽", "NotPrecedes": "⊀", "NotPrecedesEqual": "⪯̸", "NotPrecedesSlantEqual": "⋠", "NotReverseElement": "∌", "NotRightTriangle": "⋫", "NotRightTriangleBar": "⧐̸", "NotRightTriangleEqual": "⋭", "NotSquareSubset": "⊏̸", "NotSquareSubsetEqual": "⋢", "NotSquareSuperset": "⊐̸", "NotSquareSupersetEqual": "⋣", "NotSubset": "⊂⃒", "NotSubsetEqual": "⊈", "NotSucceeds": "⊁", "NotSucceedsEqual": "⪰̸", "NotSucceedsSlantEqual": "⋡", "NotSucceedsTilde": "≿̸", "NotSuperset": "⊃⃒", "NotSupersetEqual": "⊉", "NotTilde": "≁", "NotTildeEqual": "≄", "NotTildeFullEqual": "≇", "NotTildeTilde": "≉", "NotVerticalBar": "∤", "npar": "∦", "nparallel": "∦", "nparsl": "⫽⃥", "npart": "∂̸", "npolint": "⨔", "npr": "⊀", "nprcue": "⋠", "npre": "⪯̸", "nprec": "⊀", "npreceq": "⪯̸", "nrarr": "↛", "nrArr": "⇏", "nrarrc": "⤳̸", "nrarrw": "↝̸", "nrightarrow": "↛", "nRightarrow": "⇏", "nrtri": "⋫", "nrtrie": "⋭", "nsc": "⊁", "nsccue": "⋡", "nsce": "⪰̸", "nscr": "𝓃", "Nscr": "𝒩", "nshortmid": "∤", "nshortparallel": "∦", "nsim": "≁", "nsime": "≄", "nsimeq": "≄", "nsmid": "∤", "nspar": "∦", "nsqsube": "⋢", "nsqsupe": "⋣", "nsub": "⊄", "nsube": "⊈", "nsubE": "⫅̸", "nsubset": "⊂⃒", "nsubseteq": "⊈", "nsubseteqq": "⫅̸", "nsucc": "⊁", "nsucceq": "⪰̸", "nsup": "⊅", "nsupe": "⊉", "nsupE": "⫆̸", "nsupset": "⊃⃒", "nsupseteq": "⊉", "nsupseteqq": "⫆̸", "ntgl": "≹", "ntilde": "ñ", "Ntilde": "Ñ", "ntlg": "≸", "ntriangleleft": "⋪", "ntrianglelefteq": "⋬", "ntriangleright": "⋫", "ntrianglerighteq": "⋭", "nu": "ν", "Nu": "Ν", "num": "#", "numero": "№", "numsp": " ", "nvap": "≍⃒", "nvdash": "⊬", "nvDash": "⊭", "nVdash": "⊮", "nVDash": "⊯", "nvge": "≥⃒", "nvgt": ">⃒", "nvHarr": "⤄", "nvinfin": "⧞", "nvlArr": "⤂", "nvle": "≤⃒", "nvlt": "<⃒", "nvltrie": "⊴⃒", "nvrArr": "⤃", "nvrtrie": "⊵⃒", "nvsim": "∼⃒", "nwarhk": "⤣", "nwarr": "↖", "nwArr": "⇖", "nwarrow": "↖", "nwnear": "⤧", "oacute": "ó", "Oacute": "Ó", "oast": "⊛", "ocir": "⊚", "ocirc": "ô", "Ocirc": "Ô", "ocy": "о", "Ocy": "О", "odash": "⊝", "odblac": "ő", "Odblac": "Ő", "odiv": "⨸", "odot": "⊙", "odsold": "⦼", "oelig": "œ", "OElig": "Œ", "ofcir": "⦿", "ofr": "𝔬", "Ofr": "𝔒", "ogon": "˛", "ograve": "ò", "Ograve": "Ò", "ogt": "⧁", "ohbar": "⦵", "ohm": "Ω", "oint": "∮", "olarr": "↺", "olcir": "⦾", "olcross": "⦻", "oline": "‾", "olt": "⧀", "omacr": "ō", "Omacr": "Ō", "omega": "ω", "Omega": "Ω", "omicron": "ο", "Omicron": "Ο", "omid": "⦶", "ominus": "⊖", "oopf": "𝕠", "Oopf": "𝕆", "opar": "⦷", "OpenCurlyDoubleQuote": "“", "OpenCurlyQuote": "‘", "operp": "⦹", "oplus": "⊕", "or": "∨", "Or": "⩔", "orarr": "↻", "ord": "⩝", "order": "ℴ", "orderof": "ℴ", "ordf": "ª", "ordm": "º", "origof": "⊶", "oror": "⩖", "orslope": "⩗", "orv": "⩛", "oS": "Ⓢ", "oscr": "ℴ", "Oscr": "𝒪", "oslash": "ø", "Oslash": "Ø", "osol": "⊘", "otilde": "õ", "Otilde": "Õ", "otimes": "⊗", "Otimes": "⨷", "otimesas": "⨶", "ouml": "ö", "Ouml": "Ö", "ovbar": "⌽", "OverBar": "‾", "OverBrace": "⏞", "OverBracket": "⎴", "OverParenthesis": "⏜", "par": "∥", "para": "¶", "parallel": "∥", "parsim": "⫳", "parsl": "⫽", "part": "∂", "PartialD": "∂", "pcy": "п", "Pcy": "П", "percnt": "%", "period": ".", "permil": "‰", "perp": "⊥", "pertenk": "‱", "pfr": "𝔭", "Pfr": "𝔓", "phi": "φ", "Phi": "Φ", "phiv": "ϕ", "phmmat": "ℳ", "phone": "☎", "pi": "π", "Pi": "Π", "pitchfork": "⋔", "piv": "ϖ", "planck": "ℏ", "planckh": "ℎ", "plankv": "ℏ", "plus": "+", "plusacir": "⨣", "plusb": "⊞", "pluscir": "⨢", "plusdo": "∔", "plusdu": "⨥", "pluse": "⩲", "PlusMinus": "±", "plusmn": "±", "plussim": "⨦", "plustwo": "⨧", "pm": "±", "Poincareplane": "ℌ", "pointint": "⨕", "popf": "𝕡", "Popf": "ℙ", "pound": "£", "pr": "≺", "Pr": "⪻", "prap": "⪷", "prcue": "≼", "pre": "⪯", "prE": "⪳", "prec": "≺", "precapprox": "⪷", "preccurlyeq": "≼", "Precedes": "≺", "PrecedesEqual": "⪯", "PrecedesSlantEqual": "≼", "PrecedesTilde": "≾", "preceq": "⪯", "precnapprox": "⪹", "precneqq": "⪵", "precnsim": "⋨", "precsim": "≾", "prime": "′", "Prime": "″", "primes": "ℙ", "prnap": "⪹", "prnE": "⪵", "prnsim": "⋨", "prod": "∏", "Product": "∏", "profalar": "⌮", "profline": "⌒", "profsurf": "⌓", "prop": "∝", "Proportion": "∷", "Proportional": "∝", "propto": "∝", "prsim": "≾", "prurel": "⊰", "pscr": "𝓅", "Pscr": "𝒫", "psi": "ψ", "Psi": "Ψ", "puncsp": " ", "qfr": "𝔮", "Qfr": "𝔔", "qint": "⨌", "qopf": "𝕢", "Qopf": "ℚ", "qprime": "⁗", "qscr": "𝓆", "Qscr": "𝒬", "quaternions": "ℍ", "quatint": "⨖", "quest": "?", "questeq": "≟", "quot": '"', "QUOT": '"', "rAarr": "⇛", "race": "∽̱", "racute": "ŕ", "Racute": "Ŕ", "radic": "√", "raemptyv": "⦳", "rang": "⟩", "Rang": "⟫", "rangd": "⦒", "range": "⦥", "rangle": "⟩", "raquo": "»", "rarr": "→", "rArr": "⇒", "Rarr": "↠", "rarrap": "⥵", "rarrb": "⇥", "rarrbfs": "⤠", "rarrc": "⤳", "rarrfs": "⤞", "rarrhk": "↪", "rarrlp": "↬", "rarrpl": "⥅", "rarrsim": "⥴", "rarrtl": "↣", "Rarrtl": "⤖", "rarrw": "↝", "ratail": "⤚", "rAtail": "⤜", "ratio": "∶", "rationals": "ℚ", "rbarr": "⤍", "rBarr": "⤏", "RBarr": "⤐", "rbbrk": "❳", "rbrace": "}", "rbrack": "]", "rbrke": "⦌", "rbrksld": "⦎", "rbrkslu": "⦐", "rcaron": "ř", "Rcaron": "Ř", "rcedil": "ŗ", "Rcedil": "Ŗ", "rceil": "⌉", "rcub": "}", "rcy": "р", "Rcy": "Р", "rdca": "⤷", "rdldhar": "⥩", "rdquo": "”", "rdquor": "”", "rdsh": "↳", "Re": "ℜ", "real": "ℜ", "realine": "ℛ", "realpart": "ℜ", "reals": "ℝ", "rect": "▭", "reg": "®", "REG": "®", "ReverseElement": "∋", "ReverseEquilibrium": "⇋", "ReverseUpEquilibrium": "⥯", "rfisht": "⥽", "rfloor": "⌋", "rfr": "𝔯", "Rfr": "ℜ", "rHar": "⥤", "rhard": "⇁", "rharu": "⇀", "rharul": "⥬", "rho": "ρ", "Rho": "Ρ", "rhov": "ϱ", "RightAngleBracket": "⟩", "rightarrow": "→", "Rightarrow": "⇒", "RightArrow": "→", "RightArrowBar": "⇥", "RightArrowLeftArrow": "⇄", "rightarrowtail": "↣", "RightCeiling": "⌉", "RightDoubleBracket": "⟧", "RightDownTeeVector": "⥝", "RightDownVector": "⇂", "RightDownVectorBar": "⥕", "RightFloor": "⌋", "rightharpoondown": "⇁", "rightharpoonup": "⇀", "rightleftarrows": "⇄", "rightleftharpoons": "⇌", "rightrightarrows": "⇉", "rightsquigarrow": "↝", "RightTee": "⊢", "RightTeeArrow": "↦", "RightTeeVector": "⥛", "rightthreetimes": "⋌", "RightTriangle": "⊳", "RightTriangleBar": "⧐", "RightTriangleEqual": "⊵", "RightUpDownVector": "⥏", "RightUpTeeVector": "⥜", "RightUpVector": "↾", "RightUpVectorBar": "⥔", "RightVector": "⇀", "RightVectorBar": "⥓", "ring": "˚", "risingdotseq": "≓", "rlarr": "⇄", "rlhar": "⇌", "rlm": "‏", "rmoust": "⎱", "rmoustache": "⎱", "rnmid": "⫮", "roang": "⟭", "roarr": "⇾", "robrk": "⟧", "ropar": "⦆", "ropf": "𝕣", "Ropf": "ℝ", "roplus": "⨮", "rotimes": "⨵", "RoundImplies": "⥰", "rpar": ")", "rpargt": "⦔", "rppolint": "⨒", "rrarr": "⇉", "Rrightarrow": "⇛", "rsaquo": "›", "rscr": "𝓇", "Rscr": "ℛ", "rsh": "↱", "Rsh": "↱", "rsqb": "]", "rsquo": "’", "rsquor": "’", "rthree": "⋌", "rtimes": "⋊", "rtri": "▹", "rtrie": "⊵", "rtrif": "▸", "rtriltri": "⧎", "RuleDelayed": "⧴", "ruluhar": "⥨", "rx": "℞", "sacute": "ś", "Sacute": "Ś", "sbquo": "‚", "sc": "≻", "Sc": "⪼", "scap": "⪸", "scaron": "š", "Scaron": "Š", "sccue": "≽", "sce": "⪰", "scE": "⪴", "scedil": "ş", "Scedil": "Ş", "scirc": "ŝ", "Scirc": "Ŝ", "scnap": "⪺", "scnE": "⪶", "scnsim": "⋩", "scpolint": "⨓", "scsim": "≿", "scy": "с", "Scy": "С", "sdot": "⋅", "sdotb": "⊡", "sdote": "⩦", "searhk": "⤥", "searr": "↘", "seArr": "⇘", "searrow": "↘", "sect": "§", "semi": ";", "seswar": "⤩", "setminus": "∖", "setmn": "∖", "sext": "✶", "sfr": "𝔰", "Sfr": "𝔖", "sfrown": "⌢", "sharp": "♯", "shchcy": "щ", "SHCHcy": "Щ", "shcy": "ш", "SHcy": "Ш", "ShortDownArrow": "↓", "ShortLeftArrow": "←", "shortmid": "∣", "shortparallel": "∥", "ShortRightArrow": "→", "ShortUpArrow": "↑", "shy": "­", "sigma": "σ", "Sigma": "Σ", "sigmaf": "ς", "sigmav": "ς", "sim": "∼", "simdot": "⩪", "sime": "≃", "simeq": "≃", "simg": "⪞", "simgE": "⪠", "siml": "⪝", "simlE": "⪟", "simne": "≆", "simplus": "⨤", "simrarr": "⥲", "slarr": "←", "SmallCircle": "∘", "smallsetminus": "∖", "smashp": "⨳", "smeparsl": "⧤", "smid": "∣", "smile": "⌣", "smt": "⪪", "smte": "⪬", "smtes": "⪬︀", "softcy": "ь", "SOFTcy": "Ь", "sol": "/", "solb": "⧄", "solbar": "⌿", "sopf": "𝕤", "Sopf": "𝕊", "spades": "♠", "spadesuit": "♠", "spar": "∥", "sqcap": "⊓", "sqcaps": "⊓︀", "sqcup": "⊔", "sqcups": "⊔︀", "Sqrt": "√", "sqsub": "⊏", "sqsube": "⊑", "sqsubset": "⊏", "sqsubseteq": "⊑", "sqsup": "⊐", "sqsupe": "⊒", "sqsupset": "⊐", "sqsupseteq": "⊒", "squ": "□", "square": "□", "Square": "□", "SquareIntersection": "⊓", "SquareSubset": "⊏", "SquareSubsetEqual": "⊑", "SquareSuperset": "⊐", "SquareSupersetEqual": "⊒", "SquareUnion": "⊔", "squarf": "▪", "squf": "▪", "srarr": "→", "sscr": "𝓈", "Sscr": "𝒮", "ssetmn": "∖", "ssmile": "⌣", "sstarf": "⋆", "star": "☆", "Star": "⋆", "starf": "★", "straightepsilon": "ϵ", "straightphi": "ϕ", "strns": "¯", "sub": "⊂", "Sub": "⋐", "subdot": "⪽", "sube": "⊆", "subE": "⫅", "subedot": "⫃", "submult": "⫁", "subne": "⊊", "subnE": "⫋", "subplus": "⪿", "subrarr": "⥹", "subset": "⊂", "Subset": "⋐", "subseteq": "⊆", "subseteqq": "⫅", "SubsetEqual": "⊆", "subsetneq": "⊊", "subsetneqq": "⫋", "subsim": "⫇", "subsub": "⫕", "subsup": "⫓", "succ": "≻", "succapprox": "⪸", "succcurlyeq": "≽", "Succeeds": "≻", "SucceedsEqual": "⪰", "SucceedsSlantEqual": "≽", "SucceedsTilde": "≿", "succeq": "⪰", "succnapprox": "⪺", "succneqq": "⪶", "succnsim": "⋩", "succsim": "≿", "SuchThat": "∋", "sum": "∑", "Sum": "∑", "sung": "♪", "sup": "⊃", "Sup": "⋑", "sup1": "¹", "sup2": "²", "sup3": "³", "supdot": "⪾", "supdsub": "⫘", "supe": "⊇", "supE": "⫆", "supedot": "⫄", "Superset": "⊃", "SupersetEqual": "⊇", "suphsol": "⟉", "suphsub": "⫗", "suplarr": "⥻", "supmult": "⫂", "supne": "⊋", "supnE": "⫌", "supplus": "⫀", "supset": "⊃", "Supset": "⋑", "supseteq": "⊇", "supseteqq": "⫆", "supsetneq": "⊋", "supsetneqq": "⫌", "supsim": "⫈", "supsub": "⫔", "supsup": "⫖", "swarhk": "⤦", "swarr": "↙", "swArr": "⇙", "swarrow": "↙", "swnwar": "⤪", "szlig": "ß", "Tab": "	", "target": "⌖", "tau": "τ", "Tau": "Τ", "tbrk": "⎴", "tcaron": "ť", "Tcaron": "Ť", "tcedil": "ţ", "Tcedil": "Ţ", "tcy": "т", "Tcy": "Т", "tdot": "⃛", "telrec": "⌕", "tfr": "𝔱", "Tfr": "𝔗", "there4": "∴", "therefore": "∴", "Therefore": "∴", "theta": "θ", "Theta": "Θ", "thetasym": "ϑ", "thetav": "ϑ", "thickapprox": "≈", "thicksim": "∼", "ThickSpace": "  ", "thinsp": " ", "ThinSpace": " ", "thkap": "≈", "thksim": "∼", "thorn": "þ", "THORN": "Þ", "tilde": "˜", "Tilde": "∼", "TildeEqual": "≃", "TildeFullEqual": "≅", "TildeTilde": "≈", "times": "×", "timesb": "⊠", "timesbar": "⨱", "timesd": "⨰", "tint": "∭", "toea": "⤨", "top": "⊤", "topbot": "⌶", "topcir": "⫱", "topf": "𝕥", "Topf": "𝕋", "topfork": "⫚", "tosa": "⤩", "tprime": "‴", "trade": "™", "TRADE": "™", "triangle": "▵", "triangledown": "▿", "triangleleft": "◃", "trianglelefteq": "⊴", "triangleq": "≜", "triangleright": "▹", "trianglerighteq": "⊵", "tridot": "◬", "trie": "≜", "triminus": "⨺", "TripleDot": "⃛", "triplus": "⨹", "trisb": "⧍", "tritime": "⨻", "trpezium": "⏢", "tscr": "𝓉", "Tscr": "𝒯", "tscy": "ц", "TScy": "Ц", "tshcy": "ћ", "TSHcy": "Ћ", "tstrok": "ŧ", "Tstrok": "Ŧ", "twixt": "≬", "twoheadleftarrow": "↞", "twoheadrightarrow": "↠", "uacute": "ú", "Uacute": "Ú", "uarr": "↑", "uArr": "⇑", "Uarr": "↟", "Uarrocir": "⥉", "ubrcy": "ў", "Ubrcy": "Ў", "ubreve": "ŭ", "Ubreve": "Ŭ", "ucirc": "û", "Ucirc": "Û", "ucy": "у", "Ucy": "У", "udarr": "⇅", "udblac": "ű", "Udblac": "Ű", "udhar": "⥮", "ufisht": "⥾", "ufr": "𝔲", "Ufr": "𝔘", "ugrave": "ù", "Ugrave": "Ù", "uHar": "⥣", "uharl": "↿", "uharr": "↾", "uhblk": "▀", "ulcorn": "⌜", "ulcorner": "⌜", "ulcrop": "⌏", "ultri": "◸", "umacr": "ū", "Umacr": "Ū", "uml": "¨", "UnderBar": "_", "UnderBrace": "⏟", "UnderBracket": "⎵", "UnderParenthesis": "⏝", "Union": "⋃", "UnionPlus": "⊎", "uogon": "ų", "Uogon": "Ų", "uopf": "𝕦", "Uopf": "𝕌", "uparrow": "↑", "Uparrow": "⇑", "UpArrow": "↑", "UpArrowBar": "⤒", "UpArrowDownArrow": "⇅", "updownarrow": "↕", "Updownarrow": "⇕", "UpDownArrow": "↕", "UpEquilibrium": "⥮", "upharpoonleft": "↿", "upharpoonright": "↾", "uplus": "⊎", "UpperLeftArrow": "↖", "UpperRightArrow": "↗", "upsi": "υ", "Upsi": "ϒ", "upsih": "ϒ", "upsilon": "υ", "Upsilon": "Υ", "UpTee": "⊥", "UpTeeArrow": "↥", "upuparrows": "⇈", "urcorn": "⌝", "urcorner": "⌝", "urcrop": "⌎", "uring": "ů", "Uring": "Ů", "urtri": "◹", "uscr": "𝓊", "Uscr": "𝒰", "utdot": "⋰", "utilde": "ũ", "Utilde": "Ũ", "utri": "▵", "utrif": "▴", "uuarr": "⇈", "uuml": "ü", "Uuml": "Ü", "uwangle": "⦧", "vangrt": "⦜", "varepsilon": "ϵ", "varkappa": "ϰ", "varnothing": "∅", "varphi": "ϕ", "varpi": "ϖ", "varpropto": "∝", "varr": "↕", "vArr": "⇕", "varrho": "ϱ", "varsigma": "ς", "varsubsetneq": "⊊︀", "varsubsetneqq": "⫋︀", "varsupsetneq": "⊋︀", "varsupsetneqq": "⫌︀", "vartheta": "ϑ", "vartriangleleft": "⊲", "vartriangleright": "⊳", "vBar": "⫨", "Vbar": "⫫", "vBarv": "⫩", "vcy": "в", "Vcy": "В", "vdash": "⊢", "vDash": "⊨", "Vdash": "⊩", "VDash": "⊫", "Vdashl": "⫦", "vee": "∨", "Vee": "⋁", "veebar": "⊻", "veeeq": "≚", "vellip": "⋮", "verbar": "|", "Verbar": "‖", "vert": "|", "Vert": "‖", "VerticalBar": "∣", "VerticalLine": "|", "VerticalSeparator": "❘", "VerticalTilde": "≀", "VeryThinSpace": " ", "vfr": "𝔳", "Vfr": "𝔙", "vltri": "⊲", "vnsub": "⊂⃒", "vnsup": "⊃⃒", "vopf": "𝕧", "Vopf": "𝕍", "vprop": "∝", "vrtri": "⊳", "vscr": "𝓋", "Vscr": "𝒱", "vsubne": "⊊︀", "vsubnE": "⫋︀", "vsupne": "⊋︀", "vsupnE": "⫌︀", "Vvdash": "⊪", "vzigzag": "⦚", "wcirc": "ŵ", "Wcirc": "Ŵ", "wedbar": "⩟", "wedge": "∧", "Wedge": "⋀", "wedgeq": "≙", "weierp": "℘", "wfr": "𝔴", "Wfr": "𝔚", "wopf": "𝕨", "Wopf": "𝕎", "wp": "℘", "wr": "≀", "wreath": "≀", "wscr": "𝓌", "Wscr": "𝒲", "xcap": "⋂", "xcirc": "◯", "xcup": "⋃", "xdtri": "▽", "xfr": "𝔵", "Xfr": "𝔛", "xharr": "⟷", "xhArr": "⟺", "xi": "ξ", "Xi": "Ξ", "xlarr": "⟵", "xlArr": "⟸", "xmap": "⟼", "xnis": "⋻", "xodot": "⨀", "xopf": "𝕩", "Xopf": "𝕏", "xoplus": "⨁", "xotime": "⨂", "xrarr": "⟶", "xrArr": "⟹", "xscr": "𝓍", "Xscr": "𝒳", "xsqcup": "⨆", "xuplus": "⨄", "xutri": "△", "xvee": "⋁", "xwedge": "⋀", "yacute": "ý", "Yacute": "Ý", "yacy": "я", "YAcy": "Я", "ycirc": "ŷ", "Ycirc": "Ŷ", "ycy": "ы", "Ycy": "Ы", "yen": "¥", "yfr": "𝔶", "Yfr": "𝔜", "yicy": "ї", "YIcy": "Ї", "yopf": "𝕪", "Yopf": "𝕐", "yscr": "𝓎", "Yscr": "𝒴", "yucy": "ю", "YUcy": "Ю", "yuml": "ÿ", "Yuml": "Ÿ", "zacute": "ź", "Zacute": "Ź", "zcaron": "ž", "Zcaron": "Ž", "zcy": "з", "Zcy": "З", "zdot": "ż", "Zdot": "Ż", "zeetrf": "ℨ", "ZeroWidthSpace": "​", "zeta": "ζ", "Zeta": "Ζ", "zfr": "𝔷", "Zfr": "ℨ", "zhcy": "ж", "ZHcy": "Ж", "zigrarr": "⇝", "zopf": "𝕫", "Zopf": "ℤ", "zscr": "𝓏", "Zscr": "𝒵", "zwj": "‍", "zwnj": "‌" };
    var decodeMapLegacy = { "aacute": "á", "Aacute": "Á", "acirc": "â", "Acirc": "Â", "acute": "´", "aelig": "æ", "AElig": "Æ", "agrave": "à", "Agrave": "À", "amp": "&", "AMP": "&", "aring": "å", "Aring": "Å", "atilde": "ã", "Atilde": "Ã", "auml": "ä", "Auml": "Ä", "brvbar": "¦", "ccedil": "ç", "Ccedil": "Ç", "cedil": "¸", "cent": "¢", "copy": "©", "COPY": "©", "curren": "¤", "deg": "°", "divide": "÷", "eacute": "é", "Eacute": "É", "ecirc": "ê", "Ecirc": "Ê", "egrave": "è", "Egrave": "È", "eth": "ð", "ETH": "Ð", "euml": "ë", "Euml": "Ë", "frac12": "½", "frac14": "¼", "frac34": "¾", "gt": ">", "GT": ">", "iacute": "í", "Iacute": "Í", "icirc": "î", "Icirc": "Î", "iexcl": "¡", "igrave": "ì", "Igrave": "Ì", "iquest": "¿", "iuml": "ï", "Iuml": "Ï", "laquo": "«", "lt": "<", "LT": "<", "macr": "¯", "micro": "µ", "middot": "·", "nbsp": " ", "not": "¬", "ntilde": "ñ", "Ntilde": "Ñ", "oacute": "ó", "Oacute": "Ó", "ocirc": "ô", "Ocirc": "Ô", "ograve": "ò", "Ograve": "Ò", "ordf": "ª", "ordm": "º", "oslash": "ø", "Oslash": "Ø", "otilde": "õ", "Otilde": "Õ", "ouml": "ö", "Ouml": "Ö", "para": "¶", "plusmn": "±", "pound": "£", "quot": '"', "QUOT": '"', "raquo": "»", "reg": "®", "REG": "®", "sect": "§", "shy": "­", "sup1": "¹", "sup2": "²", "sup3": "³", "szlig": "ß", "thorn": "þ", "THORN": "Þ", "times": "×", "uacute": "ú", "Uacute": "Ú", "ucirc": "û", "Ucirc": "Û", "ugrave": "ù", "Ugrave": "Ù", "uml": "¨", "uuml": "ü", "Uuml": "Ü", "yacute": "ý", "Yacute": "Ý", "yen": "¥", "yuml": "ÿ" };
    var decodeMapNumeric = { "0": "�", "128": "€", "130": "‚", "131": "ƒ", "132": "„", "133": "…", "134": "†", "135": "‡", "136": "ˆ", "137": "‰", "138": "Š", "139": "‹", "140": "Œ", "142": "Ž", "145": "‘", "146": "’", "147": "“", "148": "”", "149": "•", "150": "–", "151": "—", "152": "˜", "153": "™", "154": "š", "155": "›", "156": "œ", "158": "ž", "159": "Ÿ" };
    var invalidReferenceCodePoints = [1, 2, 3, 4, 5, 6, 7, 8, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 64976, 64977, 64978, 64979, 64980, 64981, 64982, 64983, 64984, 64985, 64986, 64987, 64988, 64989, 64990, 64991, 64992, 64993, 64994, 64995, 64996, 64997, 64998, 64999, 65e3, 65001, 65002, 65003, 65004, 65005, 65006, 65007, 65534, 65535, 131070, 131071, 196606, 196607, 262142, 262143, 327678, 327679, 393214, 393215, 458750, 458751, 524286, 524287, 589822, 589823, 655358, 655359, 720894, 720895, 786430, 786431, 851966, 851967, 917502, 917503, 983038, 983039, 1048574, 1048575, 1114110, 1114111];
    var stringFromCharCode = String.fromCharCode;
    var object = {};
    var hasOwnProperty2 = object.hasOwnProperty;
    var has2 = function(object2, propertyName) {
      return hasOwnProperty2.call(object2, propertyName);
    };
    var contains = function(array, value) {
      var index = -1;
      var length = array.length;
      while (++index < length) {
        if (array[index] == value) {
          return true;
        }
      }
      return false;
    };
    var merge = function(options, defaults) {
      if (!options) {
        return defaults;
      }
      var result = {};
      var key2;
      for (key2 in defaults) {
        result[key2] = has2(options, key2) ? options[key2] : defaults[key2];
      }
      return result;
    };
    var codePointToSymbol = function(codePoint, strict) {
      var output = "";
      if (codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111) {
        if (strict) {
          parseError("character reference outside the permissible Unicode range");
        }
        return "�";
      }
      if (has2(decodeMapNumeric, codePoint)) {
        if (strict) {
          parseError("disallowed character reference");
        }
        return decodeMapNumeric[codePoint];
      }
      if (strict && contains(invalidReferenceCodePoints, codePoint)) {
        parseError("disallowed character reference");
      }
      if (codePoint > 65535) {
        codePoint -= 65536;
        output += stringFromCharCode(codePoint >>> 10 & 1023 | 55296);
        codePoint = 56320 | codePoint & 1023;
      }
      output += stringFromCharCode(codePoint);
      return output;
    };
    var hexEscape = function(codePoint) {
      return "&#x" + codePoint.toString(16).toUpperCase() + ";";
    };
    var decEscape = function(codePoint) {
      return "&#" + codePoint + ";";
    };
    var parseError = function(message) {
      throw Error("Parse error: " + message);
    };
    var encode = function(string, options) {
      options = merge(options, encode.options);
      var strict = options.strict;
      if (strict && regexInvalidRawCodePoint.test(string)) {
        parseError("forbidden code point");
      }
      var encodeEverything = options.encodeEverything;
      var useNamedReferences = options.useNamedReferences;
      var allowUnsafeSymbols = options.allowUnsafeSymbols;
      var escapeCodePoint = options.decimal ? decEscape : hexEscape;
      var escapeBmpSymbol = function(symbol) {
        return escapeCodePoint(symbol.charCodeAt(0));
      };
      if (encodeEverything) {
        string = string.replace(regexAsciiWhitelist, function(symbol) {
          if (useNamedReferences && has2(encodeMap, symbol)) {
            return "&" + encodeMap[symbol] + ";";
          }
          return escapeBmpSymbol(symbol);
        });
        if (useNamedReferences) {
          string = string.replace(/&gt;\u20D2/g, "&nvgt;").replace(/&lt;\u20D2/g, "&nvlt;").replace(/&#x66;&#x6A;/g, "&fjlig;");
        }
        if (useNamedReferences) {
          string = string.replace(regexEncodeNonAscii, function(string2) {
            return "&" + encodeMap[string2] + ";";
          });
        }
      } else if (useNamedReferences) {
        if (!allowUnsafeSymbols) {
          string = string.replace(regexEscape, function(string2) {
            return "&" + encodeMap[string2] + ";";
          });
        }
        string = string.replace(/&gt;\u20D2/g, "&nvgt;").replace(/&lt;\u20D2/g, "&nvlt;");
        string = string.replace(regexEncodeNonAscii, function(string2) {
          return "&" + encodeMap[string2] + ";";
        });
      } else if (!allowUnsafeSymbols) {
        string = string.replace(regexEscape, escapeBmpSymbol);
      }
      return string.replace(regexAstralSymbols, function($0) {
        var high = $0.charCodeAt(0);
        var low = $0.charCodeAt(1);
        var codePoint = (high - 55296) * 1024 + low - 56320 + 65536;
        return escapeCodePoint(codePoint);
      }).replace(regexBmpWhitelist, escapeBmpSymbol);
    };
    encode.options = {
      "allowUnsafeSymbols": false,
      "encodeEverything": false,
      "strict": false,
      "useNamedReferences": false,
      "decimal": false
    };
    var decode = function(html, options) {
      options = merge(options, decode.options);
      var strict = options.strict;
      if (strict && regexInvalidEntity.test(html)) {
        parseError("malformed character reference");
      }
      return html.replace(regexDecode, function($0, $1, $2, $3, $4, $5, $6, $7, $8) {
        var codePoint;
        var semicolon;
        var decDigits;
        var hexDigits;
        var reference;
        var next;
        if ($1) {
          reference = $1;
          return decodeMap[reference];
        }
        if ($2) {
          reference = $2;
          next = $3;
          if (next && options.isAttributeValue) {
            if (strict && next == "=") {
              parseError("`&` did not start a character reference");
            }
            return $0;
          } else {
            if (strict) {
              parseError(
                "named character reference was not terminated by a semicolon"
              );
            }
            return decodeMapLegacy[reference] + (next || "");
          }
        }
        if ($4) {
          decDigits = $4;
          semicolon = $5;
          if (strict && !semicolon) {
            parseError("character reference was not terminated by a semicolon");
          }
          codePoint = parseInt(decDigits, 10);
          return codePointToSymbol(codePoint, strict);
        }
        if ($6) {
          hexDigits = $6;
          semicolon = $7;
          if (strict && !semicolon) {
            parseError("character reference was not terminated by a semicolon");
          }
          codePoint = parseInt(hexDigits, 16);
          return codePointToSymbol(codePoint, strict);
        }
        if (strict) {
          parseError(
            "named character reference was not terminated by a semicolon"
          );
        }
        return $0;
      });
    };
    decode.options = {
      "isAttributeValue": false,
      "strict": false
    };
    var escape = function(string) {
      return string.replace(regexEscape, function($0) {
        return escapeMap[$0];
      });
    };
    var he2 = {
      "version": "1.2.0",
      "encode": encode,
      "decode": decode,
      "escape": escape,
      "unescape": decode
    };
    if (freeExports && !freeExports.nodeType) {
      if (freeModule) {
        freeModule.exports = he2;
      } else {
        for (var key in he2) {
          has2(he2, key) && (freeExports[key] = he2[key]);
        }
      }
    } else {
      root.he = he2;
    }
  })(commonjsGlobal);
})(he$1, he$1.exports);
var heExports = he$1.exports;
const he = /* @__PURE__ */ getDefaultExportFromCjs(heExports);
const FiltersCpts_vue_vue_type_style_index_0_scoped_367aa761_lang = "";
const _sfc_main$5 = {
  name: "FiltersCpts",
  emits: ["handleClick", "filterElementsByKeyword"],
  components: {
    AllFilterSvg,
    SearchLoop,
    SearchBox
  },
  props: {
    filters: {
      type: Array,
      default: () => []
    },
    type_de_filtre: {
      type: String,
      default: ""
    },
    champs_texte_pour_affiner: {
      type: Boolean,
      default: false
    },
    texte_pour_le_label_1: {
      type: String,
      default: "Type 1"
    },
    texte_pour_le_label_2: {
      type: String,
      default: "Type 2"
    },
    texte_pour_le_label_3: {
      type: String,
      default: "Type 3"
    },
    texte_pour_le_label_4: {
      type: String,
      default: "Type 4"
    },
    texte_tous_les_filtres_1: {
      type: String,
      default: "Tous les filtres"
    },
    texte_tous_les_filtres_2: {
      type: String,
      default: "Tous les filtres"
    },
    texte_tous_les_filtres_3: {
      type: String,
      default: "Tous les filtres"
    },
    texte_tous_les_filtres_4: {
      type: String,
      default: "Tous les filtres"
    }
  },
  data() {
    return {
      userEntry: ""
    };
  },
  methods: {
    decode(string) {
      return he.decode(string);
    }
  }
};
const _withScopeId = (n) => (pushScopeId("data-v-367aa761"), n = n(), popScopeId(), n);
const _hoisted_1$4 = { class: "filters" };
const _hoisted_2$4 = ["onClick"];
const _hoisted_3$4 = ["onClick"];
const _hoisted_4$2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("svg", {
  preserveAspectRatio: "none",
  xmlns: "http://www.w3.org/2000/svg",
  width: "126.705",
  height: "49.779",
  viewBox: "0 0 126.705 49.779"
}, [
  /* @__PURE__ */ createBaseVNode("g", {
    id: "Tracé_342",
    "data-name": "Tracé 342",
    transform: "translate(4.095 0.511)",
    fill: "none"
  }, [
    /* @__PURE__ */ createBaseVNode("path", {
      d: "M38.526.109C68.481-1.71,68.892.874,89.757,2.693s18-2.533,27.382,4.69,4.637,26.36.883,33.947-7.839,7.938-26.941,7.938-29.19-1.424-48.361-2.588c-29.954-1.819-29.563,4.474-40.632-5.35S-2.769,8.3,2.09,2.693,8.572,1.927,38.526.109Z",
      stroke: "none",
      class: "bg-button-filter"
    }),
    /* @__PURE__ */ createBaseVNode("path", {
      d: "M 55.70505142211914 1.488597869873047 C 51.05695343017578 1.488658905029297 45.47733306884766 1.690258026123047 38.64734649658203 2.104915618896484 C 33.85643005371094 2.395778656005859 29.30924987792969 2.543258666992188 25.13211059570312 2.543258666992188 C 19.46694946289062 2.543258666992188 15.43064880371094 2.278636932373047 12.48345184326172 2.085418701171875 C 10.77657318115234 1.973495483398438 9.428390502929688 1.885116577148438 8.344329833984375 1.885116577148438 C 5.952651977539062 1.885116577148438 5.110366821289062 2.261157989501953 3.6009521484375 4.002758026123047 C 2.537071228027344 5.230297088623047 1.359733581542969 7.552818298339844 0.37078857421875 10.37481689453125 C -0.4183883666992188 12.62677764892578 -1.451766967773438 16.23381805419922 -1.89312744140625 20.62917709350586 C -2.295967102050781 24.64093780517578 -2.103607177734375 28.28411674499512 -1.32135009765625 31.45755767822266 C -0.448211669921875 34.99969863891602 1.146072387695312 37.81781768798828 3.417213439941406 39.8336181640625 C 5.947769165039062 42.07969665527344 7.732368469238281 43.35205841064453 9.384468078613281 44.08805847167969 C 10.86480712890625 44.74755859375 12.35353088378906 45.01655578613281 14.52301025390625 45.01655578613281 C 15.91947174072266 45.01655578613281 17.50242614746094 44.91269683837891 19.50653076171875 44.78121566772461 C 22.59561157226562 44.57853698730469 26.44004821777344 44.32631683349609 31.65155029296875 44.32631683349609 C 35.22411346435547 44.32631683349609 38.88475036621094 44.44311904907227 42.84271240234375 44.68341827392578 C 48.81536865234375 45.04601669311523 53.81864929199219 45.42691802978516 58.65721130371094 45.7952766418457 C 69.03231048583984 46.58513641357422 77.9925537109375 47.26727676391602 91.08209228515625 47.26727676391602 C 100.2635345458984 47.26727676391602 106.1044082641602 47.19619750976562 109.7914276123047 46.21117782592773 C 111.4017105102539 45.78097534179688 112.6023864746094 45.17073822021484 113.5700531005859 44.29075622558594 C 114.5205688476562 43.42633819580078 115.3409729003906 42.23947906494141 116.2301483154297 40.44243621826172 C 118.034553527832 36.79575729370117 120.0587692260742 30.32043647766113 120.5134506225586 24.07463645935059 C 120.8773498535156 19.07603645324707 120.375732421875 12.39757919311523 115.919548034668 8.967796325683594 C 111.2813720703125 5.397918701171875 110.1018524169922 5.009017944335938 107.4448699951172 5.009037017822266 C 106.7678909301758 5.009037017822266 105.9860534667969 5.039276123046875 105.0807495117188 5.074275970458984 C 103.7868728637695 5.124317169189453 102.1765670776367 5.186595916748047 100.1695098876953 5.186595916748047 C 96.91638946533203 5.186595916748047 93.45376586914062 5.022636413574219 89.58374786376953 4.685337066650391 C 83.32398986816406 4.139778137207031 78.88713073730469 3.525356292724609 74.97254943847656 2.983257293701172 C 68.94183349609375 2.148117065429688 64.17839050292969 1.488475799560547 55.70505142211914 1.488597869873047 M 55.70503234863281 -0.5114059448242188 C 69.86276245117188 -0.5116004943847656 73.9080810546875 1.311550140380859 89.75740814208984 2.692897796630859 C 99.84519195556641 3.572101593017578 104.3855285644531 3.009048461914062 107.4448776245117 3.009033203125 C 110.7135696411133 3.009014129638672 112.2916793823242 3.651718139648438 117.1394119262695 7.382877349853516 C 126.5243911743164 14.60621643066406 121.7767105102539 33.74259948730469 118.0227127075195 41.32941818237305 C 114.2687301635742 48.91623687744141 110.1833877563477 49.26727676391602 91.08209228515625 49.26727676391602 C 71.98078918457031 49.26727676391602 61.89228820800781 47.8436164855957 42.72151184082031 46.67973709106445 C 38.45798492431641 46.42089462280273 34.80608367919922 46.32630920410156 31.65154266357422 46.32630920410156 C 12.64315795898438 46.32630920410156 11.58274078369141 49.75531768798828 2.089569091796875 41.32941818237305 C -8.979011535644531 31.50519752502441 -2.769027709960938 8.298957824707031 2.089569091796875 2.692897796630859 C 6.089996337890625 -1.922939300537109 7.898468017578125 0.5432662963867188 25.13211059570312 0.5432662963867188 C 28.82923126220703 0.5432662963867188 33.23513793945312 0.4298248291015625 38.52615356445312 0.1085968017578125 C 45.72770690917969 -0.3286170959472656 51.22393035888672 -0.5113410949707031 55.70503234863281 -0.5114059448242188 Z",
      stroke: "none",
      class: "term-filter-bg"
    })
  ])
], -1));
const _hoisted_5$2 = {
  key: 1,
  class: "text-filter-container"
};
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_AllFilterSvg = resolveComponent("AllFilterSvg");
  const _component_SearchLoop = resolveComponent("SearchLoop");
  const _component_SearchBox = resolveComponent("SearchBox");
  return openBlock(), createElementBlock("div", _hoisted_1$4, [
    this.type_de_filtre === "boutons" ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList($props.filters, (filter, index) => {
      return openBlock(), createElementBlock("div", {
        class: "buttons",
        key: filter.taxonomy
      }, [
        createBaseVNode("div", {
          class: normalizeClass([filter.isAllButtonToggled ? "active" : "", "button button-all-filters"]),
          onClick: () => {
            if (!filter.isAllButtonToggled) {
              _ctx.$emit("handleClick", "all", filter);
              filter.isAllButtonToggled = !filter.isAllButtonToggled;
            }
          }
        }, [
          createBaseVNode("span", null, toDisplayString(this.$props[`texte_tous_les_filtres_${index + 1}`]), 1),
          createVNode(_component_AllFilterSvg)
        ], 10, _hoisted_2$4),
        (openBlock(true), createElementBlock(Fragment, null, renderList(filter.terms, (term) => {
          return openBlock(), createElementBlock("div", {
            onClick: ($event) => _ctx.$emit("handleClick", term.name, filter),
            class: normalizeClass([term.active ? "active" : "", "button"]),
            key: term.id
          }, [
            createBaseVNode("span", null, toDisplayString($options.decode(term.name)), 1),
            _hoisted_4$2
          ], 10, _hoisted_3$4);
        }), 128))
      ]);
    }), 128)) : createCommentVNode("", true),
    $props.champs_texte_pour_affiner ? (openBlock(), createElementBlock("div", _hoisted_5$2, [
      createVNode(_component_SearchLoop),
      createVNode(_component_SearchBox),
      $props.champs_texte_pour_affiner ? withDirectives((openBlock(), createElementBlock("input", {
        key: 0,
        type: "text",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.userEntry = $event),
        onInput: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("filterElementsByKeyword", $data.userEntry)),
        class: "filter-input",
        placeholder: "RECHERCHE"
      }, null, 544)), [
        [vModelText, $data.userEntry]
      ]) : createCommentVNode("", true)
    ])) : createCommentVNode("", true)
  ]);
}
const FiltersCpts = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["__scopeId", "data-v-367aa761"]]);
const _sfc_main$4 = {
  name: "FondCta"
};
const _hoisted_1$3 = {
  preserveAspectRatio: "none",
  id: "fond-cta",
  xmlns: "http://www.w3.org/2000/svg",
  width: "207.852",
  height: "49.779",
  viewBox: "0 0 207.852 49.779"
};
const _hoisted_2$3 = /* @__PURE__ */ createBaseVNode("path", {
  id: "Tracé_342",
  "data-name": "Tracé 342",
  d: "M65.823.109c49.139-1.819,49.813.766,84.042,2.584S179.388.16,194.784,7.383s7.607,26.36,1.449,33.947-12.86,7.938-44.195,7.938-47.884-1.424-79.333-2.588c-49.139-1.819-48.5,4.474-66.654-5.35s-7.97-33.03,0-38.637S16.684,1.927,65.823.109Z",
  transform: "translate(4.095 0.511)",
  fill: "#c5191b"
}, null, -1);
const _hoisted_3$3 = [
  _hoisted_2$3
];
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1$3, _hoisted_3$3);
}
const FondCta = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);
const _sfc_main$3 = {
  name: "TermBg"
};
const _hoisted_1$2 = {
  preserveAspectRatio: "none",
  class: "term-bg",
  xmlns: "http://www.w3.org/2000/svg",
  width: "88.686",
  height: "38.778",
  viewBox: "0 0 88.686 38.778"
};
const _hoisted_2$2 = /* @__PURE__ */ createBaseVNode("g", {
  id: "Groupe_1651",
  "data-name": "Groupe 1651",
  transform: "translate(-14.46 9.184)"
}, [
  /* @__PURE__ */ createBaseVNode("path", {
    id: "Tracé_342",
    "data-name": "Tracé 342",
    d: "M25.743-.028C46.713-1.445,47,.568,61.609,1.985a130,130,0,0,0,22.921.475c.138.069,0,35.806,0,35.806H62.536c-13.372,0-20.435-1.109-33.856-2.016C7.71,34.834,7.983,39.736.235,32.083s-3.4-25.731,0-30.1S4.773,1.388,25.743-.028Z",
    transform: "translate(18.556 -8.673)"
  })
], -1);
const _hoisted_3$2 = [
  _hoisted_2$2
];
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", _hoisted_1$2, _hoisted_3$2);
}
const TermBg = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
const _sfc_main$2 = {
  name: "RecetteExtrait",
  components: {
    FondCta,
    TermBg
  },
  props: {
    cpt: {
      type: Object
    },
    texte_en_savoir_plus: {
      type: String
    },
    showTaxonomies: {
      type: Object
    },
    texte_pour_le_bandeau_de_nouvelle_formation: {
      type: String
    },
    texte_bandeau_nouveau: {
      type: String
    },
    filters: {
      type: Array
    }
  },
  methods: {
    convertToFrenchDate(dateString) {
      if (dateString) {
        var date = new Date(
          dateString.slice(0, 4),
          dateString.slice(4, 6) - 1,
          dateString.slice(6)
        );
        var options = { year: "numeric", month: "short", day: "numeric" };
        return new Intl.DateTimeFormat("fr-FR", options).format(date);
      }
    },
    decode(string) {
      if (string) {
        return he.decode(string);
      }
      return false;
    }
  }
};
const _hoisted_1$1 = { class: "img-container" };
const _hoisted_2$1 = ["href"];
const _hoisted_3$1 = ["src"];
const _hoisted_4$1 = { class: "terms-container" };
const _hoisted_5$1 = {
  key: 0,
  class: "nouvelle_recette"
};
const _hoisted_6$1 = {
  key: 0,
  class: "term term-libre"
};
const _hoisted_7$1 = ["href"];
const _hoisted_8 = {
  key: 0,
  class: "desc-page"
};
const _hoisted_9 = { class: "buttons-extrait" };
const _hoisted_10 = {
  key: 0,
  class: "cta_center"
};
const _hoisted_11 = ["href"];
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_TermBg = resolveComponent("TermBg");
  const _component_FondCta = resolveComponent("FondCta");
  return openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$1, [
      $props.cpt.thumbnail ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
        $props.cpt.thumbnail ? (openBlock(), createElementBlock("a", {
          key: 0,
          target: "_blank",
          href: $props.cpt.link
        }, [
          createBaseVNode("img", {
            src: $props.cpt.thumbnail,
            alt: ""
          }, null, 8, _hoisted_3$1)
        ], 8, _hoisted_2$1)) : createCommentVNode("", true)
      ], 64)) : createCommentVNode("", true)
    ]),
    createBaseVNode("div", _hoisted_4$1, [
      $props.cpt.acf.nouvelle_recette ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
        $props.cpt.acf.nouvelle_recette ? (openBlock(), createElementBlock("p", _hoisted_5$1, toDisplayString($options.decode($props.texte_bandeau_nouveau)), 1)) : createCommentVNode("", true)
      ], 64)) : createCommentVNode("", true),
      (openBlock(true), createElementBlock(Fragment, null, renderList($props.cpt.terms, (taxo, indexTaxo) => {
        return openBlock(), createElementBlock(Fragment, { key: indexTaxo }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(taxo, (term, index) => {
            return openBlock(), createElementBlock("div", {
              key: term,
              class: normalizeClass("term-wrapper " + indexTaxo)
            }, [
              createBaseVNode("span", {
                class: normalizeClass("term term-" + index)
              }, toDisplayString($options.decode(term)), 3),
              createVNode(_component_TermBg)
            ], 2);
          }), 128))
        ], 64);
      }), 128)),
      $props.cpt.acf.champ_libre ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        $props.cpt.acf.champ_libre ? (openBlock(), createElementBlock("span", _hoisted_6$1, toDisplayString($options.decode($props.cpt.acf.champ_libre)), 1)) : createCommentVNode("", true)
      ], 64)) : createCommentVNode("", true)
    ]),
    createBaseVNode("h3", null, [
      createBaseVNode("a", {
        href: $props.cpt.permalink,
        class: "lien-telechargement",
        target: "_blank"
      }, toDisplayString($options.decode($props.cpt.title)), 9, _hoisted_7$1)
    ]),
    $props.cpt.acf.description_extrait_de_la_page ? (openBlock(), createElementBlock("p", _hoisted_8, toDisplayString($options.decode($props.cpt.acf.description_extrait_de_la_page)), 1)) : createCommentVNode("", true),
    createBaseVNode("div", _hoisted_9, [
      $props.cpt.permalink ? (openBlock(), createElementBlock("p", _hoisted_10, [
        createBaseVNode("a", {
          target: "_blank",
          href: $props.cpt.permalink
        }, [
          createBaseVNode("span", null, toDisplayString($options.decode($props.texte_en_savoir_plus)), 1),
          createVNode(_component_FondCta)
        ], 8, _hoisted_11)
      ])) : createCommentVNode("", true)
    ])
  ]);
}
const RecetteExtrait = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
function dataProperties() {
  return {
    cpts: [],
    cptName: "",
    displayablePosts: 0,
    // correspond au nombre de posts qui ont show = true
    displayed: 0,
    selected: "",
    filters: [],
    taxonomiesAndTerms: [],
    indexCptShow: 0,
    incrementNumber: 0,
    isLoaded: false,
    hasMoreContent: true,
    howManyTaxonomiesInExcerpt: 0,
    extraitPaddingTop: "extrait-padding-top-1",
    maxDisplayable: 0,
    protocol: "",
    perPage: 0,
    postsFilteredByKeyword: false,
    postsFoundByKeyword: 0,
    lastKeyword: "",
    loadMore: "",
    showTaxonomies: {
      1: false,
      2: false,
      3: false,
      4: false
    },
    textePourBandeauNouveau: "",
    website: ""
  };
}
async function getApiData(route, params = { method: "get" }) {
  const data = await fetch(route, {
    method: params.method,
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  });
  const body = data.json();
  return body;
}
function cleanUrl(website, protocol) {
  if (location.hostname === "localhost") {
    let pathname = location.pathname;
    if (location.pathname === "/") {
      pathname = "/petitbilly";
    }
    pathname = pathname.split("/");
    pathname = pathname[1];
    website = `localhost/${pathname}`;
    protocol = "http";
  } else {
    website = location.host;
    protocol = "https";
  }
  return { website, protocol };
}
const _sfc_main$1 = {
  name: "ShowCpt",
  components: {
    FiltersCpts,
    RecetteExtrait
  },
  data() {
    return {
      ...dataProperties(),
      dataJson: {}
    };
  },
  mounted() {
    this.app = document.querySelector("#app");
    this.dataJson = JSON.parse(this.app.getAttribute("data-json"));
    this.setMaxDisplayablePosts(this.dataJson.max_posts);
    this.setIncrementNumber(this.dataJson.increment_number);
    this.getCpt(this.dataJson.publication_liste_app).then(() => {
      this.activeAllAtStart();
    });
  },
  methods: {
    activeAllAtStart() {
      this.cpts.forEach((cpt) => {
        cpt.show = true;
        this.displayPostAccordingMaxDisplayable(cpt);
      });
      this.filters.forEach((filter) => {
        filter.isAllButtonToggled = true;
        filter.terms.forEach((term) => {
          term.active = false;
        });
      });
      this.hasMoreContent = this.displayed < this.displayablePosts;
      this.recordOriginalCpts();
    },
    convertToFrenchDate(dateString) {
      if (dateString) {
        var date = new Date(
          dateString.slice(0, 4),
          dateString.slice(4, 6) - 1,
          dateString.slice(6)
        );
        var options = { year: "numeric", month: "short", day: "numeric" };
        return new Intl.DateTimeFormat("fr-FR", options).format(date);
      }
    },
    async getCpt(cptName) {
      const { website, protocol } = cleanUrl(this.website, this.protocol);
      this.website = website;
      this.protocol = protocol;
      this.cptName = cptName;
      let cptNameForRequest = this.cptName;
      if (this.cptName === "post") {
        cptNameForRequest = "posts";
      }
      try {
        console.log(
          `${this.protocol}://${this.website}/wp-json/custom/v1/${cptNameForRequest}`
        );
        this.cpts = await getApiData(
          `${this.protocol}://${this.website}/wp-json/custom/v1/${cptNameForRequest}`
        );
        this.taxonomiesAndTerms = await getApiData(
          `${this.protocol}://${this.website}/wp-json/wp/v2/taxonomies-and-terms/`
        );
        this.filters = this.loadFiltersContent(
          this.taxonomiesAndTerms,
          this.cptName
        );
        this.isLoaded = true;
      } catch (err) {
        console.log(err);
      }
    },
    loadFiltersContent(taxonomiesAndTerms, cptName) {
      let filters = [];
      let i = 1;
      for (i = 1; i < 5; i++) {
        let filter = this.dataJson["filtre_etage_" + i];
        filter ? filters.push(filter) : null;
      }
      return filters.map((filter) => {
        if (taxonomiesAndTerms[cptName][filter]) {
          return {
            taxonomy: filter,
            terms: taxonomiesAndTerms[cptName][filter],
            isAllButtonToggled: false
          };
        }
      });
    },
    reorganiseCpts(cpts) {
      return cpts = cpts.map((cpt) => {
        let newCpt = { ...cpt, show: true };
        if ("_embedded" in newCpt) {
          newCpt.terms = newCpt._embedded["wp:term"] ? newCpt._embedded["wp:term"].flatMap((taxo) => taxo) : "";
        } else {
          newCpt.terms = [];
        }
        return newCpt;
      });
    },
    decodeHtmlInTree(node) {
      const nodes = node.childNodes;
      for (let i = 0; i < nodes.length; i++) {
        const currentNode = nodes[i];
        if (currentNode.nodeType === Node.TEXT_NODE) {
          currentNode.textContent = currentNode.textContent ? he.decode(currentNode.textContent) : "";
        } else if (currentNode.nodeType === Node.ELEMENT_NODE) {
          this.decodeHtmlInTree(currentNode);
        }
      }
    },
    displayPostAccordingMaxDisplayable(cpt) {
      this.displayablePosts++;
      if (this.displayed < this.maxDisplayable) {
        cpt.display = true;
        this.displayed++;
      } else {
        cpt.display = false;
      }
    },
    handleClick(termName, filter) {
      console.log("gestion du clic des boutons");
      if (this.originalCpts.length === 0) {
        this.recordOriginalCpts();
      } else {
        if (this.originalCpts.length > 0 && this.originalCpts.length !== this.cpts.length) {
          this.cpts = JSON.parse(JSON.stringify(this.originalCpts));
        }
      }
      console.log("Clic sur un filtre");
      this.filters = this.filters.map((innerFilter) => {
        if (termName === "all") {
          if (innerFilter.taxonomy === filter.taxonomy) {
            return this.toggleAllToTrueInFilter(innerFilter);
          } else {
            return innerFilter;
          }
        } else {
          let termsCopy = this.toggleTermClicked(termName, innerFilter);
          let isAllButtonToggled = this.checkIfAnyTermActive(termsCopy);
          return {
            ...innerFilter,
            // On copie toutes les propriétés de 'filter'
            terms: termsCopy,
            // On utilise la copie modifiée des termes
            isAllButtonToggled
            // On met à jour la valeur de 'isAllButtonToggled'
          };
        }
      });
      this.filterCpts();
    },
    toggleTermClicked(termName, innerFilter) {
      let termsCopy = innerFilter.terms.map((term) => {
        let termCopy = { ...term };
        if (termCopy.name === termName) {
          termCopy.active = !termCopy.active;
        }
        return termCopy;
      });
      return termsCopy;
    },
    checkIfAnyTermActive(termsCopy) {
      let activeTermFound = termsCopy.find((term) => term.active);
      let isAllButtonToggled = activeTermFound === void 0 ? true : false;
      return isAllButtonToggled;
    },
    incrementmaxDisplayable() {
      this.maxDisplayable = this.maxDisplayable + this.incrementNumber;
      this.displayed = 0;
      this.cpts.forEach((cpt) => {
        if (this.displayed < this.maxDisplayable) {
          if (cpt.show) {
            cpt.display = true;
            this.displayed++;
          }
        }
      });
      this.hasMoreContent = this.displayed < this.displayablePosts;
    },
    toggleAllToTrueInFilter(innerFilter) {
      let termsCopy = innerFilter.terms.map((term) => {
        let termCopy = { ...term };
        termCopy.active = false;
        return termCopy;
      });
      let isAllButtonToggled = true;
      return {
        ...innerFilter,
        // On copie toutes les propriétés de 'filter'
        terms: termsCopy,
        // On utilise la copie modifiée des termes
        isAllButtonToggled
        // On met à jour la valeur de 'isAllButtonToggled'
      };
    },
    recordOriginalCpts() {
      this.originalCpts = JSON.parse(JSON.stringify(this.cpts));
    },
    setMaxDisplayablePosts(value) {
      this.maxDisplayable = parseInt(value);
    },
    setIncrementNumber(value) {
      this.incrementNumber = parseInt(value);
    },
    userSearchOrDeleteKeyword(keyword) {
      this.lastKeyword = keyword;
      this.displayed = 0;
      this.displayablePosts = 0;
      this.cpts.forEach((cpt) => {
        const title = cpt.title.toLowerCase();
        const checkMatch = (input) => he.decode(input.toLowerCase()).includes(keyword.toLowerCase());
        const checkAcfFields = (acf) => {
          for (const key in acf) {
            if (acf[key] && typeof acf[key] === "string" && checkMatch(acf[key])) {
              return true;
            }
          }
          return false;
        };
        const checkTerms = (terms) => {
          for (const key in terms) {
            const termsArray = Array.from(terms[key]);
            for (let i = 0; i < termsArray.length; i++) {
              if (checkMatch(termsArray[i])) {
                return true;
              }
            }
          }
          return false;
        };
        const termFound = cpt.terms ? checkTerms(cpt.terms) : false;
        let match = checkMatch(title) || checkAcfFields(cpt.acf) || termFound;
        if (match) {
          this.displayablePosts++;
        }
        cpt.display = match;
        this.displayed++;
      });
      this.maxDisplayable = this.displayed;
      this.hasMoreContent = this.displayed < this.displayablePosts;
    },
    filterElementsByKeyword(keyword) {
      this.displayed = 0;
      this.displayablePosts = 0;
      console.log("filtre par mots clés : ", keyword);
      if (this.lastKeyword.length < keyword.length) {
        console.log("lutilisateur affine");
        this.userSearchOrDeleteKeyword(keyword);
      } else {
        console.log("lutilisateur efface");
        this.lastKeyword = keyword;
        const isAnyTermActive = this.isAnyTermActive();
        if (isAnyTermActive) {
          this.cpts = JSON.parse(JSON.stringify(this.filteredCpts));
        } else {
          this.cpts = JSON.parse(JSON.stringify(this.originalCpts));
        }
        if (keyword === "") {
          console.log("le champ est de nouveau vide");
          this.cpts.forEach((cpt) => {
            if (cpt.show) {
              this.displayPostAccordingMaxDisplayable(cpt);
            }
          });
          this.hasMoreContent = this.displayed < this.displayablePosts;
          return;
        } else {
          console.log("l'utilisateur efface mais le champ n'est pas vide");
          this.userSearchOrDeleteKeyword(keyword);
        }
      }
    },
    isAnyTermActive() {
      return this.filters.some((filter) => {
        return filter.terms.some((term) => term.active === true);
      });
    },
    /**
     * Filtre les custom post types (CPTs) en fonction des taxonomies actives et des termes sélectionnés.
     *
     * Voici comment fonctionne cette méthode :
     *
     * Pour chaque CPT, elle passe en revue chaque filtre (lié à une taxonomie).
     * Pour chaque filtre, elle vérifie si le bouton "Tout" est activé et si un ou plusieurs des termes actifs du filtre sont présents dans le CPT.
     *
     * Après avoir vérifié tous les filtres pour un CPT donné, elle vérifie si tous les boutons "Tout" des filtres sont activés ou si tous les filtres actifs sont satisfaits.
     * Si l'une de ces conditions est vraie, le CPT est marqué comme devant être affiché (cpt.show = true).
     *
     * Ensuite, elle met à jour les compteurs de posts affichables et affichés (this.displayablePosts et this.displayed),
     * ainsi que l'indicateur signalant s'il reste encore du contenu à afficher (this.hasMoreContent).
     *
     * Enfin, elle enregistre les CPTs filtrés pour une utilisation ultérieure (this.recordFilteredCpts()).
     */
    filterCpts() {
      this.displayablePosts = 0;
      this.displayed = 0;
      this.cpts.forEach((cpt) => {
        let termsActiveInFilters = {};
        let isAllButtonToggledInFilters = {};
        this.filters.forEach((innerFilter) => {
          const currentTaxonomy = innerFilter.taxonomy;
          isAllButtonToggledInFilters[currentTaxonomy] = innerFilter.isAllButtonToggled;
          if (cpt[currentTaxonomy]) {
            const termsIdsInCpt = Array.from(cpt[currentTaxonomy]);
            const activeTerms = innerFilter.terms.filter((term) => term.active);
            termsActiveInFilters[currentTaxonomy] = activeTerms.every(
              (term) => termsIdsInCpt.includes(term.term_id)
            );
          } else {
            termsActiveInFilters[currentTaxonomy] = false;
          }
        });
        const allButtonsToggled = Object.values(
          isAllButtonToggledInFilters
        ).every((toggled) => toggled);
        const allActiveFiltersSatisfied = Object.keys(
          termsActiveInFilters
        ).every(
          (taxonomy) => isAllButtonToggledInFilters[taxonomy] || termsActiveInFilters[taxonomy]
        );
        if (allButtonsToggled || allActiveFiltersSatisfied) {
          cpt.show = true;
          cpt.display = true;
          this.displayablePosts++;
          this.displayed++;
        } else {
          cpt.show = false;
        }
        this.hasMoreContent = this.displayed < this.displayablePosts;
        this.recordFilteredCpts();
      });
      this.maxDisplayable = this.displayed;
    },
    recordFilteredCpts() {
      this.filteredCpts = JSON.parse(JSON.stringify(this.cpts));
    }
  }
};
const _hoisted_1 = { class: "results" };
const _hoisted_2 = { class: "load-more-container" };
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("path", {
  class: "load-more-path",
  id: "Tracé_342",
  "data-name": "Tracé 342",
  d: "M65.823.109c49.139-1.819,49.813.766,84.042,2.584S179.388.16,194.784,7.383s7.607,26.36,1.449,33.947-12.86,7.938-44.195,7.938-47.884-1.424-79.333-2.588c-49.139-1.819-48.5,4.474-66.654-5.35s-7.97-33.03,0-38.637S16.684,1.927,65.823.109Z",
  transform: "translate(4.095 0.511)",
  fill: "#c5191b"
}, null, -1);
const _hoisted_4 = [
  _hoisted_3
];
const _hoisted_5 = { class: "loader-container" };
const _hoisted_6 = /* @__PURE__ */ createBaseVNode("div", { class: "lds-ripple" }, [
  /* @__PURE__ */ createBaseVNode("div", { class: "1" }),
  /* @__PURE__ */ createBaseVNode("div", { class: "2" })
], -1);
const _hoisted_7 = [
  _hoisted_6
];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_FiltersCpts = resolveComponent("FiltersCpts");
  const _component_RecetteExtrait = resolveComponent("RecetteExtrait");
  return openBlock(), createElementBlock(Fragment, null, [
    withDirectives(createVNode(_component_FiltersCpts, {
      onHandleClick: $options.handleClick,
      onFilterElementsByKeyword: $options.filterElementsByKeyword,
      filters: _ctx.filters,
      champs_texte_pour_affiner: $data.dataJson.champs_texte_pour_affiner,
      type_de_filtre: $data.dataJson.type_de_filtre,
      texte_pour_le_label_1: $data.dataJson.texte_pour_le_label_1,
      texte_pour_le_label_2: $data.dataJson.texte_pour_le_label_2,
      texte_pour_le_label_3: $data.dataJson.texte_pour_le_label_3,
      texte_pour_le_label_4: $data.dataJson.texte_pour_le_label_4,
      texte_tous_les_filtres_1: $data.dataJson.texte_tous_les_filtres_1,
      texte_tous_les_filtres_2: $data.dataJson.texte_tous_les_filtres_2,
      texte_tous_les_filtres_3: $data.dataJson.texte_tous_les_filtres_3,
      texte_tous_les_filtres_4: $data.dataJson.texte_tous_les_filtres_4
    }, null, 8, ["onHandleClick", "onFilterElementsByKeyword", "filters", "champs_texte_pour_affiner", "type_de_filtre", "texte_pour_le_label_1", "texte_pour_le_label_2", "texte_pour_le_label_3", "texte_pour_le_label_4", "texte_tous_les_filtres_1", "texte_tous_les_filtres_2", "texte_tous_les_filtres_3", "texte_tous_les_filtres_4"]), [
      [vShow, _ctx.isLoaded]
    ]),
    withDirectives(createBaseVNode("div", {
      class: normalizeClass(_ctx.extraitPaddingTop)
    }, [
      createBaseVNode("div", _hoisted_1, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.cpts, (cpt) => {
          return withDirectives((openBlock(), createBlock(_component_RecetteExtrait, {
            class: "cpt-extrait",
            key: cpt.id,
            cpt,
            texte_bandeau_nouveau: $data.dataJson.texte_bandeau_nouveau,
            texte_en_savoir_plus: $data.dataJson.texte_en_savoir_plus,
            texte_pour_le_bandeau_de_nouvelle_formation: $data.dataJson.texte_pour_le_bandeau_de_nouvelle_formation,
            filters: _ctx.filters
          }, null, 8, ["cpt", "texte_bandeau_nouveau", "texte_en_savoir_plus", "texte_pour_le_bandeau_de_nouvelle_formation", "filters"])), [
            [vShow, cpt.show && cpt.display]
          ]);
        }), 128))
      ]),
      createBaseVNode("div", _hoisted_2, [
        _ctx.hasMoreContent ? (openBlock(), createElementBlock("div", {
          key: 0,
          onClick: _cache[0] || (_cache[0] = (...args) => $options.incrementmaxDisplayable && $options.incrementmaxDisplayable(...args)),
          class: "load-more"
        }, toDisplayString($data.dataJson.load_more_text), 1)) : createCommentVNode("", true),
        _ctx.hasMoreContent ? (openBlock(), createElementBlock("svg", {
          key: 1,
          onClick: _cache[1] || (_cache[1] = (...args) => $options.incrementmaxDisplayable && $options.incrementmaxDisplayable(...args)),
          class: "load-more-svg",
          xmlns: "http://www.w3.org/2000/svg",
          width: "207.852",
          height: "49.779",
          viewBox: "0 0 207.852 49.779"
        }, _hoisted_4)) : createCommentVNode("", true)
      ])
    ], 2), [
      [vShow, _ctx.isLoaded]
    ]),
    withDirectives(createBaseVNode("div", _hoisted_5, _hoisted_7, 512), [
      [vShow, !_ctx.isLoaded]
    ])
  ], 64);
}
const ShowCpt = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const App_vue_vue_type_style_index_0_lang = "";
const _sfc_main = {
  name: "App",
  components: {
    ShowCpt
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ShowCpt = resolveComponent("ShowCpt");
  return openBlock(), createBlock(_component_ShowCpt);
}
const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
const main = "";
const app = createApp(App);
app.mount("#app");
//# sourceMappingURL=index.js.map
