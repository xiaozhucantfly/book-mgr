import store from '@/store';
// 判断是否为管理员
export const isAdmin = () => {
    const uc = store.state.userCharacter;
    return uc.name === 'admin';
};

export const getCharacterInfoById = (id) => {
    const { characterInfo } = store.state;

    const one = characterInfo.find((item) => {
        return item._id === id;
    });
    
    return one || {
        title: '未知角色',
    };
};