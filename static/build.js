/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/static/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _vue = __webpack_require__(7);

	var _vue2 = _interopRequireDefault(_vue);

	var _vueRouter = __webpack_require__(75);

	var _vueRouter2 = _interopRequireDefault(_vueRouter);

	var _filters = __webpack_require__(76);

	var _App = __webpack_require__(77);

	var _App2 = _interopRequireDefault(_App);

	var _NewsView = __webpack_require__(83);

	var _NewsView2 = _interopRequireDefault(_NewsView);

	var _ItemView = __webpack_require__(103);

	var _ItemView2 = _interopRequireDefault(_ItemView);

	var _UserView = __webpack_require__(113);

	var _UserView2 = _interopRequireDefault(_UserView);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_vue2.default.use(_vueRouter2.default);

	_vue2.default.filter('fromNow', _filters.fromNow);
	_vue2.default.filter('domain', _filters.domain);

	var router = new _vueRouter2.default();

	router.map({
	  '/news/:page': {
	    component: _NewsView2.default
	  },
	  '/user/:id': {
	    component: _UserView2.default
	  },
	  '/item/:id': {
	    component: _ItemView2.default
	  }
	});

	router.beforeEach(function () {
	  window.scrollTo(0, 0);
	});

	router.redirect({
	  '*': '/news/1'
	});

	router.start(_App2.default, '#app');

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(9)
	var extend = _.extend

	/**
	 * The exposed Vue constructor.
	 *
	 * API conventions:
	 * - public API methods/properties are prefiexed with `$`
	 * - internal methods/properties are prefixed with `_`
	 * - non-prefixed properties are assumed to be proxied user
	 *   data.
	 *
	 * @constructor
	 * @param {Object} [options]
	 * @public
	 */

	function Vue (options) {
	  this._init(options)
	}

	/**
	 * Mixin global API
	 */

	extend(Vue, __webpack_require__(21))

	/**
	 * Vue and every constructor that extends Vue has an
	 * associated options object, which can be accessed during
	 * compilation steps as `this.constructor.options`.
	 *
	 * These can be seen as the default options of every
	 * Vue instance.
	 */

	Vue.options = {
	  replace: true,
	  directives: __webpack_require__(24),
	  elementDirectives: __webpack_require__(58),
	  filters: __webpack_require__(61),
	  transitions: {},
	  components: {},
	  partials: {}
	}

	/**
	 * Build up the prototype
	 */

	var p = Vue.prototype

	/**
	 * $data has a setter which does a bunch of
	 * teardown/setup work
	 */

	Object.defineProperty(p, '$data', {
	  get: function () {
	    return this._data
	  },
	  set: function (newData) {
	    if (newData !== this._data) {
	      this._setData(newData)
	    }
	  }
	})

	/**
	 * Mixin internal instance methods
	 */

	extend(p, __webpack_require__(63))
	extend(p, __webpack_require__(64))
	extend(p, __webpack_require__(65))
	extend(p, __webpack_require__(68))
	extend(p, __webpack_require__(70))

	/**
	 * Mixin public API methods
	 */

	extend(p, __webpack_require__(71))
	extend(p, __webpack_require__(72))
	extend(p, __webpack_require__(73))
	extend(p, __webpack_require__(74))

	Vue.version = '1.0.8'
	module.exports = _.Vue = Vue

	/* istanbul ignore if */
	if (process.env.NODE_ENV !== 'production') {
	  if (_.inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
	    window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit('init', Vue)
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 8 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var lang = __webpack_require__(10)
	var extend = lang.extend

	extend(exports, lang)
	extend(exports, __webpack_require__(11))
	extend(exports, __webpack_require__(12))
	extend(exports, __webpack_require__(18))
	extend(exports, __webpack_require__(19))
	extend(exports, __webpack_require__(20))


/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * Set a property on an object. Adds the new property and
	 * triggers change notification if the property doesn't
	 * already exist.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @public
	 */

	exports.set = function set (obj, key, val) {
	  if (obj.hasOwnProperty(key)) {
	    obj[key] = val
	    return
	  }
	  if (obj._isVue) {
	    set(obj._data, key, val)
	    return
	  }
	  var ob = obj.__ob__
	  if (!ob) {
	    obj[key] = val
	    return
	  }
	  ob.convert(key, val)
	  ob.dep.notify()
	  if (ob.vms) {
	    var i = ob.vms.length
	    while (i--) {
	      var vm = ob.vms[i]
	      vm._proxy(key)
	      vm._digest()
	    }
	  }
	}

	/**
	 * Delete a property and trigger change if necessary.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 */

	exports.delete = function (obj, key) {
	  if (!obj.hasOwnProperty(key)) {
	    return
	  }
	  delete obj[key]
	  var ob = obj.__ob__
	  if (!ob) {
	    return
	  }
	  ob.dep.notify()
	  if (ob.vms) {
	    var i = ob.vms.length
	    while (i--) {
	      var vm = ob.vms[i]
	      vm._unproxy(key)
	      vm._digest()
	    }
	  }
	}

	/**
	 * Check if an expression is a literal value.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */

	var literalValueRE = /^\s?(true|false|[\d\.]+|'[^']*'|"[^"]*")\s?$/
	exports.isLiteral = function (exp) {
	  return literalValueRE.test(exp)
	}

	/**
	 * Check if a string starts with $ or _
	 *
	 * @param {String} str
	 * @return {Boolean}
	 */

	exports.isReserved = function (str) {
	  var c = (str + '').charCodeAt(0)
	  return c === 0x24 || c === 0x5F
	}

	/**
	 * Guard text output, make sure undefined outputs
	 * empty string
	 *
	 * @param {*} value
	 * @return {String}
	 */

	exports.toString = function (value) {
	  return value == null
	    ? ''
	    : value.toString()
	}

	/**
	 * Check and convert possible numeric strings to numbers
	 * before setting back to data
	 *
	 * @param {*} value
	 * @return {*|Number}
	 */

	exports.toNumber = function (value) {
	  if (typeof value !== 'string') {
	    return value
	  } else {
	    var parsed = Number(value)
	    return isNaN(parsed)
	      ? value
	      : parsed
	  }
	}

	/**
	 * Convert string boolean literals into real booleans.
	 *
	 * @param {*} value
	 * @return {*|Boolean}
	 */

	exports.toBoolean = function (value) {
	  return value === 'true'
	    ? true
	    : value === 'false'
	      ? false
	      : value
	}

	/**
	 * Strip quotes from a string
	 *
	 * @param {String} str
	 * @return {String | false}
	 */

	exports.stripQuotes = function (str) {
	  var a = str.charCodeAt(0)
	  var b = str.charCodeAt(str.length - 1)
	  return a === b && (a === 0x22 || a === 0x27)
	    ? str.slice(1, -1)
	    : str
	}

	/**
	 * Camelize a hyphen-delmited string.
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var camelizeRE = /-(\w)/g
	exports.camelize = function (str) {
	  return str.replace(camelizeRE, toUpper)
	}

	function toUpper (_, c) {
	  return c ? c.toUpperCase() : ''
	}

	/**
	 * Hyphenate a camelCase string.
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var hyphenateRE = /([a-z\d])([A-Z])/g
	exports.hyphenate = function (str) {
	  return str
	    .replace(hyphenateRE, '$1-$2')
	    .toLowerCase()
	}

	/**
	 * Converts hyphen/underscore/slash delimitered names into
	 * camelized classNames.
	 *
	 * e.g. my-component => MyComponent
	 *      some_else    => SomeElse
	 *      some/comp    => SomeComp
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var classifyRE = /(?:^|[-_\/])(\w)/g
	exports.classify = function (str) {
	  return str.replace(classifyRE, toUpper)
	}

	/**
	 * Simple bind, faster than native
	 *
	 * @param {Function} fn
	 * @param {Object} ctx
	 * @return {Function}
	 */

	exports.bind = function (fn, ctx) {
	  return function (a) {
	    var l = arguments.length
	    return l
	      ? l > 1
	        ? fn.apply(ctx, arguments)
	        : fn.call(ctx, a)
	      : fn.call(ctx)
	  }
	}

	/**
	 * Convert an Array-like object to a real Array.
	 *
	 * @param {Array-like} list
	 * @param {Number} [start] - start index
	 * @return {Array}
	 */

	exports.toArray = function (list, start) {
	  start = start || 0
	  var i = list.length - start
	  var ret = new Array(i)
	  while (i--) {
	    ret[i] = list[i + start]
	  }
	  return ret
	}

	/**
	 * Mix properties into target object.
	 *
	 * @param {Object} to
	 * @param {Object} from
	 */

	exports.extend = function (to, from) {
	  var keys = Object.keys(from)
	  var i = keys.length
	  while (i--) {
	    to[keys[i]] = from[keys[i]]
	  }
	  return to
	}

	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	exports.isObject = function (obj) {
	  return obj !== null && typeof obj === 'object'
	}

	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	var toString = Object.prototype.toString
	var OBJECT_STRING = '[object Object]'
	exports.isPlainObject = function (obj) {
	  return toString.call(obj) === OBJECT_STRING
	}

	/**
	 * Array type check.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	exports.isArray = Array.isArray

	/**
	 * Define a non-enumerable property
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @param {Boolean} [enumerable]
	 */

	exports.define = function (obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  })
	}

	/**
	 * Debounce a function so it only gets called after the
	 * input stops arriving after the given wait period.
	 *
	 * @param {Function} func
	 * @param {Number} wait
	 * @return {Function} - the debounced function
	 */

	exports.debounce = function (func, wait) {
	  var timeout, args, context, timestamp, result
	  var later = function () {
	    var last = Date.now() - timestamp
	    if (last < wait && last >= 0) {
	      timeout = setTimeout(later, wait - last)
	    } else {
	      timeout = null
	      result = func.apply(context, args)
	      if (!timeout) context = args = null
	    }
	  }
	  return function () {
	    context = this
	    args = arguments
	    timestamp = Date.now()
	    if (!timeout) {
	      timeout = setTimeout(later, wait)
	    }
	    return result
	  }
	}

	/**
	 * Manual indexOf because it's slightly faster than
	 * native.
	 *
	 * @param {Array} arr
	 * @param {*} obj
	 */

	exports.indexOf = function (arr, obj) {
	  var i = arr.length
	  while (i--) {
	    if (arr[i] === obj) return i
	  }
	  return -1
	}

	/**
	 * Make a cancellable version of an async callback.
	 *
	 * @param {Function} fn
	 * @return {Function}
	 */

	exports.cancellable = function (fn) {
	  var cb = function () {
	    if (!cb.cancelled) {
	      return fn.apply(this, arguments)
	    }
	  }
	  cb.cancel = function () {
	    cb.cancelled = true
	  }
	  return cb
	}

	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 *
	 * @param {*} a
	 * @param {*} b
	 * @return {Boolean}
	 */

	exports.looseEqual = function (a, b) {
	  /* eslint-disable eqeqeq */
	  return a == b || (
	    exports.isObject(a) && exports.isObject(b)
	      ? JSON.stringify(a) === JSON.stringify(b)
	      : false
	  )
	  /* eslint-enable eqeqeq */
	}


/***/ },
/* 11 */
/***/ function(module, exports) {

	// can we use __proto__?
	exports.hasProto = '__proto__' in {}

	// Browser environment sniffing
	var inBrowser = exports.inBrowser =
	  typeof window !== 'undefined' &&
	  Object.prototype.toString.call(window) !== '[object Object]'

	exports.isIE9 =
	  inBrowser &&
	  navigator.userAgent.toLowerCase().indexOf('msie 9.0') > 0

	exports.isAndroid =
	  inBrowser &&
	  navigator.userAgent.toLowerCase().indexOf('android') > 0

	// Transition property/event sniffing
	if (inBrowser && !exports.isIE9) {
	  var isWebkitTrans =
	    window.ontransitionend === undefined &&
	    window.onwebkittransitionend !== undefined
	  var isWebkitAnim =
	    window.onanimationend === undefined &&
	    window.onwebkitanimationend !== undefined
	  exports.transitionProp = isWebkitTrans
	    ? 'WebkitTransition'
	    : 'transition'
	  exports.transitionEndEvent = isWebkitTrans
	    ? 'webkitTransitionEnd'
	    : 'transitionend'
	  exports.animationProp = isWebkitAnim
	    ? 'WebkitAnimation'
	    : 'animation'
	  exports.animationEndEvent = isWebkitAnim
	    ? 'webkitAnimationEnd'
	    : 'animationend'
	}

	/**
	 * Defer a task to execute it asynchronously. Ideally this
	 * should be executed as a microtask, so we leverage
	 * MutationObserver if it's available, and fallback to
	 * setTimeout(0).
	 *
	 * @param {Function} cb
	 * @param {Object} ctx
	 */

	exports.nextTick = (function () {
	  var callbacks = []
	  var pending = false
	  var timerFunc
	  function nextTickHandler () {
	    pending = false
	    var copies = callbacks.slice(0)
	    callbacks = []
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]()
	    }
	  }
	  /* istanbul ignore if */
	  if (typeof MutationObserver !== 'undefined') {
	    var counter = 1
	    var observer = new MutationObserver(nextTickHandler)
	    var textNode = document.createTextNode(counter)
	    observer.observe(textNode, {
	      characterData: true
	    })
	    timerFunc = function () {
	      counter = (counter + 1) % 2
	      textNode.data = counter
	    }
	  } else {
	    timerFunc = setTimeout
	  }
	  return function (cb, ctx) {
	    var func = ctx
	      ? function () { cb.call(ctx) }
	      : cb
	    callbacks.push(func)
	    if (pending) return
	    pending = true
	    timerFunc(nextTickHandler, 0)
	  }
	})()


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(9)
	var config = __webpack_require__(13)
	var transition = __webpack_require__(17)

	/**
	 * Query an element selector if it's not an element already.
	 *
	 * @param {String|Element} el
	 * @return {Element}
	 */

	exports.query = function (el) {
	  if (typeof el === 'string') {
	    var selector = el
	    el = document.querySelector(el)
	    if (!el) {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'Cannot find element: ' + selector
	      )
	    }
	  }
	  return el
	}

	/**
	 * Check if a node is in the document.
	 * Note: document.documentElement.contains should work here
	 * but always returns false for comment nodes in phantomjs,
	 * making unit tests difficult. This is fixed by doing the
	 * contains() check on the node's parentNode instead of
	 * the node itself.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	exports.inDoc = function (node) {
	  var doc = document.documentElement
	  var parent = node && node.parentNode
	  return doc === node ||
	    doc === parent ||
	    !!(parent && parent.nodeType === 1 && (doc.contains(parent)))
	}

	/**
	 * Get and remove an attribute from a node.
	 *
	 * @param {Node} node
	 * @param {String} attr
	 */

	exports.attr = function (node, attr) {
	  var val = node.getAttribute(attr)
	  if (val !== null) {
	    node.removeAttribute(attr)
	  }
	  return val
	}

	/**
	 * Get an attribute with colon or v-bind: prefix.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {String|null}
	 */

	exports.getBindAttr = function (node, name) {
	  var val = exports.attr(node, ':' + name)
	  if (val === null) {
	    val = exports.attr(node, 'v-bind:' + name)
	  }
	  return val
	}

	/**
	 * Insert el before target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	exports.before = function (el, target) {
	  target.parentNode.insertBefore(el, target)
	}

	/**
	 * Insert el after target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	exports.after = function (el, target) {
	  if (target.nextSibling) {
	    exports.before(el, target.nextSibling)
	  } else {
	    target.parentNode.appendChild(el)
	  }
	}

	/**
	 * Remove el from DOM
	 *
	 * @param {Element} el
	 */

	exports.remove = function (el) {
	  el.parentNode.removeChild(el)
	}

	/**
	 * Prepend el to target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	exports.prepend = function (el, target) {
	  if (target.firstChild) {
	    exports.before(el, target.firstChild)
	  } else {
	    target.appendChild(el)
	  }
	}

	/**
	 * Replace target with el
	 *
	 * @param {Element} target
	 * @param {Element} el
	 */

	exports.replace = function (target, el) {
	  var parent = target.parentNode
	  if (parent) {
	    parent.replaceChild(el, target)
	  }
	}

	/**
	 * Add event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 */

	exports.on = function (el, event, cb) {
	  el.addEventListener(event, cb)
	}

	/**
	 * Remove event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 */

	exports.off = function (el, event, cb) {
	  el.removeEventListener(event, cb)
	}

	/**
	 * Add class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {Strong} cls
	 */

	exports.addClass = function (el, cls) {
	  if (el.classList) {
	    el.classList.add(cls)
	  } else {
	    var cur = ' ' + (el.getAttribute('class') || '') + ' '
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      el.setAttribute('class', (cur + cls).trim())
	    }
	  }
	}

	/**
	 * Remove class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {Strong} cls
	 */

	exports.removeClass = function (el, cls) {
	  if (el.classList) {
	    el.classList.remove(cls)
	  } else {
	    var cur = ' ' + (el.getAttribute('class') || '') + ' '
	    var tar = ' ' + cls + ' '
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ')
	    }
	    el.setAttribute('class', cur.trim())
	  }
	  if (!el.className) {
	    el.removeAttribute('class')
	  }
	}

	/**
	 * Extract raw content inside an element into a temporary
	 * container div
	 *
	 * @param {Element} el
	 * @param {Boolean} asFragment
	 * @return {Element}
	 */

	exports.extractContent = function (el, asFragment) {
	  var child
	  var rawContent
	  /* istanbul ignore if */
	  if (
	    exports.isTemplate(el) &&
	    el.content instanceof DocumentFragment
	  ) {
	    el = el.content
	  }
	  if (el.hasChildNodes()) {
	    exports.trimNode(el)
	    rawContent = asFragment
	      ? document.createDocumentFragment()
	      : document.createElement('div')
	    /* eslint-disable no-cond-assign */
	    while (child = el.firstChild) {
	    /* eslint-enable no-cond-assign */
	      rawContent.appendChild(child)
	    }
	  }
	  return rawContent
	}

	/**
	 * Trim possible empty head/tail textNodes inside a parent.
	 *
	 * @param {Node} node
	 */

	exports.trimNode = function (node) {
	  trim(node, node.firstChild)
	  trim(node, node.lastChild)
	}

	function trim (parent, node) {
	  if (node && node.nodeType === 3 && !node.data.trim()) {
	    parent.removeChild(node)
	  }
	}

	/**
	 * Check if an element is a template tag.
	 * Note if the template appears inside an SVG its tagName
	 * will be in lowercase.
	 *
	 * @param {Element} el
	 */

	exports.isTemplate = function (el) {
	  return el.tagName &&
	    el.tagName.toLowerCase() === 'template'
	}

	/**
	 * Create an "anchor" for performing dom insertion/removals.
	 * This is used in a number of scenarios:
	 * - fragment instance
	 * - v-html
	 * - v-if
	 * - v-for
	 * - component
	 *
	 * @param {String} content
	 * @param {Boolean} persist - IE trashes empty textNodes on
	 *                            cloneNode(true), so in certain
	 *                            cases the anchor needs to be
	 *                            non-empty to be persisted in
	 *                            templates.
	 * @return {Comment|Text}
	 */

	exports.createAnchor = function (content, persist) {
	  var anchor = config.debug
	    ? document.createComment(content)
	    : document.createTextNode(persist ? ' ' : '')
	  anchor.__vue_anchor = true
	  return anchor
	}

	/**
	 * Find a component ref attribute that starts with $.
	 *
	 * @param {Element} node
	 * @return {String|undefined}
	 */

	var refRE = /^v-ref:/
	exports.findRef = function (node) {
	  if (node.hasAttributes()) {
	    var attrs = node.attributes
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      var name = attrs[i].name
	      if (refRE.test(name)) {
	        return _.camelize(name.replace(refRE, ''))
	      }
	    }
	  }
	}

	/**
	 * Map a function to a range of nodes .
	 *
	 * @param {Node} node
	 * @param {Node} end
	 * @param {Function} op
	 */

	exports.mapNodeRange = function (node, end, op) {
	  var next
	  while (node !== end) {
	    next = node.nextSibling
	    op(node)
	    node = next
	  }
	  op(end)
	}

	/**
	 * Remove a range of nodes with transition, store
	 * the nodes in a fragment with correct ordering,
	 * and call callback when done.
	 *
	 * @param {Node} start
	 * @param {Node} end
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Function} cb
	 */

	exports.removeNodeRange = function (start, end, vm, frag, cb) {
	  var done = false
	  var removed = 0
	  var nodes = []
	  exports.mapNodeRange(start, end, function (node) {
	    if (node === end) done = true
	    nodes.push(node)
	    transition.remove(node, vm, onRemoved)
	  })
	  function onRemoved () {
	    removed++
	    if (done && removed >= nodes.length) {
	      for (var i = 0; i < nodes.length; i++) {
	        frag.appendChild(nodes[i])
	      }
	      cb && cb()
	    }
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {

	  /**
	   * Whether to print debug messages.
	   * Also enables stack trace for warnings.
	   *
	   * @type {Boolean}
	   */

	  debug: false,

	  /**
	   * Whether to suppress warnings.
	   *
	   * @type {Boolean}
	   */

	  silent: false,

	  /**
	   * Whether to use async rendering.
	   */

	  async: true,

	  /**
	   * Whether to warn against errors caught when evaluating
	   * expressions.
	   */

	  warnExpressionErrors: true,

	  /**
	   * Whether or not to handle fully object properties which
	   * are already backed by getters and seters. Depending on
	   * use case and environment, this might introduce non-neglible
	   * performance penalties.
	   */
	  convertAllProperties: false,

	  /**
	   * Internal flag to indicate the delimiters have been
	   * changed.
	   *
	   * @type {Boolean}
	   */

	  _delimitersChanged: true,

	  /**
	   * List of asset types that a component can own.
	   *
	   * @type {Array}
	   */

	  _assetTypes: [
	    'component',
	    'directive',
	    'elementDirective',
	    'filter',
	    'transition',
	    'partial'
	  ],

	  /**
	   * prop binding modes
	   */

	  _propBindingModes: {
	    ONE_WAY: 0,
	    TWO_WAY: 1,
	    ONE_TIME: 2
	  },

	  /**
	   * Max circular updates allowed in a batcher flush cycle.
	   */

	  _maxUpdateCount: 100

	}

	/**
	 * Interpolation delimiters. Changing these would trigger
	 * the text parser to re-compile the regular expressions.
	 *
	 * @type {Array<String>}
	 */

	var delimiters = ['{{', '}}']
	var unsafeDelimiters = ['{{{', '}}}']
	var textParser = __webpack_require__(14)

	Object.defineProperty(module.exports, 'delimiters', {
	  get: function () {
	    return delimiters
	  },
	  set: function (val) {
	    delimiters = val
	    textParser.compileRegex()
	  }
	})

	Object.defineProperty(module.exports, 'unsafeDelimiters', {
	  get: function () {
	    return unsafeDelimiters
	  },
	  set: function (val) {
	    unsafeDelimiters = val
	    textParser.compileRegex()
	  }
	})


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var Cache = __webpack_require__(15)
	var config = __webpack_require__(13)
	var dirParser = __webpack_require__(16)
	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g
	var cache, tagRE, htmlRE

	/**
	 * Escape a string so it can be used in a RegExp
	 * constructor.
	 *
	 * @param {String} str
	 */

	function escapeRegex (str) {
	  return str.replace(regexEscapeRE, '\\$&')
	}

	exports.compileRegex = function () {
	  var open = escapeRegex(config.delimiters[0])
	  var close = escapeRegex(config.delimiters[1])
	  var unsafeOpen = escapeRegex(config.unsafeDelimiters[0])
	  var unsafeClose = escapeRegex(config.unsafeDelimiters[1])
	  tagRE = new RegExp(
	    unsafeOpen + '(.+?)' + unsafeClose + '|' +
	    open + '(.+?)' + close,
	    'g'
	  )
	  htmlRE = new RegExp(
	    '^' + unsafeOpen + '.*' + unsafeClose + '$'
	  )
	  // reset cache
	  cache = new Cache(1000)
	}

	/**
	 * Parse a template text string into an array of tokens.
	 *
	 * @param {String} text
	 * @return {Array<Object> | null}
	 *               - {String} type
	 *               - {String} value
	 *               - {Boolean} [html]
	 *               - {Boolean} [oneTime]
	 */

	exports.parse = function (text) {
	  if (!cache) {
	    exports.compileRegex()
	  }
	  var hit = cache.get(text)
	  if (hit) {
	    return hit
	  }
	  text = text.replace(/\n/g, '')
	  if (!tagRE.test(text)) {
	    return null
	  }
	  var tokens = []
	  var lastIndex = tagRE.lastIndex = 0
	  var match, index, html, value, first, oneTime
	  /* eslint-disable no-cond-assign */
	  while (match = tagRE.exec(text)) {
	  /* eslint-enable no-cond-assign */
	    index = match.index
	    // push text token
	    if (index > lastIndex) {
	      tokens.push({
	        value: text.slice(lastIndex, index)
	      })
	    }
	    // tag token
	    html = htmlRE.test(match[0])
	    value = html ? match[1] : match[2]
	    first = value.charCodeAt(0)
	    oneTime = first === 42 // *
	    value = oneTime
	      ? value.slice(1)
	      : value
	    tokens.push({
	      tag: true,
	      value: value.trim(),
	      html: html,
	      oneTime: oneTime
	    })
	    lastIndex = index + match[0].length
	  }
	  if (lastIndex < text.length) {
	    tokens.push({
	      value: text.slice(lastIndex)
	    })
	  }
	  cache.put(text, tokens)
	  return tokens
	}

	/**
	 * Format a list of tokens into an expression.
	 * e.g. tokens parsed from 'a {{b}} c' can be serialized
	 * into one single expression as '"a " + b + " c"'.
	 *
	 * @param {Array} tokens
	 * @return {String}
	 */

	exports.tokensToExp = function (tokens) {
	  if (tokens.length > 1) {
	    return tokens.map(function (token) {
	      return formatToken(token)
	    }).join('+')
	  } else {
	    return formatToken(tokens[0], true)
	  }
	}

	/**
	 * Format a single token.
	 *
	 * @param {Object} token
	 * @param {Boolean} single
	 * @return {String}
	 */

	function formatToken (token, single) {
	  return token.tag
	    ? inlineFilters(token.value, single)
	    : '"' + token.value + '"'
	}

	/**
	 * For an attribute with multiple interpolation tags,
	 * e.g. attr="some-{{thing | filter}}", in order to combine
	 * the whole thing into a single watchable expression, we
	 * have to inline those filters. This function does exactly
	 * that. This is a bit hacky but it avoids heavy changes
	 * to directive parser and watcher mechanism.
	 *
	 * @param {String} exp
	 * @param {Boolean} single
	 * @return {String}
	 */

	var filterRE = /[^|]\|[^|]/
	function inlineFilters (exp, single) {
	  if (!filterRE.test(exp)) {
	    return single
	      ? exp
	      : '(' + exp + ')'
	  } else {
	    var dir = dirParser.parse(exp)
	    if (!dir.filters) {
	      return '(' + exp + ')'
	    } else {
	      return 'this._applyFilters(' +
	        dir.expression + // value
	        ',null,' +       // oldValue (null for read)
	        JSON.stringify(dir.filters) + // filter descriptors
	        ',false)'        // write?
	    }
	  }
	}


/***/ },
/* 15 */
/***/ function(module, exports) {

	/**
	 * A doubly linked list-based Least Recently Used (LRU)
	 * cache. Will keep most recently used items while
	 * discarding least recently used items when its limit is
	 * reached. This is a bare-bone version of
	 * Rasmus Andersson's js-lru:
	 *
	 *   https://github.com/rsms/js-lru
	 *
	 * @param {Number} limit
	 * @constructor
	 */

	function Cache (limit) {
	  this.size = 0
	  this.limit = limit
	  this.head = this.tail = undefined
	  this._keymap = Object.create(null)
	}

	var p = Cache.prototype

	/**
	 * Put <value> into the cache associated with <key>.
	 * Returns the entry which was removed to make room for
	 * the new entry. Otherwise undefined is returned.
	 * (i.e. if there was enough room already).
	 *
	 * @param {String} key
	 * @param {*} value
	 * @return {Entry|undefined}
	 */

	p.put = function (key, value) {
	  var entry = {
	    key: key,
	    value: value
	  }
	  this._keymap[key] = entry
	  if (this.tail) {
	    this.tail.newer = entry
	    entry.older = this.tail
	  } else {
	    this.head = entry
	  }
	  this.tail = entry
	  if (this.size === this.limit) {
	    return this.shift()
	  } else {
	    this.size++
	  }
	}

	/**
	 * Purge the least recently used (oldest) entry from the
	 * cache. Returns the removed entry or undefined if the
	 * cache was empty.
	 */

	p.shift = function () {
	  var entry = this.head
	  if (entry) {
	    this.head = this.head.newer
	    this.head.older = undefined
	    entry.newer = entry.older = undefined
	    this._keymap[entry.key] = undefined
	  }
	  return entry
	}

	/**
	 * Get and register recent use of <key>. Returns the value
	 * associated with <key> or undefined if not in cache.
	 *
	 * @param {String} key
	 * @param {Boolean} returnEntry
	 * @return {Entry|*}
	 */

	p.get = function (key, returnEntry) {
	  var entry = this._keymap[key]
	  if (entry === undefined) return
	  if (entry === this.tail) {
	    return returnEntry
	      ? entry
	      : entry.value
	  }
	  // HEAD--------------TAIL
	  //   <.older   .newer>
	  //  <--- add direction --
	  //   A  B  C  <D>  E
	  if (entry.newer) {
	    if (entry === this.head) {
	      this.head = entry.newer
	    }
	    entry.newer.older = entry.older // C <-- E.
	  }
	  if (entry.older) {
	    entry.older.newer = entry.newer // C. --> E
	  }
	  entry.newer = undefined // D --x
	  entry.older = this.tail // D. --> E
	  if (this.tail) {
	    this.tail.newer = entry // E. <-- D
	  }
	  this.tail = entry
	  return returnEntry
	    ? entry
	    : entry.value
	}

	module.exports = Cache


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(9)
	var Cache = __webpack_require__(15)
	var cache = new Cache(1000)
	var filterTokenRE = /[^\s'"]+|'[^']*'|"[^"]*"/g
	var reservedArgRE = /^in$|^-?\d+/

	/**
	 * Parser state
	 */

	var str, dir
	var c, i, l, lastFilterIndex
	var inSingle, inDouble, curly, square, paren

	/**
	 * Push a filter to the current directive object
	 */

	function pushFilter () {
	  var exp = str.slice(lastFilterIndex, i).trim()
	  var filter
	  if (exp) {
	    filter = {}
	    var tokens = exp.match(filterTokenRE)
	    filter.name = tokens[0]
	    if (tokens.length > 1) {
	      filter.args = tokens.slice(1).map(processFilterArg)
	    }
	  }
	  if (filter) {
	    (dir.filters = dir.filters || []).push(filter)
	  }
	  lastFilterIndex = i + 1
	}

	/**
	 * Check if an argument is dynamic and strip quotes.
	 *
	 * @param {String} arg
	 * @return {Object}
	 */

	function processFilterArg (arg) {
	  if (reservedArgRE.test(arg)) {
	    return {
	      value: _.toNumber(arg),
	      dynamic: false
	    }
	  } else {
	    var stripped = _.stripQuotes(arg)
	    var dynamic = stripped === arg
	    return {
	      value: dynamic ? arg : stripped,
	      dynamic: dynamic
	    }
	  }
	}

	/**
	 * Parse a directive value and extract the expression
	 * and its filters into a descriptor.
	 *
	 * Example:
	 *
	 * "a + 1 | uppercase" will yield:
	 * {
	 *   expression: 'a + 1',
	 *   filters: [
	 *     { name: 'uppercase', args: null }
	 *   ]
	 * }
	 *
	 * @param {String} str
	 * @return {Object}
	 */

	exports.parse = function (s) {

	  var hit = cache.get(s)
	  if (hit) {
	    return hit
	  }

	  // reset parser state
	  str = s
	  inSingle = inDouble = false
	  curly = square = paren = 0
	  lastFilterIndex = 0
	  dir = {}

	  for (i = 0, l = str.length; i < l; i++) {
	    c = str.charCodeAt(i)
	    if (inSingle) {
	      // check single quote
	      if (c === 0x27) inSingle = !inSingle
	    } else if (inDouble) {
	      // check double quote
	      if (c === 0x22) inDouble = !inDouble
	    } else if (
	      c === 0x7C && // pipe
	      str.charCodeAt(i + 1) !== 0x7C &&
	      str.charCodeAt(i - 1) !== 0x7C
	    ) {
	      if (dir.expression == null) {
	        // first filter, end of expression
	        lastFilterIndex = i + 1
	        dir.expression = str.slice(0, i).trim()
	      } else {
	        // already has filter
	        pushFilter()
	      }
	    } else {
	      switch (c) {
	        case 0x22: inDouble = true; break // "
	        case 0x27: inSingle = true; break // '
	        case 0x28: paren++; break         // (
	        case 0x29: paren--; break         // )
	        case 0x5B: square++; break        // [
	        case 0x5D: square--; break        // ]
	        case 0x7B: curly++; break         // {
	        case 0x7D: curly--; break         // }
	      }
	    }
	  }

	  if (dir.expression == null) {
	    dir.expression = str.slice(0, i).trim()
	  } else if (lastFilterIndex !== 0) {
	    pushFilter()
	  }

	  cache.put(s, dir)
	  return dir
	}


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(9)

	/**
	 * Append with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	exports.append = function (el, target, vm, cb) {
	  apply(el, 1, function () {
	    target.appendChild(el)
	  }, vm, cb)
	}

	/**
	 * InsertBefore with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	exports.before = function (el, target, vm, cb) {
	  apply(el, 1, function () {
	    _.before(el, target)
	  }, vm, cb)
	}

	/**
	 * Remove with transition.
	 *
	 * @param {Element} el
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	exports.remove = function (el, vm, cb) {
	  apply(el, -1, function () {
	    _.remove(el)
	  }, vm, cb)
	}

	/**
	 * Apply transitions with an operation callback.
	 *
	 * @param {Element} el
	 * @param {Number} direction
	 *                  1: enter
	 *                 -1: leave
	 * @param {Function} op - the actual DOM operation
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	var apply = exports.apply = function (el, direction, op, vm, cb) {
	  var transition = el.__v_trans
	  if (
	    !transition ||
	    // skip if there are no js hooks and CSS transition is
	    // not supported
	    (!transition.hooks && !_.transitionEndEvent) ||
	    // skip transitions for initial compile
	    !vm._isCompiled ||
	    // if the vm is being manipulated by a parent directive
	    // during the parent's compilation phase, skip the
	    // animation.
	    (vm.$parent && !vm.$parent._isCompiled)
	  ) {
	    op()
	    if (cb) cb()
	    return
	  }
	  var action = direction > 0 ? 'enter' : 'leave'
	  transition[action](op, cb)
	}


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(9)
	var config = __webpack_require__(13)
	var extend = _.extend

	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 *
	 * All strategy functions follow the same signature:
	 *
	 * @param {*} parentVal
	 * @param {*} childVal
	 * @param {Vue} [vm]
	 */

	var strats = config.optionMergeStrategies = Object.create(null)

	/**
	 * Helper that recursively merges two data objects together.
	 */

	function mergeData (to, from) {
	  var key, toVal, fromVal
	  for (key in from) {
	    toVal = to[key]
	    fromVal = from[key]
	    if (!to.hasOwnProperty(key)) {
	      _.set(to, key, fromVal)
	    } else if (_.isObject(toVal) && _.isObject(fromVal)) {
	      mergeData(toVal, fromVal)
	    }
	  }
	  return to
	}

	/**
	 * Data
	 */

	strats.data = function (parentVal, childVal, vm) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal
	    }
	    if (typeof childVal !== 'function') {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'The "data" option should be a function ' +
	        'that returns a per-instance value in component ' +
	        'definitions.'
	      )
	      return parentVal
	    }
	    if (!parentVal) {
	      return childVal
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn () {
	      return mergeData(
	        childVal.call(this),
	        parentVal.call(this)
	      )
	    }
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn () {
	      // instance merge
	      var instanceData = typeof childVal === 'function'
	        ? childVal.call(vm)
	        : childVal
	      var defaultData = typeof parentVal === 'function'
	        ? parentVal.call(vm)
	        : undefined
	      if (instanceData) {
	        return mergeData(instanceData, defaultData)
	      } else {
	        return defaultData
	      }
	    }
	  }
	}

	/**
	 * El
	 */

	strats.el = function (parentVal, childVal, vm) {
	  if (!vm && childVal && typeof childVal !== 'function') {
	    process.env.NODE_ENV !== 'production' && _.warn(
	      'The "el" option should be a function ' +
	      'that returns a per-instance value in component ' +
	      'definitions.'
	    )
	    return
	  }
	  var ret = childVal || parentVal
	  // invoke the element factory if this is instance merge
	  return vm && typeof ret === 'function'
	    ? ret.call(vm)
	    : ret
	}

	/**
	 * Hooks and param attributes are merged as arrays.
	 */

	strats.init =
	strats.created =
	strats.ready =
	strats.attached =
	strats.detached =
	strats.beforeCompile =
	strats.compiled =
	strats.beforeDestroy =
	strats.destroyed = function (parentVal, childVal) {
	  return childVal
	    ? parentVal
	      ? parentVal.concat(childVal)
	      : _.isArray(childVal)
	        ? childVal
	        : [childVal]
	    : parentVal
	}

	/**
	 * 0.11 deprecation warning
	 */

	strats.paramAttributes = function () {
	  /* istanbul ignore next */
	  process.env.NODE_ENV !== 'production' && _.warn(
	    '"paramAttributes" option has been deprecated in 0.12. ' +
	    'Use "props" instead.'
	  )
	}

	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */

	function mergeAssets (parentVal, childVal) {
	  var res = Object.create(parentVal)
	  return childVal
	    ? extend(res, guardArrayAssets(childVal))
	    : res
	}

	config._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets
	})

	/**
	 * Events & Watchers.
	 *
	 * Events & watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */

	strats.watch =
	strats.events = function (parentVal, childVal) {
	  if (!childVal) return parentVal
	  if (!parentVal) return childVal
	  var ret = {}
	  extend(ret, parentVal)
	  for (var key in childVal) {
	    var parent = ret[key]
	    var child = childVal[key]
	    if (parent && !_.isArray(parent)) {
	      parent = [parent]
	    }
	    ret[key] = parent
	      ? parent.concat(child)
	      : [child]
	  }
	  return ret
	}

	/**
	 * Other object hashes.
	 */

	strats.props =
	strats.methods =
	strats.computed = function (parentVal, childVal) {
	  if (!childVal) return parentVal
	  if (!parentVal) return childVal
	  var ret = Object.create(null)
	  extend(ret, parentVal)
	  extend(ret, childVal)
	  return ret
	}

	/**
	 * Default strategy.
	 */

	var defaultStrat = function (parentVal, childVal) {
	  return childVal === undefined
	    ? parentVal
	    : childVal
	}

	/**
	 * Make sure component options get converted to actual
	 * constructors.
	 *
	 * @param {Object} options
	 */

	function guardComponents (options) {
	  if (options.components) {
	    var components = options.components =
	      guardArrayAssets(options.components)
	    var def
	    var ids = Object.keys(components)
	    for (var i = 0, l = ids.length; i < l; i++) {
	      var key = ids[i]
	      if (_.commonTagRE.test(key)) {
	        process.env.NODE_ENV !== 'production' && _.warn(
	          'Do not use built-in HTML elements as component ' +
	          'id: ' + key
	        )
	        continue
	      }
	      def = components[key]
	      if (_.isPlainObject(def)) {
	        components[key] = _.Vue.extend(def)
	      }
	    }
	  }
	}

	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 *
	 * @param {Object} options
	 */

	function guardProps (options) {
	  var props = options.props
	  var i, val
	  if (_.isArray(props)) {
	    options.props = {}
	    i = props.length
	    while (i--) {
	      val = props[i]
	      if (typeof val === 'string') {
	        options.props[val] = null
	      } else if (val.name) {
	        options.props[val.name] = val
	      }
	    }
	  } else if (_.isPlainObject(props)) {
	    var keys = Object.keys(props)
	    i = keys.length
	    while (i--) {
	      val = props[keys[i]]
	      if (typeof val === 'function') {
	        props[keys[i]] = { type: val }
	      }
	    }
	  }
	}

	/**
	 * Guard an Array-format assets option and converted it
	 * into the key-value Object format.
	 *
	 * @param {Object|Array} assets
	 * @return {Object}
	 */

	function guardArrayAssets (assets) {
	  if (_.isArray(assets)) {
	    var res = {}
	    var i = assets.length
	    var asset
	    while (i--) {
	      asset = assets[i]
	      var id = typeof asset === 'function'
	        ? ((asset.options && asset.options.name) || asset.id)
	        : (asset.name || asset.id)
	      if (!id) {
	        process.env.NODE_ENV !== 'production' && _.warn(
	          'Array-syntax assets must provide a "name" or "id" field.'
	        )
	      } else {
	        res[id] = asset
	      }
	    }
	    return res
	  }
	  return assets
	}

	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 *
	 * @param {Object} parent
	 * @param {Object} child
	 * @param {Vue} [vm] - if vm is present, indicates this is
	 *                     an instantiation merge.
	 */

	exports.mergeOptions = function merge (parent, child, vm) {
	  guardComponents(child)
	  guardProps(child)
	  var options = {}
	  var key
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      parent = merge(parent, child.mixins[i], vm)
	    }
	  }
	  for (key in parent) {
	    mergeField(key)
	  }
	  for (key in child) {
	    if (!(parent.hasOwnProperty(key))) {
	      mergeField(key)
	    }
	  }
	  function mergeField (key) {
	    var strat = strats[key] || defaultStrat
	    options[key] = strat(parent[key], child[key], vm, key)
	  }
	  return options
	}

	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 *
	 * @param {Object} options
	 * @param {String} type
	 * @param {String} id
	 * @return {Object|Function}
	 */

	exports.resolveAsset = function resolve (options, type, id) {
	  var assets = options[type]
	  var camelizedId
	  return assets[id] ||
	    // camelCase ID
	    assets[camelizedId = _.camelize(id)] ||
	    // Pascal Case ID
	    assets[camelizedId.charAt(0).toUpperCase() + camelizedId.slice(1)]
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(9)

	/**
	 * Check if an element is a component, if yes return its
	 * component id.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Object|undefined}
	 */

	exports.commonTagRE = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/
	exports.checkComponent = function (el, options) {
	  var tag = el.tagName.toLowerCase()
	  var hasAttrs = el.hasAttributes()
	  if (!exports.commonTagRE.test(tag) && tag !== 'component') {
	    if (_.resolveAsset(options, 'components', tag)) {
	      return { id: tag }
	    } else {
	      var is = hasAttrs && getIsBinding(el)
	      if (is) {
	        return is
	      } else if (process.env.NODE_ENV !== 'production') {
	        if (
	          tag.indexOf('-') > -1 ||
	          (
	            /HTMLUnknownElement/.test(el.toString()) &&
	            // Chrome returns unknown for several HTML5 elements.
	            // https://code.google.com/p/chromium/issues/detail?id=540526
	            !/^(data|time|rtc|rb)$/.test(tag)
	          )
	        ) {
	          _.warn(
	            'Unknown custom element: <' + tag + '> - did you ' +
	            'register the component correctly?'
	          )
	        }
	      }
	    }
	  } else if (hasAttrs) {
	    return getIsBinding(el)
	  }
	}

	/**
	 * Get "is" binding from an element.
	 *
	 * @param {Element} el
	 * @return {Object|undefined}
	 */

	function getIsBinding (el) {
	  // dynamic syntax
	  var exp = _.attr(el, 'is')
	  if (exp != null) {
	    return { id: exp }
	  } else {
	    exp = _.getBindAttr(el, 'is')
	    if (exp != null) {
	      return { id: exp, dynamic: true }
	    }
	  }
	}

	/**
	 * Set a prop's initial value on a vm and its data object.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} value
	 */

	exports.initProp = function (vm, prop, value) {
	  if (exports.assertProp(prop, value)) {
	    var key = prop.path
	    vm[key] = vm._data[key] = value
	  }
	}

	/**
	 * Assert whether a prop is valid.
	 *
	 * @param {Object} prop
	 * @param {*} value
	 */

	exports.assertProp = function (prop, value) {
	  // if a prop is not provided and is not required,
	  // skip the check.
	  if (prop.raw === null && !prop.required) {
	    return true
	  }
	  var options = prop.options
	  var type = options.type
	  var valid = true
	  var expectedType
	  if (type) {
	    if (type === String) {
	      expectedType = 'string'
	      valid = typeof value === expectedType
	    } else if (type === Number) {
	      expectedType = 'number'
	      valid = typeof value === 'number'
	    } else if (type === Boolean) {
	      expectedType = 'boolean'
	      valid = typeof value === 'boolean'
	    } else if (type === Function) {
	      expectedType = 'function'
	      valid = typeof value === 'function'
	    } else if (type === Object) {
	      expectedType = 'object'
	      valid = _.isPlainObject(value)
	    } else if (type === Array) {
	      expectedType = 'array'
	      valid = _.isArray(value)
	    } else {
	      valid = value instanceof type
	    }
	  }
	  if (!valid) {
	    process.env.NODE_ENV !== 'production' && _.warn(
	      'Invalid prop: type check failed for ' +
	      prop.path + '="' + prop.raw + '".' +
	      ' Expected ' + formatType(expectedType) +
	      ', got ' + formatValue(value) + '.'
	    )
	    return false
	  }
	  var validator = options.validator
	  if (validator) {
	    if (!validator.call(null, value)) {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'Invalid prop: custom validator check failed for ' +
	        prop.path + '="' + prop.raw + '"'
	      )
	      return false
	    }
	  }
	  return true
	}

	function formatType (val) {
	  return val
	    ? val.charAt(0).toUpperCase() + val.slice(1)
	    : 'custom type'
	}

	function formatValue (val) {
	  return Object.prototype.toString.call(val).slice(8, -1)
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Enable debug utilities.
	 */

	if (process.env.NODE_ENV !== 'production') {

	  var config = __webpack_require__(13)
	  var hasConsole = typeof console !== 'undefined'

	  /**
	   * Log a message.
	   *
	   * @param {String} msg
	   */

	  exports.log = function (msg) {
	    if (hasConsole && config.debug) {
	      console.log('[Vue info]: ' + msg)
	    }
	  }

	  /**
	   * We've got a problem here.
	   *
	   * @param {String} msg
	   */

	  exports.warn = function (msg, e) {
	    if (hasConsole && (!config.silent || config.debug)) {
	      console.warn('[Vue warn]: ' + msg)
	      /* istanbul ignore if */
	      if (config.debug) {
	        console.warn((e || new Error('Warning Stack Trace')).stack)
	      }
	    }
	  }

	  /**
	   * Assert asset exists
	   */

	  exports.assertAsset = function (val, type, id) {
	    if (!val) {
	      exports.warn('Failed to resolve ' + type + ': ' + id)
	    }
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(9)
	var config = __webpack_require__(13)

	/**
	 * Expose useful internals
	 */

	exports.util = _
	exports.config = config
	exports.set = _.set
	exports.delete = _.delete
	exports.nextTick = _.nextTick

	/**
	 * The following are exposed for advanced usage / plugins
	 */

	exports.compiler = __webpack_require__(22)
	exports.FragmentFactory = __webpack_require__(29)
	exports.internalDirectives = __webpack_require__(44)
	exports.parsers = {
	  path: __webpack_require__(51),
	  text: __webpack_require__(14),
	  template: __webpack_require__(27),
	  directive: __webpack_require__(16),
	  expression: __webpack_require__(50)
	}

	/**
	 * Each instance constructor, including Vue, has a unique
	 * cid. This enables us to create wrapped "child
	 * constructors" for prototypal inheritance and cache them.
	 */

	exports.cid = 0
	var cid = 1

	/**
	 * Class inheritance
	 *
	 * @param {Object} extendOptions
	 */

	exports.extend = function (extendOptions) {
	  extendOptions = extendOptions || {}
	  var Super = this
	  var isFirstExtend = Super.cid === 0
	  if (isFirstExtend && extendOptions._Ctor) {
	    return extendOptions._Ctor
	  }
	  var name = extendOptions.name || Super.options.name
	  var Sub = createClass(name || 'VueComponent')
	  Sub.prototype = Object.create(Super.prototype)
	  Sub.prototype.constructor = Sub
	  Sub.cid = cid++
	  Sub.options = _.mergeOptions(
	    Super.options,
	    extendOptions
	  )
	  Sub['super'] = Super
	  // allow further extension
	  Sub.extend = Super.extend
	  // create asset registers, so extended classes
	  // can have their private assets too.
	  config._assetTypes.forEach(function (type) {
	    Sub[type] = Super[type]
	  })
	  // enable recursive self-lookup
	  if (name) {
	    Sub.options.components[name] = Sub
	  }
	  // cache constructor
	  if (isFirstExtend) {
	    extendOptions._Ctor = Sub
	  }
	  return Sub
	}

	/**
	 * A function that returns a sub-class constructor with the
	 * given name. This gives us much nicer output when
	 * logging instances in the console.
	 *
	 * @param {String} name
	 * @return {Function}
	 */

	function createClass (name) {
	  return new Function(
	    'return function ' + _.classify(name) +
	    ' (options) { this._init(options) }'
	  )()
	}

	/**
	 * Plugin system
	 *
	 * @param {Object} plugin
	 */

	exports.use = function (plugin) {
	  /* istanbul ignore if */
	  if (plugin.installed) {
	    return
	  }
	  // additional parameters
	  var args = _.toArray(arguments, 1)
	  args.unshift(this)
	  if (typeof plugin.install === 'function') {
	    plugin.install.apply(plugin, args)
	  } else {
	    plugin.apply(null, args)
	  }
	  plugin.installed = true
	  return this
	}

	/**
	 * Apply a global mixin by merging it into the default
	 * options.
	 */

	exports.mixin = function (mixin) {
	  var Vue = _.Vue
	  Vue.options = _.mergeOptions(Vue.options, mixin)
	}

	/**
	 * Create asset registration methods with the following
	 * signature:
	 *
	 * @param {String} id
	 * @param {*} definition
	 */

	config._assetTypes.forEach(function (type) {
	  exports[type] = function (id, definition) {
	    if (!definition) {
	      return this.options[type + 's'][id]
	    } else {
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production') {
	        if (type === 'component' && _.commonTagRE.test(id)) {
	          _.warn(
	            'Do not use built-in HTML elements as component ' +
	            'id: ' + id
	          )
	        }
	      }
	      if (
	        type === 'component' &&
	        _.isPlainObject(definition)
	      ) {
	        definition.name = id
	        definition = _.Vue.extend(definition)
	      }
	      this.options[type + 's'][id] = definition
	      return definition
	    }
	  }
	})

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(9)

	_.extend(exports, __webpack_require__(23))
	_.extend(exports, __webpack_require__(57))


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(9)
	var publicDirectives = __webpack_require__(24)
	var internalDirectives = __webpack_require__(44)
	var compileProps = __webpack_require__(56)
	var textParser = __webpack_require__(14)
	var dirParser = __webpack_require__(16)
	var templateParser = __webpack_require__(27)
	var resolveAsset = _.resolveAsset

	// special binding prefixes
	var bindRE = /^v-bind:|^:/
	var onRE = /^v-on:|^@/
	var argRE = /:(.*)$/
	var modifierRE = /\.[^\.]+/g
	var transitionRE = /^(v-bind:|:)?transition$/

	// terminal directives
	var terminalDirectives = [
	  'for',
	  'if'
	]

	// default directive priority
	var DEFAULT_PRIORITY = 1000

	/**
	 * Compile a template and return a reusable composite link
	 * function, which recursively contains more link functions
	 * inside. This top level compile function would normally
	 * be called on instance root nodes, but can also be used
	 * for partial compilation if the partial argument is true.
	 *
	 * The returned composite link function, when called, will
	 * return an unlink function that tearsdown all directives
	 * created during the linking phase.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Object} options
	 * @param {Boolean} partial
	 * @return {Function}
	 */

	exports.compile = function (el, options, partial) {
	  // link function for the node itself.
	  var nodeLinkFn = partial || !options._asComponent
	    ? compileNode(el, options)
	    : null
	  // link function for the childNodes
	  var childLinkFn =
	    !(nodeLinkFn && nodeLinkFn.terminal) &&
	    el.tagName !== 'SCRIPT' &&
	    el.hasChildNodes()
	      ? compileNodeList(el.childNodes, options)
	      : null

	  /**
	   * A composite linker function to be called on a already
	   * compiled piece of DOM, which instantiates all directive
	   * instances.
	   *
	   * @param {Vue} vm
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host] - host vm of transcluded content
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - link context fragment
	   * @return {Function|undefined}
	   */

	  return function compositeLinkFn (vm, el, host, scope, frag) {
	    // cache childNodes before linking parent, fix #657
	    var childNodes = _.toArray(el.childNodes)
	    // link
	    var dirs = linkAndCapture(function compositeLinkCapturer () {
	      if (nodeLinkFn) nodeLinkFn(vm, el, host, scope, frag)
	      if (childLinkFn) childLinkFn(vm, childNodes, host, scope, frag)
	    }, vm)
	    return makeUnlinkFn(vm, dirs)
	  }
	}

	/**
	 * Apply a linker to a vm/element pair and capture the
	 * directives created during the process.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 */

	function linkAndCapture (linker, vm) {
	  var originalDirCount = vm._directives.length
	  linker()
	  var dirs = vm._directives.slice(originalDirCount)
	  dirs.sort(directiveComparator)
	  for (var i = 0, l = dirs.length; i < l; i++) {
	    dirs[i]._bind()
	  }
	  return dirs
	}

	/**
	 * Directive priority sort comparator
	 *
	 * @param {Object} a
	 * @param {Object} b
	 */

	function directiveComparator (a, b) {
	  a = a.descriptor.def.priority || DEFAULT_PRIORITY
	  b = b.descriptor.def.priority || DEFAULT_PRIORITY
	  return a > b ? -1 : a === b ? 0 : 1
	}

	/**
	 * Linker functions return an unlink function that
	 * tearsdown all directives instances generated during
	 * the process.
	 *
	 * We create unlink functions with only the necessary
	 * information to avoid retaining additional closures.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Vue} [context]
	 * @param {Array} [contextDirs]
	 * @return {Function}
	 */

	function makeUnlinkFn (vm, dirs, context, contextDirs) {
	  return function unlink (destroying) {
	    teardownDirs(vm, dirs, destroying)
	    if (context && contextDirs) {
	      teardownDirs(context, contextDirs)
	    }
	  }
	}

	/**
	 * Teardown partial linked directives.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Boolean} destroying
	 */

	function teardownDirs (vm, dirs, destroying) {
	  var i = dirs.length
	  while (i--) {
	    dirs[i]._teardown()
	    if (!destroying) {
	      vm._directives.$remove(dirs[i])
	    }
	  }
	}

	/**
	 * Compile link props on an instance.
	 *
	 * @param {Vue} vm
	 * @param {Element} el
	 * @param {Object} props
	 * @param {Object} [scope]
	 * @return {Function}
	 */

	exports.compileAndLinkProps = function (vm, el, props, scope) {
	  var propsLinkFn = compileProps(el, props)
	  var propDirs = linkAndCapture(function () {
	    propsLinkFn(vm, scope)
	  }, vm)
	  return makeUnlinkFn(vm, propDirs)
	}

	/**
	 * Compile the root element of an instance.
	 *
	 * 1. attrs on context container (context scope)
	 * 2. attrs on the component template root node, if
	 *    replace:true (child scope)
	 *
	 * If this is a fragment instance, we only need to compile 1.
	 *
	 * @param {Vue} vm
	 * @param {Element} el
	 * @param {Object} options
	 * @param {Object} contextOptions
	 * @return {Function}
	 */

	exports.compileRoot = function (el, options, contextOptions) {
	  var containerAttrs = options._containerAttrs
	  var replacerAttrs = options._replacerAttrs
	  var contextLinkFn, replacerLinkFn

	  // only need to compile other attributes for
	  // non-fragment instances
	  if (el.nodeType !== 11) {
	    // for components, container and replacer need to be
	    // compiled separately and linked in different scopes.
	    if (options._asComponent) {
	      // 2. container attributes
	      if (containerAttrs && contextOptions) {
	        contextLinkFn = compileDirectives(containerAttrs, contextOptions)
	      }
	      if (replacerAttrs) {
	        // 3. replacer attributes
	        replacerLinkFn = compileDirectives(replacerAttrs, options)
	      }
	    } else {
	      // non-component, just compile as a normal element.
	      replacerLinkFn = compileDirectives(el.attributes, options)
	    }
	  } else if (process.env.NODE_ENV !== 'production' && containerAttrs) {
	    // warn container directives for fragment instances
	    var names = containerAttrs
	      .filter(function (attr) {
	        // allow vue-loader/vueify scoped css attributes
	        return attr.name.indexOf('_v-') < 0 &&
	          // allow event listeners
	          !onRE.test(attr.name) &&
	          // allow slots
	          attr.name !== 'slot'
	      })
	      .map(function (attr) {
	        return '"' + attr.name + '"'
	      })
	    if (names.length) {
	      var plural = names.length > 1
	      _.warn(
	        'Attribute' + (plural ? 's ' : ' ') + names.join(', ') +
	        (plural ? ' are' : ' is') + ' ignored on component ' +
	        '<' + options.el.tagName.toLowerCase() + '> because ' +
	        'the component is a fragment instance: ' +
	        'http://vuejs.org/guide/components.html#Fragment_Instance'
	      )
	    }
	  }

	  return function rootLinkFn (vm, el, scope) {
	    // link context scope dirs
	    var context = vm._context
	    var contextDirs
	    if (context && contextLinkFn) {
	      contextDirs = linkAndCapture(function () {
	        contextLinkFn(context, el, null, scope)
	      }, context)
	    }

	    // link self
	    var selfDirs = linkAndCapture(function () {
	      if (replacerLinkFn) replacerLinkFn(vm, el)
	    }, vm)

	    // return the unlink function that tearsdown context
	    // container directives.
	    return makeUnlinkFn(vm, selfDirs, context, contextDirs)
	  }
	}

	/**
	 * Compile a node and return a nodeLinkFn based on the
	 * node type.
	 *
	 * @param {Node} node
	 * @param {Object} options
	 * @return {Function|null}
	 */

	function compileNode (node, options) {
	  var type = node.nodeType
	  if (type === 1 && node.tagName !== 'SCRIPT') {
	    return compileElement(node, options)
	  } else if (type === 3 && node.data.trim()) {
	    return compileTextNode(node, options)
	  } else {
	    return null
	  }
	}

	/**
	 * Compile an element and return a nodeLinkFn.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|null}
	 */

	function compileElement (el, options) {
	  // preprocess textareas.
	  // textarea treats its text content as the initial value.
	  // just bind it as an attr directive for value.
	  if (el.tagName === 'TEXTAREA') {
	    var tokens = textParser.parse(el.value)
	    if (tokens) {
	      el.setAttribute(':value', textParser.tokensToExp(tokens))
	      el.value = ''
	    }
	  }
	  var linkFn
	  var hasAttrs = el.hasAttributes()
	  // check terminal directives (for & if)
	  if (hasAttrs) {
	    linkFn = checkTerminalDirectives(el, options)
	  }
	  // check element directives
	  if (!linkFn) {
	    linkFn = checkElementDirectives(el, options)
	  }
	  // check component
	  if (!linkFn) {
	    linkFn = checkComponent(el, options)
	  }
	  // normal directives
	  if (!linkFn && hasAttrs) {
	    linkFn = compileDirectives(el.attributes, options)
	  }
	  return linkFn
	}

	/**
	 * Compile a textNode and return a nodeLinkFn.
	 *
	 * @param {TextNode} node
	 * @param {Object} options
	 * @return {Function|null} textNodeLinkFn
	 */

	function compileTextNode (node, options) {
	  // skip marked text nodes
	  if (node._skip) {
	    return removeText
	  }

	  var tokens = textParser.parse(node.wholeText)
	  if (!tokens) {
	    return null
	  }

	  // mark adjacent text nodes as skipped,
	  // because we are using node.wholeText to compile
	  // all adjacent text nodes together. This fixes
	  // issues in IE where sometimes it splits up a single
	  // text node into multiple ones.
	  var next = node.nextSibling
	  while (next && next.nodeType === 3) {
	    next._skip = true
	    next = next.nextSibling
	  }

	  var frag = document.createDocumentFragment()
	  var el, token
	  for (var i = 0, l = tokens.length; i < l; i++) {
	    token = tokens[i]
	    el = token.tag
	      ? processTextToken(token, options)
	      : document.createTextNode(token.value)
	    frag.appendChild(el)
	  }
	  return makeTextNodeLinkFn(tokens, frag, options)
	}

	/**
	 * Linker for an skipped text node.
	 *
	 * @param {Vue} vm
	 * @param {Text} node
	 */

	function removeText (vm, node) {
	  _.remove(node)
	}

	/**
	 * Process a single text token.
	 *
	 * @param {Object} token
	 * @param {Object} options
	 * @return {Node}
	 */

	function processTextToken (token, options) {
	  var el
	  if (token.oneTime) {
	    el = document.createTextNode(token.value)
	  } else {
	    if (token.html) {
	      el = document.createComment('v-html')
	      setTokenType('html')
	    } else {
	      // IE will clean up empty textNodes during
	      // frag.cloneNode(true), so we have to give it
	      // something here...
	      el = document.createTextNode(' ')
	      setTokenType('text')
	    }
	  }
	  function setTokenType (type) {
	    if (token.descriptor) return
	    var parsed = dirParser.parse(token.value)
	    token.descriptor = {
	      name: type,
	      def: publicDirectives[type],
	      expression: parsed.expression,
	      filters: parsed.filters
	    }
	  }
	  return el
	}

	/**
	 * Build a function that processes a textNode.
	 *
	 * @param {Array<Object>} tokens
	 * @param {DocumentFragment} frag
	 */

	function makeTextNodeLinkFn (tokens, frag) {
	  return function textNodeLinkFn (vm, el, host, scope) {
	    var fragClone = frag.cloneNode(true)
	    var childNodes = _.toArray(fragClone.childNodes)
	    var token, value, node
	    for (var i = 0, l = tokens.length; i < l; i++) {
	      token = tokens[i]
	      value = token.value
	      if (token.tag) {
	        node = childNodes[i]
	        if (token.oneTime) {
	          value = (scope || vm).$eval(value)
	          if (token.html) {
	            _.replace(node, templateParser.parse(value, true))
	          } else {
	            node.data = value
	          }
	        } else {
	          vm._bindDir(token.descriptor, node, host, scope)
	        }
	      }
	    }
	    _.replace(el, fragClone)
	  }
	}

	/**
	 * Compile a node list and return a childLinkFn.
	 *
	 * @param {NodeList} nodeList
	 * @param {Object} options
	 * @return {Function|undefined}
	 */

	function compileNodeList (nodeList, options) {
	  var linkFns = []
	  var nodeLinkFn, childLinkFn, node
	  for (var i = 0, l = nodeList.length; i < l; i++) {
	    node = nodeList[i]
	    nodeLinkFn = compileNode(node, options)
	    childLinkFn =
	      !(nodeLinkFn && nodeLinkFn.terminal) &&
	      node.tagName !== 'SCRIPT' &&
	      node.hasChildNodes()
	        ? compileNodeList(node.childNodes, options)
	        : null
	    linkFns.push(nodeLinkFn, childLinkFn)
	  }
	  return linkFns.length
	    ? makeChildLinkFn(linkFns)
	    : null
	}

	/**
	 * Make a child link function for a node's childNodes.
	 *
	 * @param {Array<Function>} linkFns
	 * @return {Function} childLinkFn
	 */

	function makeChildLinkFn (linkFns) {
	  return function childLinkFn (vm, nodes, host, scope, frag) {
	    var node, nodeLinkFn, childrenLinkFn
	    for (var i = 0, n = 0, l = linkFns.length; i < l; n++) {
	      node = nodes[n]
	      nodeLinkFn = linkFns[i++]
	      childrenLinkFn = linkFns[i++]
	      // cache childNodes before linking parent, fix #657
	      var childNodes = _.toArray(node.childNodes)
	      if (nodeLinkFn) {
	        nodeLinkFn(vm, node, host, scope, frag)
	      }
	      if (childrenLinkFn) {
	        childrenLinkFn(vm, childNodes, host, scope, frag)
	      }
	    }
	  }
	}

	/**
	 * Check for element directives (custom elements that should
	 * be resovled as terminal directives).
	 *
	 * @param {Element} el
	 * @param {Object} options
	 */

	function checkElementDirectives (el, options) {
	  var tag = el.tagName.toLowerCase()
	  if (_.commonTagRE.test(tag)) return
	  var def = resolveAsset(options, 'elementDirectives', tag)
	  if (def) {
	    return makeTerminalNodeLinkFn(el, tag, '', options, def)
	  }
	}

	/**
	 * Check if an element is a component. If yes, return
	 * a component link function.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|undefined}
	 */

	function checkComponent (el, options) {
	  var component = _.checkComponent(el, options)
	  if (component) {
	    var ref = _.findRef(el)
	    var descriptor = {
	      name: 'component',
	      ref: ref,
	      expression: component.id,
	      def: internalDirectives.component,
	      modifiers: {
	        literal: !component.dynamic
	      }
	    }
	    var componentLinkFn = function (vm, el, host, scope, frag) {
	      if (ref) {
	        _.defineReactive((scope || vm).$refs, ref, null)
	      }
	      vm._bindDir(descriptor, el, host, scope, frag)
	    }
	    componentLinkFn.terminal = true
	    return componentLinkFn
	  }
	}

	/**
	 * Check an element for terminal directives in fixed order.
	 * If it finds one, return a terminal link function.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function} terminalLinkFn
	 */

	function checkTerminalDirectives (el, options) {
	  // skip v-pre
	  if (_.attr(el, 'v-pre') !== null) {
	    return skip
	  }
	  // skip v-else block, but only if following v-if
	  if (el.hasAttribute('v-else')) {
	    var prev = el.previousElementSibling
	    if (prev && prev.hasAttribute('v-if')) {
	      return skip
	    }
	  }
	  var value, dirName
	  for (var i = 0, l = terminalDirectives.length; i < l; i++) {
	    dirName = terminalDirectives[i]
	    /* eslint-disable no-cond-assign */
	    if (value = el.getAttribute('v-' + dirName)) {
	      return makeTerminalNodeLinkFn(el, dirName, value, options)
	    }
	    /* eslint-enable no-cond-assign */
	  }
	}

	function skip () {}
	skip.terminal = true

	/**
	 * Build a node link function for a terminal directive.
	 * A terminal link function terminates the current
	 * compilation recursion and handles compilation of the
	 * subtree in the directive.
	 *
	 * @param {Element} el
	 * @param {String} dirName
	 * @param {String} value
	 * @param {Object} options
	 * @param {Object} [def]
	 * @return {Function} terminalLinkFn
	 */

	function makeTerminalNodeLinkFn (el, dirName, value, options, def) {
	  var parsed = dirParser.parse(value)
	  var descriptor = {
	    name: dirName,
	    expression: parsed.expression,
	    filters: parsed.filters,
	    raw: value,
	    // either an element directive, or if/for
	    def: def || publicDirectives[dirName]
	  }
	  // check ref for v-for and router-view
	  if (dirName === 'for' || dirName === 'router-view') {
	    descriptor.ref = _.findRef(el)
	  }
	  var fn = function terminalNodeLinkFn (vm, el, host, scope, frag) {
	    if (descriptor.ref) {
	      _.defineReactive((scope || vm).$refs, descriptor.ref, null)
	    }
	    vm._bindDir(descriptor, el, host, scope, frag)
	  }
	  fn.terminal = true
	  return fn
	}

	/**
	 * Compile the directives on an element and return a linker.
	 *
	 * @param {Array|NamedNodeMap} attrs
	 * @param {Object} options
	 * @return {Function}
	 */

	function compileDirectives (attrs, options) {
	  var i = attrs.length
	  var dirs = []
	  var attr, name, value, rawName, rawValue, dirName, arg, modifiers, dirDef, tokens
	  while (i--) {
	    attr = attrs[i]
	    name = rawName = attr.name
	    value = rawValue = attr.value
	    tokens = textParser.parse(value)
	    // reset arg
	    arg = null
	    // check modifiers
	    modifiers = parseModifiers(name)
	    name = name.replace(modifierRE, '')

	    // attribute interpolations
	    if (tokens) {
	      value = textParser.tokensToExp(tokens)
	      arg = name
	      pushDir('bind', publicDirectives.bind, true)
	      // warn against mixing mustaches with v-bind
	      if (process.env.NODE_ENV !== 'production') {
	        if (name === 'class' && Array.prototype.some.call(attrs, function (attr) {
	          return attr.name === ':class' || attr.name === 'v-bind:class'
	        })) {
	          _.warn(
	            'class="' + rawValue + '": Do not mix mustache interpolation ' +
	            'and v-bind for "class" on the same element. Use one or the other.'
	          )
	        }
	      }
	    } else

	    // special attribute: transition
	    if (transitionRE.test(name)) {
	      modifiers.literal = !bindRE.test(name)
	      pushDir('transition', internalDirectives.transition)
	    } else

	    // event handlers
	    if (onRE.test(name)) {
	      arg = name.replace(onRE, '')
	      pushDir('on', publicDirectives.on)
	    } else

	    // attribute bindings
	    if (bindRE.test(name)) {
	      dirName = name.replace(bindRE, '')
	      if (dirName === 'style' || dirName === 'class') {
	        pushDir(dirName, internalDirectives[dirName])
	      } else {
	        arg = dirName
	        pushDir('bind', publicDirectives.bind)
	      }
	    } else

	    // normal directives
	    if (name.indexOf('v-') === 0) {
	      // check arg
	      arg = (arg = name.match(argRE)) && arg[1]
	      if (arg) {
	        name = name.replace(argRE, '')
	      }
	      // extract directive name
	      dirName = name.slice(2)

	      // skip v-else (when used with v-show)
	      if (dirName === 'else') {
	        continue
	      }

	      dirDef = resolveAsset(options, 'directives', dirName)

	      if (process.env.NODE_ENV !== 'production') {
	        _.assertAsset(dirDef, 'directive', dirName)
	      }

	      if (dirDef) {
	        pushDir(dirName, dirDef)
	      }
	    }
	  }

	  /**
	   * Push a directive.
	   *
	   * @param {String} dirName
	   * @param {Object|Function} def
	   * @param {Boolean} [interp]
	   */

	  function pushDir (dirName, def, interp) {
	    var parsed = dirParser.parse(value)
	    dirs.push({
	      name: dirName,
	      attr: rawName,
	      raw: rawValue,
	      def: def,
	      arg: arg,
	      modifiers: modifiers,
	      expression: parsed.expression,
	      filters: parsed.filters,
	      interp: interp
	    })
	  }

	  if (dirs.length) {
	    return makeNodeLinkFn(dirs)
	  }
	}

	/**
	 * Parse modifiers from directive attribute name.
	 *
	 * @param {String} name
	 * @return {Object}
	 */

	function parseModifiers (name) {
	  var res = Object.create(null)
	  var match = name.match(modifierRE)
	  if (match) {
	    var i = match.length
	    while (i--) {
	      res[match[i].slice(1)] = true
	    }
	  }
	  return res
	}

	/**
	 * Build a link function for all directives on a single node.
	 *
	 * @param {Array} directives
	 * @return {Function} directivesLinkFn
	 */

	function makeNodeLinkFn (directives) {
	  return function nodeLinkFn (vm, el, host, scope, frag) {
	    // reverse apply because it's sorted low to high
	    var i = directives.length
	    while (i--) {
	      vm._bindDir(directives[i], el, host, scope, frag)
	    }
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// text & html
	exports.text = __webpack_require__(25)
	exports.html = __webpack_require__(26)

	// logic control
	exports['for'] = __webpack_require__(28)
	exports['if'] = __webpack_require__(31)
	exports.show = __webpack_require__(32)

	// two-way binding
	exports.model = __webpack_require__(33)

	// event handling
	exports.on = __webpack_require__(38)

	// attributes
	exports.bind = __webpack_require__(39)

	// ref & el
	exports.el = __webpack_require__(41)
	exports.ref = __webpack_require__(42)

	// cloak
	exports.cloak = __webpack_require__(43)


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(9)

	module.exports = {

	  bind: function () {
	    this.attr = this.el.nodeType === 3
	      ? 'data'
	      : 'textContent'
	  },

	  update: function (value) {
	    this.el[this.attr] = _.toString(value)
	  }
	}


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(9)
	var templateParser = __webpack_require__(27)

	module.exports = {

	  bind: function () {
	    // a comment node means this is a binding for
	    // {{{ inline unescaped html }}}
	    if (this.el.nodeType === 8) {
	      // hold nodes
	      this.nodes = []
	      // replace the placeholder with proper anchor
	      this.anchor = _.createAnchor('v-html')
	      _.replace(this.el, this.anchor)
	    }
	  },

	  update: function (value) {
	    value = _.toString(value)
	    if (this.nodes) {
	      this.swap(value)
	    } else {
	      this.el.innerHTML = value
	    }
	  },

	  swap: function (value) {
	    // remove old nodes
	    var i = this.nodes.length
	    while (i--) {
	      _.remove(this.nodes[i])
	    }
	    // convert new value to a fragment
	    // do not attempt to retrieve from id selector
	    var frag = templateParser.parse(value, true, true)
	    // save a reference to these nodes so we can remove later
	    this.nodes = _.toArray(frag.childNodes)
	    _.before(frag, this.anchor)
	  }
	}


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(9)
	var Cache = __webpack_require__(15)
	var templateCache = new Cache(1000)
	var idSelectorCache = new Cache(1000)

	var map = {
	  _default: [0, '', ''],
	  legend: [1, '<fieldset>', '</fieldset>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  col: [
	    2,
	    '<table><tbody></tbody><colgroup>',
	    '</colgroup></table>'
	  ]
	}

	map.td =
	map.th = [
	  3,
	  '<table><tbody><tr>',
	  '</tr></tbody></table>'
	]

	map.option =
	map.optgroup = [
	  1,
	  '<select multiple="multiple">',
	  '</select>'
	]

	map.thead =
	map.tbody =
	map.colgroup =
	map.caption =
	map.tfoot = [1, '<table>', '</table>']

	map.g =
	map.defs =
	map.symbol =
	map.use =
	map.image =
	map.text =
	map.circle =
	map.ellipse =
	map.line =
	map.path =
	map.polygon =
	map.polyline =
	map.rect = [
	  1,
	  '<svg ' +
	    'xmlns="http://www.w3.org/2000/svg" ' +
	    'xmlns:xlink="http://www.w3.org/1999/xlink" ' +
	    'xmlns:ev="http://www.w3.org/2001/xml-events"' +
	    'version="1.1">',
	  '</svg>'
	]

	/**
	 * Check if a node is a supported template node with a
	 * DocumentFragment content.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function isRealTemplate (node) {
	  return _.isTemplate(node) &&
	    node.content instanceof DocumentFragment
	}

	var tagRE = /<([\w:]+)/
	var entityRE = /&\w+;|&#\d+;|&#x[\dA-F]+;/

	/**
	 * Convert a string template to a DocumentFragment.
	 * Determines correct wrapping by tag types. Wrapping
	 * strategy found in jQuery & component/domify.
	 *
	 * @param {String} templateString
	 * @return {DocumentFragment}
	 */

	function stringToFragment (templateString) {
	  // try a cache hit first
	  var hit = templateCache.get(templateString)
	  if (hit) {
	    return hit
	  }

	  var frag = document.createDocumentFragment()
	  var tagMatch = templateString.match(tagRE)
	  var entityMatch = entityRE.test(templateString)

	  if (!tagMatch && !entityMatch) {
	    // text only, return a single text node.
	    frag.appendChild(
	      document.createTextNode(templateString)
	    )
	  } else {

	    var tag = tagMatch && tagMatch[1]
	    var wrap = map[tag] || map._default
	    var depth = wrap[0]
	    var prefix = wrap[1]
	    var suffix = wrap[2]
	    var node = document.createElement('div')

	    node.innerHTML = prefix + templateString.trim() + suffix
	    while (depth--) {
	      node = node.lastChild
	    }

	    var child
	    /* eslint-disable no-cond-assign */
	    while (child = node.firstChild) {
	    /* eslint-enable no-cond-assign */
	      frag.appendChild(child)
	    }
	  }

	  templateCache.put(templateString, frag)
	  return frag
	}

	/**
	 * Convert a template node to a DocumentFragment.
	 *
	 * @param {Node} node
	 * @return {DocumentFragment}
	 */

	function nodeToFragment (node) {
	  // if its a template tag and the browser supports it,
	  // its content is already a document fragment.
	  if (isRealTemplate(node)) {
	    _.trimNode(node.content)
	    return node.content
	  }
	  // script template
	  if (node.tagName === 'SCRIPT') {
	    return stringToFragment(node.textContent)
	  }
	  // normal node, clone it to avoid mutating the original
	  var clone = exports.clone(node)
	  var frag = document.createDocumentFragment()
	  var child
	  /* eslint-disable no-cond-assign */
	  while (child = clone.firstChild) {
	  /* eslint-enable no-cond-assign */
	    frag.appendChild(child)
	  }
	  _.trimNode(frag)
	  return frag
	}

	// Test for the presence of the Safari template cloning bug
	// https://bugs.webkit.org/show_bug.cgi?id=137755
	var hasBrokenTemplate = (function () {
	  /* istanbul ignore else */
	  if (_.inBrowser) {
	    var a = document.createElement('div')
	    a.innerHTML = '<template>1</template>'
	    return !a.cloneNode(true).firstChild.innerHTML
	  } else {
	    return false
	  }
	})()

	// Test for IE10/11 textarea placeholder clone bug
	var hasTextareaCloneBug = (function () {
	  /* istanbul ignore else */
	  if (_.inBrowser) {
	    var t = document.createElement('textarea')
	    t.placeholder = 't'
	    return t.cloneNode(true).value === 't'
	  } else {
	    return false
	  }
	})()

	/**
	 * 1. Deal with Safari cloning nested <template> bug by
	 *    manually cloning all template instances.
	 * 2. Deal with IE10/11 textarea placeholder bug by setting
	 *    the correct value after cloning.
	 *
	 * @param {Element|DocumentFragment} node
	 * @return {Element|DocumentFragment}
	 */

	exports.clone = function (node) {
	  if (!node.querySelectorAll) {
	    return node.cloneNode()
	  }
	  var res = node.cloneNode(true)
	  var i, original, cloned
	  /* istanbul ignore if */
	  if (hasBrokenTemplate) {
	    var clone = res
	    if (isRealTemplate(node)) {
	      node = node.content
	      clone = res.content
	    }
	    original = node.querySelectorAll('template')
	    if (original.length) {
	      cloned = clone.querySelectorAll('template')
	      i = cloned.length
	      while (i--) {
	        cloned[i].parentNode.replaceChild(
	          exports.clone(original[i]),
	          cloned[i]
	        )
	      }
	    }
	  }
	  /* istanbul ignore if */
	  if (hasTextareaCloneBug) {
	    if (node.tagName === 'TEXTAREA') {
	      res.value = node.value
	    } else {
	      original = node.querySelectorAll('textarea')
	      if (original.length) {
	        cloned = res.querySelectorAll('textarea')
	        i = cloned.length
	        while (i--) {
	          cloned[i].value = original[i].value
	        }
	      }
	    }
	  }
	  return res
	}

	/**
	 * Process the template option and normalizes it into a
	 * a DocumentFragment that can be used as a partial or a
	 * instance template.
	 *
	 * @param {*} template
	 *    Possible values include:
	 *    - DocumentFragment object
	 *    - Node object of type Template
	 *    - id selector: '#some-template-id'
	 *    - template string: '<div><span>{{msg}}</span></div>'
	 * @param {Boolean} clone
	 * @param {Boolean} noSelector
	 * @return {DocumentFragment|undefined}
	 */

	exports.parse = function (template, clone, noSelector) {
	  var node, frag

	  // if the template is already a document fragment,
	  // do nothing
	  if (template instanceof DocumentFragment) {
	    _.trimNode(template)
	    return clone
	      ? exports.clone(template)
	      : template
	  }

	  if (typeof template === 'string') {
	    // id selector
	    if (!noSelector && template.charAt(0) === '#') {
	      // id selector can be cached too
	      frag = idSelectorCache.get(template)
	      if (!frag) {
	        node = document.getElementById(template.slice(1))
	        if (node) {
	          frag = nodeToFragment(node)
	          // save selector to cache
	          idSelectorCache.put(template, frag)
	        }
	      }
	    } else {
	      // normal string template
	      frag = stringToFragment(template)
	    }
	  } else if (template.nodeType) {
	    // a direct node
	    frag = nodeToFragment(template)
	  }

	  return frag && clone
	    ? exports.clone(frag)
	    : frag
	}


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(9)
	var FragmentFactory = __webpack_require__(29)
	var isObject = _.isObject
	var uid = 0

	module.exports = {

	  priority: 2000,

	  params: [
	    'track-by',
	    'stagger',
	    'enter-stagger',
	    'leave-stagger'
	  ],

	  bind: function () {
	    // support "item in items" syntax
	    var inMatch = this.expression.match(/(.*) in (.*)/)
	    if (inMatch) {
	      var itMatch = inMatch[1].match(/\((.*),(.*)\)/)
	      if (itMatch) {
	        this.iterator = itMatch[1].trim()
	        this.alias = itMatch[2].trim()
	      } else {
	        this.alias = inMatch[1].trim()
	      }
	      this.expression = inMatch[2]
	    }

	    if (!this.alias) {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'Alias is required in v-for.'
	      )
	      return
	    }

	    // uid as a cache identifier
	    this.id = '__v-for__' + (++uid)

	    // check if this is an option list,
	    // so that we know if we need to update the <select>'s
	    // v-model when the option list has changed.
	    // because v-model has a lower priority than v-for,
	    // the v-model is not bound here yet, so we have to
	    // retrive it in the actual updateModel() function.
	    var tag = this.el.tagName
	    this.isOption =
	      (tag === 'OPTION' || tag === 'OPTGROUP') &&
	      this.el.parentNode.tagName === 'SELECT'

	    // setup anchor nodes
	    this.start = _.createAnchor('v-for-start')
	    this.end = _.createAnchor('v-for-end')
	    _.replace(this.el, this.end)
	    _.before(this.start, this.end)

	    // cache
	    this.cache = Object.create(null)

	    // fragment factory
	    this.factory = new FragmentFactory(this.vm, this.el)
	  },

	  update: function (data) {
	    this.diff(data)
	    this.updateRef()
	    this.updateModel()
	  },

	  /**
	   * Diff, based on new data and old data, determine the
	   * minimum amount of DOM manipulations needed to make the
	   * DOM reflect the new data Array.
	   *
	   * The algorithm diffs the new data Array by storing a
	   * hidden reference to an owner vm instance on previously
	   * seen data. This allows us to achieve O(n) which is
	   * better than a levenshtein distance based algorithm,
	   * which is O(m * n).
	   *
	   * @param {Array} data
	   */

	  diff: function (data) {
	    // check if the Array was converted from an Object
	    var item = data[0]
	    var convertedFromObject = this.fromObject =
	      isObject(item) &&
	      item.hasOwnProperty('$key') &&
	      item.hasOwnProperty('$value')

	    var trackByKey = this.params.trackBy
	    var oldFrags = this.frags
	    var frags = this.frags = new Array(data.length)
	    var alias = this.alias
	    var iterator = this.iterator
	    var start = this.start
	    var end = this.end
	    var inDoc = _.inDoc(start)
	    var init = !oldFrags
	    var i, l, frag, key, value, primitive

	    // First pass, go through the new Array and fill up
	    // the new frags array. If a piece of data has a cached
	    // instance for it, we reuse it. Otherwise build a new
	    // instance.
	    for (i = 0, l = data.length; i < l; i++) {
	      item = data[i]
	      key = convertedFromObject ? item.$key : null
	      value = convertedFromObject ? item.$value : item
	      primitive = !isObject(value)
	      frag = !init && this.getCachedFrag(value, i, key)
	      if (frag) { // reusable fragment
	        frag.reused = true
	        // update $index
	        frag.scope.$index = i
	        // update $key
	        if (key) {
	          frag.scope.$key = key
	        }
	        // update iterator
	        if (iterator) {
	          frag.scope[iterator] = key !== null ? key : i
	        }
	        // update data for track-by, object repeat &
	        // primitive values.
	        if (trackByKey || convertedFromObject || primitive) {
	          frag.scope[alias] = value
	        }
	      } else { // new isntance
	        frag = this.create(value, alias, i, key)
	        frag.fresh = !init
	      }
	      frags[i] = frag
	      if (init) {
	        frag.before(end)
	      }
	    }

	    // we're done for the initial render.
	    if (init) {
	      return
	    }

	    // Second pass, go through the old fragments and
	    // destroy those who are not reused (and remove them
	    // from cache)
	    var removalIndex = 0
	    var totalRemoved = oldFrags.length - frags.length
	    for (i = 0, l = oldFrags.length; i < l; i++) {
	      frag = oldFrags[i]
	      if (!frag.reused) {
	        this.deleteCachedFrag(frag)
	        this.remove(frag, removalIndex++, totalRemoved, inDoc)
	      }
	    }

	    // Final pass, move/insert new fragments into the
	    // right place.
	    var targetPrev, prevEl, currentPrev
	    var insertionIndex = 0
	    for (i = 0, l = frags.length; i < l; i++) {
	      frag = frags[i]
	      // this is the frag that we should be after
	      targetPrev = frags[i - 1]
	      prevEl = targetPrev
	        ? targetPrev.staggerCb
	          ? targetPrev.staggerAnchor
	          : targetPrev.end || targetPrev.node
	        : start
	      if (frag.reused && !frag.staggerCb) {
	        currentPrev = findPrevFrag(frag, start, this.id)
	        if (currentPrev !== targetPrev) {
	          this.move(frag, prevEl)
	        }
	      } else {
	        // new instance, or still in stagger.
	        // insert with updated stagger index.
	        this.insert(frag, insertionIndex++, prevEl, inDoc)
	      }
	      frag.reused = frag.fresh = false
	    }
	  },

	  /**
	   * Create a new fragment instance.
	   *
	   * @param {*} value
	   * @param {String} alias
	   * @param {Number} index
	   * @param {String} [key]
	   * @return {Fragment}
	   */

	  create: function (value, alias, index, key) {
	    var host = this._host
	    // create iteration scope
	    var parentScope = this._scope || this.vm
	    var scope = Object.create(parentScope)
	    // ref holder for the scope
	    scope.$refs = Object.create(parentScope.$refs)
	    scope.$els = Object.create(parentScope.$els)
	    // make sure point $parent to parent scope
	    scope.$parent = parentScope
	    // for two-way binding on alias
	    scope.$forContext = this
	    // define scope properties
	    _.defineReactive(scope, alias, value)
	    _.defineReactive(scope, '$index', index)
	    if (key) {
	      _.defineReactive(scope, '$key', key)
	    } else if (scope.$key) {
	      // avoid accidental fallback
	      _.define(scope, '$key', null)
	    }
	    if (this.iterator) {
	      _.defineReactive(scope, this.iterator, key !== null ? key : index)
	    }
	    var frag = this.factory.create(host, scope, this._frag)
	    frag.forId = this.id
	    this.cacheFrag(value, frag, index, key)
	    return frag
	  },

	  /**
	   * Update the v-ref on owner vm.
	   */

	  updateRef: function () {
	    var ref = this.descriptor.ref
	    if (!ref) return
	    var hash = (this._scope || this.vm).$refs
	    var refs
	    if (!this.fromObject) {
	      refs = this.frags.map(findVmFromFrag)
	    } else {
	      refs = {}
	      this.frags.forEach(function (frag) {
	        refs[frag.scope.$key] = findVmFromFrag(frag)
	      })
	    }
	    hash[ref] = refs
	  },

	  /**
	   * For option lists, update the containing v-model on
	   * parent <select>.
	   */

	  updateModel: function () {
	    if (this.isOption) {
	      var parent = this.start.parentNode
	      var model = parent && parent.__v_model
	      if (model) {
	        model.forceUpdate()
	      }
	    }
	  },

	  /**
	   * Insert a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Node} prevEl
	   * @param {Boolean} inDoc
	   */

	  insert: function (frag, index, prevEl, inDoc) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel()
	      frag.staggerCb = null
	    }
	    var staggerAmount = this.getStagger(frag, index, null, 'enter')
	    if (inDoc && staggerAmount) {
	      // create an anchor and insert it synchronously,
	      // so that we can resolve the correct order without
	      // worrying about some elements not inserted yet
	      var anchor = frag.staggerAnchor
	      if (!anchor) {
	        anchor = frag.staggerAnchor = _.createAnchor('stagger-anchor')
	        anchor.__vfrag__ = frag
	      }
	      _.after(anchor, prevEl)
	      var op = frag.staggerCb = _.cancellable(function () {
	        frag.staggerCb = null
	        frag.before(anchor)
	        _.remove(anchor)
	      })
	      setTimeout(op, staggerAmount)
	    } else {
	      frag.before(prevEl.nextSibling)
	    }
	  },

	  /**
	   * Remove a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {Boolean} inDoc
	   */

	  remove: function (frag, index, total, inDoc) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel()
	      frag.staggerCb = null
	      // it's not possible for the same frag to be removed
	      // twice, so if we have a pending stagger callback,
	      // it means this frag is queued for enter but removed
	      // before its transition started. Since it is already
	      // destroyed, we can just leave it in detached state.
	      return
	    }
	    var staggerAmount = this.getStagger(frag, index, total, 'leave')
	    if (inDoc && staggerAmount) {
	      var op = frag.staggerCb = _.cancellable(function () {
	        frag.staggerCb = null
	        frag.remove()
	      })
	      setTimeout(op, staggerAmount)
	    } else {
	      frag.remove()
	    }
	  },

	  /**
	   * Move a fragment to a new position.
	   * Force no transition.
	   *
	   * @param {Fragment} frag
	   * @param {Node} prevEl
	   */

	  move: function (frag, prevEl) {
	    frag.before(prevEl.nextSibling, false)
	  },

	  /**
	   * Cache a fragment using track-by or the object key.
	   *
	   * @param {*} value
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {String} [key]
	   */

	  cacheFrag: function (value, frag, index, key) {
	    var trackByKey = this.params.trackBy
	    var cache = this.cache
	    var primitive = !isObject(value)
	    var id
	    if (key || trackByKey || primitive) {
	      id = trackByKey
	        ? trackByKey === '$index'
	          ? index
	          : value[trackByKey]
	        : (key || value)
	      if (!cache[id]) {
	        cache[id] = frag
	      } else if (trackByKey !== '$index') {
	        process.env.NODE_ENV !== 'production' &&
	        this.warnDuplicate(value)
	      }
	    } else {
	      id = this.id
	      if (value.hasOwnProperty(id)) {
	        if (value[id] === null) {
	          value[id] = frag
	        } else {
	          process.env.NODE_ENV !== 'production' &&
	          this.warnDuplicate(value)
	        }
	      } else {
	        _.define(value, id, frag)
	      }
	    }
	    frag.raw = value
	  },

	  /**
	   * Get a cached fragment from the value/index/key
	   *
	   * @param {*} value
	   * @param {Number} index
	   * @param {String} key
	   * @return {Fragment}
	   */

	  getCachedFrag: function (value, index, key) {
	    var trackByKey = this.params.trackBy
	    var primitive = !isObject(value)
	    var frag
	    if (key || trackByKey || primitive) {
	      var id = trackByKey
	        ? trackByKey === '$index'
	          ? index
	          : value[trackByKey]
	        : (key || value)
	      frag = this.cache[id]
	    } else {
	      frag = value[this.id]
	    }
	    if (frag && (frag.reused || frag.fresh)) {
	      process.env.NODE_ENV !== 'production' &&
	      this.warnDuplicate(value)
	    }
	    return frag
	  },

	  /**
	   * Delete a fragment from cache.
	   *
	   * @param {Fragment} frag
	   */

	  deleteCachedFrag: function (frag) {
	    var value = frag.raw
	    var trackByKey = this.params.trackBy
	    var scope = frag.scope
	    var index = scope.$index
	    // fix #948: avoid accidentally fall through to
	    // a parent repeater which happens to have $key.
	    var key = scope.hasOwnProperty('$key') && scope.$key
	    var primitive = !isObject(value)
	    if (trackByKey || key || primitive) {
	      var id = trackByKey
	        ? trackByKey === '$index'
	          ? index
	          : value[trackByKey]
	        : (key || value)
	      this.cache[id] = null
	    } else {
	      value[this.id] = null
	      frag.raw = null
	    }
	  },

	  /**
	   * Get the stagger amount for an insertion/removal.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {String} type
	   */

	  getStagger: function (frag, index, total, type) {
	    type = type + 'Stagger'
	    var trans = frag.node.__v_trans
	    var hooks = trans && trans.hooks
	    var hook = hooks && (hooks[type] || hooks.stagger)
	    return hook
	      ? hook.call(frag, index, total)
	      : index * parseInt(this.params[type] || this.params.stagger, 10)
	  },

	  /**
	   * Pre-process the value before piping it through the
	   * filters. This is passed to and called by the watcher.
	   */

	  _preProcess: function (value) {
	    // regardless of type, store the un-filtered raw value.
	    this.rawValue = value
	    return value
	  },

	  /**
	   * Post-process the value after it has been piped through
	   * the filters. This is passed to and called by the watcher.
	   *
	   * It is necessary for this to be called during the
	   * wathcer's dependency collection phase because we want
	   * the v-for to update when the source Object is mutated.
	   */

	  _postProcess: function (value) {
	    if (_.isArray(value)) {
	      return value
	    } else if (_.isPlainObject(value)) {
	      // convert plain object to array.
	      var keys = Object.keys(value)
	      var i = keys.length
	      var res = new Array(i)
	      var key
	      while (i--) {
	        key = keys[i]
	        res[i] = {
	          $key: key,
	          $value: value[key]
	        }
	      }
	      return res
	    } else {
	      if (typeof value === 'number') {
	        value = range(value)
	      }
	      return value || []
	    }
	  },

	  unbind: function () {
	    if (this.descriptor.ref) {
	      (this._scope || this.vm).$refs[this.descriptor.ref] = null
	    }
	    if (this.frags) {
	      var i = this.frags.length
	      var frag
	      while (i--) {
	        frag = this.frags[i]
	        this.deleteCachedFrag(frag)
	        frag.destroy()
	      }
	    }
	  }
	}

	/**
	 * Helper to find the previous element that is a fragment
	 * anchor. This is necessary because a destroyed frag's
	 * element could still be lingering in the DOM before its
	 * leaving transition finishes, but its inserted flag
	 * should have been set to false so we can skip them.
	 *
	 * If this is a block repeat, we want to make sure we only
	 * return frag that is bound to this v-for. (see #929)
	 *
	 * @param {Fragment} frag
	 * @param {Comment|Text} anchor
	 * @param {String} id
	 * @return {Fragment}
	 */

	function findPrevFrag (frag, anchor, id) {
	  var el = frag.node.previousSibling
	  /* istanbul ignore if */
	  if (!el) return
	  frag = el.__vfrag__
	  while (
	    (!frag || frag.forId !== id || !frag.inserted) &&
	    el !== anchor
	  ) {
	    el = el.previousSibling
	    /* istanbul ignore if */
	    if (!el) return
	    frag = el.__vfrag__
	  }
	  return frag
	}

	/**
	 * Find a vm from a fragment.
	 *
	 * @param {Fragment} frag
	 * @return {Vue|undefined}
	 */

	function findVmFromFrag (frag) {
	  return frag.node.__vue__ || frag.node.nextSibling.__vue__
	}

	/**
	 * Create a range array from given number.
	 *
	 * @param {Number} n
	 * @return {Array}
	 */

	function range (n) {
	  var i = -1
	  var ret = new Array(n)
	  while (++i < n) {
	    ret[i] = i
	  }
	  return ret
	}

	if (process.env.NODE_ENV !== 'production') {
	  module.exports.warnDuplicate = function (value) {
	    _.warn(
	      'Duplicate value found in v-for="' + this.descriptor.raw + '": ' +
	      JSON.stringify(value) + '. Use track-by="$index" if ' +
	      'you are expecting duplicate values.'
	    )
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(9)
	var compiler = __webpack_require__(22)
	var templateParser = __webpack_require__(27)
	var Fragment = __webpack_require__(30)
	var Cache = __webpack_require__(15)
	var linkerCache = new Cache(5000)

	/**
	 * A factory that can be used to create instances of a
	 * fragment. Caches the compiled linker if possible.
	 *
	 * @param {Vue} vm
	 * @param {Element|String} el
	 */

	function FragmentFactory (vm, el) {
	  this.vm = vm
	  var template
	  var isString = typeof el === 'string'
	  if (isString || _.isTemplate(el)) {
	    template = templateParser.parse(el, true)
	  } else {
	    template = document.createDocumentFragment()
	    template.appendChild(el)
	  }
	  this.template = template
	  // linker can be cached, but only for components
	  var linker
	  var cid = vm.constructor.cid
	  if (cid > 0) {
	    var cacheId = cid + (isString ? el : el.outerHTML)
	    linker = linkerCache.get(cacheId)
	    if (!linker) {
	      linker = compiler.compile(template, vm.$options, true)
	      linkerCache.put(cacheId, linker)
	    }
	  } else {
	    linker = compiler.compile(template, vm.$options, true)
	  }
	  this.linker = linker
	}

	/**
	 * Create a fragment instance with given host and scope.
	 *
	 * @param {Vue} host
	 * @param {Object} scope
	 * @param {Fragment} parentFrag
	 */

	FragmentFactory.prototype.create = function (host, scope, parentFrag) {
	  var frag = templateParser.clone(this.template)
	  return new Fragment(this.linker, this.vm, frag, host, scope, parentFrag)
	}

	module.exports = FragmentFactory


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(9)
	var transition = __webpack_require__(17)

	/**
	 * Abstraction for a partially-compiled fragment.
	 * Can optionally compile content with a child scope.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Vue} [host]
	 * @param {Object} [scope]
	 */

	function Fragment (linker, vm, frag, host, scope, parentFrag) {
	  this.children = []
	  this.childFrags = []
	  this.vm = vm
	  this.scope = scope
	  this.inserted = false
	  this.parentFrag = parentFrag
	  if (parentFrag) {
	    parentFrag.childFrags.push(this)
	  }
	  this.unlink = linker(vm, frag, host, scope, this)
	  var single = this.single =
	    frag.childNodes.length === 1 &&
	    // do not go single mode if the only node is an anchor
	    !(frag.childNodes[0].__vue_anchor)
	  if (single) {
	    this.node = frag.childNodes[0]
	    this.before = singleBefore
	    this.remove = singleRemove
	  } else {
	    this.node = _.createAnchor('fragment-start')
	    this.end = _.createAnchor('fragment-end')
	    this.frag = frag
	    _.prepend(this.node, frag)
	    frag.appendChild(this.end)
	    this.before = multiBefore
	    this.remove = multiRemove
	  }
	  this.node.__vfrag__ = this
	}

	/**
	 * Call attach/detach for all components contained within
	 * this fragment. Also do so recursively for all child
	 * fragments.
	 *
	 * @param {Function} hook
	 */

	Fragment.prototype.callHook = function (hook) {
	  var i, l
	  for (i = 0, l = this.children.length; i < l; i++) {
	    hook(this.children[i])
	  }
	  for (i = 0, l = this.childFrags.length; i < l; i++) {
	    this.childFrags[i].callHook(hook)
	  }
	}

	/**
	 * Destroy the fragment.
	 */

	Fragment.prototype.destroy = function () {
	  if (this.parentFrag) {
	    this.parentFrag.childFrags.$remove(this)
	  }
	  this.unlink()
	}

	/**
	 * Insert fragment before target, single node version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */

	function singleBefore (target, withTransition) {
	  this.inserted = true
	  var method = withTransition !== false
	    ? transition.before
	    : _.before
	  method(this.node, target, this.vm)
	  if (_.inDoc(this.node)) {
	    this.callHook(attach)
	  }
	}

	/**
	 * Remove fragment, single node version
	 */

	function singleRemove () {
	  this.inserted = false
	  var shouldCallRemove = _.inDoc(this.node)
	  var self = this
	  self.callHook(destroyChild)
	  transition.remove(this.node, this.vm, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach)
	    }
	    self.destroy()
	  })
	}

	/**
	 * Insert fragment before target, multi-nodes version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */

	function multiBefore (target, withTransition) {
	  this.inserted = true
	  var vm = this.vm
	  var method = withTransition !== false
	    ? transition.before
	    : _.before
	  _.mapNodeRange(this.node, this.end, function (node) {
	    method(node, target, vm)
	  })
	  if (_.inDoc(this.node)) {
	    this.callHook(attach)
	  }
	}

	/**
	 * Remove fragment, multi-nodes version
	 */

	function multiRemove () {
	  this.inserted = false
	  var self = this
	  var shouldCallRemove = _.inDoc(this.node)
	  self.callHook(destroyChild)
	  _.removeNodeRange(this.node, this.end, this.vm, this.frag, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach)
	    }
	    self.destroy()
	  })
	}

	/**
	 * Call attach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */

	function attach (child) {
	  if (!child._isAttached) {
	    child._callHook('attached')
	  }
	}

	/**
	 * Call destroy for all contained instances,
	 * with remove:false and defer:true.
	 * Defer is necessary because we need to
	 * keep the children to call detach hooks
	 * on them.
	 *
	 * @param {Vue} child
	 */

	function destroyChild (child) {
	  child.$destroy(false, true)
	}

	/**
	 * Call detach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */

	function detach (child) {
	  if (child._isAttached) {
	    child._callHook('detached')
	  }
	}

	module.exports = Fragment


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(9)
	var FragmentFactory = __webpack_require__(29)

	module.exports = {

	  priority: 2000,

	  bind: function () {
	    var el = this.el
	    if (!el.__vue__) {
	      // check else block
	      var next = el.nextElementSibling
	      if (next && _.attr(next, 'v-else') !== null) {
	        _.remove(next)
	        this.elseFactory = new FragmentFactory(this.vm, next)
	      }
	      // check main block
	      this.anchor = _.createAnchor('v-if')
	      _.replace(el, this.anchor)
	      this.factory = new FragmentFactory(this.vm, el)
	    } else {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'v-if="' + this.expression + '" cannot be ' +
	        'used on an instance root element.'
	      )
	      this.invalid = true
	    }
	  },

	  update: function (value) {
	    if (this.invalid) return
	    if (value) {
	      if (!this.frag) {
	        this.insert()
	      }
	    } else {
	      this.remove()
	    }
	  },

	  insert: function () {
	    if (this.elseFrag) {
	      this.elseFrag.remove()
	      this.elseFrag = null
	    }
	    this.frag = this.factory.create(this._host, this._scope, this._frag)
	    this.frag.before(this.anchor)
	  },

	  remove: function () {
	    if (this.frag) {
	      this.frag.remove()
	      this.frag = null
	    }
	    if (this.elseFactory && !this.elseFrag) {
	      this.elseFrag = this.elseFactory.create(this._host, this._scope, this._frag)
	      this.elseFrag.before(this.anchor)
	    }
	  },

	  unbind: function () {
	    if (this.frag) {
	      this.frag.destroy()
	    }
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(9)
	var transition = __webpack_require__(17)

	module.exports = {

	  bind: function () {
	    // check else block
	    var next = this.el.nextElementSibling
	    if (next && _.attr(next, 'v-else') !== null) {
	      this.elseEl = next
	    }
	  },

	  update: function (value) {
	    this.apply(this.el, value)
	    if (this.elseEl) {
	      this.apply(this.elseEl, !value)
	    }
	  },

	  apply: function (el, value) {
	    transition.apply(el, value ? 1 : -1, function () {
	      el.style.display = value ? '' : 'none'
	    }, this.vm)
	  }
	}


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(9)

	var handlers = {
	  text: __webpack_require__(34),
	  radio: __webpack_require__(35),
	  select: __webpack_require__(36),
	  checkbox: __webpack_require__(37)
	}

	module.exports = {

	  priority: 800,
	  twoWay: true,
	  handlers: handlers,
	  params: ['lazy', 'number', 'debounce'],

	  /**
	   * Possible elements:
	   *   <select>
	   *   <textarea>
	   *   <input type="*">
	   *     - text
	   *     - checkbox
	   *     - radio
	   *     - number
	   */

	  bind: function () {
	    // friendly warning...
	    this.checkFilters()
	    if (this.hasRead && !this.hasWrite) {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'It seems you are using a read-only filter with ' +
	        'v-model. You might want to use a two-way filter ' +
	        'to ensure correct behavior.'
	      )
	    }
	    var el = this.el
	    var tag = el.tagName
	    var handler
	    if (tag === 'INPUT') {
	      handler = handlers[el.type] || handlers.text
	    } else if (tag === 'SELECT') {
	      handler = handlers.select
	    } else if (tag === 'TEXTAREA') {
	      handler = handlers.text
	    } else {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'v-model does not support element type: ' + tag
	      )
	      return
	    }
	    el.__v_model = this
	    handler.bind.call(this)
	    this.update = handler.update
	    this._unbind = handler.unbind
	  },

	  /**
	   * Check read/write filter stats.
	   */

	  checkFilters: function () {
	    var filters = this.filters
	    if (!filters) return
	    var i = filters.length
	    while (i--) {
	      var filter = _.resolveAsset(this.vm.$options, 'filters', filters[i].name)
	      if (typeof filter === 'function' || filter.read) {
	        this.hasRead = true
	      }
	      if (filter.write) {
	        this.hasWrite = true
	      }
	    }
	  },

	  unbind: function () {
	    this.el.__v_model = null
	    this._unbind && this._unbind()
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(9)

	module.exports = {

	  bind: function () {
	    var self = this
	    var el = this.el
	    var isRange = el.type === 'range'
	    var lazy = this.params.lazy
	    var number = this.params.number
	    var debounce = this.params.debounce

	    // handle composition events.
	    //   http://blog.evanyou.me/2014/01/03/composition-event/
	    // skip this for Android because it handles composition
	    // events quite differently. Android doesn't trigger
	    // composition events for language input methods e.g.
	    // Chinese, but instead triggers them for spelling
	    // suggestions... (see Discussion/#162)
	    var composing = false
	    if (!_.isAndroid && !isRange) {
	      this.on('compositionstart', function () {
	        composing = true
	      })
	      this.on('compositionend', function () {
	        composing = false
	        // in IE11 the "compositionend" event fires AFTER
	        // the "input" event, so the input handler is blocked
	        // at the end... have to call it here.
	        //
	        // #1327: in lazy mode this is unecessary.
	        if (!lazy) {
	          self.listener()
	        }
	      })
	    }

	    // prevent messing with the input when user is typing,
	    // and force update on blur.
	    this.focused = false
	    if (!isRange) {
	      this.on('focus', function () {
	        self.focused = true
	      })
	      this.on('blur', function () {
	        self.focused = false
	        self.listener()
	      })
	    }

	    // Now attach the main listener
	    this.listener = function () {
	      if (composing) return
	      var val = number || isRange
	        ? _.toNumber(el.value)
	        : el.value
	      self.set(val)
	      // force update on next tick to avoid lock & same value
	      // also only update when user is not typing
	      _.nextTick(function () {
	        if (self._bound && !self.focused) {
	          self.update(self._watcher.value)
	        }
	      })
	    }

	    // apply debounce
	    if (debounce) {
	      this.listener = _.debounce(this.listener, debounce)
	    }

	    // Support jQuery events, since jQuery.trigger() doesn't
	    // trigger native events in some cases and some plugins
	    // rely on $.trigger()
	    //
	    // We want to make sure if a listener is attached using
	    // jQuery, it is also removed with jQuery, that's why
	    // we do the check for each directive instance and
	    // store that check result on itself. This also allows
	    // easier test coverage control by unsetting the global
	    // jQuery variable in tests.
	    this.hasjQuery = typeof jQuery === 'function'
	    if (this.hasjQuery) {
	      jQuery(el).on('change', this.listener)
	      if (!lazy) {
	        jQuery(el).on('input', this.listener)
	      }
	    } else {
	      this.on('change', this.listener)
	      if (!lazy) {
	        this.on('input', this.listener)
	      }
	    }

	    // IE9 doesn't fire input event on backspace/del/cut
	    if (!lazy && _.isIE9) {
	      this.on('cut', function () {
	        _.nextTick(self.listener)
	      })
	      this.on('keyup', function (e) {
	        if (e.keyCode === 46 || e.keyCode === 8) {
	          self.listener()
	        }
	      })
	    }

	    // set initial value if present
	    if (
	      el.hasAttribute('value') ||
	      (el.tagName === 'TEXTAREA' && el.value.trim())
	    ) {
	      this.afterBind = this.listener
	    }
	  },

	  update: function (value) {
	    this.el.value = _.toString(value)
	  },

	  unbind: function () {
	    var el = this.el
	    if (this.hasjQuery) {
	      jQuery(el).off('change', this.listener)
	      jQuery(el).off('input', this.listener)
	    }
	  }
	}


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(9)

	module.exports = {

	  bind: function () {
	    var self = this
	    var el = this.el

	    this.getValue = function () {
	      // value overwrite via v-bind:value
	      if (el.hasOwnProperty('_value')) {
	        return el._value
	      }
	      var val = el.value
	      if (self.params.number) {
	        val = _.toNumber(val)
	      }
	      return val
	    }

	    this.listener = function () {
	      self.set(self.getValue())
	    }
	    this.on('change', this.listener)

	    if (el.checked) {
	      this.afterBind = this.listener
	    }
	  },

	  update: function (value) {
	    this.el.checked = _.looseEqual(value, this.getValue())
	  }
	}


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(9)

	module.exports = {

	  bind: function () {
	    var self = this
	    var el = this.el

	    // method to force update DOM using latest value.
	    this.forceUpdate = function () {
	      if (self._watcher) {
	        self.update(self._watcher.get())
	      }
	    }

	    // check if this is a multiple select
	    var multiple = this.multiple = el.hasAttribute('multiple')

	    // attach listener
	    this.listener = function () {
	      var value = getValue(el, multiple)
	      value = self.params.number
	        ? _.isArray(value)
	          ? value.map(_.toNumber)
	          : _.toNumber(value)
	        : value
	      self.set(value)
	    }
	    this.on('change', this.listener)

	    // if has initial value, set afterBind
	    var initValue = getValue(el, multiple, true)
	    if ((multiple && initValue.length) ||
	        (!multiple && initValue !== null)) {
	      this.afterBind = this.listener
	    }

	    // All major browsers except Firefox resets
	    // selectedIndex with value -1 to 0 when the element
	    // is appended to a new parent, therefore we have to
	    // force a DOM update whenever that happens...
	    this.vm.$on('hook:attached', this.forceUpdate)
	  },

	  update: function (value) {
	    var el = this.el
	    el.selectedIndex = -1
	    var multi = this.multiple && _.isArray(value)
	    var options = el.options
	    var i = options.length
	    var op, val
	    while (i--) {
	      op = options[i]
	      val = op.hasOwnProperty('_value')
	        ? op._value
	        : op.value
	      /* eslint-disable eqeqeq */
	      op.selected = multi
	        ? indexOf(value, val) > -1
	        : _.looseEqual(value, val)
	      /* eslint-enable eqeqeq */
	    }
	  },

	  unbind: function () {
	    /* istanbul ignore next */
	    this.vm.$off('hook:attached', this.forceUpdate)
	  }
	}

	/**
	 * Get select value
	 *
	 * @param {SelectElement} el
	 * @param {Boolean} multi
	 * @param {Boolean} init
	 * @return {Array|*}
	 */

	function getValue (el, multi, init) {
	  var res = multi ? [] : null
	  var op, val, selected
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    op = el.options[i]
	    selected = init
	      ? op.hasAttribute('selected')
	      : op.selected
	    if (selected) {
	      val = op.hasOwnProperty('_value')
	        ? op._value
	        : op.value
	      if (multi) {
	        res.push(val)
	      } else {
	        return val
	      }
	    }
	  }
	  return res
	}

	/**
	 * Native Array.indexOf uses strict equal, but in this
	 * case we need to match string/numbers with custom equal.
	 *
	 * @param {Array} arr
	 * @param {*} val
	 */

	function indexOf (arr, val) {
	  var i = arr.length
	  while (i--) {
	    if (_.looseEqual(arr[i], val)) {
	      return i
	    }
	  }
	  return -1
	}


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(9)

	module.exports = {

	  bind: function () {
	    var self = this
	    var el = this.el

	    this.getValue = function () {
	      return el.hasOwnProperty('_value')
	        ? el._value
	        : self.params.number
	          ? _.toNumber(el.value)
	          : el.value
	    }

	    function getBooleanValue () {
	      var val = el.checked
	      if (val && el.hasOwnProperty('_trueValue')) {
	        return el._trueValue
	      }
	      if (!val && el.hasOwnProperty('_falseValue')) {
	        return el._falseValue
	      }
	      return val
	    }

	    this.listener = function () {
	      var model = self._watcher.value
	      if (_.isArray(model)) {
	        var val = self.getValue()
	        if (el.checked) {
	          if (_.indexOf(model, val) < 0) {
	            model.push(val)
	          }
	        } else {
	          model.$remove(val)
	        }
	      } else {
	        self.set(getBooleanValue())
	      }
	    }

	    this.on('change', this.listener)
	    if (el.checked) {
	      this.afterBind = this.listener
	    }
	  },

	  update: function (value) {
	    var el = this.el
	    if (_.isArray(value)) {
	      el.checked = _.indexOf(value, this.getValue()) > -1
	    } else {
	      if (el.hasOwnProperty('_trueValue')) {
	        el.checked = _.looseEqual(value, el._trueValue)
	      } else {
	        el.checked = !!value
	      }
	    }
	  }
	}


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(9)

	// keyCode aliases
	var keyCodes = {
	  esc: 27,
	  tab: 9,
	  enter: 13,
	  space: 32,
	  'delete': 46,
	  up: 38,
	  left: 37,
	  right: 39,
	  down: 40
	}

	function keyFilter (handler, keys) {
	  var codes = keys.map(function (key) {
	    var charCode = key.charCodeAt(0)
	    if (charCode > 47 && charCode < 58) {
	      return parseInt(key, 10)
	    }
	    if (key.length === 1) {
	      charCode = key.toUpperCase().charCodeAt(0)
	      if (charCode > 64 && charCode < 91) {
	        return charCode
	      }
	    }
	    return keyCodes[key]
	  })
	  return function keyHandler (e) {
	    if (codes.indexOf(e.keyCode) > -1) {
	      return handler.call(this, e)
	    }
	  }
	}

	function stopFilter (handler) {
	  return function stopHandler (e) {
	    e.stopPropagation()
	    return handler.call(this, e)
	  }
	}

	function preventFilter (handler) {
	  return function preventHandler (e) {
	    e.preventDefault()
	    return handler.call(this, e)
	  }
	}

	module.exports = {

	  acceptStatement: true,
	  priority: 700,

	  bind: function () {
	    // deal with iframes
	    if (
	      this.el.tagName === 'IFRAME' &&
	      this.arg !== 'load'
	    ) {
	      var self = this
	      this.iframeBind = function () {
	        _.on(self.el.contentWindow, self.arg, self.handler)
	      }
	      this.on('load', this.iframeBind)
	    }
	  },

	  update: function (handler) {
	    // stub a noop for v-on with no value,
	    // e.g. @mousedown.prevent
	    if (!this.descriptor.raw) {
	      handler = function () {}
	    }

	    if (typeof handler !== 'function') {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'v-on:' + this.arg + '="' +
	        this.expression + '" expects a function value, ' +
	        'got ' + handler
	      )
	      return
	    }

	    // apply modifiers
	    if (this.modifiers.stop) {
	      handler = stopFilter(handler)
	    }
	    if (this.modifiers.prevent) {
	      handler = preventFilter(handler)
	    }
	    // key filter
	    var keys = Object.keys(this.modifiers)
	      .filter(function (key) {
	        return key !== 'stop' && key !== 'prevent'
	      })
	    if (keys.length) {
	      handler = keyFilter(handler, keys)
	    }

	    this.reset()
	    this.handler = handler

	    if (this.iframeBind) {
	      this.iframeBind()
	    } else {
	      _.on(this.el, this.arg, this.handler)
	    }
	  },

	  reset: function () {
	    var el = this.iframeBind
	      ? this.el.contentWindow
	      : this.el
	    if (this.handler) {
	      _.off(el, this.arg, this.handler)
	    }
	  },

	  unbind: function () {
	    this.reset()
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(9)

	// xlink
	var xlinkNS = 'http://www.w3.org/1999/xlink'
	var xlinkRE = /^xlink:/

	// these input element attributes should also set their
	// corresponding properties
	var inputProps = {
	  value: 1,
	  checked: 1,
	  selected: 1
	}

	// these attributes should set a hidden property for
	// binding v-model to object values
	var modelProps = {
	  value: '_value',
	  'true-value': '_trueValue',
	  'false-value': '_falseValue'
	}

	// check for attributes that prohibit interpolations
	var disallowedInterpAttrRE = /^v-|^:|^@|^(is|transition|transition-mode|debounce|track-by|stagger|enter-stagger|leave-stagger)$/

	module.exports = {

	  priority: 850,

	  bind: function () {
	    var attr = this.arg
	    var tag = this.el.tagName
	    // should be deep watch on object mode
	    if (!attr) {
	      this.deep = true
	    }
	    // handle interpolation bindings
	    if (this.descriptor.interp) {
	      // only allow binding on native attributes
	      if (
	        disallowedInterpAttrRE.test(attr) ||
	        (attr === 'name' && (tag === 'PARTIAL' || tag === 'SLOT'))
	      ) {
	        process.env.NODE_ENV !== 'production' && _.warn(
	          attr + '="' + this.descriptor.raw + '": ' +
	          'attribute interpolation is not allowed in Vue.js ' +
	          'directives and special attributes.'
	        )
	        this.el.removeAttribute(attr)
	        this.invalid = true
	      }

	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production') {
	        var raw = attr + '="' + this.descriptor.raw + '": '
	        // warn src
	        if (attr === 'src') {
	          _.warn(
	            raw + 'interpolation in "src" attribute will cause ' +
	            'a 404 request. Use v-bind:src instead.'
	          )
	        }

	        // warn style
	        if (attr === 'style') {
	          _.warn(
	            raw + 'interpolation in "style" attribute will cause ' +
	            'the attribute to be discarded in Internet Explorer. ' +
	            'Use v-bind:style instead.'
	          )
	        }
	      }
	    }
	  },

	  update: function (value) {
	    if (this.invalid) {
	      return
	    }
	    var attr = this.arg
	    if (this.arg) {
	      this.handleSingle(attr, value)
	    } else {
	      this.handleObject(value || {})
	    }
	  },

	  // share object handler with v-bind:class
	  handleObject: __webpack_require__(40).handleObject,

	  handleSingle: function (attr, value) {
	    if (inputProps[attr] && attr in this.el) {
	      this.el[attr] = attr === 'value'
	        ? (value || '') // IE9 will set input.value to "null" for null...
	        : value
	    }
	    // set model props
	    var modelProp = modelProps[attr]
	    if (modelProp) {
	      this.el[modelProp] = value
	      // update v-model if present
	      var model = this.el.__v_model
	      if (model) {
	        model.listener()
	      }
	    }
	    // do not set value attribute for textarea
	    if (attr === 'value' && this.el.tagName === 'TEXTAREA') {
	      this.el.removeAttribute(attr)
	      return
	    }
	    // update attribute
	    if (value != null && value !== false) {
	      if (xlinkRE.test(attr)) {
	        this.el.setAttributeNS(xlinkNS, attr, value)
	      } else {
	        this.el.setAttribute(attr, value)
	      }
	    } else {
	      this.el.removeAttribute(attr)
	    }
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(9)
	var prefixes = ['-webkit-', '-moz-', '-ms-']
	var camelPrefixes = ['Webkit', 'Moz', 'ms']
	var importantRE = /!important;?$/
	var testEl = null
	var propCache = {}

	module.exports = {

	  deep: true,

	  update: function (value) {
	    if (typeof value === 'string') {
	      this.el.style.cssText = value
	    } else if (_.isArray(value)) {
	      this.handleObject(value.reduce(_.extend, {}))
	    } else {
	      this.handleObject(value || {})
	    }
	  },

	  handleObject: function (value) {
	    // cache object styles so that only changed props
	    // are actually updated.
	    var cache = this.cache || (this.cache = {})
	    var name, val
	    for (name in cache) {
	      if (!(name in value)) {
	        this.handleSingle(name, null)
	        delete cache[name]
	      }
	    }
	    for (name in value) {
	      val = value[name]
	      if (val !== cache[name]) {
	        cache[name] = val
	        this.handleSingle(name, val)
	      }
	    }
	  },

	  handleSingle: function (prop, value) {
	    prop = normalize(prop)
	    if (!prop) return // unsupported prop
	    // cast possible numbers/booleans into strings
	    if (value != null) value += ''
	    if (value) {
	      var isImportant = importantRE.test(value)
	        ? 'important'
	        : ''
	      if (isImportant) {
	        value = value.replace(importantRE, '').trim()
	      }
	      this.el.style.setProperty(prop, value, isImportant)
	    } else {
	      this.el.style.removeProperty(prop)
	    }
	  }

	}

	/**
	 * Normalize a CSS property name.
	 * - cache result
	 * - auto prefix
	 * - camelCase -> dash-case
	 *
	 * @param {String} prop
	 * @return {String}
	 */

	function normalize (prop) {
	  if (propCache[prop]) {
	    return propCache[prop]
	  }
	  var res = prefix(prop)
	  propCache[prop] = propCache[res] = res
	  return res
	}

	/**
	 * Auto detect the appropriate prefix for a CSS property.
	 * https://gist.github.com/paulirish/523692
	 *
	 * @param {String} prop
	 * @return {String}
	 */

	function prefix (prop) {
	  prop = _.hyphenate(prop)
	  var camel = _.camelize(prop)
	  var upper = camel.charAt(0).toUpperCase() + camel.slice(1)
	  if (!testEl) {
	    testEl = document.createElement('div')
	  }
	  if (camel in testEl.style) {
	    return prop
	  }
	  var i = prefixes.length
	  var prefixed
	  while (i--) {
	    prefixed = camelPrefixes[i] + upper
	    if (prefixed in testEl.style) {
	      return prefixes[i] + prop
	    }
	  }
	}


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(9)

	module.exports = {

	  priority: 1500,

	  bind: function () {
	    /* istanbul ignore if */
	    if (!this.arg) {
	      return
	    }
	    var id = this.id = _.camelize(this.arg)
	    var refs = (this._scope || this.vm).$els
	    if (refs.hasOwnProperty(id)) {
	      refs[id] = this.el
	    } else {
	      _.defineReactive(refs, id, this.el)
	    }
	  },

	  unbind: function () {
	    var refs = (this._scope || this.vm).$els
	    if (refs[this.id] === this.el) {
	      refs[this.id] = null
	    }
	  }
	}


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {if (process.env.NODE_ENV !== 'production') {
	  module.exports = {
	    bind: function () {
	      __webpack_require__(9).warn(
	        'v-ref:' + this.arg + ' must be used on a child ' +
	        'component. Found on <' + this.el.tagName.toLowerCase() + '>.'
	      )
	    }
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = {
	  bind: function () {
	    var el = this.el
	    this.vm.$once('hook:compiled', function () {
	      el.removeAttribute('v-cloak')
	    })
	  }
	}


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	exports.style = __webpack_require__(40)
	exports['class'] = __webpack_require__(45)
	exports.component = __webpack_require__(46)
	exports.prop = __webpack_require__(47)
	exports.transition = __webpack_require__(53)


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(9)
	var addClass = _.addClass
	var removeClass = _.removeClass

	module.exports = {

	  deep: true,

	  update: function (value) {
	    if (value && typeof value === 'string') {
	      this.handleObject(stringToObject(value))
	    } else if (_.isPlainObject(value)) {
	      this.handleObject(value)
	    } else if (_.isArray(value)) {
	      this.handleArray(value)
	    } else {
	      this.cleanup()
	    }
	  },

	  handleObject: function (value) {
	    this.cleanup(value)
	    var keys = this.prevKeys = Object.keys(value)
	    for (var i = 0, l = keys.length; i < l; i++) {
	      var key = keys[i]
	      if (value[key]) {
	        addClass(this.el, key)
	      } else {
	        removeClass(this.el, key)
	      }
	    }
	  },

	  handleArray: function (value) {
	    this.cleanup(value)
	    for (var i = 0, l = value.length; i < l; i++) {
	      if (value[i]) {
	        addClass(this.el, value[i])
	      }
	    }
	    this.prevKeys = value.slice()
	  },

	  cleanup: function (value) {
	    if (this.prevKeys) {
	      var i = this.prevKeys.length
	      while (i--) {
	        var key = this.prevKeys[i]
	        if (key && (!value || !contains(value, key))) {
	          removeClass(this.el, key)
	        }
	      }
	    }
	  }
	}

	function stringToObject (value) {
	  var res = {}
	  var keys = value.trim().split(/\s+/)
	  var i = keys.length
	  while (i--) {
	    res[keys[i]] = true
	  }
	  return res
	}

	function contains (value, key) {
	  return _.isArray(value)
	    ? value.indexOf(key) > -1
	    : value.hasOwnProperty(key)
	}


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(9)
	var templateParser = __webpack_require__(27)

	module.exports = {

	  priority: 1500,

	  params: [
	    'keep-alive',
	    'transition-mode',
	    'inline-template'
	  ],

	  /**
	   * Setup. Two possible usages:
	   *
	   * - static:
	   *   <comp> or <div v-component="comp">
	   *
	   * - dynamic:
	   *   <component :is="view">
	   */

	  bind: function () {
	    if (!this.el.__vue__) {
	      // keep-alive cache
	      this.keepAlive = this.params.keepAlive
	      if (this.keepAlive) {
	        this.cache = {}
	      }
	      // check inline-template
	      if (this.params.inlineTemplate) {
	        // extract inline template as a DocumentFragment
	        this.inlineTemplate = _.extractContent(this.el, true)
	      }
	      // component resolution related state
	      this.pendingComponentCb =
	      this.Component = null
	      // transition related state
	      this.pendingRemovals = 0
	      this.pendingRemovalCb = null
	      // create a ref anchor
	      this.anchor = _.createAnchor('v-component')
	      _.replace(this.el, this.anchor)
	      // remove is attribute.
	      // this is removed during compilation, but because compilation is
	      // cached, when the component is used elsewhere this attribute
	      // will remain at link time.
	      this.el.removeAttribute('is')
	      // remove ref, same as above
	      if (this.descriptor.ref) {
	        this.el.removeAttribute('v-ref:' + _.hyphenate(this.descriptor.ref))
	      }
	      // if static, build right now.
	      if (this.literal) {
	        this.setComponent(this.expression)
	      }
	    } else {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'cannot mount component "' + this.expression + '" ' +
	        'on already mounted element: ' + this.el
	      )
	    }
	  },

	  /**
	   * Public update, called by the watcher in the dynamic
	   * literal scenario, e.g. <component :is="view">
	   */

	  update: function (value) {
	    if (!this.literal) {
	      this.setComponent(value)
	    }
	  },

	  /**
	   * Switch dynamic components. May resolve the component
	   * asynchronously, and perform transition based on
	   * specified transition mode. Accepts a few additional
	   * arguments specifically for vue-router.
	   *
	   * The callback is called when the full transition is
	   * finished.
	   *
	   * @param {String} value
	   * @param {Function} [cb]
	   */

	  setComponent: function (value, cb) {
	    this.invalidatePending()
	    if (!value) {
	      // just remove current
	      this.unbuild(true)
	      this.remove(this.childVM, cb)
	      this.childVM = null
	    } else {
	      var self = this
	      this.resolveComponent(value, function () {
	        self.mountComponent(cb)
	      })
	    }
	  },

	  /**
	   * Resolve the component constructor to use when creating
	   * the child vm.
	   */

	  resolveComponent: function (id, cb) {
	    var self = this
	    this.pendingComponentCb = _.cancellable(function (Component) {
	      self.ComponentName = Component.options.name || id
	      self.Component = Component
	      cb()
	    })
	    this.vm._resolveComponent(id, this.pendingComponentCb)
	  },

	  /**
	   * Create a new instance using the current constructor and
	   * replace the existing instance. This method doesn't care
	   * whether the new component and the old one are actually
	   * the same.
	   *
	   * @param {Function} [cb]
	   */

	  mountComponent: function (cb) {
	    // actual mount
	    this.unbuild(true)
	    var self = this
	    var activateHook = this.Component.options.activate
	    var cached = this.getCached()
	    var newComponent = this.build()
	    if (activateHook && !cached) {
	      this.waitingFor = newComponent
	      activateHook.call(newComponent, function () {
	        self.waitingFor = null
	        self.transition(newComponent, cb)
	      })
	    } else {
	      // update ref for kept-alive component
	      if (cached) {
	        newComponent._updateRef()
	      }
	      this.transition(newComponent, cb)
	    }
	  },

	  /**
	   * When the component changes or unbinds before an async
	   * constructor is resolved, we need to invalidate its
	   * pending callback.
	   */

	  invalidatePending: function () {
	    if (this.pendingComponentCb) {
	      this.pendingComponentCb.cancel()
	      this.pendingComponentCb = null
	    }
	  },

	  /**
	   * Instantiate/insert a new child vm.
	   * If keep alive and has cached instance, insert that
	   * instance; otherwise build a new one and cache it.
	   *
	   * @param {Object} [extraOptions]
	   * @return {Vue} - the created instance
	   */

	  build: function (extraOptions) {
	    var cached = this.getCached()
	    if (cached) {
	      return cached
	    }
	    if (this.Component) {
	      // default options
	      var options = {
	        name: this.ComponentName,
	        el: templateParser.clone(this.el),
	        template: this.inlineTemplate,
	        // make sure to add the child with correct parent
	        // if this is a transcluded component, its parent
	        // should be the transclusion host.
	        parent: this._host || this.vm,
	        // if no inline-template, then the compiled
	        // linker can be cached for better performance.
	        _linkerCachable: !this.inlineTemplate,
	        _ref: this.descriptor.ref,
	        _asComponent: true,
	        _isRouterView: this._isRouterView,
	        // if this is a transcluded component, context
	        // will be the common parent vm of this instance
	        // and its host.
	        _context: this.vm,
	        // if this is inside an inline v-for, the scope
	        // will be the intermediate scope created for this
	        // repeat fragment. this is used for linking props
	        // and container directives.
	        _scope: this._scope,
	        // pass in the owner fragment of this component.
	        // this is necessary so that the fragment can keep
	        // track of its contained components in order to
	        // call attach/detach hooks for them.
	        _frag: this._frag
	      }
	      // extra options
	      // in 1.0.0 this is used by vue-router only
	      /* istanbul ignore if */
	      if (extraOptions) {
	        _.extend(options, extraOptions)
	      }
	      var child = new this.Component(options)
	      if (this.keepAlive) {
	        this.cache[this.Component.cid] = child
	      }
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' &&
	          this.el.hasAttribute('transition') &&
	          child._isFragment) {
	        _.warn(
	          'Transitions will not work on a fragment instance. ' +
	          'Template: ' + child.$options.template
	        )
	      }
	      return child
	    }
	  },

	  /**
	   * Try to get a cached instance of the current component.
	   *
	   * @return {Vue|undefined}
	   */

	  getCached: function () {
	    return this.keepAlive && this.cache[this.Component.cid]
	  },

	  /**
	   * Teardown the current child, but defers cleanup so
	   * that we can separate the destroy and removal steps.
	   *
	   * @param {Boolean} defer
	   */

	  unbuild: function (defer) {
	    if (this.waitingFor) {
	      this.waitingFor.$destroy()
	      this.waitingFor = null
	    }
	    var child = this.childVM
	    if (!child || this.keepAlive) {
	      if (child) {
	        // remove ref
	        child._updateRef(true)
	      }
	      return
	    }
	    // the sole purpose of `deferCleanup` is so that we can
	    // "deactivate" the vm right now and perform DOM removal
	    // later.
	    child.$destroy(false, defer)
	  },

	  /**
	   * Remove current destroyed child and manually do
	   * the cleanup after removal.
	   *
	   * @param {Function} cb
	   */

	  remove: function (child, cb) {
	    var keepAlive = this.keepAlive
	    if (child) {
	      // we may have a component switch when a previous
	      // component is still being transitioned out.
	      // we want to trigger only one lastest insertion cb
	      // when the existing transition finishes. (#1119)
	      this.pendingRemovals++
	      this.pendingRemovalCb = cb
	      var self = this
	      child.$remove(function () {
	        self.pendingRemovals--
	        if (!keepAlive) child._cleanup()
	        if (!self.pendingRemovals && self.pendingRemovalCb) {
	          self.pendingRemovalCb()
	          self.pendingRemovalCb = null
	        }
	      })
	    } else if (cb) {
	      cb()
	    }
	  },

	  /**
	   * Actually swap the components, depending on the
	   * transition mode. Defaults to simultaneous.
	   *
	   * @param {Vue} target
	   * @param {Function} [cb]
	   */

	  transition: function (target, cb) {
	    var self = this
	    var current = this.childVM
	    // for devtool inspection
	    if (process.env.NODE_ENV !== 'production') {
	      if (current) current._inactive = true
	      target._inactive = false
	    }
	    this.childVM = target
	    switch (self.params.transitionMode) {
	      case 'in-out':
	        target.$before(self.anchor, function () {
	          self.remove(current, cb)
	        })
	        break
	      case 'out-in':
	        self.remove(current, function () {
	          target.$before(self.anchor, cb)
	        })
	        break
	      default:
	        self.remove(current)
	        target.$before(self.anchor, cb)
	    }
	  },

	  /**
	   * Unbind.
	   */

	  unbind: function () {
	    this.invalidatePending()
	    // Do not defer cleanup when unbinding
	    this.unbuild()
	    // destroy all keep-alive cached instances
	    if (this.cache) {
	      for (var key in this.cache) {
	        this.cache[key].$destroy()
	      }
	      this.cache = null
	    }
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// NOTE: the prop internal directive is compiled and linked
	// during _initScope(), before the created hook is called.
	// The purpose is to make the initial prop values available
	// inside `created` hooks and `data` functions.

	var _ = __webpack_require__(9)
	var Watcher = __webpack_require__(48)
	var bindingModes = __webpack_require__(13)._propBindingModes

	module.exports = {

	  bind: function () {

	    var child = this.vm
	    var parent = child._context
	    // passed in from compiler directly
	    var prop = this.descriptor.prop
	    var childKey = prop.path
	    var parentKey = prop.parentPath
	    var twoWay = prop.mode === bindingModes.TWO_WAY

	    var parentWatcher = this.parentWatcher = new Watcher(
	      parent,
	      parentKey,
	      function (val) {
	        if (_.assertProp(prop, val)) {
	          child[childKey] = val
	        }
	      }, {
	        twoWay: twoWay,
	        filters: prop.filters,
	        // important: props need to be observed on the
	        // v-for scope if present
	        scope: this._scope
	      }
	    )

	    // set the child initial value.
	    _.initProp(child, prop, parentWatcher.value)

	    // setup two-way binding
	    if (twoWay) {
	      // important: defer the child watcher creation until
	      // the created hook (after data observation)
	      var self = this
	      child.$once('hook:created', function () {
	        self.childWatcher = new Watcher(
	          child,
	          childKey,
	          function (val) {
	            parentWatcher.set(val)
	          }, {
	            // ensure sync upward before parent sync down.
	            // this is necessary in cases e.g. the child
	            // mutates a prop array, then replaces it. (#1683)
	            sync: true
	          }
	        )
	      })
	    }
	  },

	  unbind: function () {
	    this.parentWatcher.teardown()
	    if (this.childWatcher) {
	      this.childWatcher.teardown()
	    }
	  }
	}


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(9)
	var config = __webpack_require__(13)
	var Dep = __webpack_require__(49)
	var expParser = __webpack_require__(50)
	var batcher = __webpack_require__(52)
	var uid = 0

	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 *
	 * @param {Vue} vm
	 * @param {String} expression
	 * @param {Function} cb
	 * @param {Object} options
	 *                 - {Array} filters
	 *                 - {Boolean} twoWay
	 *                 - {Boolean} deep
	 *                 - {Boolean} user
	 *                 - {Boolean} sync
	 *                 - {Boolean} lazy
	 *                 - {Function} [preProcess]
	 *                 - {Function} [postProcess]
	 * @constructor
	 */

	function Watcher (vm, expOrFn, cb, options) {
	  // mix in options
	  if (options) {
	    _.extend(this, options)
	  }
	  var isFn = typeof expOrFn === 'function'
	  this.vm = vm
	  vm._watchers.push(this)
	  this.expression = isFn ? expOrFn.toString() : expOrFn
	  this.cb = cb
	  this.id = ++uid // uid for batching
	  this.active = true
	  this.dirty = this.lazy // for lazy watchers
	  this.deps = Object.create(null)
	  this.newDeps = null
	  this.prevError = null // for async error stacks
	  // parse expression for getter/setter
	  if (isFn) {
	    this.getter = expOrFn
	    this.setter = undefined
	  } else {
	    var res = expParser.parse(expOrFn, this.twoWay)
	    this.getter = res.get
	    this.setter = res.set
	  }
	  this.value = this.lazy
	    ? undefined
	    : this.get()
	  // state for avoiding false triggers for deep and Array
	  // watchers during vm._digest()
	  this.queued = this.shallow = false
	}

	/**
	 * Add a dependency to this directive.
	 *
	 * @param {Dep} dep
	 */

	Watcher.prototype.addDep = function (dep) {
	  var id = dep.id
	  if (!this.newDeps[id]) {
	    this.newDeps[id] = dep
	    if (!this.deps[id]) {
	      this.deps[id] = dep
	      dep.addSub(this)
	    }
	  }
	}

	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */

	Watcher.prototype.get = function () {
	  this.beforeGet()
	  var scope = this.scope || this.vm
	  var value
	  try {
	    value = this.getter.call(scope, scope)
	  } catch (e) {
	    if (
	      process.env.NODE_ENV !== 'production' &&
	      config.warnExpressionErrors
	    ) {
	      _.warn(
	        'Error when evaluating expression "' +
	        this.expression + '". ' +
	        (config.debug
	          ? ''
	          : 'Turn on debug mode to see stack trace.'
	        ), e
	      )
	    }
	  }
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value)
	  }
	  if (this.preProcess) {
	    value = this.preProcess(value)
	  }
	  if (this.filters) {
	    value = scope._applyFilters(value, null, this.filters, false)
	  }
	  if (this.postProcess) {
	    value = this.postProcess(value)
	  }
	  this.afterGet()
	  return value
	}

	/**
	 * Set the corresponding value with the setter.
	 *
	 * @param {*} value
	 */

	Watcher.prototype.set = function (value) {
	  var scope = this.scope || this.vm
	  if (this.filters) {
	    value = scope._applyFilters(
	      value, this.value, this.filters, true)
	  }
	  try {
	    this.setter.call(scope, scope, value)
	  } catch (e) {
	    if (
	      process.env.NODE_ENV !== 'production' &&
	      config.warnExpressionErrors
	    ) {
	      _.warn(
	        'Error when evaluating setter "' +
	        this.expression + '"', e
	      )
	    }
	  }
	  // two-way sync for v-for alias
	  var forContext = scope.$forContext
	  if (forContext && forContext.alias === this.expression) {
	    if (forContext.filters) {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'It seems you are using two-way binding on ' +
	        'a v-for alias (' + this.expression + '), and the ' +
	        'v-for has filters. This will not work properly. ' +
	        'Either remove the filters or use an array of ' +
	        'objects and bind to object properties instead.'
	      )
	      return
	    }
	    forContext._withLock(function () {
	      if (scope.$key) { // original is an object
	        forContext.rawValue[scope.$key] = value
	      } else {
	        forContext.rawValue.$set(scope.$index, value)
	      }
	    })
	  }
	}

	/**
	 * Prepare for dependency collection.
	 */

	Watcher.prototype.beforeGet = function () {
	  Dep.target = this
	  this.newDeps = Object.create(null)
	}

	/**
	 * Clean up for dependency collection.
	 */

	Watcher.prototype.afterGet = function () {
	  Dep.target = null
	  var ids = Object.keys(this.deps)
	  var i = ids.length
	  while (i--) {
	    var id = ids[i]
	    if (!this.newDeps[id]) {
	      this.deps[id].removeSub(this)
	    }
	  }
	  this.deps = this.newDeps
	}

	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 *
	 * @param {Boolean} shallow
	 */

	Watcher.prototype.update = function (shallow) {
	  if (this.lazy) {
	    this.dirty = true
	  } else if (this.sync || !config.async) {
	    this.run()
	  } else {
	    // if queued, only overwrite shallow with non-shallow,
	    // but not the other way around.
	    this.shallow = this.queued
	      ? shallow
	        ? this.shallow
	        : false
	      : !!shallow
	    this.queued = true
	    // record before-push error stack in debug mode
	    /* istanbul ignore if */
	    if (process.env.NODE_ENV !== 'production' && config.debug) {
	      this.prevError = new Error('[vue] async stack trace')
	    }
	    batcher.push(this)
	  }
	}

	/**
	 * Batcher job interface.
	 * Will be called by the batcher.
	 */

	Watcher.prototype.run = function () {
	  if (this.active) {
	    var value = this.get()
	    if (
	      value !== this.value ||
	      // Deep watchers and Array watchers should fire even
	      // when the value is the same, because the value may
	      // have mutated; but only do so if this is a
	      // non-shallow update (caused by a vm digest).
	      ((_.isArray(value) || this.deep) && !this.shallow)
	    ) {
	      // set new value
	      var oldValue = this.value
	      this.value = value
	      // in debug + async mode, when a watcher callbacks
	      // throws, we also throw the saved before-push error
	      // so the full cross-tick stack trace is available.
	      var prevError = this.prevError
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' &&
	          config.debug && prevError) {
	        this.prevError = null
	        try {
	          this.cb.call(this.vm, value, oldValue)
	        } catch (e) {
	          _.nextTick(function () {
	            throw prevError
	          }, 0)
	          throw e
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue)
	      }
	    }
	    this.queued = this.shallow = false
	  }
	}

	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */

	Watcher.prototype.evaluate = function () {
	  // avoid overwriting another watcher that is being
	  // collected.
	  var current = Dep.target
	  this.value = this.get()
	  this.dirty = false
	  Dep.target = current
	}

	/**
	 * Depend on all deps collected by this watcher.
	 */

	Watcher.prototype.depend = function () {
	  var depIds = Object.keys(this.deps)
	  var i = depIds.length
	  while (i--) {
	    this.deps[depIds[i]].depend()
	  }
	}

	/**
	 * Remove self from all dependencies' subcriber list.
	 */

	Watcher.prototype.teardown = function () {
	  if (this.active) {
	    // remove self from vm's watcher list
	    // we can skip this if the vm if being destroyed
	    // which can improve teardown performance.
	    if (!this.vm._isBeingDestroyed) {
	      this.vm._watchers.$remove(this)
	    }
	    var depIds = Object.keys(this.deps)
	    var i = depIds.length
	    while (i--) {
	      this.deps[depIds[i]].removeSub(this)
	    }
	    this.active = false
	    this.vm = this.cb = this.value = null
	  }
	}

	/**
	 * Recrusively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 *
	 * @param {*} val
	 */

	function traverse (val) {
	  var i, keys
	  if (_.isArray(val)) {
	    i = val.length
	    while (i--) traverse(val[i])
	  } else if (_.isObject(val)) {
	    keys = Object.keys(val)
	    i = keys.length
	    while (i--) traverse(val[keys[i]])
	  }
	}

	module.exports = Watcher

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(9)
	var uid = 0

	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 *
	 * @constructor
	 */

	function Dep () {
	  this.id = uid++
	  this.subs = []
	}

	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null

	/**
	 * Add a directive subscriber.
	 *
	 * @param {Directive} sub
	 */

	Dep.prototype.addSub = function (sub) {
	  this.subs.push(sub)
	}

	/**
	 * Remove a directive subscriber.
	 *
	 * @param {Directive} sub
	 */

	Dep.prototype.removeSub = function (sub) {
	  this.subs.$remove(sub)
	}

	/**
	 * Add self as a dependency to the target watcher.
	 */

	Dep.prototype.depend = function () {
	  Dep.target.addDep(this)
	}

	/**
	 * Notify all subscribers of a new value.
	 */

	Dep.prototype.notify = function () {
	  // stablize the subscriber list first
	  var subs = _.toArray(this.subs)
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update()
	  }
	}

	module.exports = Dep


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(9)
	var Path = __webpack_require__(51)
	var Cache = __webpack_require__(15)
	var expressionCache = new Cache(1000)

	var allowedKeywords =
	  'Math,Date,this,true,false,null,undefined,Infinity,NaN,' +
	  'isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,' +
	  'encodeURIComponent,parseInt,parseFloat'
	var allowedKeywordsRE =
	  new RegExp('^(' + allowedKeywords.replace(/,/g, '\\b|') + '\\b)')

	// keywords that don't make sense inside expressions
	var improperKeywords =
	  'break,case,class,catch,const,continue,debugger,default,' +
	  'delete,do,else,export,extends,finally,for,function,if,' +
	  'import,in,instanceof,let,return,super,switch,throw,try,' +
	  'var,while,with,yield,enum,await,implements,package,' +
	  'proctected,static,interface,private,public'
	var improperKeywordsRE =
	  new RegExp('^(' + improperKeywords.replace(/,/g, '\\b|') + '\\b)')

	var wsRE = /\s/g
	var newlineRE = /\n/g
	var saveRE = /[\{,]\s*[\w\$_]+\s*:|('[^']*'|"[^"]*")|new |typeof |void /g
	var restoreRE = /"(\d+)"/g
	var pathTestRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/
	var pathReplaceRE = /[^\w$\.]([A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\])*)/g
	var booleanLiteralRE = /^(true|false)$/

	/**
	 * Save / Rewrite / Restore
	 *
	 * When rewriting paths found in an expression, it is
	 * possible for the same letter sequences to be found in
	 * strings and Object literal property keys. Therefore we
	 * remove and store these parts in a temporary array, and
	 * restore them after the path rewrite.
	 */

	var saved = []

	/**
	 * Save replacer
	 *
	 * The save regex can match two possible cases:
	 * 1. An opening object literal
	 * 2. A string
	 * If matched as a plain string, we need to escape its
	 * newlines, since the string needs to be preserved when
	 * generating the function body.
	 *
	 * @param {String} str
	 * @param {String} isString - str if matched as a string
	 * @return {String} - placeholder with index
	 */

	function save (str, isString) {
	  var i = saved.length
	  saved[i] = isString
	    ? str.replace(newlineRE, '\\n')
	    : str
	  return '"' + i + '"'
	}

	/**
	 * Path rewrite replacer
	 *
	 * @param {String} raw
	 * @return {String}
	 */

	function rewrite (raw) {
	  var c = raw.charAt(0)
	  var path = raw.slice(1)
	  if (allowedKeywordsRE.test(path)) {
	    return raw
	  } else {
	    path = path.indexOf('"') > -1
	      ? path.replace(restoreRE, restore)
	      : path
	    return c + 'scope.' + path
	  }
	}

	/**
	 * Restore replacer
	 *
	 * @param {String} str
	 * @param {String} i - matched save index
	 * @return {String}
	 */

	function restore (str, i) {
	  return saved[i]
	}

	/**
	 * Rewrite an expression, prefixing all path accessors with
	 * `scope.` and generate getter/setter functions.
	 *
	 * @param {String} exp
	 * @param {Boolean} needSet
	 * @return {Function}
	 */

	function compileExpFns (exp, needSet) {
	  if (improperKeywordsRE.test(exp)) {
	    process.env.NODE_ENV !== 'production' && _.warn(
	      'Avoid using reserved keywords in expression: ' + exp
	    )
	  }
	  // reset state
	  saved.length = 0
	  // save strings and object literal keys
	  var body = exp
	    .replace(saveRE, save)
	    .replace(wsRE, '')
	  // rewrite all paths
	  // pad 1 space here becaue the regex matches 1 extra char
	  body = (' ' + body)
	    .replace(pathReplaceRE, rewrite)
	    .replace(restoreRE, restore)
	  var getter = makeGetter(body)
	  if (getter) {
	    return {
	      get: getter,
	      body: body,
	      set: needSet
	        ? makeSetter(body)
	        : null
	    }
	  }
	}

	/**
	 * Compile getter setters for a simple path.
	 *
	 * @param {String} exp
	 * @return {Function}
	 */

	function compilePathFns (exp) {
	  var getter, path
	  if (exp.indexOf('[') < 0) {
	    // really simple path
	    path = exp.split('.')
	    path.raw = exp
	    getter = Path.compileGetter(path)
	  } else {
	    // do the real parsing
	    path = Path.parse(exp)
	    getter = path.get
	  }
	  return {
	    get: getter,
	    // always generate setter for simple paths
	    set: function (obj, val) {
	      Path.set(obj, path, val)
	    }
	  }
	}

	/**
	 * Build a getter function. Requires eval.
	 *
	 * We isolate the try/catch so it doesn't affect the
	 * optimization of the parse function when it is not called.
	 *
	 * @param {String} body
	 * @return {Function|undefined}
	 */

	function makeGetter (body) {
	  try {
	    return new Function('scope', 'return ' + body + ';')
	  } catch (e) {
	    process.env.NODE_ENV !== 'production' && _.warn(
	      'Invalid expression. ' +
	      'Generated function body: ' + body
	    )
	  }
	}

	/**
	 * Build a setter function.
	 *
	 * This is only needed in rare situations like "a[b]" where
	 * a settable path requires dynamic evaluation.
	 *
	 * This setter function may throw error when called if the
	 * expression body is not a valid left-hand expression in
	 * assignment.
	 *
	 * @param {String} body
	 * @return {Function|undefined}
	 */

	function makeSetter (body) {
	  try {
	    return new Function('scope', 'value', body + '=value;')
	  } catch (e) {
	    process.env.NODE_ENV !== 'production' && _.warn(
	      'Invalid setter function body: ' + body
	    )
	  }
	}

	/**
	 * Check for setter existence on a cache hit.
	 *
	 * @param {Function} hit
	 */

	function checkSetter (hit) {
	  if (!hit.set) {
	    hit.set = makeSetter(hit.body)
	  }
	}

	/**
	 * Parse an expression into re-written getter/setters.
	 *
	 * @param {String} exp
	 * @param {Boolean} needSet
	 * @return {Function}
	 */

	exports.parse = function (exp, needSet) {
	  exp = exp.trim()
	  // try cache
	  var hit = expressionCache.get(exp)
	  if (hit) {
	    if (needSet) {
	      checkSetter(hit)
	    }
	    return hit
	  }
	  // we do a simple path check to optimize for them.
	  // the check fails valid paths with unusal whitespaces,
	  // but that's too rare and we don't care.
	  // also skip boolean literals and paths that start with
	  // global "Math"
	  var res = exports.isSimplePath(exp)
	    ? compilePathFns(exp)
	    : compileExpFns(exp, needSet)
	  expressionCache.put(exp, res)
	  return res
	}

	/**
	 * Check if an expression is a simple path.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */

	exports.isSimplePath = function (exp) {
	  return pathTestRE.test(exp) &&
	    // don't treat true/false as paths
	    !booleanLiteralRE.test(exp) &&
	    // Math constants e.g. Math.PI, Math.E etc.
	    exp.slice(0, 5) !== 'Math.'
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(9)
	var Cache = __webpack_require__(15)
	var pathCache = new Cache(1000)
	var identRE = exports.identRE = /^[$_a-zA-Z]+[\w$]*$/

	// actions
	var APPEND = 0
	var PUSH = 1

	// states
	var BEFORE_PATH = 0
	var IN_PATH = 1
	var BEFORE_IDENT = 2
	var IN_IDENT = 3
	var BEFORE_ELEMENT = 4
	var AFTER_ZERO = 5
	var IN_INDEX = 6
	var IN_SINGLE_QUOTE = 7
	var IN_DOUBLE_QUOTE = 8
	var IN_SUB_PATH = 9
	var AFTER_ELEMENT = 10
	var AFTER_PATH = 11
	var ERROR = 12

	var pathStateMachine = []

	pathStateMachine[BEFORE_PATH] = {
	  'ws': [BEFORE_PATH],
	  'ident': [IN_IDENT, APPEND],
	  '[': [BEFORE_ELEMENT],
	  'eof': [AFTER_PATH]
	}

	pathStateMachine[IN_PATH] = {
	  'ws': [IN_PATH],
	  '.': [BEFORE_IDENT],
	  '[': [BEFORE_ELEMENT],
	  'eof': [AFTER_PATH]
	}

	pathStateMachine[BEFORE_IDENT] = {
	  'ws': [BEFORE_IDENT],
	  'ident': [IN_IDENT, APPEND]
	}

	pathStateMachine[IN_IDENT] = {
	  'ident': [IN_IDENT, APPEND],
	  '0': [IN_IDENT, APPEND],
	  'number': [IN_IDENT, APPEND],
	  'ws': [IN_PATH, PUSH],
	  '.': [BEFORE_IDENT, PUSH],
	  '[': [BEFORE_ELEMENT, PUSH],
	  'eof': [AFTER_PATH, PUSH]
	}

	pathStateMachine[BEFORE_ELEMENT] = {
	  'ws': [BEFORE_ELEMENT],
	  '0': [AFTER_ZERO, APPEND],
	  'number': [IN_INDEX, APPEND],
	  "'": [IN_SINGLE_QUOTE, APPEND, ''],
	  '"': [IN_DOUBLE_QUOTE, APPEND, ''],
	  'ident': [IN_SUB_PATH, APPEND, '*']
	}

	pathStateMachine[AFTER_ZERO] = {
	  'ws': [AFTER_ELEMENT, PUSH],
	  ']': [IN_PATH, PUSH]
	}

	pathStateMachine[IN_INDEX] = {
	  '0': [IN_INDEX, APPEND],
	  'number': [IN_INDEX, APPEND],
	  'ws': [AFTER_ELEMENT],
	  ']': [IN_PATH, PUSH]
	}

	pathStateMachine[IN_SINGLE_QUOTE] = {
	  "'": [AFTER_ELEMENT],
	  'eof': ERROR,
	  'else': [IN_SINGLE_QUOTE, APPEND]
	}

	pathStateMachine[IN_DOUBLE_QUOTE] = {
	  '"': [AFTER_ELEMENT],
	  'eof': ERROR,
	  'else': [IN_DOUBLE_QUOTE, APPEND]
	}

	pathStateMachine[IN_SUB_PATH] = {
	  'ident': [IN_SUB_PATH, APPEND],
	  '0': [IN_SUB_PATH, APPEND],
	  'number': [IN_SUB_PATH, APPEND],
	  'ws': [AFTER_ELEMENT],
	  ']': [IN_PATH, PUSH]
	}

	pathStateMachine[AFTER_ELEMENT] = {
	  'ws': [AFTER_ELEMENT],
	  ']': [IN_PATH, PUSH]
	}

	/**
	 * Determine the type of a character in a keypath.
	 *
	 * @param {Char} ch
	 * @return {String} type
	 */

	function getPathCharType (ch) {
	  if (ch === undefined) {
	    return 'eof'
	  }

	  var code = ch.charCodeAt(0)

	  switch (code) {
	    case 0x5B: // [
	    case 0x5D: // ]
	    case 0x2E: // .
	    case 0x22: // "
	    case 0x27: // '
	    case 0x30: // 0
	      return ch

	    case 0x5F: // _
	    case 0x24: // $
	      return 'ident'

	    case 0x20: // Space
	    case 0x09: // Tab
	    case 0x0A: // Newline
	    case 0x0D: // Return
	    case 0xA0:  // No-break space
	    case 0xFEFF:  // Byte Order Mark
	    case 0x2028:  // Line Separator
	    case 0x2029:  // Paragraph Separator
	      return 'ws'
	  }

	  // a-z, A-Z
	  if (
	    (code >= 0x61 && code <= 0x7A) ||
	    (code >= 0x41 && code <= 0x5A)
	  ) {
	    return 'ident'
	  }

	  // 1-9
	  if (code >= 0x31 && code <= 0x39) {
	    return 'number'
	  }

	  return 'else'
	}

	/**
	 * Parse a string path into an array of segments
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */

	function parsePath (path) {
	  var keys = []
	  var index = -1
	  var mode = BEFORE_PATH
	  var c, newChar, key, type, transition, action, typeMap

	  var actions = []
	  actions[PUSH] = function () {
	    if (key === undefined) {
	      return
	    }
	    keys.push(key)
	    key = undefined
	  }
	  actions[APPEND] = function () {
	    if (key === undefined) {
	      key = newChar
	    } else {
	      key += newChar
	    }
	  }

	  function maybeUnescapeQuote () {
	    var nextChar = path[index + 1]
	    if ((mode === IN_SINGLE_QUOTE && nextChar === "'") ||
	        (mode === IN_DOUBLE_QUOTE && nextChar === '"')) {
	      index++
	      newChar = nextChar
	      actions[APPEND]()
	      return true
	    }
	  }

	  while (mode != null) {
	    index++
	    c = path[index]

	    if (c === '\\' && maybeUnescapeQuote()) {
	      continue
	    }

	    type = getPathCharType(c)
	    typeMap = pathStateMachine[mode]
	    transition = typeMap[type] || typeMap['else'] || ERROR

	    if (transition === ERROR) {
	      return // parse error
	    }

	    mode = transition[0]
	    action = actions[transition[1]]
	    if (action) {
	      newChar = transition[2]
	      newChar = newChar === undefined
	        ? c
	        : newChar === '*'
	          ? newChar + c
	          : newChar
	      action()
	    }

	    if (mode === AFTER_PATH) {
	      keys.raw = path
	      return keys
	    }
	  }
	}

	/**
	 * Format a accessor segment based on its type.
	 *
	 * @param {String} key
	 * @return {Boolean}
	 */

	function formatAccessor (key) {
	  if (identRE.test(key)) { // identifier
	    return '.' + key
	  } else if (+key === key >>> 0) { // bracket index
	    return '[' + key + ']'
	  } else if (key.charAt(0) === '*') {
	    return '[o' + formatAccessor(key.slice(1)) + ']'
	  } else { // bracket string
	    return '["' + key.replace(/"/g, '\\"') + '"]'
	  }
	}

	/**
	 * Compiles a getter function with a fixed path.
	 * The fixed path getter supresses errors.
	 *
	 * @param {Array} path
	 * @return {Function}
	 */

	exports.compileGetter = function (path) {
	  var body = 'return o' + path.map(formatAccessor).join('')
	  return new Function('o', body)
	}

	/**
	 * External parse that check for a cache hit first
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */

	exports.parse = function (path) {
	  var hit = pathCache.get(path)
	  if (!hit) {
	    hit = parsePath(path)
	    if (hit) {
	      hit.get = exports.compileGetter(hit)
	      pathCache.put(path, hit)
	    }
	  }
	  return hit
	}

	/**
	 * Get from an object from a path string
	 *
	 * @param {Object} obj
	 * @param {String} path
	 */

	exports.get = function (obj, path) {
	  path = exports.parse(path)
	  if (path) {
	    return path.get(obj)
	  }
	}

	/**
	 * Warn against setting non-existent root path on a vm.
	 */

	var warnNonExistent
	if (process.env.NODE_ENV !== 'production') {
	  warnNonExistent = function (path) {
	    _.warn(
	      'You are setting a non-existent path "' + path.raw + '" ' +
	      'on a vm instance. Consider pre-initializing the property ' +
	      'with the "data" option for more reliable reactivity ' +
	      'and better performance.'
	    )
	  }
	}

	/**
	 * Set on an object from a path
	 *
	 * @param {Object} obj
	 * @param {String | Array} path
	 * @param {*} val
	 */

	exports.set = function (obj, path, val) {
	  var original = obj
	  if (typeof path === 'string') {
	    path = exports.parse(path)
	  }
	  if (!path || !_.isObject(obj)) {
	    return false
	  }
	  var last, key
	  for (var i = 0, l = path.length; i < l; i++) {
	    last = obj
	    key = path[i]
	    if (key.charAt(0) === '*') {
	      key = original[key.slice(1)]
	    }
	    if (i < l - 1) {
	      obj = obj[key]
	      if (!_.isObject(obj)) {
	        obj = {}
	        if (process.env.NODE_ENV !== 'production' && last._isVue) {
	          warnNonExistent(path)
	        }
	        _.set(last, key, obj)
	      }
	    } else {
	      if (_.isArray(obj)) {
	        obj.$set(key, val)
	      } else if (key in obj) {
	        obj[key] = val
	      } else {
	        if (process.env.NODE_ENV !== 'production' && obj._isVue) {
	          warnNonExistent(path)
	        }
	        _.set(obj, key, val)
	      }
	    }
	  }
	  return true
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(9)
	var config = __webpack_require__(13)

	// we have two separate queues: one for directive updates
	// and one for user watcher registered via $watch().
	// we want to guarantee directive updates to be called
	// before user watchers so that when user watchers are
	// triggered, the DOM would have already been in updated
	// state.
	var queue = []
	var userQueue = []
	var has = {}
	var circular = {}
	var waiting = false
	var internalQueueDepleted = false

	/**
	 * Reset the batcher's state.
	 */

	function resetBatcherState () {
	  queue = []
	  userQueue = []
	  has = {}
	  circular = {}
	  waiting = internalQueueDepleted = false
	}

	/**
	 * Flush both queues and run the watchers.
	 */

	function flushBatcherQueue () {
	  runBatcherQueue(queue)
	  internalQueueDepleted = true
	  runBatcherQueue(userQueue)
	  // dev tool hook
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV !== 'production') {
	    if (_.inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
	      window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit('flush')
	    }
	  }
	  resetBatcherState()
	}

	/**
	 * Run the watchers in a single queue.
	 *
	 * @param {Array} queue
	 */

	function runBatcherQueue (queue) {
	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (var i = 0; i < queue.length; i++) {
	    var watcher = queue[i]
	    var id = watcher.id
	    has[id] = null
	    watcher.run()
	    // in dev build, check and stop circular updates.
	    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
	      circular[id] = (circular[id] || 0) + 1
	      if (circular[id] > config._maxUpdateCount) {
	        queue.splice(has[id], 1)
	        _.warn(
	          'You may have an infinite update loop for watcher ' +
	          'with expression: ' + watcher.expression
	        )
	      }
	    }
	  }
	}

	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 *
	 * @param {Watcher} watcher
	 *   properties:
	 *   - {Number} id
	 *   - {Function} run
	 */

	exports.push = function (watcher) {
	  var id = watcher.id
	  if (has[id] == null) {
	    // if an internal watcher is pushed, but the internal
	    // queue is already depleted, we run it immediately.
	    if (internalQueueDepleted && !watcher.user) {
	      watcher.run()
	      return
	    }
	    // push watcher into appropriate queue
	    var q = watcher.user ? userQueue : queue
	    has[id] = q.length
	    q.push(watcher)
	    // queue the flush
	    if (!waiting) {
	      waiting = true
	      _.nextTick(flushBatcherQueue)
	    }
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(9)
	var Transition = __webpack_require__(54)

	module.exports = {

	  priority: 1100,

	  update: function (id, oldId) {
	    var el = this.el
	    // resolve on owner vm
	    var hooks = _.resolveAsset(this.vm.$options, 'transitions', id)
	    id = id || 'v'
	    // apply on closest vm
	    el.__v_trans = new Transition(el, id, hooks, this.el.__vue__ || this.vm)
	    if (oldId) {
	      _.removeClass(el, oldId + '-transition')
	    }
	    _.addClass(el, id + '-transition')
	  }
	}


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(9)
	var queue = __webpack_require__(55)
	var addClass = _.addClass
	var removeClass = _.removeClass
	var transitionEndEvent = _.transitionEndEvent
	var animationEndEvent = _.animationEndEvent
	var transDurationProp = _.transitionProp + 'Duration'
	var animDurationProp = _.animationProp + 'Duration'

	var TYPE_TRANSITION = 1
	var TYPE_ANIMATION = 2

	/**
	 * A Transition object that encapsulates the state and logic
	 * of the transition.
	 *
	 * @param {Element} el
	 * @param {String} id
	 * @param {Object} hooks
	 * @param {Vue} vm
	 */

	function Transition (el, id, hooks, vm) {
	  this.id = id
	  this.el = el
	  this.enterClass = id + '-enter'
	  this.leaveClass = id + '-leave'
	  this.hooks = hooks
	  this.vm = vm
	  // async state
	  this.pendingCssEvent =
	  this.pendingCssCb =
	  this.cancel =
	  this.pendingJsCb =
	  this.op =
	  this.cb = null
	  this.justEntered = false
	  this.entered = this.left = false
	  this.typeCache = {}
	  // bind
	  var self = this
	  ;['enterNextTick', 'enterDone', 'leaveNextTick', 'leaveDone']
	    .forEach(function (m) {
	      self[m] = _.bind(self[m], self)
	    })
	}

	var p = Transition.prototype

	/**
	 * Start an entering transition.
	 *
	 * 1. enter transition triggered
	 * 2. call beforeEnter hook
	 * 3. add enter class
	 * 4. insert/show element
	 * 5. call enter hook (with possible explicit js callback)
	 * 6. reflow
	 * 7. based on transition type:
	 *    - transition:
	 *        remove class now, wait for transitionend,
	 *        then done if there's no explicit js callback.
	 *    - animation:
	 *        wait for animationend, remove class,
	 *        then done if there's no explicit js callback.
	 *    - no css transition:
	 *        done now if there's no explicit js callback.
	 * 8. wait for either done or js callback, then call
	 *    afterEnter hook.
	 *
	 * @param {Function} op - insert/show the element
	 * @param {Function} [cb]
	 */

	p.enter = function (op, cb) {
	  this.cancelPending()
	  this.callHook('beforeEnter')
	  this.cb = cb
	  addClass(this.el, this.enterClass)
	  op()
	  this.entered = false
	  this.callHookWithCb('enter')
	  if (this.entered) {
	    return // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.enterCancelled
	  queue.push(this.enterNextTick)
	}

	/**
	 * The "nextTick" phase of an entering transition, which is
	 * to be pushed into a queue and executed after a reflow so
	 * that removing the class can trigger a CSS transition.
	 */

	p.enterNextTick = function () {

	  // Important hack:
	  // in Chrome, if a just-entered element is applied the
	  // leave class while its interpolated property still has
	  // a very small value (within one frame), Chrome will
	  // skip the leave transition entirely and not firing the
	  // transtionend event. Therefore we need to protected
	  // against such cases using a one-frame timeout.
	  this.justEntered = true
	  var self = this
	  setTimeout(function () {
	    self.justEntered = false
	  }, 17)

	  var enterDone = this.enterDone
	  var type = this.getCssTransitionType(this.enterClass)
	  if (!this.pendingJsCb) {
	    if (type === TYPE_TRANSITION) {
	      // trigger transition by removing enter class now
	      removeClass(this.el, this.enterClass)
	      this.setupCssCb(transitionEndEvent, enterDone)
	    } else if (type === TYPE_ANIMATION) {
	      this.setupCssCb(animationEndEvent, enterDone)
	    } else {
	      enterDone()
	    }
	  } else if (type === TYPE_TRANSITION) {
	    removeClass(this.el, this.enterClass)
	  }
	}

	/**
	 * The "cleanup" phase of an entering transition.
	 */

	p.enterDone = function () {
	  this.entered = true
	  this.cancel = this.pendingJsCb = null
	  removeClass(this.el, this.enterClass)
	  this.callHook('afterEnter')
	  if (this.cb) this.cb()
	}

	/**
	 * Start a leaving transition.
	 *
	 * 1. leave transition triggered.
	 * 2. call beforeLeave hook
	 * 3. add leave class (trigger css transition)
	 * 4. call leave hook (with possible explicit js callback)
	 * 5. reflow if no explicit js callback is provided
	 * 6. based on transition type:
	 *    - transition or animation:
	 *        wait for end event, remove class, then done if
	 *        there's no explicit js callback.
	 *    - no css transition:
	 *        done if there's no explicit js callback.
	 * 7. wait for either done or js callback, then call
	 *    afterLeave hook.
	 *
	 * @param {Function} op - remove/hide the element
	 * @param {Function} [cb]
	 */

	p.leave = function (op, cb) {
	  this.cancelPending()
	  this.callHook('beforeLeave')
	  this.op = op
	  this.cb = cb
	  addClass(this.el, this.leaveClass)
	  this.left = false
	  this.callHookWithCb('leave')
	  if (this.left) {
	    return // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.leaveCancelled
	  // only need to handle leaveDone if
	  // 1. the transition is already done (synchronously called
	  //    by the user, which causes this.op set to null)
	  // 2. there's no explicit js callback
	  if (this.op && !this.pendingJsCb) {
	    // if a CSS transition leaves immediately after enter,
	    // the transitionend event never fires. therefore we
	    // detect such cases and end the leave immediately.
	    if (this.justEntered) {
	      this.leaveDone()
	    } else {
	      queue.push(this.leaveNextTick)
	    }
	  }
	}

	/**
	 * The "nextTick" phase of a leaving transition.
	 */

	p.leaveNextTick = function () {
	  var type = this.getCssTransitionType(this.leaveClass)
	  if (type) {
	    var event = type === TYPE_TRANSITION
	      ? transitionEndEvent
	      : animationEndEvent
	    this.setupCssCb(event, this.leaveDone)
	  } else {
	    this.leaveDone()
	  }
	}

	/**
	 * The "cleanup" phase of a leaving transition.
	 */

	p.leaveDone = function () {
	  this.left = true
	  this.cancel = this.pendingJsCb = null
	  this.op()
	  removeClass(this.el, this.leaveClass)
	  this.callHook('afterLeave')
	  if (this.cb) this.cb()
	  this.op = null
	}

	/**
	 * Cancel any pending callbacks from a previously running
	 * but not finished transition.
	 */

	p.cancelPending = function () {
	  this.op = this.cb = null
	  var hasPending = false
	  if (this.pendingCssCb) {
	    hasPending = true
	    _.off(this.el, this.pendingCssEvent, this.pendingCssCb)
	    this.pendingCssEvent = this.pendingCssCb = null
	  }
	  if (this.pendingJsCb) {
	    hasPending = true
	    this.pendingJsCb.cancel()
	    this.pendingJsCb = null
	  }
	  if (hasPending) {
	    removeClass(this.el, this.enterClass)
	    removeClass(this.el, this.leaveClass)
	  }
	  if (this.cancel) {
	    this.cancel.call(this.vm, this.el)
	    this.cancel = null
	  }
	}

	/**
	 * Call a user-provided synchronous hook function.
	 *
	 * @param {String} type
	 */

	p.callHook = function (type) {
	  if (this.hooks && this.hooks[type]) {
	    this.hooks[type].call(this.vm, this.el)
	  }
	}

	/**
	 * Call a user-provided, potentially-async hook function.
	 * We check for the length of arguments to see if the hook
	 * expects a `done` callback. If true, the transition's end
	 * will be determined by when the user calls that callback;
	 * otherwise, the end is determined by the CSS transition or
	 * animation.
	 *
	 * @param {String} type
	 */

	p.callHookWithCb = function (type) {
	  var hook = this.hooks && this.hooks[type]
	  if (hook) {
	    if (hook.length > 1) {
	      this.pendingJsCb = _.cancellable(this[type + 'Done'])
	    }
	    hook.call(this.vm, this.el, this.pendingJsCb)
	  }
	}

	/**
	 * Get an element's transition type based on the
	 * calculated styles.
	 *
	 * @param {String} className
	 * @return {Number}
	 */

	p.getCssTransitionType = function (className) {
	  /* istanbul ignore if */
	  if (
	    !transitionEndEvent ||
	    // skip CSS transitions if page is not visible -
	    // this solves the issue of transitionend events not
	    // firing until the page is visible again.
	    // pageVisibility API is supported in IE10+, same as
	    // CSS transitions.
	    document.hidden ||
	    // explicit js-only transition
	    (this.hooks && this.hooks.css === false) ||
	    // element is hidden
	    isHidden(this.el)
	  ) {
	    return
	  }
	  var type = this.typeCache[className]
	  if (type) return type
	  var inlineStyles = this.el.style
	  var computedStyles = window.getComputedStyle(this.el)
	  var transDuration =
	    inlineStyles[transDurationProp] ||
	    computedStyles[transDurationProp]
	  if (transDuration && transDuration !== '0s') {
	    type = TYPE_TRANSITION
	  } else {
	    var animDuration =
	      inlineStyles[animDurationProp] ||
	      computedStyles[animDurationProp]
	    if (animDuration && animDuration !== '0s') {
	      type = TYPE_ANIMATION
	    }
	  }
	  if (type) {
	    this.typeCache[className] = type
	  }
	  return type
	}

	/**
	 * Setup a CSS transitionend/animationend callback.
	 *
	 * @param {String} event
	 * @param {Function} cb
	 */

	p.setupCssCb = function (event, cb) {
	  this.pendingCssEvent = event
	  var self = this
	  var el = this.el
	  var onEnd = this.pendingCssCb = function (e) {
	    if (e.target === el) {
	      _.off(el, event, onEnd)
	      self.pendingCssEvent = self.pendingCssCb = null
	      if (!self.pendingJsCb && cb) {
	        cb()
	      }
	    }
	  }
	  _.on(el, event, onEnd)
	}

	/**
	 * Check if an element is hidden - in that case we can just
	 * skip the transition alltogether.
	 *
	 * @param {Element} el
	 * @return {Boolean}
	 */

	function isHidden (el) {
	  return !(
	    el.offsetWidth ||
	    el.offsetHeight ||
	    el.getClientRects().length
	  )
	}

	module.exports = Transition


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(9)
	var queue = []
	var queued = false

	/**
	 * Push a job into the queue.
	 *
	 * @param {Function} job
	 */

	exports.push = function (job) {
	  queue.push(job)
	  if (!queued) {
	    queued = true
	    _.nextTick(flush)
	  }
	}

	/**
	 * Flush the queue, and do one forced reflow before
	 * triggering transitions.
	 */

	function flush () {
	  // Force layout
	  var f = document.documentElement.offsetHeight
	  for (var i = 0; i < queue.length; i++) {
	    queue[i]()
	  }
	  queue = []
	  queued = false
	  // dummy return, so js linters don't complain about
	  // unused variable f
	  return f
	}


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(9)
	var dirParser = __webpack_require__(16)
	var propDef = __webpack_require__(47)
	var propBindingModes = __webpack_require__(13)._propBindingModes
	var empty = {}

	// regexes
	var identRE = __webpack_require__(51).identRE
	var settablePathRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\[\]]+\])*$/

	/**
	 * Compile props on a root element and return
	 * a props link function.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Array} propOptions
	 * @return {Function} propsLinkFn
	 */

	module.exports = function compileProps (el, propOptions) {
	  var props = []
	  var names = Object.keys(propOptions)
	  var i = names.length
	  var options, name, attr, value, path, parsed, prop
	  while (i--) {
	    name = names[i]
	    options = propOptions[name] || empty

	    if (process.env.NODE_ENV !== 'production' && name === '$data') {
	      _.warn('Do not use $data as prop.')
	      continue
	    }

	    // props could contain dashes, which will be
	    // interpreted as minus calculations by the parser
	    // so we need to camelize the path here
	    path = _.camelize(name)
	    if (!identRE.test(path)) {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'Invalid prop key: "' + name + '". Prop keys ' +
	        'must be valid identifiers.'
	      )
	      continue
	    }

	    prop = {
	      name: name,
	      path: path,
	      options: options,
	      mode: propBindingModes.ONE_WAY,
	      raw: null
	    }

	    attr = _.hyphenate(name)
	    // first check dynamic version
	    if ((value = _.getBindAttr(el, attr)) === null) {
	      if ((value = _.getBindAttr(el, attr + '.sync')) !== null) {
	        prop.mode = propBindingModes.TWO_WAY
	      } else if ((value = _.getBindAttr(el, attr + '.once')) !== null) {
	        prop.mode = propBindingModes.ONE_TIME
	      }
	    }
	    if (value !== null) {
	      // has dynamic binding!
	      prop.raw = value
	      parsed = dirParser.parse(value)
	      value = parsed.expression
	      prop.filters = parsed.filters
	      // check binding type
	      if (_.isLiteral(value)) {
	        // for expressions containing literal numbers and
	        // booleans, there's no need to setup a prop binding,
	        // so we can optimize them as a one-time set.
	        prop.optimizedLiteral = true
	      } else {
	        prop.dynamic = true
	        // check non-settable path for two-way bindings
	        if (process.env.NODE_ENV !== 'production' &&
	            prop.mode === propBindingModes.TWO_WAY &&
	            !settablePathRE.test(value)) {
	          prop.mode = propBindingModes.ONE_WAY
	          _.warn(
	            'Cannot bind two-way prop with non-settable ' +
	            'parent path: ' + value
	          )
	        }
	      }
	      prop.parentPath = value

	      // warn required two-way
	      if (
	        process.env.NODE_ENV !== 'production' &&
	        options.twoWay &&
	        prop.mode !== propBindingModes.TWO_WAY
	      ) {
	        _.warn(
	          'Prop "' + name + '" expects a two-way binding type.'
	        )
	      }
	    } else if ((value = _.attr(el, attr)) !== null) {
	      // has literal binding!
	      prop.raw = value
	    } else if (options.required) {
	      // warn missing required
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'Missing required prop: ' + name
	      )
	    }
	    // push prop
	    props.push(prop)
	  }
	  return makePropsLinkFn(props)
	}

	/**
	 * Build a function that applies props to a vm.
	 *
	 * @param {Array} props
	 * @return {Function} propsLinkFn
	 */

	function makePropsLinkFn (props) {
	  return function propsLinkFn (vm, scope) {
	    // store resolved props info
	    vm._props = {}
	    var i = props.length
	    var prop, path, options, value, raw
	    while (i--) {
	      prop = props[i]
	      raw = prop.raw
	      path = prop.path
	      options = prop.options
	      vm._props[path] = prop
	      if (raw === null) {
	        // initialize absent prop
	        _.initProp(vm, prop, getDefault(vm, options))
	      } else if (prop.dynamic) {
	        // dynamic prop
	        if (vm._context) {
	          if (prop.mode === propBindingModes.ONE_TIME) {
	            // one time binding
	            value = (scope || vm._context).$get(prop.parentPath)
	            _.initProp(vm, prop, value)
	          } else {
	            // dynamic binding
	            vm._bindDir({
	              name: 'prop',
	              def: propDef,
	              prop: prop
	            }, null, null, scope) // el, host, scope
	          }
	        } else {
	          process.env.NODE_ENV !== 'production' && _.warn(
	            'Cannot bind dynamic prop on a root instance' +
	            ' with no parent: ' + prop.name + '="' +
	            raw + '"'
	          )
	        }
	      } else if (prop.optimizedLiteral) {
	        // optimized literal, cast it and just set once
	        var stripped = _.stripQuotes(raw)
	        value = stripped === raw
	          ? _.toBoolean(_.toNumber(raw))
	          : stripped
	        _.initProp(vm, prop, value)
	      } else {
	        // string literal, but we need to cater for
	        // Boolean props with no value
	        value = options.type === Boolean && raw === ''
	          ? true
	          : raw
	        _.initProp(vm, prop, value)
	      }
	    }
	  }
	}

	/**
	 * Get the default value of a prop.
	 *
	 * @param {Vue} vm
	 * @param {Object} options
	 * @return {*}
	 */

	function getDefault (vm, options) {
	  // no default, return undefined
	  if (!options.hasOwnProperty('default')) {
	    // absent boolean value defaults to false
	    return options.type === Boolean
	      ? false
	      : undefined
	  }
	  var def = options.default
	  // warn against non-factory defaults for Object & Array
	  if (_.isObject(def)) {
	    process.env.NODE_ENV !== 'production' && _.warn(
	      'Object/Array as default prop values will be shared ' +
	      'across multiple instances. Use a factory function ' +
	      'to return the default value instead.'
	    )
	  }
	  // call factory function for non-Function types
	  return typeof def === 'function' && options.type !== Function
	    ? def.call(vm)
	    : def
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(9)
	var templateParser = __webpack_require__(27)
	var specialCharRE = /[^\w\-:\.]/

	/**
	 * Process an element or a DocumentFragment based on a
	 * instance option object. This allows us to transclude
	 * a template node/fragment before the instance is created,
	 * so the processed fragment can then be cloned and reused
	 * in v-for.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */

	exports.transclude = function (el, options) {
	  // extract container attributes to pass them down
	  // to compiler, because they need to be compiled in
	  // parent scope. we are mutating the options object here
	  // assuming the same object will be used for compile
	  // right after this.
	  if (options) {
	    options._containerAttrs = extractAttrs(el)
	  }
	  // for template tags, what we want is its content as
	  // a documentFragment (for fragment instances)
	  if (_.isTemplate(el)) {
	    el = templateParser.parse(el)
	  }
	  if (options) {
	    if (options._asComponent && !options.template) {
	      options.template = '<slot></slot>'
	    }
	    if (options.template) {
	      options._content = _.extractContent(el)
	      el = transcludeTemplate(el, options)
	    }
	  }
	  if (el instanceof DocumentFragment) {
	    // anchors for fragment instance
	    // passing in `persist: true` to avoid them being
	    // discarded by IE during template cloning
	    _.prepend(_.createAnchor('v-start', true), el)
	    el.appendChild(_.createAnchor('v-end', true))
	  }
	  return el
	}

	/**
	 * Process the template option.
	 * If the replace option is true this will swap the $el.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */

	function transcludeTemplate (el, options) {
	  var template = options.template
	  var frag = templateParser.parse(template, true)
	  if (frag) {
	    var replacer = frag.firstChild
	    var tag = replacer.tagName && replacer.tagName.toLowerCase()
	    if (options.replace) {
	      /* istanbul ignore if */
	      if (el === document.body) {
	        process.env.NODE_ENV !== 'production' && _.warn(
	          'You are mounting an instance with a template to ' +
	          '<body>. This will replace <body> entirely. You ' +
	          'should probably use `replace: false` here.'
	        )
	      }
	      // there are many cases where the instance must
	      // become a fragment instance: basically anything that
	      // can create more than 1 root nodes.
	      if (
	        // multi-children template
	        frag.childNodes.length > 1 ||
	        // non-element template
	        replacer.nodeType !== 1 ||
	        // single nested component
	        tag === 'component' ||
	        _.resolveAsset(options, 'components', tag) ||
	        replacer.hasAttribute('is') ||
	        replacer.hasAttribute(':is') ||
	        replacer.hasAttribute('v-bind:is') ||
	        // element directive
	        _.resolveAsset(options, 'elementDirectives', tag) ||
	        // for block
	        replacer.hasAttribute('v-for') ||
	        // if block
	        replacer.hasAttribute('v-if')
	      ) {
	        return frag
	      } else {
	        options._replacerAttrs = extractAttrs(replacer)
	        mergeAttrs(el, replacer)
	        return replacer
	      }
	    } else {
	      el.appendChild(frag)
	      return el
	    }
	  } else {
	    process.env.NODE_ENV !== 'production' && _.warn(
	      'Invalid template option: ' + template
	    )
	  }
	}

	/**
	 * Helper to extract a component container's attributes
	 * into a plain object array.
	 *
	 * @param {Element} el
	 * @return {Array}
	 */

	function extractAttrs (el) {
	  if (el.nodeType === 1 && el.hasAttributes()) {
	    return _.toArray(el.attributes)
	  }
	}

	/**
	 * Merge the attributes of two elements, and make sure
	 * the class names are merged properly.
	 *
	 * @param {Element} from
	 * @param {Element} to
	 */

	function mergeAttrs (from, to) {
	  var attrs = from.attributes
	  var i = attrs.length
	  var name, value
	  while (i--) {
	    name = attrs[i].name
	    value = attrs[i].value
	    if (!to.hasAttribute(name) && !specialCharRE.test(name)) {
	      to.setAttribute(name, value)
	    } else if (name === 'class') {
	      value = to.getAttribute(name) + ' ' + value
	      to.setAttribute(name, value)
	    }
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	exports.slot = __webpack_require__(59)
	exports.partial = __webpack_require__(60)


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(9)
	var templateParser = __webpack_require__(27)

	// This is the elementDirective that handles <content>
	// transclusions. It relies on the raw content of an
	// instance being stored as `$options._content` during
	// the transclude phase.

	module.exports = {

	  priority: 1750,

	  params: ['name'],

	  bind: function () {
	    var host = this.vm
	    var raw = host.$options._content
	    var content
	    if (!raw) {
	      this.fallback()
	      return
	    }
	    var context = host._context
	    var slotName = this.params.name
	    if (!slotName) {
	      // Default content
	      var self = this
	      var compileDefaultContent = function () {
	        self.compile(
	          extractFragment(raw.childNodes, raw, true),
	          context,
	          host
	        )
	      }
	      if (!host._isCompiled) {
	        // defer until the end of instance compilation,
	        // because the default outlet must wait until all
	        // other possible outlets with selectors have picked
	        // out their contents.
	        host.$once('hook:compiled', compileDefaultContent)
	      } else {
	        compileDefaultContent()
	      }
	    } else {
	      var selector = '[slot="' + slotName + '"]'
	      var nodes = raw.querySelectorAll(selector)
	      if (nodes.length) {
	        content = extractFragment(nodes, raw)
	        if (content.hasChildNodes()) {
	          this.compile(content, context, host)
	        } else {
	          this.fallback()
	        }
	      } else {
	        this.fallback()
	      }
	    }
	  },

	  fallback: function () {
	    this.compile(_.extractContent(this.el, true), this.vm)
	  },

	  compile: function (content, context, host) {
	    if (content && context) {
	      var scope = host
	        ? host._scope
	        : this._scope
	      this.unlink = context.$compile(
	        content, host, scope, this._frag
	      )
	    }
	    if (content) {
	      _.replace(this.el, content)
	    } else {
	      _.remove(this.el)
	    }
	  },

	  unbind: function () {
	    if (this.unlink) {
	      this.unlink()
	    }
	  }
	}

	/**
	 * Extract qualified content nodes from a node list.
	 *
	 * @param {NodeList} nodes
	 * @param {Element} parent
	 * @param {Boolean} main
	 * @return {DocumentFragment}
	 */

	function extractFragment (nodes, parent, main) {
	  var frag = document.createDocumentFragment()
	  for (var i = 0, l = nodes.length; i < l; i++) {
	    var node = nodes[i]
	    // if this is the main outlet, we want to skip all
	    // previously selected nodes;
	    // otherwise, we want to mark the node as selected.
	    // clone the node so the original raw content remains
	    // intact. this ensures proper re-compilation in cases
	    // where the outlet is inside a conditional block
	    if (main && !node.__v_selected) {
	      append(node)
	    } else if (!main && node.parentNode === parent) {
	      node.__v_selected = true
	      append(node)
	    }
	  }
	  return frag

	  function append (node) {
	    if (_.isTemplate(node) &&
	        !node.hasAttribute('v-if') &&
	        !node.hasAttribute('v-for')) {
	      node = templateParser.parse(node)
	    }
	    node = templateParser.clone(node)
	    frag.appendChild(node)
	  }
	}


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(9)
	var vIf = __webpack_require__(31)
	var FragmentFactory = __webpack_require__(29)

	module.exports = {

	  priority: 1750,

	  params: ['name'],

	  // watch changes to name for dynamic partials
	  paramWatchers: {
	    name: function (value) {
	      vIf.remove.call(this)
	      if (value) {
	        this.insert(value)
	      }
	    }
	  },

	  bind: function () {
	    this.anchor = _.createAnchor('v-partial')
	    _.replace(this.el, this.anchor)
	    this.insert(this.params.name)
	  },

	  insert: function (id) {
	    var partial = _.resolveAsset(this.vm.$options, 'partials', id)
	    if (process.env.NODE_ENV !== 'production') {
	      _.assertAsset(partial, 'partial', id)
	    }
	    if (partial) {
	      this.factory = new FragmentFactory(this.vm, partial)
	      vIf.insert.call(this)
	    }
	  },

	  unbind: function () {
	    if (this.frag) {
	      this.frag.destroy()
	    }
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(9)

	/**
	 * Stringify value.
	 *
	 * @param {Number} indent
	 */

	exports.json = {
	  read: function (value, indent) {
	    return typeof value === 'string'
	      ? value
	      : JSON.stringify(value, null, Number(indent) || 2)
	  },
	  write: function (value) {
	    try {
	      return JSON.parse(value)
	    } catch (e) {
	      return value
	    }
	  }
	}

	/**
	 * 'abc' => 'Abc'
	 */

	exports.capitalize = function (value) {
	  if (!value && value !== 0) return ''
	  value = value.toString()
	  return value.charAt(0).toUpperCase() + value.slice(1)
	}

	/**
	 * 'abc' => 'ABC'
	 */

	exports.uppercase = function (value) {
	  return (value || value === 0)
	    ? value.toString().toUpperCase()
	    : ''
	}

	/**
	 * 'AbC' => 'abc'
	 */

	exports.lowercase = function (value) {
	  return (value || value === 0)
	    ? value.toString().toLowerCase()
	    : ''
	}

	/**
	 * 12345 => $12,345.00
	 *
	 * @param {String} sign
	 */

	var digitsRE = /(\d{3})(?=\d)/g
	exports.currency = function (value, currency) {
	  value = parseFloat(value)
	  if (!isFinite(value) || (!value && value !== 0)) return ''
	  currency = currency != null ? currency : '$'
	  var stringified = Math.abs(value).toFixed(2)
	  var _int = stringified.slice(0, -3)
	  var i = _int.length % 3
	  var head = i > 0
	    ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
	    : ''
	  var _float = stringified.slice(-3)
	  var sign = value < 0 ? '-' : ''
	  return currency + sign + head +
	    _int.slice(i).replace(digitsRE, '$1,') +
	    _float
	}

	/**
	 * 'item' => 'items'
	 *
	 * @params
	 *  an array of strings corresponding to
	 *  the single, double, triple ... forms of the word to
	 *  be pluralized. When the number to be pluralized
	 *  exceeds the length of the args, it will use the last
	 *  entry in the array.
	 *
	 *  e.g. ['single', 'double', 'triple', 'multiple']
	 */

	exports.pluralize = function (value) {
	  var args = _.toArray(arguments, 1)
	  return args.length > 1
	    ? (args[value % 10 - 1] || args[args.length - 1])
	    : (args[0] + (value === 1 ? '' : 's'))
	}

	/**
	 * Debounce a handler function.
	 *
	 * @param {Function} handler
	 * @param {Number} delay = 300
	 * @return {Function}
	 */

	exports.debounce = function (handler, delay) {
	  if (!handler) return
	  if (!delay) {
	    delay = 300
	  }
	  return _.debounce(handler, delay)
	}

	/**
	 * Install special array filters
	 */

	_.extend(exports, __webpack_require__(62))


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(9)
	var Path = __webpack_require__(51)
	var toArray = __webpack_require__(28)._postProcess

	/**
	 * Limit filter for arrays
	 *
	 * @param {Number} n
	 * @param {Number} offset (Decimal expected)
	 */

	exports.limitBy = function (arr, n, offset) {
	  offset = offset ? parseInt(offset, 10) : 0
	  return typeof n === 'number'
	    ? arr.slice(offset, offset + n)
	    : arr
	}

	/**
	 * Filter filter for arrays
	 *
	 * @param {String} search
	 * @param {String} [delimiter]
	 * @param {String} ...dataKeys
	 */

	exports.filterBy = function (arr, search, delimiter) {
	  arr = toArray(arr)
	  if (search == null) {
	    return arr
	  }
	  if (typeof search === 'function') {
	    return arr.filter(search)
	  }
	  // cast to lowercase string
	  search = ('' + search).toLowerCase()
	  // allow optional `in` delimiter
	  // because why not
	  var n = delimiter === 'in' ? 3 : 2
	  // extract and flatten keys
	  var keys = _.toArray(arguments, n).reduce(function (prev, cur) {
	    return prev.concat(cur)
	  }, [])
	  var res = []
	  var item, key, val, j
	  for (var i = 0, l = arr.length; i < l; i++) {
	    item = arr[i]
	    val = (item && item.$value) || item
	    j = keys.length
	    if (j) {
	      while (j--) {
	        key = keys[j]
	        if ((key === '$key' && contains(item.$key, search)) ||
	            contains(Path.get(val, key), search)) {
	          res.push(item)
	          break
	        }
	      }
	    } else if (contains(item, search)) {
	      res.push(item)
	    }
	  }
	  return res
	}

	/**
	 * Filter filter for arrays
	 *
	 * @param {String} sortKey
	 * @param {String} reverse
	 */

	exports.orderBy = function (arr, sortKey, reverse) {
	  arr = toArray(arr)
	  if (!sortKey) {
	    return arr
	  }
	  var order = (reverse && reverse < 0) ? -1 : 1
	  // sort on a copy to avoid mutating original array
	  return arr.slice().sort(function (a, b) {
	    if (sortKey !== '$key') {
	      if (_.isObject(a) && '$value' in a) a = a.$value
	      if (_.isObject(b) && '$value' in b) b = b.$value
	    }
	    a = _.isObject(a) ? Path.get(a, sortKey) : a
	    b = _.isObject(b) ? Path.get(b, sortKey) : b
	    return a === b ? 0 : a > b ? order : -order
	  })
	}

	/**
	 * String contain helper
	 *
	 * @param {*} val
	 * @param {String} search
	 */

	function contains (val, search) {
	  var i
	  if (_.isPlainObject(val)) {
	    var keys = Object.keys(val)
	    i = keys.length
	    while (i--) {
	      if (contains(val[keys[i]], search)) {
	        return true
	      }
	    }
	  } else if (_.isArray(val)) {
	    i = val.length
	    while (i--) {
	      if (contains(val[i], search)) {
	        return true
	      }
	    }
	  } else if (val != null) {
	    return val.toString().toLowerCase().indexOf(search) > -1
	  }
	}


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var mergeOptions = __webpack_require__(9).mergeOptions
	var uid = 0

	/**
	 * The main init sequence. This is called for every
	 * instance, including ones that are created from extended
	 * constructors.
	 *
	 * @param {Object} options - this options object should be
	 *                           the result of merging class
	 *                           options and the options passed
	 *                           in to the constructor.
	 */

	exports._init = function (options) {

	  options = options || {}

	  this.$el = null
	  this.$parent = options.parent
	  this.$root = this.$parent
	    ? this.$parent.$root
	    : this
	  this.$children = []
	  this.$refs = {}       // child vm references
	  this.$els = {}        // element references
	  this._watchers = []   // all watchers as an array
	  this._directives = [] // all directives

	  // a uid
	  this._uid = uid++

	  // a flag to avoid this being observed
	  this._isVue = true

	  // events bookkeeping
	  this._events = {}            // registered callbacks
	  this._eventsCount = {}       // for $broadcast optimization
	  this._shouldPropagate = false // for event propagation

	  // fragment instance properties
	  this._isFragment = false
	  this._fragment =         // @type {DocumentFragment}
	  this._fragmentStart =    // @type {Text|Comment}
	  this._fragmentEnd = null // @type {Text|Comment}

	  // lifecycle state
	  this._isCompiled =
	  this._isDestroyed =
	  this._isReady =
	  this._isAttached =
	  this._isBeingDestroyed = false
	  this._unlinkFn = null

	  // context:
	  // if this is a transcluded component, context
	  // will be the common parent vm of this instance
	  // and its host.
	  this._context = options._context || this.$parent

	  // scope:
	  // if this is inside an inline v-for, the scope
	  // will be the intermediate scope created for this
	  // repeat fragment. this is used for linking props
	  // and container directives.
	  this._scope = options._scope

	  // fragment:
	  // if this instance is compiled inside a Fragment, it
	  // needs to reigster itself as a child of that fragment
	  // for attach/detach to work properly.
	  this._frag = options._frag
	  if (this._frag) {
	    this._frag.children.push(this)
	  }

	  // push self into parent / transclusion host
	  if (this.$parent) {
	    this.$parent.$children.push(this)
	  }

	  // merge options.
	  options = this.$options = mergeOptions(
	    this.constructor.options,
	    options,
	    this
	  )

	  // set ref
	  this._updateRef()

	  // initialize data as empty object.
	  // it will be filled up in _initScope().
	  this._data = {}

	  // call init hook
	  this._callHook('init')

	  // initialize data observation and scope inheritance.
	  this._initState()

	  // setup event system and option events.
	  this._initEvents()

	  // call created hook
	  this._callHook('created')

	  // if `el` option is passed, start compilation.
	  if (options.el) {
	    this.$mount(options.el)
	  }
	}


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(9)
	var inDoc = _.inDoc
	var eventRE = /^v-on:|^@/

	/**
	 * Setup the instance's option events & watchers.
	 * If the value is a string, we pull it from the
	 * instance's methods by name.
	 */

	exports._initEvents = function () {
	  var options = this.$options
	  if (options._asComponent) {
	    registerComponentEvents(this, options.el)
	  }
	  registerCallbacks(this, '$on', options.events)
	  registerCallbacks(this, '$watch', options.watch)
	}

	/**
	 * Register v-on events on a child component
	 *
	 * @param {Vue} vm
	 * @param {Element} el
	 */

	function registerComponentEvents (vm, el) {
	  var attrs = el.attributes
	  var name, handler
	  for (var i = 0, l = attrs.length; i < l; i++) {
	    name = attrs[i].name
	    if (eventRE.test(name)) {
	      name = name.replace(eventRE, '')
	      handler = (vm._scope || vm._context).$eval(attrs[i].value, true)
	      vm.$on(name.replace(eventRE), handler)
	    }
	  }
	}

	/**
	 * Register callbacks for option events and watchers.
	 *
	 * @param {Vue} vm
	 * @param {String} action
	 * @param {Object} hash
	 */

	function registerCallbacks (vm, action, hash) {
	  if (!hash) return
	  var handlers, key, i, j
	  for (key in hash) {
	    handlers = hash[key]
	    if (_.isArray(handlers)) {
	      for (i = 0, j = handlers.length; i < j; i++) {
	        register(vm, action, key, handlers[i])
	      }
	    } else {
	      register(vm, action, key, handlers)
	    }
	  }
	}

	/**
	 * Helper to register an event/watch callback.
	 *
	 * @param {Vue} vm
	 * @param {String} action
	 * @param {String} key
	 * @param {Function|String|Object} handler
	 * @param {Object} [options]
	 */

	function register (vm, action, key, handler, options) {
	  var type = typeof handler
	  if (type === 'function') {
	    vm[action](key, handler, options)
	  } else if (type === 'string') {
	    var methods = vm.$options.methods
	    var method = methods && methods[handler]
	    if (method) {
	      vm[action](key, method, options)
	    } else {
	      process.env.NODE_ENV !== 'production' && _.warn(
	        'Unknown method: "' + handler + '" when ' +
	        'registering callback for ' + action +
	        ': "' + key + '".'
	      )
	    }
	  } else if (handler && type === 'object') {
	    register(vm, action, key, handler.handler, handler)
	  }
	}

	/**
	 * Setup recursive attached/detached calls
	 */

	exports._initDOMHooks = function () {
	  this.$on('hook:attached', onAttached)
	  this.$on('hook:detached', onDetached)
	}

	/**
	 * Callback to recursively call attached hook on children
	 */

	function onAttached () {
	  if (!this._isAttached) {
	    this._isAttached = true
	    this.$children.forEach(callAttach)
	  }
	}

	/**
	 * Iterator to call attached hook
	 *
	 * @param {Vue} child
	 */

	function callAttach (child) {
	  if (!child._isAttached && inDoc(child.$el)) {
	    child._callHook('attached')
	  }
	}

	/**
	 * Callback to recursively call detached hook on children
	 */

	function onDetached () {
	  if (this._isAttached) {
	    this._isAttached = false
	    this.$children.forEach(callDetach)
	  }
	}

	/**
	 * Iterator to call detached hook
	 *
	 * @param {Vue} child
	 */

	function callDetach (child) {
	  if (child._isAttached && !inDoc(child.$el)) {
	    child._callHook('detached')
	  }
	}

	/**
	 * Trigger all handlers for a hook
	 *
	 * @param {String} hook
	 */

	exports._callHook = function (hook) {
	  var handlers = this.$options[hook]
	  if (handlers) {
	    for (var i = 0, j = handlers.length; i < j; i++) {
	      handlers[i].call(this)
	    }
	  }
	  this.$emit('hook:' + hook)
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(9)
	var compiler = __webpack_require__(22)
	var Observer = __webpack_require__(66)
	var Dep = __webpack_require__(49)
	var Watcher = __webpack_require__(48)

	/**
	 * Setup the scope of an instance, which contains:
	 * - observed data
	 * - computed properties
	 * - user methods
	 * - meta properties
	 */

	exports._initState = function () {
	  this._initProps()
	  this._initMeta()
	  this._initMethods()
	  this._initData()
	  this._initComputed()
	}

	/**
	 * Initialize props.
	 */

	exports._initProps = function () {
	  var options = this.$options
	  var el = options.el
	  var props = options.props
	  if (props && !el) {
	    process.env.NODE_ENV !== 'production' && _.warn(
	      'Props will not be compiled if no `el` option is ' +
	      'provided at instantiation.'
	    )
	  }
	  // make sure to convert string selectors into element now
	  el = options.el = _.query(el)
	  this._propsUnlinkFn = el && el.nodeType === 1 && props
	    // props must be linked in proper scope if inside v-for
	    ? compiler.compileAndLinkProps(this, el, props, this._scope)
	    : null
	}

	/**
	 * Initialize the data.
	 */

	exports._initData = function () {
	  var propsData = this._data
	  var optionsDataFn = this.$options.data
	  var optionsData = optionsDataFn && optionsDataFn()
	  if (optionsData) {
	    this._data = optionsData
	    for (var prop in propsData) {
	      if (process.env.NODE_ENV !== 'production' &&
	          optionsData.hasOwnProperty(prop)) {
	        _.warn(
	          'Data field "' + prop + '" is already defined ' +
	          'as a prop. Use prop default value instead.'
	        )
	      }
	      if (this._props[prop].raw !== null ||
	          !optionsData.hasOwnProperty(prop)) {
	        _.set(optionsData, prop, propsData[prop])
	      }
	    }
	  }
	  var data = this._data
	  // proxy data on instance
	  var keys = Object.keys(data)
	  var i, key
	  i = keys.length
	  while (i--) {
	    key = keys[i]
	    this._proxy(key)
	  }
	  // observe data
	  Observer.create(data, this)
	}

	/**
	 * Swap the instance's $data. Called in $data's setter.
	 *
	 * @param {Object} newData
	 */

	exports._setData = function (newData) {
	  newData = newData || {}
	  var oldData = this._data
	  this._data = newData
	  var keys, key, i
	  // unproxy keys not present in new data
	  keys = Object.keys(oldData)
	  i = keys.length
	  while (i--) {
	    key = keys[i]
	    if (!(key in newData)) {
	      this._unproxy(key)
	    }
	  }
	  // proxy keys not already proxied,
	  // and trigger change for changed values
	  keys = Object.keys(newData)
	  i = keys.length
	  while (i--) {
	    key = keys[i]
	    if (!this.hasOwnProperty(key)) {
	      // new property
	      this._proxy(key)
	    }
	  }
	  oldData.__ob__.removeVm(this)
	  Observer.create(newData, this)
	  this._digest()
	}

	/**
	 * Proxy a property, so that
	 * vm.prop === vm._data.prop
	 *
	 * @param {String} key
	 */

	exports._proxy = function (key) {
	  if (!_.isReserved(key)) {
	    // need to store ref to self here
	    // because these getter/setters might
	    // be called by child scopes via
	    // prototype inheritance.
	    var self = this
	    Object.defineProperty(self, key, {
	      configurable: true,
	      enumerable: true,
	      get: function proxyGetter () {
	        return self._data[key]
	      },
	      set: function proxySetter (val) {
	        self._data[key] = val
	      }
	    })
	  }
	}

	/**
	 * Unproxy a property.
	 *
	 * @param {String} key
	 */

	exports._unproxy = function (key) {
	  if (!_.isReserved(key)) {
	    delete this[key]
	  }
	}

	/**
	 * Force update on every watcher in scope.
	 */

	exports._digest = function () {
	  for (var i = 0, l = this._watchers.length; i < l; i++) {
	    this._watchers[i].update(true) // shallow updates
	  }
	}

	/**
	 * Setup computed properties. They are essentially
	 * special getter/setters
	 */

	function noop () {}
	exports._initComputed = function () {
	  var computed = this.$options.computed
	  if (computed) {
	    for (var key in computed) {
	      var userDef = computed[key]
	      var def = {
	        enumerable: true,
	        configurable: true
	      }
	      if (typeof userDef === 'function') {
	        def.get = makeComputedGetter(userDef, this)
	        def.set = noop
	      } else {
	        def.get = userDef.get
	          ? userDef.cache !== false
	            ? makeComputedGetter(userDef.get, this)
	            : _.bind(userDef.get, this)
	          : noop
	        def.set = userDef.set
	          ? _.bind(userDef.set, this)
	          : noop
	      }
	      Object.defineProperty(this, key, def)
	    }
	  }
	}

	function makeComputedGetter (getter, owner) {
	  var watcher = new Watcher(owner, getter, null, {
	    lazy: true
	  })
	  return function computedGetter () {
	    if (watcher.dirty) {
	      watcher.evaluate()
	    }
	    if (Dep.target) {
	      watcher.depend()
	    }
	    return watcher.value
	  }
	}

	/**
	 * Setup instance methods. Methods must be bound to the
	 * instance since they might be passed down as a prop to
	 * child components.
	 */

	exports._initMethods = function () {
	  var methods = this.$options.methods
	  if (methods) {
	    for (var key in methods) {
	      this[key] = _.bind(methods[key], this)
	    }
	  }
	}

	/**
	 * Initialize meta information like $index, $key & $value.
	 */

	exports._initMeta = function () {
	  var metas = this.$options._meta
	  if (metas) {
	    for (var key in metas) {
	      _.defineReactive(this, key, metas[key])
	    }
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(9)
	var config = __webpack_require__(13)
	var Dep = __webpack_require__(49)
	var arrayMethods = __webpack_require__(67)
	var arrayKeys = Object.getOwnPropertyNames(arrayMethods)

	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 *
	 * @param {Array|Object} value
	 * @constructor
	 */

	function Observer (value) {
	  this.value = value
	  this.dep = new Dep()
	  _.define(value, '__ob__', this)
	  if (_.isArray(value)) {
	    var augment = _.hasProto
	      ? protoAugment
	      : copyAugment
	    augment(value, arrayMethods, arrayKeys)
	    this.observeArray(value)
	  } else {
	    this.walk(value)
	  }
	}

	// Static methods

	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 *
	 * @param {*} value
	 * @param {Vue} [vm]
	 * @return {Observer|undefined}
	 * @static
	 */

	Observer.create = function (value, vm) {
	  if (!value || typeof value !== 'object') {
	    return
	  }
	  var ob
	  if (
	    Object.prototype.hasOwnProperty.call(value, '__ob__') &&
	    value.__ob__ instanceof Observer
	  ) {
	    ob = value.__ob__
	  } else if (
	    (_.isArray(value) || _.isPlainObject(value)) &&
	    !Object.isFrozen(value) &&
	    !value._isVue
	  ) {
	    ob = new Observer(value)
	  }
	  if (ob && vm) {
	    ob.addVm(vm)
	  }
	  return ob
	}

	// Instance methods

	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 *
	 * @param {Object} obj
	 */

	Observer.prototype.walk = function (obj) {
	  var keys = Object.keys(obj)
	  var i = keys.length
	  while (i--) {
	    this.convert(keys[i], obj[keys[i]])
	  }
	}

	/**
	 * Observe a list of Array items.
	 *
	 * @param {Array} items
	 */

	Observer.prototype.observeArray = function (items) {
	  var i = items.length
	  while (i--) {
	    Observer.create(items[i])
	  }
	}

	/**
	 * Convert a property into getter/setter so we can emit
	 * the events when the property is accessed/changed.
	 *
	 * @param {String} key
	 * @param {*} val
	 */

	Observer.prototype.convert = function (key, val) {
	  defineReactive(this.value, key, val)
	}

	/**
	 * Add an owner vm, so that when $set/$delete mutations
	 * happen we can notify owner vms to proxy the keys and
	 * digest the watchers. This is only called when the object
	 * is observed as an instance's root $data.
	 *
	 * @param {Vue} vm
	 */

	Observer.prototype.addVm = function (vm) {
	  (this.vms || (this.vms = [])).push(vm)
	}

	/**
	 * Remove an owner vm. This is called when the object is
	 * swapped out as an instance's $data object.
	 *
	 * @param {Vue} vm
	 */

	Observer.prototype.removeVm = function (vm) {
	  this.vms.$remove(vm)
	}

	// helpers

	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */

	function protoAugment (target, src) {
	  target.__proto__ = src
	}

	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */

	function copyAugment (target, src, keys) {
	  var i = keys.length
	  var key
	  while (i--) {
	    key = keys[i]
	    _.define(target, key, src[key])
	  }
	}

	/**
	 * Define a reactive property on an Object.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 */

	function defineReactive (obj, key, val) {
	  var dep = new Dep()

	  // cater for pre-defined getter/setters
	  var getter, setter
	  if (config.convertAllProperties) {
	    var property = Object.getOwnPropertyDescriptor(obj, key)
	    if (property && property.configurable === false) {
	      return
	    }
	    getter = property && property.get
	    setter = property && property.set
	  }

	  var childOb = Observer.create(val)
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter () {
	      var value = getter ? getter.call(obj) : val
	      if (Dep.target) {
	        dep.depend()
	        if (childOb) {
	          childOb.dep.depend()
	        }
	        if (_.isArray(value)) {
	          for (var e, i = 0, l = value.length; i < l; i++) {
	            e = value[i]
	            e && e.__ob__ && e.__ob__.dep.depend()
	          }
	        }
	      }
	      return value
	    },
	    set: function reactiveSetter (newVal) {
	      var value = getter ? getter.call(obj) : val
	      if (newVal === value) {
	        return
	      }
	      if (setter) {
	        setter.call(obj, newVal)
	      } else {
	        val = newVal
	      }
	      childOb = Observer.create(newVal)
	      dep.notify()
	    }
	  })
	}

	// Attach to the util object so it can be used elsewhere.
	_.defineReactive = defineReactive

	module.exports = Observer


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(9)
	var arrayProto = Array.prototype
	var arrayMethods = Object.create(arrayProto)

	/**
	 * Intercept mutating methods and emit events
	 */

	;[
	  'push',
	  'pop',
	  'shift',
	  'unshift',
	  'splice',
	  'sort',
	  'reverse'
	]
	.forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method]
	  _.define(arrayMethods, method, function mutator () {
	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length
	    var args = new Array(i)
	    while (i--) {
	      args[i] = arguments[i]
	    }
	    var result = original.apply(this, args)
	    var ob = this.__ob__
	    var inserted
	    switch (method) {
	      case 'push':
	        inserted = args
	        break
	      case 'unshift':
	        inserted = args
	        break
	      case 'splice':
	        inserted = args.slice(2)
	        break
	    }
	    if (inserted) ob.observeArray(inserted)
	    // notify change
	    ob.dep.notify()
	    return result
	  })
	})

	/**
	 * Swap the element at the given index with a new value
	 * and emits corresponding event.
	 *
	 * @param {Number} index
	 * @param {*} val
	 * @return {*} - replaced element
	 */

	_.define(
	  arrayProto,
	  '$set',
	  function $set (index, val) {
	    if (index >= this.length) {
	      this.length = index + 1
	    }
	    return this.splice(index, 1, val)[0]
	  }
	)

	/**
	 * Convenience method to remove the element at given index.
	 *
	 * @param {Number} index
	 * @param {*} val
	 */

	_.define(
	  arrayProto,
	  '$remove',
	  function $remove (item) {
	    /* istanbul ignore if */
	    if (!this.length) return
	    var index = _.indexOf(this, item)
	    if (index > -1) {
	      return this.splice(index, 1)
	    }
	  }
	)

	module.exports = arrayMethods


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(9)
	var Directive = __webpack_require__(69)
	var compiler = __webpack_require__(22)

	/**
	 * Update v-ref for component.
	 *
	 * @param {Boolean} remove
	 */

	exports._updateRef = function (remove) {
	  var ref = this.$options._ref
	  if (ref) {
	    var refs = (this._scope || this._context).$refs
	    if (remove) {
	      if (refs[ref] === this) {
	        refs[ref] = null
	      }
	    } else {
	      refs[ref] = this
	    }
	  }
	}

	/**
	 * Transclude, compile and link element.
	 *
	 * If a pre-compiled linker is available, that means the
	 * passed in element will be pre-transcluded and compiled
	 * as well - all we need to do is to call the linker.
	 *
	 * Otherwise we need to call transclude/compile/link here.
	 *
	 * @param {Element} el
	 * @return {Element}
	 */

	exports._compile = function (el) {
	  var options = this.$options

	  // transclude and init element
	  // transclude can potentially replace original
	  // so we need to keep reference; this step also injects
	  // the template and caches the original attributes
	  // on the container node and replacer node.
	  var original = el
	  el = compiler.transclude(el, options)
	  this._initElement(el)

	  // root is always compiled per-instance, because
	  // container attrs and props can be different every time.
	  var contextOptions = this._context && this._context.$options
	  var rootLinker = compiler.compileRoot(el, options, contextOptions)

	  // compile and link the rest
	  var contentLinkFn
	  var ctor = this.constructor
	  // component compilation can be cached
	  // as long as it's not using inline-template
	  if (options._linkerCachable) {
	    contentLinkFn = ctor.linker
	    if (!contentLinkFn) {
	      contentLinkFn = ctor.linker = compiler.compile(el, options)
	    }
	  }

	  // link phase
	  // make sure to link root with prop scope!
	  var rootUnlinkFn = rootLinker(this, el, this._scope)
	  var contentUnlinkFn = contentLinkFn
	    ? contentLinkFn(this, el)
	    : compiler.compile(el, options)(this, el)

	  // register composite unlink function
	  // to be called during instance destruction
	  this._unlinkFn = function () {
	    rootUnlinkFn()
	    // passing destroying: true to avoid searching and
	    // splicing the directives
	    contentUnlinkFn(true)
	  }

	  // finally replace original
	  if (options.replace) {
	    _.replace(original, el)
	  }

	  this._isCompiled = true
	  this._callHook('compiled')
	  return el
	}

	/**
	 * Initialize instance element. Called in the public
	 * $mount() method.
	 *
	 * @param {Element} el
	 */

	exports._initElement = function (el) {
	  if (el instanceof DocumentFragment) {
	    this._isFragment = true
	    this.$el = this._fragmentStart = el.firstChild
	    this._fragmentEnd = el.lastChild
	    // set persisted text anchors to empty
	    if (this._fragmentStart.nodeType === 3) {
	      this._fragmentStart.data = this._fragmentEnd.data = ''
	    }
	    this._fragment = el
	  } else {
	    this.$el = el
	  }
	  this.$el.__vue__ = this
	  this._callHook('beforeCompile')
	}

	/**
	 * Create and bind a directive to an element.
	 *
	 * @param {String} name - directive name
	 * @param {Node} node   - target node
	 * @param {Object} desc - parsed directive descriptor
	 * @param {Object} def  - directive definition object
	 * @param {Vue} [host] - transclusion host component
	 * @param {Object} [scope] - v-for scope
	 * @param {Fragment} [frag] - owner fragment
	 */

	exports._bindDir = function (descriptor, node, host, scope, frag) {
	  this._directives.push(
	    new Directive(descriptor, this, node, host, scope, frag)
	  )
	}

	/**
	 * Teardown an instance, unobserves the data, unbind all the
	 * directives, turn off all the event listeners, etc.
	 *
	 * @param {Boolean} remove - whether to remove the DOM node.
	 * @param {Boolean} deferCleanup - if true, defer cleanup to
	 *                                 be called later
	 */

	exports._destroy = function (remove, deferCleanup) {
	  if (this._isBeingDestroyed) {
	    if (!deferCleanup) {
	      this._cleanup()
	    }
	    return
	  }
	  this._callHook('beforeDestroy')
	  this._isBeingDestroyed = true
	  var i
	  // remove self from parent. only necessary
	  // if parent is not being destroyed as well.
	  var parent = this.$parent
	  if (parent && !parent._isBeingDestroyed) {
	    parent.$children.$remove(this)
	    // unregister ref (remove: true)
	    this._updateRef(true)
	  }
	  // destroy all children.
	  i = this.$children.length
	  while (i--) {
	    this.$children[i].$destroy()
	  }
	  // teardown props
	  if (this._propsUnlinkFn) {
	    this._propsUnlinkFn()
	  }
	  // teardown all directives. this also tearsdown all
	  // directive-owned watchers.
	  if (this._unlinkFn) {
	    this._unlinkFn()
	  }
	  i = this._watchers.length
	  while (i--) {
	    this._watchers[i].teardown()
	  }
	  // remove reference to self on $el
	  if (this.$el) {
	    this.$el.__vue__ = null
	  }
	  // remove DOM element
	  var self = this
	  if (remove && this.$el) {
	    this.$remove(function () {
	      self._cleanup()
	    })
	  } else if (!deferCleanup) {
	    this._cleanup()
	  }
	}

	/**
	 * Clean up to ensure garbage collection.
	 * This is called after the leave transition if there
	 * is any.
	 */

	exports._cleanup = function () {
	  if (this._isDestroyed) {
	    return
	  }
	  // remove self from owner fragment
	  // do it in cleanup so that we can call $destroy with
	  // defer right when a fragment is about to be removed.
	  if (this._frag) {
	    this._frag.children.$remove(this)
	  }
	  // remove reference from data ob
	  // frozen object may not have observer.
	  if (this._data.__ob__) {
	    this._data.__ob__.removeVm(this)
	  }
	  // Clean up references to private properties and other
	  // instances. preserve reference to _data so that proxy
	  // accessors still work. The only potential side effect
	  // here is that mutating the instance after it's destroyed
	  // may affect the state of other components that are still
	  // observing the same object, but that seems to be a
	  // reasonable responsibility for the user rather than
	  // always throwing an error on them.
	  this.$el =
	  this.$parent =
	  this.$root =
	  this.$children =
	  this._watchers =
	  this._context =
	  this._scope =
	  this._directives = null
	  // call the last hook...
	  this._isDestroyed = true
	  this._callHook('destroyed')
	  // turn off all instance listeners.
	  this.$off()
	}


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(9)
	var Watcher = __webpack_require__(48)
	var expParser = __webpack_require__(50)
	function noop () {}

	/**
	 * A directive links a DOM element with a piece of data,
	 * which is the result of evaluating an expression.
	 * It registers a watcher with the expression and calls
	 * the DOM update function when a change is triggered.
	 *
	 * @param {String} name
	 * @param {Node} el
	 * @param {Vue} vm
	 * @param {Object} descriptor
	 *                 - {String} name
	 *                 - {Object} def
	 *                 - {String} expression
	 *                 - {Array<Object>} [filters]
	 *                 - {Boolean} literal
	 *                 - {String} attr
	 *                 - {String} raw
	 * @param {Object} def - directive definition object
	 * @param {Vue} [host] - transclusion host component
	 * @param {Object} [scope] - v-for scope
	 * @param {Fragment} [frag] - owner fragment
	 * @constructor
	 */

	function Directive (descriptor, vm, el, host, scope, frag) {
	  this.vm = vm
	  this.el = el
	  // copy descriptor properties
	  this.descriptor = descriptor
	  this.name = descriptor.name
	  this.expression = descriptor.expression
	  this.arg = descriptor.arg
	  this.modifiers = descriptor.modifiers
	  this.filters = descriptor.filters
	  this.literal = this.modifiers && this.modifiers.literal
	  // private
	  this._locked = false
	  this._bound = false
	  this._listeners = null
	  // link context
	  this._host = host
	  this._scope = scope
	  this._frag = frag
	  // store directives on node in dev mode
	  if (process.env.NODE_ENV !== 'production' && this.el) {
	    this.el._vue_directives = this.el._vue_directives || []
	    this.el._vue_directives.push(this)
	  }
	}

	/**
	 * Initialize the directive, mixin definition properties,
	 * setup the watcher, call definition bind() and update()
	 * if present.
	 *
	 * @param {Object} def
	 */

	Directive.prototype._bind = function () {
	  var name = this.name
	  var descriptor = this.descriptor

	  // remove attribute
	  if (
	    (name !== 'cloak' || this.vm._isCompiled) &&
	    this.el && this.el.removeAttribute
	  ) {
	    var attr = descriptor.attr || ('v-' + name)
	    this.el.removeAttribute(attr)
	  }

	  // copy def properties
	  var def = descriptor.def
	  if (typeof def === 'function') {
	    this.update = def
	  } else {
	    _.extend(this, def)
	  }

	  // setup directive params
	  this._setupParams()

	  // initial bind
	  if (this.bind) {
	    this.bind()
	  }

	  if (this.literal) {
	    this.update && this.update(descriptor.raw)
	  } else if (
	    (this.expression || this.modifiers) &&
	    (this.update || this.twoWay) &&
	    !this._checkStatement()
	  ) {
	    // wrapped updater for context
	    var dir = this
	    if (this.update) {
	      this._update = function (val, oldVal) {
	        if (!dir._locked) {
	          dir.update(val, oldVal)
	        }
	      }
	    } else {
	      this._update = noop
	    }
	    var preProcess = this._preProcess
	      ? _.bind(this._preProcess, this)
	      : null
	    var postProcess = this._postProcess
	      ? _.bind(this._postProcess, this)
	      : null
	    var watcher = this._watcher = new Watcher(
	      this.vm,
	      this.expression,
	      this._update, // callback
	      {
	        filters: this.filters,
	        twoWay: this.twoWay,
	        deep: this.deep,
	        preProcess: preProcess,
	        postProcess: postProcess,
	        scope: this._scope
	      }
	    )
	    // v-model with inital inline value need to sync back to
	    // model instead of update to DOM on init. They would
	    // set the afterBind hook to indicate that.
	    if (this.afterBind) {
	      this.afterBind()
	    } else if (this.update) {
	      this.update(watcher.value)
	    }
	  }
	  this._bound = true
	}

	/**
	 * Setup all param attributes, e.g. track-by,
	 * transition-mode, etc...
	 */

	Directive.prototype._setupParams = function () {
	  if (!this.params) {
	    return
	  }
	  var params = this.params
	  // swap the params array with a fresh object.
	  this.params = Object.create(null)
	  var i = params.length
	  var key, val, mappedKey
	  while (i--) {
	    key = params[i]
	    mappedKey = _.camelize(key)
	    val = _.getBindAttr(this.el, key)
	    if (val != null) {
	      // dynamic
	      this._setupParamWatcher(mappedKey, val)
	    } else {
	      // static
	      val = _.attr(this.el, key)
	      if (val != null) {
	        this.params[mappedKey] = val === '' ? true : val
	      }
	    }
	  }
	}

	/**
	 * Setup a watcher for a dynamic param.
	 *
	 * @param {String} key
	 * @param {String} expression
	 */

	Directive.prototype._setupParamWatcher = function (key, expression) {
	  var self = this
	  var called = false
	  var unwatch = (this._scope || this.vm).$watch(expression, function (val, oldVal) {
	    self.params[key] = val
	    // since we are in immediate mode,
	    // only call the param change callbacks if this is not the first update.
	    if (called) {
	      var cb = self.paramWatchers && self.paramWatchers[key]
	      if (cb) {
	        cb.call(self, val, oldVal)
	      }
	    } else {
	      called = true
	    }
	  }, {
	    immediate: true
	  })
	  ;(this._paramUnwatchFns || (this._paramUnwatchFns = [])).push(unwatch)
	}

	/**
	 * Check if the directive is a function caller
	 * and if the expression is a callable one. If both true,
	 * we wrap up the expression and use it as the event
	 * handler.
	 *
	 * e.g. on-click="a++"
	 *
	 * @return {Boolean}
	 */

	Directive.prototype._checkStatement = function () {
	  var expression = this.expression
	  if (
	    expression && this.acceptStatement &&
	    !expParser.isSimplePath(expression)
	  ) {
	    var fn = expParser.parse(expression).get
	    var scope = this._scope || this.vm
	    var handler = function (e) {
	      scope.$event = e
	      fn.call(scope, scope)
	      scope.$event = null
	    }
	    if (this.filters) {
	      handler = scope._applyFilters(handler, null, this.filters)
	    }
	    this.update(handler)
	    return true
	  }
	}

	/**
	 * Set the corresponding value with the setter.
	 * This should only be used in two-way directives
	 * e.g. v-model.
	 *
	 * @param {*} value
	 * @public
	 */

	Directive.prototype.set = function (value) {
	  /* istanbul ignore else */
	  if (this.twoWay) {
	    this._withLock(function () {
	      this._watcher.set(value)
	    })
	  } else if (process.env.NODE_ENV !== 'production') {
	    _.warn(
	      'Directive.set() can only be used inside twoWay' +
	      'directives.'
	    )
	  }
	}

	/**
	 * Execute a function while preventing that function from
	 * triggering updates on this directive instance.
	 *
	 * @param {Function} fn
	 */

	Directive.prototype._withLock = function (fn) {
	  var self = this
	  self._locked = true
	  fn.call(self)
	  _.nextTick(function () {
	    self._locked = false
	  })
	}

	/**
	 * Convenience method that attaches a DOM event listener
	 * to the directive element and autometically tears it down
	 * during unbind.
	 *
	 * @param {String} event
	 * @param {Function} handler
	 */

	Directive.prototype.on = function (event, handler) {
	  _.on(this.el, event, handler)
	  ;(this._listeners || (this._listeners = []))
	    .push([event, handler])
	}

	/**
	 * Teardown the watcher and call unbind.
	 */

	Directive.prototype._teardown = function () {
	  if (this._bound) {
	    this._bound = false
	    if (this.unbind) {
	      this.unbind()
	    }
	    if (this._watcher) {
	      this._watcher.teardown()
	    }
	    var listeners = this._listeners
	    var i
	    if (listeners) {
	      i = listeners.length
	      while (i--) {
	        _.off(this.el, listeners[i][0], listeners[i][1])
	      }
	    }
	    var unwatchFns = this._paramUnwatchFns
	    if (unwatchFns) {
	      i = unwatchFns.length
	      while (i--) {
	        unwatchFns[i]()
	      }
	    }
	    if (process.env.NODE_ENV !== 'production' && this.el) {
	      this.el._vue_directives.$remove(this)
	    }
	    this.vm = this.el = this._watcher = this._listeners = null
	  }
	}

	module.exports = Directive

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(9)

	/**
	 * Apply a list of filter (descriptors) to a value.
	 * Using plain for loops here because this will be called in
	 * the getter of any watcher with filters so it is very
	 * performance sensitive.
	 *
	 * @param {*} value
	 * @param {*} [oldValue]
	 * @param {Array} filters
	 * @param {Boolean} write
	 * @return {*}
	 */

	exports._applyFilters = function (value, oldValue, filters, write) {
	  var filter, fn, args, arg, offset, i, l, j, k
	  for (i = 0, l = filters.length; i < l; i++) {
	    filter = filters[i]
	    fn = _.resolveAsset(this.$options, 'filters', filter.name)
	    if (process.env.NODE_ENV !== 'production') {
	      _.assertAsset(fn, 'filter', filter.name)
	    }
	    if (!fn) continue
	    fn = write ? fn.write : (fn.read || fn)
	    if (typeof fn !== 'function') continue
	    args = write ? [value, oldValue] : [value]
	    offset = write ? 2 : 1
	    if (filter.args) {
	      for (j = 0, k = filter.args.length; j < k; j++) {
	        arg = filter.args[j]
	        args[j + offset] = arg.dynamic
	          ? this.$get(arg.value)
	          : arg.value
	      }
	    }
	    value = fn.apply(this, args)
	  }
	  return value
	}

	/**
	 * Resolve a component, depending on whether the component
	 * is defined normally or using an async factory function.
	 * Resolves synchronously if already resolved, otherwise
	 * resolves asynchronously and caches the resolved
	 * constructor on the factory.
	 *
	 * @param {String} id
	 * @param {Function} cb
	 */

	exports._resolveComponent = function (id, cb) {
	  var factory = _.resolveAsset(this.$options, 'components', id)
	  if (process.env.NODE_ENV !== 'production') {
	    _.assertAsset(factory, 'component', id)
	  }
	  if (!factory) {
	    return
	  }
	  // async component factory
	  if (!factory.options) {
	    if (factory.resolved) {
	      // cached
	      cb(factory.resolved)
	    } else if (factory.requested) {
	      // pool callbacks
	      factory.pendingCallbacks.push(cb)
	    } else {
	      factory.requested = true
	      var cbs = factory.pendingCallbacks = [cb]
	      factory(function resolve (res) {
	        if (_.isPlainObject(res)) {
	          res = _.Vue.extend(res)
	        }
	        // cache resolved
	        factory.resolved = res
	        // invoke callbacks
	        for (var i = 0, l = cbs.length; i < l; i++) {
	          cbs[i](res)
	        }
	      }, function reject (reason) {
	        process.env.NODE_ENV !== 'production' && _.warn(
	          'Failed to resolve async component: ' + id + '. ' +
	          (reason ? '\nReason: ' + reason : '')
	        )
	      })
	    }
	  } else {
	    // normal component
	    cb(factory)
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(9)
	var Watcher = __webpack_require__(48)
	var Path = __webpack_require__(51)
	var textParser = __webpack_require__(14)
	var dirParser = __webpack_require__(16)
	var expParser = __webpack_require__(50)
	var filterRE = /[^|]\|[^|]/

	/**
	 * Get the value from an expression on this vm.
	 *
	 * @param {String} exp
	 * @param {Boolean} [asStatement]
	 * @return {*}
	 */

	exports.$get = function (exp, asStatement) {
	  var res = expParser.parse(exp)
	  if (res) {
	    if (asStatement && !expParser.isSimplePath(exp)) {
	      var self = this
	      return function statementHandler () {
	        res.get.call(self, self)
	      }
	    } else {
	      try {
	        return res.get.call(this, this)
	      } catch (e) {}
	    }
	  }
	}

	/**
	 * Set the value from an expression on this vm.
	 * The expression must be a valid left-hand
	 * expression in an assignment.
	 *
	 * @param {String} exp
	 * @param {*} val
	 */

	exports.$set = function (exp, val) {
	  var res = expParser.parse(exp, true)
	  if (res && res.set) {
	    res.set.call(this, this, val)
	  }
	}

	/**
	 * Delete a property on the VM
	 *
	 * @param {String} key
	 */

	exports.$delete = function (key) {
	  _.delete(this._data, key)
	}

	/**
	 * Watch an expression, trigger callback when its
	 * value changes.
	 *
	 * @param {String|Function} expOrFn
	 * @param {Function} cb
	 * @param {Object} [options]
	 *                 - {Boolean} deep
	 *                 - {Boolean} immediate
	 * @return {Function} - unwatchFn
	 */

	exports.$watch = function (expOrFn, cb, options) {
	  var vm = this
	  var parsed
	  if (typeof expOrFn === 'string') {
	    parsed = dirParser.parse(expOrFn)
	    expOrFn = parsed.expression
	  }
	  var watcher = new Watcher(vm, expOrFn, cb, {
	    deep: options && options.deep,
	    filters: parsed && parsed.filters
	  })
	  if (options && options.immediate) {
	    cb.call(vm, watcher.value)
	  }
	  return function unwatchFn () {
	    watcher.teardown()
	  }
	}

	/**
	 * Evaluate a text directive, including filters.
	 *
	 * @param {String} text
	 * @param {Boolean} [asStatement]
	 * @return {String}
	 */

	exports.$eval = function (text, asStatement) {
	  // check for filters.
	  if (filterRE.test(text)) {
	    var dir = dirParser.parse(text)
	    // the filter regex check might give false positive
	    // for pipes inside strings, so it's possible that
	    // we don't get any filters here
	    var val = this.$get(dir.expression, asStatement)
	    return dir.filters
	      ? this._applyFilters(val, null, dir.filters)
	      : val
	  } else {
	    // no filter
	    return this.$get(text, asStatement)
	  }
	}

	/**
	 * Interpolate a piece of template text.
	 *
	 * @param {String} text
	 * @return {String}
	 */

	exports.$interpolate = function (text) {
	  var tokens = textParser.parse(text)
	  var vm = this
	  if (tokens) {
	    if (tokens.length === 1) {
	      return vm.$eval(tokens[0].value) + ''
	    } else {
	      return tokens.map(function (token) {
	        return token.tag
	          ? vm.$eval(token.value)
	          : token.value
	      }).join('')
	    }
	  } else {
	    return text
	  }
	}

	/**
	 * Log instance data as a plain JS object
	 * so that it is easier to inspect in console.
	 * This method assumes console is available.
	 *
	 * @param {String} [path]
	 */

	exports.$log = function (path) {
	  var data = path
	    ? Path.get(this._data, path)
	    : this._data
	  if (data) {
	    data = clean(data)
	  }
	  // include computed fields
	  if (!path) {
	    for (var key in this.$options.computed) {
	      data[key] = clean(this[key])
	    }
	  }
	  console.log(data)
	}

	/**
	 * "clean" a getter/setter converted object into a plain
	 * object copy.
	 *
	 * @param {Object} - obj
	 * @return {Object}
	 */

	function clean (obj) {
	  return JSON.parse(JSON.stringify(obj))
	}


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(9)
	var transition = __webpack_require__(17)

	/**
	 * Convenience on-instance nextTick. The callback is
	 * auto-bound to the instance, and this avoids component
	 * modules having to rely on the global Vue.
	 *
	 * @param {Function} fn
	 */

	exports.$nextTick = function (fn) {
	  _.nextTick(fn, this)
	}

	/**
	 * Append instance to target
	 *
	 * @param {Node} target
	 * @param {Function} [cb]
	 * @param {Boolean} [withTransition] - defaults to true
	 */

	exports.$appendTo = function (target, cb, withTransition) {
	  return insert(
	    this, target, cb, withTransition,
	    append, transition.append
	  )
	}

	/**
	 * Prepend instance to target
	 *
	 * @param {Node} target
	 * @param {Function} [cb]
	 * @param {Boolean} [withTransition] - defaults to true
	 */

	exports.$prependTo = function (target, cb, withTransition) {
	  target = query(target)
	  if (target.hasChildNodes()) {
	    this.$before(target.firstChild, cb, withTransition)
	  } else {
	    this.$appendTo(target, cb, withTransition)
	  }
	  return this
	}

	/**
	 * Insert instance before target
	 *
	 * @param {Node} target
	 * @param {Function} [cb]
	 * @param {Boolean} [withTransition] - defaults to true
	 */

	exports.$before = function (target, cb, withTransition) {
	  return insert(
	    this, target, cb, withTransition,
	    before, transition.before
	  )
	}

	/**
	 * Insert instance after target
	 *
	 * @param {Node} target
	 * @param {Function} [cb]
	 * @param {Boolean} [withTransition] - defaults to true
	 */

	exports.$after = function (target, cb, withTransition) {
	  target = query(target)
	  if (target.nextSibling) {
	    this.$before(target.nextSibling, cb, withTransition)
	  } else {
	    this.$appendTo(target.parentNode, cb, withTransition)
	  }
	  return this
	}

	/**
	 * Remove instance from DOM
	 *
	 * @param {Function} [cb]
	 * @param {Boolean} [withTransition] - defaults to true
	 */

	exports.$remove = function (cb, withTransition) {
	  if (!this.$el.parentNode) {
	    return cb && cb()
	  }
	  var inDoc = this._isAttached && _.inDoc(this.$el)
	  // if we are not in document, no need to check
	  // for transitions
	  if (!inDoc) withTransition = false
	  var self = this
	  var realCb = function () {
	    if (inDoc) self._callHook('detached')
	    if (cb) cb()
	  }
	  if (this._isFragment) {
	    _.removeNodeRange(
	      this._fragmentStart,
	      this._fragmentEnd,
	      this, this._fragment, realCb
	    )
	  } else {
	    var op = withTransition === false
	      ? remove
	      : transition.remove
	    op(this.$el, this, realCb)
	  }
	  return this
	}

	/**
	 * Shared DOM insertion function.
	 *
	 * @param {Vue} vm
	 * @param {Element} target
	 * @param {Function} [cb]
	 * @param {Boolean} [withTransition]
	 * @param {Function} op1 - op for non-transition insert
	 * @param {Function} op2 - op for transition insert
	 * @return vm
	 */

	function insert (vm, target, cb, withTransition, op1, op2) {
	  target = query(target)
	  var targetIsDetached = !_.inDoc(target)
	  var op = withTransition === false || targetIsDetached
	      ? op1
	      : op2
	  var shouldCallHook =
	    !targetIsDetached &&
	    !vm._isAttached &&
	    !_.inDoc(vm.$el)
	  if (vm._isFragment) {
	    _.mapNodeRange(vm._fragmentStart, vm._fragmentEnd, function (node) {
	      op(node, target, vm)
	    })
	    cb && cb()
	  } else {
	    op(vm.$el, target, vm, cb)
	  }
	  if (shouldCallHook) {
	    vm._callHook('attached')
	  }
	  return vm
	}

	/**
	 * Check for selectors
	 *
	 * @param {String|Element} el
	 */

	function query (el) {
	  return typeof el === 'string'
	    ? document.querySelector(el)
	    : el
	}

	/**
	 * Append operation that takes a callback.
	 *
	 * @param {Node} el
	 * @param {Node} target
	 * @param {Vue} vm - unused
	 * @param {Function} [cb]
	 */

	function append (el, target, vm, cb) {
	  target.appendChild(el)
	  if (cb) cb()
	}

	/**
	 * InsertBefore operation that takes a callback.
	 *
	 * @param {Node} el
	 * @param {Node} target
	 * @param {Vue} vm - unused
	 * @param {Function} [cb]
	 */

	function before (el, target, vm, cb) {
	  _.before(el, target)
	  if (cb) cb()
	}

	/**
	 * Remove operation that takes a callback.
	 *
	 * @param {Node} el
	 * @param {Vue} vm - unused
	 * @param {Function} [cb]
	 */

	function remove (el, vm, cb) {
	  _.remove(el)
	  if (cb) cb()
	}


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(9)

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 */

	exports.$on = function (event, fn) {
	  (this._events[event] || (this._events[event] = []))
	    .push(fn)
	  modifyListenerCount(this, event, 1)
	  return this
	}

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 */

	exports.$once = function (event, fn) {
	  var self = this
	  function on () {
	    self.$off(event, on)
	    fn.apply(this, arguments)
	  }
	  on.fn = fn
	  this.$on(event, on)
	  return this
	}

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 */

	exports.$off = function (event, fn) {
	  var cbs
	  // all
	  if (!arguments.length) {
	    if (this.$parent) {
	      for (event in this._events) {
	        cbs = this._events[event]
	        if (cbs) {
	          modifyListenerCount(this, event, -cbs.length)
	        }
	      }
	    }
	    this._events = {}
	    return this
	  }
	  // specific event
	  cbs = this._events[event]
	  if (!cbs) {
	    return this
	  }
	  if (arguments.length === 1) {
	    modifyListenerCount(this, event, -cbs.length)
	    this._events[event] = null
	    return this
	  }
	  // specific handler
	  var cb
	  var i = cbs.length
	  while (i--) {
	    cb = cbs[i]
	    if (cb === fn || cb.fn === fn) {
	      modifyListenerCount(this, event, -1)
	      cbs.splice(i, 1)
	      break
	    }
	  }
	  return this
	}

	/**
	 * Trigger an event on self.
	 *
	 * @param {String} event
	 */

	exports.$emit = function (event) {
	  var cbs = this._events[event]
	  this._shouldPropagate = !cbs
	  if (cbs) {
	    cbs = cbs.length > 1
	      ? _.toArray(cbs)
	      : cbs
	    var args = _.toArray(arguments, 1)
	    for (var i = 0, l = cbs.length; i < l; i++) {
	      var res = cbs[i].apply(this, args)
	      if (res === true) {
	        this._shouldPropagate = true
	      }
	    }
	  }
	  return this
	}

	/**
	 * Recursively broadcast an event to all children instances.
	 *
	 * @param {String} event
	 * @param {...*} additional arguments
	 */

	exports.$broadcast = function (event) {
	  // if no child has registered for this event,
	  // then there's no need to broadcast.
	  if (!this._eventsCount[event]) return
	  var children = this.$children
	  for (var i = 0, l = children.length; i < l; i++) {
	    var child = children[i]
	    child.$emit.apply(child, arguments)
	    if (child._shouldPropagate) {
	      child.$broadcast.apply(child, arguments)
	    }
	  }
	  return this
	}

	/**
	 * Recursively propagate an event up the parent chain.
	 *
	 * @param {String} event
	 * @param {...*} additional arguments
	 */

	exports.$dispatch = function () {
	  this.$emit.apply(this, arguments)
	  var parent = this.$parent
	  while (parent) {
	    parent.$emit.apply(parent, arguments)
	    parent = parent._shouldPropagate
	      ? parent.$parent
	      : null
	  }
	  return this
	}

	/**
	 * Modify the listener counts on all parents.
	 * This bookkeeping allows $broadcast to return early when
	 * no child has listened to a certain event.
	 *
	 * @param {Vue} vm
	 * @param {String} event
	 * @param {Number} count
	 */

	var hookRE = /^hook:/
	function modifyListenerCount (vm, event, count) {
	  var parent = vm.$parent
	  // hooks do not get broadcasted so no need
	  // to do bookkeeping for them
	  if (!parent || !count || hookRE.test(event)) return
	  while (parent) {
	    parent._eventsCount[event] =
	      (parent._eventsCount[event] || 0) + count
	    parent = parent.$parent
	  }
	}


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(9)
	var compiler = __webpack_require__(22)

	/**
	 * Set instance target element and kick off the compilation
	 * process. The passed in `el` can be a selector string, an
	 * existing Element, or a DocumentFragment (for block
	 * instances).
	 *
	 * @param {Element|DocumentFragment|string} el
	 * @public
	 */

	exports.$mount = function (el) {
	  if (this._isCompiled) {
	    process.env.NODE_ENV !== 'production' && _.warn(
	      '$mount() should be called only once.'
	    )
	    return
	  }
	  el = _.query(el)
	  if (!el) {
	    el = document.createElement('div')
	  }
	  this._compile(el)
	  this._initDOMHooks()
	  if (_.inDoc(this.$el)) {
	    this._callHook('attached')
	    ready.call(this)
	  } else {
	    this.$once('hook:attached', ready)
	  }
	  return this
	}

	/**
	 * Mark an instance as ready.
	 */

	function ready () {
	  this._isAttached = true
	  this._isReady = true
	  this._callHook('ready')
	}

	/**
	 * Teardown the instance, simply delegate to the internal
	 * _destroy.
	 */

	exports.$destroy = function (remove, deferCleanup) {
	  this._destroy(remove, deferCleanup)
	}

	/**
	 * Partially compile a piece of DOM and return a
	 * decompile function.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Vue} [host]
	 * @return {Function}
	 */

	exports.$compile = function (el, host, scope, frag) {
	  return compiler.compile(el, this.$options, true)(
	    this, el, host, scope, frag
	  )
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 75 */
/***/ function(module, exports) {

	'use strict';

	var babelHelpers = {};

	babelHelpers.classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};
	function Target(path, matcher, delegate) {
	  this.path = path;
	  this.matcher = matcher;
	  this.delegate = delegate;
	}

	Target.prototype = {
	  to: function to(target, callback) {
	    var delegate = this.delegate;

	    if (delegate && delegate.willAddRoute) {
	      target = delegate.willAddRoute(this.matcher.target, target);
	    }

	    this.matcher.add(this.path, target);

	    if (callback) {
	      if (callback.length === 0) {
	        throw new Error("You must have an argument in the function passed to `to`");
	      }
	      this.matcher.addChild(this.path, target, callback, this.delegate);
	    }
	    return this;
	  }
	};

	function Matcher(target) {
	  this.routes = {};
	  this.children = {};
	  this.target = target;
	}

	Matcher.prototype = {
	  add: function add(path, handler) {
	    this.routes[path] = handler;
	  },

	  addChild: function addChild(path, target, callback, delegate) {
	    var matcher = new Matcher(target);
	    this.children[path] = matcher;

	    var match = generateMatch(path, matcher, delegate);

	    if (delegate && delegate.contextEntered) {
	      delegate.contextEntered(target, match);
	    }

	    callback(match);
	  }
	};

	function generateMatch(startingPath, matcher, delegate) {
	  return function (path, nestedCallback) {
	    var fullPath = startingPath + path;

	    if (nestedCallback) {
	      nestedCallback(generateMatch(fullPath, matcher, delegate));
	    } else {
	      return new Target(startingPath + path, matcher, delegate);
	    }
	  };
	}

	function addRoute(routeArray, path, handler) {
	  var len = 0;
	  for (var i = 0, l = routeArray.length; i < l; i++) {
	    len += routeArray[i].path.length;
	  }

	  path = path.substr(len);
	  var route = { path: path, handler: handler };
	  routeArray.push(route);
	}

	function eachRoute(baseRoute, matcher, callback, binding) {
	  var routes = matcher.routes;

	  for (var path in routes) {
	    if (routes.hasOwnProperty(path)) {
	      var routeArray = baseRoute.slice();
	      addRoute(routeArray, path, routes[path]);

	      if (matcher.children[path]) {
	        eachRoute(routeArray, matcher.children[path], callback, binding);
	      } else {
	        callback.call(binding, routeArray);
	      }
	    }
	  }
	}

	function map (callback, addRouteCallback) {
	  var matcher = new Matcher();

	  callback(generateMatch("", matcher, this.delegate));

	  eachRoute([], matcher, function (route) {
	    if (addRouteCallback) {
	      addRouteCallback(this, route);
	    } else {
	      this.add(route);
	    }
	  }, this);
	}

	var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];

	var escapeRegex = new RegExp('(\\' + specials.join('|\\') + ')', 'g');

	function isArray(test) {
	  return Object.prototype.toString.call(test) === "[object Array]";
	}

	// A Segment represents a segment in the original route description.
	// Each Segment type provides an `eachChar` and `regex` method.
	//
	// The `eachChar` method invokes the callback with one or more character
	// specifications. A character specification consumes one or more input
	// characters.
	//
	// The `regex` method returns a regex fragment for the segment. If the
	// segment is a dynamic of star segment, the regex fragment also includes
	// a capture.
	//
	// A character specification contains:
	//
	// * `validChars`: a String with a list of all valid characters, or
	// * `invalidChars`: a String with a list of all invalid characters
	// * `repeat`: true if the character specification can repeat

	function StaticSegment(string) {
	  this.string = string;
	}
	StaticSegment.prototype = {
	  eachChar: function eachChar(callback) {
	    var string = this.string,
	        ch;

	    for (var i = 0, l = string.length; i < l; i++) {
	      ch = string.charAt(i);
	      callback({ validChars: ch });
	    }
	  },

	  regex: function regex() {
	    return this.string.replace(escapeRegex, '\\$1');
	  },

	  generate: function generate() {
	    return this.string;
	  }
	};

	function DynamicSegment(name) {
	  this.name = name;
	}
	DynamicSegment.prototype = {
	  eachChar: function eachChar(callback) {
	    callback({ invalidChars: "/", repeat: true });
	  },

	  regex: function regex() {
	    return "([^/]+)";
	  },

	  generate: function generate(params) {
	    return params[this.name];
	  }
	};

	function StarSegment(name) {
	  this.name = name;
	}
	StarSegment.prototype = {
	  eachChar: function eachChar(callback) {
	    callback({ invalidChars: "", repeat: true });
	  },

	  regex: function regex() {
	    return "(.+)";
	  },

	  generate: function generate(params) {
	    return params[this.name];
	  }
	};

	function EpsilonSegment() {}
	EpsilonSegment.prototype = {
	  eachChar: function eachChar() {},
	  regex: function regex() {
	    return "";
	  },
	  generate: function generate() {
	    return "";
	  }
	};

	function parse(route, names, specificity) {
	  // normalize route as not starting with a "/". Recognition will
	  // also normalize.
	  if (route.charAt(0) === "/") {
	    route = route.substr(1);
	  }

	  var segments = route.split("/"),
	      results = [];

	  // A routes has specificity determined by the order that its different segments
	  // appear in. This system mirrors how the magnitude of numbers written as strings
	  // works.
	  // Consider a number written as: "abc". An example would be "200". Any other number written
	  // "xyz" will be smaller than "abc" so long as `a > z`. For instance, "199" is smaller
	  // then "200", even though "y" and "z" (which are both 9) are larger than "0" (the value
	  // of (`b` and `c`). This is because the leading symbol, "2", is larger than the other
	  // leading symbol, "1".
	  // The rule is that symbols to the left carry more weight than symbols to the right
	  // when a number is written out as a string. In the above strings, the leading digit
	  // represents how many 100's are in the number, and it carries more weight than the middle
	  // number which represents how many 10's are in the number.
	  // This system of number magnitude works well for route specificity, too. A route written as
	  // `a/b/c` will be more specific than `x/y/z` as long as `a` is more specific than
	  // `x`, irrespective of the other parts.
	  // Because of this similarity, we assign each type of segment a number value written as a
	  // string. We can find the specificity of compound routes by concatenating these strings
	  // together, from left to right. After we have looped through all of the segments,
	  // we convert the string to a number.
	  specificity.val = '';

	  for (var i = 0, l = segments.length; i < l; i++) {
	    var segment = segments[i],
	        match;

	    if (match = segment.match(/^:([^\/]+)$/)) {
	      results.push(new DynamicSegment(match[1]));
	      names.push(match[1]);
	      specificity.val += '3';
	    } else if (match = segment.match(/^\*([^\/]+)$/)) {
	      results.push(new StarSegment(match[1]));
	      specificity.val += '2';
	      names.push(match[1]);
	    } else if (segment === "") {
	      results.push(new EpsilonSegment());
	      specificity.val += '1';
	    } else {
	      results.push(new StaticSegment(segment));
	      specificity.val += '4';
	    }
	  }

	  specificity.val = +specificity.val;

	  return results;
	}

	// A State has a character specification and (`charSpec`) and a list of possible
	// subsequent states (`nextStates`).
	//
	// If a State is an accepting state, it will also have several additional
	// properties:
	//
	// * `regex`: A regular expression that is used to extract parameters from paths
	//   that reached this accepting state.
	// * `handlers`: Information on how to convert the list of captures into calls
	//   to registered handlers with the specified parameters
	// * `types`: How many static, dynamic or star segments in this route. Used to
	//   decide which route to use if multiple registered routes match a path.
	//
	// Currently, State is implemented naively by looping over `nextStates` and
	// comparing a character specification against a character. A more efficient
	// implementation would use a hash of keys pointing at one or more next states.

	function State(charSpec) {
	  this.charSpec = charSpec;
	  this.nextStates = [];
	}

	State.prototype = {
	  get: function get(charSpec) {
	    var nextStates = this.nextStates;

	    for (var i = 0, l = nextStates.length; i < l; i++) {
	      var child = nextStates[i];

	      var isEqual = child.charSpec.validChars === charSpec.validChars;
	      isEqual = isEqual && child.charSpec.invalidChars === charSpec.invalidChars;

	      if (isEqual) {
	        return child;
	      }
	    }
	  },

	  put: function put(charSpec) {
	    var state;

	    // If the character specification already exists in a child of the current
	    // state, just return that state.
	    if (state = this.get(charSpec)) {
	      return state;
	    }

	    // Make a new state for the character spec
	    state = new State(charSpec);

	    // Insert the new state as a child of the current state
	    this.nextStates.push(state);

	    // If this character specification repeats, insert the new state as a child
	    // of itself. Note that this will not trigger an infinite loop because each
	    // transition during recognition consumes a character.
	    if (charSpec.repeat) {
	      state.nextStates.push(state);
	    }

	    // Return the new state
	    return state;
	  },

	  // Find a list of child states matching the next character
	  match: function match(ch) {
	    // DEBUG "Processing `" + ch + "`:"
	    var nextStates = this.nextStates,
	        child,
	        charSpec,
	        chars;

	    // DEBUG "  " + debugState(this)
	    var returned = [];

	    for (var i = 0, l = nextStates.length; i < l; i++) {
	      child = nextStates[i];

	      charSpec = child.charSpec;

	      if (typeof (chars = charSpec.validChars) !== 'undefined') {
	        if (chars.indexOf(ch) !== -1) {
	          returned.push(child);
	        }
	      } else if (typeof (chars = charSpec.invalidChars) !== 'undefined') {
	        if (chars.indexOf(ch) === -1) {
	          returned.push(child);
	        }
	      }
	    }

	    return returned;
	  }

	  /** IF DEBUG
	  , debug: function() {
	    var charSpec = this.charSpec,
	        debug = "[",
	        chars = charSpec.validChars || charSpec.invalidChars;
	     if (charSpec.invalidChars) { debug += "^"; }
	    debug += chars;
	    debug += "]";
	     if (charSpec.repeat) { debug += "+"; }
	     return debug;
	  }
	  END IF **/
	};

	/** IF DEBUG
	function debug(log) {
	  console.log(log);
	}

	function debugState(state) {
	  return state.nextStates.map(function(n) {
	    if (n.nextStates.length === 0) { return "( " + n.debug() + " [accepting] )"; }
	    return "( " + n.debug() + " <then> " + n.nextStates.map(function(s) { return s.debug() }).join(" or ") + " )";
	  }).join(", ")
	}
	END IF **/

	// Sort the routes by specificity
	function sortSolutions(states) {
	  return states.sort(function (a, b) {
	    return b.specificity.val - a.specificity.val;
	  });
	}

	function recognizeChar(states, ch) {
	  var nextStates = [];

	  for (var i = 0, l = states.length; i < l; i++) {
	    var state = states[i];

	    nextStates = nextStates.concat(state.match(ch));
	  }

	  return nextStates;
	}

	var oCreate = Object.create || function (proto) {
	  function F() {}
	  F.prototype = proto;
	  return new F();
	};

	function RecognizeResults(queryParams) {
	  this.queryParams = queryParams || {};
	}
	RecognizeResults.prototype = oCreate({
	  splice: Array.prototype.splice,
	  slice: Array.prototype.slice,
	  push: Array.prototype.push,
	  length: 0,
	  queryParams: null
	});

	function findHandler(state, path, queryParams) {
	  var handlers = state.handlers,
	      regex = state.regex;
	  var captures = path.match(regex),
	      currentCapture = 1;
	  var result = new RecognizeResults(queryParams);

	  for (var i = 0, l = handlers.length; i < l; i++) {
	    var handler = handlers[i],
	        names = handler.names,
	        params = {};

	    for (var j = 0, m = names.length; j < m; j++) {
	      params[names[j]] = captures[currentCapture++];
	    }

	    result.push({ handler: handler.handler, params: params, isDynamic: !!names.length });
	  }

	  return result;
	}

	function addSegment(currentState, segment) {
	  segment.eachChar(function (ch) {
	    var state;

	    currentState = currentState.put(ch);
	  });

	  return currentState;
	}

	function decodeQueryParamPart(part) {
	  // http://www.w3.org/TR/html401/interact/forms.html#h-17.13.4.1
	  part = part.replace(/\+/gm, '%20');
	  return decodeURIComponent(part);
	}

	// The main interface

	var RouteRecognizer = function RouteRecognizer() {
	  this.rootState = new State();
	  this.names = {};
	};

	RouteRecognizer.prototype = {
	  add: function add(routes, options) {
	    var currentState = this.rootState,
	        regex = "^",
	        specificity = {},
	        handlers = [],
	        allSegments = [],
	        name;

	    var isEmpty = true;

	    for (var i = 0, l = routes.length; i < l; i++) {
	      var route = routes[i],
	          names = [];

	      var segments = parse(route.path, names, specificity);

	      allSegments = allSegments.concat(segments);

	      for (var j = 0, m = segments.length; j < m; j++) {
	        var segment = segments[j];

	        if (segment instanceof EpsilonSegment) {
	          continue;
	        }

	        isEmpty = false;

	        // Add a "/" for the new segment
	        currentState = currentState.put({ validChars: "/" });
	        regex += "/";

	        // Add a representation of the segment to the NFA and regex
	        currentState = addSegment(currentState, segment);
	        regex += segment.regex();
	      }

	      var handler = { handler: route.handler, names: names };
	      handlers.push(handler);
	    }

	    if (isEmpty) {
	      currentState = currentState.put({ validChars: "/" });
	      regex += "/";
	    }

	    currentState.handlers = handlers;
	    currentState.regex = new RegExp(regex + "$");
	    currentState.specificity = specificity;

	    if (name = options && options.as) {
	      this.names[name] = {
	        segments: allSegments,
	        handlers: handlers
	      };
	    }
	  },

	  handlersFor: function handlersFor(name) {
	    var route = this.names[name],
	        result = [];
	    if (!route) {
	      throw new Error("There is no route named " + name);
	    }

	    for (var i = 0, l = route.handlers.length; i < l; i++) {
	      result.push(route.handlers[i]);
	    }

	    return result;
	  },

	  hasRoute: function hasRoute(name) {
	    return !!this.names[name];
	  },

	  generate: function generate(name, params) {
	    var route = this.names[name],
	        output = "";
	    if (!route) {
	      throw new Error("There is no route named " + name);
	    }

	    var segments = route.segments;

	    for (var i = 0, l = segments.length; i < l; i++) {
	      var segment = segments[i];

	      if (segment instanceof EpsilonSegment) {
	        continue;
	      }

	      output += "/";
	      output += segment.generate(params);
	    }

	    if (output.charAt(0) !== '/') {
	      output = '/' + output;
	    }

	    if (params && params.queryParams) {
	      output += this.generateQueryString(params.queryParams);
	    }

	    return output;
	  },

	  generateQueryString: function generateQueryString(params) {
	    var pairs = [];
	    var keys = [];
	    for (var key in params) {
	      if (params.hasOwnProperty(key)) {
	        keys.push(key);
	      }
	    }
	    keys.sort();
	    for (var i = 0, len = keys.length; i < len; i++) {
	      key = keys[i];
	      var value = params[key];
	      if (value == null) {
	        continue;
	      }
	      var pair = encodeURIComponent(key);
	      if (isArray(value)) {
	        for (var j = 0, l = value.length; j < l; j++) {
	          var arrayPair = key + '[]' + '=' + encodeURIComponent(value[j]);
	          pairs.push(arrayPair);
	        }
	      } else {
	        pair += "=" + encodeURIComponent(value);
	        pairs.push(pair);
	      }
	    }

	    if (pairs.length === 0) {
	      return '';
	    }

	    return "?" + pairs.join("&");
	  },

	  parseQueryString: function parseQueryString(queryString) {
	    var pairs = queryString.split("&"),
	        queryParams = {};
	    for (var i = 0; i < pairs.length; i++) {
	      var pair = pairs[i].split('='),
	          key = decodeQueryParamPart(pair[0]),
	          keyLength = key.length,
	          isArray = false,
	          value;
	      if (pair.length === 1) {
	        value = 'true';
	      } else {
	        //Handle arrays
	        if (keyLength > 2 && key.slice(keyLength - 2) === '[]') {
	          isArray = true;
	          key = key.slice(0, keyLength - 2);
	          if (!queryParams[key]) {
	            queryParams[key] = [];
	          }
	        }
	        value = pair[1] ? decodeQueryParamPart(pair[1]) : '';
	      }
	      if (isArray) {
	        queryParams[key].push(value);
	      } else {
	        queryParams[key] = value;
	      }
	    }
	    return queryParams;
	  },

	  recognize: function recognize(path) {
	    var states = [this.rootState],
	        pathLen,
	        i,
	        l,
	        queryStart,
	        queryParams = {},
	        isSlashDropped = false;

	    queryStart = path.indexOf('?');
	    if (queryStart !== -1) {
	      var queryString = path.substr(queryStart + 1, path.length);
	      path = path.substr(0, queryStart);
	      queryParams = this.parseQueryString(queryString);
	    }

	    path = decodeURI(path);

	    // DEBUG GROUP path

	    if (path.charAt(0) !== "/") {
	      path = "/" + path;
	    }

	    pathLen = path.length;
	    if (pathLen > 1 && path.charAt(pathLen - 1) === "/") {
	      path = path.substr(0, pathLen - 1);
	      isSlashDropped = true;
	    }

	    for (i = 0, l = path.length; i < l; i++) {
	      states = recognizeChar(states, path.charAt(i));
	      if (!states.length) {
	        break;
	      }
	    }

	    // END DEBUG GROUP

	    var solutions = [];
	    for (i = 0, l = states.length; i < l; i++) {
	      if (states[i].handlers) {
	        solutions.push(states[i]);
	      }
	    }

	    states = sortSolutions(solutions);

	    var state = solutions[0];

	    if (state && state.handlers) {
	      // if a trailing slash was dropped and a star segment is the last segment
	      // specified, put the trailing slash back
	      if (isSlashDropped && state.regex.source.slice(-5) === "(.+)$") {
	        path = path + "/";
	      }
	      return findHandler(state, path, queryParams);
	    }
	  }
	};

	RouteRecognizer.prototype.map = map;

	RouteRecognizer.VERSION = '0.1.9';

	var genQuery = RouteRecognizer.prototype.generateQueryString;

	// export default for holding the Vue reference
	var exports$1 = {};
	/**
	 * Warn stuff.
	 *
	 * @param {String} msg
	 */

	function warn(msg) {
	  /* istanbul ignore next */
	  if (window.console) {
	    console.warn('[vue-router] ' + msg);
	    /* istanbul ignore if */
	    if (!exports$1.Vue || exports$1.Vue.config.debug) {
	      console.warn(new Error('warning stack trace:').stack);
	    }
	  }
	}

	/**
	 * Resolve a relative path.
	 *
	 * @param {String} base
	 * @param {String} relative
	 * @param {Boolean} append
	 * @return {String}
	 */

	function resolvePath(base, relative, append) {
	  var query = base.match(/(\?.*)$/);
	  if (query) {
	    query = query[1];
	    base = base.slice(0, -query.length);
	  }
	  // a query!
	  if (relative.charAt(0) === '?') {
	    return base + relative;
	  }
	  var stack = base.split('/');
	  // remove trailing segment if:
	  // - not appending
	  // - appending to trailing slash (last segment is empty)
	  if (!append || !stack[stack.length - 1]) {
	    stack.pop();
	  }
	  // resolve relative path
	  var segments = relative.replace(/^\//, '').split('/');
	  for (var i = 0; i < segments.length; i++) {
	    var segment = segments[i];
	    if (segment === '.') {
	      continue;
	    } else if (segment === '..') {
	      stack.pop();
	    } else {
	      stack.push(segment);
	    }
	  }
	  // ensure leading slash
	  if (stack[0] !== '') {
	    stack.unshift('');
	  }
	  return stack.join('/');
	}

	/**
	 * Forgiving check for a promise
	 *
	 * @param {Object} p
	 * @return {Boolean}
	 */

	function isPromise(p) {
	  return p && typeof p.then === 'function';
	}

	/**
	 * Retrive a route config field from a component instance
	 * OR a component contructor.
	 *
	 * @param {Function|Vue} component
	 * @param {String} name
	 * @return {*}
	 */

	function getRouteConfig(component, name) {
	  var options = component && (component.$options || component.options);
	  return options && options.route && options.route[name];
	}

	/**
	 * Resolve an async component factory. Have to do a dirty
	 * mock here because of Vue core's internal API depends on
	 * an ID check.
	 *
	 * @param {Object} handler
	 * @param {Function} cb
	 */

	var resolver = undefined;

	function resolveAsyncComponent(handler, cb) {
	  if (!resolver) {
	    resolver = {
	      resolve: exports$1.Vue.prototype._resolveComponent,
	      $options: {
	        components: {
	          _: handler.component
	        }
	      }
	    };
	  } else {
	    resolver.$options.components._ = handler.component;
	  }
	  resolver.resolve('_', function (Component) {
	    handler.component = Component;
	    cb(Component);
	  });
	}

	/**
	 * Map the dynamic segments in a path to params.
	 *
	 * @param {String} path
	 * @param {Object} params
	 * @param {Object} query
	 */

	function mapParams(path, params, query) {
	  if (params === undefined) params = {};

	  path = path.replace(/:([^\/]+)/g, function (_, key) {
	    var val = params[key];
	    if (!val) {
	      warn('param "' + key + '" not found when generating ' + 'path for "' + path + '" with params ' + JSON.stringify(params));
	    }
	    return val || '';
	  });
	  if (query) {
	    path += genQuery(query);
	  }
	  return path;
	}

	var hashRE = /#.*$/;

	var HTML5History = (function () {
	  function HTML5History(_ref) {
	    var root = _ref.root;
	    var onChange = _ref.onChange;
	    babelHelpers.classCallCheck(this, HTML5History);

	    if (root) {
	      // make sure there's the starting slash
	      if (root.charAt(0) !== '/') {
	        root = '/' + root;
	      }
	      // remove trailing slash
	      this.root = root.replace(/\/$/, '');
	      this.rootRE = new RegExp('^\\' + this.root);
	    } else {
	      this.root = null;
	    }
	    this.onChange = onChange;
	    // check base tag
	    var baseEl = document.querySelector('base');
	    this.base = baseEl && baseEl.getAttribute('href');
	  }

	  HTML5History.prototype.start = function start() {
	    var _this = this;

	    this.listener = function (e) {
	      var url = decodeURI(location.pathname + location.search);
	      if (_this.root) {
	        url = url.replace(_this.rootRE, '');
	      }
	      _this.onChange(url, e && e.state, location.hash);
	    };
	    window.addEventListener('popstate', this.listener);
	    this.listener();
	  };

	  HTML5History.prototype.stop = function stop() {
	    window.removeEventListener('popstate', this.listener);
	  };

	  HTML5History.prototype.go = function go(path, replace, append) {
	    var url = this.formatPath(path, append);
	    if (replace) {
	      history.replaceState({}, '', url);
	    } else {
	      // record scroll position by replacing current state
	      history.replaceState({
	        pos: {
	          x: window.pageXOffset,
	          y: window.pageYOffset
	        }
	      }, '');
	      // then push new state
	      history.pushState({}, '', url);
	    }
	    var hashMatch = path.match(hashRE);
	    var hash = hashMatch && hashMatch[0];
	    path = url
	    // strip hash so it doesn't mess up params
	    .replace(hashRE, '')
	    // remove root before matching
	    .replace(this.rootRE, '');
	    this.onChange(path, null, hash);
	  };

	  HTML5History.prototype.formatPath = function formatPath(path, append) {
	    return path.charAt(0) === '/'
	    // absolute path
	    ? this.root ? this.root + '/' + path.replace(/^\//, '') : path : resolvePath(this.base || location.pathname, path, append);
	  };

	  return HTML5History;
	})();

	var HashHistory = (function () {
	  function HashHistory(_ref) {
	    var hashbang = _ref.hashbang;
	    var onChange = _ref.onChange;
	    babelHelpers.classCallCheck(this, HashHistory);

	    this.hashbang = hashbang;
	    this.onChange = onChange;
	  }

	  HashHistory.prototype.start = function start() {
	    var self = this;
	    this.listener = function () {
	      var path = location.hash;
	      var raw = path.replace(/^#!?/, '');
	      // always
	      if (raw.charAt(0) !== '/') {
	        raw = '/' + raw;
	      }
	      var formattedPath = self.formatPath(raw);
	      if (formattedPath !== path) {
	        location.replace(formattedPath);
	        return;
	      }
	      var pathToMatch = decodeURI(path.replace(/^#!?/, '') + location.search);
	      self.onChange(pathToMatch);
	    };
	    window.addEventListener('hashchange', this.listener);
	    this.listener();
	  };

	  HashHistory.prototype.stop = function stop() {
	    window.removeEventListener('hashchange', this.listener);
	  };

	  HashHistory.prototype.go = function go(path, replace, append) {
	    path = this.formatPath(path, append);
	    if (replace) {
	      location.replace(path);
	    } else {
	      location.hash = path;
	    }
	  };

	  HashHistory.prototype.formatPath = function formatPath(path, append) {
	    var isAbsoloute = path.charAt(0) === '/';
	    var prefix = '#' + (this.hashbang ? '!' : '');
	    return isAbsoloute ? prefix + path : prefix + resolvePath(location.hash.replace(/^#!?/, ''), path, append);
	  };

	  return HashHistory;
	})();

	var AbstractHistory = (function () {
	  function AbstractHistory(_ref) {
	    var onChange = _ref.onChange;
	    babelHelpers.classCallCheck(this, AbstractHistory);

	    this.onChange = onChange;
	    this.currentPath = '/';
	  }

	  AbstractHistory.prototype.start = function start() {
	    this.onChange('/');
	  };

	  AbstractHistory.prototype.stop = function stop() {
	    // noop
	  };

	  AbstractHistory.prototype.go = function go(path, replace, append) {
	    path = this.currentPath = this.formatPath(path, append);
	    this.onChange(path);
	  };

	  AbstractHistory.prototype.formatPath = function formatPath(path, append) {
	    return path.charAt(0) === '/' ? path : resolvePath(this.currentPath, path, append);
	  };

	  return AbstractHistory;
	})();

	/**
	 * Determine the reusability of an existing router view.
	 *
	 * @param {Directive} view
	 * @param {Object} handler
	 * @param {Transition} transition
	 */

	function canReuse(view, handler, transition) {
	  var component = view.childVM;
	  if (!component || !handler) {
	    return false;
	  }
	  // important: check view.Component here because it may
	  // have been changed in activate hook
	  if (view.Component !== handler.component) {
	    return false;
	  }
	  var canReuseFn = getRouteConfig(component, 'canReuse');
	  return typeof canReuseFn === 'boolean' ? canReuseFn : canReuseFn ? canReuseFn.call(component, {
	    to: transition.to,
	    from: transition.from
	  }) : true; // defaults to true
	}

	/**
	 * Check if a component can deactivate.
	 *
	 * @param {Directive} view
	 * @param {Transition} transition
	 * @param {Function} next
	 */

	function canDeactivate(view, transition, next) {
	  var fromComponent = view.childVM;
	  var hook = getRouteConfig(fromComponent, 'canDeactivate');
	  if (!hook) {
	    next();
	  } else {
	    transition.callHook(hook, fromComponent, next, {
	      expectBoolean: true
	    });
	  }
	}

	/**
	 * Check if a component can activate.
	 *
	 * @param {Object} handler
	 * @param {Transition} transition
	 * @param {Function} next
	 */

	function canActivate(handler, transition, next) {
	  resolveAsyncComponent(handler, function (Component) {
	    // have to check due to async-ness
	    if (transition.aborted) {
	      return;
	    }
	    // determine if this component can be activated
	    var hook = getRouteConfig(Component, 'canActivate');
	    if (!hook) {
	      next();
	    } else {
	      transition.callHook(hook, null, next, {
	        expectBoolean: true
	      });
	    }
	  });
	}

	/**
	 * Call deactivate hooks for existing router-views.
	 *
	 * @param {Directive} view
	 * @param {Transition} transition
	 * @param {Function} next
	 */

	function deactivate(view, transition, next) {
	  var component = view.childVM;
	  var hook = getRouteConfig(component, 'deactivate');
	  if (!hook) {
	    next();
	  } else {
	    transition.callHooks(hook, component, next);
	  }
	}

	/**
	 * Activate / switch component for a router-view.
	 *
	 * @param {Directive} view
	 * @param {Transition} transition
	 * @param {Number} depth
	 * @param {Function} [cb]
	 */

	function activate(view, transition, depth, cb, reuse) {
	  var handler = transition.activateQueue[depth];
	  if (!handler) {
	    // fix 1.0.0-alpha.3 compat
	    if (view._bound) {
	      view.setComponent(null);
	    }
	    cb && cb();
	    return;
	  }

	  var Component = view.Component = handler.component;
	  var activateHook = getRouteConfig(Component, 'activate');
	  var dataHook = getRouteConfig(Component, 'data');
	  var waitForData = getRouteConfig(Component, 'waitForData');

	  view.depth = depth;
	  view.activated = false;

	  var component = undefined;
	  var loading = !!(dataHook && !waitForData);

	  // "reuse" is a flag passed down when the parent view is
	  // either reused via keep-alive or as a child of a kept-alive view.
	  // of course we can only reuse if the current kept-alive instance
	  // is of the correct type.
	  reuse = reuse && view.childVM && view.childVM.constructor === Component;

	  if (reuse) {
	    // just reuse
	    component = view.childVM;
	    component.$loadingRouteData = loading;
	  } else {
	    // unbuild current component. this step also destroys
	    // and removes all nested child views.
	    view.unbuild(true);
	    // handle keep-alive.
	    // if the view has keep-alive, the child vm is not actually
	    // destroyed - its nested views will still be in router's
	    // view list. We need to removed these child views and
	    // cache them on the child vm.
	    if (view.keepAlive) {
	      var views = transition.router._views;
	      var i = views.indexOf(view);
	      if (i > 0) {
	        transition.router._views = views.slice(i);
	        if (view.childVM) {
	          view.childVM._routerViews = views.slice(0, i);
	        }
	      }
	    }

	    // build the new component. this will also create the
	    // direct child view of the current one. it will register
	    // itself as view.childView.
	    component = view.build({
	      _meta: {
	        $loadingRouteData: loading
	      }
	    });
	    // handle keep-alive.
	    // when a kept-alive child vm is restored, we need to
	    // add its cached child views into the router's view list,
	    // and also properly update current view's child view.
	    if (view.keepAlive) {
	      component.$loadingRouteData = loading;
	      var cachedViews = component._routerViews;
	      if (cachedViews) {
	        transition.router._views = cachedViews.concat(transition.router._views);
	        view.childView = cachedViews[cachedViews.length - 1];
	        component._routerViews = null;
	      }
	    }
	  }

	  // cleanup the component in case the transition is aborted
	  // before the component is ever inserted.
	  var cleanup = function cleanup() {
	    component.$destroy();
	  };

	  // actually insert the component and trigger transition
	  var insert = function insert() {
	    if (reuse) {
	      cb && cb();
	      return;
	    }
	    var router = transition.router;
	    if (router._rendered || router._transitionOnLoad) {
	      view.transition(component);
	    } else {
	      // no transition on first render, manual transition
	      /* istanbul ignore if */
	      if (view.setCurrent) {
	        // 0.12 compat
	        view.setCurrent(component);
	      } else {
	        // 1.0
	        view.childVM = component;
	      }
	      component.$before(view.anchor, null, false);
	    }
	    cb && cb();
	  };

	  // called after activation hook is resolved
	  var afterActivate = function afterActivate() {
	    view.activated = true;
	    // activate the child view
	    if (view.childView) {
	      activate(view.childView, transition, depth + 1, null, reuse || view.keepAlive);
	    }
	    if (dataHook && waitForData) {
	      // wait until data loaded to insert
	      loadData(component, transition, dataHook, insert, cleanup);
	    } else {
	      // load data and insert at the same time
	      if (dataHook) {
	        loadData(component, transition, dataHook);
	      }
	      insert();
	    }
	  };

	  if (activateHook) {
	    transition.callHooks(activateHook, component, afterActivate, {
	      cleanup: cleanup
	    });
	  } else {
	    afterActivate();
	  }
	}

	/**
	 * Reuse a view, just reload data if necessary.
	 *
	 * @param {Directive} view
	 * @param {Transition} transition
	 */

	function reuse(view, transition) {
	  var component = view.childVM;
	  var dataHook = getRouteConfig(component, 'data');
	  if (dataHook) {
	    loadData(component, transition, dataHook);
	  }
	}

	/**
	 * Asynchronously load and apply data to component.
	 *
	 * @param {Vue} component
	 * @param {Transition} transition
	 * @param {Function} hook
	 * @param {Function} cb
	 * @param {Function} cleanup
	 */

	function loadData(component, transition, hook, cb, cleanup) {
	  component.$loadingRouteData = true;
	  transition.callHooks(hook, component, function (data, onError) {
	    // merge data from multiple data hooks
	    if (Array.isArray(data) && data._needMerge) {
	      data = data.reduce(function (res, obj) {
	        if (isPlainObject(obj)) {
	          Object.keys(obj).forEach(function (key) {
	            res[key] = obj[key];
	          });
	        }
	        return res;
	      }, Object.create(null));
	    }
	    // handle promise sugar syntax
	    var promises = [];
	    if (isPlainObject(data)) {
	      Object.keys(data).forEach(function (key) {
	        var val = data[key];
	        if (isPromise(val)) {
	          promises.push(val.then(function (resolvedVal) {
	            component.$set(key, resolvedVal);
	          }));
	        } else {
	          component.$set(key, val);
	        }
	      });
	    }
	    if (!promises.length) {
	      component.$loadingRouteData = false;
	      cb && cb();
	    } else {
	      promises[0].constructor.all(promises).then(function (_) {
	        component.$loadingRouteData = false;
	        cb && cb();
	      }, onError);
	    }
	  }, {
	    cleanup: cleanup,
	    expectData: true
	  });
	}

	function isPlainObject(obj) {
	  return Object.prototype.toString.call(obj) === '[object Object]';
	}

	/**
	 * A RouteTransition object manages the pipeline of a
	 * router-view switching process. This is also the object
	 * passed into user route hooks.
	 *
	 * @param {Router} router
	 * @param {Route} to
	 * @param {Route} from
	 */

	var RouteTransition = (function () {
	  function RouteTransition(router, to, from) {
	    babelHelpers.classCallCheck(this, RouteTransition);

	    this.router = router;
	    this.to = to;
	    this.from = from;
	    this.next = null;
	    this.aborted = false;
	    this.done = false;

	    // start by determine the queues

	    // the deactivate queue is an array of router-view
	    // directive instances that need to be deactivated,
	    // deepest first.
	    this.deactivateQueue = router._views;

	    // check the default handler of the deepest match
	    var matched = to.matched ? Array.prototype.slice.call(to.matched) : [];

	    // the activate queue is an array of route handlers
	    // that need to be activated
	    this.activateQueue = matched.map(function (match) {
	      return match.handler;
	    });
	  }

	  /**
	   * Abort current transition and return to previous location.
	   */

	  RouteTransition.prototype.abort = function abort() {
	    if (!this.aborted) {
	      this.aborted = true;
	      // if the root path throws an error during validation
	      // on initial load, it gets caught in an infinite loop.
	      var abortingOnLoad = !this.from.path && this.to.path === '/';
	      if (!abortingOnLoad) {
	        this.router.replace(this.from.path || '/');
	      }
	    }
	  };

	  /**
	   * Abort current transition and redirect to a new location.
	   *
	   * @param {String} path
	   */

	  RouteTransition.prototype.redirect = function redirect(path) {
	    if (!this.aborted) {
	      this.aborted = true;
	      if (typeof path === 'string') {
	        path = mapParams(path, this.to.params, this.to.query);
	      } else {
	        path.params = this.to.params;
	        path.query = this.to.query;
	      }
	      this.router.replace(path);
	    }
	  };

	  /**
	   * A router view transition's pipeline can be described as
	   * follows, assuming we are transitioning from an existing
	   * <router-view> chain [Component A, Component B] to a new
	   * chain [Component A, Component C]:
	   *
	   *  A    A
	   *  | => |
	   *  B    C
	   *
	   * 1. Reusablity phase:
	   *   -> canReuse(A, A)
	   *   -> canReuse(B, C)
	   *   -> determine new queues:
	   *      - deactivation: [B]
	   *      - activation: [C]
	   *
	   * 2. Validation phase:
	   *   -> canDeactivate(B)
	   *   -> canActivate(C)
	   *
	   * 3. Activation phase:
	   *   -> deactivate(B)
	   *   -> activate(C)
	   *
	   * Each of these steps can be asynchronous, and any
	   * step can potentially abort the transition.
	   *
	   * @param {Function} cb
	   */

	  RouteTransition.prototype.start = function start(cb) {
	    var transition = this;
	    var daq = this.deactivateQueue;
	    var aq = this.activateQueue;
	    var rdaq = daq.slice().reverse();
	    var reuseQueue = undefined;

	    // 1. Reusability phase
	    var i = undefined;
	    for (i = 0; i < rdaq.length; i++) {
	      if (!canReuse(rdaq[i], aq[i], transition)) {
	        break;
	      }
	    }
	    if (i > 0) {
	      reuseQueue = rdaq.slice(0, i);
	      daq = rdaq.slice(i).reverse();
	      aq = aq.slice(i);
	    }

	    // 2. Validation phase
	    transition.runQueue(daq, canDeactivate, function () {
	      transition.runQueue(aq, canActivate, function () {
	        transition.runQueue(daq, deactivate, function () {
	          // 3. Activation phase

	          // Update router current route
	          transition.router._onTransitionValidated(transition);

	          // trigger reuse for all reused views
	          reuseQueue && reuseQueue.forEach(function (view) {
	            reuse(view, transition);
	          });

	          // the root of the chain that needs to be replaced
	          // is the top-most non-reusable view.
	          if (daq.length) {
	            var view = daq[daq.length - 1];
	            var depth = reuseQueue ? reuseQueue.length : 0;
	            activate(view, transition, depth, cb);
	          } else {
	            cb();
	          }
	        });
	      });
	    });
	  };

	  /**
	   * Asynchronously and sequentially apply a function to a
	   * queue.
	   *
	   * @param {Array} queue
	   * @param {Function} fn
	   * @param {Function} cb
	   */

	  RouteTransition.prototype.runQueue = function runQueue(queue, fn, cb) {
	    var transition = this;
	    step(0);
	    function step(index) {
	      if (index >= queue.length) {
	        cb();
	      } else {
	        fn(queue[index], transition, function () {
	          step(index + 1);
	        });
	      }
	    }
	  };

	  /**
	   * Call a user provided route transition hook and handle
	   * the response (e.g. if the user returns a promise).
	   *
	   * If the user neither expects an argument nor returns a
	   * promise, the hook is assumed to be synchronous.
	   *
	   * @param {Function} hook
	   * @param {*} [context]
	   * @param {Function} [cb]
	   * @param {Object} [options]
	   *                 - {Boolean} expectBoolean
	   *                 - {Boolean} expectData
	   *                 - {Function} cleanup
	   */

	  RouteTransition.prototype.callHook = function callHook(hook, context, cb) {
	    var _ref = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	    var _ref$expectBoolean = _ref.expectBoolean;
	    var expectBoolean = _ref$expectBoolean === undefined ? false : _ref$expectBoolean;
	    var _ref$expectData = _ref.expectData;
	    var expectData = _ref$expectData === undefined ? false : _ref$expectData;
	    var cleanup = _ref.cleanup;

	    var transition = this;
	    var nextCalled = false;

	    // abort the transition
	    var abort = function abort() {
	      cleanup && cleanup();
	      transition.abort();
	    };

	    // handle errors
	    var onError = function onError(err) {
	      // cleanup indicates an after-activation hook,
	      // so instead of aborting we just let the transition
	      // finish.
	      cleanup ? next() : abort();
	      if (err && !transition.router._suppress) {
	        warn('Uncaught error during transition: ');
	        throw err instanceof Error ? err : new Error(err);
	      }
	    };

	    // advance the transition to the next step
	    var next = function next(data) {
	      if (nextCalled) {
	        warn('transition.next() should be called only once.');
	        return;
	      }
	      nextCalled = true;
	      if (transition.aborted) {
	        cleanup && cleanup();
	        return;
	      }
	      cb && cb(data, onError);
	    };

	    // expose a clone of the transition object, so that each
	    // hook gets a clean copy and prevent the user from
	    // messing with the internals.
	    var exposed = {
	      to: transition.to,
	      from: transition.from,
	      abort: abort,
	      next: next,
	      redirect: function redirect() {
	        transition.redirect.apply(transition, arguments);
	      }
	    };

	    // actually call the hook
	    var res = undefined;
	    try {
	      res = hook.call(context, exposed);
	    } catch (err) {
	      return onError(err);
	    }

	    // handle boolean/promise return values
	    var resIsPromise = isPromise(res);
	    if (expectBoolean) {
	      if (typeof res === 'boolean') {
	        res ? next() : abort();
	      } else if (resIsPromise) {
	        res.then(function (ok) {
	          ok ? next() : abort();
	        }, onError);
	      } else if (!hook.length) {
	        next(res);
	      }
	    } else if (resIsPromise) {
	      res.then(next, onError);
	    } else if (expectData && isPlainOjbect(res) || !hook.length) {
	      next(res);
	    }
	  };

	  /**
	   * Call a single hook or an array of async hooks in series.
	   *
	   * @param {Array} hooks
	   * @param {*} context
	   * @param {Function} cb
	   * @param {Object} [options]
	   */

	  RouteTransition.prototype.callHooks = function callHooks(hooks, context, cb, options) {
	    var _this = this;

	    if (Array.isArray(hooks)) {
	      (function () {
	        var res = [];
	        res._needMerge = true;
	        var onError = undefined;
	        _this.runQueue(hooks, function (hook, _, next) {
	          if (!_this.aborted) {
	            _this.callHook(hook, context, function (r, onError) {
	              if (r) res.push(r);
	              onError = onError;
	              next();
	            }, options);
	          }
	        }, function () {
	          cb(res, onError);
	        });
	      })();
	    } else {
	      this.callHook(hooks, context, cb, options);
	    }
	  };

	  return RouteTransition;
	})();

	function isPlainOjbect(val) {
	  return Object.prototype.toString.call(val) === '[object Object]';
	}

	var internalKeysRE = /^(component|subRoutes)$/;

	/**
	 * Route Context Object
	 *
	 * @param {String} path
	 * @param {Router} router
	 */

	var Route = function Route(path, router) {
	  var _this = this;

	  babelHelpers.classCallCheck(this, Route);

	  var matched = router._recognizer.recognize(path);
	  if (matched) {
	    // copy all custom fields from route configs
	    [].forEach.call(matched, function (match) {
	      for (var key in match.handler) {
	        if (!internalKeysRE.test(key)) {
	          _this[key] = match.handler[key];
	        }
	      }
	    });
	    // set query and params
	    this.query = matched.queryParams;
	    this.params = [].reduce.call(matched, function (prev, cur) {
	      if (cur.params) {
	        for (var key in cur.params) {
	          prev[key] = cur.params[key];
	        }
	      }
	      return prev;
	    }, {});
	  }
	  // expose path and router
	  this.path = path;
	  this.router = router;
	  // for internal use
	  this.matched = matched || router._notFoundHandler;
	  // Important: freeze self to prevent observation
	  Object.freeze(this);
	};

	function applyOverride (Vue) {

	  var _ = Vue.util;

	  // override Vue's init and destroy process to keep track of router instances
	  var init = Vue.prototype._init;
	  Vue.prototype._init = function (options) {
	    var root = options._parent || options.parent || this;
	    var route = root.$route;
	    if (route) {
	      route.router._children.push(this);
	      if (!this.$route) {
	        /* istanbul ignore if */
	        if (this._defineMeta) {
	          // 0.12
	          this._defineMeta('$route', route);
	        } else {
	          // 1.0
	          _.defineReactive(this, '$route', route);
	        }
	      }
	    }
	    init.call(this, options);
	  };

	  var destroy = Vue.prototype._destroy;
	  Vue.prototype._destroy = function () {
	    if (!this._isBeingDestroyed) {
	      var route = this.$root.$route;
	      if (route) {
	        route.router._children.$remove(this);
	      }
	      destroy.apply(this, arguments);
	    }
	  };

	  // 1.0 only: enable route mixins
	  var strats = Vue.config.optionMergeStrategies;
	  var hooksToMergeRE = /^(data|activate|deactivate)$/;

	  if (strats) {
	    strats.route = function (parentVal, childVal) {
	      if (!childVal) return parentVal;
	      if (!parentVal) return childVal;
	      var ret = {};
	      _.extend(ret, parentVal);
	      for (var key in childVal) {
	        var a = ret[key];
	        var b = childVal[key];
	        // for data, activate and deactivate, we need to merge them into
	        // arrays similar to lifecycle hooks.
	        if (a && hooksToMergeRE.test(key)) {
	          ret[key] = (_.isArray(a) ? a : [a]).concat(b);
	        } else {
	          ret[key] = b;
	        }
	      }
	      return ret;
	    };
	  }
	}

	function View (Vue) {

	  var _ = Vue.util;
	  var componentDef =
	  // 0.12
	  Vue.directive('_component') ||
	  // 1.0
	  Vue.internalDirectives.component;
	  // <router-view> extends the internal component directive
	  var viewDef = _.extend({}, componentDef);

	  // with some overrides
	  _.extend(viewDef, {

	    _isRouterView: true,

	    bind: function bind() {
	      var route = this.vm.$route;
	      /* istanbul ignore if */
	      if (!route) {
	        warn('<router-view> can only be used inside a ' + 'router-enabled app.');
	        return;
	      }
	      // force dynamic directive so v-component doesn't
	      // attempt to build right now
	      this._isDynamicLiteral = true;
	      // finally, init by delegating to v-component
	      componentDef.bind.call(this);

	      // all we need to do here is registering this view
	      // in the router. actual component switching will be
	      // managed by the pipeline.
	      var router = this.router = route.router;
	      router._views.unshift(this);

	      // note the views are in reverse order.
	      var parentView = router._views[1];
	      if (parentView) {
	        // register self as a child of the parent view,
	        // instead of activating now. This is so that the
	        // child's activate hook is called after the
	        // parent's has resolved.
	        parentView.childView = this;
	      }

	      // handle late-rendered view
	      // two possibilities:
	      // 1. root view rendered after transition has been
	      //    validated;
	      // 2. child view rendered after parent view has been
	      //    activated.
	      var transition = route.router._currentTransition;
	      if (!parentView && transition.done || parentView && parentView.activated) {
	        var depth = parentView ? parentView.depth + 1 : 0;
	        activate(this, transition, depth);
	      }
	    },

	    unbind: function unbind() {
	      this.router._views.$remove(this);
	      componentDef.unbind.call(this);
	    }
	  });

	  Vue.elementDirective('router-view', viewDef);
	}

	var trailingSlashRE = /\/$/;
	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

	// install v-link, which provides navigation support for
	// HTML5 history mode
	function Link (Vue) {

	  var _ = Vue.util;

	  Vue.directive('link', {

	    bind: function bind() {
	      var _this = this;

	      var vm = this.vm;
	      /* istanbul ignore if */
	      if (!vm.$route) {
	        warn('v-link can only be used inside a ' + 'router-enabled app.');
	        return;
	      }
	      var router = vm.$route.router;
	      this.handler = function (e) {
	        // don't redirect with control keys
	        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
	        // don't redirect when preventDefault called
	        if (e.defaultPrevented) return;
	        // don't redirect on right click
	        if (e.button !== 0) return;

	        var target = _this.target;
	        var go = function go(target) {
	          e.preventDefault();
	          if (target != null) {
	            router.go(target);
	          }
	        };

	        if (_this.el.tagName === 'A' || e.target === _this.el) {
	          // v-link on <a v-link="'path'">
	          go(target);
	        } else {
	          // v-link delegate on <div v-link>
	          var el = e.target;
	          while (el && el.tagName !== 'A' && el !== _this.el) {
	            el = el.parentNode;
	          }
	          if (!el) return;
	          if (el.tagName !== 'A' || !el.href) {
	            // allow not anchor
	            go(target);
	          } else if (sameOrigin(el)) {
	            go({
	              path: el.pathname,
	              replace: target && target.replace,
	              append: target && target.append
	            });
	          }
	        }
	      };
	      this.el.addEventListener('click', this.handler);
	      // manage active link class
	      this.unwatch = vm.$watch('$route.path', _.bind(this.updateClasses, this));
	    },

	    update: function update(path) {
	      var router = this.vm.$route.router;
	      var append = undefined;
	      this.target = path;
	      if (_.isObject(path)) {
	        append = path.append;
	        this.exact = path.exact;
	        this.prevActiveClass = this.activeClass;
	        this.activeClass = path.activeClass;
	      }
	      path = this.path = router._stringifyPath(path);
	      this.activeRE = path && !this.exact ? new RegExp('^' + path.replace(/\/$/, '').replace(regexEscapeRE, '\\$&') + '(\\/|$)') : null;
	      this.updateClasses(this.vm.$route.path);
	      var isAbsolute = path.charAt(0) === '/';
	      // do not format non-hash relative paths
	      var href = path && (router.mode === 'hash' || isAbsolute) ? router.history.formatPath(path, append) : path;
	      if (this.el.tagName === 'A') {
	        if (href) {
	          this.el.href = href;
	        } else {
	          this.el.removeAttribute('href');
	        }
	      }
	    },

	    updateClasses: function updateClasses(path) {
	      var el = this.el;
	      var dest = this.path;
	      var router = this.vm.$route.router;
	      var activeClass = this.activeClass || router._linkActiveClass;
	      // clear old class
	      if (this.prevActiveClass !== activeClass) {
	        _.removeClass(el, this.prevActiveClass);
	      }
	      // remove query string before matching
	      path = path.replace(/\?.*$/, '');
	      // add new class
	      if (this.exact) {
	        if (dest === path ||
	        // also allow additional trailing slash
	        dest.charAt(dest.length - 1) !== '/' && dest === path.replace(trailingSlashRE, '')) {
	          _.addClass(el, activeClass);
	        } else {
	          _.removeClass(el, activeClass);
	        }
	      } else {
	        if (this.activeRE && this.activeRE.test(path)) {
	          _.addClass(el, activeClass);
	        } else {
	          _.removeClass(el, activeClass);
	        }
	      }
	    },

	    unbind: function unbind() {
	      this.el.removeEventListener('click', this.handler);
	      this.unwatch && this.unwatch();
	    }
	  });

	  function sameOrigin(link) {
	    return link.protocol === location.protocol && link.hostname === location.hostname && link.port === location.port;
	  }
	}

	var historyBackends = {
	  abstract: AbstractHistory,
	  hash: HashHistory,
	  html5: HTML5History
	};

	// late bind during install
	var Vue = undefined;

	/**
	 * Router constructor
	 *
	 * @param {Object} [options]
	 */

	var Router = (function () {
	  function Router() {
	    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var _ref$hashbang = _ref.hashbang;
	    var hashbang = _ref$hashbang === undefined ? true : _ref$hashbang;
	    var _ref$abstract = _ref.abstract;
	    var abstract = _ref$abstract === undefined ? false : _ref$abstract;
	    var _ref$history = _ref.history;
	    var history = _ref$history === undefined ? false : _ref$history;
	    var _ref$saveScrollPosition = _ref.saveScrollPosition;
	    var saveScrollPosition = _ref$saveScrollPosition === undefined ? false : _ref$saveScrollPosition;
	    var _ref$transitionOnLoad = _ref.transitionOnLoad;
	    var transitionOnLoad = _ref$transitionOnLoad === undefined ? false : _ref$transitionOnLoad;
	    var _ref$suppressTransitionError = _ref.suppressTransitionError;
	    var suppressTransitionError = _ref$suppressTransitionError === undefined ? false : _ref$suppressTransitionError;
	    var _ref$root = _ref.root;
	    var root = _ref$root === undefined ? null : _ref$root;
	    var _ref$linkActiveClass = _ref.linkActiveClass;
	    var linkActiveClass = _ref$linkActiveClass === undefined ? 'v-link-active' : _ref$linkActiveClass;
	    babelHelpers.classCallCheck(this, Router);

	    /* istanbul ignore if */
	    if (!Router.installed) {
	      throw new Error('Please install the Router with Vue.use() before ' + 'creating an instance.');
	    }

	    // Vue instances
	    this.app = null;
	    this._views = [];
	    this._children = [];

	    // route recognizer
	    this._recognizer = new RouteRecognizer();
	    this._guardRecognizer = new RouteRecognizer();

	    // state
	    this._started = false;
	    this._startCb = null;
	    this._currentRoute = {};
	    this._currentTransition = null;
	    this._previousTransition = null;
	    this._notFoundHandler = null;
	    this._notFoundRedirect = null;
	    this._beforeEachHooks = [];
	    this._afterEachHooks = [];

	    // feature detection
	    this._hasPushState = typeof window !== 'undefined' && window.history && window.history.pushState;

	    // trigger transition on initial render?
	    this._rendered = false;
	    this._transitionOnLoad = transitionOnLoad;

	    // history mode
	    this._abstract = abstract;
	    this._hashbang = hashbang;
	    this._history = this._hasPushState && history;

	    // other options
	    this._saveScrollPosition = saveScrollPosition;
	    this._linkActiveClass = linkActiveClass;
	    this._suppress = suppressTransitionError;

	    // create history object
	    var inBrowser = Vue.util.inBrowser;
	    this.mode = !inBrowser || this._abstract ? 'abstract' : this._history ? 'html5' : 'hash';

	    var History = historyBackends[this.mode];
	    var self = this;
	    this.history = new History({
	      root: root,
	      hashbang: this._hashbang,
	      onChange: function onChange(path, state, anchor) {
	        self._match(path, state, anchor);
	      }
	    });
	  }

	  /**
	   * Allow directly passing components to a route
	   * definition.
	   *
	   * @param {String} path
	   * @param {Object} handler
	   */

	  // API ===================================================

	  /**
	  * Register a map of top-level paths.
	  *
	  * @param {Object} map
	  */

	  Router.prototype.map = function map(_map) {
	    for (var route in _map) {
	      this.on(route, _map[route]);
	    }
	  };

	  /**
	   * Register a single root-level path
	   *
	   * @param {String} rootPath
	   * @param {Object} handler
	   *                 - {String} component
	   *                 - {Object} [subRoutes]
	   *                 - {Boolean} [forceRefresh]
	   *                 - {Function} [before]
	   *                 - {Function} [after]
	   */

	  Router.prototype.on = function on(rootPath, handler) {
	    if (rootPath === '*') {
	      this._notFound(handler);
	    } else {
	      this._addRoute(rootPath, handler, []);
	    }
	  };

	  /**
	   * Set redirects.
	   *
	   * @param {Object} map
	   */

	  Router.prototype.redirect = function redirect(map) {
	    for (var path in map) {
	      this._addRedirect(path, map[path]);
	    }
	  };

	  /**
	   * Set aliases.
	   *
	   * @param {Object} map
	   */

	  Router.prototype.alias = function alias(map) {
	    for (var path in map) {
	      this._addAlias(path, map[path]);
	    }
	  };

	  /**
	   * Set global before hook.
	   *
	   * @param {Function} fn
	   */

	  Router.prototype.beforeEach = function beforeEach(fn) {
	    this._beforeEachHooks.push(fn);
	  };

	  /**
	   * Set global after hook.
	   *
	   * @param {Function} fn
	   */

	  Router.prototype.afterEach = function afterEach(fn) {
	    this._afterEachHooks.push(fn);
	  };

	  /**
	   * Navigate to a given path.
	   * The path can be an object describing a named path in
	   * the format of { name: '...', params: {}, query: {}}
	   * The path is assumed to be already decoded, and will
	   * be resolved against root (if provided)
	   *
	   * @param {String|Object} path
	   * @param {Boolean} [replace]
	   */

	  Router.prototype.go = function go(path) {
	    var replace = false;
	    var append = false;
	    if (Vue.util.isObject(path)) {
	      replace = path.replace;
	      append = path.append;
	    }
	    path = this._stringifyPath(path);
	    if (path) {
	      this.history.go(path, replace, append);
	    }
	  };

	  /**
	   * Short hand for replacing current path
	   *
	   * @param {String} path
	   */

	  Router.prototype.replace = function replace(path) {
	    if (typeof path === 'string') {
	      path = { path: path };
	    }
	    path.replace = true;
	    this.go(path);
	  };

	  /**
	   * Start the router.
	   *
	   * @param {VueConstructor} App
	   * @param {String|Element} container
	   * @param {Function} [cb]
	   */

	  Router.prototype.start = function start(App, container, cb) {
	    /* istanbul ignore if */
	    if (this._started) {
	      warn('already started.');
	      return;
	    }
	    this._started = true;
	    this._startCb = cb;
	    if (!this.app) {
	      /* istanbul ignore if */
	      if (!App || !container) {
	        throw new Error('Must start vue-router with a component and a ' + 'root container.');
	      }
	      this._appContainer = container;
	      var Ctor = this._appConstructor = typeof App === 'function' ? App : Vue.extend(App);
	      // give it a name for better debugging
	      Ctor.options.name = Ctor.options.name || 'RouterApp';
	    }
	    this.history.start();
	  };

	  /**
	   * Stop listening to route changes.
	   */

	  Router.prototype.stop = function stop() {
	    this.history.stop();
	    this._started = false;
	  };

	  // Internal methods ======================================

	  /**
	  * Add a route containing a list of segments to the internal
	  * route recognizer. Will be called recursively to add all
	  * possible sub-routes.
	  *
	  * @param {String} path
	  * @param {Object} handler
	  * @param {Array} segments
	  */

	  Router.prototype._addRoute = function _addRoute(path, handler, segments) {
	    guardComponent(path, handler);
	    handler.path = path;
	    handler.fullPath = (segments.reduce(function (path, segment) {
	      return path + segment.path;
	    }, '') + path).replace('//', '/');
	    segments.push({
	      path: path,
	      handler: handler
	    });
	    this._recognizer.add(segments, {
	      as: handler.name
	    });
	    // add sub routes
	    if (handler.subRoutes) {
	      for (var subPath in handler.subRoutes) {
	        // recursively walk all sub routes
	        this._addRoute(subPath, handler.subRoutes[subPath],
	        // pass a copy in recursion to avoid mutating
	        // across branches
	        segments.slice());
	      }
	    }
	  };

	  /**
	   * Set the notFound route handler.
	   *
	   * @param {Object} handler
	   */

	  Router.prototype._notFound = function _notFound(handler) {
	    guardComponent('*', handler);
	    this._notFoundHandler = [{ handler: handler }];
	  };

	  /**
	   * Add a redirect record.
	   *
	   * @param {String} path
	   * @param {String} redirectPath
	   */

	  Router.prototype._addRedirect = function _addRedirect(path, redirectPath) {
	    if (path === '*') {
	      this._notFoundRedirect = redirectPath;
	    } else {
	      this._addGuard(path, redirectPath, this.replace);
	    }
	  };

	  /**
	   * Add an alias record.
	   *
	   * @param {String} path
	   * @param {String} aliasPath
	   */

	  Router.prototype._addAlias = function _addAlias(path, aliasPath) {
	    this._addGuard(path, aliasPath, this._match);
	  };

	  /**
	   * Add a path guard.
	   *
	   * @param {String} path
	   * @param {String} mappedPath
	   * @param {Function} handler
	   */

	  Router.prototype._addGuard = function _addGuard(path, mappedPath, _handler) {
	    var _this = this;

	    this._guardRecognizer.add([{
	      path: path,
	      handler: function handler(match, query) {
	        var realPath = mapParams(mappedPath, match.params, query);
	        _handler.call(_this, realPath);
	      }
	    }]);
	  };

	  /**
	   * Check if a path matches any redirect records.
	   *
	   * @param {String} path
	   * @return {Boolean} - if true, will skip normal match.
	   */

	  Router.prototype._checkGuard = function _checkGuard(path) {
	    var matched = this._guardRecognizer.recognize(path);
	    if (matched) {
	      matched[0].handler(matched[0], matched.queryParams);
	      return true;
	    } else if (this._notFoundRedirect) {
	      matched = this._recognizer.recognize(path);
	      if (!matched) {
	        this.replace(this._notFoundRedirect);
	        return true;
	      }
	    }
	  };

	  /**
	   * Match a URL path and set the route context on vm,
	   * triggering view updates.
	   *
	   * @param {String} path
	   * @param {Object} [state]
	   * @param {String} [anchor]
	   */

	  Router.prototype._match = function _match(path, state, anchor) {
	    var _this2 = this;

	    if (this._checkGuard(path)) {
	      return;
	    }

	    var currentRoute = this._currentRoute;
	    var currentTransition = this._currentTransition;

	    if (currentTransition) {
	      if (currentTransition.to.path === path) {
	        // do nothing if we have an active transition going to the same path
	        return;
	      } else if (currentRoute.path === path) {
	        // We are going to the same path, but we also have an ongoing but
	        // not-yet-validated transition. Abort that transition and reset to
	        // prev transition.
	        currentTransition.aborted = true;
	        this._currentTransition = this._prevTransition;
	        return;
	      } else {
	        // going to a totally different path. abort ongoing transition.
	        currentTransition.aborted = true;
	      }
	    }

	    // construct new route and transition context
	    var route = new Route(path, this);
	    var transition = new RouteTransition(this, route, currentRoute);

	    // current transition is updated right now.
	    // however, current route will only be updated after the transition has
	    // been validated.
	    this._prevTransition = currentTransition;
	    this._currentTransition = transition;

	    if (!this.app) {
	      // initial render
	      this.app = new this._appConstructor({
	        el: this._appContainer,
	        _meta: {
	          $route: route
	        }
	      });
	    }

	    // check global before hook
	    var beforeHooks = this._beforeEachHooks;
	    var startTransition = function startTransition() {
	      transition.start(function () {
	        _this2._postTransition(route, state, anchor);
	      });
	    };

	    if (beforeHooks.length) {
	      transition.runQueue(beforeHooks, function (hook, _, next) {
	        if (transition === _this2._currentTransition) {
	          transition.callHook(hook, null, next, {
	            expectBoolean: true
	          });
	        }
	      }, startTransition);
	    } else {
	      startTransition();
	    }

	    if (!this._rendered && this._startCb) {
	      this._startCb.call(null);
	    }

	    // HACK:
	    // set rendered to true after the transition start, so
	    // that components that are acitvated synchronously know
	    // whether it is the initial render.
	    this._rendered = true;
	  };

	  /**
	   * Set current to the new transition.
	   * This is called by the transition object when the
	   * validation of a route has succeeded.
	   *
	   * @param {Transition} transition
	   */

	  Router.prototype._onTransitionValidated = function _onTransitionValidated(transition) {
	    // set current route
	    var route = this._currentRoute = transition.to;
	    // update route context for all children
	    if (this.app.$route !== route) {
	      this.app.$route = route;
	      this._children.forEach(function (child) {
	        child.$route = route;
	      });
	    }
	    // call global after hook
	    if (this._afterEachHooks.length) {
	      this._afterEachHooks.forEach(function (hook) {
	        return hook.call(null, {
	          to: transition.to,
	          from: transition.from
	        });
	      });
	    }
	    this._currentTransition.done = true;
	  };

	  /**
	   * Handle stuff after the transition.
	   *
	   * @param {Route} route
	   * @param {Object} [state]
	   * @param {String} [anchor]
	   */

	  Router.prototype._postTransition = function _postTransition(route, state, anchor) {
	    // handle scroll positions
	    // saved scroll positions take priority
	    // then we check if the path has an anchor
	    var pos = state && state.pos;
	    if (pos && this._saveScrollPosition) {
	      Vue.nextTick(function () {
	        window.scrollTo(pos.x, pos.y);
	      });
	    } else if (anchor) {
	      Vue.nextTick(function () {
	        var el = document.getElementById(anchor.slice(1));
	        if (el) {
	          window.scrollTo(window.scrollX, el.offsetTop);
	        }
	      });
	    }
	  };

	  /**
	   * Normalize named route object / string paths into
	   * a string.
	   *
	   * @param {Object|String|Number} path
	   * @return {String}
	   */

	  Router.prototype._stringifyPath = function _stringifyPath(path) {
	    if (path && typeof path === 'object') {
	      if (path.name) {
	        var params = path.params || {};
	        if (path.query) {
	          params.queryParams = path.query;
	        }
	        return this._recognizer.generate(path.name, params);
	      } else if (path.path) {
	        var fullPath = path.path;
	        if (path.query) {
	          var query = this._recognizer.generateQueryString(path.query);
	          if (fullPath.indexOf('?') > -1) {
	            fullPath += '&' + query.slice(1);
	          } else {
	            fullPath += query;
	          }
	        }
	        return fullPath;
	      } else {
	        return '';
	      }
	    } else {
	      return path ? path + '' : '';
	    }
	  };

	  return Router;
	})();

	function guardComponent(path, handler) {
	  var comp = handler.component;
	  if (Vue.util.isPlainObject(comp)) {
	    comp = handler.component = Vue.extend(comp);
	  }
	  /* istanbul ignore if */
	  if (typeof comp !== 'function') {
	    handler.component = null;
	    warn('invalid component for route "' + path + '".');
	  }
	}

	/* Installation */

	Router.installed = false;

	/**
	 * Installation interface.
	 * Install the necessary directives.
	 */

	Router.install = function (externalVue) {
	  /* istanbul ignore if */
	  if (Router.installed) {
	    warn('already installed.');
	    return;
	  }
	  Vue = externalVue;
	  applyOverride(Vue);
	  View(Vue);
	  Link(Vue);
	  exports$1.Vue = Vue;
	  Router.installed = true;
	};

	// auto install
	/* istanbul ignore if */
	if (typeof window !== 'undefined' && window.Vue) {
	  window.Vue.use(Router);
	}

	module.exports = Router;

/***/ },
/* 76 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.domain = domain;
	exports.fromNow = fromNow;
	var urlParser = document.createElement('a');

	function domain(url) {
	  urlParser.href = url;
	  return urlParser.hostname;
	}

	function fromNow(time) {
	  var between = Date.now() / 1000 - Number(time);
	  if (between < 3600) {
	    return pluralize(~ ~(between / 60), ' minute');
	  } else if (between < 86400) {
	    return pluralize(~ ~(between / 3600), ' hour');
	  } else {
	    return pluralize(~ ~(between / 86400), ' day');
	  }
	}

	function pluralize(time, label) {
	  if (time === 1) {
	    return time + label;
	  }
	  return time + label + 's';
	}

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(78)
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(82)
	if (false) {
	(function () {
	var hotAPI = require("vue-hot-reload-api")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./App.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./App.vue"], function () {
	var newOptions = null
	if (newOptions && newOptions.__esModule) newOptions = newOptions.default
	var newTemplate = require("-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./App.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(79);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(81)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-78fac476&file=App.vue!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./App.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-78fac476&file=App.vue!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./App.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(80)();
	// imports


	// module
	exports.push([module.id, "html, body {\n  font-family: Verdana;\n  font-size: 13px;\n  height: 100%; }\n\nul {\n  list-style-type: none;\n  padding: 0;\n  margin: 0; }\n\na {\n  color: #000;\n  cursor: pointer;\n  text-decoration: none; }\n\n#wrapper {\n  background-color: #f6f6ef;\n  position: relative;\n  width: 85%;\n  min-height: 80px;\n  margin: 0 auto; }\n\n#header {\n  background-color: #f60;\n  height: 24px;\n  position: relative; }\n  #header h1 {\n    font-weight: bold;\n    font-size: 13px;\n    display: inline-block;\n    vertical-align: middle;\n    margin: 0; }\n  #header .source {\n    color: #fff;\n    font-size: 11px;\n    position: absolute;\n    top: 4px;\n    right: 4px; }\n    #header .source a {\n      color: #fff; }\n      #header .source a:hover {\n        text-decoration: underline; }\n\n#yc {\n  border: 1px solid #fff;\n  margin: 2px;\n  display: inline-block;\n  vertical-align: middle; }\n  #yc img {\n    vertical-align: middle; }\n\n.view {\n  position: absolute;\n  background-color: #f6f6ef;\n  width: 100%;\n  -webkit-transition: opacity .2s ease;\n  transition: opacity .2s ease;\n  box-sizing: border-box;\n  padding: 8px 20px; }\n  .view.v-enter, .view.v-leave {\n    opacity: 0; }\n\n@media screen and (max-width: 700px) {\n  html, body {\n    margin: 0; }\n  #wrapper {\n    width: 100%; } }\n", ""]);

	// exports


/***/ },
/* 80 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 82 */
/***/ function(module, exports) {

	module.exports = "<div id=\"wrapper\">\r\n    <!-- header -->\r\n    <div id=\"header\">\r\n      <a id=\"yc\" href=\"http://www.ycombinator.com\">\r\n        <img src=\"https://news.ycombinator.com/y18.gif\">\r\n      </a>\r\n      <h1><a href=\"#/\">Hacker News</a></h1>\r\n      <span class=\"source\">\r\n        Built with <a href=\"http://vuejs.org\" target=\"_blank\">Vue.js</a> |\r\n        <a href=\"https://github.com/keyfoxth/vue-hackernews\" target=\"_blank\">Source</a>\r\n      </span>\r\n    </div>\r\n    <!-- main view -->\r\n    <router-view\r\n      class=\"view\"\r\n      keep-alive\r\n      transition\r\n      transition-mode=\"out-in\">\r\n    </router-view>\r\n  </div>";

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(84)
	module.exports = __webpack_require__(86)

	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(102)
	if (false) {
	(function () {
	var hotAPI = require("vue-hot-reload-api")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./NewsView.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./NewsView.vue","-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./NewsView.vue"], function () {
	var newOptions = require("-!babel!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./NewsView.vue")
	if (newOptions && newOptions.__esModule) newOptions = newOptions.default
	var newTemplate = require("-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./NewsView.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(85);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(81)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-f656e6da&file=NewsView.vue!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./NewsView.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-f656e6da&file=NewsView.vue!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./NewsView.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(80)();
	// imports


	// module
	exports.push([module.id, ".news-view {\n  padding-left: 5px;\n  padding-right: 15px; }\n  .news-view.loading:before {\n    content: \"Loading...\";\n    position: absolute;\n    top: 16px;\n    left: 20px; }\n  .news-view .nav {\n    padding: 10px 10px 10px 40px;\n    margin-top: 10px;\n    border-top: 2px solid #f60; }\n    .news-view .nav a {\n      margin-right: 10px; }\n      .news-view .nav a:hover {\n        text-decoration: underline; }\n", ""]);

	// exports


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _store = __webpack_require__(87);

	var _store2 = _interopRequireDefault(_store);

	var _Item = __webpack_require__(97);

	var _Item2 = _interopRequireDefault(_Item);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {

	  name: 'NewsView',

	  components: {
	    Item: _Item2.default
	  },

	  data: function data() {
	    return {
	      page: 1,
	      items: []
	    };
	  },

	  route: {
	    data: function data(_ref) {
	      var to = _ref.to;

	      var page = +to.params.page;
	      return _store2.default.fetchItemsByPage(page).then(function (items) {
	        return {
	          page: page,
	          items: items
	        };
	      });
	    }
	  },

	  created: function created() {
	    _store2.default.on('topstories-updated', this.update);
	  },
	  destroyed: function destroyed() {
	    _store2.default.removeListener('topstories-updated', this.update);
	  },

	  methods: {
	    update: function update() {
	      var _this = this;

	      _store2.default.fetchItemsByPage(this.page).then(function (items) {
	        _this.items = items;
	      });
	    }
	  },

	  filters: {
	    formatItemIndex: function formatItemIndex(index) {
	      return (this.page - 1) * _store2.default.storiesPerPage + index + 1;
	    }
	  }
	};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _create = __webpack_require__(88);

	var _create2 = _interopRequireDefault(_create);

	var _firebase = __webpack_require__(91);

	var _firebase2 = _interopRequireDefault(_firebase);

	var _events = __webpack_require__(92);

	var _es6Promise = __webpack_require__(93);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var api = new _firebase2.default('https://hacker-news.firebaseio.com/v0');
	var itemsCache = (0, _create2.default)(null);
	var store = new _events.EventEmitter();
	var storiesPerPage = store.storiesPerPage = 30;

	var topStoryIds = [];

	exports.default = store;

	api.child('topstories').on('value', function (snapshot) {
	  topStoryIds = snapshot.val();
	  store.emit('topstories-updated');
	});

	store.fetchItem = function (id) {
	  return new _es6Promise.Promise(function (resolve, reject) {
	    if (itemsCache[id]) {
	      resolve(itemsCache[id]);
	    } else {
	      api.child('item/' + id).once('value', function (snapshot) {
	        var story = itemsCache[id] = snapshot.val();
	        resolve(story);
	      }, reject);
	    }
	  });
	};

	store.fetchItems = function (ids) {
	  if (!ids || !ids.length) {
	    return _es6Promise.Promise.resolve([]);
	  } else {
	    return _es6Promise.Promise.all(ids.map(function (id) {
	      return store.fetchItem(id);
	    }));
	  }
	};

	store.fetchItemsByPage = function (page) {
	  var start = (page - 1) * storiesPerPage;
	  var end = page * storiesPerPage;
	  var ids = topStoryIds.slice(start, end);
	  return store.fetchItems(ids);
	};

	store.fetchUser = function (id) {
	  return new _es6Promise.Promise(function (resolve, reject) {
	    api.child('user/' + id).once('value', function (snapshot) {
	      resolve(snapshot.val());
	    }, reject);
	  });
	};

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(89), __esModule: true };

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(90);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 90 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 91 */
/***/ function(module, exports) {

	/*! @license Firebase v2.3.2
	    License: https://www.firebase.com/terms/terms-of-service.html */
	(function() {var g,aa=this;function n(a){return void 0!==a}function ba(){}function ca(a){a.ub=function(){return a.uf?a.uf:a.uf=new a}}
	function da(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
	else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function ea(a){return"array"==da(a)}function fa(a){var b=da(a);return"array"==b||"object"==b&&"number"==typeof a.length}function p(a){return"string"==typeof a}function ga(a){return"number"==typeof a}function ha(a){return"function"==da(a)}function ia(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}function ja(a,b,c){return a.call.apply(a.bind,arguments)}
	function ka(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function q(a,b,c){q=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ja:ka;return q.apply(null,arguments)}var la=Date.now||function(){return+new Date};
	function ma(a,b){function c(){}c.prototype=b.prototype;a.bh=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.Yg=function(a,c,f){for(var h=Array(arguments.length-2),k=2;k<arguments.length;k++)h[k-2]=arguments[k];return b.prototype[c].apply(a,h)}};function r(a,b){for(var c in a)b.call(void 0,a[c],c,a)}function na(a,b){var c={},d;for(d in a)c[d]=b.call(void 0,a[d],d,a);return c}function oa(a,b){for(var c in a)if(!b.call(void 0,a[c],c,a))return!1;return!0}function pa(a){var b=0,c;for(c in a)b++;return b}function qa(a){for(var b in a)return b}function ra(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b}function sa(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b}function ta(a,b){for(var c in a)if(a[c]==b)return!0;return!1}
	function ua(a,b,c){for(var d in a)if(b.call(c,a[d],d,a))return d}function va(a,b){var c=ua(a,b,void 0);return c&&a[c]}function wa(a){for(var b in a)return!1;return!0}function xa(a){var b={},c;for(c in a)b[c]=a[c];return b}var ya="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
	function za(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<ya.length;f++)c=ya[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};function Aa(a){a=String(a);if(/^\s*$/.test(a)?0:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,"")))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);}function Ba(){this.Sd=void 0}
	function Ca(a,b,c){switch(typeof b){case "string":Da(b,c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?b:"null");break;case "boolean":c.push(b);break;case "undefined":c.push("null");break;case "object":if(null==b){c.push("null");break}if(ea(b)){var d=b.length;c.push("[");for(var e="",f=0;f<d;f++)c.push(e),e=b[f],Ca(a,a.Sd?a.Sd.call(b,String(f),e):e,c),e=",";c.push("]");break}c.push("{");d="";for(f in b)Object.prototype.hasOwnProperty.call(b,f)&&(e=b[f],"function"!=typeof e&&(c.push(d),Da(f,c),
	c.push(":"),Ca(a,a.Sd?a.Sd.call(b,f,e):e,c),d=","));c.push("}");break;case "function":break;default:throw Error("Unknown type: "+typeof b);}}var Ea={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},Fa=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g;
	function Da(a,b){b.push('"',a.replace(Fa,function(a){if(a in Ea)return Ea[a];var b=a.charCodeAt(0),e="\\u";16>b?e+="000":256>b?e+="00":4096>b&&(e+="0");return Ea[a]=e+b.toString(16)}),'"')};function Ga(){return Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^la()).toString(36)};var Ha;a:{var Ia=aa.navigator;if(Ia){var Ja=Ia.userAgent;if(Ja){Ha=Ja;break a}}Ha=""};function Ka(){this.Va=-1};function La(){this.Va=-1;this.Va=64;this.N=[];this.me=[];this.Wf=[];this.Ld=[];this.Ld[0]=128;for(var a=1;a<this.Va;++a)this.Ld[a]=0;this.de=this.ac=0;this.reset()}ma(La,Ka);La.prototype.reset=function(){this.N[0]=1732584193;this.N[1]=4023233417;this.N[2]=2562383102;this.N[3]=271733878;this.N[4]=3285377520;this.de=this.ac=0};
	function Ma(a,b,c){c||(c=0);var d=a.Wf;if(p(b))for(var e=0;16>e;e++)d[e]=b.charCodeAt(c)<<24|b.charCodeAt(c+1)<<16|b.charCodeAt(c+2)<<8|b.charCodeAt(c+3),c+=4;else for(e=0;16>e;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}b=a.N[0];c=a.N[1];for(var h=a.N[2],k=a.N[3],l=a.N[4],m,e=0;80>e;e++)40>e?20>e?(f=k^c&(h^k),m=1518500249):(f=c^h^k,m=1859775393):60>e?(f=c&h|k&(c|h),m=2400959708):(f=c^h^k,m=3395469782),f=(b<<
	5|b>>>27)+f+l+m+d[e]&4294967295,l=k,k=h,h=(c<<30|c>>>2)&4294967295,c=b,b=f;a.N[0]=a.N[0]+b&4294967295;a.N[1]=a.N[1]+c&4294967295;a.N[2]=a.N[2]+h&4294967295;a.N[3]=a.N[3]+k&4294967295;a.N[4]=a.N[4]+l&4294967295}
	La.prototype.update=function(a,b){if(null!=a){n(b)||(b=a.length);for(var c=b-this.Va,d=0,e=this.me,f=this.ac;d<b;){if(0==f)for(;d<=c;)Ma(this,a,d),d+=this.Va;if(p(a))for(;d<b;){if(e[f]=a.charCodeAt(d),++f,++d,f==this.Va){Ma(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.Va){Ma(this,e);f=0;break}}this.ac=f;this.de+=b}};var u=Array.prototype,Na=u.indexOf?function(a,b,c){return u.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(p(a))return p(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},Oa=u.forEach?function(a,b,c){u.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},Pa=u.filter?function(a,b,c){return u.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,h=p(a)?
	a.split(""):a,k=0;k<d;k++)if(k in h){var l=h[k];b.call(c,l,k,a)&&(e[f++]=l)}return e},Qa=u.map?function(a,b,c){return u.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=p(a)?a.split(""):a,h=0;h<d;h++)h in f&&(e[h]=b.call(c,f[h],h,a));return e},Ra=u.reduce?function(a,b,c,d){for(var e=[],f=1,h=arguments.length;f<h;f++)e.push(arguments[f]);d&&(e[0]=q(b,d));return u.reduce.apply(a,e)}:function(a,b,c,d){var e=c;Oa(a,function(c,h){e=b.call(d,e,c,h,a)});return e},Sa=u.every?function(a,b,
	c){return u.every.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&!b.call(c,e[f],f,a))return!1;return!0};function Ta(a,b){var c=Ua(a,b,void 0);return 0>c?null:p(a)?a.charAt(c):a[c]}function Ua(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return f;return-1}function Va(a,b){var c=Na(a,b);0<=c&&u.splice.call(a,c,1)}function Wa(a,b,c){return 2>=arguments.length?u.slice.call(a,b):u.slice.call(a,b,c)}
	function Xa(a,b){a.sort(b||Ya)}function Ya(a,b){return a>b?1:a<b?-1:0};var Za=-1!=Ha.indexOf("Opera")||-1!=Ha.indexOf("OPR"),$a=-1!=Ha.indexOf("Trident")||-1!=Ha.indexOf("MSIE"),ab=-1!=Ha.indexOf("Gecko")&&-1==Ha.toLowerCase().indexOf("webkit")&&!(-1!=Ha.indexOf("Trident")||-1!=Ha.indexOf("MSIE")),bb=-1!=Ha.toLowerCase().indexOf("webkit");
	(function(){var a="",b;if(Za&&aa.opera)return a=aa.opera.version,ha(a)?a():a;ab?b=/rv\:([^\);]+)(\)|;)/:$a?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:bb&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(Ha))?a[1]:"");return $a&&(b=(b=aa.document)?b.documentMode:void 0,b>parseFloat(a))?String(b):a})();var cb=null,db=null,eb=null;function fb(a,b){if(!fa(a))throw Error("encodeByteArray takes an array as a parameter");gb();for(var c=b?db:cb,d=[],e=0;e<a.length;e+=3){var f=a[e],h=e+1<a.length,k=h?a[e+1]:0,l=e+2<a.length,m=l?a[e+2]:0,t=f>>2,f=(f&3)<<4|k>>4,k=(k&15)<<2|m>>6,m=m&63;l||(m=64,h||(k=64));d.push(c[t],c[f],c[k],c[m])}return d.join("")}
	function gb(){if(!cb){cb={};db={};eb={};for(var a=0;65>a;a++)cb[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a),db[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a),eb[db[a]]=a,62<=a&&(eb["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a)]=a)}};var hb=hb||"2.3.2";function v(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function w(a,b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b]}function ib(a,b){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b(c,a[c])}function jb(a){var b={};ib(a,function(a,d){b[a]=d});return b};function kb(a){var b=[];ib(a,function(a,d){ea(d)?Oa(d,function(d){b.push(encodeURIComponent(a)+"="+encodeURIComponent(d))}):b.push(encodeURIComponent(a)+"="+encodeURIComponent(d))});return b.length?"&"+b.join("&"):""}function lb(a){var b={};a=a.replace(/^\?/,"").split("&");Oa(a,function(a){a&&(a=a.split("="),b[a[0]]=a[1])});return b};function x(a,b,c,d){var e;d<b?e="at least "+b:d>c&&(e=0===c?"none":"no more than "+c);if(e)throw Error(a+" failed: Was called with "+d+(1===d?" argument.":" arguments.")+" Expects "+e+".");}function y(a,b,c){var d="";switch(b){case 1:d=c?"first":"First";break;case 2:d=c?"second":"Second";break;case 3:d=c?"third":"Third";break;case 4:d=c?"fourth":"Fourth";break;default:throw Error("errorPrefix called with argumentNumber > 4.  Need to update it?");}return a=a+" failed: "+(d+" argument ")}
	function A(a,b,c,d){if((!d||n(c))&&!ha(c))throw Error(y(a,b,d)+"must be a valid function.");}function mb(a,b,c){if(n(c)&&(!ia(c)||null===c))throw Error(y(a,b,!0)+"must be a valid context object.");};function nb(a){return"undefined"!==typeof JSON&&n(JSON.parse)?JSON.parse(a):Aa(a)}function B(a){if("undefined"!==typeof JSON&&n(JSON.stringify))a=JSON.stringify(a);else{var b=[];Ca(new Ba,a,b);a=b.join("")}return a};function ob(){this.Wd=C}ob.prototype.j=function(a){return this.Wd.Q(a)};ob.prototype.toString=function(){return this.Wd.toString()};function pb(){}pb.prototype.qf=function(){return null};pb.prototype.ye=function(){return null};var qb=new pb;function rb(a,b,c){this.Tf=a;this.Ka=b;this.Kd=c}rb.prototype.qf=function(a){var b=this.Ka.O;if(sb(b,a))return b.j().R(a);b=null!=this.Kd?new tb(this.Kd,!0,!1):this.Ka.w();return this.Tf.xc(a,b)};rb.prototype.ye=function(a,b,c){var d=null!=this.Kd?this.Kd:ub(this.Ka);a=this.Tf.ne(d,b,1,c,a);return 0===a.length?null:a[0]};function vb(){this.tb=[]}function wb(a,b){for(var c=null,d=0;d<b.length;d++){var e=b[d],f=e.Zb();null===c||f.ca(c.Zb())||(a.tb.push(c),c=null);null===c&&(c=new xb(f));c.add(e)}c&&a.tb.push(c)}function yb(a,b,c){wb(a,c);zb(a,function(a){return a.ca(b)})}function Ab(a,b,c){wb(a,c);zb(a,function(a){return a.contains(b)||b.contains(a)})}
	function zb(a,b){for(var c=!0,d=0;d<a.tb.length;d++){var e=a.tb[d];if(e)if(e=e.Zb(),b(e)){for(var e=a.tb[d],f=0;f<e.vd.length;f++){var h=e.vd[f];if(null!==h){e.vd[f]=null;var k=h.Vb();Bb&&Cb("event: "+h.toString());Db(k)}}a.tb[d]=null}else c=!1}c&&(a.tb=[])}function xb(a){this.ra=a;this.vd=[]}xb.prototype.add=function(a){this.vd.push(a)};xb.prototype.Zb=function(){return this.ra};function D(a,b,c,d){this.type=a;this.Ja=b;this.Wa=c;this.Ke=d;this.Qd=void 0}function Eb(a){return new D(Fb,a)}var Fb="value";function Gb(a,b,c,d){this.ue=b;this.Zd=c;this.Qd=d;this.ud=a}Gb.prototype.Zb=function(){var a=this.Zd.Ib();return"value"===this.ud?a.path:a.parent().path};Gb.prototype.ze=function(){return this.ud};Gb.prototype.Vb=function(){return this.ue.Vb(this)};Gb.prototype.toString=function(){return this.Zb().toString()+":"+this.ud+":"+B(this.Zd.mf())};function Hb(a,b,c){this.ue=a;this.error=b;this.path=c}Hb.prototype.Zb=function(){return this.path};Hb.prototype.ze=function(){return"cancel"};
	Hb.prototype.Vb=function(){return this.ue.Vb(this)};Hb.prototype.toString=function(){return this.path.toString()+":cancel"};function tb(a,b,c){this.A=a;this.ea=b;this.Ub=c}function Ib(a){return a.ea}function Jb(a){return a.Ub}function Kb(a,b){return b.e()?a.ea&&!a.Ub:sb(a,E(b))}function sb(a,b){return a.ea&&!a.Ub||a.A.Da(b)}tb.prototype.j=function(){return this.A};function Lb(a){this.gg=a;this.Dd=null}Lb.prototype.get=function(){var a=this.gg.get(),b=xa(a);if(this.Dd)for(var c in this.Dd)b[c]-=this.Dd[c];this.Dd=a;return b};function Mb(a,b){this.Of={};this.fd=new Lb(a);this.ba=b;var c=1E4+2E4*Math.random();setTimeout(q(this.If,this),Math.floor(c))}Mb.prototype.If=function(){var a=this.fd.get(),b={},c=!1,d;for(d in a)0<a[d]&&v(this.Of,d)&&(b[d]=a[d],c=!0);c&&this.ba.Ue(b);setTimeout(q(this.If,this),Math.floor(6E5*Math.random()))};function Nb(){this.Ec={}}function Ob(a,b,c){n(c)||(c=1);v(a.Ec,b)||(a.Ec[b]=0);a.Ec[b]+=c}Nb.prototype.get=function(){return xa(this.Ec)};var Pb={},Qb={};function Rb(a){a=a.toString();Pb[a]||(Pb[a]=new Nb);return Pb[a]}function Sb(a,b){var c=a.toString();Qb[c]||(Qb[c]=b());return Qb[c]};function F(a,b){this.name=a;this.S=b}function Tb(a,b){return new F(a,b)};function Ub(a,b){return Vb(a.name,b.name)}function Wb(a,b){return Vb(a,b)};function Xb(a,b,c){this.type=Yb;this.source=a;this.path=b;this.Ga=c}Xb.prototype.Xc=function(a){return this.path.e()?new Xb(this.source,G,this.Ga.R(a)):new Xb(this.source,H(this.path),this.Ga)};Xb.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" overwrite: "+this.Ga.toString()+")"};function Zb(a,b){this.type=$b;this.source=a;this.path=b}Zb.prototype.Xc=function(){return this.path.e()?new Zb(this.source,G):new Zb(this.source,H(this.path))};Zb.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" listen_complete)"};function ac(a,b){this.La=a;this.wa=b?b:bc}g=ac.prototype;g.Oa=function(a,b){return new ac(this.La,this.wa.Oa(a,b,this.La).Y(null,null,!1,null,null))};g.remove=function(a){return new ac(this.La,this.wa.remove(a,this.La).Y(null,null,!1,null,null))};g.get=function(a){for(var b,c=this.wa;!c.e();){b=this.La(a,c.key);if(0===b)return c.value;0>b?c=c.left:0<b&&(c=c.right)}return null};
	function cc(a,b){for(var c,d=a.wa,e=null;!d.e();){c=a.La(b,d.key);if(0===c){if(d.left.e())return e?e.key:null;for(d=d.left;!d.right.e();)d=d.right;return d.key}0>c?d=d.left:0<c&&(e=d,d=d.right)}throw Error("Attempted to find predecessor key for a nonexistent key.  What gives?");}g.e=function(){return this.wa.e()};g.count=function(){return this.wa.count()};g.Sc=function(){return this.wa.Sc()};g.fc=function(){return this.wa.fc()};g.ia=function(a){return this.wa.ia(a)};
	g.Xb=function(a){return new dc(this.wa,null,this.La,!1,a)};g.Yb=function(a,b){return new dc(this.wa,a,this.La,!1,b)};g.$b=function(a,b){return new dc(this.wa,a,this.La,!0,b)};g.sf=function(a){return new dc(this.wa,null,this.La,!0,a)};function dc(a,b,c,d,e){this.Ud=e||null;this.Fe=d;this.Pa=[];for(e=1;!a.e();)if(e=b?c(a.key,b):1,d&&(e*=-1),0>e)a=this.Fe?a.left:a.right;else if(0===e){this.Pa.push(a);break}else this.Pa.push(a),a=this.Fe?a.right:a.left}
	function J(a){if(0===a.Pa.length)return null;var b=a.Pa.pop(),c;c=a.Ud?a.Ud(b.key,b.value):{key:b.key,value:b.value};if(a.Fe)for(b=b.left;!b.e();)a.Pa.push(b),b=b.right;else for(b=b.right;!b.e();)a.Pa.push(b),b=b.left;return c}function ec(a){if(0===a.Pa.length)return null;var b;b=a.Pa;b=b[b.length-1];return a.Ud?a.Ud(b.key,b.value):{key:b.key,value:b.value}}function fc(a,b,c,d,e){this.key=a;this.value=b;this.color=null!=c?c:!0;this.left=null!=d?d:bc;this.right=null!=e?e:bc}g=fc.prototype;
	g.Y=function(a,b,c,d,e){return new fc(null!=a?a:this.key,null!=b?b:this.value,null!=c?c:this.color,null!=d?d:this.left,null!=e?e:this.right)};g.count=function(){return this.left.count()+1+this.right.count()};g.e=function(){return!1};g.ia=function(a){return this.left.ia(a)||a(this.key,this.value)||this.right.ia(a)};function gc(a){return a.left.e()?a:gc(a.left)}g.Sc=function(){return gc(this).key};g.fc=function(){return this.right.e()?this.key:this.right.fc()};
	g.Oa=function(a,b,c){var d,e;e=this;d=c(a,e.key);e=0>d?e.Y(null,null,null,e.left.Oa(a,b,c),null):0===d?e.Y(null,b,null,null,null):e.Y(null,null,null,null,e.right.Oa(a,b,c));return hc(e)};function ic(a){if(a.left.e())return bc;a.left.fa()||a.left.left.fa()||(a=jc(a));a=a.Y(null,null,null,ic(a.left),null);return hc(a)}
	g.remove=function(a,b){var c,d;c=this;if(0>b(a,c.key))c.left.e()||c.left.fa()||c.left.left.fa()||(c=jc(c)),c=c.Y(null,null,null,c.left.remove(a,b),null);else{c.left.fa()&&(c=kc(c));c.right.e()||c.right.fa()||c.right.left.fa()||(c=lc(c),c.left.left.fa()&&(c=kc(c),c=lc(c)));if(0===b(a,c.key)){if(c.right.e())return bc;d=gc(c.right);c=c.Y(d.key,d.value,null,null,ic(c.right))}c=c.Y(null,null,null,null,c.right.remove(a,b))}return hc(c)};g.fa=function(){return this.color};
	function hc(a){a.right.fa()&&!a.left.fa()&&(a=mc(a));a.left.fa()&&a.left.left.fa()&&(a=kc(a));a.left.fa()&&a.right.fa()&&(a=lc(a));return a}function jc(a){a=lc(a);a.right.left.fa()&&(a=a.Y(null,null,null,null,kc(a.right)),a=mc(a),a=lc(a));return a}function mc(a){return a.right.Y(null,null,a.color,a.Y(null,null,!0,null,a.right.left),null)}function kc(a){return a.left.Y(null,null,a.color,null,a.Y(null,null,!0,a.left.right,null))}
	function lc(a){return a.Y(null,null,!a.color,a.left.Y(null,null,!a.left.color,null,null),a.right.Y(null,null,!a.right.color,null,null))}function nc(){}g=nc.prototype;g.Y=function(){return this};g.Oa=function(a,b){return new fc(a,b,null)};g.remove=function(){return this};g.count=function(){return 0};g.e=function(){return!0};g.ia=function(){return!1};g.Sc=function(){return null};g.fc=function(){return null};g.fa=function(){return!1};var bc=new nc;function oc(a,b){return a&&"object"===typeof a?(K(".sv"in a,"Unexpected leaf node or priority contents"),b[a[".sv"]]):a}function pc(a,b){var c=new qc;rc(a,new L(""),function(a,e){c.nc(a,sc(e,b))});return c}function sc(a,b){var c=a.C().I(),c=oc(c,b),d;if(a.K()){var e=oc(a.Ca(),b);return e!==a.Ca()||c!==a.C().I()?new tc(e,M(c)):a}d=a;c!==a.C().I()&&(d=d.ga(new tc(c)));a.P(N,function(a,c){var e=sc(c,b);e!==c&&(d=d.U(a,e))});return d};function uc(){this.wc={}}uc.prototype.set=function(a,b){null==b?delete this.wc[a]:this.wc[a]=b};uc.prototype.get=function(a){return v(this.wc,a)?this.wc[a]:null};uc.prototype.remove=function(a){delete this.wc[a]};uc.prototype.wf=!0;function vc(a){this.Fc=a;this.Pd="firebase:"}g=vc.prototype;g.set=function(a,b){null==b?this.Fc.removeItem(this.Pd+a):this.Fc.setItem(this.Pd+a,B(b))};g.get=function(a){a=this.Fc.getItem(this.Pd+a);return null==a?null:nb(a)};g.remove=function(a){this.Fc.removeItem(this.Pd+a)};g.wf=!1;g.toString=function(){return this.Fc.toString()};function wc(a){try{if("undefined"!==typeof window&&"undefined"!==typeof window[a]){var b=window[a];b.setItem("firebase:sentinel","cache");b.removeItem("firebase:sentinel");return new vc(b)}}catch(c){}return new uc}var xc=wc("localStorage"),yc=wc("sessionStorage");function zc(a,b,c,d,e){this.host=a.toLowerCase();this.domain=this.host.substr(this.host.indexOf(".")+1);this.kb=b;this.hc=c;this.Wg=d;this.Od=e||"";this.Ya=xc.get("host:"+a)||this.host}function Ac(a,b){b!==a.Ya&&(a.Ya=b,"s-"===a.Ya.substr(0,2)&&xc.set("host:"+a.host,a.Ya))}
	function Bc(a,b,c){K("string"===typeof b,"typeof type must == string");K("object"===typeof c,"typeof params must == object");if(b===Cc)b=(a.kb?"wss://":"ws://")+a.Ya+"/.ws?";else if(b===Dc)b=(a.kb?"https://":"http://")+a.Ya+"/.lp?";else throw Error("Unknown connection type: "+b);a.host!==a.Ya&&(c.ns=a.hc);var d=[];r(c,function(a,b){d.push(b+"="+a)});return b+d.join("&")}zc.prototype.toString=function(){var a=(this.kb?"https://":"http://")+this.host;this.Od&&(a+="<"+this.Od+">");return a};var Ec=function(){var a=1;return function(){return a++}}();function K(a,b){if(!a)throw Fc(b);}function Fc(a){return Error("Firebase ("+hb+") INTERNAL ASSERT FAILED: "+a)}
	function Gc(a){try{var b;if("undefined"!==typeof atob)b=atob(a);else{gb();for(var c=eb,d=[],e=0;e<a.length;){var f=c[a.charAt(e++)],h=e<a.length?c[a.charAt(e)]:0;++e;var k=e<a.length?c[a.charAt(e)]:64;++e;var l=e<a.length?c[a.charAt(e)]:64;++e;if(null==f||null==h||null==k||null==l)throw Error();d.push(f<<2|h>>4);64!=k&&(d.push(h<<4&240|k>>2),64!=l&&d.push(k<<6&192|l))}if(8192>d.length)b=String.fromCharCode.apply(null,d);else{a="";for(c=0;c<d.length;c+=8192)a+=String.fromCharCode.apply(null,Wa(d,c,
	c+8192));b=a}}return b}catch(m){Cb("base64Decode failed: ",m)}return null}function Hc(a){var b=Ic(a);a=new La;a.update(b);var b=[],c=8*a.de;56>a.ac?a.update(a.Ld,56-a.ac):a.update(a.Ld,a.Va-(a.ac-56));for(var d=a.Va-1;56<=d;d--)a.me[d]=c&255,c/=256;Ma(a,a.me);for(d=c=0;5>d;d++)for(var e=24;0<=e;e-=8)b[c]=a.N[d]>>e&255,++c;return fb(b)}
	function Jc(a){for(var b="",c=0;c<arguments.length;c++)b=fa(arguments[c])?b+Jc.apply(null,arguments[c]):"object"===typeof arguments[c]?b+B(arguments[c]):b+arguments[c],b+=" ";return b}var Bb=null,Kc=!0;function Cb(a){!0===Kc&&(Kc=!1,null===Bb&&!0===yc.get("logging_enabled")&&Lc(!0));if(Bb){var b=Jc.apply(null,arguments);Bb(b)}}function Mc(a){return function(){Cb(a,arguments)}}
	function Nc(a){if("undefined"!==typeof console){var b="FIREBASE INTERNAL ERROR: "+Jc.apply(null,arguments);"undefined"!==typeof console.error?console.error(b):console.log(b)}}function Oc(a){var b=Jc.apply(null,arguments);throw Error("FIREBASE FATAL ERROR: "+b);}function O(a){if("undefined"!==typeof console){var b="FIREBASE WARNING: "+Jc.apply(null,arguments);"undefined"!==typeof console.warn?console.warn(b):console.log(b)}}
	function Pc(a){var b="",c="",d="",e="",f=!0,h="https",k=443;if(p(a)){var l=a.indexOf("//");0<=l&&(h=a.substring(0,l-1),a=a.substring(l+2));l=a.indexOf("/");-1===l&&(l=a.length);b=a.substring(0,l);e="";a=a.substring(l).split("/");for(l=0;l<a.length;l++)if(0<a[l].length){var m=a[l];try{m=decodeURIComponent(m.replace(/\+/g," "))}catch(t){}e+="/"+m}a=b.split(".");3===a.length?(c=a[1],d=a[0].toLowerCase()):2===a.length&&(c=a[0]);l=b.indexOf(":");0<=l&&(f="https"===h||"wss"===h,k=b.substring(l+1),isFinite(k)&&
	(k=String(k)),k=p(k)?/^\s*-?0x/i.test(k)?parseInt(k,16):parseInt(k,10):NaN)}return{host:b,port:k,domain:c,Tg:d,kb:f,scheme:h,$c:e}}function Qc(a){return ga(a)&&(a!=a||a==Number.POSITIVE_INFINITY||a==Number.NEGATIVE_INFINITY)}
	function Rc(a){if("complete"===document.readyState)a();else{var b=!1,c=function(){document.body?b||(b=!0,a()):setTimeout(c,Math.floor(10))};document.addEventListener?(document.addEventListener("DOMContentLoaded",c,!1),window.addEventListener("load",c,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",function(){"complete"===document.readyState&&c()}),window.attachEvent("onload",c))}}
	function Vb(a,b){if(a===b)return 0;if("[MIN_NAME]"===a||"[MAX_NAME]"===b)return-1;if("[MIN_NAME]"===b||"[MAX_NAME]"===a)return 1;var c=Sc(a),d=Sc(b);return null!==c?null!==d?0==c-d?a.length-b.length:c-d:-1:null!==d?1:a<b?-1:1}function Tc(a,b){if(b&&a in b)return b[a];throw Error("Missing required key ("+a+") in object: "+B(b));}
	function Uc(a){if("object"!==typeof a||null===a)return B(a);var b=[],c;for(c in a)b.push(c);b.sort();c="{";for(var d=0;d<b.length;d++)0!==d&&(c+=","),c+=B(b[d]),c+=":",c+=Uc(a[b[d]]);return c+"}"}function Vc(a,b){if(a.length<=b)return[a];for(var c=[],d=0;d<a.length;d+=b)d+b>a?c.push(a.substring(d,a.length)):c.push(a.substring(d,d+b));return c}function Wc(a,b){if(ea(a))for(var c=0;c<a.length;++c)b(c,a[c]);else r(a,b)}
	function Xc(a){K(!Qc(a),"Invalid JSON number");var b,c,d,e;0===a?(d=c=0,b=-Infinity===1/a?1:0):(b=0>a,a=Math.abs(a),a>=Math.pow(2,-1022)?(d=Math.min(Math.floor(Math.log(a)/Math.LN2),1023),c=d+1023,d=Math.round(a*Math.pow(2,52-d)-Math.pow(2,52))):(c=0,d=Math.round(a/Math.pow(2,-1074))));e=[];for(a=52;a;--a)e.push(d%2?1:0),d=Math.floor(d/2);for(a=11;a;--a)e.push(c%2?1:0),c=Math.floor(c/2);e.push(b?1:0);e.reverse();b=e.join("");c="";for(a=0;64>a;a+=8)d=parseInt(b.substr(a,8),2).toString(16),1===d.length&&
	(d="0"+d),c+=d;return c.toLowerCase()}var Yc=/^-?\d{1,10}$/;function Sc(a){return Yc.test(a)&&(a=Number(a),-2147483648<=a&&2147483647>=a)?a:null}function Db(a){try{a()}catch(b){setTimeout(function(){O("Exception was thrown by user callback.",b.stack||"");throw b;},Math.floor(0))}}function P(a,b){if(ha(a)){var c=Array.prototype.slice.call(arguments,1).slice();Db(function(){a.apply(null,c)})}};function Ic(a){for(var b=[],c=0,d=0;d<a.length;d++){var e=a.charCodeAt(d);55296<=e&&56319>=e&&(e-=55296,d++,K(d<a.length,"Surrogate pair missing trail surrogate."),e=65536+(e<<10)+(a.charCodeAt(d)-56320));128>e?b[c++]=e:(2048>e?b[c++]=e>>6|192:(65536>e?b[c++]=e>>12|224:(b[c++]=e>>18|240,b[c++]=e>>12&63|128),b[c++]=e>>6&63|128),b[c++]=e&63|128)}return b}function Zc(a){for(var b=0,c=0;c<a.length;c++){var d=a.charCodeAt(c);128>d?b++:2048>d?b+=2:55296<=d&&56319>=d?(b+=4,c++):b+=3}return b};function $c(a){var b={},c={},d={},e="";try{var f=a.split("."),b=nb(Gc(f[0])||""),c=nb(Gc(f[1])||""),e=f[2],d=c.d||{};delete c.d}catch(h){}return{Zg:b,Bc:c,data:d,Qg:e}}function ad(a){a=$c(a).Bc;return"object"===typeof a&&a.hasOwnProperty("iat")?w(a,"iat"):null}function bd(a){a=$c(a);var b=a.Bc;return!!a.Qg&&!!b&&"object"===typeof b&&b.hasOwnProperty("iat")};function cd(a){this.W=a;this.g=a.n.g}function dd(a,b,c,d){var e=[],f=[];Oa(b,function(b){"child_changed"===b.type&&a.g.Ad(b.Ke,b.Ja)&&f.push(new D("child_moved",b.Ja,b.Wa))});ed(a,e,"child_removed",b,d,c);ed(a,e,"child_added",b,d,c);ed(a,e,"child_moved",f,d,c);ed(a,e,"child_changed",b,d,c);ed(a,e,Fb,b,d,c);return e}function ed(a,b,c,d,e,f){d=Pa(d,function(a){return a.type===c});Xa(d,q(a.hg,a));Oa(d,function(c){var d=fd(a,c,f);Oa(e,function(e){e.Kf(c.type)&&b.push(e.createEvent(d,a.W))})})}
	function fd(a,b,c){"value"!==b.type&&"child_removed"!==b.type&&(b.Qd=c.rf(b.Wa,b.Ja,a.g));return b}cd.prototype.hg=function(a,b){if(null==a.Wa||null==b.Wa)throw Fc("Should only compare child_ events.");return this.g.compare(new F(a.Wa,a.Ja),new F(b.Wa,b.Ja))};function gd(){this.bb={}}
	function hd(a,b){var c=b.type,d=b.Wa;K("child_added"==c||"child_changed"==c||"child_removed"==c,"Only child changes supported for tracking");K(".priority"!==d,"Only non-priority child changes can be tracked.");var e=w(a.bb,d);if(e){var f=e.type;if("child_added"==c&&"child_removed"==f)a.bb[d]=new D("child_changed",b.Ja,d,e.Ja);else if("child_removed"==c&&"child_added"==f)delete a.bb[d];else if("child_removed"==c&&"child_changed"==f)a.bb[d]=new D("child_removed",e.Ke,d);else if("child_changed"==c&&
	"child_added"==f)a.bb[d]=new D("child_added",b.Ja,d);else if("child_changed"==c&&"child_changed"==f)a.bb[d]=new D("child_changed",b.Ja,d,e.Ke);else throw Fc("Illegal combination of changes: "+b+" occurred after "+e);}else a.bb[d]=b};function id(a,b,c){this.Rb=a;this.pb=b;this.rb=c||null}g=id.prototype;g.Kf=function(a){return"value"===a};g.createEvent=function(a,b){var c=b.n.g;return new Gb("value",this,new Q(a.Ja,b.Ib(),c))};g.Vb=function(a){var b=this.rb;if("cancel"===a.ze()){K(this.pb,"Raising a cancel event on a listener with no cancel callback");var c=this.pb;return function(){c.call(b,a.error)}}var d=this.Rb;return function(){d.call(b,a.Zd)}};g.gf=function(a,b){return this.pb?new Hb(this,a,b):null};
	g.matches=function(a){return a instanceof id?a.Rb&&this.Rb?a.Rb===this.Rb&&a.rb===this.rb:!0:!1};g.tf=function(){return null!==this.Rb};function jd(a,b,c){this.ha=a;this.pb=b;this.rb=c}g=jd.prototype;g.Kf=function(a){a="children_added"===a?"child_added":a;return("children_removed"===a?"child_removed":a)in this.ha};g.gf=function(a,b){return this.pb?new Hb(this,a,b):null};
	g.createEvent=function(a,b){K(null!=a.Wa,"Child events should have a childName.");var c=b.Ib().u(a.Wa);return new Gb(a.type,this,new Q(a.Ja,c,b.n.g),a.Qd)};g.Vb=function(a){var b=this.rb;if("cancel"===a.ze()){K(this.pb,"Raising a cancel event on a listener with no cancel callback");var c=this.pb;return function(){c.call(b,a.error)}}var d=this.ha[a.ud];return function(){d.call(b,a.Zd,a.Qd)}};
	g.matches=function(a){if(a instanceof jd){if(!this.ha||!a.ha)return!0;if(this.rb===a.rb){var b=pa(a.ha);if(b===pa(this.ha)){if(1===b){var b=qa(a.ha),c=qa(this.ha);return c===b&&(!a.ha[b]||!this.ha[c]||a.ha[b]===this.ha[c])}return oa(this.ha,function(b,c){return a.ha[c]===b})}}}return!1};g.tf=function(){return null!==this.ha};function kd(a){this.g=a}g=kd.prototype;g.G=function(a,b,c,d,e,f){K(a.Jc(this.g),"A node must be indexed if only a child is updated");e=a.R(b);if(e.Q(d).ca(c.Q(d))&&e.e()==c.e())return a;null!=f&&(c.e()?a.Da(b)?hd(f,new D("child_removed",e,b)):K(a.K(),"A child remove without an old child only makes sense on a leaf node"):e.e()?hd(f,new D("child_added",c,b)):hd(f,new D("child_changed",c,b,e)));return a.K()&&c.e()?a:a.U(b,c).lb(this.g)};
	g.xa=function(a,b,c){null!=c&&(a.K()||a.P(N,function(a,e){b.Da(a)||hd(c,new D("child_removed",e,a))}),b.K()||b.P(N,function(b,e){if(a.Da(b)){var f=a.R(b);f.ca(e)||hd(c,new D("child_changed",e,b,f))}else hd(c,new D("child_added",e,b))}));return b.lb(this.g)};g.ga=function(a,b){return a.e()?C:a.ga(b)};g.Na=function(){return!1};g.Wb=function(){return this};function ld(a){this.Be=new kd(a.g);this.g=a.g;var b;a.ma?(b=md(a),b=a.g.Pc(nd(a),b)):b=a.g.Tc();this.ed=b;a.pa?(b=od(a),a=a.g.Pc(pd(a),b)):a=a.g.Qc();this.Gc=a}g=ld.prototype;g.matches=function(a){return 0>=this.g.compare(this.ed,a)&&0>=this.g.compare(a,this.Gc)};g.G=function(a,b,c,d,e,f){this.matches(new F(b,c))||(c=C);return this.Be.G(a,b,c,d,e,f)};
	g.xa=function(a,b,c){b.K()&&(b=C);var d=b.lb(this.g),d=d.ga(C),e=this;b.P(N,function(a,b){e.matches(new F(a,b))||(d=d.U(a,C))});return this.Be.xa(a,d,c)};g.ga=function(a){return a};g.Na=function(){return!0};g.Wb=function(){return this.Be};function qd(a){this.sa=new ld(a);this.g=a.g;K(a.ja,"Only valid if limit has been set");this.ka=a.ka;this.Jb=!rd(a)}g=qd.prototype;g.G=function(a,b,c,d,e,f){this.sa.matches(new F(b,c))||(c=C);return a.R(b).ca(c)?a:a.Db()<this.ka?this.sa.Wb().G(a,b,c,d,e,f):sd(this,a,b,c,e,f)};
	g.xa=function(a,b,c){var d;if(b.K()||b.e())d=C.lb(this.g);else if(2*this.ka<b.Db()&&b.Jc(this.g)){d=C.lb(this.g);b=this.Jb?b.$b(this.sa.Gc,this.g):b.Yb(this.sa.ed,this.g);for(var e=0;0<b.Pa.length&&e<this.ka;){var f=J(b),h;if(h=this.Jb?0>=this.g.compare(this.sa.ed,f):0>=this.g.compare(f,this.sa.Gc))d=d.U(f.name,f.S),e++;else break}}else{d=b.lb(this.g);d=d.ga(C);var k,l,m;if(this.Jb){b=d.sf(this.g);k=this.sa.Gc;l=this.sa.ed;var t=td(this.g);m=function(a,b){return t(b,a)}}else b=d.Xb(this.g),k=this.sa.ed,
	l=this.sa.Gc,m=td(this.g);for(var e=0,z=!1;0<b.Pa.length;)f=J(b),!z&&0>=m(k,f)&&(z=!0),(h=z&&e<this.ka&&0>=m(f,l))?e++:d=d.U(f.name,C)}return this.sa.Wb().xa(a,d,c)};g.ga=function(a){return a};g.Na=function(){return!0};g.Wb=function(){return this.sa.Wb()};
	function sd(a,b,c,d,e,f){var h;if(a.Jb){var k=td(a.g);h=function(a,b){return k(b,a)}}else h=td(a.g);K(b.Db()==a.ka,"");var l=new F(c,d),m=a.Jb?ud(b,a.g):vd(b,a.g),t=a.sa.matches(l);if(b.Da(c)){for(var z=b.R(c),m=e.ye(a.g,m,a.Jb);null!=m&&(m.name==c||b.Da(m.name));)m=e.ye(a.g,m,a.Jb);e=null==m?1:h(m,l);if(t&&!d.e()&&0<=e)return null!=f&&hd(f,new D("child_changed",d,c,z)),b.U(c,d);null!=f&&hd(f,new D("child_removed",z,c));b=b.U(c,C);return null!=m&&a.sa.matches(m)?(null!=f&&hd(f,new D("child_added",
	m.S,m.name)),b.U(m.name,m.S)):b}return d.e()?b:t&&0<=h(m,l)?(null!=f&&(hd(f,new D("child_removed",m.S,m.name)),hd(f,new D("child_added",d,c))),b.U(c,d).U(m.name,C)):b};function wd(a,b){this.je=a;this.fg=b}function xd(a){this.V=a}
	xd.prototype.ab=function(a,b,c,d){var e=new gd,f;if(b.type===Yb)b.source.we?c=yd(this,a,b.path,b.Ga,c,d,e):(K(b.source.pf,"Unknown source."),f=b.source.af||Jb(a.w())&&!b.path.e(),c=Ad(this,a,b.path,b.Ga,c,d,f,e));else if(b.type===Bd)b.source.we?c=Cd(this,a,b.path,b.children,c,d,e):(K(b.source.pf,"Unknown source."),f=b.source.af||Jb(a.w()),c=Dd(this,a,b.path,b.children,c,d,f,e));else if(b.type===Ed)if(b.Vd)if(b=b.path,null!=c.tc(b))c=a;else{f=new rb(c,a,d);d=a.O.j();if(b.e()||".priority"===E(b))Ib(a.w())?
	b=c.za(ub(a)):(b=a.w().j(),K(b instanceof R,"serverChildren would be complete if leaf node"),b=c.yc(b)),b=this.V.xa(d,b,e);else{var h=E(b),k=c.xc(h,a.w());null==k&&sb(a.w(),h)&&(k=d.R(h));b=null!=k?this.V.G(d,h,k,H(b),f,e):a.O.j().Da(h)?this.V.G(d,h,C,H(b),f,e):d;b.e()&&Ib(a.w())&&(d=c.za(ub(a)),d.K()&&(b=this.V.xa(b,d,e)))}d=Ib(a.w())||null!=c.tc(G);c=Fd(a,b,d,this.V.Na())}else c=Gd(this,a,b.path,b.Qb,c,d,e);else if(b.type===$b)d=b.path,b=a.w(),f=b.j(),h=b.ea||d.e(),c=Hd(this,new Id(a.O,new tb(f,
	h,b.Ub)),d,c,qb,e);else throw Fc("Unknown operation type: "+b.type);e=ra(e.bb);d=c;b=d.O;b.ea&&(f=b.j().K()||b.j().e(),h=Jd(a),(0<e.length||!a.O.ea||f&&!b.j().ca(h)||!b.j().C().ca(h.C()))&&e.push(Eb(Jd(d))));return new wd(c,e)};
	function Hd(a,b,c,d,e,f){var h=b.O;if(null!=d.tc(c))return b;var k;if(c.e())K(Ib(b.w()),"If change path is empty, we must have complete server data"),Jb(b.w())?(e=ub(b),d=d.yc(e instanceof R?e:C)):d=d.za(ub(b)),f=a.V.xa(b.O.j(),d,f);else{var l=E(c);if(".priority"==l)K(1==Kd(c),"Can't have a priority with additional path components"),f=h.j(),k=b.w().j(),d=d.ld(c,f,k),f=null!=d?a.V.ga(f,d):h.j();else{var m=H(c);sb(h,l)?(k=b.w().j(),d=d.ld(c,h.j(),k),d=null!=d?h.j().R(l).G(m,d):h.j().R(l)):d=d.xc(l,
	b.w());f=null!=d?a.V.G(h.j(),l,d,m,e,f):h.j()}}return Fd(b,f,h.ea||c.e(),a.V.Na())}function Ad(a,b,c,d,e,f,h,k){var l=b.w();h=h?a.V:a.V.Wb();if(c.e())d=h.xa(l.j(),d,null);else if(h.Na()&&!l.Ub)d=l.j().G(c,d),d=h.xa(l.j(),d,null);else{var m=E(c);if(!Kb(l,c)&&1<Kd(c))return b;var t=H(c);d=l.j().R(m).G(t,d);d=".priority"==m?h.ga(l.j(),d):h.G(l.j(),m,d,t,qb,null)}l=l.ea||c.e();b=new Id(b.O,new tb(d,l,h.Na()));return Hd(a,b,c,e,new rb(e,b,f),k)}
	function yd(a,b,c,d,e,f,h){var k=b.O;e=new rb(e,b,f);if(c.e())h=a.V.xa(b.O.j(),d,h),a=Fd(b,h,!0,a.V.Na());else if(f=E(c),".priority"===f)h=a.V.ga(b.O.j(),d),a=Fd(b,h,k.ea,k.Ub);else{c=H(c);var l=k.j().R(f);if(!c.e()){var m=e.qf(f);d=null!=m?".priority"===Ld(c)&&m.Q(c.parent()).e()?m:m.G(c,d):C}l.ca(d)?a=b:(h=a.V.G(k.j(),f,d,c,e,h),a=Fd(b,h,k.ea,a.V.Na()))}return a}
	function Cd(a,b,c,d,e,f,h){var k=b;Md(d,function(d,m){var t=c.u(d);sb(b.O,E(t))&&(k=yd(a,k,t,m,e,f,h))});Md(d,function(d,m){var t=c.u(d);sb(b.O,E(t))||(k=yd(a,k,t,m,e,f,h))});return k}function Nd(a,b){Md(b,function(b,d){a=a.G(b,d)});return a}
	function Dd(a,b,c,d,e,f,h,k){if(b.w().j().e()&&!Ib(b.w()))return b;var l=b;c=c.e()?d:Od(Pd,c,d);var m=b.w().j();c.children.ia(function(c,d){if(m.Da(c)){var I=b.w().j().R(c),I=Nd(I,d);l=Ad(a,l,new L(c),I,e,f,h,k)}});c.children.ia(function(c,d){var I=!sb(b.w(),c)&&null==d.value;m.Da(c)||I||(I=b.w().j().R(c),I=Nd(I,d),l=Ad(a,l,new L(c),I,e,f,h,k))});return l}
	function Gd(a,b,c,d,e,f,h){if(null!=e.tc(c))return b;var k=Jb(b.w()),l=b.w();if(null!=d.value){if(c.e()&&l.ea||Kb(l,c))return Ad(a,b,c,l.j().Q(c),e,f,k,h);if(c.e()){var m=Pd;l.j().P(Qd,function(a,b){m=m.set(new L(a),b)});return Dd(a,b,c,m,e,f,k,h)}return b}m=Pd;Md(d,function(a){var b=c.u(a);Kb(l,b)&&(m=m.set(a,l.j().Q(b)))});return Dd(a,b,c,m,e,f,k,h)};function Rd(){}var Sd={};function td(a){return q(a.compare,a)}Rd.prototype.Ad=function(a,b){return 0!==this.compare(new F("[MIN_NAME]",a),new F("[MIN_NAME]",b))};Rd.prototype.Tc=function(){return Td};function Ud(a){K(!a.e()&&".priority"!==E(a),"Can't create PathIndex with empty path or .priority key");this.cc=a}ma(Ud,Rd);g=Ud.prototype;g.Ic=function(a){return!a.Q(this.cc).e()};g.compare=function(a,b){var c=a.S.Q(this.cc),d=b.S.Q(this.cc),c=c.Dc(d);return 0===c?Vb(a.name,b.name):c};
	g.Pc=function(a,b){var c=M(a),c=C.G(this.cc,c);return new F(b,c)};g.Qc=function(){var a=C.G(this.cc,Vd);return new F("[MAX_NAME]",a)};g.toString=function(){return this.cc.slice().join("/")};function Wd(){}ma(Wd,Rd);g=Wd.prototype;g.compare=function(a,b){var c=a.S.C(),d=b.S.C(),c=c.Dc(d);return 0===c?Vb(a.name,b.name):c};g.Ic=function(a){return!a.C().e()};g.Ad=function(a,b){return!a.C().ca(b.C())};g.Tc=function(){return Td};g.Qc=function(){return new F("[MAX_NAME]",new tc("[PRIORITY-POST]",Vd))};
	g.Pc=function(a,b){var c=M(a);return new F(b,new tc("[PRIORITY-POST]",c))};g.toString=function(){return".priority"};var N=new Wd;function Xd(){}ma(Xd,Rd);g=Xd.prototype;g.compare=function(a,b){return Vb(a.name,b.name)};g.Ic=function(){throw Fc("KeyIndex.isDefinedOn not expected to be called.");};g.Ad=function(){return!1};g.Tc=function(){return Td};g.Qc=function(){return new F("[MAX_NAME]",C)};g.Pc=function(a){K(p(a),"KeyIndex indexValue must always be a string.");return new F(a,C)};g.toString=function(){return".key"};
	var Qd=new Xd;function Yd(){}ma(Yd,Rd);g=Yd.prototype;g.compare=function(a,b){var c=a.S.Dc(b.S);return 0===c?Vb(a.name,b.name):c};g.Ic=function(){return!0};g.Ad=function(a,b){return!a.ca(b)};g.Tc=function(){return Td};g.Qc=function(){return Zd};g.Pc=function(a,b){var c=M(a);return new F(b,c)};g.toString=function(){return".value"};var $d=new Yd;function ae(){this.Tb=this.pa=this.Lb=this.ma=this.ja=!1;this.ka=0;this.Nb="";this.ec=null;this.xb="";this.bc=null;this.vb="";this.g=N}var be=new ae;function rd(a){return""===a.Nb?a.ma:"l"===a.Nb}function nd(a){K(a.ma,"Only valid if start has been set");return a.ec}function md(a){K(a.ma,"Only valid if start has been set");return a.Lb?a.xb:"[MIN_NAME]"}function pd(a){K(a.pa,"Only valid if end has been set");return a.bc}
	function od(a){K(a.pa,"Only valid if end has been set");return a.Tb?a.vb:"[MAX_NAME]"}function ce(a){var b=new ae;b.ja=a.ja;b.ka=a.ka;b.ma=a.ma;b.ec=a.ec;b.Lb=a.Lb;b.xb=a.xb;b.pa=a.pa;b.bc=a.bc;b.Tb=a.Tb;b.vb=a.vb;b.g=a.g;return b}g=ae.prototype;g.He=function(a){var b=ce(this);b.ja=!0;b.ka=a;b.Nb="";return b};g.Ie=function(a){var b=ce(this);b.ja=!0;b.ka=a;b.Nb="l";return b};g.Je=function(a){var b=ce(this);b.ja=!0;b.ka=a;b.Nb="r";return b};
	g.$d=function(a,b){var c=ce(this);c.ma=!0;n(a)||(a=null);c.ec=a;null!=b?(c.Lb=!0,c.xb=b):(c.Lb=!1,c.xb="");return c};g.td=function(a,b){var c=ce(this);c.pa=!0;n(a)||(a=null);c.bc=a;n(b)?(c.Tb=!0,c.vb=b):(c.ah=!1,c.vb="");return c};function de(a,b){var c=ce(a);c.g=b;return c}function ee(a){var b={};a.ma&&(b.sp=a.ec,a.Lb&&(b.sn=a.xb));a.pa&&(b.ep=a.bc,a.Tb&&(b.en=a.vb));if(a.ja){b.l=a.ka;var c=a.Nb;""===c&&(c=rd(a)?"l":"r");b.vf=c}a.g!==N&&(b.i=a.g.toString());return b}
	function S(a){return!(a.ma||a.pa||a.ja)}function fe(a){return S(a)&&a.g==N}function ge(a){var b={};if(fe(a))return b;var c;a.g===N?c="$priority":a.g===$d?c="$value":a.g===Qd?c="$key":(K(a.g instanceof Ud,"Unrecognized index type!"),c=a.g.toString());b.orderBy=B(c);a.ma&&(b.startAt=B(a.ec),a.Lb&&(b.startAt+=","+B(a.xb)));a.pa&&(b.endAt=B(a.bc),a.Tb&&(b.endAt+=","+B(a.vb)));a.ja&&(rd(a)?b.limitToFirst=a.ka:b.limitToLast=a.ka);return b}g.toString=function(){return B(ee(this))};function he(a,b){this.Bd=a;this.dc=b}he.prototype.get=function(a){var b=w(this.Bd,a);if(!b)throw Error("No index defined for "+a);return b===Sd?null:b};function ie(a,b,c){var d=na(a.Bd,function(d,f){var h=w(a.dc,f);K(h,"Missing index implementation for "+f);if(d===Sd){if(h.Ic(b.S)){for(var k=[],l=c.Xb(Tb),m=J(l);m;)m.name!=b.name&&k.push(m),m=J(l);k.push(b);return je(k,td(h))}return Sd}h=c.get(b.name);k=d;h&&(k=k.remove(new F(b.name,h)));return k.Oa(b,b.S)});return new he(d,a.dc)}
	function ke(a,b,c){var d=na(a.Bd,function(a){if(a===Sd)return a;var d=c.get(b.name);return d?a.remove(new F(b.name,d)):a});return new he(d,a.dc)}var le=new he({".priority":Sd},{".priority":N});function tc(a,b){this.B=a;K(n(this.B)&&null!==this.B,"LeafNode shouldn't be created with null/undefined value.");this.aa=b||C;me(this.aa);this.Cb=null}var ne=["object","boolean","number","string"];g=tc.prototype;g.K=function(){return!0};g.C=function(){return this.aa};g.ga=function(a){return new tc(this.B,a)};g.R=function(a){return".priority"===a?this.aa:C};g.Q=function(a){return a.e()?this:".priority"===E(a)?this.aa:C};g.Da=function(){return!1};g.rf=function(){return null};
	g.U=function(a,b){return".priority"===a?this.ga(b):b.e()&&".priority"!==a?this:C.U(a,b).ga(this.aa)};g.G=function(a,b){var c=E(a);if(null===c)return b;if(b.e()&&".priority"!==c)return this;K(".priority"!==c||1===Kd(a),".priority must be the last token in a path");return this.U(c,C.G(H(a),b))};g.e=function(){return!1};g.Db=function(){return 0};g.P=function(){return!1};g.I=function(a){return a&&!this.C().e()?{".value":this.Ca(),".priority":this.C().I()}:this.Ca()};
	g.hash=function(){if(null===this.Cb){var a="";this.aa.e()||(a+="priority:"+oe(this.aa.I())+":");var b=typeof this.B,a=a+(b+":"),a="number"===b?a+Xc(this.B):a+this.B;this.Cb=Hc(a)}return this.Cb};g.Ca=function(){return this.B};g.Dc=function(a){if(a===C)return 1;if(a instanceof R)return-1;K(a.K(),"Unknown node type");var b=typeof a.B,c=typeof this.B,d=Na(ne,b),e=Na(ne,c);K(0<=d,"Unknown leaf type: "+b);K(0<=e,"Unknown leaf type: "+c);return d===e?"object"===c?0:this.B<a.B?-1:this.B===a.B?0:1:e-d};
	g.lb=function(){return this};g.Jc=function(){return!0};g.ca=function(a){return a===this?!0:a.K()?this.B===a.B&&this.aa.ca(a.aa):!1};g.toString=function(){return B(this.I(!0))};function R(a,b,c){this.m=a;(this.aa=b)&&me(this.aa);a.e()&&K(!this.aa||this.aa.e(),"An empty node cannot have a priority");this.wb=c;this.Cb=null}g=R.prototype;g.K=function(){return!1};g.C=function(){return this.aa||C};g.ga=function(a){return this.m.e()?this:new R(this.m,a,this.wb)};g.R=function(a){if(".priority"===a)return this.C();a=this.m.get(a);return null===a?C:a};g.Q=function(a){var b=E(a);return null===b?this:this.R(b).Q(H(a))};g.Da=function(a){return null!==this.m.get(a)};
	g.U=function(a,b){K(b,"We should always be passing snapshot nodes");if(".priority"===a)return this.ga(b);var c=new F(a,b),d,e;b.e()?(d=this.m.remove(a),c=ke(this.wb,c,this.m)):(d=this.m.Oa(a,b),c=ie(this.wb,c,this.m));e=d.e()?C:this.aa;return new R(d,e,c)};g.G=function(a,b){var c=E(a);if(null===c)return b;K(".priority"!==E(a)||1===Kd(a),".priority must be the last token in a path");var d=this.R(c).G(H(a),b);return this.U(c,d)};g.e=function(){return this.m.e()};g.Db=function(){return this.m.count()};
	var pe=/^(0|[1-9]\d*)$/;g=R.prototype;g.I=function(a){if(this.e())return null;var b={},c=0,d=0,e=!0;this.P(N,function(f,h){b[f]=h.I(a);c++;e&&pe.test(f)?d=Math.max(d,Number(f)):e=!1});if(!a&&e&&d<2*c){var f=[],h;for(h in b)f[h]=b[h];return f}a&&!this.C().e()&&(b[".priority"]=this.C().I());return b};g.hash=function(){if(null===this.Cb){var a="";this.C().e()||(a+="priority:"+oe(this.C().I())+":");this.P(N,function(b,c){var d=c.hash();""!==d&&(a+=":"+b+":"+d)});this.Cb=""===a?"":Hc(a)}return this.Cb};
	g.rf=function(a,b,c){return(c=qe(this,c))?(a=cc(c,new F(a,b)))?a.name:null:cc(this.m,a)};function ud(a,b){var c;c=(c=qe(a,b))?(c=c.Sc())&&c.name:a.m.Sc();return c?new F(c,a.m.get(c)):null}function vd(a,b){var c;c=(c=qe(a,b))?(c=c.fc())&&c.name:a.m.fc();return c?new F(c,a.m.get(c)):null}g.P=function(a,b){var c=qe(this,a);return c?c.ia(function(a){return b(a.name,a.S)}):this.m.ia(b)};g.Xb=function(a){return this.Yb(a.Tc(),a)};
	g.Yb=function(a,b){var c=qe(this,b);if(c)return c.Yb(a,function(a){return a});for(var c=this.m.Yb(a.name,Tb),d=ec(c);null!=d&&0>b.compare(d,a);)J(c),d=ec(c);return c};g.sf=function(a){return this.$b(a.Qc(),a)};g.$b=function(a,b){var c=qe(this,b);if(c)return c.$b(a,function(a){return a});for(var c=this.m.$b(a.name,Tb),d=ec(c);null!=d&&0<b.compare(d,a);)J(c),d=ec(c);return c};g.Dc=function(a){return this.e()?a.e()?0:-1:a.K()||a.e()?1:a===Vd?-1:0};
	g.lb=function(a){if(a===Qd||ta(this.wb.dc,a.toString()))return this;var b=this.wb,c=this.m;K(a!==Qd,"KeyIndex always exists and isn't meant to be added to the IndexMap.");for(var d=[],e=!1,c=c.Xb(Tb),f=J(c);f;)e=e||a.Ic(f.S),d.push(f),f=J(c);d=e?je(d,td(a)):Sd;e=a.toString();c=xa(b.dc);c[e]=a;a=xa(b.Bd);a[e]=d;return new R(this.m,this.aa,new he(a,c))};g.Jc=function(a){return a===Qd||ta(this.wb.dc,a.toString())};
	g.ca=function(a){if(a===this)return!0;if(a.K())return!1;if(this.C().ca(a.C())&&this.m.count()===a.m.count()){var b=this.Xb(N);a=a.Xb(N);for(var c=J(b),d=J(a);c&&d;){if(c.name!==d.name||!c.S.ca(d.S))return!1;c=J(b);d=J(a)}return null===c&&null===d}return!1};function qe(a,b){return b===Qd?null:a.wb.get(b.toString())}g.toString=function(){return B(this.I(!0))};function M(a,b){if(null===a)return C;var c=null;"object"===typeof a&&".priority"in a?c=a[".priority"]:"undefined"!==typeof b&&(c=b);K(null===c||"string"===typeof c||"number"===typeof c||"object"===typeof c&&".sv"in c,"Invalid priority type found: "+typeof c);"object"===typeof a&&".value"in a&&null!==a[".value"]&&(a=a[".value"]);if("object"!==typeof a||".sv"in a)return new tc(a,M(c));if(a instanceof Array){var d=C,e=a;r(e,function(a,b){if(v(e,b)&&"."!==b.substring(0,1)){var c=M(a);if(c.K()||!c.e())d=
	d.U(b,c)}});return d.ga(M(c))}var f=[],h=!1,k=a;ib(k,function(a){if("string"!==typeof a||"."!==a.substring(0,1)){var b=M(k[a]);b.e()||(h=h||!b.C().e(),f.push(new F(a,b)))}});if(0==f.length)return C;var l=je(f,Ub,function(a){return a.name},Wb);if(h){var m=je(f,td(N));return new R(l,M(c),new he({".priority":m},{".priority":N}))}return new R(l,M(c),le)}var re=Math.log(2);
	function se(a){this.count=parseInt(Math.log(a+1)/re,10);this.jf=this.count-1;this.eg=a+1&parseInt(Array(this.count+1).join("1"),2)}function te(a){var b=!(a.eg&1<<a.jf);a.jf--;return b}
	function je(a,b,c,d){function e(b,d){var f=d-b;if(0==f)return null;if(1==f){var m=a[b],t=c?c(m):m;return new fc(t,m.S,!1,null,null)}var m=parseInt(f/2,10)+b,f=e(b,m),z=e(m+1,d),m=a[m],t=c?c(m):m;return new fc(t,m.S,!1,f,z)}a.sort(b);var f=function(b){function d(b,h){var k=t-b,z=t;t-=b;var z=e(k+1,z),k=a[k],I=c?c(k):k,z=new fc(I,k.S,h,null,z);f?f.left=z:m=z;f=z}for(var f=null,m=null,t=a.length,z=0;z<b.count;++z){var I=te(b),zd=Math.pow(2,b.count-(z+1));I?d(zd,!1):(d(zd,!1),d(zd,!0))}return m}(new se(a.length));
	return null!==f?new ac(d||b,f):new ac(d||b)}function oe(a){return"number"===typeof a?"number:"+Xc(a):"string:"+a}function me(a){if(a.K()){var b=a.I();K("string"===typeof b||"number"===typeof b||"object"===typeof b&&v(b,".sv"),"Priority must be a string or number.")}else K(a===Vd||a.e(),"priority of unexpected type.");K(a===Vd||a.C().e(),"Priority nodes can't have a priority of their own.")}var C=new R(new ac(Wb),null,le);function ue(){R.call(this,new ac(Wb),C,le)}ma(ue,R);g=ue.prototype;
	g.Dc=function(a){return a===this?0:1};g.ca=function(a){return a===this};g.C=function(){return this};g.R=function(){return C};g.e=function(){return!1};var Vd=new ue,Td=new F("[MIN_NAME]",C),Zd=new F("[MAX_NAME]",Vd);function Id(a,b){this.O=a;this.Yd=b}function Fd(a,b,c,d){return new Id(new tb(b,c,d),a.Yd)}function Jd(a){return a.O.ea?a.O.j():null}Id.prototype.w=function(){return this.Yd};function ub(a){return a.Yd.ea?a.Yd.j():null};function ve(a,b){this.W=a;var c=a.n,d=new kd(c.g),c=S(c)?new kd(c.g):c.ja?new qd(c):new ld(c);this.Hf=new xd(c);var e=b.w(),f=b.O,h=d.xa(C,e.j(),null),k=c.xa(C,f.j(),null);this.Ka=new Id(new tb(k,f.ea,c.Na()),new tb(h,e.ea,d.Na()));this.Xa=[];this.lg=new cd(a)}function we(a){return a.W}g=ve.prototype;g.w=function(){return this.Ka.w().j()};g.fb=function(a){var b=ub(this.Ka);return b&&(S(this.W.n)||!a.e()&&!b.R(E(a)).e())?b.Q(a):null};g.e=function(){return 0===this.Xa.length};g.Pb=function(a){this.Xa.push(a)};
	g.jb=function(a,b){var c=[];if(b){K(null==a,"A cancel should cancel all event registrations.");var d=this.W.path;Oa(this.Xa,function(a){(a=a.gf(b,d))&&c.push(a)})}if(a){for(var e=[],f=0;f<this.Xa.length;++f){var h=this.Xa[f];if(!h.matches(a))e.push(h);else if(a.tf()){e=e.concat(this.Xa.slice(f+1));break}}this.Xa=e}else this.Xa=[];return c};
	g.ab=function(a,b,c){a.type===Bd&&null!==a.source.Hb&&(K(ub(this.Ka),"We should always have a full cache before handling merges"),K(Jd(this.Ka),"Missing event cache, even though we have a server cache"));var d=this.Ka;a=this.Hf.ab(d,a,b,c);b=this.Hf;c=a.je;K(c.O.j().Jc(b.V.g),"Event snap not indexed");K(c.w().j().Jc(b.V.g),"Server snap not indexed");K(Ib(a.je.w())||!Ib(d.w()),"Once a server snap is complete, it should never go back");this.Ka=a.je;return xe(this,a.fg,a.je.O.j(),null)};
	function ye(a,b){var c=a.Ka.O,d=[];c.j().K()||c.j().P(N,function(a,b){d.push(new D("child_added",b,a))});c.ea&&d.push(Eb(c.j()));return xe(a,d,c.j(),b)}function xe(a,b,c,d){return dd(a.lg,b,c,d?[d]:a.Xa)};function ze(a,b,c){this.type=Bd;this.source=a;this.path=b;this.children=c}ze.prototype.Xc=function(a){if(this.path.e())return a=this.children.subtree(new L(a)),a.e()?null:a.value?new Xb(this.source,G,a.value):new ze(this.source,G,a);K(E(this.path)===a,"Can't get a merge for a child not on the path of the operation");return new ze(this.source,H(this.path),this.children)};ze.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"};function Ae(a,b){this.f=Mc("p:rest:");this.F=a;this.Gb=b;this.Aa=null;this.$={}}function Be(a,b){if(n(b))return"tag$"+b;K(fe(a.n),"should have a tag if it's not a default query.");return a.path.toString()}g=Ae.prototype;
	g.yf=function(a,b,c,d){var e=a.path.toString();this.f("Listen called for "+e+" "+a.va());var f=Be(a,c),h={};this.$[f]=h;a=ge(a.n);var k=this;Ce(this,e+".json",a,function(a,b){var t=b;404===a&&(a=t=null);null===a&&k.Gb(e,t,!1,c);w(k.$,f)===h&&d(a?401==a?"permission_denied":"rest_error:"+a:"ok",null)})};g.Rf=function(a,b){var c=Be(a,b);delete this.$[c]};g.M=function(a,b){this.Aa=a;var c=$c(a),d=c.data,c=c.Bc&&c.Bc.exp;b&&b("ok",{auth:d,expires:c})};g.ge=function(a){this.Aa=null;a("ok",null)};g.Me=function(){};
	g.Cf=function(){};g.Jd=function(){};g.put=function(){};g.zf=function(){};g.Ue=function(){};
	function Ce(a,b,c,d){c=c||{};c.format="export";a.Aa&&(c.auth=a.Aa);var e=(a.F.kb?"https://":"http://")+a.F.host+b+"?"+kb(c);a.f("Sending REST request for "+e);var f=new XMLHttpRequest;f.onreadystatechange=function(){if(d&&4===f.readyState){a.f("REST Response for "+e+" received. status:",f.status,"response:",f.responseText);var b=null;if(200<=f.status&&300>f.status){try{b=nb(f.responseText)}catch(c){O("Failed to parse JSON response for "+e+": "+f.responseText)}d(null,b)}else 401!==f.status&&404!==
	f.status&&O("Got unsuccessful REST response for "+e+" Status: "+f.status),d(f.status);d=null}};f.open("GET",e,!0);f.send()};function De(a){K(ea(a)&&0<a.length,"Requires a non-empty array");this.Xf=a;this.Oc={}}De.prototype.fe=function(a,b){var c;c=this.Oc[a]||[];var d=c.length;if(0<d){for(var e=Array(d),f=0;f<d;f++)e[f]=c[f];c=e}else c=[];for(d=0;d<c.length;d++)c[d].zc.apply(c[d].Ma,Array.prototype.slice.call(arguments,1))};De.prototype.Eb=function(a,b,c){Ee(this,a);this.Oc[a]=this.Oc[a]||[];this.Oc[a].push({zc:b,Ma:c});(a=this.Ae(a))&&b.apply(c,a)};
	De.prototype.ic=function(a,b,c){Ee(this,a);a=this.Oc[a]||[];for(var d=0;d<a.length;d++)if(a[d].zc===b&&(!c||c===a[d].Ma)){a.splice(d,1);break}};function Ee(a,b){K(Ta(a.Xf,function(a){return a===b}),"Unknown event: "+b)};var Fe=function(){var a=0,b=[];return function(c){var d=c===a;a=c;for(var e=Array(8),f=7;0<=f;f--)e[f]="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(c%64),c=Math.floor(c/64);K(0===c,"Cannot push at time == 0");c=e.join("");if(d){for(f=11;0<=f&&63===b[f];f--)b[f]=0;b[f]++}else for(f=0;12>f;f++)b[f]=Math.floor(64*Math.random());for(f=0;12>f;f++)c+="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);K(20===c.length,"nextPushId: Length should be 20.");
	return c}}();function Ge(){De.call(this,["online"]);this.kc=!0;if("undefined"!==typeof window&&"undefined"!==typeof window.addEventListener){var a=this;window.addEventListener("online",function(){a.kc||(a.kc=!0,a.fe("online",!0))},!1);window.addEventListener("offline",function(){a.kc&&(a.kc=!1,a.fe("online",!1))},!1)}}ma(Ge,De);Ge.prototype.Ae=function(a){K("online"===a,"Unknown event type: "+a);return[this.kc]};ca(Ge);function He(){De.call(this,["visible"]);var a,b;"undefined"!==typeof document&&"undefined"!==typeof document.addEventListener&&("undefined"!==typeof document.hidden?(b="visibilitychange",a="hidden"):"undefined"!==typeof document.mozHidden?(b="mozvisibilitychange",a="mozHidden"):"undefined"!==typeof document.msHidden?(b="msvisibilitychange",a="msHidden"):"undefined"!==typeof document.webkitHidden&&(b="webkitvisibilitychange",a="webkitHidden"));this.Ob=!0;if(b){var c=this;document.addEventListener(b,
	function(){var b=!document[a];b!==c.Ob&&(c.Ob=b,c.fe("visible",b))},!1)}}ma(He,De);He.prototype.Ae=function(a){K("visible"===a,"Unknown event type: "+a);return[this.Ob]};ca(He);function L(a,b){if(1==arguments.length){this.o=a.split("/");for(var c=0,d=0;d<this.o.length;d++)0<this.o[d].length&&(this.o[c]=this.o[d],c++);this.o.length=c;this.Z=0}else this.o=a,this.Z=b}function T(a,b){var c=E(a);if(null===c)return b;if(c===E(b))return T(H(a),H(b));throw Error("INTERNAL ERROR: innerPath ("+b+") is not within outerPath ("+a+")");}
	function Ie(a,b){for(var c=a.slice(),d=b.slice(),e=0;e<c.length&&e<d.length;e++){var f=Vb(c[e],d[e]);if(0!==f)return f}return c.length===d.length?0:c.length<d.length?-1:1}function E(a){return a.Z>=a.o.length?null:a.o[a.Z]}function Kd(a){return a.o.length-a.Z}function H(a){var b=a.Z;b<a.o.length&&b++;return new L(a.o,b)}function Ld(a){return a.Z<a.o.length?a.o[a.o.length-1]:null}g=L.prototype;
	g.toString=function(){for(var a="",b=this.Z;b<this.o.length;b++)""!==this.o[b]&&(a+="/"+this.o[b]);return a||"/"};g.slice=function(a){return this.o.slice(this.Z+(a||0))};g.parent=function(){if(this.Z>=this.o.length)return null;for(var a=[],b=this.Z;b<this.o.length-1;b++)a.push(this.o[b]);return new L(a,0)};
	g.u=function(a){for(var b=[],c=this.Z;c<this.o.length;c++)b.push(this.o[c]);if(a instanceof L)for(c=a.Z;c<a.o.length;c++)b.push(a.o[c]);else for(a=a.split("/"),c=0;c<a.length;c++)0<a[c].length&&b.push(a[c]);return new L(b,0)};g.e=function(){return this.Z>=this.o.length};g.ca=function(a){if(Kd(this)!==Kd(a))return!1;for(var b=this.Z,c=a.Z;b<=this.o.length;b++,c++)if(this.o[b]!==a.o[c])return!1;return!0};
	g.contains=function(a){var b=this.Z,c=a.Z;if(Kd(this)>Kd(a))return!1;for(;b<this.o.length;){if(this.o[b]!==a.o[c])return!1;++b;++c}return!0};var G=new L("");function Je(a,b){this.Qa=a.slice();this.Ha=Math.max(1,this.Qa.length);this.lf=b;for(var c=0;c<this.Qa.length;c++)this.Ha+=Zc(this.Qa[c]);Ke(this)}Je.prototype.push=function(a){0<this.Qa.length&&(this.Ha+=1);this.Qa.push(a);this.Ha+=Zc(a);Ke(this)};Je.prototype.pop=function(){var a=this.Qa.pop();this.Ha-=Zc(a);0<this.Qa.length&&--this.Ha};
	function Ke(a){if(768<a.Ha)throw Error(a.lf+"has a key path longer than 768 bytes ("+a.Ha+").");if(32<a.Qa.length)throw Error(a.lf+"path specified exceeds the maximum depth that can be written (32) or object contains a cycle "+Le(a));}function Le(a){return 0==a.Qa.length?"":"in property '"+a.Qa.join(".")+"'"};function Me(a,b){this.value=a;this.children=b||Ne}var Ne=new ac(function(a,b){return a===b?0:a<b?-1:1});function Oe(a){var b=Pd;r(a,function(a,d){b=b.set(new L(d),a)});return b}g=Me.prototype;g.e=function(){return null===this.value&&this.children.e()};function Pe(a,b,c){if(null!=a.value&&c(a.value))return{path:G,value:a.value};if(b.e())return null;var d=E(b);a=a.children.get(d);return null!==a?(b=Pe(a,H(b),c),null!=b?{path:(new L(d)).u(b.path),value:b.value}:null):null}
	function Qe(a,b){return Pe(a,b,function(){return!0})}g.subtree=function(a){if(a.e())return this;var b=this.children.get(E(a));return null!==b?b.subtree(H(a)):Pd};g.set=function(a,b){if(a.e())return new Me(b,this.children);var c=E(a),d=(this.children.get(c)||Pd).set(H(a),b),c=this.children.Oa(c,d);return new Me(this.value,c)};
	g.remove=function(a){if(a.e())return this.children.e()?Pd:new Me(null,this.children);var b=E(a),c=this.children.get(b);return c?(a=c.remove(H(a)),b=a.e()?this.children.remove(b):this.children.Oa(b,a),null===this.value&&b.e()?Pd:new Me(this.value,b)):this};g.get=function(a){if(a.e())return this.value;var b=this.children.get(E(a));return b?b.get(H(a)):null};
	function Od(a,b,c){if(b.e())return c;var d=E(b);b=Od(a.children.get(d)||Pd,H(b),c);d=b.e()?a.children.remove(d):a.children.Oa(d,b);return new Me(a.value,d)}function Re(a,b){return Se(a,G,b)}function Se(a,b,c){var d={};a.children.ia(function(a,f){d[a]=Se(f,b.u(a),c)});return c(b,a.value,d)}function Te(a,b,c){return Ue(a,b,G,c)}function Ue(a,b,c,d){var e=a.value?d(c,a.value):!1;if(e)return e;if(b.e())return null;e=E(b);return(a=a.children.get(e))?Ue(a,H(b),c.u(e),d):null}
	function Ve(a,b,c){We(a,b,G,c)}function We(a,b,c,d){if(b.e())return a;a.value&&d(c,a.value);var e=E(b);return(a=a.children.get(e))?We(a,H(b),c.u(e),d):Pd}function Md(a,b){Xe(a,G,b)}function Xe(a,b,c){a.children.ia(function(a,e){Xe(e,b.u(a),c)});a.value&&c(b,a.value)}function Ye(a,b){a.children.ia(function(a,d){d.value&&b(a,d.value)})}var Pd=new Me(null);Me.prototype.toString=function(){var a={};Md(this,function(b,c){a[b.toString()]=c.toString()});return B(a)};function Ze(a,b,c){this.type=Ed;this.source=$e;this.path=a;this.Qb=b;this.Vd=c}Ze.prototype.Xc=function(a){if(this.path.e()){if(null!=this.Qb.value)return K(this.Qb.children.e(),"affectedTree should not have overlapping affected paths."),this;a=this.Qb.subtree(new L(a));return new Ze(G,a,this.Vd)}K(E(this.path)===a,"operationForChild called for unrelated child.");return new Ze(H(this.path),this.Qb,this.Vd)};
	Ze.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" ack write revert="+this.Vd+" affectedTree="+this.Qb+")"};var Yb=0,Bd=1,Ed=2,$b=3;function af(a,b,c,d){this.we=a;this.pf=b;this.Hb=c;this.af=d;K(!d||b,"Tagged queries must be from server.")}var $e=new af(!0,!1,null,!1),bf=new af(!1,!0,null,!1);af.prototype.toString=function(){return this.we?"user":this.af?"server(queryID="+this.Hb+")":"server"};function cf(a){this.X=a}var df=new cf(new Me(null));function ef(a,b,c){if(b.e())return new cf(new Me(c));var d=Qe(a.X,b);if(null!=d){var e=d.path,d=d.value;b=T(e,b);d=d.G(b,c);return new cf(a.X.set(e,d))}a=Od(a.X,b,new Me(c));return new cf(a)}function ff(a,b,c){var d=a;ib(c,function(a,c){d=ef(d,b.u(a),c)});return d}cf.prototype.Rd=function(a){if(a.e())return df;a=Od(this.X,a,Pd);return new cf(a)};function gf(a,b){var c=Qe(a.X,b);return null!=c?a.X.get(c.path).Q(T(c.path,b)):null}
	function hf(a){var b=[],c=a.X.value;null!=c?c.K()||c.P(N,function(a,c){b.push(new F(a,c))}):a.X.children.ia(function(a,c){null!=c.value&&b.push(new F(a,c.value))});return b}function jf(a,b){if(b.e())return a;var c=gf(a,b);return null!=c?new cf(new Me(c)):new cf(a.X.subtree(b))}cf.prototype.e=function(){return this.X.e()};cf.prototype.apply=function(a){return kf(G,this.X,a)};
	function kf(a,b,c){if(null!=b.value)return c.G(a,b.value);var d=null;b.children.ia(function(b,f){".priority"===b?(K(null!==f.value,"Priority writes must always be leaf nodes"),d=f.value):c=kf(a.u(b),f,c)});c.Q(a).e()||null===d||(c=c.G(a.u(".priority"),d));return c};function lf(){this.T=df;this.na=[];this.Mc=-1}function mf(a,b){for(var c=0;c<a.na.length;c++){var d=a.na[c];if(d.kd===b)return d}return null}g=lf.prototype;
	g.Rd=function(a){var b=Ua(this.na,function(b){return b.kd===a});K(0<=b,"removeWrite called with nonexistent writeId.");var c=this.na[b];this.na.splice(b,1);for(var d=c.visible,e=!1,f=this.na.length-1;d&&0<=f;){var h=this.na[f];h.visible&&(f>=b&&nf(h,c.path)?d=!1:c.path.contains(h.path)&&(e=!0));f--}if(d){if(e)this.T=of(this.na,pf,G),this.Mc=0<this.na.length?this.na[this.na.length-1].kd:-1;else if(c.Ga)this.T=this.T.Rd(c.path);else{var k=this;r(c.children,function(a,b){k.T=k.T.Rd(c.path.u(b))})}return!0}return!1};
	g.za=function(a,b,c,d){if(c||d){var e=jf(this.T,a);return!d&&e.e()?b:d||null!=b||null!=gf(e,G)?(e=of(this.na,function(b){return(b.visible||d)&&(!c||!(0<=Na(c,b.kd)))&&(b.path.contains(a)||a.contains(b.path))},a),b=b||C,e.apply(b)):null}e=gf(this.T,a);if(null!=e)return e;e=jf(this.T,a);return e.e()?b:null!=b||null!=gf(e,G)?(b=b||C,e.apply(b)):null};
	g.yc=function(a,b){var c=C,d=gf(this.T,a);if(d)d.K()||d.P(N,function(a,b){c=c.U(a,b)});else if(b){var e=jf(this.T,a);b.P(N,function(a,b){var d=jf(e,new L(a)).apply(b);c=c.U(a,d)});Oa(hf(e),function(a){c=c.U(a.name,a.S)})}else e=jf(this.T,a),Oa(hf(e),function(a){c=c.U(a.name,a.S)});return c};g.ld=function(a,b,c,d){K(c||d,"Either existingEventSnap or existingServerSnap must exist");a=a.u(b);if(null!=gf(this.T,a))return null;a=jf(this.T,a);return a.e()?d.Q(b):a.apply(d.Q(b))};
	g.xc=function(a,b,c){a=a.u(b);var d=gf(this.T,a);return null!=d?d:sb(c,b)?jf(this.T,a).apply(c.j().R(b)):null};g.tc=function(a){return gf(this.T,a)};g.ne=function(a,b,c,d,e,f){var h;a=jf(this.T,a);h=gf(a,G);if(null==h)if(null!=b)h=a.apply(b);else return[];h=h.lb(f);if(h.e()||h.K())return[];b=[];a=td(f);e=e?h.$b(c,f):h.Yb(c,f);for(f=J(e);f&&b.length<d;)0!==a(f,c)&&b.push(f),f=J(e);return b};
	function nf(a,b){return a.Ga?a.path.contains(b):!!ua(a.children,function(c,d){return a.path.u(d).contains(b)})}function pf(a){return a.visible}
	function of(a,b,c){for(var d=df,e=0;e<a.length;++e){var f=a[e];if(b(f)){var h=f.path;if(f.Ga)c.contains(h)?(h=T(c,h),d=ef(d,h,f.Ga)):h.contains(c)&&(h=T(h,c),d=ef(d,G,f.Ga.Q(h)));else if(f.children)if(c.contains(h))h=T(c,h),d=ff(d,h,f.children);else{if(h.contains(c))if(h=T(h,c),h.e())d=ff(d,G,f.children);else if(f=w(f.children,E(h)))f=f.Q(H(h)),d=ef(d,G,f)}else throw Fc("WriteRecord should have .snap or .children");}}return d}function qf(a,b){this.Mb=a;this.X=b}g=qf.prototype;
	g.za=function(a,b,c){return this.X.za(this.Mb,a,b,c)};g.yc=function(a){return this.X.yc(this.Mb,a)};g.ld=function(a,b,c){return this.X.ld(this.Mb,a,b,c)};g.tc=function(a){return this.X.tc(this.Mb.u(a))};g.ne=function(a,b,c,d,e){return this.X.ne(this.Mb,a,b,c,d,e)};g.xc=function(a,b){return this.X.xc(this.Mb,a,b)};g.u=function(a){return new qf(this.Mb.u(a),this.X)};function rf(){this.ya={}}g=rf.prototype;g.e=function(){return wa(this.ya)};g.ab=function(a,b,c){var d=a.source.Hb;if(null!==d)return d=w(this.ya,d),K(null!=d,"SyncTree gave us an op for an invalid query."),d.ab(a,b,c);var e=[];r(this.ya,function(d){e=e.concat(d.ab(a,b,c))});return e};g.Pb=function(a,b,c,d,e){var f=a.va(),h=w(this.ya,f);if(!h){var h=c.za(e?d:null),k=!1;h?k=!0:(h=d instanceof R?c.yc(d):C,k=!1);h=new ve(a,new Id(new tb(h,k,!1),new tb(d,e,!1)));this.ya[f]=h}h.Pb(b);return ye(h,b)};
	g.jb=function(a,b,c){var d=a.va(),e=[],f=[],h=null!=sf(this);if("default"===d){var k=this;r(this.ya,function(a,d){f=f.concat(a.jb(b,c));a.e()&&(delete k.ya[d],S(a.W.n)||e.push(a.W))})}else{var l=w(this.ya,d);l&&(f=f.concat(l.jb(b,c)),l.e()&&(delete this.ya[d],S(l.W.n)||e.push(l.W)))}h&&null==sf(this)&&e.push(new U(a.k,a.path));return{Kg:e,mg:f}};function tf(a){return Pa(ra(a.ya),function(a){return!S(a.W.n)})}g.fb=function(a){var b=null;r(this.ya,function(c){b=b||c.fb(a)});return b};
	function uf(a,b){if(S(b.n))return sf(a);var c=b.va();return w(a.ya,c)}function sf(a){return va(a.ya,function(a){return S(a.W.n)})||null};function vf(a){this.ta=Pd;this.ib=new lf;this.$e={};this.mc={};this.Nc=a}function wf(a,b,c,d,e){var f=a.ib,h=e;K(d>f.Mc,"Stacking an older write on top of newer ones");n(h)||(h=!0);f.na.push({path:b,Ga:c,kd:d,visible:h});h&&(f.T=ef(f.T,b,c));f.Mc=d;return e?xf(a,new Xb($e,b,c)):[]}function yf(a,b,c,d){var e=a.ib;K(d>e.Mc,"Stacking an older merge on top of newer ones");e.na.push({path:b,children:c,kd:d,visible:!0});e.T=ff(e.T,b,c);e.Mc=d;c=Oe(c);return xf(a,new ze($e,b,c))}
	function zf(a,b,c){c=c||!1;var d=mf(a.ib,b);if(a.ib.Rd(b)){var e=Pd;null!=d.Ga?e=e.set(G,!0):ib(d.children,function(a,b){e=e.set(new L(a),b)});return xf(a,new Ze(d.path,e,c))}return[]}function Af(a,b,c){c=Oe(c);return xf(a,new ze(bf,b,c))}function Bf(a,b,c,d){d=Cf(a,d);if(null!=d){var e=Df(d);d=e.path;e=e.Hb;b=T(d,b);c=new Xb(new af(!1,!0,e,!0),b,c);return Ef(a,d,c)}return[]}
	function Ff(a,b,c,d){if(d=Cf(a,d)){var e=Df(d);d=e.path;e=e.Hb;b=T(d,b);c=Oe(c);c=new ze(new af(!1,!0,e,!0),b,c);return Ef(a,d,c)}return[]}
	vf.prototype.Pb=function(a,b){var c=a.path,d=null,e=!1;Ve(this.ta,c,function(a,b){var f=T(a,c);d=d||b.fb(f);e=e||null!=sf(b)});var f=this.ta.get(c);f?(e=e||null!=sf(f),d=d||f.fb(G)):(f=new rf,this.ta=this.ta.set(c,f));var h;null!=d?h=!0:(h=!1,d=C,Ye(this.ta.subtree(c),function(a,b){var c=b.fb(G);c&&(d=d.U(a,c))}));var k=null!=uf(f,a);if(!k&&!S(a.n)){var l=Gf(a);K(!(l in this.mc),"View does not exist, but we have a tag");var m=Hf++;this.mc[l]=m;this.$e["_"+m]=l}h=f.Pb(a,b,new qf(c,this.ib),d,h);k||
	e||(f=uf(f,a),h=h.concat(If(this,a,f)));return h};
	vf.prototype.jb=function(a,b,c){var d=a.path,e=this.ta.get(d),f=[];if(e&&("default"===a.va()||null!=uf(e,a))){f=e.jb(a,b,c);e.e()&&(this.ta=this.ta.remove(d));e=f.Kg;f=f.mg;b=-1!==Ua(e,function(a){return S(a.n)});var h=Te(this.ta,d,function(a,b){return null!=sf(b)});if(b&&!h&&(d=this.ta.subtree(d),!d.e()))for(var d=Jf(d),k=0;k<d.length;++k){var l=d[k],m=l.W,l=Kf(this,l);this.Nc.Xe(Lf(m),Mf(this,m),l.xd,l.H)}if(!h&&0<e.length&&!c)if(b)this.Nc.ae(Lf(a),null);else{var t=this;Oa(e,function(a){a.va();
	var b=t.mc[Gf(a)];t.Nc.ae(Lf(a),b)})}Nf(this,e)}return f};vf.prototype.za=function(a,b){var c=this.ib,d=Te(this.ta,a,function(b,c){var d=T(b,a);if(d=c.fb(d))return d});return c.za(a,d,b,!0)};function Jf(a){return Re(a,function(a,c,d){if(c&&null!=sf(c))return[sf(c)];var e=[];c&&(e=tf(c));r(d,function(a){e=e.concat(a)});return e})}function Nf(a,b){for(var c=0;c<b.length;++c){var d=b[c];if(!S(d.n)){var d=Gf(d),e=a.mc[d];delete a.mc[d];delete a.$e["_"+e]}}}
	function Lf(a){return S(a.n)&&!fe(a.n)?a.Ib():a}function If(a,b,c){var d=b.path,e=Mf(a,b);c=Kf(a,c);b=a.Nc.Xe(Lf(b),e,c.xd,c.H);d=a.ta.subtree(d);if(e)K(null==sf(d.value),"If we're adding a query, it shouldn't be shadowed");else for(e=Re(d,function(a,b,c){if(!a.e()&&b&&null!=sf(b))return[we(sf(b))];var d=[];b&&(d=d.concat(Qa(tf(b),function(a){return a.W})));r(c,function(a){d=d.concat(a)});return d}),d=0;d<e.length;++d)c=e[d],a.Nc.ae(Lf(c),Mf(a,c));return b}
	function Kf(a,b){var c=b.W,d=Mf(a,c);return{xd:function(){return(b.w()||C).hash()},H:function(b){if("ok"===b){if(d){var f=c.path;if(b=Cf(a,d)){var h=Df(b);b=h.path;h=h.Hb;f=T(b,f);f=new Zb(new af(!1,!0,h,!0),f);b=Ef(a,b,f)}else b=[]}else b=xf(a,new Zb(bf,c.path));return b}f="Unknown Error";"too_big"===b?f="The data requested exceeds the maximum size that can be accessed with a single request.":"permission_denied"==b?f="Client doesn't have permission to access the desired data.":"unavailable"==b&&
	(f="The service is unavailable");f=Error(b+": "+f);f.code=b.toUpperCase();return a.jb(c,null,f)}}}function Gf(a){return a.path.toString()+"$"+a.va()}function Df(a){var b=a.indexOf("$");K(-1!==b&&b<a.length-1,"Bad queryKey.");return{Hb:a.substr(b+1),path:new L(a.substr(0,b))}}function Cf(a,b){var c=a.$e,d="_"+b;return d in c?c[d]:void 0}function Mf(a,b){var c=Gf(b);return w(a.mc,c)}var Hf=1;
	function Ef(a,b,c){var d=a.ta.get(b);K(d,"Missing sync point for query tag that we're tracking");return d.ab(c,new qf(b,a.ib),null)}function xf(a,b){return Of(a,b,a.ta,null,new qf(G,a.ib))}function Of(a,b,c,d,e){if(b.path.e())return Pf(a,b,c,d,e);var f=c.get(G);null==d&&null!=f&&(d=f.fb(G));var h=[],k=E(b.path),l=b.Xc(k);if((c=c.children.get(k))&&l)var m=d?d.R(k):null,k=e.u(k),h=h.concat(Of(a,l,c,m,k));f&&(h=h.concat(f.ab(b,e,d)));return h}
	function Pf(a,b,c,d,e){var f=c.get(G);null==d&&null!=f&&(d=f.fb(G));var h=[];c.children.ia(function(c,f){var m=d?d.R(c):null,t=e.u(c),z=b.Xc(c);z&&(h=h.concat(Pf(a,z,f,m,t)))});f&&(h=h.concat(f.ab(b,e,d)));return h};function Qf(){this.children={};this.nd=0;this.value=null}function Rf(a,b,c){this.Gd=a?a:"";this.Zc=b?b:null;this.A=c?c:new Qf}function Sf(a,b){for(var c=b instanceof L?b:new L(b),d=a,e;null!==(e=E(c));)d=new Rf(e,d,w(d.A.children,e)||new Qf),c=H(c);return d}g=Rf.prototype;g.Ca=function(){return this.A.value};function Tf(a,b){K("undefined"!==typeof b,"Cannot set value to undefined");a.A.value=b;Uf(a)}g.clear=function(){this.A.value=null;this.A.children={};this.A.nd=0;Uf(this)};
	g.wd=function(){return 0<this.A.nd};g.e=function(){return null===this.Ca()&&!this.wd()};g.P=function(a){var b=this;r(this.A.children,function(c,d){a(new Rf(d,b,c))})};function Vf(a,b,c,d){c&&!d&&b(a);a.P(function(a){Vf(a,b,!0,d)});c&&d&&b(a)}function Wf(a,b){for(var c=a.parent();null!==c&&!b(c);)c=c.parent()}g.path=function(){return new L(null===this.Zc?this.Gd:this.Zc.path()+"/"+this.Gd)};g.name=function(){return this.Gd};g.parent=function(){return this.Zc};
	function Uf(a){if(null!==a.Zc){var b=a.Zc,c=a.Gd,d=a.e(),e=v(b.A.children,c);d&&e?(delete b.A.children[c],b.A.nd--,Uf(b)):d||e||(b.A.children[c]=a.A,b.A.nd++,Uf(b))}};var Xf=/[\[\].#$\/\u0000-\u001F\u007F]/,Yf=/[\[\].#$\u0000-\u001F\u007F]/,Zf=/^[a-zA-Z][a-zA-Z._\-+]+$/;function $f(a){return p(a)&&0!==a.length&&!Xf.test(a)}function ag(a){return null===a||p(a)||ga(a)&&!Qc(a)||ia(a)&&v(a,".sv")}function bg(a,b,c,d){d&&!n(b)||cg(y(a,1,d),b,c)}
	function cg(a,b,c){c instanceof L&&(c=new Je(c,a));if(!n(b))throw Error(a+"contains undefined "+Le(c));if(ha(b))throw Error(a+"contains a function "+Le(c)+" with contents: "+b.toString());if(Qc(b))throw Error(a+"contains "+b.toString()+" "+Le(c));if(p(b)&&b.length>10485760/3&&10485760<Zc(b))throw Error(a+"contains a string greater than 10485760 utf8 bytes "+Le(c)+" ('"+b.substring(0,50)+"...')");if(ia(b)){var d=!1,e=!1;ib(b,function(b,h){if(".value"===b)d=!0;else if(".priority"!==b&&".sv"!==b&&(e=
	!0,!$f(b)))throw Error(a+" contains an invalid key ("+b+") "+Le(c)+'.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');c.push(b);cg(a,h,c);c.pop()});if(d&&e)throw Error(a+' contains ".value" child '+Le(c)+" in addition to actual children.");}}
	function dg(a,b){var c,d;for(c=0;c<b.length;c++){d=b[c];for(var e=d.slice(),f=0;f<e.length;f++)if((".priority"!==e[f]||f!==e.length-1)&&!$f(e[f]))throw Error(a+"contains an invalid key ("+e[f]+") in path "+d.toString()+'. Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');}b.sort(Ie);e=null;for(c=0;c<b.length;c++){d=b[c];if(null!==e&&e.contains(d))throw Error(a+"contains a path "+e.toString()+" that is ancestor of another path "+d.toString());e=d}}
	function eg(a,b,c){var d=y(a,1,!1);if(!ia(b)||ea(b))throw Error(d+" must be an object containing the children to replace.");var e=[];ib(b,function(a,b){var k=new L(a);cg(d,b,c.u(k));if(".priority"===Ld(k)&&!ag(b))throw Error(d+"contains an invalid value for '"+k.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");e.push(k)});dg(d,e)}
	function fg(a,b,c){if(Qc(c))throw Error(y(a,b,!1)+"is "+c.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!ag(c))throw Error(y(a,b,!1)+"must be a valid Firebase priority (a string, finite number, server value, or null).");}
	function gg(a,b,c){if(!c||n(b))switch(b){case "value":case "child_added":case "child_removed":case "child_changed":case "child_moved":break;default:throw Error(y(a,1,c)+'must be a valid event type: "value", "child_added", "child_removed", "child_changed", or "child_moved".');}}function hg(a,b){if(n(b)&&!$f(b))throw Error(y(a,2,!0)+'was an invalid key: "'+b+'".  Firebase keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").');}
	function ig(a,b){if(!p(b)||0===b.length||Yf.test(b))throw Error(y(a,1,!1)+'was an invalid path: "'+b+'". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"');}function jg(a,b){if(".info"===E(b))throw Error(a+" failed: Can't modify data under /.info/");}function kg(a,b){if(!p(b))throw Error(y(a,1,!1)+"must be a valid credential (a string).");}function lg(a,b,c){if(!p(c))throw Error(y(a,b,!1)+"must be a valid string.");}
	function mg(a,b){lg(a,1,b);if(!Zf.test(b))throw Error(y(a,1,!1)+"'"+b+"' is not a valid authentication provider.");}function ng(a,b,c,d){if(!d||n(c))if(!ia(c)||null===c)throw Error(y(a,b,d)+"must be a valid object.");}function og(a,b,c){if(!ia(b)||!v(b,c))throw Error(y(a,1,!1)+'must contain the key "'+c+'"');if(!p(w(b,c)))throw Error(y(a,1,!1)+'must contain the key "'+c+'" with type "string"');};function pg(){this.set={}}g=pg.prototype;g.add=function(a,b){this.set[a]=null!==b?b:!0};g.contains=function(a){return v(this.set,a)};g.get=function(a){return this.contains(a)?this.set[a]:void 0};g.remove=function(a){delete this.set[a]};g.clear=function(){this.set={}};g.e=function(){return wa(this.set)};g.count=function(){return pa(this.set)};function qg(a,b){r(a.set,function(a,d){b(d,a)})}g.keys=function(){var a=[];r(this.set,function(b,c){a.push(c)});return a};function qc(){this.m=this.B=null}qc.prototype.find=function(a){if(null!=this.B)return this.B.Q(a);if(a.e()||null==this.m)return null;var b=E(a);a=H(a);return this.m.contains(b)?this.m.get(b).find(a):null};qc.prototype.nc=function(a,b){if(a.e())this.B=b,this.m=null;else if(null!==this.B)this.B=this.B.G(a,b);else{null==this.m&&(this.m=new pg);var c=E(a);this.m.contains(c)||this.m.add(c,new qc);c=this.m.get(c);a=H(a);c.nc(a,b)}};
	function rg(a,b){if(b.e())return a.B=null,a.m=null,!0;if(null!==a.B){if(a.B.K())return!1;var c=a.B;a.B=null;c.P(N,function(b,c){a.nc(new L(b),c)});return rg(a,b)}return null!==a.m?(c=E(b),b=H(b),a.m.contains(c)&&rg(a.m.get(c),b)&&a.m.remove(c),a.m.e()?(a.m=null,!0):!1):!0}function rc(a,b,c){null!==a.B?c(b,a.B):a.P(function(a,e){var f=new L(b.toString()+"/"+a);rc(e,f,c)})}qc.prototype.P=function(a){null!==this.m&&qg(this.m,function(b,c){a(b,c)})};var sg="auth.firebase.com";function tg(a,b,c){this.od=a||{};this.ee=b||{};this.$a=c||{};this.od.remember||(this.od.remember="default")}var ug=["remember","redirectTo"];function vg(a){var b={},c={};ib(a||{},function(a,e){0<=Na(ug,a)?b[a]=e:c[a]=e});return new tg(b,{},c)};function wg(a,b){this.Qe=["session",a.Od,a.hc].join(":");this.be=b}wg.prototype.set=function(a,b){if(!b)if(this.be.length)b=this.be[0];else throw Error("fb.login.SessionManager : No storage options available!");b.set(this.Qe,a)};wg.prototype.get=function(){var a=Qa(this.be,q(this.qg,this)),a=Pa(a,function(a){return null!==a});Xa(a,function(a,c){return ad(c.token)-ad(a.token)});return 0<a.length?a.shift():null};wg.prototype.qg=function(a){try{var b=a.get(this.Qe);if(b&&b.token)return b}catch(c){}return null};
	wg.prototype.clear=function(){var a=this;Oa(this.be,function(b){b.remove(a.Qe)})};function xg(){return"undefined"!==typeof navigator&&"string"===typeof navigator.userAgent?navigator.userAgent:""}function yg(){return"undefined"!==typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(xg())}function zg(){return"undefined"!==typeof location&&/^file:\//.test(location.href)}
	function Ag(a){var b=xg();if(""===b)return!1;if("Microsoft Internet Explorer"===navigator.appName){if((b=b.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/))&&1<b.length)return parseFloat(b[1])>=a}else if(-1<b.indexOf("Trident")&&(b=b.match(/rv:([0-9]{2,2}[\.0-9]{0,})/))&&1<b.length)return parseFloat(b[1])>=a;return!1};function Bg(){var a=window.opener.frames,b;for(b=a.length-1;0<=b;b--)try{if(a[b].location.protocol===window.location.protocol&&a[b].location.host===window.location.host&&"__winchan_relay_frame"===a[b].name)return a[b]}catch(c){}return null}function Cg(a,b,c){a.attachEvent?a.attachEvent("on"+b,c):a.addEventListener&&a.addEventListener(b,c,!1)}function Dg(a,b,c){a.detachEvent?a.detachEvent("on"+b,c):a.removeEventListener&&a.removeEventListener(b,c,!1)}
	function Eg(a){/^https?:\/\//.test(a)||(a=window.location.href);var b=/^(https?:\/\/[\-_a-zA-Z\.0-9:]+)/.exec(a);return b?b[1]:a}function Fg(a){var b="";try{a=a.replace("#","");var c=lb(a);c&&v(c,"__firebase_request_key")&&(b=w(c,"__firebase_request_key"))}catch(d){}return b}function Gg(){var a=Pc(sg);return a.scheme+"://"+a.host+"/v2"}function Hg(a){return Gg()+"/"+a+"/auth/channel"};function Ig(a){var b=this;this.Ac=a;this.ce="*";Ag(8)?this.Rc=this.zd=Bg():(this.Rc=window.opener,this.zd=window);if(!b.Rc)throw"Unable to find relay frame";Cg(this.zd,"message",q(this.jc,this));Cg(this.zd,"message",q(this.Bf,this));try{Jg(this,{a:"ready"})}catch(c){Cg(this.Rc,"load",function(){Jg(b,{a:"ready"})})}Cg(window,"unload",q(this.Bg,this))}function Jg(a,b){b=B(b);Ag(8)?a.Rc.doPost(b,a.ce):a.Rc.postMessage(b,a.ce)}
	Ig.prototype.jc=function(a){var b=this,c;try{c=nb(a.data)}catch(d){}c&&"request"===c.a&&(Dg(window,"message",this.jc),this.ce=a.origin,this.Ac&&setTimeout(function(){b.Ac(b.ce,c.d,function(a,c){b.dg=!c;b.Ac=void 0;Jg(b,{a:"response",d:a,forceKeepWindowOpen:c})})},0))};Ig.prototype.Bg=function(){try{Dg(this.zd,"message",this.Bf)}catch(a){}this.Ac&&(Jg(this,{a:"error",d:"unknown closed window"}),this.Ac=void 0);try{window.close()}catch(b){}};Ig.prototype.Bf=function(a){if(this.dg&&"die"===a.data)try{window.close()}catch(b){}};function Kg(a){this.pc=Ga()+Ga()+Ga();this.Ef=a}Kg.prototype.open=function(a,b){yc.set("redirect_request_id",this.pc);yc.set("redirect_request_id",this.pc);b.requestId=this.pc;b.redirectTo=b.redirectTo||window.location.href;a+=(/\?/.test(a)?"":"?")+kb(b);window.location=a};Kg.isAvailable=function(){return!zg()&&!yg()};Kg.prototype.Cc=function(){return"redirect"};var Lg={NETWORK_ERROR:"Unable to contact the Firebase server.",SERVER_ERROR:"An unknown server error occurred.",TRANSPORT_UNAVAILABLE:"There are no login transports available for the requested method.",REQUEST_INTERRUPTED:"The browser redirected the page before the login request could complete.",USER_CANCELLED:"The user cancelled authentication."};function Mg(a){var b=Error(w(Lg,a),a);b.code=a;return b};function Ng(a){var b;(b=!a.window_features)||(b=xg(),b=-1!==b.indexOf("Fennec/")||-1!==b.indexOf("Firefox/")&&-1!==b.indexOf("Android"));b&&(a.window_features=void 0);a.window_name||(a.window_name="_blank");this.options=a}
	Ng.prototype.open=function(a,b,c){function d(a){h&&(document.body.removeChild(h),h=void 0);t&&(t=clearInterval(t));Dg(window,"message",e);Dg(window,"unload",d);if(m&&!a)try{m.close()}catch(b){k.postMessage("die",l)}m=k=void 0}function e(a){if(a.origin===l)try{var b=nb(a.data);"ready"===b.a?k.postMessage(z,l):"error"===b.a?(d(!1),c&&(c(b.d),c=null)):"response"===b.a&&(d(b.forceKeepWindowOpen),c&&(c(null,b.d),c=null))}catch(e){}}var f=Ag(8),h,k;if(!this.options.relay_url)return c(Error("invalid arguments: origin of url and relay_url must match"));
	var l=Eg(a);if(l!==Eg(this.options.relay_url))c&&setTimeout(function(){c(Error("invalid arguments: origin of url and relay_url must match"))},0);else{f&&(h=document.createElement("iframe"),h.setAttribute("src",this.options.relay_url),h.style.display="none",h.setAttribute("name","__winchan_relay_frame"),document.body.appendChild(h),k=h.contentWindow);a+=(/\?/.test(a)?"":"?")+kb(b);var m=window.open(a,this.options.window_name,this.options.window_features);k||(k=m);var t=setInterval(function(){m&&m.closed&&
	(d(!1),c&&(c(Mg("USER_CANCELLED")),c=null))},500),z=B({a:"request",d:b});Cg(window,"unload",d);Cg(window,"message",e)}};
	Ng.isAvailable=function(){var a;if(a="postMessage"in window&&!zg())(a=yg()||"undefined"!==typeof navigator&&(!!xg().match(/Windows Phone/)||!!window.Windows&&/^ms-appx:/.test(location.href)))||(a=xg(),a="undefined"!==typeof navigator&&"undefined"!==typeof window&&!!(a.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i)||a.match(/CriOS/)||a.match(/Twitter for iPhone/)||a.match(/FBAN\/FBIOS/)||window.navigator.standalone)),a=!a;return a&&!xg().match(/PhantomJS/)};Ng.prototype.Cc=function(){return"popup"};function Og(a){a.method||(a.method="GET");a.headers||(a.headers={});a.headers.content_type||(a.headers.content_type="application/json");a.headers.content_type=a.headers.content_type.toLowerCase();this.options=a}
	Og.prototype.open=function(a,b,c){function d(){c&&(c(Mg("REQUEST_INTERRUPTED")),c=null)}var e=new XMLHttpRequest,f=this.options.method.toUpperCase(),h;Cg(window,"beforeunload",d);e.onreadystatechange=function(){if(c&&4===e.readyState){var a;if(200<=e.status&&300>e.status){try{a=nb(e.responseText)}catch(b){}c(null,a)}else 500<=e.status&&600>e.status?c(Mg("SERVER_ERROR")):c(Mg("NETWORK_ERROR"));c=null;Dg(window,"beforeunload",d)}};if("GET"===f)a+=(/\?/.test(a)?"":"?")+kb(b),h=null;else{var k=this.options.headers.content_type;
	"application/json"===k&&(h=B(b));"application/x-www-form-urlencoded"===k&&(h=kb(b))}e.open(f,a,!0);a={"X-Requested-With":"XMLHttpRequest",Accept:"application/json;text/plain"};za(a,this.options.headers);for(var l in a)e.setRequestHeader(l,a[l]);e.send(h)};Og.isAvailable=function(){var a;if(a=!!window.XMLHttpRequest)a=xg(),a=!(a.match(/MSIE/)||a.match(/Trident/))||Ag(10);return a};Og.prototype.Cc=function(){return"json"};function Pg(a){this.pc=Ga()+Ga()+Ga();this.Ef=a}
	Pg.prototype.open=function(a,b,c){function d(){c&&(c(Mg("USER_CANCELLED")),c=null)}var e=this,f=Pc(sg),h;b.requestId=this.pc;b.redirectTo=f.scheme+"://"+f.host+"/blank/page.html";a+=/\?/.test(a)?"":"?";a+=kb(b);(h=window.open(a,"_blank","location=no"))&&ha(h.addEventListener)?(h.addEventListener("loadstart",function(a){var b;if(b=a&&a.url)a:{try{var m=document.createElement("a");m.href=a.url;b=m.host===f.host&&"/blank/page.html"===m.pathname;break a}catch(t){}b=!1}b&&(a=Fg(a.url),h.removeEventListener("exit",
	d),h.close(),a=new tg(null,null,{requestId:e.pc,requestKey:a}),e.Ef.requestWithCredential("/auth/session",a,c),c=null)}),h.addEventListener("exit",d)):c(Mg("TRANSPORT_UNAVAILABLE"))};Pg.isAvailable=function(){return yg()};Pg.prototype.Cc=function(){return"redirect"};function Qg(a){a.callback_parameter||(a.callback_parameter="callback");this.options=a;window.__firebase_auth_jsonp=window.__firebase_auth_jsonp||{}}
	Qg.prototype.open=function(a,b,c){function d(){c&&(c(Mg("REQUEST_INTERRUPTED")),c=null)}function e(){setTimeout(function(){window.__firebase_auth_jsonp[f]=void 0;wa(window.__firebase_auth_jsonp)&&(window.__firebase_auth_jsonp=void 0);try{var a=document.getElementById(f);a&&a.parentNode.removeChild(a)}catch(b){}},1);Dg(window,"beforeunload",d)}var f="fn"+(new Date).getTime()+Math.floor(99999*Math.random());b[this.options.callback_parameter]="__firebase_auth_jsonp."+f;a+=(/\?/.test(a)?"":"?")+kb(b);
	Cg(window,"beforeunload",d);window.__firebase_auth_jsonp[f]=function(a){c&&(c(null,a),c=null);e()};Rg(f,a,c)};
	function Rg(a,b,c){setTimeout(function(){try{var d=document.createElement("script");d.type="text/javascript";d.id=a;d.async=!0;d.src=b;d.onerror=function(){var b=document.getElementById(a);null!==b&&b.parentNode.removeChild(b);c&&c(Mg("NETWORK_ERROR"))};var e=document.getElementsByTagName("head");(e&&0!=e.length?e[0]:document.documentElement).appendChild(d)}catch(f){c&&c(Mg("NETWORK_ERROR"))}},0)}Qg.isAvailable=function(){return"undefined"!==typeof document&&null!=document.createElement};
	Qg.prototype.Cc=function(){return"json"};function Sg(a,b,c,d){De.call(this,["auth_status"]);this.F=a;this.df=b;this.Vg=c;this.Le=d;this.sc=new wg(a,[xc,yc]);this.mb=null;this.Se=!1;Tg(this)}ma(Sg,De);g=Sg.prototype;g.xe=function(){return this.mb||null};function Tg(a){yc.get("redirect_request_id")&&Ug(a);var b=a.sc.get();b&&b.token?(Vg(a,b),a.df(b.token,function(c,d){Wg(a,c,d,!1,b.token,b)},function(b,d){Xg(a,"resumeSession()",b,d)})):Vg(a,null)}
	function Yg(a,b,c,d,e,f){"firebaseio-demo.com"===a.F.domain&&O("Firebase authentication is not supported on demo Firebases (*.firebaseio-demo.com). To secure your Firebase, create a production Firebase at https://www.firebase.com.");a.df(b,function(f,k){Wg(a,f,k,!0,b,c,d||{},e)},function(b,c){Xg(a,"auth()",b,c,f)})}function Zg(a,b){a.sc.clear();Vg(a,null);a.Vg(function(a,d){if("ok"===a)P(b,null);else{var e=(a||"error").toUpperCase(),f=e;d&&(f+=": "+d);f=Error(f);f.code=e;P(b,f)}})}
	function Wg(a,b,c,d,e,f,h,k){"ok"===b?(d&&(b=c.auth,f.auth=b,f.expires=c.expires,f.token=bd(e)?e:"",c=null,b&&v(b,"uid")?c=w(b,"uid"):v(f,"uid")&&(c=w(f,"uid")),f.uid=c,c="custom",b&&v(b,"provider")?c=w(b,"provider"):v(f,"provider")&&(c=w(f,"provider")),f.provider=c,a.sc.clear(),bd(e)&&(h=h||{},c=xc,"sessionOnly"===h.remember&&(c=yc),"none"!==h.remember&&a.sc.set(f,c)),Vg(a,f)),P(k,null,f)):(a.sc.clear(),Vg(a,null),f=a=(b||"error").toUpperCase(),c&&(f+=": "+c),f=Error(f),f.code=a,P(k,f))}
	function Xg(a,b,c,d,e){O(b+" was canceled: "+d);a.sc.clear();Vg(a,null);a=Error(d);a.code=c.toUpperCase();P(e,a)}function $g(a,b,c,d,e){ah(a);c=new tg(d||{},{},c||{});bh(a,[Og,Qg],"/auth/"+b,c,e)}
	function ch(a,b,c,d){ah(a);var e=[Ng,Pg];c=vg(c);"anonymous"===b||"password"===b?setTimeout(function(){P(d,Mg("TRANSPORT_UNAVAILABLE"))},0):(c.ee.window_features="menubar=yes,modal=yes,alwaysRaised=yeslocation=yes,resizable=yes,scrollbars=yes,status=yes,height=625,width=625,top="+("object"===typeof screen?.5*(screen.height-625):0)+",left="+("object"===typeof screen?.5*(screen.width-625):0),c.ee.relay_url=Hg(a.F.hc),c.ee.requestWithCredential=q(a.qc,a),bh(a,e,"/auth/"+b,c,d))}
	function Ug(a){var b=yc.get("redirect_request_id");if(b){var c=yc.get("redirect_client_options");yc.remove("redirect_request_id");yc.remove("redirect_client_options");var d=[Og,Qg],b={requestId:b,requestKey:Fg(document.location.hash)},c=new tg(c,{},b);a.Se=!0;try{document.location.hash=document.location.hash.replace(/&__firebase_request_key=([a-zA-z0-9]*)/,"")}catch(e){}bh(a,d,"/auth/session",c,function(){this.Se=!1}.bind(a))}}
	g.se=function(a,b){ah(this);var c=vg(a);c.$a._method="POST";this.qc("/users",c,function(a,c){a?P(b,a):P(b,a,c)})};g.Te=function(a,b){var c=this;ah(this);var d="/users/"+encodeURIComponent(a.email),e=vg(a);e.$a._method="DELETE";this.qc(d,e,function(a,d){!a&&d&&d.uid&&c.mb&&c.mb.uid&&c.mb.uid===d.uid&&Zg(c);P(b,a)})};g.pe=function(a,b){ah(this);var c="/users/"+encodeURIComponent(a.email)+"/password",d=vg(a);d.$a._method="PUT";d.$a.password=a.newPassword;this.qc(c,d,function(a){P(b,a)})};
	g.oe=function(a,b){ah(this);var c="/users/"+encodeURIComponent(a.oldEmail)+"/email",d=vg(a);d.$a._method="PUT";d.$a.email=a.newEmail;d.$a.password=a.password;this.qc(c,d,function(a){P(b,a)})};g.Ve=function(a,b){ah(this);var c="/users/"+encodeURIComponent(a.email)+"/password",d=vg(a);d.$a._method="POST";this.qc(c,d,function(a){P(b,a)})};g.qc=function(a,b,c){dh(this,[Og,Qg],a,b,c)};
	function bh(a,b,c,d,e){dh(a,b,c,d,function(b,c){!b&&c&&c.token&&c.uid?Yg(a,c.token,c,d.od,function(a,b){a?P(e,a):P(e,null,b)}):P(e,b||Mg("UNKNOWN_ERROR"))})}
	function dh(a,b,c,d,e){b=Pa(b,function(a){return"function"===typeof a.isAvailable&&a.isAvailable()});0===b.length?setTimeout(function(){P(e,Mg("TRANSPORT_UNAVAILABLE"))},0):(b=new (b.shift())(d.ee),d=jb(d.$a),d.v="js-"+hb,d.transport=b.Cc(),d.suppress_status_codes=!0,a=Gg()+"/"+a.F.hc+c,b.open(a,d,function(a,b){if(a)P(e,a);else if(b&&b.error){var c=Error(b.error.message);c.code=b.error.code;c.details=b.error.details;P(e,c)}else P(e,null,b)}))}
	function Vg(a,b){var c=null!==a.mb||null!==b;a.mb=b;c&&a.fe("auth_status",b);a.Le(null!==b)}g.Ae=function(a){K("auth_status"===a,'initial event must be of type "auth_status"');return this.Se?null:[this.mb]};function ah(a){var b=a.F;if("firebaseio.com"!==b.domain&&"firebaseio-demo.com"!==b.domain&&"auth.firebase.com"===sg)throw Error("This custom Firebase server ('"+a.F.domain+"') does not support delegated login.");};var Cc="websocket",Dc="long_polling";function eh(a){this.jc=a;this.Nd=[];this.Sb=0;this.qe=-1;this.Fb=null}function fh(a,b,c){a.qe=b;a.Fb=c;a.qe<a.Sb&&(a.Fb(),a.Fb=null)}function gh(a,b,c){for(a.Nd[b]=c;a.Nd[a.Sb];){var d=a.Nd[a.Sb];delete a.Nd[a.Sb];for(var e=0;e<d.length;++e)if(d[e]){var f=a;Db(function(){f.jc(d[e])})}if(a.Sb===a.qe){a.Fb&&(clearTimeout(a.Fb),a.Fb(),a.Fb=null);break}a.Sb++}};function hh(a,b,c,d){this.re=a;this.f=Mc(a);this.nb=this.ob=0;this.Ua=Rb(b);this.Qf=c;this.Hc=!1;this.Bb=d;this.jd=function(a){return Bc(b,Dc,a)}}var ih,jh;
	hh.prototype.open=function(a,b){this.hf=0;this.la=b;this.Af=new eh(a);this.zb=!1;var c=this;this.qb=setTimeout(function(){c.f("Timed out trying to connect.");c.gb();c.qb=null},Math.floor(3E4));Rc(function(){if(!c.zb){c.Sa=new kh(function(a,b,d,k,l){lh(c,arguments);if(c.Sa)if(c.qb&&(clearTimeout(c.qb),c.qb=null),c.Hc=!0,"start"==a)c.id=b,c.Gf=d;else if("close"===a)b?(c.Sa.Xd=!1,fh(c.Af,b,function(){c.gb()})):c.gb();else throw Error("Unrecognized command received: "+a);},function(a,b){lh(c,arguments);
	gh(c.Af,a,b)},function(){c.gb()},c.jd);var a={start:"t"};a.ser=Math.floor(1E8*Math.random());c.Sa.he&&(a.cb=c.Sa.he);a.v="5";c.Qf&&(a.s=c.Qf);c.Bb&&(a.ls=c.Bb);"undefined"!==typeof location&&location.href&&-1!==location.href.indexOf("firebaseio.com")&&(a.r="f");a=c.jd(a);c.f("Connecting via long-poll to "+a);mh(c.Sa,a,function(){})}})};
	hh.prototype.start=function(){var a=this.Sa,b=this.Gf;a.ug=this.id;a.vg=b;for(a.le=!0;nh(a););a=this.id;b=this.Gf;this.gc=document.createElement("iframe");var c={dframe:"t"};c.id=a;c.pw=b;this.gc.src=this.jd(c);this.gc.style.display="none";document.body.appendChild(this.gc)};
	hh.isAvailable=function(){return ih||!jh&&"undefined"!==typeof document&&null!=document.createElement&&!("object"===typeof window&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))&&!("object"===typeof Windows&&"object"===typeof Windows.Xg)&&!0};g=hh.prototype;g.Ed=function(){};g.dd=function(){this.zb=!0;this.Sa&&(this.Sa.close(),this.Sa=null);this.gc&&(document.body.removeChild(this.gc),this.gc=null);this.qb&&(clearTimeout(this.qb),this.qb=null)};
	g.gb=function(){this.zb||(this.f("Longpoll is closing itself"),this.dd(),this.la&&(this.la(this.Hc),this.la=null))};g.close=function(){this.zb||(this.f("Longpoll is being closed."),this.dd())};g.send=function(a){a=B(a);this.ob+=a.length;Ob(this.Ua,"bytes_sent",a.length);a=Ic(a);a=fb(a,!0);a=Vc(a,1840);for(var b=0;b<a.length;b++){var c=this.Sa;c.ad.push({Mg:this.hf,Ug:a.length,kf:a[b]});c.le&&nh(c);this.hf++}};function lh(a,b){var c=B(b).length;a.nb+=c;Ob(a.Ua,"bytes_received",c)}
	function kh(a,b,c,d){this.jd=d;this.hb=c;this.Pe=new pg;this.ad=[];this.te=Math.floor(1E8*Math.random());this.Xd=!0;this.he=Ec();window["pLPCommand"+this.he]=a;window["pRTLPCB"+this.he]=b;a=document.createElement("iframe");a.style.display="none";if(document.body){document.body.appendChild(a);try{a.contentWindow.document||Cb("No IE domain setting required")}catch(e){a.src="javascript:void((function(){document.open();document.domain='"+document.domain+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";
	a.contentDocument?a.eb=a.contentDocument:a.contentWindow?a.eb=a.contentWindow.document:a.document&&(a.eb=a.document);this.Ea=a;a="";this.Ea.src&&"javascript:"===this.Ea.src.substr(0,11)&&(a='<script>document.domain="'+document.domain+'";\x3c/script>');a="<html><body>"+a+"</body></html>";try{this.Ea.eb.open(),this.Ea.eb.write(a),this.Ea.eb.close()}catch(f){Cb("frame writing exception"),f.stack&&Cb(f.stack),Cb(f)}}
	kh.prototype.close=function(){this.le=!1;if(this.Ea){this.Ea.eb.body.innerHTML="";var a=this;setTimeout(function(){null!==a.Ea&&(document.body.removeChild(a.Ea),a.Ea=null)},Math.floor(0))}var b=this.hb;b&&(this.hb=null,b())};
	function nh(a){if(a.le&&a.Xd&&a.Pe.count()<(0<a.ad.length?2:1)){a.te++;var b={};b.id=a.ug;b.pw=a.vg;b.ser=a.te;for(var b=a.jd(b),c="",d=0;0<a.ad.length;)if(1870>=a.ad[0].kf.length+30+c.length){var e=a.ad.shift(),c=c+"&seg"+d+"="+e.Mg+"&ts"+d+"="+e.Ug+"&d"+d+"="+e.kf;d++}else break;oh(a,b+c,a.te);return!0}return!1}function oh(a,b,c){function d(){a.Pe.remove(c);nh(a)}a.Pe.add(c,1);var e=setTimeout(d,Math.floor(25E3));mh(a,b,function(){clearTimeout(e);d()})}
	function mh(a,b,c){setTimeout(function(){try{if(a.Xd){var d=a.Ea.eb.createElement("script");d.type="text/javascript";d.async=!0;d.src=b;d.onload=d.onreadystatechange=function(){var a=d.readyState;a&&"loaded"!==a&&"complete"!==a||(d.onload=d.onreadystatechange=null,d.parentNode&&d.parentNode.removeChild(d),c())};d.onerror=function(){Cb("Long-poll script failed to load: "+b);a.Xd=!1;a.close()};a.Ea.eb.body.appendChild(d)}}catch(e){}},Math.floor(1))};var ph=null;"undefined"!==typeof MozWebSocket?ph=MozWebSocket:"undefined"!==typeof WebSocket&&(ph=WebSocket);function qh(a,b,c,d){this.re=a;this.f=Mc(this.re);this.frames=this.Kc=null;this.nb=this.ob=this.bf=0;this.Ua=Rb(b);a={v:"5"};"undefined"!==typeof location&&location.href&&-1!==location.href.indexOf("firebaseio.com")&&(a.r="f");c&&(a.s=c);d&&(a.ls=d);this.ef=Bc(b,Cc,a)}var rh;
	qh.prototype.open=function(a,b){this.hb=b;this.zg=a;this.f("Websocket connecting to "+this.ef);this.Hc=!1;xc.set("previous_websocket_failure",!0);try{this.ua=new ph(this.ef)}catch(c){this.f("Error instantiating WebSocket.");var d=c.message||c.data;d&&this.f(d);this.gb();return}var e=this;this.ua.onopen=function(){e.f("Websocket connected.");e.Hc=!0};this.ua.onclose=function(){e.f("Websocket connection was disconnected.");e.ua=null;e.gb()};this.ua.onmessage=function(a){if(null!==e.ua)if(a=a.data,e.nb+=
	a.length,Ob(e.Ua,"bytes_received",a.length),sh(e),null!==e.frames)th(e,a);else{a:{K(null===e.frames,"We already have a frame buffer");if(6>=a.length){var b=Number(a);if(!isNaN(b)){e.bf=b;e.frames=[];a=null;break a}}e.bf=1;e.frames=[]}null!==a&&th(e,a)}};this.ua.onerror=function(a){e.f("WebSocket error.  Closing connection.");(a=a.message||a.data)&&e.f(a);e.gb()}};qh.prototype.start=function(){};
	qh.isAvailable=function(){var a=!1;if("undefined"!==typeof navigator&&navigator.userAgent){var b=navigator.userAgent.match(/Android ([0-9]{0,}\.[0-9]{0,})/);b&&1<b.length&&4.4>parseFloat(b[1])&&(a=!0)}return!a&&null!==ph&&!rh};qh.responsesRequiredToBeHealthy=2;qh.healthyTimeout=3E4;g=qh.prototype;g.Ed=function(){xc.remove("previous_websocket_failure")};function th(a,b){a.frames.push(b);if(a.frames.length==a.bf){var c=a.frames.join("");a.frames=null;c=nb(c);a.zg(c)}}
	g.send=function(a){sh(this);a=B(a);this.ob+=a.length;Ob(this.Ua,"bytes_sent",a.length);a=Vc(a,16384);1<a.length&&this.ua.send(String(a.length));for(var b=0;b<a.length;b++)this.ua.send(a[b])};g.dd=function(){this.zb=!0;this.Kc&&(clearInterval(this.Kc),this.Kc=null);this.ua&&(this.ua.close(),this.ua=null)};g.gb=function(){this.zb||(this.f("WebSocket is closing itself"),this.dd(),this.hb&&(this.hb(this.Hc),this.hb=null))};g.close=function(){this.zb||(this.f("WebSocket is being closed"),this.dd())};
	function sh(a){clearInterval(a.Kc);a.Kc=setInterval(function(){a.ua&&a.ua.send("0");sh(a)},Math.floor(45E3))};function uh(a){vh(this,a)}var wh=[hh,qh];function vh(a,b){var c=qh&&qh.isAvailable(),d=c&&!(xc.wf||!0===xc.get("previous_websocket_failure"));b.Wg&&(c||O("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),d=!0);if(d)a.gd=[qh];else{var e=a.gd=[];Wc(wh,function(a,b){b&&b.isAvailable()&&e.push(b)})}}function xh(a){if(0<a.gd.length)return a.gd[0];throw Error("No transports available");};function yh(a,b,c,d,e,f,h){this.id=a;this.f=Mc("c:"+this.id+":");this.jc=c;this.Wc=d;this.la=e;this.Ne=f;this.F=b;this.Md=[];this.ff=0;this.Pf=new uh(b);this.Ta=0;this.Bb=h;this.f("Connection created");zh(this)}
	function zh(a){var b=xh(a.Pf);a.J=new b("c:"+a.id+":"+a.ff++,a.F,void 0,a.Bb);a.Re=b.responsesRequiredToBeHealthy||0;var c=Ah(a,a.J),d=Bh(a,a.J);a.hd=a.J;a.cd=a.J;a.D=null;a.Ab=!1;setTimeout(function(){a.J&&a.J.open(c,d)},Math.floor(0));b=b.healthyTimeout||0;0<b&&(a.yd=setTimeout(function(){a.yd=null;a.Ab||(a.J&&102400<a.J.nb?(a.f("Connection exceeded healthy timeout but has received "+a.J.nb+" bytes.  Marking connection healthy."),a.Ab=!0,a.J.Ed()):a.J&&10240<a.J.ob?a.f("Connection exceeded healthy timeout but has sent "+
	a.J.ob+" bytes.  Leaving connection alive."):(a.f("Closing unhealthy connection after timeout."),a.close()))},Math.floor(b)))}function Bh(a,b){return function(c){b===a.J?(a.J=null,c||0!==a.Ta?1===a.Ta&&a.f("Realtime connection lost."):(a.f("Realtime connection failed."),"s-"===a.F.Ya.substr(0,2)&&(xc.remove("host:"+a.F.host),a.F.Ya=a.F.host)),a.close()):b===a.D?(a.f("Secondary connection lost."),c=a.D,a.D=null,a.hd!==c&&a.cd!==c||a.close()):a.f("closing an old connection")}}
	function Ah(a,b){return function(c){if(2!=a.Ta)if(b===a.cd){var d=Tc("t",c);c=Tc("d",c);if("c"==d){if(d=Tc("t",c),"d"in c)if(c=c.d,"h"===d){var d=c.ts,e=c.v,f=c.h;a.Nf=c.s;Ac(a.F,f);0==a.Ta&&(a.J.start(),Ch(a,a.J,d),"5"!==e&&O("Protocol version mismatch detected"),c=a.Pf,(c=1<c.gd.length?c.gd[1]:null)&&Dh(a,c))}else if("n"===d){a.f("recvd end transmission on primary");a.cd=a.D;for(c=0;c<a.Md.length;++c)a.Id(a.Md[c]);a.Md=[];Eh(a)}else"s"===d?(a.f("Connection shutdown command received. Shutting down..."),
	a.Ne&&(a.Ne(c),a.Ne=null),a.la=null,a.close()):"r"===d?(a.f("Reset packet received.  New host: "+c),Ac(a.F,c),1===a.Ta?a.close():(Fh(a),zh(a))):"e"===d?Nc("Server Error: "+c):"o"===d?(a.f("got pong on primary."),Gh(a),Hh(a)):Nc("Unknown control packet command: "+d)}else"d"==d&&a.Id(c)}else if(b===a.D)if(d=Tc("t",c),c=Tc("d",c),"c"==d)"t"in c&&(c=c.t,"a"===c?Ih(a):"r"===c?(a.f("Got a reset on secondary, closing it"),a.D.close(),a.hd!==a.D&&a.cd!==a.D||a.close()):"o"===c&&(a.f("got pong on secondary."),
	a.Mf--,Ih(a)));else if("d"==d)a.Md.push(c);else throw Error("Unknown protocol layer: "+d);else a.f("message on old connection")}}yh.prototype.Fa=function(a){Jh(this,{t:"d",d:a})};function Eh(a){a.hd===a.D&&a.cd===a.D&&(a.f("cleaning up and promoting a connection: "+a.D.re),a.J=a.D,a.D=null)}
	function Ih(a){0>=a.Mf?(a.f("Secondary connection is healthy."),a.Ab=!0,a.D.Ed(),a.D.start(),a.f("sending client ack on secondary"),a.D.send({t:"c",d:{t:"a",d:{}}}),a.f("Ending transmission on primary"),a.J.send({t:"c",d:{t:"n",d:{}}}),a.hd=a.D,Eh(a)):(a.f("sending ping on secondary."),a.D.send({t:"c",d:{t:"p",d:{}}}))}yh.prototype.Id=function(a){Gh(this);this.jc(a)};function Gh(a){a.Ab||(a.Re--,0>=a.Re&&(a.f("Primary connection is healthy."),a.Ab=!0,a.J.Ed()))}
	function Dh(a,b){a.D=new b("c:"+a.id+":"+a.ff++,a.F,a.Nf);a.Mf=b.responsesRequiredToBeHealthy||0;a.D.open(Ah(a,a.D),Bh(a,a.D));setTimeout(function(){a.D&&(a.f("Timed out trying to upgrade."),a.D.close())},Math.floor(6E4))}function Ch(a,b,c){a.f("Realtime connection established.");a.J=b;a.Ta=1;a.Wc&&(a.Wc(c,a.Nf),a.Wc=null);0===a.Re?(a.f("Primary connection is healthy."),a.Ab=!0):setTimeout(function(){Hh(a)},Math.floor(5E3))}
	function Hh(a){a.Ab||1!==a.Ta||(a.f("sending ping on primary."),Jh(a,{t:"c",d:{t:"p",d:{}}}))}function Jh(a,b){if(1!==a.Ta)throw"Connection is not connected";a.hd.send(b)}yh.prototype.close=function(){2!==this.Ta&&(this.f("Closing realtime connection."),this.Ta=2,Fh(this),this.la&&(this.la(),this.la=null))};function Fh(a){a.f("Shutting down all connections");a.J&&(a.J.close(),a.J=null);a.D&&(a.D.close(),a.D=null);a.yd&&(clearTimeout(a.yd),a.yd=null)};function Kh(a,b,c,d){this.id=Lh++;this.f=Mc("p:"+this.id+":");this.xf=this.Ee=!1;this.$={};this.qa=[];this.Yc=0;this.Vc=[];this.oa=!1;this.Za=1E3;this.Fd=3E5;this.Gb=b;this.Uc=c;this.Oe=d;this.F=a;this.sb=this.Aa=this.Ia=this.Bb=this.We=null;this.Ob=!1;this.Td={};this.Lg=0;this.nf=!0;this.Lc=this.Ge=null;Mh(this,0);He.ub().Eb("visible",this.Cg,this);-1===a.host.indexOf("fblocal")&&Ge.ub().Eb("online",this.Ag,this)}var Lh=0,Nh=0;g=Kh.prototype;
	g.Fa=function(a,b,c){var d=++this.Lg;a={r:d,a:a,b:b};this.f(B(a));K(this.oa,"sendRequest call when we're not connected not allowed.");this.Ia.Fa(a);c&&(this.Td[d]=c)};g.yf=function(a,b,c,d){var e=a.va(),f=a.path.toString();this.f("Listen called for "+f+" "+e);this.$[f]=this.$[f]||{};K(fe(a.n)||!S(a.n),"listen() called for non-default but complete query");K(!this.$[f][e],"listen() called twice for same path/queryId.");a={H:d,xd:b,Ig:a,tag:c};this.$[f][e]=a;this.oa&&Oh(this,a)};
	function Oh(a,b){var c=b.Ig,d=c.path.toString(),e=c.va();a.f("Listen on "+d+" for "+e);var f={p:d};b.tag&&(f.q=ee(c.n),f.t=b.tag);f.h=b.xd();a.Fa("q",f,function(f){var k=f.d,l=f.s;if(k&&"object"===typeof k&&v(k,"w")){var m=w(k,"w");ea(m)&&0<=Na(m,"no_index")&&O("Using an unspecified index. Consider adding "+('".indexOn": "'+c.n.g.toString()+'"')+" at "+c.path.toString()+" to your security rules for better performance")}(a.$[d]&&a.$[d][e])===b&&(a.f("listen response",f),"ok"!==l&&Ph(a,d,e),b.H&&b.H(l,
	k))})}g.M=function(a,b,c){this.Aa={ig:a,of:!1,zc:b,md:c};this.f("Authenticating using credential: "+a);Qh(this);(b=40==a.length)||(a=$c(a).Bc,b="object"===typeof a&&!0===w(a,"admin"));b&&(this.f("Admin auth credential detected.  Reducing max reconnect time."),this.Fd=3E4)};g.ge=function(a){delete this.Aa;this.oa&&this.Fa("unauth",{},function(b){a(b.s,b.d)})};
	function Qh(a){var b=a.Aa;a.oa&&b&&a.Fa("auth",{cred:b.ig},function(c){var d=c.s;c=c.d||"error";"ok"!==d&&a.Aa===b&&delete a.Aa;b.of?"ok"!==d&&b.md&&b.md(d,c):(b.of=!0,b.zc&&b.zc(d,c))})}g.Rf=function(a,b){var c=a.path.toString(),d=a.va();this.f("Unlisten called for "+c+" "+d);K(fe(a.n)||!S(a.n),"unlisten() called for non-default but complete query");if(Ph(this,c,d)&&this.oa){var e=ee(a.n);this.f("Unlisten on "+c+" for "+d);c={p:c};b&&(c.q=e,c.t=b);this.Fa("n",c)}};
	g.Me=function(a,b,c){this.oa?Rh(this,"o",a,b,c):this.Vc.push({$c:a,action:"o",data:b,H:c})};g.Cf=function(a,b,c){this.oa?Rh(this,"om",a,b,c):this.Vc.push({$c:a,action:"om",data:b,H:c})};g.Jd=function(a,b){this.oa?Rh(this,"oc",a,null,b):this.Vc.push({$c:a,action:"oc",data:null,H:b})};function Rh(a,b,c,d,e){c={p:c,d:d};a.f("onDisconnect "+b,c);a.Fa(b,c,function(a){e&&setTimeout(function(){e(a.s,a.d)},Math.floor(0))})}g.put=function(a,b,c,d){Sh(this,"p",a,b,c,d)};
	g.zf=function(a,b,c,d){Sh(this,"m",a,b,c,d)};function Sh(a,b,c,d,e,f){d={p:c,d:d};n(f)&&(d.h=f);a.qa.push({action:b,Jf:d,H:e});a.Yc++;b=a.qa.length-1;a.oa?Th(a,b):a.f("Buffering put: "+c)}function Th(a,b){var c=a.qa[b].action,d=a.qa[b].Jf,e=a.qa[b].H;a.qa[b].Jg=a.oa;a.Fa(c,d,function(d){a.f(c+" response",d);delete a.qa[b];a.Yc--;0===a.Yc&&(a.qa=[]);e&&e(d.s,d.d)})}
	g.Ue=function(a){this.oa&&(a={c:a},this.f("reportStats",a),this.Fa("s",a,function(a){"ok"!==a.s&&this.f("reportStats","Error sending stats: "+a.d)}))};
	g.Id=function(a){if("r"in a){this.f("from server: "+B(a));var b=a.r,c=this.Td[b];c&&(delete this.Td[b],c(a.b))}else{if("error"in a)throw"A server-side error has occurred: "+a.error;"a"in a&&(b=a.a,c=a.b,this.f("handleServerMessage",b,c),"d"===b?this.Gb(c.p,c.d,!1,c.t):"m"===b?this.Gb(c.p,c.d,!0,c.t):"c"===b?Uh(this,c.p,c.q):"ac"===b?(a=c.s,b=c.d,c=this.Aa,delete this.Aa,c&&c.md&&c.md(a,b)):"sd"===b?this.We?this.We(c):"msg"in c&&"undefined"!==typeof console&&console.log("FIREBASE: "+c.msg.replace("\n",
	"\nFIREBASE: ")):Nc("Unrecognized action received from server: "+B(b)+"\nAre you using the latest client?"))}};g.Wc=function(a,b){this.f("connection ready");this.oa=!0;this.Lc=(new Date).getTime();this.Oe({serverTimeOffset:a-(new Date).getTime()});this.Bb=b;if(this.nf){var c={};c["sdk.js."+hb.replace(/\./g,"-")]=1;yg()&&(c["framework.cordova"]=1);this.Ue(c)}Vh(this);this.nf=!1;this.Uc(!0)};
	function Mh(a,b){K(!a.Ia,"Scheduling a connect when we're already connected/ing?");a.sb&&clearTimeout(a.sb);a.sb=setTimeout(function(){a.sb=null;Wh(a)},Math.floor(b))}g.Cg=function(a){a&&!this.Ob&&this.Za===this.Fd&&(this.f("Window became visible.  Reducing delay."),this.Za=1E3,this.Ia||Mh(this,0));this.Ob=a};g.Ag=function(a){a?(this.f("Browser went online."),this.Za=1E3,this.Ia||Mh(this,0)):(this.f("Browser went offline.  Killing connection."),this.Ia&&this.Ia.close())};
	g.Df=function(){this.f("data client disconnected");this.oa=!1;this.Ia=null;for(var a=0;a<this.qa.length;a++){var b=this.qa[a];b&&"h"in b.Jf&&b.Jg&&(b.H&&b.H("disconnect"),delete this.qa[a],this.Yc--)}0===this.Yc&&(this.qa=[]);this.Td={};Xh(this)&&(this.Ob?this.Lc&&(3E4<(new Date).getTime()-this.Lc&&(this.Za=1E3),this.Lc=null):(this.f("Window isn't visible.  Delaying reconnect."),this.Za=this.Fd,this.Ge=(new Date).getTime()),a=Math.max(0,this.Za-((new Date).getTime()-this.Ge)),a*=Math.random(),this.f("Trying to reconnect in "+
	a+"ms"),Mh(this,a),this.Za=Math.min(this.Fd,1.3*this.Za));this.Uc(!1)};function Wh(a){if(Xh(a)){a.f("Making a connection attempt");a.Ge=(new Date).getTime();a.Lc=null;var b=q(a.Id,a),c=q(a.Wc,a),d=q(a.Df,a),e=a.id+":"+Nh++;a.Ia=new yh(e,a.F,b,c,d,function(b){O(b+" ("+a.F.toString()+")");a.xf=!0},a.Bb)}}g.yb=function(){this.Ee=!0;this.Ia?this.Ia.close():(this.sb&&(clearTimeout(this.sb),this.sb=null),this.oa&&this.Df())};g.rc=function(){this.Ee=!1;this.Za=1E3;this.Ia||Mh(this,0)};
	function Uh(a,b,c){c=c?Qa(c,function(a){return Uc(a)}).join("$"):"default";(a=Ph(a,b,c))&&a.H&&a.H("permission_denied")}function Ph(a,b,c){b=(new L(b)).toString();var d;n(a.$[b])?(d=a.$[b][c],delete a.$[b][c],0===pa(a.$[b])&&delete a.$[b]):d=void 0;return d}function Vh(a){Qh(a);r(a.$,function(b){r(b,function(b){Oh(a,b)})});for(var b=0;b<a.qa.length;b++)a.qa[b]&&Th(a,b);for(;a.Vc.length;)b=a.Vc.shift(),Rh(a,b.action,b.$c,b.data,b.H)}function Xh(a){var b;b=Ge.ub().kc;return!a.xf&&!a.Ee&&b};var V={og:function(){ih=rh=!0}};V.forceLongPolling=V.og;V.pg=function(){jh=!0};V.forceWebSockets=V.pg;V.Pg=function(a,b){a.k.Ra.We=b};V.setSecurityDebugCallback=V.Pg;V.Ye=function(a,b){a.k.Ye(b)};V.stats=V.Ye;V.Ze=function(a,b){a.k.Ze(b)};V.statsIncrementCounter=V.Ze;V.sd=function(a){return a.k.sd};V.dataUpdateCount=V.sd;V.sg=function(a,b){a.k.De=b};V.interceptServerData=V.sg;V.yg=function(a){new Ig(a)};V.onPopupOpen=V.yg;V.Ng=function(a){sg=a};V.setAuthenticationServer=V.Ng;function Q(a,b,c){this.A=a;this.W=b;this.g=c}Q.prototype.I=function(){x("Firebase.DataSnapshot.val",0,0,arguments.length);return this.A.I()};Q.prototype.val=Q.prototype.I;Q.prototype.mf=function(){x("Firebase.DataSnapshot.exportVal",0,0,arguments.length);return this.A.I(!0)};Q.prototype.exportVal=Q.prototype.mf;Q.prototype.ng=function(){x("Firebase.DataSnapshot.exists",0,0,arguments.length);return!this.A.e()};Q.prototype.exists=Q.prototype.ng;
	Q.prototype.u=function(a){x("Firebase.DataSnapshot.child",0,1,arguments.length);ga(a)&&(a=String(a));ig("Firebase.DataSnapshot.child",a);var b=new L(a),c=this.W.u(b);return new Q(this.A.Q(b),c,N)};Q.prototype.child=Q.prototype.u;Q.prototype.Da=function(a){x("Firebase.DataSnapshot.hasChild",1,1,arguments.length);ig("Firebase.DataSnapshot.hasChild",a);var b=new L(a);return!this.A.Q(b).e()};Q.prototype.hasChild=Q.prototype.Da;
	Q.prototype.C=function(){x("Firebase.DataSnapshot.getPriority",0,0,arguments.length);return this.A.C().I()};Q.prototype.getPriority=Q.prototype.C;Q.prototype.forEach=function(a){x("Firebase.DataSnapshot.forEach",1,1,arguments.length);A("Firebase.DataSnapshot.forEach",1,a,!1);if(this.A.K())return!1;var b=this;return!!this.A.P(this.g,function(c,d){return a(new Q(d,b.W.u(c),N))})};Q.prototype.forEach=Q.prototype.forEach;
	Q.prototype.wd=function(){x("Firebase.DataSnapshot.hasChildren",0,0,arguments.length);return this.A.K()?!1:!this.A.e()};Q.prototype.hasChildren=Q.prototype.wd;Q.prototype.name=function(){O("Firebase.DataSnapshot.name() being deprecated. Please use Firebase.DataSnapshot.key() instead.");x("Firebase.DataSnapshot.name",0,0,arguments.length);return this.key()};Q.prototype.name=Q.prototype.name;Q.prototype.key=function(){x("Firebase.DataSnapshot.key",0,0,arguments.length);return this.W.key()};
	Q.prototype.key=Q.prototype.key;Q.prototype.Db=function(){x("Firebase.DataSnapshot.numChildren",0,0,arguments.length);return this.A.Db()};Q.prototype.numChildren=Q.prototype.Db;Q.prototype.Ib=function(){x("Firebase.DataSnapshot.ref",0,0,arguments.length);return this.W};Q.prototype.ref=Q.prototype.Ib;function Yh(a,b){this.F=a;this.Ua=Rb(a);this.fd=null;this.da=new vb;this.Hd=1;this.Ra=null;b||0<=("object"===typeof window&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)?(this.ba=new Ae(this.F,q(this.Gb,this)),setTimeout(q(this.Uc,this,!0),0)):this.ba=this.Ra=new Kh(this.F,q(this.Gb,this),q(this.Uc,this),q(this.Oe,this));this.Sg=Sb(a,q(function(){return new Mb(this.Ua,this.ba)},this));this.uc=new Rf;
	this.Ce=new ob;var c=this;this.Cd=new vf({Xe:function(a,b,f,h){b=[];f=c.Ce.j(a.path);f.e()||(b=xf(c.Cd,new Xb(bf,a.path,f)),setTimeout(function(){h("ok")},0));return b},ae:ba});Zh(this,"connected",!1);this.la=new qc;this.M=new Sg(a,q(this.ba.M,this.ba),q(this.ba.ge,this.ba),q(this.Le,this));this.sd=0;this.De=null;this.L=new vf({Xe:function(a,b,f,h){c.ba.yf(a,f,b,function(b,e){var f=h(b,e);Ab(c.da,a.path,f)});return[]},ae:function(a,b){c.ba.Rf(a,b)}})}g=Yh.prototype;
	g.toString=function(){return(this.F.kb?"https://":"http://")+this.F.host};g.name=function(){return this.F.hc};function $h(a){a=a.Ce.j(new L(".info/serverTimeOffset")).I()||0;return(new Date).getTime()+a}function ai(a){a=a={timestamp:$h(a)};a.timestamp=a.timestamp||(new Date).getTime();return a}
	g.Gb=function(a,b,c,d){this.sd++;var e=new L(a);b=this.De?this.De(a,b):b;a=[];d?c?(b=na(b,function(a){return M(a)}),a=Ff(this.L,e,b,d)):(b=M(b),a=Bf(this.L,e,b,d)):c?(d=na(b,function(a){return M(a)}),a=Af(this.L,e,d)):(d=M(b),a=xf(this.L,new Xb(bf,e,d)));d=e;0<a.length&&(d=bi(this,e));Ab(this.da,d,a)};g.Uc=function(a){Zh(this,"connected",a);!1===a&&ci(this)};g.Oe=function(a){var b=this;Wc(a,function(a,d){Zh(b,d,a)})};g.Le=function(a){Zh(this,"authenticated",a)};
	function Zh(a,b,c){b=new L("/.info/"+b);c=M(c);var d=a.Ce;d.Wd=d.Wd.G(b,c);c=xf(a.Cd,new Xb(bf,b,c));Ab(a.da,b,c)}g.Kb=function(a,b,c,d){this.f("set",{path:a.toString(),value:b,$g:c});var e=ai(this);b=M(b,c);var e=sc(b,e),f=this.Hd++,e=wf(this.L,a,e,f,!0);wb(this.da,e);var h=this;this.ba.put(a.toString(),b.I(!0),function(b,c){var e="ok"===b;e||O("set at "+a+" failed: "+b);e=zf(h.L,f,!e);Ab(h.da,a,e);di(d,b,c)});e=ei(this,a);bi(this,e);Ab(this.da,e,[])};
	g.update=function(a,b,c){this.f("update",{path:a.toString(),value:b});var d=!0,e=ai(this),f={};r(b,function(a,b){d=!1;var c=M(a);f[b]=sc(c,e)});if(d)Cb("update() called with empty data.  Don't do anything."),di(c,"ok");else{var h=this.Hd++,k=yf(this.L,a,f,h);wb(this.da,k);var l=this;this.ba.zf(a.toString(),b,function(b,d){var e="ok"===b;e||O("update at "+a+" failed: "+b);var e=zf(l.L,h,!e),f=a;0<e.length&&(f=bi(l,a));Ab(l.da,f,e);di(c,b,d)});b=ei(this,a);bi(this,b);Ab(this.da,a,[])}};
	function ci(a){a.f("onDisconnectEvents");var b=ai(a),c=[];rc(pc(a.la,b),G,function(b,e){c=c.concat(xf(a.L,new Xb(bf,b,e)));var f=ei(a,b);bi(a,f)});a.la=new qc;Ab(a.da,G,c)}g.Jd=function(a,b){var c=this;this.ba.Jd(a.toString(),function(d,e){"ok"===d&&rg(c.la,a);di(b,d,e)})};function fi(a,b,c,d){var e=M(c);a.ba.Me(b.toString(),e.I(!0),function(c,h){"ok"===c&&a.la.nc(b,e);di(d,c,h)})}function gi(a,b,c,d,e){var f=M(c,d);a.ba.Me(b.toString(),f.I(!0),function(c,d){"ok"===c&&a.la.nc(b,f);di(e,c,d)})}
	function hi(a,b,c,d){var e=!0,f;for(f in c)e=!1;e?(Cb("onDisconnect().update() called with empty data.  Don't do anything."),di(d,"ok")):a.ba.Cf(b.toString(),c,function(e,f){if("ok"===e)for(var l in c){var m=M(c[l]);a.la.nc(b.u(l),m)}di(d,e,f)})}function ii(a,b,c){c=".info"===E(b.path)?a.Cd.Pb(b,c):a.L.Pb(b,c);yb(a.da,b.path,c)}g.yb=function(){this.Ra&&this.Ra.yb()};g.rc=function(){this.Ra&&this.Ra.rc()};
	g.Ye=function(a){if("undefined"!==typeof console){a?(this.fd||(this.fd=new Lb(this.Ua)),a=this.fd.get()):a=this.Ua.get();var b=Ra(sa(a),function(a,b){return Math.max(b.length,a)},0),c;for(c in a){for(var d=a[c],e=c.length;e<b+2;e++)c+=" ";console.log(c+d)}}};g.Ze=function(a){Ob(this.Ua,a);this.Sg.Of[a]=!0};g.f=function(a){var b="";this.Ra&&(b=this.Ra.id+":");Cb(b,arguments)};
	function di(a,b,c){a&&Db(function(){if("ok"==b)a(null);else{var d=(b||"error").toUpperCase(),e=d;c&&(e+=": "+c);e=Error(e);e.code=d;a(e)}})};function ji(a,b,c,d,e){function f(){}a.f("transaction on "+b);var h=new U(a,b);h.Eb("value",f);c={path:b,update:c,H:d,status:null,Ff:Ec(),cf:e,Lf:0,ie:function(){h.ic("value",f)},ke:null,Ba:null,pd:null,qd:null,rd:null};d=a.L.za(b,void 0)||C;c.pd=d;d=c.update(d.I());if(n(d)){cg("transaction failed: Data returned ",d,c.path);c.status=1;e=Sf(a.uc,b);var k=e.Ca()||[];k.push(c);Tf(e,k);"object"===typeof d&&null!==d&&v(d,".priority")?(k=w(d,".priority"),K(ag(k),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):
	k=(a.L.za(b)||C).C().I();e=ai(a);d=M(d,k);e=sc(d,e);c.qd=d;c.rd=e;c.Ba=a.Hd++;c=wf(a.L,b,e,c.Ba,c.cf);Ab(a.da,b,c);ki(a)}else c.ie(),c.qd=null,c.rd=null,c.H&&(a=new Q(c.pd,new U(a,c.path),N),c.H(null,!1,a))}function ki(a,b){var c=b||a.uc;b||li(a,c);if(null!==c.Ca()){var d=mi(a,c);K(0<d.length,"Sending zero length transaction queue");Sa(d,function(a){return 1===a.status})&&ni(a,c.path(),d)}else c.wd()&&c.P(function(b){ki(a,b)})}
	function ni(a,b,c){for(var d=Qa(c,function(a){return a.Ba}),e=a.L.za(b,d)||C,d=e,e=e.hash(),f=0;f<c.length;f++){var h=c[f];K(1===h.status,"tryToSendTransactionQueue_: items in queue should all be run.");h.status=2;h.Lf++;var k=T(b,h.path),d=d.G(k,h.qd)}d=d.I(!0);a.ba.put(b.toString(),d,function(d){a.f("transaction put response",{path:b.toString(),status:d});var e=[];if("ok"===d){d=[];for(f=0;f<c.length;f++){c[f].status=3;e=e.concat(zf(a.L,c[f].Ba));if(c[f].H){var h=c[f].rd,k=new U(a,c[f].path);d.push(q(c[f].H,
	null,null,!0,new Q(h,k,N)))}c[f].ie()}li(a,Sf(a.uc,b));ki(a);Ab(a.da,b,e);for(f=0;f<d.length;f++)Db(d[f])}else{if("datastale"===d)for(f=0;f<c.length;f++)c[f].status=4===c[f].status?5:1;else for(O("transaction at "+b.toString()+" failed: "+d),f=0;f<c.length;f++)c[f].status=5,c[f].ke=d;bi(a,b)}},e)}function bi(a,b){var c=oi(a,b),d=c.path(),c=mi(a,c);pi(a,c,d);return d}
	function pi(a,b,c){if(0!==b.length){for(var d=[],e=[],f=Qa(b,function(a){return a.Ba}),h=0;h<b.length;h++){var k=b[h],l=T(c,k.path),m=!1,t;K(null!==l,"rerunTransactionsUnderNode_: relativePath should not be null.");if(5===k.status)m=!0,t=k.ke,e=e.concat(zf(a.L,k.Ba,!0));else if(1===k.status)if(25<=k.Lf)m=!0,t="maxretry",e=e.concat(zf(a.L,k.Ba,!0));else{var z=a.L.za(k.path,f)||C;k.pd=z;var I=b[h].update(z.I());n(I)?(cg("transaction failed: Data returned ",I,k.path),l=M(I),"object"===typeof I&&null!=
	I&&v(I,".priority")||(l=l.ga(z.C())),z=k.Ba,I=ai(a),I=sc(l,I),k.qd=l,k.rd=I,k.Ba=a.Hd++,Va(f,z),e=e.concat(wf(a.L,k.path,I,k.Ba,k.cf)),e=e.concat(zf(a.L,z,!0))):(m=!0,t="nodata",e=e.concat(zf(a.L,k.Ba,!0)))}Ab(a.da,c,e);e=[];m&&(b[h].status=3,setTimeout(b[h].ie,Math.floor(0)),b[h].H&&("nodata"===t?(k=new U(a,b[h].path),d.push(q(b[h].H,null,null,!1,new Q(b[h].pd,k,N)))):d.push(q(b[h].H,null,Error(t),!1,null))))}li(a,a.uc);for(h=0;h<d.length;h++)Db(d[h]);ki(a)}}
	function oi(a,b){for(var c,d=a.uc;null!==(c=E(b))&&null===d.Ca();)d=Sf(d,c),b=H(b);return d}function mi(a,b){var c=[];qi(a,b,c);c.sort(function(a,b){return a.Ff-b.Ff});return c}function qi(a,b,c){var d=b.Ca();if(null!==d)for(var e=0;e<d.length;e++)c.push(d[e]);b.P(function(b){qi(a,b,c)})}function li(a,b){var c=b.Ca();if(c){for(var d=0,e=0;e<c.length;e++)3!==c[e].status&&(c[d]=c[e],d++);c.length=d;Tf(b,0<c.length?c:null)}b.P(function(b){li(a,b)})}
	function ei(a,b){var c=oi(a,b).path(),d=Sf(a.uc,b);Wf(d,function(b){ri(a,b)});ri(a,d);Vf(d,function(b){ri(a,b)});return c}
	function ri(a,b){var c=b.Ca();if(null!==c){for(var d=[],e=[],f=-1,h=0;h<c.length;h++)4!==c[h].status&&(2===c[h].status?(K(f===h-1,"All SENT items should be at beginning of queue."),f=h,c[h].status=4,c[h].ke="set"):(K(1===c[h].status,"Unexpected transaction status in abort"),c[h].ie(),e=e.concat(zf(a.L,c[h].Ba,!0)),c[h].H&&d.push(q(c[h].H,null,Error("set"),!1,null))));-1===f?Tf(b,null):c.length=f+1;Ab(a.da,b.path(),e);for(h=0;h<d.length;h++)Db(d[h])}};function W(){this.oc={};this.Sf=!1}W.prototype.yb=function(){for(var a in this.oc)this.oc[a].yb()};W.prototype.rc=function(){for(var a in this.oc)this.oc[a].rc()};W.prototype.ve=function(){this.Sf=!0};ca(W);W.prototype.interrupt=W.prototype.yb;W.prototype.resume=W.prototype.rc;function X(a,b){this.bd=a;this.ra=b}X.prototype.cancel=function(a){x("Firebase.onDisconnect().cancel",0,1,arguments.length);A("Firebase.onDisconnect().cancel",1,a,!0);this.bd.Jd(this.ra,a||null)};X.prototype.cancel=X.prototype.cancel;X.prototype.remove=function(a){x("Firebase.onDisconnect().remove",0,1,arguments.length);jg("Firebase.onDisconnect().remove",this.ra);A("Firebase.onDisconnect().remove",1,a,!0);fi(this.bd,this.ra,null,a)};X.prototype.remove=X.prototype.remove;
	X.prototype.set=function(a,b){x("Firebase.onDisconnect().set",1,2,arguments.length);jg("Firebase.onDisconnect().set",this.ra);bg("Firebase.onDisconnect().set",a,this.ra,!1);A("Firebase.onDisconnect().set",2,b,!0);fi(this.bd,this.ra,a,b)};X.prototype.set=X.prototype.set;
	X.prototype.Kb=function(a,b,c){x("Firebase.onDisconnect().setWithPriority",2,3,arguments.length);jg("Firebase.onDisconnect().setWithPriority",this.ra);bg("Firebase.onDisconnect().setWithPriority",a,this.ra,!1);fg("Firebase.onDisconnect().setWithPriority",2,b);A("Firebase.onDisconnect().setWithPriority",3,c,!0);gi(this.bd,this.ra,a,b,c)};X.prototype.setWithPriority=X.prototype.Kb;
	X.prototype.update=function(a,b){x("Firebase.onDisconnect().update",1,2,arguments.length);jg("Firebase.onDisconnect().update",this.ra);if(ea(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;O("Passing an Array to Firebase.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}eg("Firebase.onDisconnect().update",a,this.ra);A("Firebase.onDisconnect().update",2,b,!0);
	hi(this.bd,this.ra,a,b)};X.prototype.update=X.prototype.update;function Y(a,b,c,d){this.k=a;this.path=b;this.n=c;this.lc=d}
	function si(a){var b=null,c=null;a.ma&&(b=nd(a));a.pa&&(c=pd(a));if(a.g===Qd){if(a.ma){if("[MIN_NAME]"!=md(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if("string"!==typeof b)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");}if(a.pa){if("[MAX_NAME]"!=od(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if("string"!==
	typeof c)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");}}else if(a.g===N){if(null!=b&&!ag(b)||null!=c&&!ag(c))throw Error("Query: When ordering by priority, the first argument passed to startAt(), endAt(), or equalTo() must be a valid priority value (null, a number, or a string).");}else if(K(a.g instanceof Ud||a.g===$d,"unknown index type."),null!=b&&"object"===typeof b||null!=c&&"object"===typeof c)throw Error("Query: First argument passed to startAt(), endAt(), or equalTo() cannot be an object.");
	}function ti(a){if(a.ma&&a.pa&&a.ja&&(!a.ja||""===a.Nb))throw Error("Query: Can't combine startAt(), endAt(), and limit(). Use limitToFirst() or limitToLast() instead.");}function ui(a,b){if(!0===a.lc)throw Error(b+": You can't combine multiple orderBy calls.");}g=Y.prototype;g.Ib=function(){x("Query.ref",0,0,arguments.length);return new U(this.k,this.path)};
	g.Eb=function(a,b,c,d){x("Query.on",2,4,arguments.length);gg("Query.on",a,!1);A("Query.on",2,b,!1);var e=vi("Query.on",c,d);if("value"===a)ii(this.k,this,new id(b,e.cancel||null,e.Ma||null));else{var f={};f[a]=b;ii(this.k,this,new jd(f,e.cancel,e.Ma))}return b};
	g.ic=function(a,b,c){x("Query.off",0,3,arguments.length);gg("Query.off",a,!0);A("Query.off",2,b,!0);mb("Query.off",3,c);var d=null,e=null;"value"===a?d=new id(b||null,null,c||null):a&&(b&&(e={},e[a]=b),d=new jd(e,null,c||null));e=this.k;d=".info"===E(this.path)?e.Cd.jb(this,d):e.L.jb(this,d);yb(e.da,this.path,d)};
	g.Dg=function(a,b){function c(h){f&&(f=!1,e.ic(a,c),b.call(d.Ma,h))}x("Query.once",2,4,arguments.length);gg("Query.once",a,!1);A("Query.once",2,b,!1);var d=vi("Query.once",arguments[2],arguments[3]),e=this,f=!0;this.Eb(a,c,function(b){e.ic(a,c);d.cancel&&d.cancel.call(d.Ma,b)})};
	g.He=function(a){O("Query.limit() being deprecated. Please use Query.limitToFirst() or Query.limitToLast() instead.");x("Query.limit",1,1,arguments.length);if(!ga(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limit: First argument must be a positive integer.");if(this.n.ja)throw Error("Query.limit: Limit was already set (by another call to limit, limitToFirst, orlimitToLast.");var b=this.n.He(a);ti(b);return new Y(this.k,this.path,b,this.lc)};
	g.Ie=function(a){x("Query.limitToFirst",1,1,arguments.length);if(!ga(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limitToFirst: First argument must be a positive integer.");if(this.n.ja)throw Error("Query.limitToFirst: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new Y(this.k,this.path,this.n.Ie(a),this.lc)};
	g.Je=function(a){x("Query.limitToLast",1,1,arguments.length);if(!ga(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limitToLast: First argument must be a positive integer.");if(this.n.ja)throw Error("Query.limitToLast: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new Y(this.k,this.path,this.n.Je(a),this.lc)};
	g.Eg=function(a){x("Query.orderByChild",1,1,arguments.length);if("$key"===a)throw Error('Query.orderByChild: "$key" is invalid.  Use Query.orderByKey() instead.');if("$priority"===a)throw Error('Query.orderByChild: "$priority" is invalid.  Use Query.orderByPriority() instead.');if("$value"===a)throw Error('Query.orderByChild: "$value" is invalid.  Use Query.orderByValue() instead.');ig("Query.orderByChild",a);ui(this,"Query.orderByChild");var b=new L(a);if(b.e())throw Error("Query.orderByChild: cannot pass in empty path.  Use Query.orderByValue() instead.");
	b=new Ud(b);b=de(this.n,b);si(b);return new Y(this.k,this.path,b,!0)};g.Fg=function(){x("Query.orderByKey",0,0,arguments.length);ui(this,"Query.orderByKey");var a=de(this.n,Qd);si(a);return new Y(this.k,this.path,a,!0)};g.Gg=function(){x("Query.orderByPriority",0,0,arguments.length);ui(this,"Query.orderByPriority");var a=de(this.n,N);si(a);return new Y(this.k,this.path,a,!0)};
	g.Hg=function(){x("Query.orderByValue",0,0,arguments.length);ui(this,"Query.orderByValue");var a=de(this.n,$d);si(a);return new Y(this.k,this.path,a,!0)};g.$d=function(a,b){x("Query.startAt",0,2,arguments.length);bg("Query.startAt",a,this.path,!0);hg("Query.startAt",b);var c=this.n.$d(a,b);ti(c);si(c);if(this.n.ma)throw Error("Query.startAt: Starting point was already set (by another call to startAt or equalTo).");n(a)||(b=a=null);return new Y(this.k,this.path,c,this.lc)};
	g.td=function(a,b){x("Query.endAt",0,2,arguments.length);bg("Query.endAt",a,this.path,!0);hg("Query.endAt",b);var c=this.n.td(a,b);ti(c);si(c);if(this.n.pa)throw Error("Query.endAt: Ending point was already set (by another call to endAt or equalTo).");return new Y(this.k,this.path,c,this.lc)};
	g.kg=function(a,b){x("Query.equalTo",1,2,arguments.length);bg("Query.equalTo",a,this.path,!1);hg("Query.equalTo",b);if(this.n.ma)throw Error("Query.equalTo: Starting point was already set (by another call to endAt or equalTo).");if(this.n.pa)throw Error("Query.equalTo: Ending point was already set (by another call to endAt or equalTo).");return this.$d(a,b).td(a,b)};
	g.toString=function(){x("Query.toString",0,0,arguments.length);for(var a=this.path,b="",c=a.Z;c<a.o.length;c++)""!==a.o[c]&&(b+="/"+encodeURIComponent(String(a.o[c])));return this.k.toString()+(b||"/")};g.va=function(){var a=Uc(ee(this.n));return"{}"===a?"default":a};
	function vi(a,b,c){var d={cancel:null,Ma:null};if(b&&c)d.cancel=b,A(a,3,d.cancel,!0),d.Ma=c,mb(a,4,d.Ma);else if(b)if("object"===typeof b&&null!==b)d.Ma=b;else if("function"===typeof b)d.cancel=b;else throw Error(y(a,3,!0)+" must either be a cancel callback or a context object.");return d}Y.prototype.ref=Y.prototype.Ib;Y.prototype.on=Y.prototype.Eb;Y.prototype.off=Y.prototype.ic;Y.prototype.once=Y.prototype.Dg;Y.prototype.limit=Y.prototype.He;Y.prototype.limitToFirst=Y.prototype.Ie;
	Y.prototype.limitToLast=Y.prototype.Je;Y.prototype.orderByChild=Y.prototype.Eg;Y.prototype.orderByKey=Y.prototype.Fg;Y.prototype.orderByPriority=Y.prototype.Gg;Y.prototype.orderByValue=Y.prototype.Hg;Y.prototype.startAt=Y.prototype.$d;Y.prototype.endAt=Y.prototype.td;Y.prototype.equalTo=Y.prototype.kg;Y.prototype.toString=Y.prototype.toString;var Z={};Z.vc=Kh;Z.DataConnection=Z.vc;Kh.prototype.Rg=function(a,b){this.Fa("q",{p:a},b)};Z.vc.prototype.simpleListen=Z.vc.prototype.Rg;Kh.prototype.jg=function(a,b){this.Fa("echo",{d:a},b)};Z.vc.prototype.echo=Z.vc.prototype.jg;Kh.prototype.interrupt=Kh.prototype.yb;Z.Vf=yh;Z.RealTimeConnection=Z.Vf;yh.prototype.sendRequest=yh.prototype.Fa;yh.prototype.close=yh.prototype.close;
	Z.rg=function(a){var b=Kh.prototype.put;Kh.prototype.put=function(c,d,e,f){n(f)&&(f=a());b.call(this,c,d,e,f)};return function(){Kh.prototype.put=b}};Z.hijackHash=Z.rg;Z.Uf=zc;Z.ConnectionTarget=Z.Uf;Z.va=function(a){return a.va()};Z.queryIdentifier=Z.va;Z.tg=function(a){return a.k.Ra.$};Z.listens=Z.tg;Z.ve=function(a){a.ve()};Z.forceRestClient=Z.ve;function U(a,b){var c,d,e;if(a instanceof Yh)c=a,d=b;else{x("new Firebase",1,2,arguments.length);d=Pc(arguments[0]);c=d.Tg;"firebase"===d.domain&&Oc(d.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead");c&&"undefined"!=c||Oc("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com");d.kb||"undefined"!==typeof window&&window.location&&window.location.protocol&&-1!==window.location.protocol.indexOf("https:")&&O("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");
	c=new zc(d.host,d.kb,c,"ws"===d.scheme||"wss"===d.scheme);d=new L(d.$c);e=d.toString();var f;!(f=!p(c.host)||0===c.host.length||!$f(c.hc))&&(f=0!==e.length)&&(e&&(e=e.replace(/^\/*\.info(\/|$)/,"/")),f=!(p(e)&&0!==e.length&&!Yf.test(e)));if(f)throw Error(y("new Firebase",1,!1)+'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".');if(b)if(b instanceof W)e=b;else if(p(b))e=W.ub(),c.Od=b;else throw Error("Expected a valid Firebase.Context for second argument to new Firebase()");
	else e=W.ub();f=c.toString();var h=w(e.oc,f);h||(h=new Yh(c,e.Sf),e.oc[f]=h);c=h}Y.call(this,c,d,be,!1)}ma(U,Y);var wi=U,xi=["Firebase"],yi=aa;xi[0]in yi||!yi.execScript||yi.execScript("var "+xi[0]);for(var zi;xi.length&&(zi=xi.shift());)!xi.length&&n(wi)?yi[zi]=wi:yi=yi[zi]?yi[zi]:yi[zi]={};U.goOffline=function(){x("Firebase.goOffline",0,0,arguments.length);W.ub().yb()};U.goOnline=function(){x("Firebase.goOnline",0,0,arguments.length);W.ub().rc()};
	function Lc(a,b){K(!b||!0===a||!1===a,"Can't turn on custom loggers persistently.");!0===a?("undefined"!==typeof console&&("function"===typeof console.log?Bb=q(console.log,console):"object"===typeof console.log&&(Bb=function(a){console.log(a)})),b&&yc.set("logging_enabled",!0)):a?Bb=a:(Bb=null,yc.remove("logging_enabled"))}U.enableLogging=Lc;U.ServerValue={TIMESTAMP:{".sv":"timestamp"}};U.SDK_VERSION=hb;U.INTERNAL=V;U.Context=W;U.TEST_ACCESS=Z;
	U.prototype.name=function(){O("Firebase.name() being deprecated. Please use Firebase.key() instead.");x("Firebase.name",0,0,arguments.length);return this.key()};U.prototype.name=U.prototype.name;U.prototype.key=function(){x("Firebase.key",0,0,arguments.length);return this.path.e()?null:Ld(this.path)};U.prototype.key=U.prototype.key;
	U.prototype.u=function(a){x("Firebase.child",1,1,arguments.length);if(ga(a))a=String(a);else if(!(a instanceof L))if(null===E(this.path)){var b=a;b&&(b=b.replace(/^\/*\.info(\/|$)/,"/"));ig("Firebase.child",b)}else ig("Firebase.child",a);return new U(this.k,this.path.u(a))};U.prototype.child=U.prototype.u;U.prototype.parent=function(){x("Firebase.parent",0,0,arguments.length);var a=this.path.parent();return null===a?null:new U(this.k,a)};U.prototype.parent=U.prototype.parent;
	U.prototype.root=function(){x("Firebase.ref",0,0,arguments.length);for(var a=this;null!==a.parent();)a=a.parent();return a};U.prototype.root=U.prototype.root;U.prototype.set=function(a,b){x("Firebase.set",1,2,arguments.length);jg("Firebase.set",this.path);bg("Firebase.set",a,this.path,!1);A("Firebase.set",2,b,!0);this.k.Kb(this.path,a,null,b||null)};U.prototype.set=U.prototype.set;
	U.prototype.update=function(a,b){x("Firebase.update",1,2,arguments.length);jg("Firebase.update",this.path);if(ea(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;O("Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}eg("Firebase.update",a,this.path);A("Firebase.update",2,b,!0);this.k.update(this.path,a,b||null)};U.prototype.update=U.prototype.update;
	U.prototype.Kb=function(a,b,c){x("Firebase.setWithPriority",2,3,arguments.length);jg("Firebase.setWithPriority",this.path);bg("Firebase.setWithPriority",a,this.path,!1);fg("Firebase.setWithPriority",2,b);A("Firebase.setWithPriority",3,c,!0);if(".length"===this.key()||".keys"===this.key())throw"Firebase.setWithPriority failed: "+this.key()+" is a read-only object.";this.k.Kb(this.path,a,b,c||null)};U.prototype.setWithPriority=U.prototype.Kb;
	U.prototype.remove=function(a){x("Firebase.remove",0,1,arguments.length);jg("Firebase.remove",this.path);A("Firebase.remove",1,a,!0);this.set(null,a)};U.prototype.remove=U.prototype.remove;
	U.prototype.transaction=function(a,b,c){x("Firebase.transaction",1,3,arguments.length);jg("Firebase.transaction",this.path);A("Firebase.transaction",1,a,!1);A("Firebase.transaction",2,b,!0);if(n(c)&&"boolean"!=typeof c)throw Error(y("Firebase.transaction",3,!0)+"must be a boolean.");if(".length"===this.key()||".keys"===this.key())throw"Firebase.transaction failed: "+this.key()+" is a read-only object.";"undefined"===typeof c&&(c=!0);ji(this.k,this.path,a,b||null,c)};U.prototype.transaction=U.prototype.transaction;
	U.prototype.Og=function(a,b){x("Firebase.setPriority",1,2,arguments.length);jg("Firebase.setPriority",this.path);fg("Firebase.setPriority",1,a);A("Firebase.setPriority",2,b,!0);this.k.Kb(this.path.u(".priority"),a,null,b)};U.prototype.setPriority=U.prototype.Og;
	U.prototype.push=function(a,b){x("Firebase.push",0,2,arguments.length);jg("Firebase.push",this.path);bg("Firebase.push",a,this.path,!0);A("Firebase.push",2,b,!0);var c=$h(this.k),c=Fe(c),c=this.u(c);"undefined"!==typeof a&&null!==a&&c.set(a,b);return c};U.prototype.push=U.prototype.push;U.prototype.hb=function(){jg("Firebase.onDisconnect",this.path);return new X(this.k,this.path)};U.prototype.onDisconnect=U.prototype.hb;
	U.prototype.M=function(a,b,c){O("FirebaseRef.auth() being deprecated. Please use FirebaseRef.authWithCustomToken() instead.");x("Firebase.auth",1,3,arguments.length);kg("Firebase.auth",a);A("Firebase.auth",2,b,!0);A("Firebase.auth",3,b,!0);Yg(this.k.M,a,{},{remember:"none"},b,c)};U.prototype.auth=U.prototype.M;U.prototype.ge=function(a){x("Firebase.unauth",0,1,arguments.length);A("Firebase.unauth",1,a,!0);Zg(this.k.M,a)};U.prototype.unauth=U.prototype.ge;
	U.prototype.xe=function(){x("Firebase.getAuth",0,0,arguments.length);return this.k.M.xe()};U.prototype.getAuth=U.prototype.xe;U.prototype.xg=function(a,b){x("Firebase.onAuth",1,2,arguments.length);A("Firebase.onAuth",1,a,!1);mb("Firebase.onAuth",2,b);this.k.M.Eb("auth_status",a,b)};U.prototype.onAuth=U.prototype.xg;U.prototype.wg=function(a,b){x("Firebase.offAuth",1,2,arguments.length);A("Firebase.offAuth",1,a,!1);mb("Firebase.offAuth",2,b);this.k.M.ic("auth_status",a,b)};U.prototype.offAuth=U.prototype.wg;
	U.prototype.Zf=function(a,b,c){x("Firebase.authWithCustomToken",2,3,arguments.length);kg("Firebase.authWithCustomToken",a);A("Firebase.authWithCustomToken",2,b,!1);ng("Firebase.authWithCustomToken",3,c,!0);Yg(this.k.M,a,{},c||{},b)};U.prototype.authWithCustomToken=U.prototype.Zf;U.prototype.$f=function(a,b,c){x("Firebase.authWithOAuthPopup",2,3,arguments.length);mg("Firebase.authWithOAuthPopup",a);A("Firebase.authWithOAuthPopup",2,b,!1);ng("Firebase.authWithOAuthPopup",3,c,!0);ch(this.k.M,a,c,b)};
	U.prototype.authWithOAuthPopup=U.prototype.$f;U.prototype.ag=function(a,b,c){x("Firebase.authWithOAuthRedirect",2,3,arguments.length);mg("Firebase.authWithOAuthRedirect",a);A("Firebase.authWithOAuthRedirect",2,b,!1);ng("Firebase.authWithOAuthRedirect",3,c,!0);var d=this.k.M;ah(d);var e=[Kg],f=vg(c);"anonymous"===a||"firebase"===a?P(b,Mg("TRANSPORT_UNAVAILABLE")):(yc.set("redirect_client_options",f.od),bh(d,e,"/auth/"+a,f,b))};U.prototype.authWithOAuthRedirect=U.prototype.ag;
	U.prototype.bg=function(a,b,c,d){x("Firebase.authWithOAuthToken",3,4,arguments.length);mg("Firebase.authWithOAuthToken",a);A("Firebase.authWithOAuthToken",3,c,!1);ng("Firebase.authWithOAuthToken",4,d,!0);p(b)?(lg("Firebase.authWithOAuthToken",2,b),$g(this.k.M,a+"/token",{access_token:b},d,c)):(ng("Firebase.authWithOAuthToken",2,b,!1),$g(this.k.M,a+"/token",b,d,c))};U.prototype.authWithOAuthToken=U.prototype.bg;
	U.prototype.Yf=function(a,b){x("Firebase.authAnonymously",1,2,arguments.length);A("Firebase.authAnonymously",1,a,!1);ng("Firebase.authAnonymously",2,b,!0);$g(this.k.M,"anonymous",{},b,a)};U.prototype.authAnonymously=U.prototype.Yf;
	U.prototype.cg=function(a,b,c){x("Firebase.authWithPassword",2,3,arguments.length);ng("Firebase.authWithPassword",1,a,!1);og("Firebase.authWithPassword",a,"email");og("Firebase.authWithPassword",a,"password");A("Firebase.authWithPassword",2,b,!1);ng("Firebase.authWithPassword",3,c,!0);$g(this.k.M,"password",a,c,b)};U.prototype.authWithPassword=U.prototype.cg;
	U.prototype.se=function(a,b){x("Firebase.createUser",2,2,arguments.length);ng("Firebase.createUser",1,a,!1);og("Firebase.createUser",a,"email");og("Firebase.createUser",a,"password");A("Firebase.createUser",2,b,!1);this.k.M.se(a,b)};U.prototype.createUser=U.prototype.se;U.prototype.Te=function(a,b){x("Firebase.removeUser",2,2,arguments.length);ng("Firebase.removeUser",1,a,!1);og("Firebase.removeUser",a,"email");og("Firebase.removeUser",a,"password");A("Firebase.removeUser",2,b,!1);this.k.M.Te(a,b)};
	U.prototype.removeUser=U.prototype.Te;U.prototype.pe=function(a,b){x("Firebase.changePassword",2,2,arguments.length);ng("Firebase.changePassword",1,a,!1);og("Firebase.changePassword",a,"email");og("Firebase.changePassword",a,"oldPassword");og("Firebase.changePassword",a,"newPassword");A("Firebase.changePassword",2,b,!1);this.k.M.pe(a,b)};U.prototype.changePassword=U.prototype.pe;
	U.prototype.oe=function(a,b){x("Firebase.changeEmail",2,2,arguments.length);ng("Firebase.changeEmail",1,a,!1);og("Firebase.changeEmail",a,"oldEmail");og("Firebase.changeEmail",a,"newEmail");og("Firebase.changeEmail",a,"password");A("Firebase.changeEmail",2,b,!1);this.k.M.oe(a,b)};U.prototype.changeEmail=U.prototype.oe;
	U.prototype.Ve=function(a,b){x("Firebase.resetPassword",2,2,arguments.length);ng("Firebase.resetPassword",1,a,!1);og("Firebase.resetPassword",a,"email");A("Firebase.resetPassword",2,b,!1);this.k.M.Ve(a,b)};U.prototype.resetPassword=U.prototype.Ve;})();

	module.exports = Firebase;


/***/ },
/* 92 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var require;var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, global, module) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   3.0.2
	 */

	(function() {
	    "use strict";
	    function lib$es6$promise$utils$$objectOrFunction(x) {
	      return typeof x === 'function' || (typeof x === 'object' && x !== null);
	    }

	    function lib$es6$promise$utils$$isFunction(x) {
	      return typeof x === 'function';
	    }

	    function lib$es6$promise$utils$$isMaybeThenable(x) {
	      return typeof x === 'object' && x !== null;
	    }

	    var lib$es6$promise$utils$$_isArray;
	    if (!Array.isArray) {
	      lib$es6$promise$utils$$_isArray = function (x) {
	        return Object.prototype.toString.call(x) === '[object Array]';
	      };
	    } else {
	      lib$es6$promise$utils$$_isArray = Array.isArray;
	    }

	    var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
	    var lib$es6$promise$asap$$len = 0;
	    var lib$es6$promise$asap$$toString = {}.toString;
	    var lib$es6$promise$asap$$vertxNext;
	    var lib$es6$promise$asap$$customSchedulerFn;

	    var lib$es6$promise$asap$$asap = function asap(callback, arg) {
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
	      lib$es6$promise$asap$$len += 2;
	      if (lib$es6$promise$asap$$len === 2) {
	        // If len is 2, that means that we need to schedule an async flush.
	        // If additional callbacks are queued before the queue is flushed, they
	        // will be processed by this flush that we are scheduling.
	        if (lib$es6$promise$asap$$customSchedulerFn) {
	          lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush);
	        } else {
	          lib$es6$promise$asap$$scheduleFlush();
	        }
	      }
	    }

	    function lib$es6$promise$asap$$setScheduler(scheduleFn) {
	      lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
	    }

	    function lib$es6$promise$asap$$setAsap(asapFn) {
	      lib$es6$promise$asap$$asap = asapFn;
	    }

	    var lib$es6$promise$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
	    var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
	    var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
	    var lib$es6$promise$asap$$isNode = typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

	    // test for web worker but not in IE10
	    var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
	      typeof importScripts !== 'undefined' &&
	      typeof MessageChannel !== 'undefined';

	    // node
	    function lib$es6$promise$asap$$useNextTick() {
	      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	      // see https://github.com/cujojs/when/issues/410 for details
	      return function() {
	        process.nextTick(lib$es6$promise$asap$$flush);
	      };
	    }

	    // vertx
	    function lib$es6$promise$asap$$useVertxTimer() {
	      return function() {
	        lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
	      };
	    }

	    function lib$es6$promise$asap$$useMutationObserver() {
	      var iterations = 0;
	      var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
	      var node = document.createTextNode('');
	      observer.observe(node, { characterData: true });

	      return function() {
	        node.data = (iterations = ++iterations % 2);
	      };
	    }

	    // web worker
	    function lib$es6$promise$asap$$useMessageChannel() {
	      var channel = new MessageChannel();
	      channel.port1.onmessage = lib$es6$promise$asap$$flush;
	      return function () {
	        channel.port2.postMessage(0);
	      };
	    }

	    function lib$es6$promise$asap$$useSetTimeout() {
	      return function() {
	        setTimeout(lib$es6$promise$asap$$flush, 1);
	      };
	    }

	    var lib$es6$promise$asap$$queue = new Array(1000);
	    function lib$es6$promise$asap$$flush() {
	      for (var i = 0; i < lib$es6$promise$asap$$len; i+=2) {
	        var callback = lib$es6$promise$asap$$queue[i];
	        var arg = lib$es6$promise$asap$$queue[i+1];

	        callback(arg);

	        lib$es6$promise$asap$$queue[i] = undefined;
	        lib$es6$promise$asap$$queue[i+1] = undefined;
	      }

	      lib$es6$promise$asap$$len = 0;
	    }

	    function lib$es6$promise$asap$$attemptVertx() {
	      try {
	        var r = require;
	        var vertx = __webpack_require__(95);
	        lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
	        return lib$es6$promise$asap$$useVertxTimer();
	      } catch(e) {
	        return lib$es6$promise$asap$$useSetTimeout();
	      }
	    }

	    var lib$es6$promise$asap$$scheduleFlush;
	    // Decide what async method to use to triggering processing of queued callbacks:
	    if (lib$es6$promise$asap$$isNode) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick();
	    } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver();
	    } else if (lib$es6$promise$asap$$isWorker) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel();
	    } else if (lib$es6$promise$asap$$browserWindow === undefined && "function" === 'function') {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertx();
	    } else {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout();
	    }

	    function lib$es6$promise$$internal$$noop() {}

	    var lib$es6$promise$$internal$$PENDING   = void 0;
	    var lib$es6$promise$$internal$$FULFILLED = 1;
	    var lib$es6$promise$$internal$$REJECTED  = 2;

	    var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();

	    function lib$es6$promise$$internal$$selfFulfillment() {
	      return new TypeError("You cannot resolve a promise with itself");
	    }

	    function lib$es6$promise$$internal$$cannotReturnOwn() {
	      return new TypeError('A promises callback cannot return that same promise.');
	    }

	    function lib$es6$promise$$internal$$getThen(promise) {
	      try {
	        return promise.then;
	      } catch(error) {
	        lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
	        return lib$es6$promise$$internal$$GET_THEN_ERROR;
	      }
	    }

	    function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	      try {
	        then.call(value, fulfillmentHandler, rejectionHandler);
	      } catch(e) {
	        return e;
	      }
	    }

	    function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
	       lib$es6$promise$asap$$asap(function(promise) {
	        var sealed = false;
	        var error = lib$es6$promise$$internal$$tryThen(then, thenable, function(value) {
	          if (sealed) { return; }
	          sealed = true;
	          if (thenable !== value) {
	            lib$es6$promise$$internal$$resolve(promise, value);
	          } else {
	            lib$es6$promise$$internal$$fulfill(promise, value);
	          }
	        }, function(reason) {
	          if (sealed) { return; }
	          sealed = true;

	          lib$es6$promise$$internal$$reject(promise, reason);
	        }, 'Settle: ' + (promise._label || ' unknown promise'));

	        if (!sealed && error) {
	          sealed = true;
	          lib$es6$promise$$internal$$reject(promise, error);
	        }
	      }, promise);
	    }

	    function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
	      if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, thenable._result);
	      } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, thenable._result);
	      } else {
	        lib$es6$promise$$internal$$subscribe(thenable, undefined, function(value) {
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      }
	    }

	    function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable) {
	      if (maybeThenable.constructor === promise.constructor) {
	        lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
	      } else {
	        var then = lib$es6$promise$$internal$$getThen(maybeThenable);

	        if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error);
	        } else if (then === undefined) {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        } else if (lib$es6$promise$utils$$isFunction(then)) {
	          lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then);
	        } else {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        }
	      }
	    }

	    function lib$es6$promise$$internal$$resolve(promise, value) {
	      if (promise === value) {
	        lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFulfillment());
	      } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
	        lib$es6$promise$$internal$$handleMaybeThenable(promise, value);
	      } else {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      }
	    }

	    function lib$es6$promise$$internal$$publishRejection(promise) {
	      if (promise._onerror) {
	        promise._onerror(promise._result);
	      }

	      lib$es6$promise$$internal$$publish(promise);
	    }

	    function lib$es6$promise$$internal$$fulfill(promise, value) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }

	      promise._result = value;
	      promise._state = lib$es6$promise$$internal$$FULFILLED;

	      if (promise._subscribers.length !== 0) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise);
	      }
	    }

	    function lib$es6$promise$$internal$$reject(promise, reason) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
	      promise._state = lib$es6$promise$$internal$$REJECTED;
	      promise._result = reason;

	      lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise);
	    }

	    function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
	      var subscribers = parent._subscribers;
	      var length = subscribers.length;

	      parent._onerror = null;

	      subscribers[length] = child;
	      subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
	      subscribers[length + lib$es6$promise$$internal$$REJECTED]  = onRejection;

	      if (length === 0 && parent._state) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent);
	      }
	    }

	    function lib$es6$promise$$internal$$publish(promise) {
	      var subscribers = promise._subscribers;
	      var settled = promise._state;

	      if (subscribers.length === 0) { return; }

	      var child, callback, detail = promise._result;

	      for (var i = 0; i < subscribers.length; i += 3) {
	        child = subscribers[i];
	        callback = subscribers[i + settled];

	        if (child) {
	          lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail);
	        } else {
	          callback(detail);
	        }
	      }

	      promise._subscribers.length = 0;
	    }

	    function lib$es6$promise$$internal$$ErrorObject() {
	      this.error = null;
	    }

	    var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();

	    function lib$es6$promise$$internal$$tryCatch(callback, detail) {
	      try {
	        return callback(detail);
	      } catch(e) {
	        lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
	        return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
	      }
	    }

	    function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
	      var hasCallback = lib$es6$promise$utils$$isFunction(callback),
	          value, error, succeeded, failed;

	      if (hasCallback) {
	        value = lib$es6$promise$$internal$$tryCatch(callback, detail);

	        if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
	          failed = true;
	          error = value.error;
	          value = null;
	        } else {
	          succeeded = true;
	        }

	        if (promise === value) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
	          return;
	        }

	      } else {
	        value = detail;
	        succeeded = true;
	      }

	      if (promise._state !== lib$es6$promise$$internal$$PENDING) {
	        // noop
	      } else if (hasCallback && succeeded) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      } else if (failed) {
	        lib$es6$promise$$internal$$reject(promise, error);
	      } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      } else if (settled === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, value);
	      }
	    }

	    function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
	      try {
	        resolver(function resolvePromise(value){
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function rejectPromise(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      } catch(e) {
	        lib$es6$promise$$internal$$reject(promise, e);
	      }
	    }

	    function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
	      var enumerator = this;

	      enumerator._instanceConstructor = Constructor;
	      enumerator.promise = new Constructor(lib$es6$promise$$internal$$noop);

	      if (enumerator._validateInput(input)) {
	        enumerator._input     = input;
	        enumerator.length     = input.length;
	        enumerator._remaining = input.length;

	        enumerator._init();

	        if (enumerator.length === 0) {
	          lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result);
	        } else {
	          enumerator.length = enumerator.length || 0;
	          enumerator._enumerate();
	          if (enumerator._remaining === 0) {
	            lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result);
	          }
	        }
	      } else {
	        lib$es6$promise$$internal$$reject(enumerator.promise, enumerator._validationError());
	      }
	    }

	    lib$es6$promise$enumerator$$Enumerator.prototype._validateInput = function(input) {
	      return lib$es6$promise$utils$$isArray(input);
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._validationError = function() {
	      return new Error('Array Methods must be provided an Array');
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._init = function() {
	      this._result = new Array(this.length);
	    };

	    var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;

	    lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function() {
	      var enumerator = this;

	      var length  = enumerator.length;
	      var promise = enumerator.promise;
	      var input   = enumerator._input;

	      for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        enumerator._eachEntry(input[i], i);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
	      var enumerator = this;
	      var c = enumerator._instanceConstructor;

	      if (lib$es6$promise$utils$$isMaybeThenable(entry)) {
	        if (entry.constructor === c && entry._state !== lib$es6$promise$$internal$$PENDING) {
	          entry._onerror = null;
	          enumerator._settledAt(entry._state, i, entry._result);
	        } else {
	          enumerator._willSettleAt(c.resolve(entry), i);
	        }
	      } else {
	        enumerator._remaining--;
	        enumerator._result[i] = entry;
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
	      var enumerator = this;
	      var promise = enumerator.promise;

	      if (promise._state === lib$es6$promise$$internal$$PENDING) {
	        enumerator._remaining--;

	        if (state === lib$es6$promise$$internal$$REJECTED) {
	          lib$es6$promise$$internal$$reject(promise, value);
	        } else {
	          enumerator._result[i] = value;
	        }
	      }

	      if (enumerator._remaining === 0) {
	        lib$es6$promise$$internal$$fulfill(promise, enumerator._result);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
	      var enumerator = this;

	      lib$es6$promise$$internal$$subscribe(promise, undefined, function(value) {
	        enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
	      }, function(reason) {
	        enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
	      });
	    };
	    function lib$es6$promise$promise$all$$all(entries) {
	      return new lib$es6$promise$enumerator$$default(this, entries).promise;
	    }
	    var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
	    function lib$es6$promise$promise$race$$race(entries) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      var promise = new Constructor(lib$es6$promise$$internal$$noop);

	      if (!lib$es6$promise$utils$$isArray(entries)) {
	        lib$es6$promise$$internal$$reject(promise, new TypeError('You must pass an array to race.'));
	        return promise;
	      }

	      var length = entries.length;

	      function onFulfillment(value) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      }

	      function onRejection(reason) {
	        lib$es6$promise$$internal$$reject(promise, reason);
	      }

	      for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        lib$es6$promise$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
	      }

	      return promise;
	    }
	    var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;
	    function lib$es6$promise$promise$resolve$$resolve(object) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      if (object && typeof object === 'object' && object.constructor === Constructor) {
	        return object;
	      }

	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$resolve(promise, object);
	      return promise;
	    }
	    var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;
	    function lib$es6$promise$promise$reject$$reject(reason) {
	      /*jshint validthis:true */
	      var Constructor = this;
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$reject(promise, reason);
	      return promise;
	    }
	    var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;

	    var lib$es6$promise$promise$$counter = 0;

	    function lib$es6$promise$promise$$needsResolver() {
	      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	    }

	    function lib$es6$promise$promise$$needsNew() {
	      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	    }

	    var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
	    /**
	      Promise objects represent the eventual result of an asynchronous operation. The
	      primary way of interacting with a promise is through its `then` method, which
	      registers callbacks to receive either a promise's eventual value or the reason
	      why the promise cannot be fulfilled.

	      Terminology
	      -----------

	      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	      - `thenable` is an object or function that defines a `then` method.
	      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	      - `exception` is a value that is thrown using the throw statement.
	      - `reason` is a value that indicates why a promise was rejected.
	      - `settled` the final resting state of a promise, fulfilled or rejected.

	      A promise can be in one of three states: pending, fulfilled, or rejected.

	      Promises that are fulfilled have a fulfillment value and are in the fulfilled
	      state.  Promises that are rejected have a rejection reason and are in the
	      rejected state.  A fulfillment value is never a thenable.

	      Promises can also be said to *resolve* a value.  If this value is also a
	      promise, then the original promise's settled state will match the value's
	      settled state.  So a promise that *resolves* a promise that rejects will
	      itself reject, and a promise that *resolves* a promise that fulfills will
	      itself fulfill.


	      Basic Usage:
	      ------------

	      ```js
	      var promise = new Promise(function(resolve, reject) {
	        // on success
	        resolve(value);

	        // on failure
	        reject(reason);
	      });

	      promise.then(function(value) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```

	      Advanced Usage:
	      ---------------

	      Promises shine when abstracting away asynchronous interactions such as
	      `XMLHttpRequest`s.

	      ```js
	      function getJSON(url) {
	        return new Promise(function(resolve, reject){
	          var xhr = new XMLHttpRequest();

	          xhr.open('GET', url);
	          xhr.onreadystatechange = handler;
	          xhr.responseType = 'json';
	          xhr.setRequestHeader('Accept', 'application/json');
	          xhr.send();

	          function handler() {
	            if (this.readyState === this.DONE) {
	              if (this.status === 200) {
	                resolve(this.response);
	              } else {
	                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	              }
	            }
	          };
	        });
	      }

	      getJSON('/posts.json').then(function(json) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```

	      Unlike callbacks, promises are great composable primitives.

	      ```js
	      Promise.all([
	        getJSON('/posts'),
	        getJSON('/comments')
	      ]).then(function(values){
	        values[0] // => postsJSON
	        values[1] // => commentsJSON

	        return values;
	      });
	      ```

	      @class Promise
	      @param {function} resolver
	      Useful for tooling.
	      @constructor
	    */
	    function lib$es6$promise$promise$$Promise(resolver) {
	      this._id = lib$es6$promise$promise$$counter++;
	      this._state = undefined;
	      this._result = undefined;
	      this._subscribers = [];

	      if (lib$es6$promise$$internal$$noop !== resolver) {
	        if (!lib$es6$promise$utils$$isFunction(resolver)) {
	          lib$es6$promise$promise$$needsResolver();
	        }

	        if (!(this instanceof lib$es6$promise$promise$$Promise)) {
	          lib$es6$promise$promise$$needsNew();
	        }

	        lib$es6$promise$$internal$$initializePromise(this, resolver);
	      }
	    }

	    lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
	    lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
	    lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
	    lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;
	    lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler;
	    lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap;
	    lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap;

	    lib$es6$promise$promise$$Promise.prototype = {
	      constructor: lib$es6$promise$promise$$Promise,

	    /**
	      The primary way of interacting with a promise is through its `then` method,
	      which registers callbacks to receive either a promise's eventual value or the
	      reason why the promise cannot be fulfilled.

	      ```js
	      findUser().then(function(user){
	        // user is available
	      }, function(reason){
	        // user is unavailable, and you are given the reason why
	      });
	      ```

	      Chaining
	      --------

	      The return value of `then` is itself a promise.  This second, 'downstream'
	      promise is resolved with the return value of the first promise's fulfillment
	      or rejection handler, or rejected if the handler throws an exception.

	      ```js
	      findUser().then(function (user) {
	        return user.name;
	      }, function (reason) {
	        return 'default name';
	      }).then(function (userName) {
	        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	        // will be `'default name'`
	      });

	      findUser().then(function (user) {
	        throw new Error('Found user, but still unhappy');
	      }, function (reason) {
	        throw new Error('`findUser` rejected and we're unhappy');
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	      });
	      ```
	      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.

	      ```js
	      findUser().then(function (user) {
	        throw new PedagogicalException('Upstream error');
	      }).then(function (value) {
	        // never reached
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // The `PedgagocialException` is propagated all the way down to here
	      });
	      ```

	      Assimilation
	      ------------

	      Sometimes the value you want to propagate to a downstream promise can only be
	      retrieved asynchronously. This can be achieved by returning a promise in the
	      fulfillment or rejection handler. The downstream promise will then be pending
	      until the returned promise is settled. This is called *assimilation*.

	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // The user's comments are now available
	      });
	      ```

	      If the assimliated promise rejects, then the downstream promise will also reject.

	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // If `findCommentsByAuthor` fulfills, we'll have the value here
	      }, function (reason) {
	        // If `findCommentsByAuthor` rejects, we'll have the reason here
	      });
	      ```

	      Simple Example
	      --------------

	      Synchronous Example

	      ```javascript
	      var result;

	      try {
	        result = findResult();
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```

	      Errback Example

	      ```js
	      findResult(function(result, err){
	        if (err) {
	          // failure
	        } else {
	          // success
	        }
	      });
	      ```

	      Promise Example;

	      ```javascript
	      findResult().then(function(result){
	        // success
	      }, function(reason){
	        // failure
	      });
	      ```

	      Advanced Example
	      --------------

	      Synchronous Example

	      ```javascript
	      var author, books;

	      try {
	        author = findAuthor();
	        books  = findBooksByAuthor(author);
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```

	      Errback Example

	      ```js

	      function foundBooks(books) {

	      }

	      function failure(reason) {

	      }

	      findAuthor(function(author, err){
	        if (err) {
	          failure(err);
	          // failure
	        } else {
	          try {
	            findBoooksByAuthor(author, function(books, err) {
	              if (err) {
	                failure(err);
	              } else {
	                try {
	                  foundBooks(books);
	                } catch(reason) {
	                  failure(reason);
	                }
	              }
	            });
	          } catch(error) {
	            failure(err);
	          }
	          // success
	        }
	      });
	      ```

	      Promise Example;

	      ```javascript
	      findAuthor().
	        then(findBooksByAuthor).
	        then(function(books){
	          // found books
	      }).catch(function(reason){
	        // something went wrong
	      });
	      ```

	      @method then
	      @param {Function} onFulfilled
	      @param {Function} onRejected
	      Useful for tooling.
	      @return {Promise}
	    */
	      then: function(onFulfillment, onRejection) {
	        var parent = this;
	        var state = parent._state;

	        if (state === lib$es6$promise$$internal$$FULFILLED && !onFulfillment || state === lib$es6$promise$$internal$$REJECTED && !onRejection) {
	          return this;
	        }

	        var child = new this.constructor(lib$es6$promise$$internal$$noop);
	        var result = parent._result;

	        if (state) {
	          var callback = arguments[state - 1];
	          lib$es6$promise$asap$$asap(function(){
	            lib$es6$promise$$internal$$invokeCallback(state, child, callback, result);
	          });
	        } else {
	          lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
	        }

	        return child;
	      },

	    /**
	      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	      as the catch block of a try/catch statement.

	      ```js
	      function findAuthor(){
	        throw new Error('couldn't find that author');
	      }

	      // synchronous
	      try {
	        findAuthor();
	      } catch(reason) {
	        // something went wrong
	      }

	      // async with promises
	      findAuthor().catch(function(reason){
	        // something went wrong
	      });
	      ```

	      @method catch
	      @param {Function} onRejection
	      Useful for tooling.
	      @return {Promise}
	    */
	      'catch': function(onRejection) {
	        return this.then(null, onRejection);
	      }
	    };
	    function lib$es6$promise$polyfill$$polyfill() {
	      var local;

	      if (typeof global !== 'undefined') {
	          local = global;
	      } else if (typeof self !== 'undefined') {
	          local = self;
	      } else {
	          try {
	              local = Function('return this')();
	          } catch (e) {
	              throw new Error('polyfill failed because global object is unavailable in this environment');
	          }
	      }

	      var P = local.Promise;

	      if (P && Object.prototype.toString.call(P.resolve()) === '[object Promise]' && !P.cast) {
	        return;
	      }

	      local.Promise = lib$es6$promise$promise$$default;
	    }
	    var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;

	    var lib$es6$promise$umd$$ES6Promise = {
	      'Promise': lib$es6$promise$promise$$default,
	      'polyfill': lib$es6$promise$polyfill$$default
	    };

	    /* global define:true module:true window: true */
	    if ("function" === 'function' && __webpack_require__(96)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return lib$es6$promise$umd$$ES6Promise; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = lib$es6$promise$umd$$ES6Promise;
	    } else if (typeof this !== 'undefined') {
	      this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
	    }

	    lib$es6$promise$polyfill$$default();
	}).call(this);


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8), (function() { return this; }()), __webpack_require__(94)(module)))

/***/ },
/* 94 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 95 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 96 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(98)
	module.exports = __webpack_require__(100)

	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(101)
	if (false) {
	(function () {
	var hotAPI = require("vue-hot-reload-api")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Item.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Item.vue","-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./Item.vue"], function () {
	var newOptions = require("-!babel!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Item.vue")
	if (newOptions && newOptions.__esModule) newOptions = newOptions.default
	var newTemplate = require("-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./Item.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(99);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(81)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-acdc38e4&file=Item.vue!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Item.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-acdc38e4&file=Item.vue!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Item.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(80)();
	// imports


	// module
	exports.push([module.id, ".item {\n  padding: 2px 0 2px 40px;\n  position: relative;\n  -webkit-transition: background-color .2s ease;\n  transition: background-color .2s ease; }\n  .item p {\n    margin: 2px 0; }\n  .item .title:visited {\n    color: #828282; }\n  .item .index {\n    color: #828282;\n    position: absolute;\n    width: 30px;\n    text-align: right;\n    left: 0;\n    top: 4px; }\n  .item .domain, .item .subtext {\n    font-size: 11px;\n    color: #828282; }\n    .item .domain a, .item .subtext a {\n      color: #828282; }\n  .item .subtext a:hover {\n    text-decoration: underline; }\n", ""]);

	// exports


/***/ },
/* 100 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {

	  name: 'Item',

	  props: {
	    item: Object,
	    index: Number
	  },

	  computed: {
	    href: function href() {
	      return this.item.url || '#/item/' + this.item.id;
	    },
	    showInfo: function showInfo() {
	      return this.item.type === 'story' || this.item.type === 'poll';
	    },
	    showDomain: function showDomain() {
	      return this.item.type === 'story';
	    }
	  }
	};

/***/ },
/* 101 */
/***/ function(module, exports) {

	module.exports = "<div class=\"item\">\r\n    <span class=\"index\">{{index}}.</span>\r\n    <p>\r\n      <a class=\"title\" :href=\"href\" target=\"_blank\">{{{item.title}}}</a>\r\n      <span class=\"domain\" v-show=\"showDomain\">\r\n        ({{item.url | domain}})\r\n      </span>\r\n    </p>\r\n    <p class=\"subtext\">\r\n      <span v-show=\"showInfo\">\r\n        {{item.score}} points by\r\n        <a :href=\"'#/user/' + item.by\">{{item.by}}</a>\r\n      </span>\r\n      {{item.time | fromNow}} ago\r\n      <span class=\"comments-link\" v-show=\"showInfo\">\r\n        | <a :href=\"'#/item/' + item.id\">{{item.descendants}} {{item.descendants | pluralize 'comment'}}</a>\r\n      </span>\r\n    </p>\r\n  </div>";

/***/ },
/* 102 */
/***/ function(module, exports) {

	module.exports = "<div class=\"news-view\" :class=\"{ loading: !items.length }\">\r\n    <!-- item list -->\r\n    <item\r\n      v-for=\"item in items\"\r\n      :item=\"item\"\r\n      :index=\"$index | formatItemIndex\"\r\n      track-by=\"id\">\r\n    </item>\r\n    <!-- navigation -->\r\n    <div class=\"nav\" v-show=\"items.length > 0\">\r\n      <a v-if=\"page > 1\" :href=\"'#/news/' + (page - 1)\">&lt; prev</a>\r\n      <a v-if=\"page < 4\" :href=\"'#/news/' + (page + 1)\">more...</a>\r\n    </div>\r\n  </div>";

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(104)
	module.exports = __webpack_require__(106)

	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(112)
	if (false) {
	(function () {
	var hotAPI = require("vue-hot-reload-api")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./ItemView.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./ItemView.vue","-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./ItemView.vue"], function () {
	var newOptions = require("-!babel!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./ItemView.vue")
	if (newOptions && newOptions.__esModule) newOptions = newOptions.default
	var newTemplate = require("-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./ItemView.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(105);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(81)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-70fe3cd3&file=ItemView.vue!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./ItemView.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-70fe3cd3&file=ItemView.vue!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./ItemView.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(80)();
	// imports


	// module
	exports.push([module.id, ".item-view .item {\n  padding-left: 0;\n  margin-bottom: 30px; }\n  .item-view .item .index {\n    display: none; }\n\n.item-view .poll-options {\n  margin-left: 30px;\n  margin-bottom: 40px; }\n  .item-view .poll-options li {\n    margin: 12px 0; }\n  .item-view .poll-options p {\n    margin: 8px 0; }\n  .item-view .poll-options .subtext {\n    color: #828282;\n    font-size: 11px; }\n", ""]);

	// exports


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _store = __webpack_require__(87);

	var _store2 = _interopRequireDefault(_store);

	var _Item = __webpack_require__(97);

	var _Item2 = _interopRequireDefault(_Item);

	var _Comment = __webpack_require__(107);

	var _Comment2 = _interopRequireDefault(_Comment);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {

	  name: 'ItemView',

	  components: {
	    Item: _Item2.default,
	    Comment: _Comment2.default
	  },

	  data: function data() {
	    return {
	      item: {},
	      comments: [],
	      pollOptions: null
	    };
	  },

	  route: {
	    data: function data(_ref) {
	      var to = _ref.to;

	      return _store2.default.fetchItem(to.params.id).then(function (item) {
	        return {
	          item: item,
	          comments: _store2.default.fetchItems(item.kids),
	          pollOptions: item.type === 'poll' ? _store2.default.fetchItems(item.parts) : null
	        };
	      });
	    }
	  }
	};

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(108)
	module.exports = __webpack_require__(110)

	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(111)
	if (false) {
	(function () {
	var hotAPI = require("vue-hot-reload-api")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Comment.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Comment.vue","-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./Comment.vue"], function () {
	var newOptions = require("-!babel!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./Comment.vue")
	if (newOptions && newOptions.__esModule) newOptions = newOptions.default
	var newTemplate = require("-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./Comment.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(109);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(81)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-917af998&file=Comment.vue!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Comment.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-917af998&file=Comment.vue!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Comment.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(80)();
	// imports


	// module
	exports.push([module.id, ".comhead {\n  color: #828282;\n  font-size: 11px;\n  margin-bottom: 8px; }\n  .comhead a {\n    color: #828282; }\n    .comhead a:hover {\n      text-decoration: underline; }\n  .comhead .toggle {\n    margin-right: 4px; }\n\n.comment-content {\n  margin: 0 0 16px 24px;\n  word-wrap: break-word; }\n  .comment-content code {\n    white-space: pre-wrap; }\n\n.child-comments {\n  margin: 8px 0 8px 22px; }\n", ""]);

	// exports


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _store = __webpack_require__(87);

	var _store2 = _interopRequireDefault(_store);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {

	  name: 'Comment',

	  props: {
	    comment: Object
	  },

	  data: function data() {
	    return {
	      childComments: [],
	      open: true
	    };
	  },
	  created: function created() {
	    var _this = this;

	    if (this.comment.kids) {
	      _store2.default.fetchItems(this.comment.kids).then(function (comments) {
	        _this.childComments = comments;
	      });
	    }
	  }
	};

/***/ },
/* 111 */
/***/ function(module, exports) {

	module.exports = "<li v-show=\"comment.text\">\r\n    <div class=\"comhead\">\r\n      <a class=\"toggle\" @click=\"open = !open\">{{open ? '[-]' : '[+]'}}</a>\r\n      <a :href=\"'#/user/' + comment.by\">{{comment.by}}</a>\r\n      {{comment.time | fromNow}} ago\r\n    </div>\r\n    <p class=\"comment-content\" v-show=\"open\">\r\n      {{{comment.text}}}\r\n    </p>\r\n    <ul class=\"child-comments\" v-if=\"comment.kids\" v-show=\"open\">\r\n      <comment v-for=\"comment in childComments\" :comment=\"comment\"></comment>\r\n    </ul>\r\n  </li>";

/***/ },
/* 112 */
/***/ function(module, exports) {

	module.exports = "<div class=\"item-view\" v-show=\"item\">\r\n    <item :item=\"item\"></item>\r\n    <ul class=\"poll-options\" v-if=\"pollOptions\">\r\n      <li v-for=\"option in pollOptions\">\r\n        <p>{{option.text}}</p>\r\n        <p class=\"subtext\">{{option.score}} points</p>\r\n      </li>\r\n    </ul>\r\n    <ul class=\"comments\" v-if=\"comments\">\r\n      <comment\r\n        v-for=\"comment in comments\"\r\n        :comment=\"comment\">\r\n      </comment>\r\n    </ul>\r\n    <p v-show=\"!comments.length\">No comments yet.</p>\r\n  </div>";

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(114)
	module.exports = __webpack_require__(116)

	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(117)
	if (false) {
	(function () {
	var hotAPI = require("vue-hot-reload-api")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./UserView.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./UserView.vue","-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./UserView.vue"], function () {
	var newOptions = require("-!babel!./../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./UserView.vue")
	if (newOptions && newOptions.__esModule) newOptions = newOptions.default
	var newTemplate = require("-!vue-html!./../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./UserView.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(115);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(81)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-1dc3758b&file=UserView.vue!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./UserView.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-1dc3758b&file=UserView.vue!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./UserView.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(80)();
	// imports


	// module
	exports.push([module.id, ".user-view {\n  color: #828282; }\n  .user-view li {\n    margin: 5px 0; }\n  .user-view .label {\n    display: inline-block;\n    min-width: 60px; }\n  .user-view .about {\n    margin-top: 1em; }\n  .user-view .links a {\n    text-decoration: underline; }\n", ""]);

	// exports


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _store = __webpack_require__(87);

	var _store2 = _interopRequireDefault(_store);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {

	  name: 'UserView',

	  data: function data() {
	    return {
	      user: {}
	    };
	  },

	  route: {
	    data: function data(_ref) {
	      var to = _ref.to;

	      return {
	        user: _store2.default.fetchUser(to.params.id)
	      };
	    }
	  }
	};

/***/ },
/* 117 */
/***/ function(module, exports) {

	module.exports = "<div class=\"user-view\" v-show=\"user\">\r\n    <ul>\r\n      <li><span class=\"label\">user:</span> {{user.id}}</li>\r\n      <li><span class=\"label\">created:</span> {{user.created | fromNow}} ago</li>\r\n      <li><span class=\"label\">karma:</span> {{user.karma}}</li>\r\n      <li>\r\n        <span class=\"label\">about:</span>\r\n        <div class=\"about\">\r\n          {{{user.about}}}\r\n        </div>\r\n      </li>\r\n    </ul>\r\n    <p class=\"links\">\r\n      <a :href=\"'https://news.ycombinator.com/submitted?id=' + user.id\">submissions</a><br>\r\n      <a :href=\"'https://news.ycombinator.com/threads?id=' + user.id\">comments</a>\r\n    </p>\r\n  </div>";

/***/ }
/******/ ]);