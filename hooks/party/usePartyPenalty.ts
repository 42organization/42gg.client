import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { PartyPenaltyAdminSubmit } from 'types/partyTypes';
import { instance, instanceInPartyManage } from 'utils/axios';
import { toastState } from 'utils/recoil/toast';

export default function usePartyPenalty(page?: number) {
  const queryClient = useQueryClient();
  const setSnackBar = useSetRecoilState(toastState);

  // POST 요청을 처리하는 뮤테이션 훅
  const createMutation = useMutation(
    (penalty: PartyPenaltyAdminSubmit) =>
      instanceInPartyManage.post('/party/admin/penalties', penalty),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('partyPenaltyAdmin'); // 쿼리 재조회
      },
    }
  );

  // PATCH 요청을 처리하는 뮤테이션 훅
  const updateMutation = useMutation(
    ({
      penaltyId,
      penalty,
    }: {
      penaltyId: number;
      penalty: PartyPenaltyAdminSubmit;
    }) =>
      instanceInPartyManage.patch(
        `/party/admin/penalties/${penaltyId}`,
        penalty
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('partyPenaltyAdmin');
      },
    }
  );

  // 페널티 목록 및 함수들 반환
  return {
    createPenalty: (penalty: PartyPenaltyAdminSubmit) =>
      createMutation.mutate(penalty),
    updatePenalty: (penaltyId: number, penalty: PartyPenaltyAdminSubmit) =>
      updateMutation.mutate({ penaltyId, penalty }),
  };
}
