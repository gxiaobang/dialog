import { Dialog } from './dialog.js';
import { $s } from './util.js';


var type = $s('#type')[0],
		icon = $s('#icon')[0],
		msg = $s('#msg')[0];

// dialog('loading');
$s('#btn')[0].onclick = () => {
	Dialog[ type.value ](msg.value, icon.value)
		.on('ok', (event) => {
			console.log('click ok button');
		})
		.on('cancel', (event) => {
			console.log('click cancel button');
		});

	if (type.value == 'loading') {
		setTimeout(() => {
			var second = 5;
			var dialog = Dialog.prompt(`${second}秒后自动关闭loading`, 6000)
				/*.update((scope) => {
					setTimeout(function loop() {
						second--;
						if (second > 0) {
							scope.msg = `${second}秒后自动关闭loading`;
							setTimeout(loop, 1000);
						}
					}, 1000);
				})*/
				.on('ready', () => Dialog.loading('off'));
		}, 1000);
	} 
};