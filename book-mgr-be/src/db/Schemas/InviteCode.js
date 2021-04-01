const mongoose = require('mongoose');
// 导入方法getMeta
const { getMeta, preSave } = require('../helpers');

// 服务端的信息
// 
const InviteCodeSchema = mongoose.Schema({
    // 邀请码
    code: String,
    // 用来注册哪个账户
    user: String,

    meta: getMeta(),
});
InviteCodeSchema.pre('save',preSave );
mongoose.model('InviteCode', InviteCodeSchema);