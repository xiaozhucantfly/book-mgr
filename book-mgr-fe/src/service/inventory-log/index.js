import {
    del,
    get,
    post,
} from '@/helpers/request';


export const list = (type = 'IN_COUNT', page = 1, size = 20, id) => {
    return get('/inventory-log/list',
        {
            id,
            type,
            page,
            size,
        },
    );
};

