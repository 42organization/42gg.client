import React, { useState, useEffect, useRef } from 'react';
import {
  AddElementBtn,
  DragBtn,
  RemoveElementBtn,
} from 'components/agenda/button/Buttons';
import SelectInput from 'components/agenda/Input/SelectInput';
import useDraggable from 'components/agenda/utils/useDraggable';
import styles from 'styles/agenda/Form/AgendaResultForm.module.scss';
import dragStyles from 'styles/agenda/utils/draggable.module.scss';

interface awardType {
  award: string;
  teams: string[];
  idx?: number;
}
interface AgendaResultFormProps {
  awardList: awardType[];
  setAwardList: (args0: awardType[]) => void;
  teamlist: string[];
  SubmitAgendaResult: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AgendaResultForm = ({
  awardList,
  setAwardList,
  teamlist,
  SubmitAgendaResult,
}: AgendaResultFormProps) => {
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
    if (awardList[idx].teams.includes(newTeam)) {
      e.target.value = defaultTeam;
      return;
    }
    awardList[idx].teams.push(newTeam);
    e.target.value = defaultTeam;
    setAwardList([...awardList]);
  };

  const modifyTeam = (idx: number, teamidx: number, newTeam: string) => {
    if (awardList[idx].teams.includes(newTeam)) {
      setAwardList([...awardList]);
      return;
    }
    awardList[idx].teams[teamidx] = newTeam;
    setAwardList([...awardList]);
  };
  const removeTeam = (idx: number, teamidx: number) => {
    awardList[idx].teams.splice(teamidx, 1);
    setAwardList([...awardList]);
  };

  const addAward = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    const input = document.getElementById('newAwardInput') as HTMLInputElement;
    const val = input.value;
    if (val === '') return;
    input.value = '';
    setAwardList([...awardList, { award: val, teams: [] }]);
  };

  const addAwardEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.key !== 'Enter') return;
    const input = document.getElementById('newAwardInput') as HTMLInputElement;
    const val = input.value;
    if (val === '') return;
    input.value = '';
    setAwardList([...awardList, { award: val, teams: [] }]);
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
    const target = e.target.closest('li');
    if (target === null) return;
    const idx = parseInt(target.getAttribute('id') || '0') - 1;
    if (idx === -1) return;
    setAwardList(awardList.filter((_, i) => i !== idx));
  };

  let modifying_award_div: HTMLDivElement | null = null;
  let modifying_award_p: HTMLParagraphElement | null = null;

  const startModifyAward = (e: Event) => {
    e.preventDefault();
    const target = e.target as HTMLParagraphElement;
    if (target === null) return;
    modifying_award_div = target.closest(`.${styles.awardTitleContainer}`);
    modifying_award_p = target.closest('p');
    if (!modifying_award_div || !modifying_award_p) return;
    const input = document.createElement('input');
    input.classList.add(styles.newAwardInput);
    input.focus();
    input.value = modifying_award_p.innerText;
    input.addEventListener('keydown', (e) => completeModifyAward(e));
    input.addEventListener('blur', (e) => cancelModifyAward(e));
    modifying_award_div.replaceChild(input, modifying_award_p);
  };

  // 수정취소
  const cancelModifyAward = (e: FocusEvent) => {
    e.preventDefault();
    if (!modifying_award_div || !modifying_award_p) return;
    modifying_award_div.replaceChild(
      modifying_award_p,
      modifying_award_div.children[1]
    );
    modifying_award_div = null;
    modifying_award_p = null;
    return;
  };

  // 수정완료
  const completeModifyAward = (e: KeyboardEvent) => {
    const target = e.target as HTMLInputElement;
    if (!target) return;
    modifying_award_div = target.closest(`.${styles.awardTitleContainer}`);
    if (!modifying_award_div || !modifying_award_p) return;
    if (e.type !== 'keydown' || e.key !== 'Enter') return;
    const idx = parseInt(modifying_award_div?.getAttribute('id') || '-2');
    if (idx === -2) return;
    const newAward = target.value;
    awardList[idx].award = newAward;
    modifying_award_p.innerText = newAward;
    setAwardList([...awardList]);
    target.blur;
    return;
  };
  useDraggable({
    dragStyles,
    parentSelector: 'form',
    deps: awardList,
    callback: reorderAwardList,
    dragging: dragging,
  });

  useEffect(() => {
    const temp = document.getElementsByClassName(styles.awardTitle);
    const arr = Array.from(temp);
    arr.forEach((p) => {
      p.addEventListener('dblclick', (e) => startModifyAward(e));
    });
    return () => {
      const temp = document.getElementsByClassName(styles.awardTitle);
      const arr = Array.from(temp);
      arr.forEach((p) => {
        p.removeEventListener('dblclick', (e) => startModifyAward(e));
      });
    };
  });

  return (
    <form className={styles.container} onSubmit={SubmitAgendaResult}>
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
              <div className={styles.awardTitleContainer} id={`${award_idx}`}>
                <p>
                  {award_idx}
                  {': '}
                </p>
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
                      else modifyTeam(award_idx, teamidx, e.target.value);
                    }}
                  />
                ))}
                <SelectInput
                  options={teamlist}
                  name={`unselected-team${award_idx}`}
                  message='팀을 선택해주세요'
                  selected=''
                  onChange={(e, selected) => {
                    if (selected) addTeam(award_idx, e, selected);
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
                onKeyUp={addAwardEnter}
              />
              <AddElementBtn onClick={addAward} />
            </div>
            <div className={styles.awardSelectContainer}></div>
          </div>
        </li>
      </ul>
      <button type='submit'>submit</button>
    </form>
  );
};

export default AgendaResultForm;
