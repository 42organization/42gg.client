const SAD_EMOJI = '(｡•́︿•̀｡)' + ' ';
const HAPPY_EMOJI = '¡¡¡( •̀ ᴗ •́ )و!!!' + ' ';

export const PURCHASE_ALERT_MESSAGE = {
  COMMON: {
    ITEM_ERROR: SAD_EMOJI + '해당 아이템이 없습니다.',
    OUTDATED_ERROR: SAD_EMOJI + '지금은 구매할 수 없는 아이템입니다.',
    COIN_ERROR: SAD_EMOJI + 'GG코인이 부족합니다.',
    KAKAO_USER_ERROR: SAD_EMOJI + '카카오 유저는 상점을 이용할 수 없습니다.',
  },
  BUY: {
    SUCCESS: HAPPY_EMOJI + '구매 완료',
    USER_ERROR: 'USER NOT FOUND',
  },
  GIFT: {
    EMPTY_RECIPIENT: SAD_EMOJI + '선물할 유저를 선택해주세요.',
    RECIPIENT_ERROR: SAD_EMOJI + '선물하려는 유저가 없습니다',
    KAKAO_RECIPIENT_ERROR: SAD_EMOJI + '카카오 유저에게는 선물할 수 없습니다.',
  },
};
