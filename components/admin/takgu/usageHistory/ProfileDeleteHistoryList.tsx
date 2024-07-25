import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
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
  createdAt: '사용 시간',
  userIntraId: 'Intra ID',
  deletedAt: '삭제 시간',
  imageUri: '삭제된 프로필 이미지',
};

function ProfileDeleteHistoryList() {
  const [profileDeleteHistoryData, setProfileDeleteHistoryData] =
    useState<IprofileTable>({
      profileList: [],
      totalPage: 0,
      currentPage: 0,
    });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [intraId, setIntraId] = useState<string>('');
  const setSnackBar = useSetRecoilState(toastState);

  const errorResponse: { [key: string]: string } = {
    UR100: '존재하지 않는 유저입니다.',
  };

  const initSearch = useCallback((intraId?: string) => {
    setIntraId(intraId || '');
    setCurrentPage(1);
  }, []);

  const getUserProfileDeleteHistoryHandler = useCallback(async () => {
    try {
      const res = await instanceInManage.get(
        `/users/delete-list/${intraId}?page=${currentPage}&size=5`
      );
      setProfileDeleteHistoryData({
        profileList: res.data.userImageList.map((profile: Iprofile) => {
          return {
            ...profile,
            createdAt: dateToStringShort(new Date(profile.createdAt)),
            deletedAt: profile.deletedAt
              ? dateToStringShort(new Date(profile.deletedAt))
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

  const getAllProfileDeleteHistoryHandler = useCallback(async () => {
    try {
      const res = await instanceInManage.get(
        `/users/delete-list?page=${currentPage}&size=5`
      );
      setProfileDeleteHistoryData({
        profileList: res.data.userImageList.map((profile: Iprofile) => {
          return {
            ...profile,
            createdAt: dateToStringShort(new Date(profile.createdAt)),
            deletedAt: profile.deletedAt
              ? dateToStringShort(new Date(profile.deletedAt))
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
    intraId
      ? getUserProfileDeleteHistoryHandler()
      : getAllProfileDeleteHistoryHandler();
  }, [
    intraId,
    getUserProfileDeleteHistoryHandler,
    getAllProfileDeleteHistoryHandler,
  ]);

  return (
    <>
      <div className={styles.searchWrap}>
        <AdminSearchBar initSearch={initSearch} />
      </div>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} aria-label='customized table'>
          <AdminTableHead tableName={'profileDeletedList'} table={tableTitle} />
          <TableBody className={styles.tableBody}>
            {profileDeleteHistoryData.profileList.length > 0 ? (
              profileDeleteHistoryData.profileList.map((profile: Iprofile) => (
                <TableRow className={styles.tableRow} key={profile.id}>
                  {tableFormat['profileDeletedList'].columns.map(
                    (columnName: string, index: number) => {
                      return (
                        <TableCell className={styles.tableBodyItem} key={index}>
                          {columnName === 'imageUri' ? (
                            <Image
                              src={profile[columnName]}
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
                content={'관리자 권한으로 삭제된 프로필 내역이 비어있습니다'}
              />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.pageNationContainer}>
        <PageNation
          curPage={profileDeleteHistoryData.currentPage}
          totalPages={profileDeleteHistoryData.totalPage}
          pageChangeHandler={(pageNumber: number) => {
            setCurrentPage(pageNumber);
          }}
        />
      </div>
    </>
  );
}

export default ProfileDeleteHistoryList;
