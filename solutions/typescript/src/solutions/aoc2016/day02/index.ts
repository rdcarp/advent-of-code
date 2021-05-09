import { Keypad } from "../../../components"
import { inputAsLines, loadInput } from "../../../utils"

const solution = () => {
  const input_ = loadInput(2016, 2)
  const lines = inputAsLines(input_)
  console.log(lines)
  const k = new Keypad()

  lines.map((l) => {
    Array.from(l).map((i) => k.traverseEdge(i))
    k.press()
  })

  console.log(k.code)
}

export { solution }
