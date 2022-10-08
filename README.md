# toroman

A minimalist library for Roman numeral conversion.

## 🚀 Features

- Convert Arabic numerals to Roman numerals Ⅶ
- Convert Roman numerals to Arabic numerals 🔢
- Validate Roman numerals ✅
- Add Roman numerals ➕
- Subtract Roman numerals ➖
- Get Roman numerals within a range 📡

## 📦 Installation

It can be installed with npm.

```sh
npm i toroman
```

## 📥 Usage

```js
const roman = require("toRoman");
```

<!-- ### 🔩 Methods -->

#### 🔄 Convert integer to Roman numerals: `toRoman`

```js
/**
 * toRoman - Convert an integer to Roman numerals
 * @param { number } value Integer to be converted to Roman numerals
 * @returns { string } Roman numeral representation of the input value
 */
function toRoman(value: number): string | Error {}
```

🔵 <b>Example</b>

```js
console.log(roman.toRoman(765));

// Returns DCCLXV
```

#### 🔁 Convert Roman numeral to integer: `fromRoman`

```js
/**
 * fromRoman - Convert Roman numeral to integer
 * @param { string } value Roman numeral to be converted to integer
 * @returns { number } Integer representation of the input value
 */
export function fromRoman(value: string): number | Error {}
```

🔵 <b>Example</b>

```js
console.log(roman.fromRoman("DCCLXV"));

// Returns 765
```

#### 🔍 Confirm if string is valid Roman numeral: `isRoman`

```js
/**
 * isRoman - Confirm that string is a valid Roman numeral
 * @param { string } value String to be tested
 * @returns { boolean } true or false
 */
export function isRoman(value: string): true | Error {}
```

🔵 <b>Example</b>

```js
console.log(roman.isRoman("MMMCCXXXIV"));

// Returns true
```

#### ➕ Sum Roman numerals and get output as Roman numeral or numbers: `sum`

```js
/**
 * @param args Roman numerals to be added
 * @returns { string } Final Roman numeral
 */
export function sum(
  expected: "number" | "roman",
  ...args: string[]
): string | number | Error {}
```

🔵 <b>Example</b>

```js
console.log(roman.sum("number", "X", "MXC"));

// Returns 1100
```

#### ➖ Get difference between two Roman numerals and get output as Roman numeral or numbers: `diff`

```js
/**
 * @param expected { string } Expected response type
 * @param numerals { string[] } Roman numerals to subtract
 * @returns { string | number }
 */
export function diff(expected: "number" | "roman", numerals: string[]) {}
```

🔵 <b>Example</b>

```js
console.log(roman.diff("number", ["X", "MXC"]));

// Returns 1080
```

#### 📡 Get a range of Roman numerals: `range`

```js
/**
 * Get range of Roman numerals
 * @param end { string | number } Value to stop at
 * @param start { string | number } Value to start from
 * @param intervals { string | number } Difference between values
 */
export function range(
  end: string | number,
  start: string | number = "I",
  intervals: string | number = "I"
): string[] | Error {}
```

🔵 <b>Examples</b>

```js
console.log(roman.range(7));

// Returns [ 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII' ]
```

```js
console.log(roman.range("IX"));

// Returns [ 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX' ]
```

```js
console.log(roman.range(12, 7));

// Returns [ 'VII', 'VIII', 'IX', 'X', 'XI', 'XII' ]
```

```js
console.log(roman.range(12, "IX"));

// Returns [ 'IX', 'X', 'XI', 'XII' ]
```

```js
console.log(roman.range(22, 3, 5));

// Returns [ 'III', 'VIII', 'XIII', 'XVIII' ]
```

### ✨ Found this project useful?

If you found this project useful or you like what you see, then please consider giving it a :star: on Github and sharing it with your social media folks 🙂.
