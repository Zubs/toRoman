import { getCount, isRoman, toRoman, fromRoman, sum, diff } from '../index'

describe('getCount', function () {

    it('should return number of times a letter occurs', function () {
        expect(getCount(['V', 'I', 'P', 'I', 'I'], 'I')).toBe(3)
    })

    it('should return 0 when the item is not in the array', function () {
        expect(getCount(['V', 'I', 'P', 'I', 'I'], 'X')).toBe(0)
    })
})

describe('isRoman', function () {

    it('should throw an error on empty input', function () {
        expect(() => {
            isRoman()
        }).toThrowError('Roman numeral cannot be empty')
    })

    it('should throw an error if input is not a string', function () {
        expect(() => {
            isRoman(234)
        }).toThrowError('Roman numeral must be of type string')
    })

    it('should throw error on invalid input', function () {
        expect(() => {
            isRoman('IIII')
        }).toThrowError('I cannot appear more than 3 times in a value')
    })

    it('should throw error on invalid letter', function () {
        expect(() => {
            isRoman('Y')
        }).toThrowError('Invalid Roman numeral: Y')
    })

    it('should throw an error on invalid letter in string', function () {
        expect(() => {
            isRoman('XVY')
        }).toThrowError('Invalid Roman numeral: Y')
    })

    it('should throw an error if D is followed by M', function () {
        expect(() => {
            isRoman('DM')
        }).toThrowError('Unexpected token M, M cannot come after D')
    })

    it('should throw an error if L is followed by M', function () {
        expect(() => {
            isRoman('LD')
        }).toThrowError('Unexpected token D, expected either X, V or I')
    })

    it('should throw an error if X is followed by M', function () {
        expect(() => {
            isRoman('XM')
        }).toThrowError('Unexpected token M, M cannot come after X')
    })

    it('should throw an error if V is followed by M', function () {
        expect(() => {
            isRoman('VM')
        }).toThrowError('Unexpected token M, expected I')
    })

    it('should throw an error if I is followed by M', function () {
        expect(() => {
            isRoman('IM')
        }).toThrowError('Unexpected token M, expected either X, V or I')
    })

    it('should return true on good input', function () {
        expect(isRoman('VII')).toBeTrue()
    })
})

describe('toRoman', function () {
    it('should throw an error if value greater than 4000', function () {
        expect(() => {
            toRoman(4300)
        }).toThrowError('Value cannot be up to 4000')
    })

    it('should return XXX if 30 is entered', function () {
        expect(toRoman(30)).toEqual('XXX')
    });
})

describe('fromRoman', function () {
    it('should throw an error on invalid input', function () {
        expect(() => {
            fromRoman('XY')
        }).toThrowError('Invalid Roman numeral: Y')
    })

    it('should return 358 if CCCLVIII is entered', function () {
        expect(fromRoman('CCCLVIII')).toBe(358)
    })
})
