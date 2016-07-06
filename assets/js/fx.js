/**
 * 特效
 */

import { 
	addEvent, removeEvent, 
	$s, setStyle, 
	requestAnim, BaseMethod, 
	suports,
	addClass, removeClass, hasClass,
	isString,
} from './util.js';

class Transition extends BaseMethod {
	constructor(el, options) {
		super();
		this.el = $s(el)[0];
		this.setOptions(options);
		this.initFn('complete');
	}
	setOptions({ from, to, duration, easing, delay }) {
		this.from = from || {};
		this.to = to || {};
		this.duration = duration || '';
		this.delay = delay || '';
		this.easing = easing || '400ms';
	}

	run() {

		let transition = suports.get('transition'),
				transitionend = suports.get('transitionend');

		this.from[ transition ] = 'none';
		setStyle(this.el, this.from);
		removeEvent(this.el, transitionend);

		var handler = (event) => {
			event.preventDefault();
			this.trigger(this.fn.complete, this.el, event);
			this.from[ transition ] = 'none';
			removeEvent(this.el, transitionend, handler);
		};
		
		addEvent(this.el, transitionend, handler);
		requestAnim(() => {
			this.to[ transition ] = ['all', this.duration, this.delay, this.easing].join(' ');
			setStyle(this.el, this.to);
		});
	}
}

// 设置动画
function frame(element, cls, complete) {
	element = $s(element)[0];

	if (suports.is('animation')) {
		if (isString(cls)) {
			cls = cls.trim().split(/\s+/);
		}

		for (var i = 0; i < cls.length; i++) {
			element.classList.add(cls[i]);
		}
		function handler() {
			for (var i = 0; i < cls.length; i++) {
				element.classList.remove(cls[i]);
			}
			removeEvent(element, 'webkitAnimationEnd', handler);
			removeEvent(element, 'animationend', handler);
			complete && complete();
		}
		addEvent(element, 'webkitAnimationEnd', handler);
		addEvent(element, 'animationend', handler);
	}
	else {
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


const fx = { frame };

export default fx;