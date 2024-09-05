import { useState } from 'react';
import AgendaSelect from 'components/agenda/Input/AgendaSelect';
import { useModal } from 'components/agenda/modal/useModal';
import useFetchGet from 'hooks/agenda/useFetchGet';
import useFetchRequest from 'hooks/agenda/useFetchRequest';
import styles from 'styles/agenda/Form/Form.module.scss';

interface userFormProps {
  stringKey: string;
}

const TicketForm = ({ stringKey }: userFormProps) => {
  const { closeModal } = useModal();
  const sendRequest = useFetchRequest().sendRequest;
  const agendaList = useFetchGet({ url: 'admin/list' }).data || [];
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
        <div className={styles.label}>발급처</div>
        <p className={styles.description}>
          발급처를 선택하지 않으면 <span>42Intra</span> 로 발급됩니다.
        </p>
        <AgendaSelect
          selectedKey={selectedAgendaKey}
          dataList={agendaList}
          handleSelectChange={handleSelectChange}
          defaultSelect='42Intra'
        />
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
