import { message } from 'ant-design-vue';
import { formatTimeStr } from 'ant-design-vue/lib/statistic/utils';
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
// 修复时间戳
export const formatTimestamp = (ts) => {
  const date = new Date(Number(ts));
  const YYYY = date.getFullYear();
  const MM = date.getMonth() +1;
  const DD = date.getDate();

  const hh = date.getHours();
  const mm = date.getMinutes();
  const ss = date.getSeconds();

  return `${YYYY}/${MM}/${DD} ${hh}:${mm}:${ss}`


};