const TOkEN_STORAGE_KEY = '_tt';

export const getToken = () => {
    return localStorage.getItem(TOkEN_STORAGE_KEY) || '';
};

export const setToken = (token) => {
    localStorage.setItem(TOkEN_STORAGE_KEY, token);
    return token;
};