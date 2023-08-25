import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Iprofile, IprofileTable } from 'types/admin/adminReceiptType';
import { instanceInManage } from 'utils/axios';
import { getFormattedDateToString } from 'utils/handleTime';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
import { tableFormat } from 'constants/admin/table';
import AdminSearchBar from 'components/admin/common/AdminSearchBar';
import PageNation from 'components/Pagination';
import styles from 'styles/admin/usageHistory/ProfileList.module.scss';

const profileTableTitle: { [key: string]: string } = {
  profileId: 'ID',
  date: '사용일자',
  intraId: '사용자',
  imageUri: '현재 이미지',
  delete: '삭제',
};

const tableColumnName = ['profileId', 'date', 'intraId', 'imageUri', 'delete'];

function ProfileList() {
  const [profileData, setProfileData] = useState<IprofileTable>({
    profileList: [],
    totalPage: 0,
    currentPage: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [intraId, setIntraId] = useState<string>('');
  const [modal, setModal] = useRecoilState(modalState);
  const setSnackBar = useSetRecoilState(toastState);

  const initSearch = useCallback((intraId?: string) => {
    setIntraId(intraId || '');
    setCurrentPage(1);
  }, []);

  const getUserProfileHandler = useCallback(async () => {
    try {
      const res = await instanceInManage.get(
        `/images?intraId=${intraId}&page=${currentPage}&size=5`
      );
      setProfileData({
        profileList: res.data.profileList.map((profile: Iprofile) => {
          const { year, month, date, hour, min } = getFormattedDateToString(
            new Date(profile.date)
          );
          return {
            ...profile,
            date: `${year}-${month}-${date} ${hour}:${min}`,
          };
        }),
        totalPage: res.data.totalPage,
        currentPage: currentPage,
      });
    } catch (e: unknown) {
      setSnackBar({
        toastName: 'get user profile',
        severity: 'error',
        message: `API 요청에 문제가 발생했습니다.`,
        clicked: true,
      });
    }
  }, [intraId, currentPage]);

  const getAllProfileHandler = useCallback(async () => {
    try {
      const res = await instanceInManage.get(
        `/images?&page=${currentPage}&size=5`
      );
      setProfileData({
        profileList: res.data.profileList.map((profile: Iprofile) => {
          const { year, month, date, hour, min } = getFormattedDateToString(
            new Date(profile.date)
          );
          return {
            ...profile,
            date: `${year}-${month}-${date} ${hour}:${min}`,
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

  const deleteProfile = (profile: Iprofile) => {
    setModal({
      modalName: 'ADMIN-PROFILE_DELETE',
      profile: profile,
    });
  };

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
          <TableHead className={styles.tableHeader}>
            <TableRow>
              {tableColumnName.map((columnName, idx) => (
                <TableCell className={styles.tableHeaderItem} key={idx}>
                  {profileTableTitle[columnName]}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className={styles.tableBody}>
            {profileData.profileList.length > 0 ? (
              profileData.profileList.map((profile: Iprofile) => (
                <TableRow className={styles.tableRow} key={profile.profileId}>
                  {tableFormat['profileList'].columns.map(
                    (columnName: string, index: number) => {
                      return (
                        <TableCell className={styles.tableBodyItem} key={index}>
                          {columnName === 'imageUri' ? (
                            <Image
                              src={profile[columnName]}
                              width={30}
                              height={30}
                              alt='ProfileImage'
                            />
                          ) : (
                            profile[columnName as keyof Iprofile].toString()
                          )}
                        </TableCell>
                      );
                    }
                  )}
                  <TableCell className={styles.tableBodyItem}>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => deleteProfile(profile)}
                    >
                      삭제
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className={styles.tableBodyItem}>
                <TableCell className={styles.tableBodyItem}>
                  비어있습니다
                </TableCell>
              </TableRow>
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

export default ProfileList;
