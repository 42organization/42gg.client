import type { NextApiRequest, NextApiResponse } from 'next';

// type ISlotInfo = {
// 	slotId: number;
// 	time: string;
// 	isMatched: boolean;
// 	myTeam: string[];
// 	enemyTeam: string[];
//   };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const slot: any = [];

  for (let i = 0; i < 24; i++) {
    const hour = 10 + i / 4;
    const minute = String((i % 4) * 15);

    slot.push({
      slotId: i,
      time: '2023-02-20 ' + hour + ':' + minute + ':00',
      isMatched: false,
      myTeam: [],
      enemyTeam: [],
    });
  }
  res.status(200).json(slot);
}
