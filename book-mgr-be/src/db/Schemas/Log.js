const mongoose = require('mongoose');
// 导入方法getmate
const { getMeta,preSave } = require('../helpers');

// 服务端的信息
// 
const LogSchema = new mongoose.Schema({
    user: {
        account: String,
        id: String,
    },

    request: {
        method: String,
        url: String,
        body: String,
    },

    meta: getMeta(),
});
LogSchema.pre('save',preSave );
mongoose.model('Log', LogSchema);