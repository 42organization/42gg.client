//주최자 결과입력 페이지
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { ParticipantProps } from 'types/agenda/agendaDetail/tabs/participantTypes';
import { instanceInAgenda } from 'utils/axios';
import { toastState } from 'utils/recoil/toast';
import AgendaResultForm from 'components/agenda/Form/AgendaResultForm';
import { useModal } from 'components/agenda/modal/useModal';
import useFetchGet from 'hooks/agenda/useFetchGet';
import styles from 'styles/agenda/pages/agendakey/host/result.module.scss';

interface AwardListProps {
  award: string;
  teams: string[];
}

// 프론트 처리 에러
// 상은 있는데 팀이 없는 경우
// 한 팀이 여러 상을 받는 경우
// 상 안에서 같은 팀이 여러번 나오는 경우
function checkAwardSubmitable(awardList: AwardListProps[]) {
  const awardedTeams: { [key: string]: string } = {};
  awardList.forEach((awardInfo) => {
    if (awardInfo.teams.length === 0) {
      throw new Error(awardInfo.award + '상에 팀이 없습니다.');
    }
    awardInfo.teams.forEach((team, idx) => {
      if (awardedTeams[team]) {
        throw new Error(
          '한 팀이 여러 상을 받을 수 없습니다.' +
            team +
            '팀이 ' +
            awardedTeams[team] +
            ', ' +
            awardInfo.award +
            '상이 중복되어 있습니다.'
        );
      }
      const list2 = awardInfo.teams.splice(idx, 1);
      if (list2.includes(team)) {
        throw new Error(
          awardInfo.award + '상에 ' + team + '팀이 중복되어 있습니다.'
        );
      }
      awardedTeams[team] = awardInfo.award;
    });
  });
}

function parseData(awardList: AwardListProps[]) {
  const Data: {
    awardName: string;
    teamName: string;
    awardPriority: number;
  }[] = [];
  awardList.forEach((awardInfo, key) => {
    awardInfo.teams.forEach((team) => {
      Data.push({
        awardName: awardInfo.award,
        teamName: team,
        awardPriority: key,
      });
    });
  });
  return Data;
}

function awardlistToString(awardList: AwardListProps[]) {
  let msg = '';
  awardList.forEach((awardInfo, key) => {
    msg += key + '. ' + awardInfo.award + '\n';
    awardInfo.teams.forEach((team, idx) => {
      msg += '  ' + idx + '. ' + team + '\n';
    });
  });
  return msg;
}

const SubmitAgendaResult = () => {
  const { data } = useFetchGet<{
    totalSize: number;
    content: ParticipantProps[];
  }>(`team/confirm/list`, { size: 100 }) || { data: {}, status: 400 };
  const teamlist = data?.content.map((team) => team.teamName) || [];

  const router = useRouter();
  const { agendaKey: agenda_key } = router.query;
  const setSnackbar = useSetRecoilState(toastState);
  const { openModal, closeModal } = useModal();

  const SubmitAgendaResult = (
    awardList: {
      award: string;
      teams: string[];
    }[]
  ) => {
    try {
      checkAwardSubmitable(awardList);
    } catch (error: any) {
      setSnackbar({
        toastName: `bad request`,
        severity: 'error',
        message: `🔥 ${error.message} 🔥`,
        clicked: true,
      });
      return;
    }

    const Data = parseData(awardList);
    const msg = awardlistToString(awardList);
    openModal({
      type: 'proceedCheck',
      title: '결과 제출 전 확인',
      description: msg + '\n결과를 제출하시겠습니까?',
      onProceed: () => {
        instanceInAgenda
          .patch(`/confirm?agenda_key=${agenda_key}`, { awards: Data })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        closeModal();
      },
    });
  };
  return (
    <div className={styles.container}>
      <AgendaResultForm
        teamlist={teamlist}
        SubmitAgendaResult={SubmitAgendaResult}
      />
    </div>
  );
};

export default SubmitAgendaResult;
