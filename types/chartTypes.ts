export interface GraphValue {
  date: string;
  count: number;
}

export interface Graph {
  graphName: string;
  graphData: GraphValue[];
}

export interface Graphs {
  graphs: Graph[];
}
