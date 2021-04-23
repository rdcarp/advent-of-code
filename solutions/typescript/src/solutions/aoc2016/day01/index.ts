import { commaSeparatedList, loadInput } from "../../../utils"
import { StreetGridCalculator } from "../../../components"

const solution = function () {
  const input_ = loadInput(2016, 1)
  const instructions = commaSeparatedList(input_)
  const x = new StreetGridCalculator()

  instructions.map((i) => x.move(i.trim()))

  console.log(`Distance to ${x.currentPosition.toString()}: ${x.getDistance()}`)

  return x.getDistance()
}

const solution2 = function () {
  const input_ = loadInput(2016, 1)
  const instructions = commaSeparatedList(input_)
  const x = new StreetGridCalculator(false)

  for (let i = 0; i < instructions.length; i++) {
    x.move(instructions[i].trim())
    if (x.pathsHaveCrossed) {
      console.log(`First revisited position is ${x.getDistance()} away.`)
      break
    }
  }
}

export { solution }
export { solution2 }
