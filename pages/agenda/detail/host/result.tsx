//주최자 결과입력 페이지
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { ParticipantProps } from 'types/agenda/agendaDetail/tabs/participantTypes';
import { instanceInAgenda } from 'utils/axios';
import { toastState } from 'utils/recoil/toast';
import AgendaResultForm from 'components/agenda/Form/AgendaResultForm';
import { useModal } from 'components/agenda/modal/useModal';
import AgendaLoading from 'components/agenda/utils/AgendaLoading';
import useAgendaKey from 'hooks/agenda/useAgendaKey';
import useFetchGet from 'hooks/agenda/useFetchGet';
import styles from 'styles/agenda/pages/agendakey/host/result.module.scss';

interface AwardListProps {
  award: string;
  teams: string[];
  idx?: number;
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
      if (awardInfo.teams.filter((_) => _ === team).length > 1) {
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
      msg += team;
      idx + 1 < awardInfo.teams.length && (msg += ', ');
    });
    msg += '\n\n';
  });
  return msg;
}

const SubmitAgendaResult = () => {
  const router = useRouter();
  const [awardList, setAwardList] = useState<AwardListProps[]>([
    { award: '참가상', teams: [] },
  ]);
  const agenda_key = useAgendaKey();
  const setSnackbar = useSetRecoilState(toastState);
  const { openModal, closeModal } = useModal();

  const { data } = useFetchGet<{
    totalSize: number;
    content: ParticipantProps[];
  }>({
    url: `team/confirm/list`,
    isReady: Boolean(agenda_key),
    params: { agenda_key: agenda_key, size: 30, page: 1 },
  }) || {
    data: {},
    status: 400,
  };
  const teamlist: string[] = [];
  data?.content?.forEach((team) => {
    team.teamName && teamlist.push(team.teamName);
  });

  const SubmitAgendaResult = (awardList: AwardListProps[]) => {
    const Data = parseData(awardList);
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

  if (!agenda_key) {
    return <AgendaLoading />;
  }
  return (
    <div className={styles.container}>
      <AgendaResultForm
        awardList={awardList}
        setAwardList={setAwardList}
        teamlist={teamlist || []}
        SubmitAgendaResult={(e) => {
          e.preventDefault();
          SubmitAgendaResult(awardList);
        }}
      />
    </div>
  );
};

export default SubmitAgendaResult;
