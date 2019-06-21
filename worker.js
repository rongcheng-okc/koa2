var cluster = require('cluster');
const Koa = require('koa');
var app = new Koa();
const port = 4000;

/**worker 文件中的 cluster.wordker 和 全局变量 process 指代的都是当前的 worker 进程，具体内容不太一致 */

console.log('[worker] ' + 'start worker ---' + cluster.worker.id);

cluster.worker.on('message', function(msg) {
  console.log('worker 进程收到消息' + msg);
  cluster.worker.send('worker' + cluster.worker.id + ' received!');
});

app.listen(port);

app.use(async (ctx, next) => {
  // ctx.response.type = 'text/html';
  // ctx.response.body = '<h1>Hello, koa2!</h1>';
  console.log('worker' + cluster.worker.id + ',PID:' + process.pid);
  await next();
});
