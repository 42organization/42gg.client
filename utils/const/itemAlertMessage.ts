const SAD_EMOJI = '(｡•́︿•̀｡)' + ' ';
const HAPPY_EMOJI = '(｡•̀ᴗ-)✧' + ' ';

export const ITEM_ALERT_MESSAGE = {
  COMMON: {
    ITEM_ERROR: SAD_EMOJI + '사용할 수 없는 아이템입니다.',
    USED_ERROR: SAD_EMOJI + '이미 사용한 아이템입니다.',
    USER_ERROR: HAPPY_EMOJI + 'USER NOT FOUND',
  },
  ID_COLOR: {
    SUCCESS: HAPPY_EMOJI + '아이디 색상이 변경되었습니다.',
    INVALID_ERROR: SAD_EMOJI + '유효하지 않은 색깔입니다.',
  },
  MEGAPHONE: {
    SUCCESS: HAPPY_EMOJI + '확성기가 등록되었습니다.',
    TIME_ERROR: SAD_EMOJI + '23:55-00:05 사이에는 확성기 사용이 불가능합니다.',
    FORMAT_ERROR: SAD_EMOJI + '확성기에는 30자 이하의 문장만 입력 가능합니다.',
    NULL_ERROR: SAD_EMOJI + '입력된 내용이 없습니다.',
  },
  EDIT_MEGAPHONE: {
    SUCCESS: HAPPY_EMOJI + '확성기가 삭제되었습니다.',
    NOT_FOUND_ERROR: SAD_EMOJI + '확성기를 찾을 수 없습니다.',
    ITEM_ERROR: SAD_EMOJI + '삭제할 수 없는 확성기입니다.',
  },
  PROFILE: {
    SUCCESS: HAPPY_EMOJI + '프로필 이미지가 변경되었습니다.',
    NULL_ERROR: SAD_EMOJI + '이미지를 선택해주세요.',
    FORMAT_ERROR:
      SAD_EMOJI + '프로필 이미지는 50KB 이하의 jpeg 파일만 업로드 가능합니다.',
  },
};
