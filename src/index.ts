type general = string | number;

/**
 * Returns the number of times an element occurs in an array
 * @param { string[] } array Array to be checked
 * @param { string | number } value string or number to be counted
 * @return { number } Count of value in an array
 */
export function getCount(
    array: string[],
    value: general
): number {
    let count: number = 0;

    array.forEach((item) => {
        if (item === value) {
            count++;
        }
    });

    return count;
}

export function validateGeneral(input: general): number {
    return 5;
}

/**
 * Confirm that string is a valid roman numeral
 * @param { string } value String to be tested
 * @returns { boolean } true or false
 * @throws { Error } When the input is not a valid roman numeral
 */
export function isRoman(value: string): true {
    if (!value) {
        throw new Error("Roman numeral cannot be empty");
    }

    // Input must be a string and not be a number
    if (typeof value !== "string" || Number(value)) {
        throw new Error("Roman numeral must be of type string");
    }

    value = value.toUpperCase();

    const letters: string[] = value.split("");
    const romans = [
        ["M", 4],
        ["D", 1],
        ["C", 4],
        ["L", 1],
        ["X", 4],
        ["V", 1],
        ["I", 3],
    ];
    const romanLetters: string[] = ["M", "D", "C", "L", "X", "V", "I"];

    // Count rules
    for (let i = 0; i < romans.length; i++) {
        const [char, maxCount] = romans[i];
        const count = getCount(letters, char);
        if (count && count > maxCount) {
            throw new Error(`${char} cannot appear more than ${maxCount} times in a value`);
        }
    }

    // Testing single digits
    if (letters.length < 2) {
        let letter = letters[0];

        if (!romanLetters.includes(letter)) {
            throw new Error(`Invalid Roman numeral: ${letter}`);
        } else {
            return true;
        }
    }

    // Correct letters
    letters.forEach((letter, index) => {
        if (!romanLetters.includes(letter)) {
            throw new Error(`Invalid Roman numeral: ${letter}`);
        }

        let next = letters[index + 1];

        // Test for D
        if (letter === romanLetters[1]) {
            let badNexts = romanLetters.slice(0, 2);

            if (badNexts.includes(next)) {
                throw new Error(
                    `Unexpected token ${next}, ${next} cannot come after ${letter}`
                );
            }
        }

        // Test for L
        if (letter === romanLetters[3]) {
            let goodNexts = romanLetters.slice(4);

            if (next === undefined) {
                return;
            }

            if (!goodNexts.includes(next)) {
                throw new Error(
                    `Unexpected token ${next}, expected either ${goodNexts[0]}, ${goodNexts[1]} or ${goodNexts[2]}`
                );
            }
        }

        // Test for X
        if (letter === romanLetters[4]) {
            let badNexts = romanLetters.slice(0, 2);

            if (badNexts.includes(next)) {
                throw new Error(
                    `Unexpected token ${next}, ${next} cannot come after ${letter}`
                );
            }
        }

        // Test for V
        if (letter === romanLetters[5]) {
            let goodNexts = [romanLetters[6]];

            if (next === undefined) {
                return;
            }

            if (!goodNexts.includes(next)) {
                throw new Error(`Unexpected token ${next}, expected ${goodNexts[0]}`);
            }
        }

        // Test for I
        if (letter === romanLetters[6]) {
            let goodNexts = romanLetters.slice(4);

            if (next === undefined) {
                return;
            }

            if (!goodNexts.includes(next)) {
                throw new Error(
                    `Unexpected token ${next}, expected either ${goodNexts[0]}, ${goodNexts[1]} or ${goodNexts[2]}`
                );
            }
        }
    });

    return true;
}

/**
 * Convert an integer to Roman numerals
 * @param { number } value Integer to be converted to Roman numerals
 * @returns { string } Roman numeral representation of the input value
 * @throws { Error } When the input is not a valid integer or is out of range
 */
export function toRoman(value: number): string {
    if (!Number.isInteger(value)) {
        throw new Error("Value must be of type number");
    }

    if (value <= 0 || value >= 4000) {
        throw new Error("Value cannot be up to 4000 or less than 0");
    }

    let result = "";
    const romanMap: [number, string][] = [
        [1000, "M"],
        [900, "CM"],
        [500, "D"],
        [400, "CD"],
        [100, "C"],
        [90, "XC"],
        [50, "L"],
        [40, "XL"],
        [10, "X"],
        [9, "IX"],
        [5, "V"],
        [4, "IV"],
        [1, "I"],
    ];

    for (const [num, numeral] of romanMap) {
        while (value >= num) {
            result += numeral;
            value -= num;
        }
    }

    return result;
}

/**
 * Convert Roman numeral to integer
 * @param { string } value Roman numeral to be converted to integer
 * @returns { number } Integer representation of the input value
 * @throws { Error } When the input is not a valid Roman numeral
 */
export function fromRoman(value: string): number {
    let arabNum: number = 0;

    if (isRoman(value)) {
        const letters: string[] = value.split("");

        letters.forEach((letter, index) => {
            letter = letter.toUpperCase();

            if (letter === "M") {
                arabNum += 1000;
            } else if (letter === "D") {
                arabNum += 500;
            } else if (letter === "C") {
                if (letters[index + 1] === "M") {
                    arabNum += 900;
                    letters.splice(index + 1, 1);
                } else if (letters[index + 1] === "D") {
                    arabNum += 400;
                    letters.splice(index + 1, 1);
                } else {
                    arabNum += 100;
                }
            } else if (letter === "L") {
                arabNum += 50;
            } else if (letter === "X") {
                if (letters[index + 1] === "C") {
                    arabNum += 90;
                    letters.splice(index + 1, 1);
                } else if (letters[index + 1] === "L") {
                    arabNum += 40;
                    letters.splice(index + 1, 1);
                } else {
                    arabNum += 10;
                }
            } else if (letter === "V") {
                arabNum += 5;
            } else if (letter === "I") {
                if (letters[index + 1] === "X") {
                    arabNum += 9;
                    letters.splice(index + 1, 1);
                } else if (letters[index + 1] === "V") {
                    arabNum += 4;
                    letters.splice(index + 1, 1);
                } else {
                    arabNum += 1;
                }
            }
        });
    }

    return arabNum;
}

/**
 * Sum roman numerals
 * @param expected { string } Expected response type
 * @param args { string[] } Roman numerals to be added
 * @returns { string | number } Final roman numeral
 * @throws { Error } When the result exceeds maximum value of 3999 or invalid numeral is provided
 */
export function sum(
    expected: "number" | "roman",
    ...args: string[]
): general {
    let sum = 0;

    args.forEach((numeral) => {
        if (isRoman(numeral) === true) {
            sum += fromRoman(numeral) as number;
        }
    });

    return expected === "number" ? sum : toRoman(sum);
}

/**
 * Get difference between two roman numerals
 * @param expected { string } Expected response type
 * @param numerals { string[] } Roman numerals to subtract
 * @returns { string | number }
 * @throws { Error } When more than two numerals are provided
 */
export function diff(
    expected: "number" | "roman",
    numerals: [string, string]
): general {
    let sum = 0;

    if (numerals.length > 2) {
        throw new Error("Cannot subtract more than 2 numerals");
    }

    if (isRoman(numerals[0]) && isRoman(numerals[1])) {
        sum = Math.abs(
            (fromRoman(numerals[0]) as number) - (fromRoman(numerals[1]) as number)
        );
    }

    return expected === "number" ? sum : toRoman(sum);
}

/**
 * Get range of roman numerals
 * @param end { string | number } Value to stop at
 * @param start { string | number } Value to start from
 * @param intervals { string | number } Difference between values
 * @returns { string[] } Array of roman numerals in the specified range
 * @throws { Error } When any of the inputs are invalid or out of range
 */
export function range(
    end: general,
    start: general = "I",
    intervals: general = "I"
): string[] {
    let endNum: number = 1;
    let startNum: number = 1;
    let diffNum: number = 1;
    let ranged: string[] = [];

    // Validate end value
    if (typeof end === "string") {
        if (isRoman(end)) {
            endNum = fromRoman(end) as number;
        }
    } else if (typeof end === "number") {
        if (end >= 4000 || end <= 0) {
            throw new Error("Range has to be between 1 and 3999");
        }

        endNum = end;
    } else {
        throw new Error("End value must be a string or number");
    }

    // Validate start value
    if (start && typeof start === "string") {
        if (isRoman(start)) {
            startNum = fromRoman(start) as number;
        }
    } else if (start && typeof start === "number") {
        if (start >= 4000 || start <= 0) {
            throw new Error("Range has to be between 1 and 3999");
        }

        startNum = start;
    } else {
        throw new Error("Start value must be a string or number");
    }

    // Validate interval value
    if (intervals && typeof intervals === "string") {
        if (isRoman(intervals)) {
            diffNum = fromRoman(intervals) as number;
        }
    } else if (intervals && typeof intervals === "number") {
        if (intervals >= 4000 || intervals <= 0) {
            throw new Error("Range has to be between 1 and 3999");
        }

        diffNum = intervals;
    } else {
        throw new Error("Start value must be a string or number");
    }

    for (let i = startNum; i < endNum + 1; i += diffNum) {
        ranged.push(toRoman(i) as string);
    }

    return ranged;
}

/**
 * Multiply roman numerals
 * @param expected { string } Expected response type
 * @param args { string[] } Roman numerals to be added
 * @returns { string | number } Final roman numeral
 * @throws { Error } When the result exceeds maximum value of 3999 or invalid numeral is provided
 */
export function multiply(
    expected: "number" | "roman",
    ...args: string[]
): general {
    let product = 1;

    for (let i = 0; i < args.length; i++) {
        if (isRoman(args[i]) !== true) {
            throw new Error(`Invalid Roman numeral: ${args[i]}`);
        }

        product *= fromRoman(args[i]) as number;

        if (product > 3999) {
            throw new Error("Result exceeds maximum value of 3999");
        }
    }

    return expected === "number" ? product : toRoman(product);
}

/**
 * Divide two roman numerals
 * @param expected { string } Expected response type
 * @param numerals { string[] } Roman numerals to divide
 * @returns { string | number }
 * @throws { Error } When more than two numerals are provided
 */
export function divide(
    expected: "number" | "roman",
    numerals: [string, string]
): general {
    let quotient = 0;

    if (numerals.length > 2) {
        throw new Error("Cannot divide more than 2 numerals");
    }

    if (isRoman(numerals[0]) && isRoman(numerals[1])) {
        quotient = Math.floor(
            (fromRoman(numerals[0]) as number) / (fromRoman(numerals[1]) as number)
        );
    }

    return expected === "number" ? quotient : toRoman(quotient);
}

export function max(...args: string[]): string {
    let maxNum: number = 0;

    for (let i = 0; i < args.length; i++) {
        let currentNum = args[i];

        if (isRoman(currentNum) !== true) {
            throw new Error(`Invalid Roman numeral: ${args[i]}`);
        }

        let currentRomanNum = fromRoman(currentNum) as number;

        if (currentRomanNum > maxNum) {
            maxNum = currentRomanNum;
        }
    }

    return toRoman(maxNum);
}

export function min(...args: string[]): string {
    let minNum: number = 4000;

    for (let i = 0; i < args.length; i++) {
        let currentNum = args[i];

        if (isRoman(currentNum) !== true) {
            throw new Error(`Invalid Roman numeral: ${args[i]}`);
        }

        let currentRomanNum = fromRoman(currentNum) as number;

        if (currentRomanNum < minNum) {
            minNum = currentRomanNum;
        }
    }

    return toRoman(minNum);
}

/**
 * Generate a random Roman numeral within a specified range
 * @param max Maximum value
 * @param min Minimum value
 * @returns { string } Random Roman numeral within the specified range
 * @throws { Error } When the inputs are invalid or out of range
 */
export function random(
    max: general = 3999,
    min: general = 1,
): string {
    let maxNum: number = 3999;
    let minNum: number = 1;

    if (typeof max === "number") {
        maxNum = max;

        if (maxNum > 3999 || maxNum <= 0) {
            throw new Error("Max value must be between 1 and 3999");
        }
    } else if (typeof max === "string") {
        if (isRoman(max)) {
            maxNum = fromRoman(max) as number;

            if (maxNum > 3999 || maxNum <= 0) {
                throw new Error("Max value must be between 1 and 3999");
            }
        }
    } else {
        throw new Error("Max value must be a number or string");
    }

    if (typeof min === "number") {
        minNum = min;

        if (minNum >= maxNum || minNum <= 0) {
            throw new Error("Min value must be less than max value and greater than 0");
        }
    } else if (typeof min === "string") {
        if (isRoman(min)) {
            minNum = fromRoman(min) as number;

            if (minNum >= maxNum || minNum <= 0) {
                throw new Error("Min value must be less than max value and greater than 0");
            }
        }
    } else {
        throw new Error("Min value must be a number or string");
    }

    const randomNum = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;

    return toRoman(randomNum);
}

/**
 * Generate a table of Roman numerals within a specified range
 * @param start Starting point for table
 * @param end Stopping point for table
 * @returns { number: number; roman: string }[] Array of objects containing number and its Roman numeral representation
 * @throws { Error } When the inputs are invalid or out of range
 */
export function table(
    start: general,
    end: general
): { number: number; roman: string }[] {
    const result: { number: number; roman: string }[] = [];
    let startNum: number = 1;
    let endNum: number = 1;

    if (typeof start === "number") {
        startNum = start;

        if (startNum > 3999 || startNum <= 0) {
            throw new Error("Start value must be between 1 and 3999");
        }
    } else if (typeof start === "string") {
        if (isRoman(start)) {
            startNum = fromRoman(start) as number;

            if (startNum > 3999 || startNum <= 0) {
                throw new Error("Start value must be between 1 and 3999");
            }
        }
    } else {
        throw new Error("Start value must be a number or string");
    }

    if (typeof end === "number") {
        endNum = end;

        if (endNum > 3999 || endNum <= 0) {
            throw new Error("End value must be between 1 and 3999");
        }
    } else if (typeof end === "string") {
        if (isRoman(end)) {
            endNum = fromRoman(end) as number;

            if (endNum > 3999 || endNum <= 0) {
                throw new Error("End value must be between 1 and 3999");
            }
        }
    } else {
        throw new Error("End value must be a number or string");
    }

    if (startNum > endNum) {
        throw new Error("Start value must be less than or equal to end value");
    }

    for (let i = startNum; i <= endNum; i++) {
        result.push({ number: i, roman: toRoman(i) as string });
    }

    return result;
}
