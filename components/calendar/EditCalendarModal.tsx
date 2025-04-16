import { Modal, Box } from '@mui/material';
import { CalendarFormData } from 'types/calendar/formType';
import { CalendarForm } from 'components/calendar/CalendarForm';

interface EditCalendarModalProps {
  open: boolean;
  initialData: CalendarFormData;
  onClose: () => void;
  onSubmit: (data: CalendarFormData) => void;
}

export const EditCalendarModal = ({
  open,
  initialData,
  onClose,
  onSubmit,
}: EditCalendarModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
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
          onSubmit={(data) => {
            onSubmit(data);
            onClose();
          }}
        />
      </Box>
    </Modal>
  );
};
