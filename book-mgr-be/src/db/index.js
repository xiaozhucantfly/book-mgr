const mongoose = require('mongoose');
//给那个数据库
//哪个几何
//添加什么格式的文档

//Schema
//model 可以理解为根据schema生成的一套方法集合，这套方法用来操作集合和集合下的文档
const UserSchema = new mongoose.Schema({
    nickname: String,
    password: String,
    age: Number,
});

const UserModal = mongoose.model('User', UserSchema);

const connect = () => {
    
    
    //去链接数据库
    mongoose.connect('mongodb://127.0.0.1:27017/book-mgr');
    //数据库打开的时候做的事情提示链接成功
    mongoose.connection.on('open', () =>{
        console.log('链接成功');
        const user = new UserModal({
            nickname: '小明',
            password: '123456',
            age: 12,
        });

        user.save();
    });
};
//链接
connect();