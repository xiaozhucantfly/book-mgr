import axios from 'axios';

export const list = ( page = 1, size = 20, keyword = '') => {
    return axios.get('http://localhost:3000/user/list',
        {
            params: {
                
                page,
                size,
                keyword,
            }
        },
    );
};

// 删除用户的方法

export const remove = (id) => {
    // 发送删除请求
    return axios.delete(`http://localhost:3000/user/${id}`)
};

// 添加用户的方法
export const add = (account, password, character) => {
    // 发送请求
    return axios.post('http://localhost:3000/user/add', {
        account,
        password,
        character,
    });
};

//重置用户密码的方法
export const resetPassword = (id) => {
    // 发送请求
    return axios.post('http://localhost:3000/user/reset/password', {
       id,
    });
};
// 角色编辑
export const editCharacter = (characterId, userId) => {
    // 发送请求
    return axios.post('http://localhost:3000/user/update/character', {
       character: characterId,
       userId: userId,
    });
};

export const info = () => {
    // 发送请求
    return axios.get('http://localhost:3000/user/info'); 
};