import { useState } from 'react';
import { ITicket } from 'types/agenda/ticket/ticketTypes';
import AgendaSelect from 'components/agenda/Input/AgendaSelect';
import { useModal } from 'components/agenda/modal/useModal';
import useFetchGet from 'hooks/agenda/useFetchGet';
import useFetchRequest from 'hooks/agenda/useFetchRequest';
import styles from 'styles/agenda/Form/Form.module.scss';
import CheckboxInput from '../Input/CheckboxInput';
import DateInput from '../Input/TimeInput';

interface userFormProps {
  stringKey: string;
  data: ITicket;
  onProceed?: () => void;
}

const AdminTicketForm = ({ stringKey, data, onProceed }: userFormProps) => {
  const { closeModal } = useModal();
  const sendRequest = useFetchRequest().sendRequest;
  const agendaList = useFetchGet('admin/list').data || [];

  const [issuedFromKey, setIssuedFromKey] = useState(
    data.issuedFromKey ? data.issuedFromKey : ''
  );
  const [usedToKey, setUsedToKey] = useState(
    data.usedToKey ? data.usedToKey : ''
  );
  const [isApproved, setIsApproved] = useState(data ? data.isApproved : false);
  const [isUsed, setIsUsed] = useState(data ? data.isUsed : false);

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
    jsonData.isApproved = isApproved;
    jsonData.isUsed = isUsed;

    if (!jsonData.issuedFromKey) {
      alert('발급처는 반드시 선택해야 합니다.');
      return;
    }
    if ((jsonData.isUsed || jsonData.usedAt) && !jsonData.usedToKey) {
      alert('사용처는 반드시 선택해야 합니다.');
      return;
    }

    sendRequest(
      'PATCH',
      'admin/ticket',
      jsonData,
      { ticketId: data.ticketId },
      () => {
        onProceed && onProceed();
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
              checked={isApproved}
              onChange={(e) => setIsApproved(e.target.checked)}
            />
          </div>
          {isApproved && (
            <div className={styles.bottomContainer}>
              <DateInput
                name='approvedAt'
                label='승인일'
                defaultDate={
                  data.approvedAt ? new Date(data.approvedAt) : undefined
                }
              />
            </div>
          )}
          <div className={styles.bottomContainer}>
            <CheckboxInput
              name='isUsed'
              label='사용여부'
              checked={isUsed}
              onChange={(e) => setIsUsed(e.target.checked)}
            />
          </div>
          {isUsed && (
            <div className={styles.bottomContainer}>
              <DateInput
                name='usedAt'
                label='사용일'
                defaultDate={data.usedAt ? new Date(data.usedAt) : undefined}
              />
            </div>
          )}
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
