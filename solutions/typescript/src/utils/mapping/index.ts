import { Coordinate } from "../../components"

const rectilinearDistance = function (l1: Coordinate, l2: Coordinate): number {
  return Math.abs(l1.x - l2.x) + Math.abs(l1.y - l2.y)
}

const compassTurn = function (facing: number, turn: string): number {
  if (turn === "R") {
    return (facing + 1) % 4
  } else if (turn === "L") {
    return facing - 1 >= 0 ? facing - 1 : 3
  } else {
    throw new Error(`You cannot turn '${turn}'.`)
  }
}

export { rectilinearDistance }
export { compassTurn }
