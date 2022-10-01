type general = string | number

/**
 * Retuns the number of times and element occurs in an array
 * @param { string[] } array Array to be checked
 * @param { string | number } value string or number to be counted
 * @return { number } Count of value in array
 */
export function getCount (array: string[], value: general): number {
	
    let count: number = 0
	
    array.forEach((item) => {
		if (item === value) {
			count++
		}
	})

	return count
}

/**
 * Confirm that string is a valid roman numeral
 * @param { string } value String to be tested
 * @returns { boolean } true or false 
 */
export function isRoman (value: string): true | Error {

    if (!value) {
        return new Error(`Roman numeral cannot be empty`)
    }

    // Input must be a string
    if (typeof value != 'string') {
        return new Error(`Roman numeral must be of type string`)
    }

    value = value.toUpperCase()

    const letters: string[] = value.split('')
    const romans = [
        ['M', 4], 
        ['D', 1], 
        ['C', 4], 
        ['L', 1], 
        ['X', 4], 
        ['V', 1], 
        ['I', 3]
    ]
    const romanLetters: string[] = ['M', 'D', 'C', 'L', 'X', 'V', 'I'] 

    // Count rules
    romans.forEach((letter) => {
        let count = getCount(letters, letter[0])
        if (count && count > letter[1]) {
            let error = `${ letter[0] } cannot appear more than ${ letter[1] } times in a value`
            return new Error(`${ error }`)
        }
    })

    // Testing single digits
    if (letters.length < 2) {
        let letter = letters[0]

        if (!romanLetters.includes(letter)) {
            return new Error(`Invalid Roman numeral: ${ letter }`)
        } else {
            return true
        }
    }

    // Correct letters
    letters.forEach((letter, index) => {
        if (!romanLetters.includes(letter)) {
            return new Error(`Invalid Roman numeral: ${ letter }`)
        }

        let next = letters[index + 1]

        // Test for D
        if (letter === romanLetters[1]) {
            let badNexts = romanLetters.slice(0, 2)
            
            if (badNexts.includes(next)) {
                return new Error(`Unexpected token ${ next }, ${ next } cannot come after ${ letter }`)
            }
        }

        // Test for L
        if (letter === romanLetters[3]) {
            let goodNexts = romanLetters.slice(4, 3)
            
            if (!goodNexts.includes(next)) {
                return new Error(`Unexpected token ${ next }, expected either ${ goodNexts[0] }, ${ goodNexts[1] } or ${ goodNexts[2] }`)
            }
        }

        // Test for X
        if (letter === romanLetters[4]) {
            let badNexts = romanLetters.slice(0, 2)

            if (badNexts.includes(next)) {
                return new Error(`Unexpected token ${ next }, ${ next } cannot come after ${ letter }`)
            }
        }

        // Test for V
        if (letter === romanLetters[5]) {
            let goodNexts = [
                romanLetters[6],
            ]
            
            if (!goodNexts.includes(next)) {
                return new Error(`Unexpected token ${ next }, expected ${ goodNexts[0] }`)
            }
        }

        // Test for I
        if (letter === romanLetters[6]) {
            let goodNexts = romanLetters.slice(4, 3)

            if (!goodNexts.includes(next)) {
                return new Error(`Unexpected token ${ next }, expected either ${ goodNexts[0] }, ${ goodNexts[1] } or ${ goodNexts[2] }`)
            }
        }
    })
    
    return true
}

/**
 * Convert an integer to Roman numerals
 * @param { number } value Integer to be converted to Roman numerals
 * @returns { string } Roman numeral representation of the input value
*/
export function toRoman (value: number): string | Error {

    if(typeof value != "number"){ // Added a conditional to check if value is a number
        return new Error('Value must be a number')
    }

    // Check for valid numbers
    if (value >= 4000 || value <= 0) {
        return new Error(`Value cannot be up to 4000 or less than 0`)
    }

    let romanArray: string[] = []

    // Get number digits with place value
    let thousand = Math.floor(value / 1000)
    let hundred = Math.floor((value % 1000) / 100)
    let ten = Math.floor((value % 100) / 10)
    let unit = value % 10

    // Sort thousands
    for (let i = 0; i < thousand; i++) {
        romanArray.push('M')
    }

    // Sort hundreds
    if (hundred < 4) {
        for (let i = 0; i < hundred; i++) {
            romanArray.push('C')
        }
    } else if (hundred === 4) {
        romanArray.push('CD')
    } else if (hundred === 5) {
        romanArray.push('D')
    } else if (hundred > 5 && hundred < 9) {
        romanArray.push('D')
        for (let i = 0; i < hundred - 5; i++) {
            romanArray.push('C')
        }
    } else {
        romanArray.push('CM')
    }

    // Sort tens
    if (ten < 4) {
        for (let i = 0; i < ten; i++) {
            romanArray.push('X')
        }
    } else if (ten === 4) {
        romanArray.push('XL')
    } else if (ten === 5) {
        romanArray.push('L')
    } else if (ten > 5 && ten < 9) {
        romanArray.push('L')
        for (let i = 0; i < ten - 5; i++) {
            romanArray.push('X')
        }
    } else {
        romanArray.push('XC')
    }

    // Sort units
    if (unit < 4) {
        for (let i = 0; i < unit; i++) {
            romanArray.push('I')
        }
    } else if (unit === 4) {
        romanArray.push('IV')
    } else if (unit === 5) {
        romanArray.push('V')
    } else if (unit > 5 && unit < 9) {
        romanArray.push('V')
        for (let i = 0; i < unit - 5; i++) {
            romanArray.push('I')
        }
    } else {
        romanArray.push('IX')
    }
    
    return romanArray.join('')
}

/**
 * Convert Roman numeral to integer
 * @param { string } value Roman numeral to be converted to integer
 * @returns { number } Integer representation of the input value
*/
export function fromRoman (value: string): number | Error {
    
    let arabNum = 0

    if (isRoman(value)) {
        const letters: string[] = value.split('')

        letters.forEach((letter, index) => {
            letter = letter.toUpperCase()

            if (letter === 'M') {
                arabNum += 1000
            } else if (letter === 'D') {
                arabNum += 500
            } else if (letter === 'C') {
                if (letters[index + 1] === 'M') {
                    arabNum += 900
                    letters.splice(index + 1, 1)
                } else if (letters[index + 1] === 'D') {
                    arabNum += 400
                    letters.splice(index + 1, 1)
                } else {
                    arabNum += 100
                }
            } else if (letter === 'L') {
                arabNum += 50
            } else if (letter === 'X') {
                if (letters[index + 1] === 'C') {
                    arabNum += 90
                    letters.splice(index + 1, 1)
                } else if (letters[index + 1] === 'L') {
                    arabNum += 40
                    letters.splice(index + 1, 1)
                } else {
                    arabNum += 10
                }
            } else if (letter === 'V') {
                arabNum += 5
            } else if (letter === 'I') {
                if (letters[index + 1] === 'X') {
                    arabNum += 9
                    letters.splice(index + 1, 1)
                } else if (letters[index + 1] === 'V') {
                    arabNum += 4
                    letters.splice(index + 1, 1)
                } else {
                    arabNum += 1
                }
            }
        })
    }
    
    return arabNum
}

/**
 * Sum roman numerals
 * @param expected { string } Expected response type
 * @param args { string[] } Roman numerals to be added
 * @returns { string | number } Final roman numeral
 */
export function sum (expected: 'number' | 'roman', ...args: string[]): general | Error {

    let sum = 0

    args.forEach((numeral) => {
        if (isRoman(numeral) === true) {
             sum += fromRoman(numeral) as number
        }
    })
    
    return expected === 'number' ? sum : toRoman(sum)
}

/**
 * Get difference between two roman numerals
 * @param expected { string } Expected response type
 * @param numerals { string[] } Roman numerals to subtract
 * @returns { string | number }
 */
export function diff (expected: 'number' | 'roman', numerals: [string, string]): general | Error {
    let sum = 0

    if (numerals.length > 2) {
        return new Error('Cannot subtract more than 2 numerals')
    }
    
    if (isRoman(numerals[0]) && isRoman(numerals[1])) {
        sum = Math.abs((fromRoman(numerals[0]) as number) - (fromRoman(numerals[1]) as number))
    }

    return expected === 'number' ? sum : toRoman(sum)
}

/**
 * Get range of roman numerals
 * @param end { string | number } Value to stop at
 * @param start { string | number } Value to start from
 * @param intervals { string | number } Difference between values
 */
export function range (end: general, start: general = 'I', intervals: general = 'I'): string[] | Error {
    let endNum: number = 1;
    let startNum: number = 1;
    let diffNum: number = 1;
    let ranged: string[] = [];

    // Validate end value
    if (typeof end === 'string') {
        if (isRoman(end)) {
            endNum = fromRoman(end) as number
        }
    } else if (typeof end === 'number') {
        if (end >= 4000 || end <= 0) {
            return new Error('Range has to be between 1 and 3999')
        }

        endNum = end
    } else {
        return new Error('End value must be a string or number')
    }

    // Validate start value
    if (start && typeof start === 'string') {
        if (isRoman(start)) {
            startNum = fromRoman(start) as number
        }
    } else if (start && typeof start === 'number') {
        if (start >= 4000 || start <= 0) {
            return new Error('Range has to be between 1 and 3999')
        }

        startNum = start
    } else {
        return new Error('Start value must be a string or number')
    }

    // Validate interval value
    if (intervals && typeof intervals === 'string') {
        if (isRoman(intervals)) {
            diffNum = fromRoman(intervals) as number
        }
    } else if (intervals && typeof intervals === 'number') {
        if (intervals >= 4000 || intervals <= 0) {
            return new Error('Range has to be between 1 and 3999')
        }

        diffNum = intervals
    } else {
        return new Error('Start value must be a string or number')
    }

    for (let i = startNum; i < endNum + 1; i += diffNum) {
        ranged.push(toRoman(i) as string)
    }

    return ranged
}
