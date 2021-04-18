const Router = require('@koa/router');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const config = require('../../project.config');
const { getBody } = require('../../helpers/utils');
// const jwt = require('jsonwebtoken');

const ForgetPassword = mongoose.model('ForgetPassword');
const User = mongoose.model('User');

const router = new Router({
    prefix: '/forget-password',
});

router.get('/list', async (ctx) => {
    let {
        page,
        size,
    } = ctx.request.query;

    page = Number(page);
    size = Number(size);

    const list = await ForgetPassword
        .find({
            status: 1,
        })
        .sort({
            _id: -1,
        })
        .skip((page - 1) * size)
        .limit(size)
        .exec();
    
    
    const total = await ForgetPassword
        .find({
            status: 1,
        })
        .countDocuments().exec(); 
    ctx.body = {
        data: {
            list,
            page,
            size,
            total,
        },
        code: 1,
        msg: '获取列表成功',

    };
});

router.post('/add', async (ctx) => {
    const {
        account,
    } = ctx.request.body; 
    // 账户需要存在,不存在也欺骗成功
    const user = await User.findOne({
        account,
    }).exec();

    if (!user) {
        ctx.body = {
            code: 1,
            msg: '申请成功啦',
        };
        return;
    };
    // 真的存在该用户
    const one = await ForgetPassword.findOne({
        account,
        status: 1,
    }).exec();

    if (one) {
        ctx.body = {
            code: 1,
            msg: '申请成功啦',
        };
        return;
    };
    // 第三情况
    const forgetPwd = new ForgetPassword({
        account,
        status: 1,
    });

    await forgetPwd.save();

    ctx.body = {
        code: 1,
        msg: '申请成功啦',
    };
});

router.post('/update/status', async (ctx) => {
    const {
        id,
        status,
    } = ctx.request.body;

    const one = await ForgetPassword.findOne({
        _id: id,
    });

    if (!one) {
        ctx.body = {
            code: 0,
            msg: '找不到这条申请',
        };
        return;
    };

    one.status = status;

    if (status === 2) {
        const user = await User.findOne({
            account: one.account,
        }).exec();
        
        if (user) {
            user.password = config.DEFAULT_PASSWORD;

            await user.save();
        }
    }

    await one.save();

    ctx.body = {
        code: 1,
        msg: '处理成功',
    };

});
module.exports = router;