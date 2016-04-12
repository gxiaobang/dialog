import { dialog } from './dialog.js';
import { getDOM } from './util.js';


var type = getDOM('#type')[0],
		icon = getDOM('#icon')[0],
		msg = getDOM('#msg')[0];

getDOM('#btn')[0].onclick = () => {
	dialog(type.value, msg.value, icon.value)
		.on('ok', (event) => {
			console.log('click ok button');
		})
		.on('cancel', (event) => {
			console.log('click cancel button');
		});
};