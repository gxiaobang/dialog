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
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.dialog = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(2);
	
	var _dragable = __webpack_require__(3);
	
	var _fx = __webpack_require__(4);
	
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
	var guide = 0,
	    dg;
	
	var Dialog = function (_BaseMethod) {
		_inherits(Dialog, _BaseMethod);
	
		function Dialog() {
			_classCallCheck(this, Dialog);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Dialog).call(this));
	
			_this.fn = {
				ready: [],
				ok: [],
				cancel: [],
				// 按钮顺序
				order: [],
				close: []
			};
			_this.setup.apply(_this, arguments);
			return _this;
		}
	
		_createClass(Dialog, [{
			key: 'alert',
			value: function alert() {
				this.title = '提示框';
				this.btns = [{ text: '确定', style: 'primary' }];
				this.create();
				this.events();
				this.flex();
				this.position();
				this.show();
			}
	
			// 确认提示框
	
		}, {
			key: 'confirm',
			value: function confirm() {
				this.title = '提示框';
				this.btns = [{ text: '确定', style: 'primary' }, { text: '取消', style: 'cancel' }];
				this.create();
				this.events();
				this.flex();
				this.position();
				this.show();
			}
	
			// 异步加载页面
	
		}, {
			key: 'load',
			value: function load() {
				var that = this;
				(0, _util.http)({
					url: this.url,
					method: this.method,
					param: this.param,
					success: function success(html) {
						that.create();
						that.render(html);
						that.events();
						that.flex();
						that.position();
						that.show();
					},
					beforeSend: function beforeSend() {
						that.loading();
					},
					complete: function complete() {
						that.closeLoading();
					},
					error: function error(statusText) {
						this.alert(statusText, 'error');
					}
				});
			}
	
			// 提示
	
		}, {
			key: 'prompt',
			value: function prompt(msg, icon) {
				var ms = arguments.length <= 2 || arguments[2] === undefined ? 3000 : arguments[2];
	
				var prompt = (0, _util.getDOM)('#__prompt')[0],
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
				}, ms);
				prompt.setAttribute('data-timer', timer);
			}
	
			// 加载中
	
		}, {
			key: 'loading',
			value: function loading() {
				if (guide == 0) {
					dg = this;
					document.body.appendChild((0, _util.parseDOM)(defaults.templ.loading()));
				}
				guide++;
			}
		}, {
			key: 'closeLoading',
			value: function closeLoading() {
				guide--;
				if (guide == 0) {
					dg.destory();
					dg = null;
				}
			}
	
			// 设置
	
		}, {
			key: 'setup',
			value: function setup() {
				this.type = arguments.length <= 0 ? undefined : arguments[0];
				switch (this.type) {
					case 'alert':
					case 'confirm':
						this.msg = arguments.length <= 1 ? undefined : arguments[1];
						this.icon = arguments.length <= 2 ? undefined : arguments[2];
						this[this.type]();
						break;
					case 'load':
						this.url = arguments.length <= 1 ? undefined : arguments[1];
						this.param = arguments.length <= 2 ? undefined : arguments[2];
						this[this.type]();
						break;
					case 'loading':
						this.loading();
						break;
					case 'close loading':
						this.closeLoading();
						break;
					case 'prompt':
						this.prompt(arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2], arguments.length <= 3 ? undefined : arguments[3]);
						break;
				}
			}
		}, {
			key: 'create',
			value: function create() {
				var _this2 = this;
	
				var templ = (0, _util.parseDOM)(defaults.templ.panel(this.title,
				// content
				function () {
					if (_this2.msg) {
						return '\n\t\t\t\t\t\t\t<div class="icon icon-' + _this2.icon + '"></div>\n\t\t\t\t\t\t\t<div class="panel-msg">' + _this2.msg + '</div>\n\t\t\t\t\t\t';
					} else {
						return '';
					}
				}(),
				// btns
				function () {
					return _this2.btns.map(function (item) {
						return '<button type="button" class="btn btn-' + item.style + '">' + item.text + '</button>';
					}).join('\n');
				}()));
	
				this.mask = templ.children[0];
				this.panel = (0, _util.getDOM)('.panel', this.mask)[0];
				this.heading = (0, _util.getDOM)('.panel-heading', this.panel)[0];
				this.body = (0, _util.getDOM)('.panel-body', this.panel)[0];
				this.footing = (0, _util.getDOM)('.panel-footing', this.panel)[0];
				this.btnClose = (0, _util.getDOM)('.close', this.heading)[0];
				document.body.appendChild(templ);
			}
		}, {
			key: 'render',
			value: function render(html) {
				this.content.appendChild((0, _util.parseDOM)(html));
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
				new _fx.Transition(this.mask, {
					from: {
						opacity: 0
					},
					to: {
						opacity: 1
					},
					duration: '300ms'
				}).on('complete', function () {
					console.log('transition is complete.');
				}).run();
			}
			// 隐藏
	
		}, {
			key: 'hide',
			value: function hide() {
				var _this3 = this;
	
				new _fx.Transition(this.mask, { to: { opacity: 0 } }).on('complete', function () {
					return _this3.destory();
				}).run();
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
	
				/*for (let i = 0, btn; btn = this.btns[i]; i++) {
	   	switch (btn.getAttribute('data-duty')) {
	   		case 'ok':
	   			addEvent(btn, 'click', this.fn.ok);
	   			break;
	   		case 'cancel':
	   			addEvent(btn, 'click', this.fn.cancel);
	   			break;
	   	}
	   	if (this.fn.order[i]) {
	   		addEvent(btn, 'click', this.fn.order[i]);
	   	}
	   }*/
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
				new _dragable.Dragable(this.panel);
			}
	
			// 窗口resize
	
		}, {
			key: 'resize',
			value: function resize() {
				var _this4 = this;
	
				var handler = function handler() {
					return _this4.position();
				};
				(0, _util.addEvent)(window, 'resize', handler);
				this._off = function () {
					return (0, _util.removeEvent)(window, 'resize', handler);
				};
			}
		}]);
	
		return Dialog;
	}(_util.BaseMethod);
	
	/*dialog('alert', '确认框', 'warn')
		.on('ok', () => {
			console.log('点了确定按钮');
		});
	
	dialog('confirm', '选择确认框', 'inquiry')
		.on('ok', () => {
			console.log('点了确定按钮');
		})
		.on('cancel', () => {
			console.log('点了取消按钮');
		});
	
	dialog('load', '/page', { id: '001' })
		.on('ready', () => {
			console.log('页面加载完成');
		})
		.on('ok', () => {
			console.log('点了确定按钮');
		})
		.on('order', () => {
			console.log('第一个按钮')
		})
		.on('order', () => {
			console.log('第二个按钮')
		});
	
	// loading
	dialog('loading');
	// close loading
	dialog('close loading');*/
	
	var dialog = exports.dialog = function dialog() {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}
	
		return new (Function.prototype.bind.apply(Dialog, [null].concat(args)))();
	};

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
	function getDOM(expr) {
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
			el = getDOM(el)[0];
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
	
	// 事件绑定
	function addEvent(el, type, expr, fn) {
		// el.addEventListener(type, fn, false);
	
		if (isString(el)) {
			el = getDOM(el);
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
				while (target !== el) {
					if (target.matches(expr)) {
						fn && fn.call(target, event);
						break;
					}
					target = target.parentNode;
				}
			} else {
				var els = getDOM(expr);
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
		for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			sources[_key - 1] = arguments[_key];
		}
	
		forEach(sources, function (source) {
			for (var key in source) {
				target[key] = source[key];
			}
		});
		return target;
	}
	
	// http请求
	function http(_ref) {
		var method = _ref.method;
		var _ref$url = _ref.url;
		var url = _ref$url === undefined ? '' : _ref$url;
		var _ref$param = _ref.param;
		var param = _ref$param === undefined ? null : _ref$param;
		var _ref$beforeSend = _ref.beforeSend;
		var beforeSend = _ref$beforeSend === undefined ? noop : _ref$beforeSend;
		var _ref$success = _ref.success;
		var success = _ref$success === undefined ? noop : _ref$success;
		var _ref$error = _ref.error;
		var error = _ref$error === undefined ? noop : _ref$error;
		var _ref$complete = _ref.complete;
		var complete = _ref$complete === undefined ? noop : _ref$complete;
	
		var xhr;
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else {}
	
		xhr.onstatechange = function () {
			if (xhr.readyState == 4) {
				switch (xhr.status) {
					case 200:
					// 有缓存
					case 302:
						success(xhr.reText, xhr);
						break;
					case 404:
					case 500:
						error(xhr.statusText, xhr);
						break;
				}
				complete(xhr.statusText, xhr);
			}
		};
	
		beforeSend();
		if (method == 'POST') {
			xhr.open('POST', url, true);
			xhr.send();
		} else {
			xhr.open();
			xhr.send();
		}
	}
	
	/*function typeOf() {
	
	}
	
	// 类型判断
	const $Type = {
		typeOf,
		isNumber,
		isArray,
		isObject,
		isFunction
	};
	
	function post() {
	
	}
	
	const $Http = {
		post,
		get,
		uplaod,
		jsonp
	};
	
	const $Event = {
		on,
		un,
		fixEvent,
	
	};
	
	// 数据缓存
	
	const $Data = {
		add,
		remove,
		fix,
	
	};
	
	return {
		$Type,
		$Dom.
		$Event,
		$Http
	};
	
	export {
		add,
	
	};*/
	
	/*$Date = {
		now,
	
	};
	
	
	$Css.create(`
			.box {
				width: 100px;
				height: 100px;
			}
		`);
	$Css.get(el, 'bg');
	$Css.set(el, 'bg', 'red');
	
	$Dom.parse('<div>123</div>');
	$Dom.getText()
	
	$Node.getText()
	
	
	$From.parse('#form');
	$From.unparse({ user: '123' });*/
	
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
	
				for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
					args[_key2] = arguments[_key2];
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
				for (var _len3 = arguments.length, args = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
					args[_key3 - 2] = arguments[_key3];
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
	
	exports.isObject = isObject;
	exports.isNumber = isNumber;
	exports.isArray = isArray;
	exports.isString = isString;
	exports.isFunction = isFunction;
	exports.getIndex = getIndex;
	exports.getDOM = getDOM;
	exports.parseDOM = parseDOM;
	exports.getStyle = getStyle;
	exports.setStyle = setStyle;
	exports.addEvent = addEvent;
	exports.removeEvent = removeEvent;
	exports.BaseMethod = BaseMethod;
	exports.mixin = mixin;
	exports.http = http;
	exports.requestAnim = requestAnim;
	exports.suports = suports;

/***/ },
/* 3 */
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
	
			_this.el = (0, _util.getDOM)(el)[0];
			_this.target = (0, _util.getDOM)(el)[0] || _this.el;
			_this.fn = {
				begin: [],
				move: [],
				end: []
			};
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Animation = exports.Transition = undefined;
	
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
	
			_this.el = (0, _util.getDOM)(el)[0];
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
	
	var Animation = function (_BaseMethod2) {
		_inherits(Animation, _BaseMethod2);
	
		function Animation() {
			_classCallCheck(this, Animation);
	
			return _possibleConstructorReturn(this, Object.getPrototypeOf(Animation).apply(this, arguments));
		}
	
		return Animation;
	}(_util.BaseMethod);
	
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
	
	exports.Transition = Transition;
	exports.Animation = Animation;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _dialog = __webpack_require__(1);
	
	var _util = __webpack_require__(2);
	
	var type = (0, _util.getDOM)('#type')[0],
	    icon = (0, _util.getDOM)('#icon')[0],
	    msg = (0, _util.getDOM)('#msg')[0];
	
	(0, _util.getDOM)('#btn')[0].onclick = function () {
		(0, _dialog.dialog)(type.value, msg.value, icon.value).on('ok', function (event) {
			console.log('click ok button');
		}).on('cancel', function (event) {
			console.log('click cancel button');
		});
	};

/***/ }
/******/ ]);
//# sourceMappingURL=test.bundle.js.map