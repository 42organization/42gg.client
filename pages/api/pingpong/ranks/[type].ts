// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { rankData } from "../../../types/rankTypes";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<rankData>
) {
  const obj = {
    myRank: 3,
    rankList: [
      {
        rank: 1,
        userId: "daekim1",
        ppp: 100,
        statusMessage: "오늘은 무슨 일이 생길까?",
        winRate: 1
      },
      {
        rank: 2,
        userId: "daekim2",
        ppp: 90,
        statusMessage: "어느새 6월이 시작되었고",
        winRate: 1
      },
      {
        rank: 3,
        userId: "daekim3",
        ppp: 80,
        statusMessage: "날씨도 여름이 다 되었고",
        winRate: 1
      },
      {
        rank: 4,
        userId: "daekim4",
        ppp: 70,
        statusMessage: "우리 팀원들도 너무 좋고",
        winRate: 1
      },
      {
        rank: 5,
        userId: "daekim5",
        ppp: 60,
        statusMessage: "하루하루가 즐겁고 행복하고",
        winRate: 1
      },
      {
        rank: 6,
        userId: "daekim6",
        ppp: 42,
        statusMessage: "그러니 공부 열심히 해야지!",
        winRate: 1
      }
    ]
  };
  res.status(200).json(obj);
}
