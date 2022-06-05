import MatchBoard from "./MatchBoard";

export default function MatchBoardList() {
  const startHour = 9;
  const interval = 10;
  const type = "single";
  const matchBoards = [
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
  ];

  return (
    <div>
      {matchBoards.map((matchSlots, i) => (
        <div key={i}>
          {startHour + i}
          <MatchBoard type={type} interval={interval} matchSlots={matchSlots} />
        </div>
      ))}
    </div>
  );
}
