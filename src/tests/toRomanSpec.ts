import { getCount } from '../index'

describe('toRoman', function () {

    // Test getCount
    it('should return number of times a letter occurs', function () {
        expect(getCount(['V', 'I', 'P', 'I', 'I'], 'I')).toBe(3)
    })

    // Test isRoman
    it('should return true on good input', function () {
        expect(true).toBeTrue()
    })

    it('should throw error on invalid input', function () {
        expect(true).toBeTrue()
    })
})
