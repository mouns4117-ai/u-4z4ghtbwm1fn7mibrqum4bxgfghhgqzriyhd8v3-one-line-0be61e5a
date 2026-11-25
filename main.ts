// One Line, One Laugh — make.fun entry
// Writes a single funny line of text to /output/entry.txt.
// Gate: UTF-8 text, 1 to 140 characters, not only whitespace.

import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";

const ENTRY =
  "I asked the lift for the top floor. It said, 'You look like you need the exercise.' I took the stairs. It was right.";

// Fail fast if the line ever drifts outside the gate (1-140 chars, non-blank).
const charCount = [...ENTRY].length;
if (charCount < 1 || charCount > 140) {
  throw new Error(`Entry is ${charCount} chars; gate requires 1-140`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("Entry must not be only whitespace");
}
if (ENTRY.includes("\n")) {
  throw new Error("Entry must be a single line");
}

const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

mkdirSync(OUT_DIR, { recursive: true });

// Empty /output by removing its CONTENTS only; never remove the directory itself.
for (const name of readdirSync(OUT_DIR)) {
  rmSync(`${OUT_DIR}/${name}`, { recursive: true, force: true });
}

writeFileSync(OUT_FILE, ENTRY, "utf8");

// Post-write read-back: the file on disk must be byte-identical to the entry.
const written = readFileSync(OUT_FILE, "utf8");
if (written !== ENTRY) {
  throw new Error("Read-back mismatch: /output/entry.txt differs from ENTRY");
}
console.log(`Wrote ${OUT_FILE} (${[...ENTRY].length} chars)`);
