const mongoose = require('mongoose');
// 导入方法getmate
const { getMeta,preSave } = require('../helpers');

// 服务端的信息
// 
const UserSchema = new mongoose.Schema({
    account: String,
    password: String,
    character: String,
    meta: getMeta(),
});
UserSchema.pre('save',preSave );
mongoose.model('User', UserSchema);