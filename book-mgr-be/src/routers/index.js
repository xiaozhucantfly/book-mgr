// 引进auth的index
const auth = require('./auth/index');
const inviteCode = require('./invite-code')

module.exports = (app) => {
    app.use(auth.routes());
    app.use(inviteCode.routes());
};