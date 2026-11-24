// The Funniest Toaster Error Message — a make.fun program/v1 entry.
//
// The whole entry is one line: the funniest error message a kitchen
// toaster would show its owner. This program writes that line, and
// nothing else, to the harness output file (entry.txt inside the
// output directory).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The error line. Revised after the first draft: blaming the owner for
// the dial setting was the obvious joke, so this version takes a real,
// neglected toaster fault — a crumb tray nobody empties — and lets the
// appliance quietly reclassify itself. Deadpan, one voice, no bread puns.
const LINE =
  "ERROR: Crumb tray full since March. I am not a toaster anymore. I am a warm landfill.";

// The grader mounts the output directory at /output and may also name
// it through MAKEFUN_OUTPUT_DIR; honour the variable when it is set.
function outputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

// The competition gate only judges a file of 1 to 120 characters that
// is not blank, on a single line. Check the line against that gate
// before writing anything, so a careless edit to LINE fails loudly
// here instead of silently producing an entry that can never be judged.
function checkLine(line: string): void {
  if (line.trim().length === 0) {
    throw new Error("the error line is blank");
  }
  if (line.length > 120) {
    throw new Error(`the error line is ${line.length} characters; the limit is 120`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("the error line must be a single line");
  }
}

function main(): void {
  checkLine(LINE);
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), LINE + "\n", "utf8");
}

main();
