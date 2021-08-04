const http = require('http');
const fs = require('fs')
const LitJsSdk = require('lit-js-sdk')
const url = require('url')

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
  // we only have 1 endpoint, and this is it.
  const parsedUrl = url.parse(req.url, true)
  if (parsedUrl.path === '/verify') {
    const { jwt } = parsedUrl.query
    const { verified, header, payload } = LitJsSdk.verifyJwt({ jwt })

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({
      verified,
      header,
      payload
    }))
    return
  }

  // serve static file
  fs.readFile(__dirname + "/index.html", function (err, data) {
    if (err) {
      res.writeHead(404)
      res.end(JSON.stringify(err))
      return
    }
    res.writeHead(200)
    res.end(data)
  });

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
});