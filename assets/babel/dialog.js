/**
 * 弹窗组件
 */

import { isFunction, isArray, 
	getIndex, getDOM, http, 
	addEvent, removeEvent,
	parseDOM, mixin, BaseMethod } from './util';

import { Dragable } from './dragable.js';
import { Transition } from './fx.js';


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
var guide = 0;

class Dialog extends BaseMethod {
	constructor(...args) {
		super();
		this.initFn('ready', 'ok', 'cancel', 'order', 'close', 'ready');
		this.setup(...args);
	}

	alert() {
		this.title = '提示框';
		this.btns = [
			{ text: '确定', style: 'primary' }
		];
		this.create();
		this.events();
		this.flex();
		this.position();
		this.show();
	}

	// 确认提示框
	confirm() {
		this.title = '提示框';
		this.btns = [
			{ text: '确定', style: 'primary' },
			{ text: '取消', style: 'cancel' }
		];
		this.create();
		this.events();
		this.flex();
		this.position();
		this.show();
	}

	// 异步加载页面
	load() {
		var that = this;
		http({ 
			url: this.url, 
			method: this.method, 
			param: this.param,
			success(html) {
				that.create();
				that.render(html);
				that.events();
				that.flex();
				that.position();
				that.show();
			},
			beforeSend() {
				that.loading()
			},
			complete() {
				that.closeLoading()
			},
			error(statusText) {
				this.alert(statusText, 'error');
			}
		});
	}

	// 提示
	prompt(msg, icon, ms = 3000) {
		var prompt = getDOM('#__prompt')[0],
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
	loading() {
		if (guide == 0) {
			var mask = getDOM('#__loading')[0];
			if (!mask) {
				mask = parseDOM(defaults.templ.loading()).children[0];
				mask.id = '__loading';
				document.body.appendChild(mask);
			}
			else {
				mask.style.display = 'block';
			}
		}
		guide++;
	}
	closeLoading() {
		guide--;
		if (guide == 0) {
			// dg.destory();
			var mask = getDOM('#__loading')[0];
			if (mask) {
				mask.style.display = 'none';
			}
		}
	}

	// 设置
	setup(...args) {
		this.type = args[0];
		switch (this.type) {
			case 'alert':
			case 'confirm':
				this.msg = args[1];
				this.icon = args[2];
				this[ this.type ]();
				break;
			case 'load':
				this.url = args[1];
				this.param = args[2];
				this[ this.type ]();
				break;
			case 'loading':
				this.loading();
				break;
			case 'close loading':
				this.closeLoading();
				break;
			case 'prompt':
				this.prompt(args[1], args[2], args[3]);
				break;
		}
	}

	create() {
		var templ = parseDOM(defaults.templ.panel(
				this.title,
				// content
				(() => {
					if (this.msg) {
						return `
							<div class="icon icon-${this.icon}"></div>
							<div class="panel-msg">${this.msg}</div>
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
		this.panel = getDOM('.panel', this.mask)[0];
		this.heading = getDOM('.panel-heading', this.panel)[0];
		this.body = getDOM('.panel-body', this.panel)[0];
		this.footing = getDOM('.panel-footing', this.panel)[0];
		this.btnClose = getDOM('.close', this.heading)[0];
		document.body.appendChild(templ);
	}

	render(html) {
		this.content.appendChild(parseDOM(html));
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
		new Transition(this.mask, {
				from: {
					opacity: 0
				},
				to: {
					opacity: 1
				},
				duration: '300ms'
			})
			.on('complete', () => {
				console.log('transition is complete.');
			})
			.run();
	}
	// 隐藏
	hide() {
		new Transition(this.mask, { to: { opacity: 0 } })
			.on('complete', () => this.destory())
			.run();
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
		new Dragable(this.panel);
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
					var prompt = getDOM('#__prompt')[0];
					if (prompt) {
						prompt.innerHTML = value;
					}
				}
			};
		}

		fn && fn(this.scope);
		return this;
	}*/
}

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


export const dialog = (...args) => new Dialog(...args);