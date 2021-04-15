// 引进auth的index
const auth = require('./auth/index');
const inviteCode = require('./invite-code')
const book = require('./book');
const InventoryLog = require('./inventory-log');
const user = require('./user');
const character = require('./character');
const log = require('./log');
const forgetPassword = require('./forget-password');
const bookClassify = require('./book-classify');
const profile = require('./profile');
const dashboard = require('./dashboard');
// 路由注册
module.exports = (app) => {
    app.use(auth.routes());
    app.use(inviteCode.routes());
    app.use(book.routes());
    app.use(InventoryLog.routes());
    app.use(user.routes());
    app.use(character.routes());
    app.use(log.routes());
    app.use(forgetPassword.routes());
    app.use(bookClassify.routes());
    app.use(profile.routes());
    app.use(dashboard.routes());
};