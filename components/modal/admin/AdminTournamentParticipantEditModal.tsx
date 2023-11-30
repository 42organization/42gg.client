import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Button } from '@mui/material';
import { instanceInManage } from 'utils/axios';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
import TournamentSearchBarGroup from 'components/admin/tournament/TournamentSearchBarGroup';
import styles from 'styles/admin/modal/AdminTournamentParticipantEditModal.module.scss';

export default function AdminTournamentParticipantEditModal(props: {
  tournamentId: number;
}) {
  const MAX_LENGTH = 30;
  const setModal = useSetRecoilState(modalState);
  const setSnackBar = useSetRecoilState(toastState);

  return (
    <div className={styles.whole}>
      <h2>참가자 수정</h2>
      <div className={styles.hr}></div>
      <TournamentSearchBarGroup />
      <ul>
        <li>
          jincpark
          <Button variant='outlined' color='error'>
            삭제
          </Button>
        </li>
      </ul>
      <div className={styles.buttonGroup}>
        <Button variant='outlined'>취소</Button>
      </div>
    </div>
  );
}
