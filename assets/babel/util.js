/**
 * util.js
 * 工具类
 * by bang
 */


const noop = () => {};

// 类型判断
const obt = Object.prototype.toString;
const isType = (type) => {
	return (obj) => obt.call(obj) === `[object ${type}]`;
}

const isObject = isType('Object'),
			isArray = isType('Array'),
			isNumber = isType('Number'),
			isString = isType('String'),
			isFunction = isType('Function');


const named = (name) => {
	return name.replace(/[-]\w/g, a => a.charAt(1).toUpperCase());
};

// 获取dom节点
const getDOM = ( expr, root = document ) => {
	return root.querySelectorAll(expr);
};

// 获取索引
const getIndex = (el) => {
	return [].indexOf.call(el.parent.children, el);
};

// 获取range
function getRange() {
	var range = document.createRange();
	range.selectNodeContents(document.body);

	getRange = function() {
		return range;
	};
	return getRange();
}

// 解析html
const parseHTML = (html) => {
	var range = getRange();

	if (range.createContextualFragment) {
		return range.createContextualFragment(html);
	}
	else {
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
const getStyle = (el, name) => {
	// 标准
	if (window.getComputedStyle) {
		return window.getComputedStyle( el, '' )[ name ] || null;
	}
	// IE8-
	else {
		// 透明度
		if (name == 'opacity') {
			return (el.filters.alpha || el.filters['DXImageTransform.Microsoft.Alpha'] || 100) / 100;
		}
		else {
			return el.currentStyle[ name ] || null;
		}
	}
};

// 获取样式
const setStyle = (el, name, value) => {

	if (isString(el)) {
		el = getDOM(el)[0];
	}
	else if (isArray(el)) {
		forEach(el, elem => setStyle(elem, name, value));
	}

	var props = {};
	if (arguments.length == 3 && typeof name == 'string') {
		props[ name ] = value;
	}
	else {
		props = name;
	}

	for (let name in props) {
		if (name == 'opacity') {
			el.style.opacity = props[ name ];
			el.style.filter = 'alpha(filter=' + (props[ name ] / 100) + ')';
		}
		else if (isNaN( props[name] )) {
			el.style[ name ] = props[ name ];
		}
		else {
			el.style[ name ] = props[ name ] + 'px';
		}
	}
};

// 绑定事件
const addEvent = (el, type, fn) => {
	el.addEventListener(type, fn, false);
};

// 动画帧
const requestAnim = window.requestAnimationFrame || 
							window.webkitRequestAnimationFrame ||
							window.mozRequestAnimationFrame  ||
							window.msRequestAnimationFrame  ||
							(fn => setTimeout(fn, 1000 / 60));

// 遍历类数组
const forEach = (array, func) => {
	if (isFunction(func)) {
		for (var i = 0, len = array.length; i < len; i++) {
			if (func(array[i], i) === false) break;
		}
	}
};

// 混合 类似于extend
const mixin = (target, ...sources) => {
	forEach(sources, (source) => {
		for (let key in source) {
			target[ key ] = source[ key ];
		}
	});
	return target;
};

// http请求
const http = ({ method, url = '', param = null,  
		beforeSend = noop, success = noop, 
		error = noop, complete = noop }) => {
	var xhr;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	}
	else {

	}

	xhr.onstatechange = () => {
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
	}

	beforeSend();
	if (method == 'POST') {
		xhr.open('POST', url, true);
		xhr.send();
	}
	else {
		xhr.open();
		xhr.send();
	}
};


export { 
	isObject, isNumber, isArray, isString, isFunction,
	getDOM, parseHTML, getStyle, setStyle, addEvent,
	mixin, http, requestAnim 
};