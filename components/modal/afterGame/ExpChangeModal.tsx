import React from 'react';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import instance from 'utils/axios';
import { modalState } from 'utils/recoil/modal';
import { errorState } from 'utils/recoil/error';
import Celebration from './Celebration';
import ExpGuage from './ExpGuage';
import styles from 'styles/modal/ExpGameModal.module.scss';

export default function ExpChangeModal() {
  const [modalInfo, setModalInfo] = useRecoilState(modalState);
  const [user, setUser] = useState();
  const setErrorMessage = useSetRecoilState(errorState);

  useEffect(() => {
    getExpInfoHandler();
  }, []);

  const getExpInfoHandler = async () => {
    try {
      const res = await instance.get(
        `/pingpong/games/${modalInfo.gameId}/result`
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
              setModalInfo({ modalName: null });
            }}
          >
            <Celebration />
          </div>
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
