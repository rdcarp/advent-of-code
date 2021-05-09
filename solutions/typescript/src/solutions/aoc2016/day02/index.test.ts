import { Keypad } from "../../../components"

test("keypad example #1", () => {
  const inputs = ["ULL", "RRDDD", "LURDL", "UUUUD"]
  const kpad = new Keypad()

  inputs.map((i) => {
    Array.from(i).map((x) => kpad.traverseEdge(x))
    kpad.press()
  })

  expect(kpad.code).toBe("1985")
})
