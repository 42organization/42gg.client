import { useSetRecoilState } from 'recoil';
import { agendaModal } from 'types/agenda/modalTypes';
import { instanceInAgenda } from 'utils/axios';
import { toastState } from 'utils/recoil/toast';
function agendadataToMsg(data: FormData, isEdit: boolean) {
  let msg = '';
  msg += '행사 제목 : ' + data.get('agendaTitle') + '\n';
  msg += '타입: ';
  console.log(msg);
  msg += data.get('agendaIsRanking') === 'true' ? '대회' : '행사' + '\n';
  msg += '행사 내용 : ' + data.get('agendaContent') + '\n';
  msg +=
    '등록 마감 : ' +
    data.get('agendaDeadLine')?.toString().replace('T', ' ') +
    '\n';
  msg +=
    '시작 : ' +
    data.get('agendaStartTime')?.toString().replace('T', ' ') +
    '\n';
  msg +=
    '종료 : ' + data.get('agendaEndTime')?.toString().replace('T', ' ') + '\n';
  msg += '최소팀 및 최대 팀 :\n';
  msg += data.get('agendaMinTeam') + ' ~ ' + data.get('agendaMaxTeam') + '\n';
  msg += '최소팀원 및 최대팀원 : ';
  msg +=
    data.get('agendaMaxPeople') === '1'
      ? '개인참여'
      : data.get('agendaMinPeople') +
        ' ~ ' +
        data.get('agendaMaxPeople') +
        '\n';
  console.log(msg);
  msg += '개최지 : ' + data.get('agendaLocation') + '\n';
  msg += '포스터 : ';
  msg +=
    data.get('agendaPoster.name') === null
      ? '없음\n\n'
      : data.get('agendaPoster.name') + '\n\n';
  msg += isEdit ? '행사를 수정하시겠습니까?\n' : '행사를 등록하시겠습니까?\n';
  return msg;
}

const SubmitAgendaForm = async (
  e: React.FormEvent<HTMLFormElement>,
  isEdit: boolean,
  openModal: (props: agendaModal) => void,
  setSnackBar: (props: { [key: string]: string | boolean }) => void,
  isAdmin?: boolean,
  stringKey?: string,
  onProceed?: () => void
) => {
  e.preventDefault();

  const data = new FormData(e.target as HTMLFormElement);
  if (!data) return;

  let errMsg = '';
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
    data.set('agendaMaxPeople', '1');
    data.set('agendaMinPeople', '1');
  }
  data.delete('isSolo');

  // 에러 체크: 위에서부터 보이도록
  if (data.get('agendaLocation') === '선택해주세요') {
    errMsg = '개최지를 선택해주세요.\n';
    document.querySelector('select')?.focus();
  }
  const poster = data.get('agendaPoster') as File;
  if (poster.size > 1024 * 1024) {
    errMsg = '파일 사이즈가 너무 큽니다.\n';
    document.getElementById('agendaPoster')?.focus();
  }
  if (
    poster.size != 0 &&
    poster.type !== 'image/jpeg' &&
    poster.type !== 'image/jpg'
  ) {
    errMsg = 'jpg, jpeg 파일만 업로드 가능합니다.\n';
    document.getElementById('agendaPoster')?.focus();
  }
  if (document.getElementsByClassName('error_text').length > 0) {
    errMsg = '입력값을 확인해주세요.\n';
    const err = document.querySelector('input[error]') as HTMLInputElement;
    err?.focus();
  }
  if (data.get('agendaContent') === '') {
    errMsg = '행사 내용이 필요합니다.\n';
    document.getElementById('agendaContent')?.focus();
  }
  if (data.get('agendaTitle') === '') {
    errMsg = '행사 제목이 필요합니다.\n';
    document.getElementById('agendaTitle')?.focus();
  }

  // 에러 메세지 확인
  if (errMsg.length > 0) {
    setSnackBar({
      toastName: `bad request`,
      severity: 'error',
      message: `🔥 ${errMsg} 🔥`,
      clicked: true,
    });
    return;
  }

  // URL 설정
  let url = '/request';
  if (stringKey) {
    url = `/admin/request?agenda_key=${stringKey}`;
    if (isAdmin) {
      data.set(
        'isOfficial',
        data.get('isOfficial') === 'on' ? 'true' : 'false'
      );
    }
  }
  // 모달 확인
  const msg = agendadataToMsg(data, isEdit);
  openModal({
    type: 'proceedCheck',
    title: isEdit ? '행사 수정' : '행사 생성',
    description: msg,
    onProceed: () => {
      // 데이터 전송
      instanceInAgenda
        .post(url, data)
        .then((res) => {
          if (res.status === 204 || res.status === 200)
            onProceed && onProceed();
        })
        .catch((err) => {
          console.error(err);
        });
    },
  });
};

export default SubmitAgendaForm;
