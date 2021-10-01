# toroman
A very lightweight library for converting arabic numerals to roman numerals, converting roman numerals to arabic numerals, and validating roman numerals.

## Installation
It can be installed using npm:
```sh
npm i toroman
```

```
const roman = require('toRoman')
```

### Methods

#### Convert integer to roman numerals, `toRoman`.
```js
/**
 * toRoman - Convert an integer to Roman numerals
 * @param { number } value Integer to be converted to Roman numerals
 * @returns { string } Roman numeral representation of the input value
*/
function toRoman (value: number): string | Error {}
```

<b>Example</b>
```js
console.log(roman.toRoman(765))

// Returns DCCLXV
```

#### Convert roman numeral to integer
```js
/**
 * fromRoman - Convert Roman numeral to integer
 * @param { string } value Roman numeral to be converted to integer
 * @returns { number } Integer representation of the input value
*/
export function fromRoman (value: string): number | Error {}
```

<b>Example</b>
```js
console.log(roman.fromRoman('DCCLXV'))

// Returns 765
```

#### Confirm if string is valid roman numeral
```js
/**
 * isRoman - Confirm that string is a valid roman numeral
 * @param { string } value String to be tested
 * @returns { boolean } true or false 
 */
export function isRoman (value: string): true | Error {}
```

<b>Example</b>
```
console.log(roman.isRoman('MMMCCXXXIV')) 

// Returns true
```

#### Sum roman numerals and get output as roman numeral or numbers
```js
/**
 * @param args Roman numerals to be added
 * @returns { string } Final roman numeral
 */
export function sum (expected: 'number' | 'roman', ...args: string[]): string | number | Error {}
```

<b>Example</b>
```js
console.log(roman.sum('number', 'X', 'MXC')) 

// Returns 1100
```

#### Get difference between two roman numerals and get output as roman numeral or numbers
```js
/**
 * @param expected { string } Expected response type
 * @param numerals { string[] } Roman numerals to subtract
 * @returns { string | number }
 */
export function diff (expected: 'number' | 'roman', numerals: string[]) {
```

<b>Example</b>
```js
console.log(roman.diff('number', ['X', 'MXC']))

// Returns 1080
```

### Found this project useful?
If you found this project useful or you like what you see, then please consider giving it a :star: on Github and sharing it with your friends via social media.
