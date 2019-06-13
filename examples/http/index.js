const http = require('http');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

  const { url, method } = req;

  if (method === 'POST' && url === '/users') {

    res.writeHead(200, { 'Content-Type': 'text/json' });
    res.write(`
      {
        "users": [1,2,3]
      }
    `);
    res.end();

  } else {

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`
      <form method='POST' action='/users'>
        Hello World!
        <p><button>OK</button></p>
      </form>
    `);
    res.end();

  }
});

server.listen(port, () =>
  console.log(`Listening on port ${port}`));
