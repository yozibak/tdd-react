
/**
 * Implementation 1
 */
// export const sumArr = (arr: number[]) => {
//   let sum = 0
//   for (const num of arr) {
//     sum += num
//   }
//   return sum
// }

/**
 * Implementation 2. 
 * See tests can make you refactor easier and comfortable. 
 */
export const sumArr = (arr: number[]) => {
  return arr.reduce((a,b) => a + b, 0)
}