// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MatchData } from "./../../../../../types/matchTypes";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<MatchData>
) {
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
}
