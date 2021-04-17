import {
    del,
    get,
    post,
} from '@/helpers/request';

export const list = () => {
    return get('/character/list',
        
    );
};

