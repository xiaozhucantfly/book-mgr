import {
    del,
    get,
    post,
} from '@/helpers/request';

export const baseInfo = () => {
    return get('/dashboard/base-info');
};
