#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const arg = process.argv[2];
if (!arg) {
  console.log("Usage: toroman <number|roman>");
  process.exit(1);
}
try {
  const num = Number(arg);
  if (Number.isNaN(num)) {
    console.log(String((0, index_1.fromRoman)(arg.toUpperCase())));
  } else {
    console.log((0, index_1.toRoman)(num));
  }
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
