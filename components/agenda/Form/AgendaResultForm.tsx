import React, { useState, useEffect, useRef } from 'react';
import styles from 'styles/agenda/Form/AgendaResultForm.module.scss';
import dragStyles from 'styles/agenda/utils/draggable.module.scss';
import { AddElementBtn, DragBtn, RemoveElementBtn } from '../button/Buttons';
import SelectInput from '../Input/SelectInput';

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
    { award: '그저그런상', teams: ['cider', 'dumpling'] },
    { award: '대상', teams: [] },
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

  useEffect(() => {
    const Form = document.querySelector('form');
    if (!Form) return;
    console.log('useEffect');
    Form.addEventListener('dragstart', handleDragStart);
    Form.addEventListener('dragend', handleDragEnd);
    Form.addEventListener('dragover', handleDragOver);
    Form.addEventListener('dragenter', handleDragEnter);
    Form.addEventListener('dragleave', handleDragLeave);
    Form.addEventListener('drop', handleDrop);
    return () => {
      Form.removeEventListener('dragstart', handleDragStart);
      Form.removeEventListener('dragend', handleDragEnd);
      Form.removeEventListener('dragover', handleDragOver);
      Form.removeEventListener('dragenter', handleDragEnter);
      Form.removeEventListener('dragleave', handleDragLeave);
      Form.removeEventListener('drop', handleDrop);
    };
  }, [awardList]);

  let dragging: HTMLElement | null = null;
  const handleDragStart = (e: DragEvent) => {
    dragging = e.target as HTMLElement;
    dragging.classList.add(dragStyles.dragging);
    const dropzone = Array.from(
      document.getElementsByClassName(dragStyles.dropzone)
    );
    dropzone.length &&
      dropzone.forEach((el) => {
        el.classList.add(dragStyles.dropzoneColor);
      });
    return;
  };
  const handleDragEnd = (e: DragEvent) => {
    console.log('dragend');
    e.preventDefault();
    const dropzone = Array.from(
      document.getElementsByClassName(dragStyles.dropzone)
    );
    dropzone.length &&
      dropzone.forEach((el) => {
        el.classList.remove(dragStyles.dropzoneColor);
        el.classList.remove(dragStyles.hovered);
      });
  };
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    return;
  };
  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    const li =
      e.target && e.target instanceof HTMLElement
        ? e.target.closest('li')
        : null;
    if (li && li.classList.contains(dragStyles.dropzone)) {
      console.log('hover');
      li.classList.add(dragStyles.hovered);
    }
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    const li = e.target && e.target instanceof HTMLLIElement ? e.target : null;
    if (li && li.classList.contains(dragStyles.hovered)) {
      console.log('leave');
      li.classList.remove(dragStyles.hovered);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    dragging?.classList.remove(dragStyles.dragging);
    let target = e.target;
    console.log('drop', e.target);
    if (
      e.target &&
      e.target instanceof HTMLElement &&
      !e.target.classList.contains(dragStyles.dropzone)
    ) {
      target = e.target.closest(`.${dragStyles.dropzone}`);
    }
    if (
      !target ||
      !(target instanceof HTMLElement) ||
      !target.classList.contains(dragStyles.dropzone)
    )
      if (!target) return;
    reorderAwardList(target as HTMLElement);
    dragging = null;
    return target;
  };

  const reorderAwardList = (target: HTMLElement) => {
    console.log(target && target.getAttribute('id'));
    const key = target ? parseInt(target.getAttribute('id') || '0') - 1 : -2;
    const draggingKey = dragging
      ? parseInt(dragging.getAttribute('id') || '0') - 1
      : -2;

    console.log(key, draggingKey);
    if (key === -2 || draggingKey === -2 || key === draggingKey) return;
    const newAwardlist: awardType[] = [];
    console.log(awardList);
    awardList.forEach((award, idx) => {
      if (key === -1 && idx === -1) newAwardlist.push(awardList[draggingKey]);
      if (idx !== draggingKey) newAwardlist.push(awardList[idx]);
      if (idx === key && key !== -1) {
        newAwardlist.push(awardList[draggingKey]);
      }
    });
    console.log(newAwardlist);
    setAwardList(newAwardlist);
  };

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
                console.log(e.target);
              }}
            />
            <div className={styles.awardContainer} key={`${award_idx}`}>
              <div className={styles.awardTitleContainer}>
                <p key={`${award_idx}`} className={styles.awardTitle}>
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
                  console.log(e);
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
