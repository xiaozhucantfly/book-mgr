const mongoose = require('mongoose');
// 导入方法getmate
const { getMeta,preSave } = require('../helpers');

// 服务端的信息
// 
const CharacterSchema = new mongoose.Schema({
    name: String, //管理员还是  成员
    title: String,
    power: Object, //权限
    meta: getMeta(),
});
CharacterSchema.pre('save',preSave );
mongoose.model('Character', CharacterSchema);