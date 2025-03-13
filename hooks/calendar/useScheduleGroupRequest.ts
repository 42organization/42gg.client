import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { ScheduleGroup } from 'types/calendar/groupType';
import { instanceInCalendar } from 'utils/axios';

const useScheduleGroupRequest = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const sendGroupRequest = async <T>(
    method: 'POST' | 'DELETE' | 'PUT',
    url: string,
    body: ScheduleGroup,
    onSuccess?: (data: T) => void,
    onError?: (error: string) => void
  ) => {
    try {
      const res = await instanceInCalendar.request({
        method,
        url,
        data: body,
      });

      setStatus(res.status);

      if (res.status >= 200 && res.status < 300) {
        if (onSuccess) {
          onSuccess(res.data || null);
        }
        if (res.data) {
          setData(res.data);
        }
        queryClient.invalidateQueries('scheduleGroup');
        queryClient.invalidateQueries('schedule');
        return res.data;
      }
    } catch (error) {
      setError('request error');
      console.error(error);
      if (onError) {
        onError('request error');
      }
    }
  };

  return {
    data,
    status,
    error,
    sendGroupRequest,
  };
};

export default useScheduleGroupRequest;
