#!/usr/bin/env node
import { toRoman, fromRoman, isRoman } from "./index";

const arg = process.argv[2];

if (!arg) {
    console.log("Usage: toroman <number|roman>");
    process.exit(1);
}

const input = arg.toUpperCase();
if (isRoman(input) === true) {
    console.log(fromRoman(input));
} else {
    const num = Number(arg);
    if (isNaN(num)) {
        console.error("Invalid input");
        process.exit(1);
    }
    console.log(toRoman(num));
}
