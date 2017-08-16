const http = require('http');
const router = require('./routes.js');
const PORT = process.env.PORT || 4000

const server = http.createServer(router);

server.listen(PORT , ()=> {
  console.log('Server is runing at ' + PORT);
})
