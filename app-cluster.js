var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

cluster.setupMaster({
    exec: 'worker.js' // worker 进程文件路径
})

if (cluster.isMaster) {
  console.log('master start...');
  console.log('cpu 核数' + numCPUs);

  // Fork workers.
  for (var i = 0; i < 2; i++) {
    cluster.fork();
  }

  cluster.on('listening', (worker, address) => {
    console.log('控制进程 cluster listening: worker ' + worker.process.pid + 'port:' + address.port);
  });

  // 主进程接收消息
  cluster.on('message', (worker, msg) => {
    console.log(`控制进程收到消息：got the worker${worker.id}'s msg：${msg}`);
  });

  function eachWorker(callback) {
    for (let id in cluster.workers) {
      callback(cluster.workers[id]);
    }
  }

  // master 进程向 worker 进程发消息
  setTimeout(() => {
    eachWorker(function(worker) {
      worker.send('master send message to worker' + worker.id);
    });
  }, 3000);

  // worker 进程收到消息 这些定义在 worker 里更好
//   Object.keys(cluster.workers).forEach(function(id) {
//     cluster.workers[id].on('message', function(msg) {
//       console.log('worker 进程收到消息:' + msg);
//     });
//   });
}

/**
 * js 主进程先执行完主控制模块所有的代码，然后再跳入 worker 定义的模块去执行
 */