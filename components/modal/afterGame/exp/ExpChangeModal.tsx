import React from 'react';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import instance from 'utils/axios';
import { modalState } from 'utils/recoil/modal';
import { errorState } from 'utils/recoil/error';
import ExpGuage from './ExpGuage';
import PppChange from 'components/modal/afterGame/ppp/PppChange';
import styles from 'styles/modal/ExpGameModal.module.scss';

export default function ExpChangeModal() {
  const [modal, setModal] = useRecoilState(modalState);
  const [user, setUser] = useState();
  const setError = useSetRecoilState(errorState);

  useEffect(() => {
    getExpHandler();
  }, []);

  const getExpHandler = async () => {
    try {
      const res = await instance.get(
        `/pingpong/games/${modal.exp?.gameId}/result/${modal.exp?.mode}`
      );
      setUser(res?.data);
    } catch (e) {
      setError('KP04');
    }
  };

  if (!user) return null;

  const {
    afterMaxExp,
    beforeExp,
    beforeLevel,
    beforeMaxExp,
    beforePpp,
    changedPpp,
    increasedExp,
    increasedLevel,
  } = user;

  return (
    <div>
      <div onClick={() => setModal({ modalName: null })}>
        <div className={styles.emogi}>🎉</div>
        <div className={styles.exitModal}></div>
        <PppChange
          beforePpp={beforePpp}
          changePpp={changedPpp}
          win={Math.sign(changedPpp)}
        />
        <ExpGuage
          maxExp={beforeMaxExp}
          exp={beforeExp}
          level={beforeLevel}
          increasedExp={increasedExp}
          afterMaxExp={afterMaxExp}
          increasedLevel={increasedLevel}
        />
      </div>
    </div>
  );
}
