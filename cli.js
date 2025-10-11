#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const arg = process.argv[2];
if (!arg) {
  console.log("Usage: toroman <number|roman>");
  process.exit(1);
}
const input = arg.toUpperCase();
// try {
//     console.log(input);
//     console.log(Number(input));
//     const isValidRoman = isRoman(input);
//     console.log(fromRoman(input));
//     console.log(isValidRoman);
//     if (isValidRoman === true) {
//         console.log(`${input} is a valid Roman numeral.`);
//     }
// } catch (error) {
//     console.error("Error: ", error);
//     process.exit(1);
// }
if ((0, index_1.isRoman)(input) === true) {
  console.log((0, index_1.fromRoman)(input));
} else {
  const num = Number(arg);
  if (isNaN(num)) {
    console.error("Invalid input");
    process.exit(1);
  }
  console.log((0, index_1.toRoman)(num));
}
