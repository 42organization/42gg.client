// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MatchData } from "./../../../../../types/matchTypes";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<MatchData | object>
) {
  if (req.method === "GET") {
    const obj = {
      startTime: "09:00",
      intervalMinute: 10,
      type: "single",
      matchBoards: [
        [
          { status: "open", slotId: 0, headCount: 1 },
          { status: "close", slotId: 1, headCount: 1 },
          { status: "open", slotId: 2, headCount: 0 },
          { status: "open", slotId: 3, headCount: 1 },
          { status: "close", slotId: 4, headCount: 2 },
          { status: "open", slotId: 5, headCount: 1 },
        ],
        [
          { status: "open", slotId: 0, headCount: 1 },
          { status: "close", slotId: 1, headCount: 1 },
          { status: "open", slotId: 2, headCount: 0 },
          { status: "open", slotId: 3, headCount: 1 },
          { status: "close", slotId: 4, headCount: 2 },
          { status: "open", slotId: 5, headCount: 1 },
        ],
        [
          { status: "open", slotId: 0, headCount: 1 },
          { status: "close", slotId: 1, headCount: 1 },
          { status: "open", slotId: 2, headCount: 0 },
          { status: "open", slotId: 3, headCount: 1 },
          { status: "close", slotId: 4, headCount: 2 },
          { status: "open", slotId: 5, headCount: 1 },
        ],
        [
          { status: "open", slotId: 0, headCount: 1 },
          { status: "close", slotId: 1, headCount: 1 },
          { status: "open", slotId: 2, headCount: 0 },
          { status: "open", slotId: 3, headCount: 1 },
          { status: "close", slotId: 4, headCount: 2 },
          { status: "open", slotId: 5, headCount: 1 },
        ],
        [
          { status: "open", slotId: 0, headCount: 1 },
          { status: "close", slotId: 1, headCount: 1 },
          { status: "open", slotId: 2, headCount: 0 },
          { status: "open", slotId: 3, headCount: 1 },
          { status: "close", slotId: 4, headCount: 2 },
          { status: "open", slotId: 5, headCount: 1 },
        ],
      ],
    };
    res.status(200).json(obj);
  } else if (req.method === "POST") {
    res.status(200).json({ message: "등록이 완료되었습니다." });
  } else res.status(500).json({ message: "잘못된 요청입니다." });
}
