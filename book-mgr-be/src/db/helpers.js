const getMeta= () => {
    return {
        // 创建的时间
        createdAt: {
            type: Number,
            // 拿到当前时间戳
            default: (new Date()).getTime(),
        },
        // 文档更新的时间
        updatedAt: {
            type: Number,
            // 拿到当前时间戳
            default: (new Date()).getTime(),
        },
    };
};

const preSave = function(next) {
    if (this.isNew) {
        const ts = Date.now();
        this['meta'].createdAt = ts;
        this['meta'].updatedAt = ts;
    } else {
        this['meta'].updatedAt = Date.now();
    }

    next();
};

// 导出方法
module.exports = {
    getMeta,
    preSave,
};