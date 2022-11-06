import React from 'react';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import instance from 'utils/axios';
import { modalState } from 'utils/recoil/modal';
import { errorState } from 'utils/recoil/error';
import ExpGuage from './ExpGuage';
import styles from 'styles/modal/ExpGameModal.module.scss';

export default function ExpChangeModal() {
  const [modal, setModal] = useRecoilState(modalState);
  const [user, setUser] = useState();
  const setErrorMessage = useSetRecoilState(errorState);

  useEffect(() => {
    getExpHandler();
  }, []);

  const getExpHandler = async () => {
    try {
      const res = await instance.get(
        `/pingpong/games/${modal.gameId}/result/rank`
      );
      setUser(res?.data);
    } catch (e) {
      setErrorMessage('KP03');
    }
  };

  if (!user) return null;

  const {
    afterMaxExp,
    beforeExp,
    beforeLevel,
    beforeMaxExp,
    increasedExp,
    increasedLevel,
  } = user;

  return (
    <div>
      {user && (
        <div>
          <div
            className={styles.celebratContainer}
            onClick={() => {
              setModal({ modalName: null });
            }}
          ></div>
          <ExpGuage
            maxExp={beforeMaxExp}
            exp={beforeExp}
            level={beforeLevel}
            increasedExp={increasedExp}
            afterMaxExp={afterMaxExp}
            increasedLevel={increasedLevel}
          />
        </div>
      )}
    </div>
  );
}
