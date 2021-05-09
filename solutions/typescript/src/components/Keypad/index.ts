import LabeledEdgeGraph from "../common/graph"

class Keypad extends LabeledEdgeGraph {
  public code: string

  constructor() {
    super()
    this.code = ""

    for (let i = 1; i <= 9; i++) {
      this.addVertex(i.toString(10))
    }
    this.addEdge("0R", 0, 1)
    this.addEdge("0D", 0, 3)

    this.addEdge("1L", 1, 0)
    this.addEdge("1R", 1, 2)
    this.addEdge("1D", 1, 4)

    this.addEdge("2L", 2, 1)
    this.addEdge("2D", 2, 5)

    this.addEdge("3U", 3, 0)
    this.addEdge("3D", 3, 6)
    this.addEdge("3R", 3, 4)

    this.addEdge("4U", 4, 1)
    this.addEdge("4R", 4, 5)
    this.addEdge("4D", 4, 7)
    this.addEdge("4L", 4, 3)

    this.addEdge("5U", 5, 2)
    this.addEdge("5D", 5, 8)
    this.addEdge("5L", 5, 4)

    this.addEdge("6U", 6, 3)
    this.addEdge("6R", 6, 7)

    this.addEdge("7L", 7, 6)
    this.addEdge("7U", 7, 4)
    this.addEdge("7R", 7, 8)

    this.addEdge("8U", 8, 5)
    this.addEdge("8L", 8, 7)
  }

  press() {
    this.code += this.vertices[this.currentNode]
  }
}

export default Keypad
