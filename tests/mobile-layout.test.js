const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");

assert.match(
  css,
  /--app-height:\s*100(?:dvh|svh|vh)/,
  "CSS should define a viewport height custom property fallback."
);

assert.match(
  css,
  /\.experience\s*\{[\s\S]*height:\s*var\(--app-height\)/,
  "Experience should size to the visible app height custom property."
);

assert.match(
  css,
  /@media\s*\(max-width:\s*720px\)[\s\S]*\.start-button\s*\{[\s\S]*top:\s*50%/,
  "Mobile start button should be positioned near the center instead of anchored to the bottom."
);

assert.match(
  script,
  /visualViewport/,
  "Script should sync CSS height from the visual viewport on mobile browsers."
);

assert.match(
  script,
  /requestFullscreen/,
  "Script should request fullscreen from a user gesture."
);
