const http = require('http');

const server = http.createServer((req, res) => {
  const { url, method } = req;
  console.log({ url, method });
  if (method === 'POST' && url === '/users1') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    try {
      res.write(`
        x!
      `); // write a response to the client
      throw new Error('What!!!');
    } catch (e) {
      // @ts-ignore
      this.emit('error', e);
    }
    res.end(); // end the response
  } else if (method === 'POST' && url === '/users') {
    res.writeHead(200, { 'Content-Type': 'text/json' });
    res.write(`
          {
            "users": [1,2,3]
          }
        `); // write a response to the client
    res.end(); // end the response
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`
        <form method='POST' action='/users'>
          Hello World!
          <p><button>OK</button></p>
        </form>
      `); // write a response to the client
    res.end(); // end the response
  }
});
// server.on("error", msg => console.log(msg));
server.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`));
