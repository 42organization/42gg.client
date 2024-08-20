import { instanceInAgenda } from 'utils/axios';

const SubmitAgendaForm = async (
  e: React.FormEvent<HTMLFormElement>,
  stringKey?: string,
  closeModal?: () => void
) => {
  e.preventDefault();

  const data = new FormData(e.target as HTMLFormElement);
  if (!data) return;

  const formatDate = (key: string) => {
    const value = data.get(key);
    if (value) {
      data.set(key, `${value}:00`);
    }
  };

  formatDate('agendaStartTime');
  formatDate('agendaEndTime');
  formatDate('agendaDeadLine');

  const isRankingKey = data.get('agendaStatus')
    ? 'isRanking'
    : 'agendaIsRanking';
  data.set(isRankingKey, data.get(isRankingKey) === 'on' ? 'true' : 'false');

  if (data.get('isSolo') === 'on') {
    data.set('agendaMaxPeoPle', '1');
    data.set('agendaMinPeoPle', '1');
  }
  for (const key of data.keys()) {
    console.log(key, data.get(key));
  }

  if (document.getElementsByClassName('error_text').length > 0) {
    alert('입력값을 확인해주세요.');
    console.log(document.getElementsByClassName('error'));
    return;
  }
  const poster = data.get('agendaPoster') as File;
  if (poster.size > 1024 * 1024) {
    alert('파일 사이즈가 너무 큽니다.');
    return;
  }
  if (
    poster.size != 0 &&
    poster.type !== 'image/jpeg' &&
    poster.type !== 'image/jpg'
  ) {
    alert('jpg, jpeg 파일만 업로드 가능합니다.');
    return;
  }

  // URL 설정
  let url = '/request';
  if (stringKey) {
    data.set('isOfficial', data.get('isOfficial') === 'on' ? 'true' : 'false');
    url = `/admin/request?agenda_key=${stringKey}`;
  }

  // 데이터 전송
  try {
    const res = await instanceInAgenda.post(url, data);
    if (res.status === 204) {
      closeModal();
    }
    console.log(res);
  } catch (err) {
    console.error(err);
  }
};

export default SubmitAgendaForm;
