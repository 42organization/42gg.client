import { MouseEvent, useState, useRef } from 'react';
import styles from 'styles/agenda/Form/AgendaResultForm.module.scss';

interface AgendaResultFormProps {
  teamlist: string[];
}

const AgendaResultForm = ({ teamlist }: AgendaResultFormProps) => {
  const [awardlist, setAwardList] = useState<string[]>(['참가상']);
  const newAwardInputRef = useRef<HTMLInputElement>(null);

  const addEventHandler = (e: MouseEvent<HTMLLabelElement>) => {
    e.preventDefault();
    alert(newAwardInputRef.current?.value);
    const input: string | undefined = newAwardInputRef.current?.value;
    newAwardInputRef.current ? (newAwardInputRef.current.value = '') : null;
    input ? awardlist.push(input) : null;
    awardlist && input ? setAwardList(awardlist) : null;
  };

  return (
    <div className={styles.container}>
      <h1>결과 입력</h1>
      <h2 className={styles.description}>팀별 결과를 입력해주세요</h2>
      <ul>
        {awardlist?.map((award, idx) => (
          <li key={idx}>
            <p key={idx}>{award}</p>
            <select>
              {teamlist.map((team, idx) => (
                <option key={idx}>{team}</option>
              ))}
            </select>
          </li>
        ))}
        <li>
          <input
            className={styles.newAwardInput}
            id='newAwardInput'
            ref={newAwardInputRef}
            type='text'
            placeholder='추가할 상을 알려주세요..'
          />
          <label
            htmlFor='newAwardInput'
            onClick={(e: MouseEvent<HTMLLabelElement>) => {
              addEventHandler(e);
            }}
          >
            add
          </label>
        </li>
      </ul>
      {/* <button
        onClick={() => {
          awardlist.push('test');
          setAwardList(awardlist);
        }}
      >
        test
      </button> */}
    </div>
  );
};

export default AgendaResultForm;
