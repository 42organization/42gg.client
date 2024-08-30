import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req;
  const { itemId } = query as { itemId: string };

  // body: 이미지 담겨서 formData로 오는데 여기서 어떻게 조작하는지 모르겠음

  if (method === 'PUT' || method === 'DELETE') {
    if (parseInt(itemId) < 3) res.status(204).end();
    else res.status(400).end();
  }
}
