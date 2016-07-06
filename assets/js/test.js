import Dialog from './dialog.js';
import * as util from './util.js';


var type = util.$s('#type')[0],
		icon = util.$s('#icon')[0],
		msg = util.$s('#msg')[0],
		btn = util.$s('#btn')[0];

// dialog('loading');
btn.onclick = () => {

	switch (type.value) {
		case 'load':
			if (window.location.protocol == 'file:') {
				Dialog.alert('请在服务器环境测试！', 'warn');
			}
			else {
				Dialog.load('page.html', null)
					.on('ready', () => console.log('page load complete'));
			}
			break;
		case 'loading':
			Dialog.loading();
			setTimeout(() => {
				var second = 5;
				Dialog.prompt(`${second}秒后自动关闭loading`, 6000)
					.on('ready', () => Dialog.loading('off'));
			}, 1000);
			break;
		default:
			Dialog[ type.value ](msg.value, icon.value)
				.on('ok', (event) => {
					console.log('click ok button');
				})
				.on('cancel', (event) => {
					console.log('click cancel button');
				});
	}
};