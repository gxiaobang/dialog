/**
 * 弹窗组件
 */

import { getDOM, http, addEvent, parseHTML, mixin } from './util';


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
		}
	}
};
var guide = 0,
		dg;

class Dialog {
	constructor(...args) {
		this.fn = {
			ready: [],
			ok: [],
			cancel: [],
			// 按钮顺序
			order: []
		};
		this.setup(...args);
	}

	alert() {
		this.title = '提示框';
		this.btns = [
			{ text: '确定', style: 'primary' }
		];
		this.create();
		this.handler();
		this.flex();
		this.position();
		this.show();
	}

	confirm() {
		this.title = '提示框';
		this.btns = [
			{ text: '确定', style: 'primary' },
			{ text: '取消', style: 'cancel' }
		];
		this.create();
		this.handler();
		this.flex();
		this.position();
		this.show();
	}

	load() {
		var that = this;
		http({ 
			url: this.url, 
			method: this.method, 
			param: this.param,
			success(html) {
				that.create();
				that.render(html);
				that.handler();
				that.flex();
				that.position();
				that.show();
			},
			beforeSend() {
				 this.loading()
			},
			complete() {
				this.closeLoading()
			},
			error(statusText) {
				this.alert(statusText, 'error');
			}
		});
	}

	loading() {
		if (guide == 0) {
			dg = this;
			document.body.appendChild(
					parseHTML(defaults.templ.loading())
				);
		}
		guide++;
	}
	closeLoading() {
		guide--;
		if (guide == 0) {
			dg.destory();
			dg = null;
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
		}
	}

	create() {
		var templ = parseHTML(defaults.templ.panel(
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
		this.content.appendChild(parseHTML(html));
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

	}
	// 隐藏
	hide() {

	}

	// 销毁
	destory() {
		if (this.mask) {
			document.body.removeChild(this.mask);
			this.mask = null;
		}
	}

	// 安装事件
	on(type, fn) {
		switch (type) {
			case 'ok':
			case 'cancel':
			case 'order':
				this.fn[ type ].push( fn );
		}
	}
	// 卸载事件
	un(type, fn) {
		switch (type) {
			case 'ok':
			case 'cancel':
			case 'order':
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
	}

	// 触发事件
	trigger(fn, obj, ...args) {
		if (isFunction(fn)) {
			fn.call(obj, ...args);
		}
		else if (isArray(fn)) {
			fn.forEach((f) => {
				f.call(obj, ...args);
			});
		}
	}

	handler() {
		
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
		addEvent(this.footing, 'button', 'click', function (event) {
			var index = getIndex(this);
			switch (index) {
				// 默认0是确定
				case 0:
					that.trigger(this.fn.ok, this, event);
					break;
				// 默认1是取消
				case 1:
					that.trigger(this.fn.cancel, this, event);
					break;
			}

			that.trigger(this.fn.order[ index ], this, event);
		});
		addEvent(this.btnClose, 'click', function() {
			that.destory();
		});
	}
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