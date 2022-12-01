import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Challenge } from 'types/modalTypes';
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

export default function MatchChallengeModal({ slotId, type }: Challenge) {
  const setError = useSetRecoilState(errorState);
  const setModal = useSetRecoilState(modalState);
  const setReloadMatch = useSetRecoilState(reloadMatchState);
  const enrollResponse: { [key: string]: string } = {
    SUCCESS: '경기가 성공적으로 등록되었습니다.',
    SC001: '경기 등록에 실패하였습니다.',
    E0001: '경기 등록에 실패하였습니다.',
  };
  const selectCancelResponse: { [key: string]: string } = {
    E0001: '잘못된 요청입니다.',
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
      intraId: 'intraID22',
      nick: 'nickname2',
      imageUrl: fallBack,
      detail: '상세 정보2',
    },
    {
      intraId: 'intraID3',
      nick: 'nickname3',
      imageUrl: fallBack,
      detail: '상세 정보3',
    },
  ]);
  const [clickReloadChallenge, setClickReloadChallenge] = useState(false);
  const [spinReloadButton, setSpinReloadButton] = useState(false);

  const getOpponents = async () => {
    try {
      const res = await instance.get(`/pingpong/match/opponent`);
      setOpponents(res?.data);
    } catch {
      setError('RJ02');
    }
  };

  useEffect(() => {
    getOpponents();
  }, []);

  useEffect(() => {
    if (clickReloadChallenge) reloadClickHandler();
  }, [clickReloadChallenge]);

  const reloadClickHandler = async () => {
    setSelectedOpponent(null);
    if (clickReloadChallenge) {
      setSpinReloadButton(true);
      getOpponents();
      setTimeout(() => {
        setSpinReloadButton(false);
        setClickReloadChallenge(false);
      }, 1000);
    }
  };

  const onEnroll = async () => {
    if (selectedOpponent === null) {
      alert('상대를 선택해 주세요!');
      return;
    }
    try {
      const body = {
        slotId,
        mode: 'challenge',
        opponent: selectedOpponent?.intraId,
      };
      await instance.post(`/pingpong/match/tables/${1}/${type}`, body);
      alert(enrollResponse.SUCCESS);
    } catch (e: any) {
      if (e.response.data.code in enrollResponse) {
        alert(enrollResponse[e.response.data.code]);
      } else {
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
      if (e.response.data.code in selectCancelResponse) {
        alert(selectCancelResponse[e.response.data.code]);
      } else {
        setModal({ modalName: null });
        setError('RJ05');
        return;
      }
    }
    setModal({ modalName: null });
    setReloadMatch(true);
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.phrase}>🏓 42gg를 이겨라 🏓</div>
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
      <div className={styles.reloadContainer}>
        <span>새로고침</span>
        <ReloadButton
          spinReloadButton={spinReloadButton}
          setClickReloadChallenge={setClickReloadChallenge}
        />
      </div>
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

interface ReloadChallengeButtonProps {
  spinReloadButton: boolean;
  setClickReloadChallenge: React.Dispatch<React.SetStateAction<boolean>>;
}

function ReloadButton({
  spinReloadButton,
  setClickReloadChallenge,
}: ReloadChallengeButtonProps) {
  return (
    <button
      className={
        spinReloadButton ? styles.spinReloadButton : styles.reloadButton
      }
      onClick={() => setClickReloadChallenge(true)}
    >
      &#8635;
    </button>
  );
}
