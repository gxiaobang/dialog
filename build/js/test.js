'use strict';

var _dialog = require('./dialog.js');

var _util = require('./util.js');

var type = (0, _util.getDOM)('#type')[0],
    icon = (0, _util.getDOM)('#icon')[0],
    msg = (0, _util.getDOM)('#msg')[0];

(0, _util.getDOM)('#btn')[0].onclick = function () {
		(0, _dialog.dialog)(type.value, msg.value, icon.value);
};
//# sourceMappingURL=test.js.map
