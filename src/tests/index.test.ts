import {
    diff,
    divide,
    fromRoman,
    getCount,
    isRoman,
    multiply,
    range,
    sum,
    toRoman,
    max,
    min, random, table, validateGeneral
} from "../index";

describe("getCount", () => {
    test("should return number of times a letter occurs", () => {
        expect(getCount(["V", "I", "P", "I", "I"], "I")).toBe(3);
    });

    test("should return 0 when the item is not in the array", () => {
        expect(getCount(["V", "I", "P", "I", "I"], "X")).toBe(0);
    });
});

describe("isRoman", () => {
    test("should throw an error on empty input", () => {
        try {
            // @ts-ignore
            isRoman();
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe("Roman numeral cannot be empty");
        }
    });

    test("should throw an error if input is not a string I", () => {
        try {
            // @ts-ignore
            isRoman(1234);
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe("Roman numeral must be of type string");
        }
    });

    test("should throw an error if input is not a string II", () => {
        try {
            // @ts-ignore
            isRoman('1234');
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe("Roman numeral must be of type string");
        }
    });

    test("should throw error on invalid input", () => {
        try {
            isRoman("IIII");
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe(
                "I cannot appear more than 3 times in a value"
            );
        }

        try {
            isRoman("XIVIIVI");
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe(
                "V cannot appear more than 1 times in a value"
            );
        }
    });

    test("should throw error on invalid letter", () => {
        try {
            isRoman("Y");
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe("Invalid Roman numeral: Y");
        }
    });

    test("should throw an error on invalid letter in string", () => {
        try {
            isRoman("XVY");
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe("Unexpected token Y, expected I");
        }
    });

    test("should throw an error if D is followed by M", () => {
        try {
            isRoman("DM");
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe("Unexpected token M, M cannot come after D");
        }
    });

    test("should throw an error if L is followed by M", () => {
        try {
            isRoman("LD");
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe(
                "Unexpected token D, expected either X, V or I"
            );
        }
    });

    test("should throw an error if X is followed by M", () => {
        try {
            isRoman("XM");
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe("Unexpected token M, M cannot come after X");
        }
    });

    test("should throw an error if V is followed by M", () => {
        try {
            isRoman("VM");
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe("Unexpected token M, expected I");
        }
    });

    test("should throw an error if I is followed by M", () => {
        try {
            isRoman("IM");
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe("Unexpected token M, expected either X, V or I");
        }
    });

    test("should return true on good input", () => {
        expect(isRoman("VII")).toBeTruthy();
    });
});

describe("toRoman", () => {
    test("should throw an error if input is not a number", () => {
        try {
            // @ts-ignore
            toRoman("234");
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe("Value must be of type number");
        }
    });

    test("should throw an error if value greater than 4000", () => {
        try {
            toRoman(4300);
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe("Value cannot be up to 4000 or less than 0");
        }
    });

    test("should throw an error if value less than 0", () => {
        try {
            toRoman(-4);
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe("Value cannot be up to 4000 or less than 0");
        }
    });

    const testCases: [string, number][] = [
        ["XII", 12],
        ["CCXXXIV", 234],
        ["DLXVII", 567],
        ["DCCCXC", 890],
        ["MCCXXXIV", 1234],
    ];

    test.each(testCases)(
        "should return %s when called with %s",
        (expected, input) => {
            expect(toRoman(input)).toBe(expected);
        }
    );
});

describe("fromRoman", () => {
    const testCases: [number, string][] = [
        [56, "LVI"],
        [789, "DCCLXXXIX"],
        [101, "CI"],
        [234, "CCXXXIV"],
        [567, "DLXVII"],
    ];

    test.each(testCases)(
        "should return %s when called with %s is entered",
        (expected, input) => {
            expect(fromRoman(input)).toBe(expected);
        }
    );
});

describe("sum", () => {
    test("should return X when called with XVIII and VIII", () => {
        expect(sum("roman", "II", "VIII")).toBe("X");
    });

    test("should return 98 when called with III, XXII, LXV and VIII", () => {
        expect(sum("number", "III", "XXII", "LXV", "VIII")).toBe(98);
    });

    test("should throw error when sum exceeds 3999", () => {
        try {
            sum("roman", "MM", "MM");
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe("Result exceeds maximum value of 3999");
        }
    });
});

describe("diff", () => {
    test("should return X when called with XVII and VIII", () => {
        expect(diff("roman", ["XVIII", "VIII"])).toBe("X");
    });

    test("should return 98 when called with CXVI and XVIII", () => {
        expect(diff("number", ["CXVI", "XVIII"])).toBe(98);
    });

    test("should throw error when difference is less than 1", () => {
        try {
            diff("roman", ["X", "X"]);
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe("Result is less than minimum value of 1");
        }
    });
});

describe("range", () => {
    test("should return an array of 100 elements when called with C and I", () => {
        expect(range("C", "I")).toHaveLength(100);
    });

    test("should return an array of 100 elements when called with 100 and 1", () => {
        expect(range(100, 1)).toHaveLength(100);
    });

    test("should return an array of 100 elements when called with C and 1", () => {
        expect(range("C", 1)).toHaveLength(100);
    });

    test("should return an array of 100 elements when called with 100 and I", () => {
        expect(range(100, 1)).toHaveLength(100);
    });

    test("should return an [V, X] of when called with X, V, V", () => {
        const sample = range("X", "V", "V");
        expect(sample).toHaveLength(2);
        expect(sample).toEqual(["V", "X"]);
    });

    test("should return an [C, CL, CC, CCL] of when called with 500, 100, 100", () => {
        const sample = range(250, 100, 50);
        expect(sample).toHaveLength(4);
        expect(sample).toEqual(["C", "CL", "CC", "CCL"]);
    });
});

describe("multiply", () => {
    test("should error on any invalid input", () => {
        try {
            // @ts-ignore
            multiply("number", "X", 5);
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe(
                "Roman numeral must be of type string"
            );
        }
    });

    const testCases1: [string, string, string][] = [
        ["L", "X", "V"],
        ["CC", "XX", "X"],
        ["D", "L", "X"],
        ["MMDCCCLXXX", "CXX", "XXIV"],
    ];

    test.each(testCases1)(
        "should return %s when called with %s and %s",
        (expected, roman1, roman2) => {
            expect(multiply("roman", roman1, roman2)).toBe(expected);
        }
    );

    const testCases2: [number, string, string][] = [
        [50, "X", "V"],
        [200, "XX", "X"],
        [500, "L", "X"],
        [2880, "CXX", "XXIV"],
    ];

    test.each(testCases2)(
        "should return %s when called with %s and %s",
        (expected, roman1, roman2) => {
            expect(multiply("number", roman1, roman2)).toBe(expected);
        }
    );

    test("should throw an error when result exceeds 4000 in roman mode", () => {
        try {
            multiply("roman", "MM", "III");
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe(
                "Result exceeds maximum value of 3999"
            );
        }
    });
});

describe("divide", () => {
    test("should error on any invalid input", () => {
        try {
            // @ts-ignore
            divide("number", ["X", 5]);
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe(
                "Roman numeral must be of type string"
            );
        }
    });

    const testCases1: [string, string, string][] = [
        ["II", "X", "V"],
        ["II", "XX", "X"],
        ["V", "L", "X"],
        ["V", "CXX", "XXIV"],
    ];

    test.each(testCases1)(
        "should return %s when called with %s and %s",
        (expected, roman1, roman2) => {
            expect(divide("roman", [roman1, roman2])).toBe(expected);
        }
    );

    const testCases2: [number, string, string][] = [
        [2, "X", "V"],
        [2, "XX", "X"],
        [5, "L", "X"],
        [5, "CXX", "XXIV"],
    ];

    test.each(testCases2)(
        "should return %s when called with %s and %s",
        (expected, roman1, roman2) => {
            expect(divide("number", [roman1, roman2])).toBe(expected);
        }
    );
});

describe("max", () => {
    test("should throw an error on invalid input", () => {
        try {
            // @ts-ignore
            expect(max("X", 5));
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe(
                "Roman numeral must be of type string"
            );
        }
    });

    const testCases: [string, string[]][] = [
        ["X", ["X", "V", "III", "VIII"]],
        ["MM", ["MM", "MCMXC", "MDCCCLXXXVIII", "MCMLXXVI"]],
        ["CDXLIV", ["CDXLIV", "CCCXL", "CCCLX", "CDXX"]],
    ];

    test.each(testCases)(
        "should return the maximum value from %s",
        (expected, inputs) => {
            expect(max(...inputs)).toBe(expected);
        }
    );
});

describe("min", () => {
    test("should throw an error on invalid input", () => {
        try {
            // @ts-ignore
            expect(min("X", 5));
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe(
                "Roman numeral must be of type string"
            );
        }
    });

    const testCases: [string, string[]][] = [
        ["III", ["X", "V", "III", "VIII"]],
        ["MDCCCLXXXVIII", ["MM", "MCMXC", "MDCCCLXXXVIII", "MCMLXXVI"]],
        ["CCCXL", ["CDXLIV", "CCCXL", "CCCLX", "CDXX"]],
    ];

    test.each(testCases)(
        "should return the minimum value of %s",
        (expected, inputs) => {
            expect(min(...inputs)).toBe(expected);
        }
    );
});

describe("random", () => {
    test("should throw error on invalid max", () => {
        try {
            // @ts-ignore
            random([43]);
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe("Input must be a string or number");
        }
    });

    test("should throw error on invalid max (number)", () => {
        try {
            // @ts-ignore
            random(4897);
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe("Value must be between 1 and 3999");
        }
    });

    test("should throw error on invalid max (roman)", () => {
        try {
            // @ts-ignore
            random("MMMM");
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe("Value must be between 1 and 3999");
        }
    });

    test("should throw error on invalid max (roman) II", () => {
        try {
            // @ts-ignore
            random("VIJ");
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe("Unexpected token J, expected either X, V or I");
        }
    });

    test("should throw error on invalid min", () => {
        try {
            // @ts-ignore
            random(100, {});
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe("Input must be a string or number");
        }
    });

    test("should throw error on invalid min (number)", () => {
        try {
            // @ts-ignore
            random(300, -23);
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe("Value must be between 1 and 3999");
        }
    });

    test("should throw error on invalid min (roman)", () => {
        try {
            // @ts-ignore
            random(300, "MMMM");
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe("Value must be between 1 and 3999");
        }
    });

    test("should throw error on invalid min (roman) II", () => {
        try {
            // @ts-ignore
            random(230, "VIJ");
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe("Unexpected token J, expected either X, V or I");
        }
    });

    test("should return a number between 1 and 100", () => {
        const result = random(100);
        expect(fromRoman(result)).toBeGreaterThanOrEqual(1);
        expect(fromRoman(result)).toBeLessThanOrEqual(100);
    });

    test("should return a number between 50 and 150", () => {
        const result = random(150, 50);
        expect(fromRoman(result)).toBeGreaterThanOrEqual(50);
        expect(fromRoman(result)).toBeLessThanOrEqual(150);
    });

    test("should return a number between 1 and 3999", () => {
        const result = random();
        expect(fromRoman(result)).toBeGreaterThanOrEqual(1);
        expect(fromRoman(result)).toBeLessThanOrEqual(3999);
    });
});

describe("table", () => {
    test("should throw error on invalid start", () => {
        try {
            // @ts-ignore
            table([43]);
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe("Input must be a string or number");
        }
    });

    test("should throw error on invalid start (number)", () => {
        try {
            // @ts-ignore
            table(4897);
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe("Value must be between 1 and 3999");
        }
    });

    test("should throw error on invalid start (roman)", () => {
        try {
            // @ts-ignore
            table("MMMM");
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe("Value must be between 1 and 3999");
        }
    });

    test("should throw error on invalid start (roman) II", () => {
        try {
            // @ts-ignore
            table("VIJ");
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe("Unexpected token J, expected either X, V or I");
        }
    });

    test("should throw error on invalid end", () => {
        try {
            // @ts-ignore
            table(100, {});
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe("Input must be a string or number");
        }
    });

    test("should throw error on invalid end (number)", () => {
        try {
            // @ts-ignore
            table(300, -23);
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe("Value must be between 1 and 3999");
        }
    });

    test("should throw error on invalid end (roman)", () => {
        try {
            // @ts-ignore
            table(300, "MMMM");
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe("Value must be between 1 and 3999");
        }
    });

    test("should throw error on invalid end (roman) II", () => {
        try {
            // @ts-ignore
            table(230, "VIJ");
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe("Unexpected token J, expected either X, V or I");
        }
    });

    test("should throw error when start is greater than end", () => {
        try {
            table("X", "V");
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe("Start value must be less than or equal to end value");
        }
    });

    test("should return a table from I to X", () => {
        const result = table("I", "x");
        expect(result).toEqual([
            {number: 1, roman: "I"},
            {number: 2, roman: "II"},
            {number: 3, roman: "III"},
            {number: 4, roman: "IV"},
            {number: 5, roman: "V"},
            {number: 6, roman: "VI"},
            {number: 7, roman: "VII"},
            {number: 8, roman: "VIII"},
            {number: 9, roman: "IX"},
            {number: 10, roman: "X"},
        ]);
    });

    test("should return a table from 98 to 114", () => {
        const result = table(98, 114);
        expect(result).toEqual([
            {number: 98, roman: "XCVIII"},
            {number: 99, roman: "XCIX"},
            {number: 100, roman: "C"},
            {number: 101, roman: "CI"},
            {number: 102, roman: "CII"},
            {number: 103, roman: "CIII"},
            {number: 104, roman: "CIV"},
            {number: 105, roman: "CV"},
            {number: 106, roman: "CVI"},
            {number: 107, roman: "CVII"},
            {number: 108, roman: "CVIII"},
            {number: 109, roman: "CIX"},
            {number: 110, roman: "CX"},
            {number: 111, roman: "CXI"},
            {number: 112, roman: "CXII"},
            {number: 113, roman: "CXIII"},
            {number: 114, roman: "CXIV"},
        ]);
    })
})

describe("validateGeneral", () => {
    test("should throw error on invalid input", () => {
        try {
            // @ts-ignore
            validateGeneral({});
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe("Input must be a string or number");
        }
    });

    test("should throw error on invalid input (number)", () => {
        try {
            // @ts-ignore
            validateGeneral(-23);
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe("Value must be between 1 and 3999");
        }
    });

    test("should throw error on invalid input (roman)", () => {
        try {
            // @ts-ignore
            validateGeneral("MMMM");
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe("Value must be between 1 and 3999");
        }
    });

    test("should throw error on invalid input (roman) II", () => {
        try {
            // @ts-ignore
            validateGeneral("VIJ");
        } catch (error) {
            // @ts-ignore
            expect(error.message).toBe("Unexpected token J, expected either X, V or I");
        }
    });
});
