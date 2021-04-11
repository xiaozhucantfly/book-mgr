const mongoose = require('mongoose');
// 导入方法getmate
const { getMeta, preSave } = require('../helpers');

// 服务端的信息
// 
const LogResponseSchema = new mongoose.Schema({
    logId: String,
    data: String,


    meta: getMeta(),
});
LogResponseSchema.pre('save',preSave );
mongoose.model('LogResponse', LogResponseSchema);