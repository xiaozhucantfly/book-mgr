const Router = require('@koa/router');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const config = require('../../project.config')
const { verify, getToken } = require('../../helpers/token') 
const { getBody } = require('../../helpers/utils');
const { saveFileToDisk, getUploadFileExt } = require('../../helpers/upload');

const path = require('path');
// const jwt = require('jsonwebtoken');

const User = mongoose.model('User');
const Character = mongoose.model('Character');

const router = new Router({
    prefix: '/upload',
});


// 上传文件
router.post('/file', async (ctx) => {
    const ext = getUploadFileExt(ctx);
    const filename = `${uuidv4()}.${ext}`;
    const dir = await saveFileToDisk(
        ctx, path.resolve(config.UPLOAD_DIR, filename)
        );

    ctx.body = {
        data: filename,
        code: 1,
        msg: '',
    };
});

module.exports = router;