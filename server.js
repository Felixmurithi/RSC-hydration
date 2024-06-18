const { readFileSync } = require("fs");
const { createServer } = require("http");
const { parse } = require("url");

const { renderToString } = require("react-dom/server");
const React = require("react");

function Likes() {
  const [count, setCount] = React.useState(0);

  return (
    <figure>
      <button onClick={() => setCount((count) => count + 1)}>+</button>
      <button onClick={() => setCount((count) => count - 1)}>-</button>
    </figure>
  );
}

const htmlTemplate = readFileSync(`${__dirname}/index.html`, "utf-8");
const clientJS = readFileSync(`${__dirname}/client.js`, "utf-8");

const server = createServer((req, res) => {
  const pathName = parse(req.url, true).pathname;

  if (pathName === "/") {
    const renderedHTML = renderToString(<Likes />);

    const html = htmlTemplate.replace("%%%CONTENT%%%", renderedHTML);
    res.writeHead(200, { "Content-type": "text/html" });

    res.end(html);
  } else if (pathName === "/client.js") {
    res.writeHead(200, { "Content-type": "application/javascript" });
    res.end(clientJS);
  } else {
    res.end("The URL cannot be found");
  }
});

server.listen(8000, () => console.log("listening for requests on port 8000"));
