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
var getIndex = function getIndex(el) {
	return [].indexOf.call(el.parent.children, el);
};

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

// 绑定事件
var addEvent = function addEvent(el, type, fn) {
	el.addEventListener(type, fn, false);
};

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

exports.isObject = isObject;
exports.isNumber = isNumber;
exports.isArray = isArray;
exports.isString = isString;
exports.isFunction = isFunction;
exports.getDOM = getDOM;
exports.parseHTML = parseHTML;
exports.getStyle = getStyle;
exports.setStyle = setStyle;
exports.addEvent = addEvent;
exports.mixin = mixin;
exports.http = http;
exports.requestAnim = requestAnim;
//# sourceMappingURL=util.js.map
