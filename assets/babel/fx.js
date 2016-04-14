/**
 * 特效
 */

import { addEvent, removeEvent, getDOM, setStyle, requestAnim, BaseMethod, suports } from './util.js';

class Transition extends BaseMethod {
	constructor(el, options) {
		super();
		this.el = getDOM(el)[0];
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

class Animation extends BaseMethod {

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

export { Transition, Animation };