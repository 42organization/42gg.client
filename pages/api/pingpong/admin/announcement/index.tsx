import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const CONTENT =
    '<h3><strong>42GG 서비스시간 확장</strong></h3><p><br></p><p>42GG 서비스를 사용할 수 있는 시간이 기존 14시~17시에서 24시간 사용 가능하도록 변경되었습니다!!</p><p><br></p><p>많은 이용 부탁드려요!</p><p>1/26 ~ (9기 입학날)까지 진행됩니다!</p><p><br></p><p>다들 재미있게 즐겨주세요!</p><p><br></p>';

  if (req.method === 'GET') {
    res.status(200).json({
      content: CONTENT,
      text: 'get ok',
    });
  } else if (req.method === 'POST') {
    res.status(201).json({ text: 'post ok' });
    console.log('post body :\n', req?.body.content);
  } else if (req.method === 'DELETE') {
    res.status(202).json({ text: ' delete ok' });
  }
}
