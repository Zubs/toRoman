# toRoman todos

- [ ] Web playground: Figure quirks
  - Simple UI
  - Input -> Output
  - Live demo
- [ ] Error design consistency
  - Throw errors for invalid inputs
  - Consistent error messages
  - Maybe use a custom error class
- [ ] CLI improvements
  - add flags for different operations (e.g., addition, subtraction)
  - add flags for different output formats (e.g., uppercase, lowercase, roman, arabic)
  - support piping
  ```bash
  toroman 42
  toroman --from XLII
  toroman --range 1 10
  echo 42 | toroman
  ```
- [ ] Benchmarks
  - Compare with other libraries
  - Performance tests for large numbers (might not do as the largest number is 3999)
- [ ] Expression parser
  ```javascript
  roman.evaluate("X + V * II"); // XX
  ```
- [ ] Immutable Roman object
  ```javascript
  const x = Roman("X");
  x.add("V").toString(); // XV
  ```
- [ ] Framework integration
  - Reactjs, Vuejs
  ```javascript
  const { roman, error } = useRoman(input);
  ```
- [ ] More tests
- [ ] At the end, bump the version to 2.1.0
- [ ] Update README, add new changes and examples
