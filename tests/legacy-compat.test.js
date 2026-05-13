const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const boot = fs.readFileSync(path.join(root, "boot.js"), "utf8");
const legacy = fs.readFileSync(path.join(root, "script.legacy.js"), "utf8");

assert.match(
  index,
  /<script src="\.\/boot\.js"><\/script>/,
  "Index should load the old-safe bootstrap script."
);

assert.doesNotMatch(
  index,
  /<script src="\.\/script\.js"><\/script>/,
  "Index should not directly load the modern script before compatibility checks."
);

assert.match(
  boot,
  /script\.js/,
  "Bootstrap should load the modern script for supported browsers."
);

assert.match(
  boot,
  /script\.legacy\.js/,
  "Bootstrap should load the legacy script for unsupported browsers."
);

assert.doesNotMatch(
  boot + legacy,
  /\?\.|\?\?|=>|\bconst\b|\blet\b|`/,
  "Bootstrap and legacy script should avoid syntax that can break Safari 12 parsing."
);

assert.match(
  css,
  /\.legacy-browser\s+\.experience\s*\{[\s\S]*height:\s*100vh/,
  "CSS should provide an old-browser visible baseline."
);

assert.match(
  css,
  /\.legacy-browser\s+\.start-button\s*\{[\s\S]*top:\s*50%/,
  "Legacy CSS should keep the start button visible and centered."
);

assert.match(
  css,
  /\.legacy-browser\s+\.rose-wrap\s*\{[\s\S]*filter:\s*none/,
  "Legacy CSS should remove expensive rose drop-shadow filters."
);

assert.match(
  css,
  /\.legacy-browser\s+\.rose-art\s*\{[\s\S]*animation:\s*none/,
  "Legacy CSS should avoid continuous rose float animation."
);

assert.match(
  css,
  /\.legacy-browser\s+\.experience::after\s*\{[\s\S]*animation:\s*none/,
  "Legacy CSS should avoid background star animation."
);
