// 引进auth的index
const auth = require('./auth/index');
const inviteCode = require('./invite-code')
const book = require('./book');
const InventoryLog = require('./inventory-log');
const user = require('./user');
// 路由注册
module.exports = (app) => {
    app.use(auth.routes());
    app.use(inviteCode.routes());
    app.use(book.routes());
    app.use(InventoryLog.routes());
    app.use(user.routes());
};