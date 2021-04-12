require('./Schemas/InviteCode');
require('./Schemas/User');
require('./Schemas/Book');
require('./Schemas/InventoryLog');
require('./Schemas/Character');
require('./Schemas/Log');
require('./Schemas/LogResponse');
require('./Schemas/ForgetPassword');
const mongoose = require('mongoose');
const connect = () => {
    return new Promise((resolve) => {
        mongoose.connect('mongodb://127.0.0.1:27017/book-mgr');
        //数据库打开的时候做的事情提示链接成功
        mongoose.connection.on('open', () => {
            console.log('链接数据库成功');
            resolve();
        });
    });
    
   
};


module.exports = {
    connect,
};