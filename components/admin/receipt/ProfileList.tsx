import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Iprofile, IprofileTable } from 'types/admin/adminReceiptType';
import { modalState } from 'utils/recoil/modal';
import { tableFormat } from 'constants/admin/table';
import { getFormattedDateToString } from 'utils/handleTime';
import PageNation from 'components/Pagination';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import styles from 'styles/admin/receipt/ProfileList.module.scss';
import { mockInstance } from 'utils/mockAxios';
import { toastState } from 'utils/recoil/toast';

const profileTableTitle: { [key: string]: string } = {
  profileId: 'ID',
  date: '사용일자',
  intraId: '사용자',
  imageUrl: '현재 이미지',
  delete: '삭제',
};

const tableColumnName = ['profileId', 'date', 'intraId', 'imageUrl', 'delete'];

function ProfileList() {
  const [profileData, setProfileData] = useState<IprofileTable>({
    profileList: [],
    totalPage: 0,
    currentPage: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const setModal = useSetRecoilState(modalState);
  const setSnackBar = useSetRecoilState(toastState);

  // 특정 유저 확성기 사용내역만 가져오는 api 추가되면 handler 추가 + 유저 검색 컴포넌트 추가

  // instanceInManage로 변경
  const getProfileHandler = useCallback(async () => {
    try {
      const res = await mockInstance.get(
        `/admin/images?page=${currentPage}&size=5`
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
    getProfileHandler();
  }, [currentPage]);

  return (
    <>
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
                          {columnName === 'imageUrl' ? (
                            <Image
                              src={profile[columnName]}
                              width={30}
                              height={30}
                              alt='no'
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
