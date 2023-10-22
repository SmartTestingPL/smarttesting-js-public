# eslint

- [package.json](package.json)
- [.eslintrc](.eslintrc)

Example output:

```
# smarttesting-js-public/06-automation/eslint/index.js
   1:1   warning  Unexpected console statement                                                            no-console
   1:33  warning  Missing semicolon                                                                       semi
   2:1   warning  Unexpected console statement                                                            no-console
   2:13  warning  Strings must use doublequote                                                            quotes
   2:42  warning  Missing semicolon                                                                       semi
   3:5   error    'str' is assigned a value but never used                                                no-unused-vars
   3:11  warning  Strings must use doublequote                                                            quotes
   3:31  warning  Missing semicolon                                                                       semi
   4:6   warning  Missing semicolon                                                                       semi
   5:4   error    Expected a conditional expression and instead saw an assignment                         no-cond-assign
   5:4   error    Unexpected constant condition                                                           no-constant-condition
   5:4   error    'a' is not defined                                                                      no-undef
   6:3   error    'b' is assigned a value but never used                                                  no-unused-vars
   6:8   warning  Missing semicolon                                                                       semi
   8:24  error    Remove the unnecessary boolean literal                                                  sonarjs/no-redundant-boolean
   9:1   error    Unnecessary try/catch wrapper                                                           no-useless-catch
  11:3   error    Add logic to this catch clause or eliminate it and rethrow the exception automatically  sonarjs/no-useless-catch
  19:1   error    Function 'sumOfPrimes' has a complexity of 4. Maximum allowed is 2                      complexity
```
