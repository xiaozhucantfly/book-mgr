const mongoose = require('mongoose');
// 导入方法getmate
const { getMeta,preSave } = require('../helpers');

// 服务端的信息
// 
const BookClassifySchema = new mongoose.Schema({
    
    title: String,
    

    meta: getMeta(),
});
BookClassifySchema.pre('save',preSave );
mongoose.model('BookClassify', BookClassifySchema);