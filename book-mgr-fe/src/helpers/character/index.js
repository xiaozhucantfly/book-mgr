import store from '@/store';


export const getCharacterInfoById = (id) => {
    const { characterInfo } = store.state;

    const one = characterInfo.find((item) => {
        return item._id === id;
    });
    if (one) {
        return one;
    }
    return {
        title: '未知的角色',
    };
};