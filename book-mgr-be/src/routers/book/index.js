const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils');

// 1代表入 2代表出
const BOOK_CONST = {
    IN: 'IN_COUNT',
    OUT: 'OUT_COUNT',
};

const Book = mongoose.model('Book');

const router = new Router({
    prefix: '/book',
});
// 添加书籍的接口
router.post('/add', async (ctx) =>{
    const {
        name,
        price,
        author,
        publishDate,
        classify,
        count,
    } = getBody(ctx);

    const book = new Book({
        name,
        price,
        author,
        publishDate,
        classify,
        count,
    });

    const res = await book.save();
    ctx.body = {
        data: res,
        code: 1,
        msg: '添加成功',
    };

});
// 获取书籍的接口
router.get('/list', async (ctx) =>{
    const {
        page = 1,
        keyword = '',
    } = ctx.query;  
    let {
        size = 10,
    } = ctx.query;
    size = Number(size);

    const query = {};
    if (keyword) {
        query.name = keyword;
    }

    const list = await Book
        .find(query)
        .skip((page - 1) * size)
        .limit(size)
        .exec();
    const total = await Book.countDocuments();
    ctx.body = {
        data: {
            total,
            list,
            page,
            size,
        },
        code: 1,
        msg: '获取列表成功',
    }

});

router.delete('/:id', async (ctx) => {
    const {
        id
    } = ctx.params;

    const delMsg = await Book.deleteOne({
        _id: id,
    }) ;

    ctx.body = {
        data: delMsg,
        msg: '删除成功',
        code: 1,
    }
});

// 出入库
router.post('/update/count', async (ctx) => {
    const {
        id,
        type,

    } = ctx.request.body;

    let {
        num,
     } = ctx.request.body;
    
    num = Number(num);

    const book =await Book.findOne({
        _id: id,
    }).exec();
    // 书没找到
    if (!book) {
        ctx.body = {
            code: 0,
            msg: '没有找到书籍',
        };
        return;
    }
    // 书找到
    if (type === BOOK_CONST.IN) {
        // 入库
         num = Math.abs(num);
    } else {
        // 出库
         num = -Math.abs(num);
    }
    book.count = book.count + num;
    if (book.count < 0 ) {
        ctx.body = {
            code: 0,
            msg: '余量不足',
        };
        return;
    }
    const res = await book.save();
    ctx.body = {
        data: res,
        code: 1,
        msg: '操作成功',
    };
    
});

// 书籍修改的接口
router.post('/update', async(ctx) =>{
    const {
        id,
        ...others
    } = ctx.request.body;

    const one = await Book.findOne({
        _id: id,
    }).exec();
    
    
    // 书本没找到
    if (!one) {
        ctx.body = {
            msg: '没有找到书籍',
            code: 0,
        }
        return;
    }

    const newQuery = {};
    Object.entries(others).forEach(([key, value]) =>{
        if (value) {
            newQuery[key] = value;
        }
    });
    Object.assign(one, newQuery);
    const res = await one.save();

    ctx.body = {
        data: res,
        code: 1,
        msg: '保存成功',
    };
    // 书找到后
});

module.exports = router;