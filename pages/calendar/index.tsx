/*
classification
eventTag
author
title
content
link
startTime
endTime
*/

import React from 'react';
import usePublicCalendar from 'hooks/calendar/usePublicCalendar';

const Home = () => {
  const mutation = usePublicCalendar();

  const handleAddEvent = () => {
    mutation.mutate({
      classification: 'EVENT',
      eventTag: 'OFFICIAL_EVENT',
      author: 'seykim',
      title: 'string',
      content: 'string',
      link: 'string',
      startTime: '2025-01-06T06:28:46.655Z',
      endTime: '2025-01-10T06:28:46.655Z',
    });
  };

  return (
    <div>
      <button onClick={handleAddEvent} disabled={mutation.isLoading}>
        {mutation.isLoading ? 'Posting...' : 'Add Event'}
      </button>
      {mutation.isError && <p>Error posting event.</p>}
      {mutation.isSuccess && <p>Event added successfully!</p>}
    </div>
  );
};

export default Home;
