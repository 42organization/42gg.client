import { useState } from 'react';
import AgendaSelect from 'components/agenda/Input/AgendaSelect';
import { useModal } from 'components/agenda/modal/useModal';
import useFetchGet from 'hooks/agenda/useFetchGet';
import useFetchRequest from 'hooks/agenda/useFetchRequest';
import styles from 'styles/agenda/Form/Form.module.scss';
import CheckboxInput from '../Input/CheckboxInput';
import DateInput from '../Input/TimeInput';

interface userFormProps {
  stringKey: string;
}

const AdminTicketForm = ({ stringKey }: userFormProps) => {
  const { closeModal } = useModal();
  // const sendRequest = useFetchRequest().sendRequest;
  const agendaList = useFetchGet('admin/list').data || [];

  const [issuedFromKey, setIssuedFromKey] = useState('');
  const [usedToKey, setUsedToKey] = useState('');

  const handleissuedFrom = (e: { target: { value: any } }) => {
    setIssuedFromKey(e.target.value);
  };
  const handleusedTo = (e: { target: { value: any } }) => {
    setUsedToKey(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const jsonData: any = {};

    formData.forEach((value, key) => {
      jsonData[key] = value;
    });

    jsonData.issuedFromKey = issuedFromKey;
    jsonData.usedToKey = usedToKey;
    jsonData.isApproved = jsonData.isApproved === 'on' ? true : false;
    jsonData.isUsed = jsonData.isUsed === 'on' ? true : false;

    for (const key in jsonData) {
      console.log(key, jsonData[key]);
    }
    // sendRequest(
    //   'POST',
    //   'admin/ticket',
    //   jsonData,
    //   { intraId: stringKey },
    //   () => {
    //     closeModal();
    //   },
    //   (error: string) => {
    //     console.error(error);
    //   }
    // );
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
        <div className={styles.topContainer}>
          <div className={styles.inputContainer}>
            <h3>발급처</h3>
            <AgendaSelect
              selectedKey={issuedFromKey}
              dataList={agendaList}
              handleSelectChange={handleissuedFrom}
            />
          </div>
          <div className={styles.inputContainer}>
            <h3>사용처</h3>
            <AgendaSelect
              selectedKey={usedToKey}
              dataList={agendaList}
              handleSelectChange={handleusedTo}
            />
          </div>
          <div className={styles.bottomContainer}>
            <CheckboxInput
              name='isApproved'
              label='승인여부'
              // checked={data ? data[rankingType] : false}
            />
          </div>
          <div className={styles.bottomContainer}>
            <DateInput name='approvedAt' label='승인일' />
          </div>
          <div className={styles.bottomContainer}>
            <CheckboxInput
              name='isUsed'
              label='사용여부'
              // checked={data ? data[rankingType] : false}
            />
          </div>
          <div className={styles.bottomContainer}>
            <DateInput name='usedAt' label='사용일' />
          </div>
        </div>
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

export default AdminTicketForm;
