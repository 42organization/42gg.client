import React from 'react';
import { Modal, Box } from '@mui/material';
import { CalendarFormData } from 'types/calendar/formType';
import { calendarModalProps } from 'types/calendar/modalTypes';
import { useCalendarModal } from 'utils/calendar/useCalendarModal';
import {
  CalendarClassification,
  CalendarEventTag,
} from 'constants/calendar/calendarConstants';
import { CalendarForm } from 'components/calendar/CalendarForm';
import { useUser } from 'hooks/agenda/Layout/useUser';
import { useCalendarCreate } from 'hooks/calendar/useCalendarCreate';

export const PublicScheduleUpsertModal = ({ schedule }: calendarModalProps) => {
  const { closeModal } = useCalendarModal();
  const { createCalendar } = useCalendarCreate();
  const intraId = useUser()?.intraId;

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
    await createCalendar(data);
    closeModal();
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
