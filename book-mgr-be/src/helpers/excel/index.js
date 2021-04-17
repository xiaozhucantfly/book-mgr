const xlsx = require('node-xlsx');


// const workSheet = xlsx.parse(`${__dirname}/`)
// 返回xlsx路径
const loadExcel = (path) => {
    return xlsx.parse(path);

};

const getFirstSheet = (sheets) => {
    return sheets[0].data;

};

module.exports = {
    loadExcel,
    getFirstSheet,
};