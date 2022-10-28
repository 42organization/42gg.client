import type { NextApiRequest, NextApiResponse } from 'next';
import { Graphs, GraphValue, Graph } from 'types/chartTypes';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Graphs>
) {
  const query = req.query;

  const graphName = 'kipark';
  const graphData = [
    {
      date: '09-05',
      count: 7,
    },
    {
      date: '09-06',
      count: 3,
    },
    {
      date: '09-07',
      count: 4,
    },
    {
      date: '09-08',
      count: 10,
    },
    {
      date: '09-09',
      count: 9,
    },
    {
      date: '09-10',
      count: 11,
    },
    {
      date: '09-11',
      count: 5,
    },
  ];

  const graph: Graph = {
    graphName: graphName,
    graphData: graphData,
  };

  const chart: Graphs = {
    graphs: [graph],
  };
  res.status(200).json(chart);
}
