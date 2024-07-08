import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useContext } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { BsMegaphone } from 'react-icons/bs';
import { FaArrowLeft } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { IoStorefrontOutline } from 'react-icons/io5';
import { Modal } from 'types/modalTypes';
import { liveState } from 'utils/recoil/layout';
import { modalState } from 'utils/recoil/takgu/modal';
import {
  HeaderContextState,
  HeaderContext,
} from 'components/takgu/Layout/HeaderContext';
import MenuBar from 'components/takgu/Layout/MenuBar/MenuBar';
import NotiBar from 'components/takgu/Layout/NotiBar/NotiBar';
import NotiBell from 'public/image/takgu/noti_bell.svg';
import useAxiosGet from 'hooks/useAxiosGet';
import styles from 'styles/takgu/Layout/Header.module.scss';

export default function Header() {
  const router = useRouter();
  const [live, setLive] = useRecoilState(liveState);
  const HeaderState = useContext<HeaderContextState | null>(HeaderContext);
  const openMenuBarHandler = () => {
    HeaderState?.setOpenMenuBarState(!HeaderState?.openMenuBarState);
  };
  const openNotiBarHandler = () => {
    HeaderState?.setOpenNotiBarState(!HeaderState?.openNotiBarState);
    setLive((prev) => ({ ...prev, notiCount: 0 }));
  };

  useEffect(() => {
    setMenuOutsideScroll();
  }, [HeaderState?.openMenuBarState, HeaderState?.openNotiBarState]);

  const setMenuOutsideScroll = () =>
    (document.body.style.overflow =
      HeaderState?.openMenuBarState || HeaderState?.openNotiBarState
        ? 'hidden'
        : 'unset');

  const setModal = useSetRecoilState<Modal>(modalState);

  const getAnnouncementHandler = useAxiosGet<any>({
    url: '/pingpong/announcement',
    setState: (data) => {
      data.content !== '' &&
        setModal({
          modalName: 'EVENT-ANNOUNCEMENT',
          announcement: data,
          isAttended: true,
        });
    },
    err: 'RJ01',
    type: 'setError',
  });

  // 현재 경로가 뒤로 가기 버튼을 사용해야 하는 경로 패턴 중 하나와 일치하는지 확인
  const isBackButtonRoute = () => {
    const path = router.asPath.split('?')[0]; // 쿼리 스트링 제거
    const patterns = [
      /^\/party\/create$/, // '/party/create'
      /^\/party\/room$/, // '/party/[roomId]'
    ];

    return patterns.some((pattern) => pattern.test(path));
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerWrap}>
        <div className={styles.headerLeft}>
          {isBackButtonRoute() ? (
            <FaArrowLeft onClick={router.back} />
          ) : (
            <FiMenu className={styles.menuIcon} onClick={openMenuBarHandler} />
          )}
        </div>
        <Link className={styles.logoWrap} href={'/takgu'}>
          42GG
        </Link>
        <div className={styles.headerRight}>
          <div className={styles.announceIcon}>
            <Link href={'/takgu/store'}>
              <IoStorefrontOutline className={styles.storeIcon} />
            </Link>
          </div>
          <div
            className={styles.announceIcon}
            onClick={() => getAnnouncementHandler()}
          >
            <BsMegaphone className={styles.megaphoneIcon} />
          </div>
          <div className={styles.notiIconWrapper} onClick={openNotiBarHandler}>
            {live.notiCount ? (
              <div className={styles.bellWhole}>
                <div className={styles.notiBellWrapper}>
                  <div className={styles.notiCountCircle}>
                    <div className={styles.notiCount}>
                      {live.notiCount > 9 ? '9+' : live.notiCount}
                    </div>
                  </div>
                  <NotiBell className={styles.bellIcon} />
                </div>
              </div>
            ) : (
              <div className={styles.notiBellWrapper}>
                <NotiBell className={styles.bellIcon} />
              </div>
            )}
          </div>
        </div>
      </div>
      {HeaderState?.openMenuBarState && <MenuBar />}
      {HeaderState?.openNotiBarState && <NotiBar />}
    </div>
  );
}
