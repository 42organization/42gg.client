import type { NextApiRequest, NextApiResponse } from 'next';

const ColorList = [
  'COLOR1',
  'COLOR2',
  'COLOR3',
  'COLOR4',
  'COLOR5',
  'COLOR6',
  'COLOR7',
  'COLOR8',
  'COLOR9',
  'COLOR10',
  'COLOR11',
  'COLOR12',
  'COLOR13',
  'COLOR14',
  'COLOR15',
  'COLOR16',
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const { method } = req;
  if (method === 'PATCH') {
    const idx = Math.floor(Math.random() * 15);
    const color = ColorList[idx];
    res.status(200).json(color);
  }
}
