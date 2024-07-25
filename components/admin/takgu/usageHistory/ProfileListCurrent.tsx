import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { Iprofile, IprofileTable } from 'types/admin/adminReceiptType';
import { instanceInManage } from 'utils/axios';
import { dateToStringShort } from 'utils/handleTime';
import { modalState } from 'utils/recoil/takgu/modal';
import { toastState } from 'utils/recoil/toast';
import { tableFormat } from 'constants/admin/table';
import AdminSearchBar from 'components/admin/takgu/common/AdminSearchBar';
import {
  AdminEmptyItem,
  AdminTableHead,
} from 'components/admin/takgu/common/AdminTable';
import PageNation from 'components/Pagination';
import styles from 'styles/admin/takgu/usageHistory/ProfileList.module.scss';

const tableTitle: { [key: string]: string } = {
  id: 'ID',
  createdAt: '변경 시간',
  userIntraId: 'Intra ID',
  imageUri: '현재 프로필 이미지',
};

function ProfileListCurrent() {
  const [profileData, setProfileData] = useState<IprofileTable>({
    profileList: [],
    totalPage: 0,
    currentPage: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [intraId, setIntraId] = useState<string>('');
  const [modal, setModal] = useRecoilState(modalState);
  const setSnackBar = useSetRecoilState(toastState);

  const errorResponse: { [key: string]: string } = {
    UR100: '존재하지 않는 유저입니다.',
  };

  const initSearch = useCallback((intraId?: string) => {
    setIntraId(intraId || '');
    setCurrentPage(1);
  }, []);

  const getUserProfileHandler = useCallback(async () => {
    try {
      const res = await instanceInManage.get(
        `/users/images/current/${intraId}?page=${currentPage}&size=5`
      );
      setProfileData({
        profileList: res.data.userImageList.map((profile: Iprofile) => {
          return {
            ...profile,
            createdAt: profile.createdAt
              ? dateToStringShort(new Date(profile.createdAt))
              : '',
          };
        }),
        totalPage: res.data.totalPage,
        currentPage: currentPage,
      });
    } catch (e: any) {
      if (e.response.data.code in errorResponse) {
        setSnackBar({
          toastName: 'get user profile',
          severity: 'error',
          message: errorResponse[e.response.data.code],
          clicked: true,
        });
      } else {
        setSnackBar({
          toastName: 'get user profile',
          severity: 'error',
          message: `API 요청에 문제가 발생했습니다.`,
          clicked: true,
        });
      }
    }
  }, [intraId, currentPage]);

  const getAllProfileHandler = useCallback(async () => {
    try {
      const res = await instanceInManage.get(
        `/users/images/current?page=${currentPage}&size=5`
      );
      setProfileData({
        profileList: res.data.userImageList.map((profile: Iprofile) => {
          return {
            ...profile,
            createdAt: profile.createdAt
              ? dateToStringShort(new Date(profile.createdAt))
              : '',
          };
        }),
        totalPage: res.data.totalPage,
        currentPage: currentPage,
      });
    } catch (e: unknown) {
      setSnackBar({
        toastName: 'get profile',
        severity: 'error',
        message: `API 요청에 문제가 발생했습니다.`,
        clicked: true,
      });
    }
  }, [currentPage]);

  useEffect(() => {
    intraId ? getUserProfileHandler() : getAllProfileHandler();
  }, [intraId, getUserProfileHandler, getAllProfileHandler, modal]);

  return (
    <>
      <div className={styles.searchWrap}>
        <AdminSearchBar initSearch={initSearch} />
      </div>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='customized table'>
          <AdminTableHead tableName={'profileListCurrent'} table={tableTitle} />
          <TableBody className={styles.tableBody}>
            {profileData.profileList.length > 0 ? (
              profileData.profileList.map((profile: Iprofile) => (
                <TableRow className={styles.tableRow} key={profile.id}>
                  {tableFormat['profileListCurrent'].columns.map(
                    (columnName: string, index: number) => {
                      return (
                        <TableCell className={styles.tableBodyItem} key={index}>
                          {columnName === 'imageUri' ? (
                            <Image
                              src={
                                profile[columnName]
                                  ? profile[columnName]
                                  : '/image/takgu/fallBackSrc.jpeg'
                              }
                              width={60}
                              height={60}
                              alt='ProfileImage'
                            />
                          ) : (
                            profile[columnName as keyof Iprofile].toString()
                          )}
                        </TableCell>
                      );
                    }
                  )}
                </TableRow>
              ))
            ) : (
              <AdminEmptyItem
                content={'프로필 변경권 사용 내역이 비어있습니다'}
              />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.pageNationContainer}>
        <PageNation
          curPage={profileData.currentPage}
          totalPages={profileData.totalPage}
          pageChangeHandler={(pageNumber: number) => {
            setCurrentPage(pageNumber);
          }}
        />
      </div>
    </>
  );
}

export default ProfileListCurrent;
