import axios from 'axios';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { instanceInCalendar } from 'utils/axios';

const postEvent = async (data: {
  classification: string;
  eventTag: string;
  author: string;
  title: string;
  content: string;
  link: string;
  startTime: string;
  endTime: string;
}) => {
  console.log('받은 데이터: ', data);
  const response = await instanceInCalendar.post('/public/event', data);
  return response.data;
};

const usePublicCalendar = () => {
  return useMutation({
    mutationFn: postEvent,
    onSuccess: (data) => {
      console.log('post 성공:', data);
    },
    onError: (error) => {
      console.error('post error:', error);
    },
  });
};

export default usePublicCalendar;
