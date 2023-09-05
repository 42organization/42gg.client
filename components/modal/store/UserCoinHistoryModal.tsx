import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { ICoin, ICoinHistoryTable } from 'types/userTypes';
import { instance } from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/modal/ModalButton';
import CoinHistoryContainer from 'components/modal/store/CoinHistoryContainer';
import PageNation from 'components/Pagination';
import CoinImage from 'components/store/CoinImage';
import styles from 'styles/modal/store/UserCoinHistoryModal.module.scss';

export default function UserCoinHistoryModal({ coin }: ICoin) {
  const setModal = useSetRecoilState(modalState);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [coinHistoryList, setCoinHistoryList] = useState<ICoinHistoryTable>({
    useCoinList: [],
    totalPage: 0,
    currentPage: 0,
  });
  const setError = useSetRecoilState(errorState);

  const closeModal = () => {
    setModal({
      modalName: null,
    });
  };

  useEffect(() => {
    getCoinHistoryList();
  }, [currentPage]);

  // 현재는 출석만 되는 상태
  const getCoinHistoryList = async () => {
    try {
      const res = await instance.get(
        `pingpong/users/coinhistory/?page=${currentPage}&size=5`
      );
      setCoinHistoryList({
        useCoinList: res.data.useCoinList,
        totalPage: res.data.totalPage,
        currentPage: currentPage,
      });
    } catch (e) {
      setError('HB06');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>GG코인 내역</div>
      <div className={styles.balance}>
        <div className={styles.current}>현재 코인</div>
        <CoinImage amount={coin} size={25} />
      </div>
      <CoinHistoryContainer useCoinList={coinHistoryList.useCoinList} />
      <div>
        <PageNation
          curPage={currentPage}
          totalPages={coinHistoryList.totalPage}
          pageChangeHandler={(pageNumber: number) => {
            setCurrentPage(pageNumber);
          }}
        />
      </div>
      <ModalButtonContainer>
        <ModalButton style='positive' value='확인' onClick={closeModal} />
      </ModalButtonContainer>
    </div>
  );
}
