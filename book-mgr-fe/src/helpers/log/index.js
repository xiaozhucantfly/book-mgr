const LOG_MAP = [
    ['/character/list', '获取角色列表'],
    ['/log/list', '获取日志列表'],
    ['/user/info', '获取自己的登入信息'],
    ['/book/list?', '查看书籍详情页面'],
    ['/book-classify/list', '进入书籍分类管理页面'],
    ['/forget-password/list', '进入重置密码列表'],
    ['/invite/list', '进入邀请码管理列表']
    
];

export const getLogInfoByPath = (path) => {
    let title = '';

    LOG_MAP.forEach((item) => {
        if (path.includes(item[0])) {
            title = path.replace(item[0], item[1]);
        }
    });

    return title || path;
};