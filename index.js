"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromRoman = exports.toRoman = exports.isRoman = void 0;
function getCount(array, value) {
    let count = 0;
    array.forEach((item) => {
        if (item === value) {
            count++;
        }
    });
    return count;
}
/**
 * isRoman - Confirm that string is a valid roman numeral
 * @param { string } value String to be tested
 * @returns { boolean } true or false
 */
function isRoman(value) {
    if (!value) {
        throw new Error(`Roman numeral cannot be empty`);
    }
    // Input must be a string
    if (typeof value != 'string') {
        throw new Error(`Roman numeral must be of type string`);
    }
    const letters = value.split('');
    const romans = [
        ['M', 4],
        ['D', 1],
        ['C', 4],
        ['L', 1],
        ['X', 4],
        ['V', 1],
        ['I', 3]
    ];
    const romanLetters = ['M', 'D', 'C', 'L', 'X', 'V', 'I'];
    // Count rules
    romans.forEach((letter) => {
        let count = getCount(letters, letter[0]);
        if (count && count > letter[1]) {
            let error = `${letter[0]} cannot appear more than ${letter[1]} times in a value`;
            throw new Error(`${error}`);
        }
    });
    // Correct letters
    letters.forEach((letter) => {
        if (!romanLetters.includes(letter)) {
            throw new Error(`Invalid Roman numeral: ${letter}`);
        }
    });
    if (letters[0] === 'I') {
        if (!(letters[1] === 'X' || letters[1] === 'V' || letters[1] === 'I')) {
            throw new Error(`Unexpected token ${letters[1]}, expected either X, V or I`);
        }
    }
    return true;
}
exports.isRoman = isRoman;
/**
 * toRoman - Convert an integer to Roman numerals
 * @param { number }value Integer to be converted to Roman numerals
 * @returns { string } Roman numeral representation of the input value
*/
function toRoman(value) {
    let romanArray = [];
    // Check for valid numbers
    if (value >= 4000 || value <= 0) {
        throw new Error(`Value cannot be up to 4000`);
    }
    // Get number digits with place value
    let thousand = Math.floor(value / 1000);
    let hundred = Math.floor((value % 1000) / 100);
    let ten = Math.floor((value % 100) / 10);
    let unit = value % 10;
    // Sort thousands
    for (let i = 0; i < thousand; i++) {
        romanArray.push('M');
    }
    // Sort hundreds
    if (hundred < 4) {
        for (let i = 0; i < hundred; i++) {
            romanArray.push('C');
        }
    }
    else if (hundred === 4) {
        romanArray.push('CD');
    }
    else if (hundred === 5) {
        romanArray.push('D');
    }
    else if (hundred > 5 && hundred < 9) {
        romanArray.push('D');
        for (let i = 0; i < hundred - 5; i++) {
            romanArray.push('C');
        }
    }
    else {
        romanArray.push('CM');
    }
    // Sort tens
    if (ten < 4) {
        for (let i = 0; i < ten; i++) {
            romanArray.push('X');
        }
    }
    else if (ten === 4) {
        romanArray.push('XL');
    }
    else if (ten === 5) {
        romanArray.push('L');
    }
    else if (ten > 5 && ten < 9) {
        romanArray.push('L');
        for (let i = 0; i < ten - 5; i++) {
            romanArray.push('X');
        }
    }
    else {
        romanArray.push('XC');
    }
    // Sort units
    if (unit < 4) {
        for (let i = 0; i < unit; i++) {
            romanArray.push('I');
        }
    }
    else if (unit === 4) {
        romanArray.push('IV');
    }
    else if (unit === 5) {
        romanArray.push('V');
    }
    else if (unit > 5 && unit < 9) {
        romanArray.push('V');
        for (let i = 0; i < unit - 5; i++) {
            romanArray.push('I');
        }
    }
    else {
        romanArray.push('IX');
    }
    return romanArray.join('');
}
exports.toRoman = toRoman;
/**
 * fromRoman - Convert Roman numeral to integer
 * @param { string } value Roman numeral to be converted to integer
 * @returns { number } Integer representation of the input value
*/
function fromRoman(value) {
    let arabNum = 0;
    if (isRoman(value)) {
        const letters = value.split('');
        letters.forEach((letter, index) => {
            let next = letters[index + 1];
            if (letter === 'M') {
                arabNum += 1000;
            }
            else if (letter === 'D') {
                if (next === 'M') {
                    throw new Error(`Unexpected token ${next}, expected either C, L, X, V or I`);
                }
                else {
                    arabNum += 500;
                }
            }
            else if (letter === 'C') {
                if (letters[index + 1] === 'M') {
                    arabNum += 900;
                    letters.splice(index + 1, 1);
                }
                else if (letters[index + 1] === 'D') {
                    arabNum += 400;
                    letters.splice(index + 1, 1);
                }
                else {
                    arabNum += 100;
                }
            }
            else if (letter === 'L') {
                arabNum += 50;
            }
            else if (letter === 'X') {
                if (letters[index + 1] === 'C') {
                    arabNum += 90;
                    letters.splice(index + 1, 1);
                }
                else if (letters[index + 1] === 'L') {
                    arabNum += 40;
                    letters.splice(index + 1, 1);
                }
                else {
                    arabNum += 10;
                }
            }
            else if (letter === 'V') {
                arabNum += 5;
            }
            else if (letter === 'I') {
                if (letters[index + 1] === 'X') {
                    arabNum += 9;
                    letters.splice(index + 1, 1);
                }
                else if (letters[index + 1] === 'V') {
                    arabNum += 4;
                    letters.splice(index + 1, 1);
                }
                else {
                    arabNum += 1;
                }
            }
        });
    }
    return arabNum;
}
exports.fromRoman = fromRoman;
console.log(fromRoman('IC'));
