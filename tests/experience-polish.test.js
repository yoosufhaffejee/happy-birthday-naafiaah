const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const modern = fs.readFileSync(path.join(root, "script.js"), "utf8");
const legacy = fs.readFileSync(path.join(root, "script.legacy.js"), "utf8");

function extractMessages(source) {
  const match = source.match(/(?:const|var) messages = \[([\s\S]*?)\];/);
  assert.ok(match, "messages array should exist");
  return Array.from(match[1].matchAll(/"([^"]+)"/g), (item) => item[1]);
}

assert.match(index, /class="ambient-particles"/, "Markup should include ambient particles.");
assert.match(index, /class="tap-ripple"/, "Markup should include a tap ripple layer.");
assert.match(index, /class="rose-aura"/, "Markup should include a rose aura layer.");
assert.equal((index.match(/<span><\/span>/g) || []).length, 16, "Markup should include 16 subtle particles.");

assert.match(css, /\.ambient-particles/, "CSS should style ambient particles.");
assert.match(css, /@keyframes driftParticle/, "CSS should animate modern particles.");
assert.match(css, /@keyframes tapRipple/, "CSS should animate the tap ripple.");
assert.match(css, /@keyframes preBloomAura/, "CSS should animate the pre-bloom aura.");
assert.match(css, /\.legacy-browser\s+\.ambient-particles[\s\S]*display:\s*none/, "Legacy should disable particles.");

assert.match(modern, /function triggerTouchFeedback/, "Modern script should trigger touch feedback.");
assert.match(modern, /navigator\.vibrate/, "Modern script should use the Vibration API when available.");
assert.match(modern, /navigator\.vibrate\(\[28,\s*32,\s*18,\s*46,\s*10\]\)/, "Modern haptics should use a bloom-like vibration pattern.");
assert.match(legacy, /function triggerTouchFeedback/, "Legacy script should trigger touch feedback.");
assert.match(legacy, /navigator\.vibrate/, "Legacy script should use the Vibration API when available.");
assert.match(legacy, /navigator\.vibrate\(\[28,\s*32,\s*18,\s*46,\s*10\]\)/, "Legacy haptics should use a bloom-like vibration pattern.");

const modernMessages = extractMessages(modern);
const legacyMessages = extractMessages(legacy);

assert.deepEqual(legacyMessages, modernMessages, "Legacy messages should mirror modern messages.");
assert.equal(modernMessages.length, 14, "Messages should be back to the original 14 lines.");
assert.doesNotMatch(modern, /favourite perfume trail|ordinary moments feel softer|outfit feels cute|elegance look effortless/, "Removed romantic additions should stay removed.");
