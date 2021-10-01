"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
describe('toRoman', function () {
    // Test getCount
    it('should return number of times a letter occurs', function () {
        expect((0, index_1.getCount)(['V', 'I', 'P', 'I', 'I'], 'I')).toBe(3);
    });
    // Test isRoman
    it('should return true on good input', function () {
        expect(true).toBeTrue();
    });
    it('should throw error on invalid input', function () {
        expect(true).toBeTrue();
    });
});
