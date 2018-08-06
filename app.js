const Koa = require('koa');

const app = new Koa();

app.use(async (ctx, next) => {
    if(ctx.request.url !== '/favicon.ico') {
        console.log(`${ctx.request.method} ${ctx.request.url}`); 
        await next();
    } 
});

// 读取 cookie
app.use((ctx, next) => {
    console.log('当前 cookie：name=', ctx.cookies.get('name'));
    console.log('当前 cookie：desc=', ctx.cookies.get('desc'));
    next();
});

// 设置 cookie
app.use(async (ctx, next) => {
    ctx.cookies.set('name', 'wdd', { 'httpOnly': false });
    ctx.cookies.set('desc','1992', { 'path': '/rc', 'httpOnly': false });
    ctx.cookies.set('age','26', { 'domain': 'two.rc.com', 'httpOnly': false });
    ctx.cookies.set('token','26', { 'domain': 'rc.com', 'httpOnly': false });
    await next();
});

app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
});

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');