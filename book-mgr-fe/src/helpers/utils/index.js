import { message } from 'ant-design-vue';
export const result = (respons, authShowErrorMsg = true) => {
    const { data } = respons;

    if ((data.code === 0) && authShowErrorMsg) {
        message.error(data.msg);
    };

    return {
        success(cb) {
            if (data.code !== 0) {
                cb(data, respons);
            };
            return this;
        },
        fail(cb) {
            if (data.code === 0) {
                cb(data, respons);
            };
            return this;
        },
        finally(cb) {
            cb(data, respons);
            return this;
        },
    };
};

export const clone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};