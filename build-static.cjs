const fs = require("fs");
const path = require("path");

const root = __dirname;
const out = path.join(root, "dist");

const pages = ["index.html", "menu.html", "commande.html", "galerie.html", "contact.html"];
const dirs = ["css", "js", path.join("images", "optimized")];

function copyFile(relativePath) {
  const source = path.join(root, relativePath);
  const target = path.join(out, relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}

function copyDir(relativeDir) {
  const source = path.join(root, relativeDir);
  const target = path.join(out, relativeDir);
  fs.cpSync(source, target, { recursive: true });
}

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

for (const page of pages) copyFile(page);
for (const dir of dirs) copyDir(dir);

console.log(`Static site copied to ${path.relative(root, out)}`);
