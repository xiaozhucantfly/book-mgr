import {
    del,
    get,
    post,
} from '@/helpers/request';


export const list = ( page = 1, size = 20, keyword = '') => {
    return get('/user/list',
        {
            page,
            size,
            keyword,
        },
    );
};

// 删除用户的方法

export const remove = (id) => {
    // 发送删除请求
    return del(`/user/${id}`)
};

// 添加用户的方法
export const add = (account, password, character) => {
    // 发送请求
    return post('/user/add', {
        account,
        password,
        character,
    });
};

//重置用户密码的方法
export const resetPassword = (id) => {
    // 发送请求
    return post('/user/reset/password', {
       id,
    });
};
// 角色编辑
export const editCharacter = (characterId, userId) => {
    // 发送请求
    return post('/user/update/character', {
       character: characterId,
       userId: userId,
    });
};

export const info = () => {
    // 发送请求
    return get('/user/info'); 
};

export const addMany = (key) => {
    // 发送请求
    return post('/user/addMany', {
       key,
    });
};