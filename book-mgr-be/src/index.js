const Koa = require('koa');
const koaBody = require('koa-body');
// const Body = require('koa-body');
const { connect } = require('./db');
const registerRoutes = require('./routers');
const koaStatic = require('koa-static');
const { middleware: koaJwtMiddleware,  checkUser,catchTokenError } = require('./helpers/token')
const { logMiddleware } = require('./helpers/log')
const cors = require('@koa/cors');
const path = require('path');
const config = require('./project.config');
const app = new Koa();

app.use(koaStatic(path.resolve(__dirname, '../public')));

connect().then(() => {
    app.use(cors());
    app.use(koaBody({
        multipart: true,
        formidable: {
            maxFileSize: 200 * 1024 * 1024,
        }
    }));
    app.use(catchTokenError);
    koaJwtMiddleware(app);
    app.use(checkUser);
    app.use(logMiddleware);
    registerRoutes(app);
    
    app.listen(config.SERVER_PORT, () => {
        console.log('启动成功')
    });
    
    
});




