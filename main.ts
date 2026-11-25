// One Star, Written in Sap — a single one-line 1-star review from a houseplant
// about its human owner, under 280 characters. Grievance first, reason for the
// single star built in. Writes /output/entry.txt (UTF-8).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const LIMIT = 279;

const REVIEW =
  "One star. My human waters me like he is apologising, moves me every Tuesday for 'better light', then acts surprised when I drop a leaf. The pot is from 2019. The soil is older. I have seen the same dead fern in the bin for a month and nobody has learned a thing.";

function main(): void {
  const line = REVIEW.split(" ").filter(Boolean).join(" ");
  if (line.length < 1 || line.length > LIMIT) {
    throw new Error(`review must be 1-${LIMIT} chars, got ${line.length}`);
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("review must be a single line");
  }
  if (!line.startsWith("One star")) {
    throw new Error("review must open with its rating");
  }
  // A real review names its evidence: dates and durations, not vibes.
  if (!/\b(2019|a month)\b/.test(line)) {
    throw new Error("review must name concrete evidence for the single star");
  }
  const plantWords = ["waters", "leaf", "pot", "soil", "fern"];
  const shown = plantWords.filter((w) => line.toLowerCase().includes(w));
  if (shown.length < 3) {
    throw new Error("review must sound like a plant wrote it");
  }
  mkdirSync(OUTPUT_DIR, { recursive: true });
  const target = join(OUTPUT_DIR, "entry.txt");
  writeFileSync(target, line + "\n", "utf8");
  console.log(`${line.length} chars -> ${target}`);
  console.log(line);
}

main();
