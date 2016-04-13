/**
 * 拖动
 */
import { getDOM, addEvent, removeEvent, BaseMethod } from './util.js';

class Dragable extends BaseMethod {
	constructor(el, options) {
		super();
		this.el = getDOM(el)[0];
		this.target = getDOM(el)[0] || this.el;
		this.fn = {
			begin: [],
			move: [],
			end: []
		};
		this.initFn('begin', 'move', 'end');
		this.setup();
	}

	// 安装
	setup() {
		addEvent(this.target, 'mousedown', (event) => this.begin(event));
	}

	begin(event) {
		// this.target
		event.preventDefault();

		this.sx = event.clientX - this.el.offsetLeft;
		this.sy = event.clientY - this.el.offsetTop;


		let _move = (event) => this.move(event);
		let _end = (event) => this.end(event);
		this._off = () => {
			removeEvent(document, 'mousemove', _move);
			removeEvent(document, 'mouseup', _end);
		};
		addEvent(document, 'mousemove', _move);
		addEvent(document, 'mouseup', _end);
	}
	move(event) {
		event.preventDefault();

		this.x = event.clientX - this.sx;
		this.y = event.clientY - this.sy;

		this.el.style.left = this.x + 'px';
		this.el.style.top = this.y + 'px';
	}
	end(event) {
		event.preventDefault();
		this._off();
	}
}



export { Dragable };