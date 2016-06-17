/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(4);
	__webpack_require__(6);
	__webpack_require__(5);
	__webpack_require__(3);
	__webpack_require__(7);
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Dialog = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(2);
	
	var _http = __webpack_require__(3);
	
	var _http2 = _interopRequireDefault(_http);
	
	var _dragable = __webpack_require__(4);
	
	var _fx = __webpack_require__(5);
	
	var _fx2 = _interopRequireDefault(_fx);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 弹窗组件
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var defaults = {
		templ: {
			panel: function panel(title, content, btns) {
				return this.mask('\n\t\t\t\t<div class="panel panel-default">\n\t\t\t\t\t<div class="panel-heading">\n\t\t\t\t\t\t' + title + '\n\t\t\t\t\t\t<span class="close">&times;</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="panel-body">\n\t\t\t\t\t\t' + content + '\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="panel-footing">\n\t\t\t\t\t\t' + btns + '\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t');
			},
			loading: function loading() {
				return this.mask('\n\t\t\t\t\t<div class="loading">\n\t\t\t\t\t</div>\n\t\t\t');
			},
			mask: function mask(main) {
				return '\n\t\t\t\t<div class="mask">\n\t\t\t\t\t' + main + '\n\t\t\t\t</div>\n\t\t\t';
			},
			prompt: function prompt() {
				return '<div class="prompt" id="__prompt"></div>';
			}
		}
	};
	
	// 包装dialog方法
	function packaging(type, args) {
		var dialog = new Dialog();
		dialog[type].apply(dialog, args);
		return dialog;
	}
	
	var guide = 0;
	
	var Dialog = function (_BaseMethod) {
		_inherits(Dialog, _BaseMethod);
	
		function Dialog() {
			_classCallCheck(this, Dialog);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Dialog).call(this));
	
			_this.initFn('ready', 'ok', 'cancel', 'order', 'close', 'ready');
			// this.setup();
			return _this;
		}
	
		_createClass(Dialog, [{
			key: 'alert',
			value: function alert(msg, icon) {
				this.title = '提示框';
				this.btns = [{ text: '确定', style: 'primary' }];
				this.create(msg, icon);
				this.events();
				this.flex();
				this.position();
				this.show();
			}
	
			// 确认提示框
	
		}, {
			key: 'confirm',
			value: function confirm(msg, icon) {
				this.title = '提示框';
				this.btns = [{ text: '确定', style: 'primary' }, { text: '取消', style: 'cancel' }];
				this.create(msg, icon);
				this.events();
				this.flex();
				this.position();
				this.show();
			}
	
			// 异步加载页面
	
		}, {
			key: 'load',
			value: function load() {
				var _this2 = this;
	
				this.loading();
				_http2.default.get('test.html', this.param).on('complete', function () {
					_this2.loading('off');
				}).on('success', function (html) {
					_this2.title = '默认标题';
					_this2.btns = [{ text: '保存', style: 'primary' }];
					_this2.create();
					_this2.events();
					_this2.render(html);
					_this2.flex();
					_this2.position();
					_this2.show();
				}).on('error', function () {
					_this2.alert(statusText, 'error');
				});
			}
	
			// 提示
	
		}, {
			key: 'prompt',
			value: function prompt(msg, icon) {
				var _this3 = this;
	
				var ms = arguments.length <= 2 || arguments[2] === undefined ? 3000 : arguments[2];
	
				var prompt = (0, _util.$s)('#__prompt')[0],
				    timer;
				if (!prompt) {
					prompt = (0, _util.parseDOM)(defaults.templ.prompt()).children[0];
					document.body.appendChild(prompt);
				} else {
					clearTimeout(prompt.getAttribute('data-timer'));
				}
	
				prompt.innerHTML = msg;
				prompt.style.display = 'block';
				timer = setTimeout(function () {
					prompt.style.display = 'none';
					_this3.trigger(_this3.fn.ready, prompt);
				}, ms);
				prompt.setAttribute('data-timer', timer);
			}
	
			// 加载中
	
		}, {
			key: 'loading',
			value: function loading(state) {
				if (state == 'off') {
					if (guide > 0) guide--;
					if (guide == 0) {
						// dg.destory();
						var mask = (0, _util.$s)('#__loading')[0];
						if (mask) {
							mask.style.display = 'none';
						}
					}
				} else {
					if (guide == 0) {
						var mask = (0, _util.$s)('#__loading')[0];
						if (!mask) {
							mask = (0, _util.parseDOM)(defaults.templ.loading()).children[0];
							mask.id = '__loading';
							mask.style.zIndex = 9991;
							document.body.appendChild(mask);
						} else {
							mask.style.display = 'block';
						}
					}
					guide++;
				}
			}
		}, {
			key: 'create',
			value: function create(msg, icon) {
				var _this4 = this;
	
				var templ = (0, _util.parseDOM)(defaults.templ.panel(this.title,
				// content
				function () {
					if (msg) {
						return '\n\t\t\t\t\t\t\t<div class="icon icon-' + icon + '"></div>\n\t\t\t\t\t\t\t<div class="panel-msg">' + msg + '</div>\n\t\t\t\t\t\t';
					} else {
						return '';
					}
				}(),
				// btns
				function () {
					return _this4.btns.map(function (item) {
						return '<button type="button" class="btn btn-' + item.style + '">' + item.text + '</button>';
					}).join('\n');
				}()));
	
				this.mask = templ.children[0];
				this.panel = (0, _util.$s)('.panel', this.mask)[0];
				this.heading = (0, _util.$s)('.panel-heading', this.panel)[0];
				this.body = (0, _util.$s)('.panel-body', this.panel)[0];
				this.footing = (0, _util.$s)('.panel-footing', this.panel)[0];
				this.btnClose = (0, _util.$s)('.close', this.heading)[0];
				document.body.appendChild(templ);
			}
		}, {
			key: 'render',
			value: function render(html) {
				this.body.appendChild((0, _util.parseDOM)(html));
			}
	
			// 定位
	
		}, {
			key: 'position',
			value: function position() {
				this.panel.style.left = (document.documentElement.clientWidth - this.panel.offsetWidth) / 2 + 'px';
				this.panel.style.top = (document.documentElement.clientHeight - this.panel.offsetHeight) / 2 + 'px';
			}
			// 弹性窗口
	
		}, {
			key: 'flex',
			value: function flex() {}
	
			// 显示
	
		}, {
			key: 'show',
			value: function show() {
				_fx2.default.frame(this.panel, 'spreadIn');
			}
			// 隐藏
	
		}, {
			key: 'hide',
			value: function hide() {
				var _this5 = this;
	
				_fx2.default.frame(this.panel, 'spreadOut');
				_fx2.default.frame(this.mask, 'fadeOut', function () {
					return _this5.destory();
				});
			}
	
			// 销毁
	
		}, {
			key: 'destory',
			value: function destory() {
				if (this.mask) {
					this._off && this._off();
					document.body.removeChild(this.mask);
					this.mask = null;
				}
			}
		}, {
			key: 'events',
			value: function events() {
	
				var that = this;
				// 事件委托
				(0, _util.addEvent)(this.footing, 'click', 'button', function (event) {
					var index = (0, _util.getIndex)(this),
					    result;
					switch (index) {
						// 默认0是确定
						case 0:
							result = that.trigger(that.fn.ok, this, event);
							break;
						// 默认1是取消
						case 1:
							result = that.trigger(that.fn.cancel, this, event);
							break;
					}
	
					result = that.trigger(that.fn.order[index], this, event);
	
					if (result) {
						// that.destory();
						that.hide();
					}
				});
				(0, _util.addEvent)(this.btnClose, 'click', function (event) {
					// that.destory();
					that.trigger(that.fn.close, this, event);
					that.hide();
				});
	
				this.resize();
				new _dragable.Dragable(this.panel, { target: this.heading });
			}
	
			// 窗口resize
	
		}, {
			key: 'resize',
			value: function resize() {
				var _this6 = this;
	
				var handler = function handler() {
					return _this6.position();
				};
				(0, _util.addEvent)(window, 'resize', handler);
				this._off = function () {
					return (0, _util.removeEvent)(window, 'resize', handler);
				};
			}
	
			// 更新数据
			/*update(fn) {
	  	var that = this;
	  	if (!this.scope) {
	  		this.scope = {
	  			set msg(value) {
	  				that.msg = value;
	  				var prompt = $s('#__prompt')[0];
	  				if (prompt) {
	  					prompt.innerHTML = value;
	  				}
	  			}
	  		};
	  	}
	  
	  	fn && fn(this.scope);
	  	return this;
	  }*/
	
			// 静态方法
	
		}], [{
			key: 'alert',
			value: function alert() {
				return packaging('alert', arguments);
			}
		}, {
			key: 'confirm',
			value: function confirm() {
				return packaging('confirm', arguments);
			}
		}, {
			key: 'prompt',
			value: function prompt() {
				return packaging('prompt', arguments);
			}
		}, {
			key: 'loading',
			value: function loading() {
				return packaging('loading', arguments);
			}
		}, {
			key: 'load',
			value: function load() {
				return packaging('load', arguments);
			}
		}]);
	
		return Dialog;
	}(_util.BaseMethod);
	
	// 全局
	
	
	global.Dialog = Dialog;
	exports.Dialog = Dialog;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * util.js
	 * 工具类
	 * by bang
	 */
	
	// 无操作
	function noop() {}
	
	// 基于class
	
	var BaseMethod = function () {
		function BaseMethod() {
			_classCallCheck(this, BaseMethod);
	
			this.fn = {};
		}
	
		// 初始化监听事件
	
	
		_createClass(BaseMethod, [{
			key: 'initFn',
			value: function initFn() {
				var _this = this;
	
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				forEach(args, function (name) {
					_this.fn[name] = [];
				});
			}
	
			// 安装事件
	
		}, {
			key: 'on',
			value: function on(type, fn) {
				if (isArray(this.fn[type])) {
					this.fn[type].push(fn);
				}
				return this;
			}
			// 卸载事件
	
		}, {
			key: 'un',
			value: function un(type, fn) {
				if (isArray(this.fn[type])) {
					if (fn) {
						for (var i = 0, f; f = this.fn[type][i]; i++) {
							if (f === fn) {
								this.fn[type].splice(i, 1);
								i--;
							}
						}
					} else {
						this.fn[type].length = 0;
					}
				}
				return this;
			}
	
			// 修改设置属性
	
		}, {
			key: 'set',
			value: function set(prop, value) {
				this[prop] = value;
			}
			// 修改添加属性
	
		}, {
			key: 'add',
			value: function add(prop, value) {
				if (isArray(this[prop])) {
					this[prop].push(value);
				}
			}
	
			// 触发事件
	
		}, {
			key: 'trigger',
			value: function trigger(fn, obj) {
				for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
					args[_key2 - 2] = arguments[_key2];
				}
	
				var result;
				if (isFunction(fn)) {
					result = fn.call.apply(fn, [obj].concat(args));
				} else if (isArray(fn)) {
					fn.forEach(function (f) {
						result = f.call.apply(f, [obj].concat(args));
						return result;
					});
				}
	
				return result !== false;
			}
		}]);
	
		return BaseMethod;
	}();
	
	// 类型判断
	
	
	var obt = Object.prototype.toString;
	function isType(type) {
		return function (obj) {
			return obt.call(obj) === '[object ' + type + ']';
		};
	}
	
	var isObject = isType('Object'),
	    isArray = isType('Array'),
	    isNumber = isType('Number'),
	    isString = isType('String'),
	    isFunction = isType('Function');
	
	// 驼峰命名
	function named(name) {
		return name.replace(/[-]\w/g, function (a) {
			return a.charAt(1).toUpperCase();
		});
	}
	
	// 获取dom节点
	function $s(expr) {
		var root = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];
	
		if (isString(expr)) {
			return root.querySelectorAll(expr);
		} else if (expr) {
			return isNumber(expr.length) ? expr : [expr];
		} else {
			return [];
		}
	}
	
	// 获取索引
	function getIndex(source) {
		var arr = arguments.length <= 1 || arguments[1] === undefined ? source.parentNode.children : arguments[1];
	
		return [].indexOf.call(arr, source);
	}
	
	// 获取range
	function getRange() {
		var range = document.createRange();
		range.selectNodeContents(document.body);
	
		getRange = function getRange() {
			return range;
		};
		return getRange();
	}
	
	// 解析html
	function parseDOM(html) {
		var range = getRange();
	
		if (range.createContextualFragment) {
			return range.createContextualFragment(html);
		} else {
			var fragment = document.createDocumentFragment();
			var div = document.createElement('div');
			div.innerHTML = html;
			while (div.firstChild) {
				fragment.appendChild(div.firstChild);
			}
			return fragment;
		}
	}
	
	// 设置样式
	function getStyle(el, name) {
		// 标准
		if (window.getComputedStyle) {
			return window.getComputedStyle(el, '')[name] || null;
		}
		// IE8-
		else {
				// 透明度
				if (name == 'opacity') {
					return (el.filters.alpha || el.filters['DXImageTransform.Microsoft.Alpha'] || 100) / 100;
				} else {
					return el.currentStyle[name] || null;
				}
			}
	}
	
	// 获取样式
	function setStyle(el, name, value) {
	
		if (isString(el)) {
			el = $s(el)[0];
		} else if (isArray(el)) {
			forEach(el, function (elem) {
				return setStyle(elem, name, value);
			});
		}
	
		var props = {};
		if (arguments.length == 3 && typeof name == 'string') {
			props[name] = value;
		} else {
			props = name;
		}
	
		for (var _name in props) {
			if (_name == 'opacity') {
				el.style.opacity = props[_name];
				el.style.filter = 'alpha(filter=' + props[_name] / 100 + ')';
			} else if (isNaN(props[_name])) {
				el.style[_name] = props[_name];
			} else {
				el.style[_name] = props[_name] + 'px';
			}
		}
	}
	
	// 兼容事件
	function fixEvent(event) {
		event = event || window.event;
	
		if (!event.target) {
			event.target = event.srcElement;
		}
	
		if (!event.stopPropagation) {
			event.stopPropagation = function () {
				event.cancelBubble = true;
			};
		}
	
		if (!event.preventDefault) {
			event.preventDefault = function () {
				event.returnValue = false;
			};
		}
	
		return event;
	}
	
	// 判断包含关系
	function contains(e1, e2) {
		if (e1.contains) {
			return e1.contains(e2);
		} else {
			return e1.compareDocumentPosition(e2) == 16;
		}
	}
	
	// 事件绑定
	function addEvent(el, type, expr, fn) {
		// el.addEventListener(type, fn, false);
	
		if (isString(el)) {
			el = $s(el);
		}
	
		if (el.length) {
			forEach(el, function (elem) {
				addEvent(elem, type, expr, fn);
			});
		} else {
			if (isFunction(expr)) {
				fn = expr;
	
				/*let handler = (event) => fn.call(el, fixEvent(event));
	   handler.fn = fn;*/
				if (suports.is('addEventListener')) {
					el.addEventListener(type, fn, false);
				} else {
					el.attachEvent('on' + type, fn);
				}
			} else {
				delegate(el, type, expr, fn);
			}
		}
	}
	
	// 事件解绑
	function removeEvent(el, type, fn) {
		if (suports.is('removeEventListener')) {
			el.removeEventListener(type, fn);
		} else {
			el.detachEvent('on' + type, fn);
		}
	}
	
	// 事件委托
	function delegate(el, type, expr, fn) {
		addEvent(el, type, function (event) {
			event = fixEvent(event);
			var target = event.target;
	
			if (suports.is('matches')) {
				while (target && target !== el) {
					if (target.matches(expr)) {
						fn && fn.call(target, event);
						break;
					}
					target = target.parentNode;
				}
			} else {
				var els = $s(expr);
				els = Array.from(els);
				while (target !== el) {
					if (els.indexOf(el) > -1) {
						fn && fn.call(target, event);
						break;
					}
					target = target.parentNode;
				}
			}
		});
	}
	
	// 动画帧
	var requestAnim = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function (fn) {
		return setTimeout(fn, 1000 / 60);
	};
	
	// 遍历类数组
	function forEach(array, func) {
		if (isFunction(func)) {
			for (var i = 0, len = array.length; i < len; i++) {
				if (func(array[i], i) === false) break;
			}
		}
	}
	
	// 混合 类似于extend
	function mixin(target) {
		for (var _len3 = arguments.length, sources = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
			sources[_key3 - 1] = arguments[_key3];
		}
	
		forEach(sources, function (source) {
			for (var key in source) {
				target[key] = source[key];
			}
		});
		return target;
	}
	
	// 模板
	function templ(str) {
		for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
			args[_key4 - 1] = arguments[_key4];
		}
	
		str = str.replace(/\{(\d+)\}/gm, function (m, n) {
			return args[n] || '';
		});
		return str;
	}
	
	// 日期输出格式
	function dateFormat(fmt, date) {
		date = date || new Date();
		function _pad(num) {
			if (num < 10) {
				num = '0' + num;
			}
			return num;
		}
	
		return String(fmt).replace(/yyyy|MM|dd|HH|mm|ss|D/g, function (m) {
			switch (m) {
				case 'yyyy':
					return date.getFullYear();
				case 'MM':
					return _pad(date.getMonth() + 1);
				case 'dd':
					return _pad(date.getDate());
				case 'HH':
					return _pad(date.getHours());
				case 'mm':
					return _pad(date.getMinutes());
				case 'ss':
					return _pad(date.getSeconds());
				case 'D':
					var locDays = ['日', '一', '二', '三', '四', '五', '六'];
					return _pad(locDays[date.getDay()]);
			}
		});
	}
	
	// 获取相对页面所在位置
	function getPoint(el) {
		var x = 0,
		    y = 0;
	
		while (el) {
			x += el.offsetLeft;
			y += el.offsetTop;
	
			el = el.offsetParent;
		}
	
		return {
			x: x, y: y
		};
	}
	
	// 检测浏览器支持
	var suports = {
		_cache: {},
		is: function is(prop) {
			return true;
		},
	
		// 获取支持属性
		get: function get(prop) {
			if (this._cache[prop]) return this._cache[prop];
			return prop;
		}
	};
	
	exports.noop = noop;
	exports.BaseMethod = BaseMethod;
	exports.isObject = isObject;
	exports.isNumber = isNumber;
	exports.isArray = isArray;
	exports.isString = isString;
	exports.isFunction = isFunction;
	exports.forEach = forEach;
	exports.getIndex = getIndex;
	exports.$s = $s;
	exports.parseDOM = parseDOM;
	exports.getStyle = getStyle;
	exports.setStyle = setStyle;
	exports.contains = contains;
	exports.addEvent = addEvent;
	exports.removeEvent = removeEvent;
	exports.templ = templ;
	exports.dateFormat = dateFormat;
	exports.getPoint = getPoint;
	exports.mixin = mixin;
	exports.requestAnim = requestAnim;
	exports.suports = suports;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// http请求
	
	var Http = function (_BaseMethod) {
		_inherits(Http, _BaseMethod);
	
		function Http(_ref) {
			var _ref$method = _ref.method;
			var method = _ref$method === undefined ? 'GET' : _ref$method;
			var _ref$url = _ref.url;
			var url = _ref$url === undefined ? '' : _ref$url;
			var _ref$param = _ref.param;
			var param = _ref$param === undefined ? null : _ref$param;
	
			_classCallCheck(this, Http);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Http).call(this));
	
			_this.initFn('beforeSend', 'success', 'error', 'complete');
			_this.method = method;
			_this.url = url;
			_this.param = param;
			_this.setup();
			return _this;
		}
	
		_createClass(Http, [{
			key: 'setup',
			value: function setup() {
				this.create();
				this.events();
				this.send(this.param);
			}
		}, {
			key: 'create',
			value: function create() {
				this.xhr = new XMLHttpRequest();
			}
		}, {
			key: 'send',
			value: function send(param) {
				this.beforeSend();
				switch (this.method.toUpperCase()) {
					case 'GET':
						this.xhr.open('GET', this.url, true);
						this.xhr.send();
						break;
					case 'POST':
						this.xhr.open('POST', this.url, true);
						this.xhr.send(this.param);
						break;
				}
			}
		}, {
			key: 'events',
			value: function events() {
				var _this2 = this;
	
				this.xhr.onreadystatechange = function () {
					// console.log(this.xhr.readyState);
					if (_this2.xhr.readyState == 4) {
						switch (_this2.xhr.status) {
							case 200:
							// 有缓存
							case 302:
								_this2.success();
								break;
							case 404:
							case 500:
								_this2.error();
								break;
						}
						_this2.complete();
					}
				};
			}
	
			// 请求发送前
	
		}, {
			key: 'beforeSend',
			value: function beforeSend() {
				this.trigger(this.fn.beforeSend, this.xhr);
			}
			// 成功
	
		}, {
			key: 'success',
			value: function success() {
				this.trigger(this.fn.success, this.xhr, this.xhr.responseText);
			}
			// 错误
	
		}, {
			key: 'error',
			value: function error() {
				this.trigger(this.fn.error, this.xhr, this.xhr.statusText);
			}
			// 完成
	
		}, {
			key: 'complete',
			value: function complete() {
				this.trigger(this.fn.complete, this.xhr);
			}
		}], [{
			key: 'get',
			value: function get(url, param) {
				return new Http({ method: 'GET', url: url, param: param });
			}
		}, {
			key: 'post',
			value: function post() {
				return new Http({ method: 'POST', url: url, param: param });
			}
		}]);
	
		return Http;
	}(_util.BaseMethod);
	
	exports.default = Http;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Dragable = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 拖动
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	
	var Dragable = function (_BaseMethod) {
		_inherits(Dragable, _BaseMethod);
	
		function Dragable(el, options) {
			_classCallCheck(this, Dragable);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Dragable).call(this));
	
			_this.el = (0, _util.$s)(el)[0];
			_this.target = (0, _util.$s)(options.target)[0] || _this.el;
			_this.initFn('begin', 'move', 'end');
			_this.setup();
			return _this;
		}
	
		// 安装
	
	
		_createClass(Dragable, [{
			key: 'setup',
			value: function setup() {
				var _this2 = this;
	
				(0, _util.addEvent)(this.target, 'mousedown', function (event) {
					return _this2.begin(event);
				});
			}
		}, {
			key: 'begin',
			value: function begin(event) {
				var _this3 = this;
	
				// this.target
				event.preventDefault();
	
				this.sx = event.clientX - this.el.offsetLeft;
				this.sy = event.clientY - this.el.offsetTop;
	
				var _move = function _move(event) {
					return _this3.move(event);
				};
				var _end = function _end(event) {
					return _this3.end(event);
				};
				this._off = function () {
					(0, _util.removeEvent)(document, 'mousemove', _move);
					(0, _util.removeEvent)(document, 'mouseup', _end);
				};
				(0, _util.addEvent)(document, 'mousemove', _move);
				(0, _util.addEvent)(document, 'mouseup', _end);
			}
		}, {
			key: 'move',
			value: function move(event) {
				event.preventDefault();
	
				this.x = event.clientX - this.sx;
				this.y = event.clientY - this.sy;
	
				this.el.style.left = this.x + 'px';
				this.el.style.top = this.y + 'px';
			}
		}, {
			key: 'end',
			value: function end(event) {
				event.preventDefault();
				this._off();
			}
		}]);
	
		return Dragable;
	}(_util.BaseMethod);
	
	exports.Dragable = Dragable;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 特效
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var Transition = function (_BaseMethod) {
		_inherits(Transition, _BaseMethod);
	
		function Transition(el, options) {
			_classCallCheck(this, Transition);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Transition).call(this));
	
			_this.el = (0, _util.$s)(el)[0];
			_this.setOptions(options);
			_this.initFn('complete');
			return _this;
		}
	
		_createClass(Transition, [{
			key: 'setOptions',
			value: function setOptions(_ref) {
				var from = _ref.from;
				var to = _ref.to;
				var duration = _ref.duration;
				var easing = _ref.easing;
				var delay = _ref.delay;
	
				this.from = from || {};
				this.to = to || {};
				this.duration = duration || '';
				this.delay = delay || '';
				this.easing = easing || '400ms';
			}
		}, {
			key: 'run',
			value: function run() {
				var _this2 = this;
	
				var transition = _util.suports.get('transition'),
				    transitionend = _util.suports.get('transitionend');
	
				this.from[transition] = 'none';
				(0, _util.setStyle)(this.el, this.from);
				(0, _util.removeEvent)(this.el, transitionend);
	
				var handler = function handler(event) {
					event.preventDefault();
					_this2.trigger(_this2.fn.complete, _this2.el, event);
					_this2.from[transition] = 'none';
					(0, _util.removeEvent)(_this2.el, transitionend, handler);
				};
	
				(0, _util.addEvent)(this.el, transitionend, handler);
				(0, _util.requestAnim)(function () {
					_this2.to[transition] = ['all', _this2.duration, _this2.delay, _this2.easing].join(' ');
					(0, _util.setStyle)(_this2.el, _this2.to);
				});
			}
		}]);
	
		return Transition;
	}(_util.BaseMethod);
	
	// 设置动画
	
	
	function frame(element, cls, complete) {
		element = (0, _util.$s)(element)[0];
	
		if (_util.suports.is('animation')) {
			var i;
	
			(function () {
				var handler = function handler() {
					for (var i = 0; i < cls.length; i++) {
						element.classList.remove(cls[i]);
					}
					(0, _util.removeEvent)(element, 'webkitAnimationEnd', handler);
					(0, _util.removeEvent)(element, 'animationend', handler);
					complete && complete();
				};
	
				if ((0, _util.isString)(cls)) {
					cls = cls.trim().split(/\s+/);
				}
	
				for (i = 0; i < cls.length; i++) {
					element.classList.add(cls[i]);
				}
	
				(0, _util.addEvent)(element, 'webkitAnimationEnd', handler);
				(0, _util.addEvent)(element, 'animationend', handler);
			})();
		} else {
			complete && complete.call(element);
		}
	}
	
	/*new Transition('#el', {
			form: ,
			to: ,
			duration: '400'
		})
		.on()
		.run();
	
	new Animation('#el', 'fadeOut')
		.on('complete', () => {
			console.log('animation is complete');
		})
		.run();*/
	
	var fx = { frame: frame };
	
	exports.default = fx;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(7);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _dialog = __webpack_require__(1);
	
	var _util = __webpack_require__(2);
	
	var type = (0, _util.$s)('#type')[0],
	    icon = (0, _util.$s)('#icon')[0],
	    msg = (0, _util.$s)('#msg')[0];
	
	// dialog('loading');
	(0, _util.$s)('#btn')[0].onclick = function () {
		_dialog.Dialog[type.value](msg.value, icon.value).on('ok', function (event) {
			console.log('click ok button');
		}).on('cancel', function (event) {
			console.log('click cancel button');
		});
	
		if (type.value == 'loading') {
			setTimeout(function () {
				var second = 5;
				var dialog = _dialog.Dialog.prompt(second + '秒后自动关闭loading', 6000)
				/*.update((scope) => {
	   	setTimeout(function loop() {
	   		second--;
	   		if (second > 0) {
	   			scope.msg = `${second}秒后自动关闭loading`;
	   			setTimeout(loop, 1000);
	   		}
	   	}, 1000);
	   })*/
				.on('ready', function () {
					return _dialog.Dialog.loading('off');
				});
			}, 1000);
		}
	};

/***/ }
/******/ ]);
//# sourceMappingURL=entry.js.map