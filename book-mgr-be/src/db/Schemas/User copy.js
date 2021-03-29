const mongoose = require('mongoose');
// 导入方法getmate
const { getMate } = require('../helpers');

// 服务端的信息
// 
const BookSchema = mongoose.Schema({
    //书名 
    name: String,
    // 价格
    price: Number,
    // 作者
    author: String,
    // 出版日期
    publishDate: String, 
    // 分类
    classift: String,




    meta: getMate(),
});

mongoose.model('Book', Bookchema);