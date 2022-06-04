import MatchItem from "./MatchItem";
import { Room } from "../types/matchTypes";

export default function MatchTable() {
  const rooms: Room[] = [
    { start: "00", end: "10", headCnt: 1, headMax: 2 },
    { start: "10", end: "20", headCnt: 1, headMax: 2 },
    { start: "20", end: "30", headCnt: 0, headMax: 2 },
    { start: "30", end: "40", headCnt: 1, headMax: 2 },
    { start: "40", end: "50", headCnt: 2, headMax: 2 },
    { start: "50", end: "00", headCnt: 1, headMax: 2 },
  ];
  return (
    <div>
      {rooms.map((room, i) => (
        <MatchItem key={i} room={room}></MatchItem>
      ))}
    </div>
  );
}
