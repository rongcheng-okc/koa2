const Koa = require('koa');
const cors = require('koa2-cors');
const setCors = require('./middle/setCors');
const setCoookiesMiddle = require('./middle/setCookies');

const app = new Koa();

setCors(app, cors);

setCoookiesMiddle(app);

app.use(async (ctx, next) => {
    if(ctx.request.url !== '/favicon.ico') {
        console.log(`${ctx.request.method} ${ctx.request.url}`); 
        await next();
    } 
});

// 获取 json 数据的接口
app.use(async (ctx, next) => { 
    if(ctx.request.url === '/json' && ctx.request.method === 'GET') {
        const data = {
            age: 26,
            name: 'rongcheng'
        };
        ctx.response.body= data;
    } else {
        await next();
    }
});

app.use(async (ctx, next) => {
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
    await next();
});

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');