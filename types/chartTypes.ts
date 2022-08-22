export interface GraphData {
  date: string;
  count: number;
}

export interface SingleGraph {
  graphName: string;
  graphData: GraphData[];
}

export interface ChartInterface {
  graphs: SingleGraph[];
}
