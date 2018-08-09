const Koa = require('koa');
const cors = require('koa2-cors');

const app = new Koa();

app.use(cors({
    origin: function (ctx) {
        if (ctx.url === '/json') {
            return 'http://www.ruanyifeng.com'; 
            /*
            允许请求的域名； 
            *  * 代表所有
            *  浏览器的 response Headers 里会出现 Access-Control-Allow-Origin: http://www.ruanyifeng.com
            */ 
        }
        return 'http://localhost:3000';
        // 这样就能只允许 http://localhost:8080 这个域名的请求了
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

app.use(async (ctx, next) => {
    if(ctx.request.url !== '/favicon.ico') {
        console.log(`${ctx.request.method} ${ctx.request.url}`); 
        await next();
    } 
});

// 读取 cookie
app.use((ctx, next) => {
    console.log('当前 cookie name: ', ctx.cookies.get('name'));
    console.log('当前 cookie ruanyifeng: ', ctx.cookies.get('ruanyifeng'));
    next();
});

// 设置 cookie
app.use(async (ctx, next) => {
    ctx.cookies.set('name', 'wdd', { 'httpOnly': false });
    ctx.cookies.set('desc','1992', { 'path': '/rc', 'httpOnly': false });
    ctx.cookies.set('age','26', { 'domain': 'two.rc.com', 'httpOnly': false });
    ctx.cookies.set('token','26', { 'domain': 'rc.com', 'httpOnly': false });
    // 由原来的页面跳转到 http://one.okc.com:3000 页面就可以看到下面这个 cookie 了
    ctx.cookies.set('different','8', { 'domain': 'one.okc.com', 'httpOnly': false});
    // 测试 cors 里的 credentials 字段  http://www.ruanyifeng.com
    // 加了 'domain': 'www.ruanyifeng.com', 'path': '/' 这两个设置就不能获取了
    ctx.cookies.set('ruanyifeng','teacher', { 'httpOnly': false });
    await next();
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

function sendAjax() {
    const url = 'http://127.0.0.1:3000/json';
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.withCredentials = true;
    xhr.setRequestHeader('Authorization', 'value');
    xhr.send();
    xhr.onerror = function(e) {
        console.log('请求出错了');
        console.log(e);
    };
}