import { sumArr } from "./domain"

test("sumArr retuns sum of numbers", () => {
  const arr = [1,2,3]
  const result = sumArr(arr)
  expect(result).toBe(6)
})