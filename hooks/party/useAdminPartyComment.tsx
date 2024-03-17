import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { PartyCommentReport } from 'types/partyTypes';
import { instance } from 'utils/axios';
import { toastState } from 'utils/recoil/toast';

export function useAdminPartyCommentReport() {
  const setSnackBar = useSetRecoilState(toastState);

  const { data } = useQuery({
    queryKey: 'PartyCommentReport',
    queryFn: () =>
      instance
        .get('/party/admin/reports/comments')
        .then(({ data }: { data: PartyCommentReport[] }) => data),
    onError: () => {
      setSnackBar({
        toastName: 'GET request',
        message: '방 신고를 가져오는데 실패했습니다.',
        severity: 'error',
        clicked: true,
      });
    },
  });

  return {
    commentReports: data ?? [], // undefind 대신 []을 이용해 에러 처리
  };
}
