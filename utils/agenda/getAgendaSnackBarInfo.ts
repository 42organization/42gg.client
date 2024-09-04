/**
 * API method, url 를 통해서 Snackbar에 넣을 serverity(유형-색상), message 정의하는 함수
 */
interface SnackBarInfo {
  severity: string;
  message: string;
}

interface InfoType {
  [key: string]: {
    [key: string]: SnackBarInfo;
  };
}

export default function getAgendaSnackBarInfo(
  method: string,
  url: string
): { severity: string; message: string } {
  const parseUrl = url.split('?')[0];

  const info: InfoType = {
    post: {
      '/request': {
        severity: 'success',
        message: '아젠다가 성공적으로 생성되었습니다.',
      },
      '/announcement': {
        severity: 'success',
        message: '공지사항이 성공적으로 생성되었습니다.',
      },
      '/team': {
        severity: 'success',
        message: '팀이 성공적으로 생성되었습니다.',
      },
      '/team/join': {
        severity: 'success',
        message: '팀에 성공적으로 참가되었습니다.',
      },
      '/ticket': {
        severity: 'info',
        message: '티켓 발급이 시작되었습니다.',
      },
    },
    patch: {
      '/confirm': {
        severity: 'success',
        message: '대회가 성공적으로 확정되었습니다.',
      },
      '/cancel': {
        severity: 'info',
        message: '대회가 취소되었습니다.',
      },
      '/profile': {
        severity: 'success',
        message: '개인 프로필이 성공적으로 수정되었습니다.',
      },
      '/team': {
        severity: 'success',
        message: '팀 내용이 성공적으로 수정되었습니다.',
      },
      '/team/cancel': {
        severity: 'info',
        message: '팀이 폭파되었습니다.',
      },
      '/team/drop': {
        severity: 'info',
        message: '팀에서 나갔습니다.',
      },
      '/team/confirm': {
        severity: 'success',
        message: '팀이 성공적으로 확정되었습니다.',
      },
      '/ticket': {
        severity: 'success',
        message: '티켓 발급이 성공적으로 완료되었습니다.',
      },
    },
  };

  const result = info[method]?.[parseUrl];
  if (result) {
    return { severity: result.severity, message: result.message };
  } else {
    return { severity: 'default', message: '성공했습니다.' };
  }
}
