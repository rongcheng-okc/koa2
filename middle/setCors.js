module.exports = function (app, cors) {
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
}