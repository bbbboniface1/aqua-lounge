const http = require("http");
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const PORT = 5000;
const ROOT = __dirname;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const COMPRESSIBLE = new Set([".html", ".css", ".js", ".json", ".svg"]);

const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-XSS-Protection": "1; mode=block",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

function getCacheControl(ext, urlPath) {
  if (ext === ".html") return "no-cache, must-revalidate";
  if (urlPath.includes("?v=")) return "public, max-age=31536000, immutable";
  if ([".webp", ".png", ".jpg", ".jpeg", ".woff", ".woff2", ".ico"].includes(ext))
    return "public, max-age=604800, stale-while-revalidate=86400";
  return "public, max-age=3600";
}

const server = http.createServer((req, res) => {
  let urlPath = req.url.split("?")[0];
  if (urlPath === "/") urlPath = "/index.html";

  const filePath = path.resolve(path.join(ROOT, urlPath));

  if (!filePath.startsWith(ROOT + path.sep) && filePath !== ROOT) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      const notFoundPath = path.join(ROOT, "404.html");
      fs.readFile(notFoundPath, (err2, data) => {
        if (err2) {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("Not found");
          return;
        }
        res.writeHead(404, { "Content-Type": "text/html; charset=utf-8", ...SECURITY_HEADERS });
        res.end(data);
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME[ext] || "application/octet-stream";
    const cacheControl = getCacheControl(ext, req.url);
    const acceptEncoding = req.headers["accept-encoding"] || "";
    const canCompress = COMPRESSIBLE.has(ext);

    const headers = {
      "Content-Type": contentType,
      "Cache-Control": cacheControl,
      "Vary": "Accept-Encoding",
      ...SECURITY_HEADERS,
    };

    if (canCompress && acceptEncoding.includes("br")) {
      headers["Content-Encoding"] = "br";
      res.writeHead(200, headers);
      fs.createReadStream(filePath).pipe(zlib.createBrotliCompress()).pipe(res);
    } else if (canCompress && acceptEncoding.includes("gzip")) {
      headers["Content-Encoding"] = "gzip";
      res.writeHead(200, headers);
      fs.createReadStream(filePath).pipe(zlib.createGzip()).pipe(res);
    } else {
      res.writeHead(200, headers);
      fs.createReadStream(filePath).pipe(res);
    }
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
