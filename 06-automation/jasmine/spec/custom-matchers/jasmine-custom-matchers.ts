// either:
// with TS config: "allowSyntheticDefaultImports": true
import jasmine from 'jasmine'
// or
import CustomMatcherFactories = jasmine.CustomMatcherFactories
import MatchersUtil = jasmine.MatchersUtil
import CustomEqualityTester = jasmine.CustomEqualityTester
import CustomMatcherResult = jasmine.CustomMatcherResult

declare global {
  namespace jasmine {
    interface Matchers<T> {
      toHaveBeenCalledIncludingArg(expected: any): boolean;
    }
  }
}


export const matchers: CustomMatcherFactories = {
  toHaveBeenCalledIncludingArg(util: MatchersUtil, customEqualityTester: CustomEqualityTester[]): jasmine.CustomMatcher {
    return {
      compare(fn, arg): CustomMatcherResult {
        const calls = fn.calls.all()
        
        const pass = calls.some(c => c.args.includes(arg))
        const message = `Function has ${pass ? '' : 'never'} been called with argument ${arg}`
    
        // Function has NEVER been called -> pass:false
        // Function has been called -> pass: true

        return {
          pass,
          message
        }
      }
    }
  }
}
