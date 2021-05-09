class LabeledEdgeGraph {
  protected vertices: string[]
  protected edges: Map<string, [number, number]>
  currentNode: number

  constructor() {
    this.vertices = []
    this.edges = new Map()
    this.currentNode = 0
  }

  addVertex(name: string) {
    this.vertices.push(name)
  }

  addEdge(name: string, from_: number, to: number) {
    this.edges.set(name, [from_, to])
  }

  traverseEdge(name: string) {
    const fromTo = this.edges.get(this.currentNode.toString(10) + name)
    if (fromTo === undefined) {
      return
    }
    this.currentNode = fromTo[1]
  }
}

export default LabeledEdgeGraph
