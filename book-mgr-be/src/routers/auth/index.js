const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils');
const jwt = require('jsonwebtoken');
const config = require('../../project.config')
// 拿到对应的module
const User = mongoose.model('User');
const InviteCode = mongoose.model('InviteCode');
const Character = mongoose.model('Character');

const router = new Router({
    prefix: '/auth',
});

// 注册功能
router.post('/register', async (ctx) => {
    const {
        account,
        password,
        inviteCode,
    } = getBody(ctx);
    // 
    // 做一个表单校验
    if (account === '' || password ==='' || inviteCode ==='') {
        ctx.body = {
            code: 0,
            msg: '字段不能为空',
            data: null,
        };
        return;
    };
    // 找有无邀请码
    const findCode = await InviteCode.findOne({
        code: inviteCode,
    }).exec();
    // 若无邀请码
    if (!findCode) {
        ctx.body = {
            code: 0,
            msg: '邀请码无效',
            data: null,
        };
        return;
    };
    // 若邀请码已经被用
    if (findCode.user) {
        ctx.body = {
            code: 0,
            msg: '该邀请码已被使用',
            data: null,
        };
        return;
    };

    //去找account 为传递上来的“account” 用户 
    const findUser = await User.findOne({
        account,
    }).exec();
    // 判断有无用户
    if (findUser) {
        // 若有则提示
        ctx.body = {
            code: 0,
            msg: '注册失败，已存在该用户',
            data: null,
        };
        return;
    };
    // console.log(ctx.request.body);

    // 创建一个用户
    const user = new User({
        account,
        password,
       
    });

    // 把创建的用户传递到mongodb
    const res = await user.save();
    // 邀请码绑定唯一ID
    findCode.user = res._id;
    // 拿到时间戳
    findCode.meta.updatedAt = new Date().getTime();
    // 保存数据
    await findCode.save();

    // 响应成功
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
        character: one.character,
        _id: one._id,
    };

    if (one.password === password) {
        ctx.body = {
            code: 1,
            msg: '登陆成功',
            data: {
                user,
                token: jwt.sign(user, config.JWT_SECRET),
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