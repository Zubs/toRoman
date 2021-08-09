function getCount (array: string[], value: string | number): number {
	
    let count: number = 0
	
    array.forEach((item) => {
		if (item === value) {
			count++
		}
	})

	return count
}

/**
 * toRoman - Convert an integer to Roman numerals
 * @param { number }value Integer to be converted to Roman numerals
 * @return { string } Roman numeral representation of the input value
*/
export function toRoman (value: number): string {

    let romanArray: string[] = []

    // Check for valid numbers
    if (value >= 4000 || value <= 0) {
        throw new Error(`Value cannot be up to 4000`)
    }

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
 * fromRoman - Convert Roman numeral to integer
 * @param { string } value Roman numeral to be converted to integer
 * @return { number } Integer representation of the input value
*/
export function fromRoman (value: string): number {
    
    let arabNum = 0
    const letters: string[] = value.split('')
    const romans = [
        ['M', 3], 
        ['D', 1], 
        ['C', 4], 
        ['L', 1], 
        ['X', 4], 
        ['V', 1], 
        ['I', 3]
    ];

    romans.forEach((letter) => {
        if (getCount(letters, letter[0]) > letter[1]) {
            let error = `${ letter[0] } cannot appear more than ${ letter[1] } times in a value`
            throw new Error(`${ error }`)
        }
    })

    letters.forEach((letter, index) => {
        if (letter === 'M') {
            arabNum += 1000
        } else if (letter === 'D') {
            arabNum += 500
        } else if (letter === 'C') {
            if (letters[index + 1] === 'M') {
                arabNum += 900
            } else if (letters[index + 1] === 'D') {
                arabNum += 400
            } else {
                arabNum += 100
            }
        } else if (letter === 'L') {
            arabNum += 50
        } else if (letter === 'X') {
            if (letters[index + 1] === 'C') {
                arabNum += 90
            } else if (letters[index + 1] === 'L') {
                arabNum += 40
            } else {
                arabNum += 10
            }
        } else if (letter === 'V') {
            arabNum += 5
        } else if (letter === 'I') {
            if (letters[index + 1] === 'X') {
                arabNum += 9
            } else if (letters[index + 1] === 'V') {
                arabNum += 4
            } else {
                arabNum += 1
            }
        } else {
            throw new Error(`Invalid Roman numeral: ${ letter }`)
        }
    })
    
    return arabNum
}

console.log(fromRoman('MMMCCXXXIV'))
