// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Game, Games, Team } from "../../../../types/gameTypes";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Games>
) {
  const kipark: Team = {
    userId: "kipark",
    userImageUri: "imageUrl",
    wins: 1,
    losses: 2,
    winRate: 60,
    pppChange: 20,
    isWin: true,
    score: 3,
  };
  const jibae: Team = {
    userId: "jiba22ewqe",
    userImageUri: "imageUrl",
    wins: 4,
    losses: 2,
    winRate: 50,
    pppChange: 20,
    isWin: false,
    score: 2,
  };

  const sujpark: Team = {
    userId: "sujpark",
    userImageUri: "imageUrl",
    wins: 14,
    losses: 12,
    winRate: 630,
    pppChange: 210,
    isWin: true,
    score: 2,
  };
  const jabae: Team = {
    userId: "jabae",
    userImageUri: "imageUrl",
    wins: 1,
    losses: 1,
    winRate: 70,
    pppChange: 220,
    isWin: false,
    score: 0,
  };

  const game1: Game = {
    matchId: 1,
    time: "12시 30분",
    status: "end",
    type: "단식",
    team1: kipark,
    team2: jibae,
  };

  const game2: Game = {
    matchId: 2,
    time: "12시 30분",
    status: "end",
    type: "단식",
    team1: sujpark,
    team2: jabae,
  };
  const game3: Game = {
    matchId: 3,
    time: "12시 30분",
    status: "end",
    type: "단식",
    team1: sujpark,
    team2: jabae,
  };
  const game4: Game = {
    matchId: 4,
    time: "12시 30분",
    status: "end",
    type: "단식",
    team1: sujpark,
    team2: jabae,
  };

  const obj: Games = [game1, game2, game3, game4];
  res.status(200).json(obj);
}
