import { smallFn } from './small'

export const bigFn = () => {
  smallFn()
  smallFn()
  smallFn()
  console.log('And a big final!')
}
