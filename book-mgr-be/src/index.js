const Koa = require('koa');
const koaBody = require('koa-body');
// const Body = require('koa-body');
const { connect } = require('./db');
const registerRoutes = require('./routers');
const { middleware: koaJwtMiddleware, catchTokenError } = require('./helpers/token')
const { logMiddleware } = require('./helpers/log')
const cors = require('@koa/cors');

const app = new Koa();

connect().then(() => {
    app.use(cors());
    app.use(koaBody());
    // app.use(catchTokenError);
    // koaJwtMiddleware(app);
    app.use(logMiddleware);
    registerRoutes(app);
    
    app.listen(3000, () => {
        console.log('启动成功')
    });
    
    
});




