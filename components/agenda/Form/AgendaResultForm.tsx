import { MouseEvent, useState, useRef } from 'react';
import styles from 'styles/agenda/Form/AgendaResultForm.module.scss';
import { AddElementBtn, DragBtn, RemoveElementBtn } from '../button/Buttons';
import SelectInput from '../Input/SelectInput';

interface AgendaResultFormProps {
  teamlist: string[];
}

const AgendaResultForm = ({ teamlist }: AgendaResultFormProps) => {
  const [awardlist, setAwardList] = useState<string[]>([
    '참가상',
    '아기다리상',
    '대상',
    '그저그런상',
  ]);
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
      <ul className={styles.awardUl}>
        {awardlist?.map((award, idx) => (
          <li key={idx} className={styles.awardLi}>
            <DragBtn onClick={(e) => alert('DEV::dragbutton called', e)} />
            <div className={styles.awardContainer}>
              <div className={styles.awardTitleContainer}>
                <p key={idx} className={styles.awardTitle}>
                  {award}
                </p>
                <RemoveElementBtn
                  onClick={(e) => alert('DEV::removebtn called', e)}
                />
              </div>
              {/* <select>
              {teamlist.map((team, idx) => (
                <option key={idx}>{team}</option>
                ))}
                </select> */}
              <SelectInput data={teamlist} message='팀을 선택해주세요' />
            </div>
          </li>
        ))}
        <li className={styles.awardLi}>
          <div className={styles.awardContainer}>
            <div className={styles.awardTitleContainer}>
              <input
                className={styles.newAwardInput}
                id='newAwardInput'
                ref={newAwardInputRef}
                type='text'
                placeholder='추가할 상을 입력해주세요...'
              />
              <AddElementBtn
                onClick={(e) => alert('DEV::addbutton called', e)}
              />
            </div>
            <SelectInput data={teamlist} message='팀을 선택해주세요' />
          </div>
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
