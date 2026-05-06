const fs = require("fs");
const path = require("path");

const root = __dirname;
const srcDir = path.join(root, "js");
const targets = [
  path.join(root, "vercel-site", "js"),
  path.join(root, "public", "js"),
];

const files = fs.readdirSync(srcDir).filter((f) => f.endsWith(".js"));

for (const target of targets) {
  fs.mkdirSync(target, { recursive: true });
  for (const file of files) {
    const src = path.join(srcDir, file);
    const dest = path.join(target, file);
    fs.copyFileSync(src, dest);
    console.log(`Synced js/${file} → ${path.relative(root, dest)}`);
  }
}

console.log(`\nDone — ${files.length} file(s) synced to ${targets.length} directories.`);
