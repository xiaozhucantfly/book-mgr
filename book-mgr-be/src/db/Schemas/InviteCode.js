const mongoose = require('mongoose');
// 导入方法getmate
const { getMate } = require('../helpers');

// 服务端的信息
// 
const InviteCodeSchema = mongoose.Schema({
    // 邀请码
    code: String,
    // 用来注册哪个账户
    user: String,

    meta: getMate(),
});

mongoose.model('InviteCode', InviteCodeSchema);