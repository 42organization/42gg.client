import React from 'react';
import { Modal, Box } from '@mui/material';
import { CalendarFormData } from 'types/calendar/formType';
import { calendarModalProps } from 'types/calendar/modalTypes';
import { Schedule } from 'types/calendar/scheduleTypes';
import { useCalendarModal } from 'utils/calendar/useCalendarModal';
import {
  CalendarClassification,
  CalendarEventTag,
  CalendarJobTag,
  CalendarTechTag,
} from 'constants/calendar/calendarConstants';
import { CalendarForm } from 'components/calendar/CalendarForm';
import { useUser } from 'hooks/agenda/Layout/useUser';
import useScheduleRequest from 'hooks/calendar/useScheduleRequest';

export const PublicScheduleUpsertModal = ({ schedule }: calendarModalProps) => {
  const { closeModal } = useCalendarModal();
  const intraId = useUser()?.intraId;
  const { sendCalendarRequest } = useScheduleRequest();

  const initialData: Partial<CalendarFormData> = {
    title: schedule?.title || '',
    content: schedule?.content || '',
    classificationTag: CalendarClassification.EVENT,
    eventTag: CalendarEventTag.OFFICIAL_EVENT,
    link: schedule?.link || '',
    author: intraId,
    startDate: schedule?.startTime ? new Date(schedule.startTime) : new Date(),
    endDate: schedule?.endTime ? new Date(schedule.endTime) : new Date(),
  };

  const handleSubmit = async (data: CalendarFormData) => {
    const parsedData: Schedule = {
      classification: data.classificationTag,
      author: data.author!,
      title: data.title,
      content: data.content,
      link: data.link ?? '',
      startTime: data.startDate.toISOString(),
      endTime: data.endDate.toISOString(),
      eventTag: data.eventTag,
      jobTag: data.jobTag,
      techTag: data.techTag,
    };

    const url =
      data.classificationTag === CalendarClassification.EVENT
        ? 'public/event'
        : 'public/job';

    await sendCalendarRequest('POST', url, parsedData, () => {
      closeModal();
    });
  };

  return (
    <Modal open={true} onClose={closeModal}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          overflowY: 'auto',
        }}
      >
        <CalendarForm
          mode='add'
          initialData={initialData}
          onSubmit={handleSubmit}
        />
      </Box>
    </Modal>
  );
};
