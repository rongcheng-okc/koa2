const fs = require('fs');

fs.readFile('./files/rc.text', 'utf-8', function (err, data) { //不加编码限制就会返回 Buffer 类型数据
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});

fs.readFile('./files/w_favicon.ico', function (err, data) {
  if (err) {
      console.log(err);
  } else {
      console.log(data);
      console.log(data.length + ' bytes');
  }
});

// Buffer => String
// var text = data.toString('utf-8');
// console.log(text);

// String => Buffer
// var buf = Buffer.from(text, 'utf-8');
// console.log(buf);

var data = 'Hello, Node.js';
fs.writeFile('./files/output.txt', data, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('ok.');
    }
});