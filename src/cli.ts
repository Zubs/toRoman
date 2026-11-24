#!/usr/bin/env node
import { toRoman, fromRoman } from "./index";

const arg = process.argv[2];

if (!arg) {
  console.log("Usage: toroman <number|roman>");
  process.exit(1);
}

try {
  const num = Number(arg);

  if (Number.isNaN(num)) {
    console.log(String(fromRoman(arg.toUpperCase())));
  } else {
    console.log(toRoman(num));
  }
} catch (error) {
  console.error((error as Error).message);
  process.exit(1);
}
