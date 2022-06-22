import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'DELETE') {
    res.status(200).json({ message: '매칭이 취소되었습니다' });
  } else res.status(400).json({ message: '잘못된 요청입니다' });
}
