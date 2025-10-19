"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.min =
  exports.max =
  exports.divide =
  exports.multiply =
  exports.range =
  exports.diff =
  exports.sum =
  exports.fromRoman =
  exports.toRoman =
  exports.isRoman =
  exports.getCount =
    void 0;
/**
 * Returns the number of times an element occurs in an array
 * @param { string[] } array Array to be checked
 * @param { string | number } value string or number to be counted
 * @return { number } Count of value in an array
 */
function getCount(array, value) {
  let count = 0;
  array.forEach((item) => {
    if (item === value) {
      count++;
    }
  });
  return count;
}
exports.getCount = getCount;
/**
 * Confirm that string is a valid roman numeral
 * @param { string } value String to be tested
 * @returns { boolean } true or false
 * @throws { Error } When the input is not a valid roman numeral
 */
function isRoman(value) {
  if (!value) {
    throw new Error("Roman numeral cannot be empty");
  }
  // Input must be a string and not be a number
  if (typeof value !== "string" || Number(value)) {
    throw new Error("Roman numeral must be of type string");
  }
  value = value.toUpperCase();
  const letters = value.split("");
  const romans = [
    ["M", 4],
    ["D", 1],
    ["C", 4],
    ["L", 1],
    ["X", 4],
    ["V", 1],
    ["I", 3],
  ];
  const romanLetters = ["M", "D", "C", "L", "X", "V", "I"];
  // Count rules
  for (let i = 0; i < romans.length; i++) {
    const [char, maxCount] = romans[i];
    const count = getCount(letters, char);
    if (count && count > maxCount) {
      throw new Error(
        `${char} cannot appear more than ${maxCount} times in a value`
      );
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
exports.isRoman = isRoman;
/**
 * Convert an integer to Roman numerals
 * @param { number } value Integer to be converted to Roman numerals
 * @returns { string } Roman numeral representation of the input value
 * @throws { Error } When the input is not a valid integer or is out of range
 */
function toRoman(value) {
  if (!Number.isInteger(value)) {
    throw new Error("Value must be of type number");
  }
  if (value <= 0 || value >= 4000) {
    throw new Error("Value cannot be up to 4000 or less than 0");
  }
  let result = "";
  const romanMap = [
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
exports.toRoman = toRoman;
/**
 * Convert Roman numeral to integer
 * @param { string } value Roman numeral to be converted to integer
 * @returns { number } Integer representation of the input value
 * @throws { Error } When the input is not a valid Roman numeral
 */
function fromRoman(value) {
  let arabNum = 0;
  if (isRoman(value)) {
    const letters = value.split("");
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
exports.fromRoman = fromRoman;
/**
 * Sum roman numerals
 * @param expected { string } Expected response type
 * @param args { string[] } Roman numerals to be added
 * @returns { string | number } Final roman numeral
 * @throws { Error } When the result exceeds maximum value of 3999 or invalid numeral is provided
 */
function sum(expected, ...args) {
  let sum = 0;
  args.forEach((numeral) => {
    if (isRoman(numeral) === true) {
      sum += fromRoman(numeral);
    }
  });
  return expected === "number" ? sum : toRoman(sum);
}
exports.sum = sum;
/**
 * Get difference between two roman numerals
 * @param expected { string } Expected response type
 * @param numerals { string[] } Roman numerals to subtract
 * @returns { string | number }
 * @throws { Error } When more than two numerals are provided
 */
function diff(expected, numerals) {
  let sum = 0;
  if (numerals.length > 2) {
    throw new Error("Cannot subtract more than 2 numerals");
  }
  if (isRoman(numerals[0]) && isRoman(numerals[1])) {
    sum = Math.abs(fromRoman(numerals[0]) - fromRoman(numerals[1]));
  }
  return expected === "number" ? sum : toRoman(sum);
}
exports.diff = diff;
/**
 * Get range of roman numerals
 * @param end { string | number } Value to stop at
 * @param start { string | number } Value to start from
 * @param intervals { string | number } Difference between values
 * @returns { string[] } Array of roman numerals in the specified range
 * @throws { Error } When any of the inputs are invalid or out of range
 */
function range(end, start = "I", intervals = "I") {
  let endNum = 1;
  let startNum = 1;
  let diffNum = 1;
  let ranged = [];
  // Validate end value
  if (typeof end === "string") {
    if (isRoman(end)) {
      endNum = fromRoman(end);
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
      startNum = fromRoman(start);
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
      diffNum = fromRoman(intervals);
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
    ranged.push(toRoman(i));
  }
  return ranged;
}
exports.range = range;
/**
 * Multiply roman numerals
 * @param expected { string } Expected response type
 * @param args { string[] } Roman numerals to be added
 * @returns { string | number } Final roman numeral
 * @throws { Error } When the result exceeds maximum value of 3999 or invalid numeral is provided
 */
function multiply(expected, ...args) {
  let product = 1;
  for (let i = 0; i < args.length; i++) {
    if (isRoman(args[i]) !== true) {
      throw new Error(`Invalid Roman numeral: ${args[i]}`);
    }
    product *= fromRoman(args[i]);
    if (product > 3999) {
      throw new Error("Result exceeds maximum value of 3999");
    }
  }
  return expected === "number" ? product : toRoman(product);
}
exports.multiply = multiply;
/**
 * Divide two roman numerals
 * @param expected { string } Expected response type
 * @param numerals { string[] } Roman numerals to divide
 * @returns { string | number }
 * @throws { Error } When more than two numerals are provided
 */
function divide(expected, numerals) {
  let quotient = 0;
  if (numerals.length > 2) {
    throw new Error("Cannot divide more than 2 numerals");
  }
  if (isRoman(numerals[0]) && isRoman(numerals[1])) {
    quotient = Math.floor(fromRoman(numerals[0]) / fromRoman(numerals[1]));
  }
  return expected === "number" ? quotient : toRoman(quotient);
}
exports.divide = divide;
function max(...args) {
  return "";
}
exports.max = max;
function min(...args) {
  return "";
}
exports.min = min;
