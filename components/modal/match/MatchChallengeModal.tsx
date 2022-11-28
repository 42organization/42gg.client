import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Enroll } from 'types/modalTypes';
import { reloadMatchState } from 'utils/recoil/match';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import instance from 'utils/axios';
import styles from 'styles/modal/MatchChallengeModal.module.scss';
import fallBack from 'public/image/fallBackSrc.jpeg';
import MatchChallengeCard from './MatchChallengeCard';
import { StaticImageData } from 'next/image';

interface Opponent {
  intraId: string;
  nick: string;
  imageUrl: StaticImageData;
  detail: string;
}

export default function MatchChallengeModal({ slotId, type, mode }: Enroll) {
  const setError = useSetRecoilState(errorState);
  const setModal = useSetRecoilState(modalState);
  const setReloadMatch = useSetRecoilState(reloadMatchState);
  const enrollResponse: { [key: string]: string } = {
    SUCCESS: '경기가 성공적으로 등록되었습니다.',
    SC001: '경기 등록에 실패하였습니다.',
    SC002: '이미 등록이 완료된 경기입니다.',
    SC003: '경기 취소 후 1분 동안 경기를 예약할 수 없습니다.',
  };

  const [selectedOpponent, setSelectedOpponent] = useState<Opponent | null>(
    null
  );
  const [opponents, setOpponents] = useState<[Opponent, Opponent, Opponent]>([
    {
      intraId: 'intraID1',
      nick: 'nickname1',
      imageUrl: fallBack,
      detail: '상세 정보1',
    },
    {
      intraId: 'donghyuk',
      nick: '42gg의 성시경',
      imageUrl: fallBack,
      detail:
        '😵‍💫 막걸리를 좋아함\n' +
        '🧨 스매싱을 날릴때 주변을 폭파함\n' +
        '그러나 오늘은 컨디션이 좋지 않음',
    },
    {
      intraId: 'intraID3',
      nick: 'nickname3',
      imageUrl: fallBack,
      detail: '상세 정보3',
    },
  ]);

  useEffect(() => {
    getOpponents();
  });

  const getOpponents = async () => {
    try {
      const res = await instance.get(`/pingpong/match/opponent`);
      setOpponents(res?.data);
    } catch {
      // setError('RJ03');
    }
  };

  const onEnroll = async () => {
    try {
      const body = { slotId: slotId, mode: mode, opponent: selectedOpponent };
      await instance.post(`/pingpong/match/tables/${1}/${type}`, body);
      alert(enrollResponse.SUCCESS);
    } catch (e: any) {
      if (e.response.data.code in enrollResponse)
        alert(enrollResponse[e.response.data.code]);
      else {
        setModal({ modalName: null });
        setError('RJ04');
        return;
      }
    }
    setModal({ modalName: null });
    setReloadMatch(true);
  };

  const onCancel = async () => {
    try {
      await instance.delete(`/pingpong/match/slots/${slotId}`);
    } catch (e: any) {
      setError('RJ05');
      return;
    }
    setModal({ modalName: null });
    setReloadMatch(true);
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.phrase}>🏓42gg를 이겨라🏓</div>
        <div>42gg 팀원 중 상대를 선택해 주세요</div>
        {opponents.map((opponent, index) => (
          <MatchChallengeCard
            opponent={opponent}
            selectedOpponent={selectedOpponent}
            setSelectedOpponent={setSelectedOpponent}
            key={index}
          />
        ))}
      </div>
      <div>새로고침</div>
      <div className={styles.buttons}>
        <div className={styles.negative}>
          <input onClick={onCancel} type='button' value='취소' />
        </div>
        <div className={styles.positive}>
          <input onClick={onEnroll} type='button' value='확인' />
        </div>
      </div>
    </div>
  );
}
