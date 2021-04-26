import { Keypad } from "../../../components"

test("day 2 part 1 example 1", () => {
  const inputs = ["ULL", "RRDDD", "LURDL", "UUUUD"]
  const keypad = new Keypad()

  inputs.map((l) => {
    Array.from(l).map((i) => keypad.move(i))
    keypad.press()
  })

  expect(keypad.code).toBe(1985)
})
