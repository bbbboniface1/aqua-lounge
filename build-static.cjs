const fs = require("fs");
const path = require("path");

const root = __dirname;
const publicOut = path.join(root, "public");
const vercelOut = path.join(root, ".vercel", "output");
const staticOut = path.join(vercelOut, "static");

const pages = ["index.html", "menu.html", "commande.html", "galerie.html", "contact.html", "404.html"];
const files = ["manifest.json", "sw.js", "favicon.svg", "robots.txt", "sitemap.xml"];
const dirs = ["css", "js", "fonts", path.join("images", "optimized"), path.join("images", "dishes")];

function copyFile(relativePath) {
  const source = path.join(root, relativePath);
  const target = path.join(staticOut, relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}

function copyDir(relativeDir) {
  const source = path.join(root, relativeDir);
  const target = path.join(staticOut, relativeDir);
  fs.cpSync(source, target, {
    recursive: true,
    filter: (sourcePath) => !sourcePath.includes(path.join("images", "optimized", "dishes"))
  });
}

fs.rmSync(publicOut, { recursive: true, force: true });
fs.rmSync(vercelOut, { recursive: true, force: true });
fs.mkdirSync(staticOut, { recursive: true });

for (const page of pages) copyFile(page);
for (const file of files) copyFile(file);
for (const dir of dirs) copyDir(dir);

fs.writeFileSync(
  path.join(vercelOut, "config.json"),
  JSON.stringify(
    {
      version: 3,
      routes: [
        { src: "/", dest: "/index.html" },
        { src: "/menu", dest: "/menu.html" },
        { src: "/commande", dest: "/commande.html" },
        { src: "/galerie", dest: "/galerie.html" },
        { src: "/contact", dest: "/contact.html" }
      ]
    },
    null,
    2
  )
);

fs.cpSync(staticOut, publicOut, { recursive: true });

console.log("Static site copied to .vercel/output/static and public");
