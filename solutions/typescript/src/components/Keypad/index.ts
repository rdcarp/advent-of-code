import LabeledEdgeGraph from "../common/graph"

class Keypad extends LabeledEdgeGraph {
  public code: string

  constructor() {
    super([
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "9"],
    ])
    this.code = ""
  }

  press() {
    this.code += this.vertices[this.currentNode]
  }
}

export default Keypad
