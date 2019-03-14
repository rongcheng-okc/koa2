module.exports = function(app) {
  // 读取 cookie
  app.use((ctx, next) => {
    console.log("当前 cookie name: ", ctx.cookies.get("name"));
    console.log("当前 cookie ruanyifeng: ", ctx.cookies.get("ruanyifeng"));
    next();
  });

  // 设置 cookie
  app.use(async (ctx, next) => {
    ctx.cookies.set("name", "wdd", { httpOnly: false });
    ctx.cookies.set("desc", "1992", { path: "/rc", httpOnly: false });
    ctx.cookies.set("age", "26", { domain: "two.rc.com", httpOnly: false });
    ctx.cookies.set("token", "26", { domain: "rc.com", httpOnly: false });
    // 由原来的页面跳转到 http://one.okc.com:3000 页面就可以看到下面这个 cookie 了
    ctx.cookies.set("different", "8", {
      domain: "one.okc.com",
      httpOnly: false
    });
    // 测试 cors 里的 credentials 字段  http://www.ruanyifeng.com
    // 加了 'domain': 'www.ruanyifeng.com', 'path': '/' 这两个设置就不能获取了
    ctx.cookies.set("ruanyifeng", "teacher", { httpOnly: false });
    await next();
  });
};
