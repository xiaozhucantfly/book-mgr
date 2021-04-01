const mongoose = require('mongoose');
// 导入方法getmate
const { getMeta, preSave } = require('../helpers');

// 服务端的信息
// 
const InventoryLogSchema = new mongoose.Schema({
    type: String,
    num: Number,
    user: String,

    meta: getMeta(),
});

InventoryLogSchema.pre('save',preSave );
mongoose.model('InventoryLog', InventoryLogSchema);