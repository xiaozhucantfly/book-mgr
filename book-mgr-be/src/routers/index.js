// 引进auth的index
const auth = require('./auth/index');

module.exports = (app) => {
    app.use(auth.routes());
};