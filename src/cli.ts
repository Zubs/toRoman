#!/usr/bin/env node
import { toRoman, fromRoman, isRoman } from "./index";

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
function convert(input: string): string | number | undefined {
    const upper = input.toUpperCase();

    try {
        if (isRoman(upper)) {
            return fromRoman(upper);
        }
    } catch {
        // Not a canonical Roman numeral; fall through to numeric parsing.
    }

    const value = Number(input);

    if (Number.isNaN(value)) {
        return undefined;
    }

    try {
        return toRoman(value) as string;
    } catch {
        return undefined;
    }
}

const result = convert(arg);

if (result === undefined) {
    console.error("Invalid input");
    process.exit(1);
}

console.log(result);
