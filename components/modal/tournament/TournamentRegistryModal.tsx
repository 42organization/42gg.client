import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { MdPeopleAlt } from 'react-icons/md';
import { QUILL_FORMATS } from 'types/quillTypes';
import { TournamentInfo } from 'types/tournamentTypes';
import { mockInstance } from 'utils/mockAxios';
import { modalState } from 'utils/recoil/modal';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/modal/ModalButton';
import styles from 'styles/modal/event/TournamentRegistryModal.module.scss';
import 'react-quill/dist/quill.bubble.css';


const Quill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export default function TournamentRegistryModal({
  title,
  contents,
  startTime,
  status,
  type,
  endTime,
  player_cnt,
  tournamentId,
}: TournamentInfo) {
  const setModal = useSetRecoilState(modalState);
  const [registState, setRegistState] = useState<boolean | null>(true);
  const [flag, setFlag] = useState<boolean>(false);
  const Date = startTime.toString().split(':').slice(0, 2).join(':');

  const registTournament = useCallback(() => {
    return mockInstance
      .post(`tournament/${tournamentId}/users?users=1`)
      .then((res) => {
        return res.data;
      });
  }, []);

  const getStatus = useCallback(() => {
    return mockInstance
      .get(`tournament/${tournamentId}/users?users=1`)
      .then((res) => {
        return res.data;
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const status = await getStatus();
      setRegistState(status);
    };
    fetchData();
  }, []);

  const closeModalButtonHandler = () => {
    setModal({ modalName: null });
  };

  return (
    <div className={styles.container}>
      <div className={styles.closeButtonContainer}>
        <ModalButtonContainer>
          <ModalButton
            onClick={closeModalButtonHandler}
            value='X'
            style='close'
          />
        </ModalButtonContainer>
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.tournamentInfo}>
        <div className={styles.startTime}>{Date}</div>
        <div className={styles.participants}>
          <MdPeopleAlt />
          <div className={styles.player}>{player_cnt} / 8</div>
        </div>
      </div>
      <Quill
        className={styles.quillViewer}
        readOnly={true}
        formats={QUILL_FORMATS}
        value={contents}
        theme='bubble'
      />
      <div>
        <ModalButtonContainer>
          <ModalButton
            onClick={registTournament}
            value={registState == true ? '취소' : '등록'}
            style='positive'
          />
        </ModalButtonContainer>
      </div>
    </div>
  );
}
