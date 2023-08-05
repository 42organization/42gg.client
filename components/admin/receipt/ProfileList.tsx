import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import PageNation from 'components/Pagination';
import { useMockAxiosGet } from 'hooks/useAxiosGet';
import { getFormattedDateToString } from 'utils/handleTime';
import { tableFormat } from 'constants/admin/table';
import { modalState } from 'utils/recoil/modal';
import {
  Iprofile,
  IprofileInfo,
  IprofileTable,
} from 'types/admin/adminReceiptType';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Image from 'next/image';

const profileTableTitle: { [key: string]: string } = {
  profileId: 'ID',
  date: '사용일자',
  intraId: '사용자',
  imageUrl: '현재 이미지',
  delete: '삭제',
};

const tableColumnName = ['profileId', 'data', 'intraId', 'imageUrl', 'delete'];

function ProfileList() {
  const [profileData, setProfileData] = useState<IprofileTable>({
    profileList: [],
    totalPage: 0,
    currentPage: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);

  // 특정 유저 확성기 사용내역만 가져오는 api 추가되면 handler + 유저 검색 컴포넌트 추가

  // api 연결 시 useCallback, instanceInManage, try catch로 변경
  const getProfileHandler = useMockAxiosGet<any>({
    url: `/admin/images?page=${currentPage}&size=5`,
    setState: (data) => {
      setProfileData({
        profileList: data.profileList.map((profile: Iprofile) => {
          const { year, month, date, hour, min } = getFormattedDateToString(
            new Date(profile.date)
          );
          return {
            ...profile,
            date: `${year}-${month}-${date} ${hour}:${min}`,
          };
        }),
        totalPage: data.totalPage,
        currentPage: currentPage,
      });
    },
    err: 'HJ04',
    type: 'setError',
  });

  const setModal = useSetRecoilState(modalState);

  const deleteProfile = (profileInfo: IprofileInfo) => {
    setModal({
      modalName: 'ADMIN-PROFILE_DELETE',
      profileInfo: profileInfo,
    });
  };

  useEffect(() => {
    getProfileHandler();
  }, [currentPage]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label='customized table'>
          <TableHead>
            <TableRow>
              {tableColumnName.map((columnName, idx) => (
                <TableCell key={idx}>{profileTableTitle[columnName]}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {profileData.profileList.length > 0 ? (
              profileData.profileList.map((profile: Iprofile) => (
                <TableRow key={profile.profileId}>
                  {tableFormat['profileList'].columns.map(
                    (columnName: string, index: number) => {
                      return (
                        <TableCell key={index}>
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
                  <TableCell>
                    <button
                      onClick={() => {
                        deleteProfile({
                          profileId: profile.profileId,
                          intraId: profile.intraId,
                          imageUrl: profile.imageUrl,
                        });
                      }}
                    >
                      삭제
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>비어있습니다</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
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
