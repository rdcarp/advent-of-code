import { StreetGridCalculator } from "../../../components"

test("calculator example 1", () => {
  const inputs = ["R2", "L3"]
  const calc = new StreetGridCalculator()

  inputs.map((i) => calc.move(i))

  expect(calc.currentPosition.x).toBe(2)
  expect(calc.currentPosition.y).toBe(3)
  expect(calc.getDistance()).toBe(5)
})

test("calculator example 2", () => {
  const inputs = ["R2", "R2", "R2"]
  const calc = new StreetGridCalculator()

  inputs.map((i) => calc.move(i))

  expect(calc.currentPosition.x).toBe(0)
  expect(calc.currentPosition.y).toBe(-2)
  expect(calc.getDistance()).toBe(2)
})

test("calculator example 3", () => {
  const inputs = ["R5", "L2", "R5", "R3"]
  const calc = new StreetGridCalculator()

  inputs.map((i) => calc.move(i))

  expect(calc.currentPosition.x).toBe(10)
  expect(calc.currentPosition.y).toBe(-1)
  expect(calc.getDistance()).toBe(11)
})

test("turning right when facing north results in east facing", () => {
  const calc = new StreetGridCalculator()
  calc.move("R0")
  expect(calc.orientation).toBe(1)
})

test("turning right 4 times facing north results in north facing", () => {
  const calc = new StreetGridCalculator()
  calc.move("R0")
  expect(calc.orientation).toBe(1)
  calc.move("R0")
  expect(calc.orientation).toBe(2)
  calc.move("R0")
  expect(calc.orientation).toBe(3)
  calc.move("R0")
  expect(calc.orientation).toBe(0)
})

test("turning left 4 times facing north results in facing north", () => {
  const calc = new StreetGridCalculator()
  calc.move("L0")
  expect(calc.orientation).toBe(3)
  calc.move("L0")
  expect(calc.orientation).toBe(2)
  calc.move("L0")
  expect(calc.orientation).toBe(1)
  calc.move("L0")
  expect(calc.orientation).toBe(0)
})

test("turning right then left results in facing north", () => {
  const calc = new StreetGridCalculator()
  expect(calc.orientation).toBe(0)
  calc.move("R0")
  expect(calc.orientation).toBe(1)
  calc.move("L0")
  expect(calc.orientation).toBe(0)
})

test("part two example 1", () => {
  const inputs = ["R8", "R4", "R4", "R8"]
  const calc = new StreetGridCalculator(false)

  calc.move("R8")
  expect(calc.currentPosition.x).toBe(8)
  expect(calc.currentPosition.y).toBe(0)
  expect(calc.visitedCoordinates.size).toBe(9)

  calc.move("R4")
  expect(calc.currentPosition.x).toBe(8)
  expect(calc.currentPosition.y).toBe(-4)
  expect(calc.visitedCoordinates.size).toBe(13)

  calc.move("R4")
  expect(calc.currentPosition.x).toBe(4)
  expect(calc.currentPosition.y).toBe(-4)
  expect(calc.visitedCoordinates.size).toBe(17)

  calc.move("R8")
  expect(calc.currentPosition.x).toBe(4)
  expect(calc.currentPosition.y).toBe(0)
  expect(calc.visitedCoordinates.size).toBe(20)
})
