const getMate = () => {
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

// 导出方法
module.exports = {
    getMate,
};