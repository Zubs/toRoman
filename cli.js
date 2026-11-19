#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const arg = process.argv[2];
if (!arg) {
  console.log("Usage: toroman <number|roman>");
  process.exit(1);
}
/**
 * Convert a CLI argument to a number or Roman numeral.
 * `isRoman` and `toRoman` throw on invalid input, so validation errors are
 * treated as "not this format" and the argument is tried as the other format.
 */
function convert(input) {
  const upper = input.toUpperCase();
  try {
    if ((0, index_1.isRoman)(upper)) {
      return (0, index_1.fromRoman)(upper);
    }
  } catch (_a) {
    // Not a canonical Roman numeral; fall through to numeric parsing.
  }
  const value = Number(input);
  if (Number.isNaN(value)) {
    return undefined;
  }
  try {
    return (0, index_1.toRoman)(value);
  } catch (_b) {
    return undefined;
  }
}
const result = convert(arg);
if (result === undefined) {
  console.error("Invalid input");
  process.exit(1);
}
console.log(result);
