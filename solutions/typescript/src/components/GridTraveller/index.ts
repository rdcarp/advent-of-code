import { Coordinate } from ".."
import { compassTurn, rectilinearDistance } from "../../utils/mapping"

class StreetGridCalculator {
  orientation: number // 0: North, 1: East, etc... TODO: enummery
  startPosition: Coordinate
  currentPosition: Coordinate
  visitedCoordinates: Set<string>
  canCrossPaths: boolean
  pathsHaveCrossed: boolean

  constructor(canCrossPaths = true) {
    this.orientation = 0
    this.currentPosition = new Coordinate(0, 0)
    this.startPosition = new Coordinate(0, 0)
    this.visitedCoordinates = new Set<string>([this.currentPosition.toString()])
    this.canCrossPaths = canCrossPaths
    this.pathsHaveCrossed = false
  }

  getDistance(): number {
    return rectilinearDistance(this.startPosition, this.currentPosition)
  }

  move(instruction: string): void {
    // TODO: Validation of input.

    if (!this.canCrossPaths && this.pathsHaveCrossed) {
      throw new Error("Paths have been crossed.")
    }

    const turn = instruction.slice(0, 1)
    const distance = parseInt(instruction.slice(1))

    this.orientation = compassTurn(this.orientation, turn)

    let i = 0
    while ((this.canCrossPaths || !this.pathsHaveCrossed) && i < distance) {
      switch (this.orientation) {
        case 0:
          this.currentPosition.y++
          break
        case 1:
          this.currentPosition.x++
          break
        case 2:
          this.currentPosition.y--
          break
        case 3:
          this.currentPosition.x--
          break
        default:
          throw new Error(`Unrecognised orientation: ${this.orientation}.`)
      }

      if (!this.visitedCoordinates.has(this.currentPosition.toString())) {
        this.visitedCoordinates.add(this.currentPosition.toString())
      } else {
        this.pathsHaveCrossed = true
      }
      i++
    }
  }
}

export default StreetGridCalculator
