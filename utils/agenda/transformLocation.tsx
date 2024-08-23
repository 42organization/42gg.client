const transformTeamLocation = (location: string) => {
  switch (location) {
    case '서울':
      return 'SEOUL';
    case '경산':
      return 'GYEONGSAN';
    case '둘다':
      return 'MIX';
    default:
      return location;
  }
};

export { transformTeamLocation };
