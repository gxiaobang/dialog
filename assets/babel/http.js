import { BaseMethod } from './util.js';

// http请求
class Http extends BaseMethod {
	constructor({ method = 'GET', url = '', param = null }) {
		super();
		this.initFn('beforeSend', 'success', 'error', 'complete');
		this.method = method;
		this.url = url;
		this.param = param;
		this.setup();
	}

	setup() {
		this.create();
		this.events();
		this.send(this.param);
	}

	create() {
		this.xhr = new XMLHttpRequest();
	}

	send(param) {
		this.beforeSend();
		switch (this.method.toUpperCase()) {
			case 'GET':
				this.xhr.open('GET', this.url, true);
				this.xhr.send();
				break;
			case 'POST':
				this.xhr.open('POST', this.url, true);
				this.xhr.send(this.param);
				break;
		}
	}

	events() {
		this.xhr.onreadystatechange = () => {
			// console.log(this.xhr.readyState);
			if (this.xhr.readyState == 4) {
				switch (this.xhr.status) {
					case 200:
					// 有缓存
					case 302:
						this.success();
						break;
					case 404:
					case 500:
						this.error();
						break;
				}
				this.complete();
			}
		}
	}

	// 请求发送前
	beforeSend() {
		this.trigger(this.fn.beforeSend, this.xhr);
	}
	// 成功
	success() {
		this.trigger(this.fn.success, this.xhr, this.xhr.responseText);
	}
	// 错误
	error() {
		this.trigger(this.fn.error, this.xhr, this.xhr.statusText);
	}
	// 完成
	complete() {
		this.trigger(this.fn.complete, this.xhr);
	}


	static get(url, param) {
		return new Http({ method: 'GET', url, param });
	}
	static post() {
		return new Http({ method: 'POST', url, param });
	}
}

export default Http;