import { useEffect, useState } from 'react';
import { tableFormat } from 'constants/admin/table';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useMockAxiosGet } from 'hooks/useAxiosGet';
import PageNation from 'components/Pagination';
import { getFormattedDateToString } from 'utils/handleTime';
import { useSetRecoilState } from 'recoil';
import {
  Imegaphone,
  ImegaphoneInfo,
  ImegaphoneTable,
} from 'types/admin/adminReceiptType';
import { modalState } from 'utils/recoil/modal';

const megaPhoneTableTitle: { [key: string]: string } = {
  megaphoneId: 'ID',
  usedAt: '시간',
  intraId: '사용자',
  content: '내용',
  status: '상태',
  delete: '삭제',
};

const tableColumnName = [
  'megaphoneId',
  'usedAt',
  'intraId',
  'content',
  'status',
  'delete',
];

function MegaphoneList() {
  const [megaphoneData, setMegaphoneData] = useState<ImegaphoneTable>({
    megaphoneList: [],
    totalPage: 0,
    currentPage: 0,
  });

  const [currentPage, setCurrentPage] = useState<number>(1);

  // 특정 유저 확성기 사용내역만 가져오는 api 추가되면 handler 추가

  // api 연결 시 useCallback, instanceInManage, try catch로 변경
  const getMegaphoneHandler = useMockAxiosGet<any>({
    url: `/admin/megaphones/history?page=${currentPage}&size=10`,
    setState: (data) => {
      setMegaphoneData({
        megaphoneList: data.megaphoneList.map((megaphone: Imegaphone) => {
          const { year, month, date, hour, min } = getFormattedDateToString(
            new Date(megaphone.usedAt)
          );
          return {
            ...megaphone,
            usedAt: `${year}-${month}-${date} ${hour}:${min}`,
          };
        }),
        totalPage: data.totalPage,
        currentPage: currentPage,
      });
    },
    err: 'HJ03',
    type: 'setError',
  });

  const setModal = useSetRecoilState(modalState);

  const deleteMegaphone = (megaphoneInfo: ImegaphoneInfo) => {
    setModal({
      modalName: 'ADMIN-MEGAPHONE_DELETE',
      megaphoneInfo: megaphoneInfo,
    });
  };

  useEffect(() => {
    getMegaphoneHandler();
  }, [currentPage]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label='customized table'>
          <TableHead>
            <TableRow>
              {tableColumnName.map((column, idx) => (
                <TableCell key={idx}>{megaPhoneTableTitle[column]}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {megaphoneData.megaphoneList.length > 0 ? (
              megaphoneData.megaphoneList.map((megaphone: Imegaphone) => (
                <TableRow key={megaphone.megaphoneId}>
                  {tableFormat['megaphoneList'].columns.map(
                    (columnName: string, index: number) => {
                      return (
                        <TableCell key={index}>
                          {megaphone[columnName as keyof Imegaphone].toString()}
                        </TableCell>
                      );
                    }
                  )}
                  <TableCell>
                    <button
                      onClick={() =>
                        deleteMegaphone({
                          megaphoneId: megaphone.megaphoneId,
                          content: megaphone.content,
                          intraId: megaphone.intraId,
                        })
                      }
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
          curPage={megaphoneData.currentPage}
          totalPages={megaphoneData.totalPage}
          pageChangeHandler={(pageNumber: number) => {
            setCurrentPage(pageNumber);
          }}
        />
      </div>
    </>
  );
}

export default MegaphoneList;
