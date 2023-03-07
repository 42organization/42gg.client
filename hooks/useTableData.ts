import { useCallback, useEffect, useRef, useState } from 'react';
import { TableName } from 'types/admin/tableTypes';
import {
  IFeedback,
  IFeedbackTable,
  IUser,
  IUserTable,
} from 'types/admin/tableTypes';
import instance from 'utils/axios';
import { AxiosResponse } from 'axios';

export default function useTableData({
  format,
  currentPage = 1,
  intraId,
}: {
  format: TableName;
  currentPage?: number;
  intraId?: string;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [rawDataList, setRawDataList] = useState<(IFeedback | IUser)[]>([]);
  const totalPage = useRef<number>(1);

  const getUserInfo = useCallback(
    async (intraId?: string) => {
      try {
        setLoading(false);
        const res: AxiosResponse<IUserTable> = intraId?.length
          ? await instance.get(
              `pingpong/admin/users?q=${intraId}&page=${currentPage}`
            )
          : await instance.get(
              `pingpong/admin/users?page=${currentPage}&size=10`
            );
        setRawDataList(
          res.data.userSearchAdminDtos.map((value: IUser) => {
            return {
              id: value.id,
              intraId: value.intraId,
              statusMessage: value.statusMessage,
              roleType: value.roleType,
            };
          })
        );
        totalPage.current = res.data.totalPage;
        setLoading(true);
      } catch (err) {
        console.error('MS99');
        setLoading(false);
      }
    },
    [currentPage]
  );

  const getFeedbackList = useCallback(
    async (intraId?: string) => {
      try {
        setLoading(false);
        const res: AxiosResponse<IFeedbackTable> = intraId?.length
          ? await instance.get(
              `/pingpong/admin/feedback/users?q=${intraId}&page=${currentPage}&size=10`
            )
          : await instance.get(
              `/pingpong/admin/feedback?page=${currentPage}&size=10`
            );
        setRawDataList(
          res.data.feedbackList.map((feedback: IFeedback) => {
            return {
              id: feedback.id,
              intraId: feedback.intraId,
              category: feedback.category,
              content: feedback.content,
              createdTime: feedback.createdTime,
              isSolved: feedback.isSolved,
            };
          })
        ); // ! immutable
        totalPage.current = res.data.totalPage;
        setLoading(true);
      } catch (err) {
        console.error('MS98');
        setLoading(false);
      }
    },
    [currentPage]
  );

  useEffect(() => {
    const fetchData = async () => {
      if (format === 'userInfo') await getUserInfo(intraId);
      if (format === 'feedback') await getFeedbackList(intraId);
    };
    fetchData();
  }, [currentPage, intraId]);

  return {
    rawDataList,
    currentPage,
    totalPage,
    loading,
  };
}
