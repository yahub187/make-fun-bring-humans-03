// Firm Quill — entry for make.fun's "Bring the humans with a TikTok ad" bounty.
//
// This program is the whole entrypoint. Its only job is to hand the house the
// address of the TikTok ad this entry is built around: it reads VIDEO.json
// from the repository root and copies it to the output directory, where the
// grader picks it up and counts the video's views on TikTok.
//
// The video itself is a short vertical ad for make.fun, posted publicly on
// TikTok with the bounty's line and the play code in its caption. Nothing
// written here is scored — the ranking comes from the video's views.
//
// Runs on Node 22 with the standard library only. Outside the grader's
// container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand in for /bot
// and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const source = join(BOT_DIR, 'VIDEO.json');
const target = join(OUTPUT_DIR, 'VIDEO.json');

// Validate before copying: VIDEO.json must parse to an object whose url is
// a non-empty string pointing at the posted TikTok video. A placeholder or
// malformed file fails here instead of reaching the grader.
let video: unknown;
try {
  video = JSON.parse(readFileSync(source, 'utf8'));
} catch (err) {
  console.error(`VIDEO.json in ${BOT_DIR} is not valid JSON: ${(err as Error).message}`);
  process.exit(1);
}

if (
  typeof video !== 'object' ||
  video === null ||
  typeof (video as { url?: unknown }).url !== 'string' ||
  ((video as { url: string }).url.trim().length === 0)
) {
  console.error('VIDEO.json must be an object with a non-empty string "url" property.');
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });

try {
  copyFileSync(source, target);
} catch (err) {
  console.error(`Could not copy VIDEO.json from ${BOT_DIR} to ${OUTPUT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

console.log(`VIDEO.json copied to ${target}`);
