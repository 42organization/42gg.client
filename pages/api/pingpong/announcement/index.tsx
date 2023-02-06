import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const CONTENT =
    '<h3><strong>42GG 서비스시간 확장</strong></h3><p><br></p><p><strong>42GG </strong>서비스를 사용할 수 있는 시간이 기존 14시~17시에서 24시간 사용 가능하도록 변경되었습니다!!</p><p><br></p><p>많은 이용 부탁드려요!</p><p><span style="color: rgb(230, 0, 0);">1/26 ~ (9기 입학날)까지 진행됩니다!</span></p><p><br></p><p><strong>~~~~</strong></p><p><br></p><p><strong>다들 재미있게 즐겨주세요!</strong></p><p><br></p><p><a href="https://42gg.kr/" rel="noopener noreferrer" target="_blank" style="color: rgb(0, 138, 0);"><strong>https://42gg.kr/</strong></a></p><p><br></p><p><a href="https://42gg.kr/" rel="noopener noreferrer" target="_blank">바로가기</a></p>';
  const EMPTY = '';

  if (req.method === 'GET') {
    res.status(200).json({
      content: CONTENT,
      text: 'get ok',
    });
  }
}
