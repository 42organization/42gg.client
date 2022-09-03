import { Button } from './Buttons';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import { useEffect } from 'react';
import { errorState } from 'utils/recoil/error';
import { expInfoState } from 'utils/recoil/expInfo';
import instance from 'utils/axios';
import styles from 'styles/modal/AfterGameModal.module.scss';

export default function ExpGameModal() {
  const [modalInfo, setModalInfo] = useRecoilState(modalState);
  const [expInfo, setExpInfo] = useRecoilState(expInfoState);
  const setErrorMessage = useSetRecoilState(errorState);

  useEffect(() => {
    getExpInfoHandler();
  }, []);

  const getExpInfoHandler = async () => {
    try {
      const res = await instance.get(
        `/pingpong/games/${modalInfo.gameId}/result`
      );
      setExpInfo(res?.data);
    } catch (e) {
      setErrorMessage('exp');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <Button
          style={styles.positive}
          value='확인'
          onClick={() => {
            setModalInfo({ modalName: null });
          }}
        />
      </div>
    </div>
  );
}
