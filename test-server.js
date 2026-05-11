const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>哈利波特魔法石</h1><p>服务器运行正常！</p>');
});

server.listen(3000, () => {
  console.log('测试服务器运行在 http://localhost:3000');
});
