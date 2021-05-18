class LabeledEdgeGraph {
  currentNode: number
  protected vertices: string[]
  protected edges: Map<string, [number, number]>

  constructor(buttonMatrix: string[][]) {
    this.vertices = []
    this.edges = new Map()
    this.currentNode = 0

    for (let y = 0; y < buttonMatrix.length; y++) {
      for (let x = 0; x < buttonMatrix[y].length; x++) {
        this.addVertex(buttonMatrix[y][x])
        const fromIndex = y * buttonMatrix.length + x

        if (y > 0 && buttonMatrix[y - 1][x] !== null) {
          const toIndex = (y - 1) * buttonMatrix.length + x
          this.addEdge("U", fromIndex, toIndex)
        }
        if (y < buttonMatrix.length - 1 && buttonMatrix[y + 1][x] !== null) {
          const toIndex = (y + 1) * buttonMatrix.length + x
          this.addEdge("D", fromIndex, toIndex)
        }
        if (x > 0 && buttonMatrix[y][x - 1] !== null) {
          const toIndex = y * buttonMatrix.length + x - 1
          this.addEdge("L", fromIndex, toIndex)
        }
        if (x < buttonMatrix[y].length - 1 && buttonMatrix[y][x + 1] !== null) {
          const toIndex = y * buttonMatrix.length + x + 1
          this.addEdge("R", fromIndex, toIndex)
        }
      }
    }
    console.log(this.edges)
  }

  addVertex(name: string) {
    this.vertices.push(name)
  }

  addEdge(name: string, from_: number, to: number) {
    this.edges.set(`${from_}${name}`, [from_, to])
  }

  traverseEdge(name: string) {
    const fromTo = this.edges.get(this.currentNode.toString(10) + name)
    if (fromTo === undefined) {
      // console.debug(`Couldn't follow edge ${name}`)
      return
    }
    this.currentNode = fromTo[1]
  }
}

export default LabeledEdgeGraph
