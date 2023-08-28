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
import { dateToStringShort } from 'utils/handleTime';
import { mockInstance } from 'utils/mockAxios';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
import { tableFormat } from 'constants/admin/table';
import AdminSearchBar from 'components/admin/common/AdminSearchBar';
import {
  AdminEmptyItem,
  AdminTableHead,
} from 'components/admin/common/AdminTable';
import PageNation from 'components/Pagination';
import styles from 'styles/admin/receipt/ProfileList.module.scss';

const tableTitle: { [key: string]: string } = {
  profileId: 'ID',
  date: '사용 시간',
  intraId: '사용자',
  imageUri: '현재 이미지',
  delete: '삭제',
};

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

  // 특정 유저 확성기 사용내역만 가져오는 api 추가되면 handler 추가 + 유저 검색 컴포넌트 추가
  const initSearch = useCallback((intraId?: string) => {
    setIntraId(intraId || '');
    setCurrentPage(1);
  }, []);

  const getUserProfileHandler = useCallback(async () => {
    try {
      const res = await mockInstance.get(
        `/admin/images?intraId=${intraId}&page=${currentPage}&size=5`
      );
      setProfileData({
        profileList: res.data.profileList.map((profile: Iprofile) => {
          return {
            ...profile,
            date: dateToStringShort(new Date(profile.date)),
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

  // instanceInManage로 변경
  const getAllProfileHandler = useCallback(async () => {
    try {
      const res = await mockInstance.get(
        `/admin/images?page=${currentPage}&size=5`
      );
      setProfileData({
        profileList: res.data.profileList.map((profile: Iprofile) => {
          return {
            ...profile,
            date: dateToStringShort(new Date(profile.date)),
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
          <AdminTableHead tableName={'profileList'} table={tableTitle} />
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
                          ) : columnName === 'delete' ? (
                            <button
                              className={styles.deleteBtn}
                              onClick={() => deleteProfile(profile)}
                            >
                              삭제
                            </button>
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

export default ProfileList;
