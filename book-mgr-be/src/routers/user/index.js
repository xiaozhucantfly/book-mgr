const Router = require('@koa/router');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const { getBody } = require('../../helpers/utils');
// const jwt = require('jsonwebtoken');

const User = mongoose.model('User');

const router = new Router({
    prefix: '/user',
});


router.get('/list', async (ctx) => {
    let {
         page,
         size,
    } = ctx.query;
    // 用let 才是变量  const是常量
    page = Number(page);
    size = Number(size);

    const list = await User
        .find()
        .skip((page - 1) * size)
        .limit(size)
        .exec();
    
    const total = await User.countDocuments().exec();

    ctx.body = {
        msg: '获取列表成功',
        data: {
            list,
            page,
            size,
            total,
        },
        code: 1,

    }
});

module.exports = router;