const jwt = require('jsonwebtoken');
const config = require('../../project.config')
const koaJwt = require('koa-jwt')

const getToken = (ctx) =>{
    let { authorization } = ctx.header;
    // 去除请求头里的  bearer字符串
    return authorization.replace('Bearer ', '').replace('bearer ', '');
};

const verify = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.JWT_SECRET, (err, payload) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(payload);
        })
    }); 
};
// token认证登陆
const middleware = (app) => {
    app.use(koaJwt({
        secret: config.JWT_SECRET,
    }).unless({
        path: [
            /^\/auth\/login/,
            /^\/auth\/register/,
        ],
    }));
};

const catchTokenError = async (ctx, next) => {
    return next().catch((error) => {
        if (error.status === 401) {
            ctx.status = 401;
            ctx.body = {
                code: 0,
                msg: 'token error',
            };
        } else {
            throw error;
        }
    });
};

module.exports = {
    verify,
    getToken,
    middleware,
    catchTokenError,
};