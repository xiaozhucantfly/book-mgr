const jwt = require('jsonwebtoken');
const config = require('../../project.config')

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

module.exports = {
    verify,
    getToken,
}