import { useState, useRef } from 'react';
import styles from 'styles/agenda/Form/AgendaResultForm.module.scss';
import { AddElementBtn, DragBtn, RemoveElementBtn } from '../button/Buttons';
import SelectInput from '../Input/SelectInput';

interface AgendaResultFormProps {
  teamlist: string[];
  SubmitAgendaResult: (
    awardList: {
      award: string;
      teams: string[];
    }[]
  ) => void;
}

const AgendaResultForm = ({
  teamlist,
  SubmitAgendaResult,
}: AgendaResultFormProps) => {
  const [awardList, setAwardList] = useState<
    {
      award: string;
      teams: string[];
    }[]
  >([
    { award: '참가상', teams: ['apple'] },
    { award: '그저그런상', teams: ['cider', 'dumpling'] },
    { award: '참가상', teams: [] },
  ]);
  const newAwardInputRef = useRef<HTMLInputElement>(null);
  const defaultTeam = '팀을 선택해주세요';

  const addTeam = (
    idx: number,
    e: React.ChangeEvent<HTMLSelectElement>,
    selected: boolean
  ) => {
    if (!selected) return;
    const newTeam = e.target.value;
    console.log('addTeam called', idx, newTeam);
    awardList[idx].teams.push(newTeam);
    e.target.value = defaultTeam;
    setAwardList([...awardList]);
  };
  console.log(awardList);
  const removeTeam = (idx: number, teamidx: number) => {
    console.log('removeTeam called', idx, teamidx);
    awardList[idx].teams.splice(teamidx, 1);
    setAwardList([...awardList]);
  };

  // const submit = {
  //   console.log(awardlist);
  // }

  return (
    <form className={styles.container} onSubmit={(e) => e.preventDefault()}>
      <h1 className={styles.title}>결과 입력</h1>
      <h2 className={styles.description}>팀별 결과를 입력해주세요</h2>
      <ul className={styles.awardUl}>
        {awardList?.map((awardInfo, idx) => (
          <li key={idx} className={styles.awardLi}>
            <DragBtn onClick={(e) => alert('DEV::dragbutton called' + e)} />
            <div className={styles.awardContainer}>
              <div className={styles.awardTitleContainer}>
                <p key={idx} className={styles.awardTitle}>
                  {awardInfo.award}
                </p>
                <RemoveElementBtn
                  onClick={(e) => alert('DEV::removebtn called' + e)}
                />
              </div>
              <div className={styles.awardSelectContainer}>
                {awardInfo.teams.map((team, teamidx) => (
                  <SelectInput
                    key={teamidx}
                    selected={team}
                    options={teamlist}
                    name={`selected-team${idx}-${teamidx}`}
                    message='팀을 선택해주세요'
                    onChange={(e, selected) => {
                      if (!selected) removeTeam(idx, teamidx);
                    }}
                  />
                ))}
                <SelectInput
                  options={teamlist}
                  name={`unselected-team${idx}`}
                  message='팀을 선택해주세요'
                  selected=''
                  onChange={(e, selected) => {
                    addTeam(idx, e, selected);
                  }}
                />
              </div>
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
                onClick={(e) => alert('DEV::addbutton called' + e)}
              />
            </div>
            <div className={styles.awardSelectContainer}>
              {/* <SelectInput
                options={teamlist}
                name={`unselected-team${idx}`}
                message='팀을 선택해주세요'
                onChange={(e) => {
                  addTeam(idx, e.target.value);
                }}
              /> */}
            </div>
          </div>
        </li>
      </ul>
      {/* <button
        onClick={() => {
          awardList.push('test');
          setAwardList(awardList);
        }}
      >
        test
      </button> */}
      <button onClick={() => SubmitAgendaResult(awardList)}>submit</button>
    </form>
  );
};

export default AgendaResultForm;
