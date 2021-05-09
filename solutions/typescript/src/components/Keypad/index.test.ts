import { Keypad } from "../index"

test("No presses gives no code'", () => {
  const keypad = new Keypad()
  keypad.traverseEdge("R")
  keypad.traverseEdge("R")
  expect(keypad.code).toBe("")
})

test("Attempting to move non-existent edge remains in same place", () => {
  const keypad = new Keypad()
  expect(keypad.currentNode).toBe(0)
  keypad.traverseEdge("U")
  expect(keypad.currentNode).toBe(0)
})

test("Moving right on keypad yields 'two'", () => {
  const keypad = new Keypad()
  keypad.traverseEdge("R")
  keypad.press()
  expect(keypad.code).toBe("2")
})
