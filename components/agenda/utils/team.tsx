export function isSoloTeam(minPeople: number, maxPeople: number) {
  return maxPeople === 1 && minPeople === 1;
}
