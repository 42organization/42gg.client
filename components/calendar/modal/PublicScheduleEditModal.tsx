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
// import { useCalendarEdit } from 'hooks/calendar/useCalendarEdit';

export const PublicScheduleEditModal = ({ schedule }: calendarModalProps) => {
  const { closeModal } = useCalendarModal();
  const intraId = useUser()?.intraId;
  // const { editCalendar } = useCalendarEdit();
  const { sendCalendarRequest } = useScheduleRequest();

  const initialData: Partial<CalendarFormData> = {
    id: schedule.id,
    title: schedule?.title || '',
    content: schedule?.content || '',
    classificationTag: schedule.classification as CalendarClassification,
    eventTag: schedule.eventTag as CalendarEventTag,
    jobTag: schedule.jobTag as CalendarJobTag,
    techTag: schedule.techTag as CalendarTechTag,
    link: schedule?.link || '',
    author: intraId,
    startDate: schedule?.startTime ? new Date(schedule.startTime) : new Date(),
    endDate: schedule?.endTime ? new Date(schedule.endTime) : new Date(),
  };

  const handleSubmit = async (data: CalendarFormData) => {
    if (schedule.id !== undefined) {
      const parsedData: Schedule = {
        id: data.id!,
        classification: data.classificationTag,
        eventTag: data.eventTag,
        jobTag: data.jobTag,
        techTag: data.techTag,
        author: data.author!,
        title: data.title,
        content: data.content,
        link: data.link ?? '',
        startTime: data.startDate.toISOString(),
        endTime: data.endDate.toISOString(),
      };

      await sendCalendarRequest(
        'PUT',
        `public/${schedule.id}`,
        parsedData,
        () => {
          closeModal();
        }
      );
    }
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
          mode='edit'
          initialData={initialData}
          onSubmit={handleSubmit}
        />
      </Box>
    </Modal>
  );
};
