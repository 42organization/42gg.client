// import { is } from 'cypress/types/bluebird';
import { useState } from 'react';
import { Slider } from '@mui/material';
import CheckboxInput from 'components/agenda/Input/CheckboxInput';
import DescriptionInput from 'components/agenda/Input/DescriptionInput';
import ImageInput from 'components/agenda/Input/ImageInput';
import TimeInput from 'components/agenda/Input/TimeInput';
import TitleInput from 'components/agenda/Input/TitleInput';
import styles from 'styles/agenda/Form/Form.module.scss';
import SubmitInputBtn from '../button/SubmitInputButton';

interface CreateAgendaFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function parseDate(date: Date): string {
  if (date.getTime() < 60 * 60 * 24 * 100) {
    return `${date.getHours()}시간`;
  }
  return `${date.getDate()}일`;
}

const CreateAgendaForm = ({ handleSubmit }: CreateAgendaFormProps) => {
  const minDistance = 10;

  // export default function MinimumDistanceSlider() {
  const [teamLimit, setTeamLimit] = useState<number[]>([10, 50]);
  const [peopleLimit, setPeopleLimit] = useState<number[]>([3, 5]);
  const [isSolo, setIsSolo] = useState<boolean>(false);
  const [recruitEnd, setRecruitEnd] = useState<Date>(new Date());
  const today = new Date();
  const tommorrow = new Date(today.getTime() + 60 * 60 * 24 * 100);
  const [dateRange, setDateRange] = useState<Date[]>([
    today,
    new Date(today.getTime() + 86400000),
  ]);
  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setTeamLimit([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setTeamLimit([clamped - minDistance, clamped]);
      }
    } else {
      setTeamLimit(newValue as number[]);
    }
  };
  const handleChangePeople = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    setPeopleLimit(newValue as number[]);
  };
  const handleRecruitEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    const newEnd = new Date(e.target.value);
    if (newEnd.getTime() < tommorrow.getTime()) {
      alert('내일 이후의 날짜를 선택해주세요');
      setDateRange([new Date(tommorrow), dateRange[1]]);
      return;
    }
    setRecruitEnd(new Date(e.target.value));
  };

  const handleIsSolo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setIsSolo(true);
    else if (!e.target.checked) setIsSolo(false);
  };
  const handleDateRangeMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    const newMax = new Date(e.target.value);
    if (newMax.getTime() > dateRange[1].getTime()) {
      alert('종료일 이전의 날짜를 선택해주세요');
      setDateRange([dateRange[1], dateRange[1]]);
      return;
    } else if (newMax.getTime() < tommorrow.getTime()) {
      alert('내일 이후의 날짜를 선택해주세요');
      setDateRange([new Date(tommorrow), dateRange[1]]);
      return;
    }
    setDateRange([new Date(e.target.value), dateRange[1]]);
  };
  const handleDateRangeMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    const newMax = new Date(e.target.value);
    if (newMax.getTime() < dateRange[0].getTime()) {
      alert('시작일 이후의 날짜를 선택해주세요');
      setDateRange([dateRange[0], dateRange[0]]);
      return;
    }
    setDateRange([dateRange[0], new Date(e.target.value)]);
  };
  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <TitleInput name='title' label='제목' placeholder='제목을 입력해주세요' />
      <DescriptionInput
        name='description'
        label='설명'
        placeholder='설명을 입력해주세요'
      />
      <div className={styles.topContainer}>
        <div className={styles.label_container}>
          <h3 className={styles.label}>진행 기간</h3>
          <h3 className={`${styles.label} + ${styles.highlight}`}>
            {parseDate(
              new Date(dateRange[1].getTime() - dateRange[0].getTime())
            )}
          </h3>
        </div>
        <div className={styles.inputContainer}>
          <TimeInput
            name='startDate'
            label='시작일'
            onChange={handleDateRangeMin}
          />
          <TimeInput
            name='endDate'
            label='종료일'
            onChange={handleDateRangeMax}
          />
        </div>
      </div>
      <div className={styles.topContainer}>
        <div className={styles.label_container}>
          <h3 className={styles.label}>모집마감까지 </h3>
          <h3 className={`${styles.label} ${styles.highlight}`}>
            {parseDate(new Date(recruitEnd.getTime() - today.getTime()))}
          </h3>
        </div>
        <div className={styles.dateContainer}>
          <TimeInput
            name='recruitEndDate'
            label={null}
            onChange={handleRecruitEnd}
          />
        </div>
      </div>
      <div className={styles.topContainer}>
        <div className={styles.label_container}>
          <h3 className={styles.label}>등록 가능 팀 수</h3>
          <p
            className={`${styles.label} ${styles.highlight}`}
          >{`${teamLimit[0]}팀 ~ ${teamLimit[1]}팀`}</p>
        </div>
        <div className={styles.sliderContainer}>
          <Slider
            getAriaLabel={() => 'Team Limit'}
            value={teamLimit}
            onChange={handleChange}
            valueLabelDisplay='auto'
            min={2}
            max={100}
            color={'secondary'}
            disableSwap
          />
        </div>
      </div>
      <div className={styles.topContainer}>
        <div className={styles.label_container}>
          <h3 className={styles.label}>팀당 인원 제한</h3>
          <p className={`${styles.label} + ${styles.highlight}`}>
            {isSolo ? '' : `${peopleLimit[0]}인 ~ ${peopleLimit[1]}인`}
          </p>
        </div>
        <CheckboxInput name='isSolo' label='개인' onChange={handleIsSolo} />
        <div className={styles.sliderContainer}>
          <Slider
            getAriaLabel={() => 'People Limit'}
            value={peopleLimit}
            onChange={handleChangePeople}
            valueLabelDisplay='auto'
            min={1}
            max={10}
            color={'secondary'}
            disableSwap
            disabled={isSolo}
          />
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <ImageInput name='image' label='포스터 파일 첨부하기' />
      </div>
      <div className={styles.bottomContainer}>
        <CheckboxInput name='isContest' label='대회 유무' />
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.buttonContainer}>
          <SubmitInputBtn name='cancel' label='취소하기' />{' '}
          {/*새로만들어야 함*/}
          <SubmitInputBtn name='submit' label='팀 만들기' />
        </div>
      </div>
    </form>
  );
};

export default CreateAgendaForm;
