import {
  diff,
  fromRoman,
  getCount,
  isRoman,
  range,
  sum,
  toRoman,
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

  test("should throw an error if input is not a string", () => {
    try {
      // @ts-ignore
      isRoman(234);
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
        "I cannot appear more than 3 times in a value"
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
      expect(error.message).toBe("Invalid Roman numeral: Y");
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
      expect(error.message).toBe("Unexpected token M, M cannot come after V");
    }
  });

  test("should throw an error if I is followed by M", () => {
    try {
      isRoman("IM");
    } catch (error) {
      // @ts-ignore
      expect(error.message).toBe("Unexpected token M, M cannot come after I");
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

describe("diff", () => {
  test("should return X when called with XVIII and VIII", () => {
    expect(sum("roman", "II", "VIII")).toBe("X");
  });

  test("should return 98 when called with III, XXII, LXV and VIII", () => {
    expect(sum("number", "III", "XXII", "LXV", "VIII")).toBe(98);
  });
});

describe("sum", () => {
  test("should return X when called with XVII and VIII", () => {
    expect(diff("roman", ["XVIII", "VIII"])).toBe("X");
  });

  test("should return 98 when called with CXVI and XVIII", () => {
    expect(diff("number", ["CXVI", "XVIII"])).toBe(98);
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
