/**
 * 弹窗组件
 */

import { isFunction, isArray, 
	getIndex, $s, 
	addEvent, removeEvent,
	parseDOM, mixin, BaseMethod } from './util.js';

import Http from './http.js';
import { Dragable } from './dragable.js';
import fx from './fx.js';


const defaults = {
	templ: {
		panel(title, content, btns) {
			return this.mask(`
				<div class="panel panel-default">
					<div class="panel-heading">
						${title}
						<span class="close">&times;</span>
					</div>
					<div class="panel-body">
						${content}
					</div>
					<div class="panel-footing">
						${btns}
					</div>
				</div>
			`);
		},
		loading() {
			return this.mask(`
					<div class="loading">
					</div>
			`);
		},
		mask(main) {
			return `
				<div class="mask">
					${main}
				</div>
			`;
		},
		prompt() {
			return `<div class="prompt" id="__prompt"></div>`;
		}
	}
};

// 包装dialog方法
function packaging(type, args) {
	var dialog = new Dialog();
	dialog[ type ].apply(dialog, args);
	return dialog;
}

var guide = 0;
class Dialog extends BaseMethod {
	constructor() {
		super();
		this.initFn('ready', 'ok', 'cancel', 'order', 'close', 'ready');
		// this.setup();
	}

	alert(msg, icon) {
		this.title = '提示框';
		this.btns = [
			{ text: '确定', style: 'primary' }
		];
		this.create(msg, icon);
		this.events();
		this.flex();
		this.position();
		this.show();
	}

	// 确认提示框
	confirm(msg, icon) {
		this.title = '提示框';
		this.btns = [
			{ text: '确定', style: 'primary' },
			{ text: '取消', style: 'cancel' }
		];
		this.create(msg, icon);
		this.events();
		this.flex();
		this.position();
		this.show();
	}

	// 异步加载页面
	load() {
		this.loading();
		Http.get('test.html', this.param)
			.on('complete', () => {
				this.loading('off');
			})
			.on('success', (html) => {
				this.title = '默认标题';
				this.btns = [{ text: '保存', style: 'primary' }];
				this.create();
				this.events();
				this.render(html);
				this.flex();
				this.position();
				this.show();
			})
			.on('error', () => {
				this.alert(statusText, 'error');
			});
	}

	// 提示
	prompt(msg, icon, ms = 3000) {
		var prompt = $s('#__prompt')[0],
				timer;
		if (!prompt) {
			prompt = parseDOM(defaults.templ.prompt()).children[0];
			document.body.appendChild(prompt);
		}
		else {
			clearTimeout(prompt.getAttribute('data-timer'));
		}

		prompt.innerHTML = msg;
		prompt.style.display = 'block';
		timer = setTimeout(() => {
			prompt.style.display = 'none';
			this.trigger(this.fn.ready, prompt);
		}, ms);
		prompt.setAttribute('data-timer', timer);
	}

	// 加载中
	loading(state) {
		if (state == 'off') {
			if (guide > 0) guide--;
			if (guide == 0) {
				// dg.destory();
				var mask = $s('#__loading')[0];
				if (mask) {
					mask.style.display = 'none';
				}
			}
		}
		else {
			if (guide == 0) {
				var mask = $s('#__loading')[0];
				if (!mask) {
					mask = parseDOM(defaults.templ.loading()).children[0];
					mask.id = '__loading';
					mask.style.zIndex = 9991;
					document.body.appendChild(mask);
				}
				else {
					mask.style.display = 'block';
				}
			}
			guide++;
		}
	}

	create(msg, icon) {
		var templ = parseDOM(defaults.templ.panel(
				this.title,
				// content
				(() => {
					if (msg) {
						return `
							<div class="icon icon-${icon}"></div>
							<div class="panel-msg">${msg}</div>
						`;
					}
					else {
						return '';
					}
				})(),
				// btns
				(() => {
					return this.btns.map((item) => `<button type="button" class="btn btn-${item.style}">${item.text}</button>`).join('\n');
				})()
			));

		

		this.mask = templ.children[0];
		this.panel = $s('.panel', this.mask)[0];
		this.heading = $s('.panel-heading', this.panel)[0];
		this.body = $s('.panel-body', this.panel)[0];
		this.footing = $s('.panel-footing', this.panel)[0];
		this.btnClose = $s('.close', this.heading)[0];
		document.body.appendChild(templ);
	}

	render(html) {
		this.body.appendChild(parseDOM(html));
	}

	// 定位
	position() {
		this.panel.style.left = (document.documentElement.clientWidth - this.panel.offsetWidth) / 2 + 'px';
		this.panel.style.top =  (document.documentElement.clientHeight - this.panel.offsetHeight) / 2 + 'px';
	}
	// 弹性窗口
	flex() {

	}

	// 显示
	show() {
		fx.frame(this.panel, 'spreadIn');
	}
	// 隐藏
	hide() {
		fx.frame(this.panel, 'spreadOut');
		fx.frame(this.mask, 'fadeOut', () => this.destory());
	}

	// 销毁
	destory() {
		if (this.mask) {
			this._off && this._off();
			document.body.removeChild(this.mask);
			this.mask = null;
		}
	}

	

	events() {
	
		var that = this;
		// 事件委托
		addEvent(this.footing, 'click', 'button', function (event) {
			var index = getIndex(this),
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

			result = that.trigger(that.fn.order[ index ], this, event);

			if (result) {
				// that.destory();
				that.hide();
			}
		});
		addEvent(this.btnClose, 'click', function(event) {
			// that.destory();
			that.trigger(that.fn.close, this, event);
			that.hide();
		});

		this.resize();
		new Dragable(this.panel, { target: this.heading });
	}

	// 窗口resize
	resize() {
		let handler = () => this.position();
		addEvent(window, 'resize', handler);
		this._off = () => removeEvent(window, 'resize', handler);
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
	static alert() {
		return packaging('alert', arguments);
	}
	static confirm() {
		return packaging('confirm', arguments);
	}
	static prompt() {
		return packaging('prompt', arguments);
	}
	static loading() {
		return packaging('loading', arguments);
	}
	static load() {
		return packaging('load', arguments);
	}
}

// 全局
global.Dialog = Dialog;
// export { Dialog };
export default Dialog;