import React from 'react';
import { EventSchedule, JobSchedule } from 'types/calendar/scheduleTypes';
import usePublicScheduleRequest from 'hooks/calendar/usePublicScheduleRequest';

const exampleEvent: EventSchedule = {
  classification: 'EVENT',
  eventTag: 'ETC',
  author: 'seykim',
  title: 'EVENT test',
  content: 'string',
  link: 'string',
  startTime: '2025-01-06T06:28:46.655Z',
  endTime: '2025-01-10T06:28:46.655Z',
};

const exampleJob: JobSchedule = {
  classification: 'JOB_NOTICE',
  jobTag: 'SHORTS_INTERN',
  techTag: 'FRONT_END',
  author: 'seykim',
  title: 'JOB test',
  content: 'test',
  link: 'string',
  startTime: '2025-01-10T06:28:46.655Z',
  endTime: '2025-01-15T06:28:46.655Z',
};

const Home = () => {
  const {
    mutate: mutateEvent,
    isLoading: isEventLoading,
    isError: isEventError,
    isSuccess: isEventSuccess,
    error: eventError,
  } = usePublicScheduleRequest<any>();

  const {
    mutate: mutateJob,
    isLoading: isJobLoading,
    isError: isJobError,
    isSuccess: isJobSuccess,
    error: jobError,
  } = usePublicScheduleRequest<any>();

  const handleEventSubmit = () => {
    mutateEvent({
      url: '/public/event', // 이벤트 URL
      data: exampleEvent,
    });
  };

  const handleJobSubmit = () => {
    mutateJob({
      url: '/public/job', // 직무 URL
      data: exampleJob,
    });
  };

  return (
    <div>
      <div>
        <button onClick={handleEventSubmit} disabled={isEventLoading}>
          {isEventLoading ? 'Posting Event...' : 'Add Event'}
        </button>
        {isEventError && <p>Error: {eventError?.message}</p>}
        {isEventSuccess && <p>Event added successfully!</p>}
      </div>
      <div>
        <button onClick={handleJobSubmit} disabled={isJobLoading}>
          {isJobLoading ? 'Posting Job...' : 'Add Job'}
        </button>
        {isJobError && <p>Error: {jobError?.message}</p>}
        {isJobSuccess && <p>Job added successfully!</p>}
      </div>
    </div>
  );
};

export default Home;
