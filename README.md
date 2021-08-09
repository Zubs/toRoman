# toroman
A very lightweight library for converting arabic numerals to roman numerals, converting roman numerals to arabic numerals, and validating roman numerals.

## Installation
It can be installed using npm:
```
$ npm i toroman
```

## Usage
* Import package
```
const roman = require('toroman')
```
* Convert integer to roman numerals
```
console.log(roman.toRoman(765)) // Returns DCCLXV
```
* Convert roman numeral to integer
```
console.log(roman.fromRoman('DCCLXV')) // Returns 765
```
* Confirm if string is valid roman numeral
```
console.log(roman.isRoman('MMMCCXXXIV')) // Returns true
```

## Found this project useful?
If you found this project useful or you like what you see, then please consider giving it a :star: on Github and sharing it with your friends via social media.
