import React, { useState, useRef } from 'react';
import styles from 'styles/agenda/Form/AgendaResultForm.module.scss';
import dragStyles from 'styles/agenda/utils/draggable.module.scss';
import { AddElementBtn, DragBtn, RemoveElementBtn } from '../button/Buttons';
import SelectInput from '../Input/SelectInput';
import useDraggable from '../utils/useDraggable';

type awardType = {
  award: string;
  teams: string[];
};
interface AgendaResultFormProps {
  teamlist: string[];
  SubmitAgendaResult: (awardList: awardType[]) => void;
}

const AgendaResultForm = ({
  teamlist,
  SubmitAgendaResult,
}: AgendaResultFormProps) => {
  const [awardList, setAwardList] = useState<awardType[]>([
    { award: '참가상', teams: ['apple'] },
  ]);
  const newAwardInputRef = useRef<HTMLInputElement>(null);
  const defaultTeam = '팀을 선택해주세요';
  const dragging = useRef<HTMLElement | null>(null); // draggable 필요한거

  const addTeam = (
    idx: number,
    e: React.ChangeEvent<HTMLSelectElement>,
    selected: boolean
  ) => {
    if (!selected) return;
    const newTeam = e.target.value;
    awardList[idx].teams.push(newTeam);
    e.target.value = defaultTeam;
    setAwardList([...awardList]);
  };
  const removeTeam = (idx: number, teamidx: number) => {
    awardList[idx].teams.splice(teamidx, 1);
    setAwardList([...awardList]);
  };

  const reorderAwardList = (target: HTMLElement) => {
    const key = target ? parseInt(target.getAttribute('id') || '0') - 1 : -2;
    const draggingKey = dragging.current
      ? parseInt(dragging.current.getAttribute('id') || '0') - 1
      : -2;

    if (key === -2 || draggingKey === -2 || key === draggingKey) return;
    const newAwardlist: awardType[] = [];
    awardList.forEach((award, idx) => {
      if (key === -1 && idx === 0) newAwardlist.push(awardList[draggingKey]);
      if (idx !== draggingKey) newAwardlist.push(awardList[idx]);
      if (idx === key && key !== -1) {
        newAwardlist.push(awardList[draggingKey]);
      }
    });
    setAwardList(newAwardlist);
  };

  const removeAward = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const target = (e.target as HTMLElement).closest('li');
    if (target === null) return;
    const idx = parseInt(target.getAttribute('id') || '0') - 1;
    if (idx === -1) return;
    setAwardList(awardList.filter((_, i) => i !== idx));
  };

  useDraggable({
    dragStyles,
    parentSelector: 'form',
    deps: awardList,
    callback: reorderAwardList,
    dragging: dragging,
  });

  return (
    <form className={styles.container} onSubmit={(e) => e.preventDefault()}>
      <div
        className={`${styles.titleContainer} ${dragStyles.dropzone}`}
        id={'0'}
      >
        <h1 className={styles.title}>결과 입력</h1>
        <h2 className={styles.description}>팀별 결과를 입력해주세요</h2>
      </div>
      <ul className={styles.awardUl}>
        {awardList?.map((awardInfo, award_idx) => (
          <li
            key={`${award_idx}`}
            id={`${award_idx + 1}`}
            className={`${styles.awardLi} ${dragStyles.dropzone}`}
            draggable={true}
          >
            <DragBtn
              onClick={(e) => {
                e.preventDefault();
              }}
            />
            <div className={styles.awardContainer} key={`${award_idx}`}>
              <div className={styles.awardTitleContainer}>
                <p key={`${award_idx}`} className={styles.awardTitle}>
                  {awardInfo.award}
                </p>
                <RemoveElementBtn onClick={(e) => removeAward(e)} />
              </div>
              <div className={styles.awardSelectContainer}>
                {awardInfo.teams.map((team, teamidx) => (
                  <SelectInput
                    key={teamidx}
                    selected={team}
                    options={teamlist}
                    name={`selected-team${award_idx}-${teamidx}`}
                    message='팀을 선택해주세요'
                    onChange={(e, selected) => {
                      if (!selected) removeTeam(award_idx, teamidx);
                    }}
                  />
                ))}
                <SelectInput
                  options={teamlist}
                  name={`unselected-team${award_idx}`}
                  message='팀을 선택해주세요'
                  selected=''
                  onChange={(e, selected) => {
                    addTeam(award_idx, e, selected);
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
                onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                  e.preventDefault();
                  const input = document.getElementsByClassName(
                    styles.newAwardInput
                  )[0] as HTMLInputElement;
                  const val = input.value;
                  if (val === '') return;
                  input.value = '';
                  setAwardList([...awardList, { award: val, teams: [] }]);
                }}
              />
            </div>
            <div className={styles.awardSelectContainer}></div>
          </div>
        </li>
      </ul>
      <button onClick={() => SubmitAgendaResult(awardList)}>submit</button>
    </form>
  );
};

export default AgendaResultForm;
