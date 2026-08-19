const { createServer } = require("http");
const nextModule = require("next");
const next = nextModule.default || nextModule;

// Prevent Next.js from calling process.exit(0) on stdin EOF
const originalExit = process.exit;
process.exit = function (code) {
  if (code === 0) {
    console.log("Intercepted process.exit(0) call - keeping server alive...");
    return;
  }
  originalExit(code);
};

process.on("SIGHUP", () => {});
process.on("uncaughtException", (err) => console.error("Uncaught exception:", err));
process.on("unhandledRejection", (err) => console.error("Unhandled rejection:", err));

setInterval(() => {}, 100000);

const dev = true;
const hostname = "127.0.0.1";
const port = 3000;

console.log("Starting Next.js server initialization...");

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    console.log("app.prepare() succeeded! Creating HTTP server...");
    const server = createServer(async (req, res) => {
      try {
        await handle(req, res);
      } catch (err) {
        console.error("Error handling request:", err);
        res.statusCode = 500;
        res.end("Internal Server Error");
      }
    });

    server.listen(port, hostname, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to prepare Next.js app:", err);
    originalExit(1);
  });
