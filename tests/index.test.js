"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
describe("getCount", () => {
  test("should return number of times a letter occurs", () => {
    expect((0, index_1.getCount)(["V", "I", "P", "I", "I"], "I")).toBe(3);
  });
  test("should return 0 when the item is not in the array", () => {
    expect((0, index_1.getCount)(["V", "I", "P", "I", "I"], "X")).toBe(0);
  });
});
describe("isRoman", () => {
  test("should throw an error on empty input", () => {
    try {
      // @ts-ignore
      (0, index_1.isRoman)();
    } catch (error) {
      // @ts-ignore
      expect(error.message).toBe("Roman numeral cannot be empty");
    }
  });
  test("should throw an error if input is not a string I", () => {
    try {
      // @ts-ignore
      (0, index_1.isRoman)(1234);
    } catch (error) {
      // @ts-ignore
      expect(error.message).toBe("Roman numeral must be of type string");
    }
  });
  test("should throw an error if input is not a string II", () => {
    try {
      // @ts-ignore
      (0, index_1.isRoman)("1234");
    } catch (error) {
      // @ts-ignore
      expect(error.message).toBe("Roman numeral must be of type string");
    }
  });
  test("should throw error on invalid input", () => {
    try {
      (0, index_1.isRoman)("IIII");
    } catch (error) {
      // @ts-ignore
      expect(error.message).toBe(
        "I cannot appear more than 3 times in a value"
      );
    }
    try {
      (0, index_1.isRoman)("XIVIIVI");
    } catch (error) {
      // @ts-ignore
      expect(error.message).toBe(
        "V cannot appear more than 1 times in a value"
      );
    }
  });
  test("should throw error on invalid letter", () => {
    try {
      (0, index_1.isRoman)("Y");
    } catch (error) {
      // @ts-ignore
      expect(error.message).toBe("Invalid Roman numeral: Y");
    }
  });
  test("should throw an error on invalid letter in string", () => {
    try {
      (0, index_1.isRoman)("XVY");
    } catch (error) {
      // @ts-ignore
      expect(error.message).toBe("Unexpected token Y, expected I");
    }
  });
  test("should throw an error if D is followed by M", () => {
    try {
      (0, index_1.isRoman)("DM");
    } catch (error) {
      // @ts-ignore
      expect(error.message).toBe("Unexpected token M, M cannot come after D");
    }
  });
  test("should throw an error if L is followed by M", () => {
    try {
      (0, index_1.isRoman)("LD");
    } catch (error) {
      // @ts-ignore
      expect(error.message).toBe(
        "Unexpected token D, expected either X, V or I"
      );
    }
  });
  test("should throw an error if X is followed by M", () => {
    try {
      (0, index_1.isRoman)("XM");
    } catch (error) {
      // @ts-ignore
      expect(error.message).toBe("Unexpected token M, M cannot come after X");
    }
  });
  test("should throw an error if V is followed by M", () => {
    try {
      (0, index_1.isRoman)("VM");
    } catch (error) {
      // @ts-ignore
      expect(error.message).toBe("Unexpected token M, expected I");
    }
  });
  test("should throw an error if I is followed by M", () => {
    try {
      (0, index_1.isRoman)("IM");
    } catch (error) {
      // @ts-ignore
      expect(error.message).toBe(
        "Unexpected token M, expected either X, V or I"
      );
    }
  });
  test("should return true on good input", () => {
    expect((0, index_1.isRoman)("VII")).toBeTruthy();
  });
});
describe("toRoman", () => {
  test("should throw an error if input is not a number", () => {
    try {
      // @ts-ignore
      (0, index_1.toRoman)("234");
    } catch (error) {
      // @ts-ignore
      expect(error.message).toBe("Value must be of type number");
    }
  });
  test("should throw an error if value greater than 4000", () => {
    try {
      (0, index_1.toRoman)(4300);
    } catch (error) {
      // @ts-ignore
      expect(error.message).toBe("Value cannot be up to 4000 or less than 0");
    }
  });
  test("should throw an error if value less than 0", () => {
    try {
      (0, index_1.toRoman)(-4);
    } catch (error) {
      // @ts-ignore
      expect(error.message).toBe("Value cannot be up to 4000 or less than 0");
    }
  });
  const testCases = [
    ["XII", 12],
    ["CCXXXIV", 234],
    ["DLXVII", 567],
    ["DCCCXC", 890],
    ["MCCXXXIV", 1234],
  ];
  test.each(testCases)(
    "should return %s when called with %s",
    (expected, input) => {
      expect((0, index_1.toRoman)(input)).toBe(expected);
    }
  );
});
describe("fromRoman", () => {
  const testCases = [
    [56, "LVI"],
    [789, "DCCLXXXIX"],
    [101, "CI"],
    [234, "CCXXXIV"],
    [567, "DLXVII"],
  ];
  test.each(testCases)(
    "should return %s when called with %s is entered",
    (expected, input) => {
      expect((0, index_1.fromRoman)(input)).toBe(expected);
    }
  );
});
describe("diff", () => {
  test("should return X when called with XVIII and VIII", () => {
    expect((0, index_1.sum)("roman", "II", "VIII")).toBe("X");
  });
  test("should return 98 when called with III, XXII, LXV and VIII", () => {
    expect((0, index_1.sum)("number", "III", "XXII", "LXV", "VIII")).toBe(98);
  });
});
describe("sum", () => {
  test("should return X when called with XVII and VIII", () => {
    expect((0, index_1.diff)("roman", ["XVIII", "VIII"])).toBe("X");
  });
  test("should return 98 when called with CXVI and XVIII", () => {
    expect((0, index_1.diff)("number", ["CXVI", "XVIII"])).toBe(98);
  });
});
describe("range", () => {
  test("should return an array of 100 elements when called with C and I", () => {
    expect((0, index_1.range)("C", "I")).toHaveLength(100);
  });
  test("should return an array of 100 elements when called with 100 and 1", () => {
    expect((0, index_1.range)(100, 1)).toHaveLength(100);
  });
  test("should return an array of 100 elements when called with C and 1", () => {
    expect((0, index_1.range)("C", 1)).toHaveLength(100);
  });
  test("should return an array of 100 elements when called with 100 and I", () => {
    expect((0, index_1.range)(100, 1)).toHaveLength(100);
  });
  test("should return an [V, X] of when called with X, V, V", () => {
    const sample = (0, index_1.range)("X", "V", "V");
    expect(sample).toHaveLength(2);
    expect(sample).toEqual(["V", "X"]);
  });
  test("should return an [C, CL, CC, CCL] of when called with 500, 100, 100", () => {
    const sample = (0, index_1.range)(250, 100, 50);
    expect(sample).toHaveLength(4);
    expect(sample).toEqual(["C", "CL", "CC", "CCL"]);
  });
});
describe("multiply", () => {
  test("should error on any invalid input", () => {
    try {
      // @ts-ignore
      (0, index_1.sum)("number", "X", 5);
    } catch (error) {
      // @ts-ignore
      expect(error.message).toBe("Roman numeral must be of type string");
    }
  });
  const testCases1 = [
    ["L", "X", "V"],
    ["CC", "XX", "X"],
    ["D", "L", "X"],
    ["MMDCCCLXXX", "CXX", "XXIV"],
  ];
  test.each(testCases1)(
    "should return %s when called with %s and %s",
    (expected, roman1, roman2) => {
      expect((0, index_1.multiply)("roman", roman1, roman2)).toBe(expected);
    }
  );
  const testCases2 = [
    [50, "X", "V"],
    [200, "XX", "X"],
    [500, "L", "X"],
    [2880, "CXX", "XXIV"],
  ];
  test.each(testCases2)(
    "should return %s when called with %s and %s",
    (expected, roman1, roman2) => {
      expect((0, index_1.multiply)("number", roman1, roman2)).toBe(expected);
    }
  );
  test("should throw an error when result exceeds 4000 in roman mode", () => {
    try {
      (0, index_1.multiply)("roman", "MM", "III");
    } catch (error) {
      // @ts-ignore
      expect(error.message).toBe("Result exceeds maximum value of 3999");
    }
  });
});
describe("divide", () => {
  test("should error on any invalid input", () => {
    try {
      // @ts-ignore
      (0, index_1.sum)("number", "X", 5);
    } catch (error) {
      // @ts-ignore
      expect(error.message).toBe("Roman numeral must be of type string");
    }
  });
  const testCases1 = [
    ["II", "X", "V"],
    ["II", "XX", "X"],
    ["V", "L", "X"],
    ["V", "CXX", "XXIV"],
  ];
  test.each(testCases1)(
    "should return %s when called with %s and %s",
    (expected, roman1, roman2) => {
      expect((0, index_1.divide)("roman", [roman1, roman2])).toBe(expected);
    }
  );
  const testCases2 = [
    [2, "X", "V"],
    [2, "XX", "X"],
    [5, "L", "X"],
    [5, "CXX", "XXIV"],
  ];
  test.each(testCases2)(
    "should return %s when called with %s and %s",
    (expected, roman1, roman2) => {
      expect((0, index_1.divide)("number", [roman1, roman2])).toBe(expected);
    }
  );
});
describe("max", () => {
  test("should throw an error on invalid input", () => {
    try {
      // @ts-ignore
      expect((0, index_1.max)("X", 5));
    } catch (error) {
      // @ts-ignore
      expect(error.message).toBe("Roman numeral must be of type string");
    }
  });
  const testCases = [
    ["X", ["X", "V", "III", "VIII"]],
    ["MM", ["MM", "MCMXC", "MDCCCLXXXVIII", "MCMLXXVI"]],
    ["CDXLIV", ["CDXLIV", "CCCXL", "CCCLX", "CDXX"]],
  ];
  test.each(testCases)(
    "should return the maximum value from %s",
    (expected, inputs) => {
      expect((0, index_1.max)(...inputs)).toBe(expected);
    }
  );
});
describe("min", () => {
  test("should throw an error on invalid input", () => {
    try {
      // @ts-ignore
      expect((0, index_1.min)("X", 5));
    } catch (error) {
      // @ts-ignore
      expect(error.message).toBe("Roman numeral must be of type string");
    }
  });
  const testCases = [
    ["III", ["X", "V", "III", "VIII"]],
    ["MDCCCLXXXVIII", ["MM", "MCMXC", "MDCCCLXXXVIII", "MCMLXXVI"]],
    ["CCCXL", ["CDXLIV", "CCCXL", "CCCLX", "CDXX"]],
  ];
  test.each(testCases)(
    "should return the maximum value from %s",
    (expected, inputs) => {
      expect((0, index_1.min)(...inputs)).toBe(expected);
    }
  );
});
describe("random", () => {
  test("should throw error on invalid max", () => {
    try {
      // @ts-ignore
      (0, index_1.random)([43]);
    } catch (error) {
      // @ts-ignore
      expect(error.message).toBe("Max value must be a number or string");
    }
  });
  test("should throw error on invalid max (number)", () => {
    try {
      // @ts-ignore
      (0, index_1.random)(4897);
    } catch (error) {
      // @ts-ignore
      expect(error.message).toBe("Max value must be between 1 and 3999");
    }
  });
  test("should throw error on invalid max (roman)", () => {
    try {
      // @ts-ignore
      (0, index_1.random)("MMMM");
    } catch (error) {
      // @ts-ignore
      expect(error.message).toBe("Max value must be between 1 and 3999");
    }
  });
  test("should throw error on invalid max (roman) II", () => {
    try {
      // @ts-ignore
      (0, index_1.random)("VIJ");
    } catch (error) {
      // @ts-ignore
      expect(error.message).toBe(
        "Unexpected token J, expected either X, V or I"
      );
    }
  });
  test("should throw error on invalid min", () => {
    try {
      // @ts-ignore
      (0, index_1.random)(100, {});
    } catch (error) {
      // @ts-ignore
      expect(error.message).toBe("Min value must be a number or string");
    }
  });
  test("should throw error on invalid min (number)", () => {
    try {
      // @ts-ignore
      (0, index_1.random)(300, -23);
    } catch (error) {
      // @ts-ignore
      expect(error.message).toBe(
        "Min value must be less than max value and greater than 0"
      );
    }
  });
  test("should throw error on invalid min (roman)", () => {
    try {
      // @ts-ignore
      (0, index_1.random)(300, "MMMM");
    } catch (error) {
      // @ts-ignore
      expect(error.message).toBe(
        "Min value must be less than max value and greater than 0"
      );
    }
  });
  test("should throw error on invalid min (roman) II", () => {
    try {
      // @ts-ignore
      (0, index_1.random)(230, "VIJ");
    } catch (error) {
      // @ts-ignore
      expect(error.message).toBe(
        "Unexpected token J, expected either X, V or I"
      );
    }
  });
  test("should return a number between 1 and 100", () => {
    const result = (0, index_1.random)(100);
    expect((0, index_1.fromRoman)(result)).toBeGreaterThanOrEqual(1);
    expect((0, index_1.fromRoman)(result)).toBeLessThanOrEqual(100);
  });
  test("should return a number between 50 and 150", () => {
    const result = (0, index_1.random)(150, 50);
    expect((0, index_1.fromRoman)(result)).toBeGreaterThanOrEqual(50);
    expect((0, index_1.fromRoman)(result)).toBeLessThanOrEqual(150);
  });
  test("should return a number between 1 and 3999", () => {
    const result = (0, index_1.random)();
    expect((0, index_1.fromRoman)(result)).toBeGreaterThanOrEqual(1);
    expect((0, index_1.fromRoman)(result)).toBeLessThanOrEqual(3999);
  });
  test("should return L", () => {
    const result = (0, index_1.random)(50, 49);
    expect(result).toBe("L");
  });
});
