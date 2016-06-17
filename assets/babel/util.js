/**
 * util.js
 * 工具类
 * by bang
 */

// 无操作
function noop(){}

// 基于class
class BaseMethod {

	constructor() {
		this.fn = {};
	}

	// 初始化监听事件
	initFn(...args) {
		forEach(args, (name) => {
			this.fn[ name ] = [];
		});
	}

	// 安装事件
	on(type, fn) {
		if (isArray(this.fn[ type ])) {
			this.fn[ type ].push( fn );
		}
		return this;
	}
	// 卸载事件
	un(type, fn) {
		if (isArray(this.fn[ type ])) {
			if (fn) {
				for (let i = 0, f; f = this.fn[ type ][ i ]; i++) {
					if (f === fn) {
						this.fn[ type ].splice(i, 1);
						i--;
					}
				}
			}
			else {
				this.fn[ type ].length = 0;
			}
		}
		return this;
	}

	// 修改设置属性
	set(prop, value) {
		this[ prop ] = value;
	}
	// 修改添加属性
	add(prop, value) {
		if (isArray(this[ prop ])) {
			this[ prop ].push(value);
		}
	}

	// 触发事件
	trigger(fn, obj, ...args) {
		var result;
		if (isFunction(fn)) {
			result = fn.call(obj, ...args);
		}
		else if (isArray(fn)) {
			fn.forEach((f) => {
				result = f.call(obj, ...args);
				return result;
			});
		}

		return result !== false;
	}
}

// 类型判断
let obt = Object.prototype.toString;
function isType(type) {
	return (obj) => obt.call(obj) === `[object ${type}]`;
}

const isObject = isType('Object'),
			isArray = isType('Array'),
			isNumber = isType('Number'),
			isString = isType('String'),
			isFunction = isType('Function');

// 驼峰命名
function named(name) {
	return name.replace(/[-]\w/g, a => a.charAt(1).toUpperCase());
}

// 获取dom节点
function $s(expr, root = document) {
	if (isString(expr)) {
		return root.querySelectorAll(expr);
	}
	else if (expr) {
		return isNumber(expr.length) ? expr : [expr];
	}
	else {
		return [];
	}
}


// 获取索引
function getIndex(source, arr = source.parentNode.children) {
	return [].indexOf.call(arr, source);
}

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
function parseDOM(html) {
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
}

// 设置样式
function getStyle(el, name) {
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
}

// 获取样式
function setStyle(el, name, value) {

	if (isString(el)) {
		el = $s(el)[0];
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
}


// 兼容事件
function fixEvent(event) {
	event = event || window.event;

	if (!event.target) {
		event.target = event.srcElement;
	}

	if (!event.stopPropagation) {
		event.stopPropagation = () => {
			event.cancelBubble = true;
		};
	}

	if (!event.preventDefault) {
		event.preventDefault = () => {
			event.returnValue = false;
		};
	}

	return event;
}

// 判断包含关系
function contains(e1, e2) {
	if (e1.contains) {
		return e1.contains(e2);
	}
	else {
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
		forEach(el, function(elem) {
			addEvent(elem, type, expr, fn);
		});
	}
	else {
		if (isFunction(expr)) {
			fn = expr;

			/*let handler = (event) => fn.call(el, fixEvent(event));
			handler.fn = fn;*/
			if (suports.is('addEventListener')) {
				el.addEventListener(type, fn, false);
			}
			else {
				el.attachEvent('on' + type, fn);
			}
		}
		else {
			delegate(el, type, expr, fn)
		}
	}
}

// 事件解绑
function removeEvent(el, type, fn) {
	if (suports.is('removeEventListener')) {
		el.removeEventListener(type, fn);
	}
	else {
		el.detachEvent('on' + type, fn);
	}
}

// 事件委托
function delegate(el, type, expr, fn) {
	addEvent(el, type, (event) => {
		event = fixEvent(event);
		let target = event.target;

		if (suports.is('matches')) {
			while (target && target !== el) {
				if (target.matches(expr)) {
					fn && fn.call(target, event);
					break;
				}
				target = target.parentNode;
			}
		}
		else {
			let els = $s(expr);
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
const requestAnim = window.requestAnimationFrame || 
							window.webkitRequestAnimationFrame ||
							window.mozRequestAnimationFrame  ||
							window.msRequestAnimationFrame  ||
							(fn => setTimeout(fn, 1000 / 60));

// 遍历类数组
function forEach(array, func) {
	if (isFunction(func)) {
		for (var i = 0, len = array.length; i < len; i++) {
			if (func(array[i], i) === false) break;
		}
	}
}

// 混合 类似于extend
function mixin(target, ...sources) {
	forEach(sources, (source) => {
		for (let key in source) {
			target[ key ] = source[ key ];
		}
	});
	return target;
}

// 模板
function templ(str, ...args) {
	str = str.replace(/\{(\d+)\}/gm, (m, n) => args[n] || '');
	return str;
}

// 日期输出格式
function dateFormat(fmt, date) {
	date = date || new Date;
	function _pad( num ) {
		if (num < 10) {
			num = '0' + num;
		}
		return num;
	}

	return String(fmt).replace(/yyyy|MM|dd|HH|mm|ss|D/g, function(m) {
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
				return _pad( locDays[date.getDay()] );
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
	}
}

// 检测浏览器支持
var suports = {
	_cache: {},
	is(prop) {
		return true;
	},
	// 获取支持属性
	get(prop) {
		if (this._cache[prop]) return this._cache[prop];
		return prop;	
	}
};


export { 
	noop, BaseMethod, 
	isObject, isNumber, isArray, isString, isFunction,
	forEach,
	getIndex, $s, 
	parseDOM, getStyle, setStyle, 
	contains, addEvent, removeEvent,
	templ, dateFormat, getPoint,
	mixin, requestAnim, suports
};