import type { NextApiRequest, NextApiResponse } from 'next';
import { ChartInterface, GraphData, SingleGraph } from 'types/chartTypes';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChartInterface>
) {
  const query = req.query;

  const graphName1 = 'kipark';
  const graphData1 = [
    {
      date: '08-01',
      count: 7,
    },
    {
      date: '08-02',
      count: 3,
    },
    {
      date: '08-03',
      count: 4,
    },
    {
      date: '08-04',
      count: 10,
    },
    {
      date: '08-05',
      count: 9,
    },
    {
      date: '08-06',
      count: 11,
    },
    {
      date: '08-07',
      count: 5,
    },
  ];

  const graph1: SingleGraph = {
    graphName: graphName1,
    graphData: graphData1,
  };

  const chart: ChartInterface = {
    graphs: [graph1],
  };
  res.status(200).json(chart);
}
