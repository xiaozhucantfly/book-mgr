const mongoose = require('mongoose');
// 导入方法getmate
const { getMate } = require('../helpers');

// 服务端的信息
// 
const UserSchema = mongoose.Schema({
    account: String,
    password: String,

    meta: getMate(),
});

mongoose.model('User', UserSchema);