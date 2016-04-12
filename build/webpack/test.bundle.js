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
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.dialog = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 弹窗组件
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	var _util = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
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
			}
		}
	};
	var guide = 0,
	    dg;
	
	var Dialog = function () {
		function Dialog() {
			_classCallCheck(this, Dialog);
	
			this.fn = {
				ready: [],
				ok: [],
				cancel: [],
				// 按钮顺序
				order: []
			};
			this.setup.apply(this, arguments);
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
		}, {
			key: 'loading',
			value: function loading() {
				if (guide == 0) {
					dg = this;
					document.body.appendChild((0, _util.parseHTML)(defaults.templ.loading()));
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
				}
			}
		}, {
			key: 'create',
			value: function create() {
				var _this = this;
	
				var templ = (0, _util.parseHTML)(defaults.templ.panel(this.title,
				// content
				function () {
					if (_this.msg) {
						return '\n\t\t\t\t\t\t\t<div class="icon icon-' + _this.icon + '"></div>\n\t\t\t\t\t\t\t<div class="panel-msg">' + _this.msg + '</div>\n\t\t\t\t\t\t';
					} else {
						return '';
					}
				}(),
				// btns
				function () {
					return _this.btns.map(function (item) {
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
				this.content.appendChild((0, _util.parseHTML)(html));
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
			value: function show() {}
			// 隐藏
	
		}, {
			key: 'hide',
			value: function hide() {}
	
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
	
			// 安装事件
	
		}, {
			key: 'on',
			value: function on(type, fn) {
				switch (type) {
					case 'ok':
					case 'cancel':
					case 'order':
						this.fn[type].push(fn);
				}
				return this;
			}
			// 卸载事件
	
		}, {
			key: 'un',
			value: function un(type, fn) {
				switch (type) {
					case 'ok':
					case 'cancel':
					case 'order':
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
	
			// 触发事件
	
		}, {
			key: 'trigger',
			value: function trigger(fn, obj) {
				for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
					args[_key - 2] = arguments[_key];
				}
	
				var result;
				if ((0, _util.isFunction)(fn)) {
					result = fn.call.apply(fn, [obj].concat(args));
				} else if ((0, _util.isArray)(fn)) {
					fn.forEach(function (f) {
						result = f.call.apply(f, [obj].concat(args));
						return result;
					});
				}
	
				return result !== false;
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
						that.destory();
					}
				});
				(0, _util.addEvent)(this.btnClose, 'click', function () {
					that.destory();
				});
	
				this.resize();
			}
	
			// 窗口resize
	
		}, {
			key: 'resize',
			value: function resize() {
				var _this2 = this;
	
				var handler = function handler() {
					return _this2.position();
				};
				(0, _util.addEvent)(window, 'resize', handler);
				this._off = function () {
					return (0, _util.removeEvent)(window, 'resize', handler);
				};
			}
		}]);
	
		return Dialog;
	}();
	
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
		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
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
	var _arguments = arguments;
	/**
	 * util.js
	 * 工具类
	 * by bang
	 */
	
	var noop = function noop() {};
	
	// 类型判断
	var obt = Object.prototype.toString;
	var isType = function isType(type) {
		return function (obj) {
			return obt.call(obj) === '[object ' + type + ']';
		};
	};
	
	var isObject = isType('Object'),
	    isArray = isType('Array'),
	    isNumber = isType('Number'),
	    isString = isType('String'),
	    isFunction = isType('Function');
	
	var named = function named(name) {
		return name.replace(/[-]\w/g, function (a) {
			return a.charAt(1).toUpperCase();
		});
	};
	
	// 获取dom节点
	var getDOM = function getDOM(expr) {
		var root = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];
	
		return root.querySelectorAll(expr);
	};
	
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
	var parseHTML = function parseHTML(html) {
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
	};
	
	// 设置样式
	var getStyle = function getStyle(el, name) {
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
	};
	
	// 获取样式
	var setStyle = function setStyle(el, name, value) {
	
		if (isString(el)) {
			el = getDOM(el)[0];
		} else if (isArray(el)) {
			forEach(el, function (elem) {
				return setStyle(elem, name, value);
			});
		}
	
		var props = {};
		if (_arguments.length == 3 && typeof name == 'string') {
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
	};
	
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
	
				var handler = function handler(event) {
					return fn.call(el, fixEvent(event));
				};
				handler.fn = fn;
				if (suports.is('addEventListener')) {
					el.addEventListener(type, handler, false);
				} else {
					el.attachEvent('on' + type, handler);
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
	var forEach = function forEach(array, func) {
		if (isFunction(func)) {
			for (var i = 0, len = array.length; i < len; i++) {
				if (func(array[i], i) === false) break;
			}
		}
	};
	
	// 混合 类似于extend
	var mixin = function mixin(target) {
		for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			sources[_key - 1] = arguments[_key];
		}
	
		forEach(sources, function (source) {
			for (var key in source) {
				target[key] = source[key];
			}
		});
		return target;
	};
	
	// http请求
	var http = function http(_ref) {
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
	};
	
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
	
	var suports = {
		is: function is() {
			return true;
		}
	};
	
	exports.isObject = isObject;
	exports.isNumber = isNumber;
	exports.isArray = isArray;
	exports.isString = isString;
	exports.isFunction = isFunction;
	exports.getIndex = getIndex;
	exports.getDOM = getDOM;
	exports.parseHTML = parseHTML;
	exports.getStyle = getStyle;
	exports.setStyle = setStyle;
	exports.addEvent = addEvent;
	exports.removeEvent = removeEvent;
	exports.mixin = mixin;
	exports.http = http;
	exports.requestAnim = requestAnim;
	exports.suports = suports;

/***/ },
/* 3 */
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