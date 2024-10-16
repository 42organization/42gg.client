export const formatDate = (date: Date | string) => {
  // 문자열인 경우 Date 객체로 변환
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  // 유효한 날짜인지 확인
  if (isNaN(dateObj.getTime())) {
    throw new Error('유효한 날짜 형식이 아닙니다.');
  }

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const dayName = dayNames[dateObj.getDay()];

  let hours = dateObj.getHours();
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${year}. ${month}. ${day} (${dayName}) ${String(hours).padStart(
    2,
    '0'
  )}:${minutes} ${ampm}`;
};
