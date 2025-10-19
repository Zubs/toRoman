# toroman

A minimalist library for Roman numeral operations.

## 🚀 Features

- Convert 🔁 Arabic numerals 🔢 to Roman numerals
- Convert 🔁 Roman numerals to Arabic numerals 🔢
- Validate Roman numerals ✅
- Add Roman numerals ➕
- Subtract Roman numerals ➖
- Multiply Roman numerals ✖️
- Divide Roman numerals ➗
- Get maximum Roman numeral ⬆️
- Get minimum Roman numeral ⬇️
- Get a random Roman numeral 🤹
- Generate a table of Roman numerals 📋
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

## 🔩 Methods

### 🔄 Convert integer to Roman numerals: `toRoman`

```ts
/**
 * Convert an integer to Roman numerals
 * @param { number } value Integer to be converted to Roman numerals
 * @returns { string } Roman numeral representation of the input value
 * @throws { Error } When the input is not a valid integer or is out of range
 */
function toRoman(value: number): string {}
```

🔵 <b>Example</b>

```js
console.log(roman.toRoman(765));

// Returns DCCLXV
```

### 🔁 Convert Roman numeral to integer: `fromRoman`

```ts
/**
 * Convert Roman numeral to integer
 * @param { string } value Roman numeral to be converted to integer
 * @returns { number } Integer representation of the input value
 * @throws { Error } When the input is not a valid Roman numeral
 */
function fromRoman(value: string): number {}
```

🔵 <b>Example</b>

```js
console.log(roman.fromRoman("DCCLXV"));

// Returns 765
```

### 🔍 Confirm if string is valid Roman numeral: `isRoman`

```ts
/**
 * Confirm that string is a valid roman numeral
 * @param { string } value String to be tested
 * @returns { boolean } true or false
 * @throws { Error } When the input is not a valid roman numeral
 */
function isRoman(value: string): true {}
```

🔵 <b>Example</b>

```js
console.log(roman.isRoman("MMMCCXXXIV"));

// Returns true
```

### ➕ Sum Roman numerals and get output as a Roman numeral or numbers: `sum`

```ts
/**
 * Sum roman numerals
 * @param expected { string } Expected response type
 * @param args { string[] } Roman numerals to be added
 * @returns { string | number } Final roman numeral
 * @throws { Error } When the result exceeds maximum value of 3999 or invalid numeral is provided
 */
function sum(expected: "number" | "roman", ...args: string[]): general {}
```

🔵 <b>Example</b>

```js
console.log(roman.sum("number", "X", "MXC"));

// Returns 1100
```

### ➖ Get difference between two Roman numerals and get output as a Roman numeral or numbers: `diff`

```ts
/**
 * Get difference between two roman numerals
 * @param expected { string } Expected response type
 * @param numerals { string[] } Roman numerals to subtract
 * @returns { string | number }
 * @throws { Error } When more than two numerals are provided
 */
function diff(
  expected: "number" | "roman",
  numerals: [string, string]
): general {}
```

🔵 <b>Example</b>

```js
console.log(roman.diff("number", ["X", "MXC"]));

// Returns 1080
```

### ✖️ Multiply Roman numerals and get output as a Roman numeral or numbers: `multiply`

```ts
/**
 * Multiply roman numerals
 * @param expected { string } Expected response type
 * @param args { string[] } Roman numerals to be added
 * @returns { string | number } Final roman numeral
 * @throws { Error } When the result exceeds maximum value of 3999 or invalid numeral is provided
 */
function multiply(expected: "number" | "roman", ...args: string[]): general {}
```

🔵 <b>Example</b>

```js
console.log(roman.multiply("roman", "X", "V"));

// Returns L
```

### ➗ Divide two Roman numerals and get output as a Roman numeral or numbers: `divide`

```ts
/**
 * Divide two roman numerals
 * @param expected { string } Expected response type
 * @param numerals { string[] } Roman numerals to divide
 * @returns { string | number }
 * @throws { Error } When more than two numerals are provided
 */
function divide(
  expected: "number" | "roman",
  numerals: [string, string]
): general {}
```

🔵 <b>Example</b>

```js
console.log(roman.divide("number", ["L", "X"]));

// Returns 5
```

### ⬆️ Get maximum Roman numeral from a list: `max`

```ts
/**
 * Get maximum roman numeral from a list
 * @param args { string[] } Roman numerals to compare
 * @returns { string } Maximum roman numeral
 * @throws { Error } When an invalid numeral is provided
 */
function max(...args: string[]): string {}
```

🔵 <b>Example</b>

```js
console.log(roman.max("X", "V", "III", "VIII"));

// Returns X
```

### ⬇️ Get minimum Roman numeral from a list: `min`

```ts
/**
 * Get minimum roman numeral from a list
 * @param args { string[] } Roman numerals to compare
 * @returns { string } Minimum roman numeral
 * @throws { Error } When an invalid numeral is provided
 */
function min(...args: string[]): string {}
```

🔵 <b>Example</b>

```js
console.log(roman.min("X", "V", "III", "VIII"));

// Returns III
```

### 🤹 Get a random Roman numeral: `random`

```ts
/**
 * Generate a random Roman numeral within a specified range
 * @param max Maximum value
 * @param min Minimum value
 * @returns { string } Random Roman numeral within the specified range
 * @throws { Error } When the inputs are invalid or out of range
 */
function random(max: general = 3999, min: general = 1): string {}
```

🔵 <b>Example</b>

```js
console.log(roman.random(10));

// Returns a random Roman numeral between I and X
```

### 📋 Generate a table of Roman numerals: `table`

```ts
/**
 * Generate a table of Roman numerals within a specified range
 * @param start Starting point for table
 * @param end Stopping point for table
 * @returns { number: number; roman: string }[] Array of objects containing number and its Roman numeral representation
 * @throws { Error } When the inputs are invalid or out of range
 */
function table(
  start: general,
  end: general
): { number: number; roman: string }[] {}
```

🔵 <b>Example</b>

```js
console.log(roman.table("I", "V"));

/**
 * Returns [
 * { number: 1, roman: 'I' },
 * { number: 2, roman: 'II' },
 * { number: 3, roman: 'III' },
 * { number: 4, roman: 'IV' },
 * { number: 5, roman: 'V' }
 * ]
 */
```

### 📡 Get a range of Roman numerals: `range`

```ts
/**
 * Get range of roman numerals
 * @param end { string | number } Value to stop at
 * @param start { string | number } Value to start from
 * @param intervals { string | number } Difference between values
 * @returns { string[] } Array of roman numerals in the specified range
 * @throws { Error } When any of the inputs are invalid or out of range
 */
function range(
  end: general,
  start: general = "I",
  intervals: general = "I"
): string[] {}
```

🔵 <b>Examples</b>

```js
console.log(roman.range(7));

// Returns [ 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII' ]
```

## ✨ Found this project useful?

If you found this project useful, or you like what you see, then please consider giving it a ⭐️ on GitHub and sharing it with your social media folks 🙂.
