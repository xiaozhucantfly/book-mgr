const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');

const router = new Router({
    prefix: '/auth',
});

// 注册功能
router.post('/register', async (ctx) => {
    const {
        account,
        password,
    } = getBody(ctx);

    if (account === '' || password ==='') {
        ctx.body = {
            code: 0,
            msg: '字段不能为空',
            data: null,
        };
        return;
    };
    
    const one = await User.findOne({
        account,
    }).exec();
    
    if (one) {
        ctx.body = {
            code: 0,
            msg: '注册失败，已存在该用户',
            data: null,
        };
        return;
    };
    console.log(ctx.request.body);

    const user = new User({
        account,
        password,
    });
    const res = await user.save();
    ctx.body = {
        code: 1,
        msg: '注册成功',
        data: res,
    };
});

router.post('/login', async (ctx) => {
    const {
        account,
        password,
    } = getBody(ctx);

    if (account === '' || password ==='') {
        ctx.body = {
            code: 0,
            msg: '字段不能为空',
            data: null,
        };
        return;
    };

    const one = await User.findOne({
        account,
    }).exec();
    if (!one) {
        ctx.body = {
            code: 0,
            msg: '用户名或密码错误',
            data: null,
        };
        return;
    };

    const user = {
        account: one.account,
        _id: one._id,
    };

    if (one.password === password) {
        ctx.body = {
            code: 1,
            msg: '登陆成功',
            data: {
                user,
                token: jwt.sign(user, 'book-mgr'),
            },
        };
        return;
    };
    ctx.body = {
        code: 0,
        msg: '用户名或密码错误',
        data: null,
    };
    return;
});
module.exports = router;