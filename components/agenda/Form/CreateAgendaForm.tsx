// import { is } from 'cypress/types/bluebird';
import { useState } from 'react';
import { Slider } from '@mui/material';
import CheckboxInput from 'components/agenda/Input/CheckboxInput';
import DescriptionInput from 'components/agenda/Input/DescriptionInput';
import ImageInput from 'components/agenda/Input/ImageInput';
import TimeInput from 'components/agenda/Input/TimeInput';
import TitleInput from 'components/agenda/Input/TitleInput';
import styles from 'styles/agenda/Form/Form.module.scss';
import SelectInput from '../Input/SelectInput';

interface CreateAgendaFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function parseDate(a: Date, b: Date): string {
  if (a.getTime() > b.getTime()) {
    return '0일';
  }
  const time = b.getTime() - a.getTime();
  if (time / 1000 / 60 / 60 / 24 >= 1) {
    return `${Math.ceil(time / 1000 / 60 / 60 / 24 / 1)}일 ${
      Math.ceil(time / 1000 / 60 / 60 / 1) % 24
    }시간`;
  } else if (time / 1000 / 60 / 60 >= 1)
    return `${Math.ceil(time / 1000 / 60 / 60)}시간`;
  else {
    return `${Math.ceil(time / 1000 / 60)}분`;
  }
}

const CreateAgendaForm = ({ handleSubmit }: CreateAgendaFormProps) => {
  const minDistance = 10;

  // 날짜 초기화
  const today = new Date();
  const tommorrow = new Date(); // 기준값으로 사용
  tommorrow.setDate(today.getDate() + 1);
  tommorrow.setHours(0);
  tommorrow.setMinutes(0);
  tommorrow.setMilliseconds(0);
  const startDate = new Date();
  const endDate = new Date();
  startDate.setDate(tommorrow.getDate() + 3);
  endDate.setDate(tommorrow.getDate() + 7);

  // 상태 초기화
  // 데드라인
  const [recruitEnd, setRecruitEnd] = useState<Date>(tommorrow);
  // 대회 기간
  const [dateRange, setDateRange] = useState<Date[]>([startDate, endDate]);
  // 날짜 경고 메시지
  const [dateWarn, setDateWarn] = useState<string[]>(['', '']);
  const [teamLimit, setTeamLimit] = useState<number[]>([10, 50]);
  const [peopleLimit, setPeopleLimit] = useState<number[]>([3, 5]);
  const [isSolo, setIsSolo] = useState<boolean>(false);

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
    // console.log('activeThumb unused', activeThumb); // unused error
    setPeopleLimit(newValue as number[]);
  };
  const handleRecruitEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWarning = '';
    if (!e.target.value) return;
    const newEnd = new Date(e.target.value);
    // console.log(newEnd.getTime(), tommorrow.getTime());
    // if (newEnd.getTime() < tommorrow.getTime()) {
    //   newWarning = '내일 이후의 날짜를 선택해주세요';
    // } else if (newEnd.getTime() > dateRange[0].getTime()) {
    //   newWarning = '시작일 이전의 날짜를 선택해주세요';
    // } else {
    //   newWarning = '';
    // }
    // setDateWarn([newWarning, dateWarn[1]]);
    checkWarn(newEnd, 0);
    setRecruitEnd(new Date(e.target.value));
  };

  const handleIsSolo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setIsSolo(true);
    else if (!e.target.checked) setIsSolo(false);
  };
  const handleDateRangeMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    const newWarn = '';
    const newMax = new Date(e.target.value);
    // if (newMax.getTime() > dateRange[1].getTime()) {
    //   newWarn = '종료일 이전의 날짜를 선택해주세요';
    //   console.log(newMax, dateRange[1]);
    // } else if (newMax.getTime() < recruitEnd.getTime()) {
    //   newWarn = '마감일 이후의 날짜를 선택해주세요';
    // } else newWarn = '';
    // setDateWarn([dateWarn[0], newWarn]);
    checkWarn(newMax, 1);
    setDateRange([new Date(e.target.value), dateRange[1]]);
  };
  const handleDateRangeMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    const newWarn = '';
    const newMax = new Date(e.target.value);
    // if (newMax.getTime() < dateRange[0].getTime()) {
    //   newWarn = '시작일 이후의 날짜를 선택해주세요';
    // }
    // setDateWarn([dateWarn[0], newWarn]);
    checkWarn(newMax, 2);
    setDateRange([dateRange[0], new Date(e.target.value)]);
  };

  function checkWarn(newDate: Date, index: number) {
    const newWarning = [...dateWarn];
    const DateValues = [recruitEnd, dateRange[0], dateRange[1]];
    DateValues[index] = newDate;
    if (DateValues[0].getTime() < tommorrow.getTime()) {
      newWarning[0] = '내일 이후의 날짜를 선택해주세요';
    } else if (
      DateValues[0].getTime() > DateValues[1].getTime() ||
      DateValues[0].getTime() > DateValues[2].getTime()
    ) {
      newWarning[0] = '대회 진행일 이전의 날짜를 선택해주세요';
    } else {
      newWarning[0] = '';
    }
    if (DateValues[1].getTime() < tommorrow.getTime()) {
      newWarning[1] = '내일 이후의 날짜를 선택해주세요';
    } else if (DateValues[1].getTime() > DateValues[2].getTime()) {
      newWarning[1] = '종료일보다 시작일이 뒤에 있습니다.';
    } else if (DateValues[1].getTime() < DateValues[0].getTime()) {
      newWarning[1] = '모집 마감일 이후의 날짜를 선택해주세요';
    } else {
      newWarning[1] = '';
    }
    if (DateValues[2].getTime() < tommorrow.getTime()) {
      newWarning[2] = '내일 이후의 날짜를 선택해주세요.';
    } else if (DateValues[2].getTime() < DateValues[1].getTime()) {
      newWarning[2] = '시작일보다 이전 날짜입니다.';
    } else if (DateValues[2].getTime() < DateValues[0].getTime()) {
      newWarning[2] = '모집일보다도 이전 날짜입니다.';
    } else {
      newWarning[2] = '';
    }
    setDateWarn(newWarning);
  }

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      className={styles.container}
    >
      <TitleInput
        name='agendaTitle'
        label='제목'
        placeholder='제목을 입력해주세요'
      />
      <DescriptionInput
        name='agendaContent'
        label='설명'
        placeholder='설명을 입력해주세요'
      />
      <div className={styles.topContainer}>
        <div className={styles.label_container}>
          <h3 className={styles.label}>모집마감까지 </h3>
          <h3 className={`${styles.label} ${styles.highlight}`}>
            {parseDate(recruitEnd, today)}
          </h3>
        </div>
        <div className={styles.dateContainer}>
          <TimeInput
            name='agendaDeadLine'
            error={dateWarn[0]}
            label=''
            onChange={handleRecruitEnd}
            defaultDate={recruitEnd}
          />
        </div>
      </div>
      <div className={styles.topContainer}>
        <div className={styles.label_container}>
          <h3 className={styles.label}>진행 기간</h3>
          <h3 className={`${styles.label} + ${styles.highlight}`}>
            {parseDate(dateRange[0], dateRange[1])}
          </h3>
        </div>
        <div className={styles.inputContainer}>
          <TimeInput
            name='agendaStartTime'
            label='시작일'
            error={dateWarn[1]}
            defaultDate={dateRange[0]}
            onChange={handleDateRangeMin}
          />
          <TimeInput
            name='agendaEndTime'
            label='종료일'
            error={dateWarn[2]}
            defaultDate={dateRange[1]}
            onChange={handleDateRangeMax}
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
          <input
            style={{ display: 'none' }}
            name='agendaMinTeam'
            value={teamLimit[0]}
            readOnly
          />
          <input
            style={{ display: 'none' }}
            name='agendaMaxTeam'
            value={teamLimit[1]}
            readOnly
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
          <input
            style={{ display: 'none' }}
            name='agendaMinPeople'
            value={peopleLimit[0]}
            readOnly
          />
          <input
            style={{ display: 'none' }}
            name='agendaMaxPeople'
            value={peopleLimit[1]}
            readOnly
          />
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <ImageInput name='agendaPoster' label='포스터 파일 첨부하기' />
      </div>
      <div className={styles.bottomContainer}>
        <SelectInput
          name='agendaLocation'
          label='대회 장소'
          options={['SEOUL', 'GYEONGSAN', 'MIX']}
        />
      </div>
      <div className={styles.bottomContainer}>
        <CheckboxInput name='agendaIsRanking' label='대회 유무' />
        {/* <input type='checkbox' name='agendaIsRanking' id='agendaIsRanking' /> */}
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.buttonContainer}>
          {/* <SubmitInputBtn name='cancel' label='취소하기' />{' '} */}
          {/*새로만들어야 함*/}
          {/* <SubmitInputBtn name='submit' label='팀 만들기' /> */}
          <button type='submit'>팀 만들기</button>
        </div>
      </div>
    </form>
  );
};

export default CreateAgendaForm;
