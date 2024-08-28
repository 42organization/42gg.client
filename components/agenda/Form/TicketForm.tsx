import { useState } from 'react';
import { MenuItem, Select } from '@mui/material';
import DescriptionInput from 'components/agenda/Input/DescriptionInput';
import SelectInput from 'components/agenda/Input/SelectInput';
import TitleInput from 'components/agenda/Input/TitleInput';
import { useModal } from 'components/agenda/modal/useModal';
import useFetchGet from 'hooks/agenda/useFetchGet';
import useFetchRequest from 'hooks/agenda/useFetchRequest';
import styles from 'styles/agenda/Form/Form.module.scss';

interface userFormProps {
  stringKey: string;
}
interface dataType {
  userIntraId: string;
  userContent: string;
  userGithub: string;
  userLocation: string;
}

const TicketForm = ({ stringKey }: userFormProps) => {
  const { closeModal } = useModal();
  const sendRequest = useFetchRequest().sendRequest;
  const agendaList = useFetchGet('admin/list').data || [];
  const [selectedAgendaKey, setSelectedAgendaKey] = useState('');

  const handleSelectChange = (e: { target: { value: any } }) => {
    setSelectedAgendaKey(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const jsonData: any = {};

    formData.forEach((value, key) => {
      jsonData[key] = value;
    });

    jsonData.issuedFromKey = selectedAgendaKey;

    console.log('data', jsonData);
    sendRequest(
      'POST',
      'admin/ticket',
      jsonData,
      { intraId: stringKey },
      () => {
        closeModal();
      },
      (error: string) => {
        console.error(error);
      }
    );
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      className={styles.container}
    >
      <div className={styles.modalContainer}>
        <div className={styles.label_title}>IntraId : {stringKey}</div>
        <Select
          value={selectedAgendaKey}
          onChange={handleSelectChange}
          displayEmpty
        >
          <MenuItem value='' disabled>
            Choose an agenda...
          </MenuItem>
          {Array.isArray(agendaList) &&
            agendaList.map((agenda) => (
              <MenuItem key={agenda.agendaKey} value={agenda.agendaKey}>
                {agenda.agendaTitle}
              </MenuItem>
            ))}
        </Select>
      </div>

      <div className={styles.buttonContainer}>
        <button
          type='button'
          onClick={(e) => {
            e.preventDefault();
            closeModal();
          }}
          className={`${styles.formBtn} ${styles.cancel}`}
        >
          취소
        </button>
        <button type='submit' className={`${styles.formBtn} ${styles.submit}`}>
          수정
        </button>
      </div>
    </form>
  );
};

export default TicketForm;
