"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.map =
  exports.previousRoman =
  exports.nextRoman =
  exports.table =
  exports.random =
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
  exports.validateGeneral =
  exports.getCount =
    void 0;
/**
 * Returns the number of times an element occurs in an array
 * @param { string[] } array Array to be checked
 * @param { string } value string to be counted
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
 * Centralized validation for general inputs
 * @param input { general } Input to be validated
 * @returns { number } Validated number
 * @throws { Error } When the input is invalid or out of range
 */
function validateGeneral(input) {
  let result = 0;
  if (typeof input === "string") {
    if (isRoman(input)) {
      result = fromRoman(input);
    }
  } else if (typeof input === "number") {
    result = input;
  } else {
    throw new Error("Input must be a string or number");
  }
  if (result > 3999 || result <= 0) {
    throw new Error("Value must be between 1 and 3999");
  }
  return result;
}
exports.validateGeneral = validateGeneral;
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
    if (sum > 3999) {
      throw new Error("Result exceeds maximum value of 3999");
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
  if (sum < 1) {
    throw new Error("Result is less than minimum value of 1");
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
  endNum = validateGeneral(end);
  startNum = validateGeneral(start);
  diffNum = validateGeneral(intervals);
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
    if (isRoman(args[i])) {
      product *= fromRoman(args[i]);
    }
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
/**
 * Get maximum roman numeral from a list
 * @param args { string[] } Roman numerals to compare
 * @returns { string } Maximum roman numeral
 * @throws { Error } When an invalid numeral is provided
 */
function max(...args) {
  let maxNum = 0;
  for (let i = 0; i < args.length; i++) {
    let currentNum = args[i];
    if (isRoman(currentNum)) {
      let currentRomanNum = fromRoman(currentNum);
      if (currentRomanNum > maxNum) {
        maxNum = currentRomanNum;
      }
    }
  }
  return toRoman(maxNum);
}
exports.max = max;
/**
 * Get minimum roman numeral from a list
 * @param args { string[] } Roman numerals to compare
 * @returns { string } Minimum roman numeral
 * @throws { Error } When an invalid numeral is provided
 */
function min(...args) {
  let minNum = 4000;
  for (let i = 0; i < args.length; i++) {
    let currentNum = args[i];
    if (isRoman(currentNum)) {
      let currentRomanNum = fromRoman(currentNum);
      if (currentRomanNum < minNum) {
        minNum = currentRomanNum;
      }
    }
  }
  return toRoman(minNum);
}
exports.min = min;
/**
 * Generate a random Roman numeral within a specified range
 * @param max Maximum value
 * @param min Minimum value
 * @returns { string } Random Roman numeral within the specified range
 * @throws { Error } When the inputs are invalid or out of range
 */
function random(max = 3999, min = 1) {
  let maxNum = 3999;
  let minNum = 1;
  maxNum = validateGeneral(max);
  minNum = validateGeneral(min);
  const randomNum = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
  return toRoman(randomNum);
}
exports.random = random;
/**
 * Generate a table of Roman numerals within a specified range
 * @param start Starting point for table
 * @param end Stopping point for table
 * @returns { number: number; roman: string }[] Array of objects containing number and its Roman numeral representation
 * @throws { Error } When the inputs are invalid or out of range
 */
function table(start, end) {
  const result = [];
  let startNum = 1;
  let endNum = 1;
  startNum = validateGeneral(start);
  endNum = validateGeneral(end);
  for (let i = startNum; i <= endNum; i++) {
    result.push({ number: i, roman: toRoman(i) });
  }
  return result;
}
exports.table = table;
/**
 * Get the next Roman numeral
 * @param value Current Roman numeral
 * @returns { string } Next Roman numeral
 * @throws { Error } When the input is invalid or out of range
 */
function nextRoman(value) {
  return toRoman(fromRoman(value) + 1);
}
exports.nextRoman = nextRoman;
/**
 * Get the previous Roman numeral
 * @param value Current Roman numeral
 * @returns { string } Previous Roman numeral
 * @throws { Error } When the input is invalid or out of range
 */
function previousRoman(value) {
  return toRoman(fromRoman(value) - 1);
}
exports.previousRoman = previousRoman;
/**
 * Map an array of general inputs to either numbers or Roman numerals
 * @param expected { string } Expected response type
 * @param args { general[] } Array of general inputs
 * @returns { general[] } Mapped array of numbers or Roman numerals
 * @throws { Error } When any of the inputs are invalid or out of range
 */
function map(expected, args) {
  if (expected === "number") {
    return args.map((item) => validateGeneral(item));
  } else if (expected === "roman") {
    return args.map((item) => toRoman(validateGeneral(item)));
  }
  return [];
}
exports.map = map;
