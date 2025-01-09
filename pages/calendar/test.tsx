import React, { useState } from 'react';
import { Schedule } from 'types/calendar/scheduleTypes';
import usePublicScheduleGet from 'hooks/calendar/usePublicScheduleGet';
import usePublicScheduleRequest from 'hooks/calendar/usePublicScheduleRequest';

const Home = () => {
  const { createMutation } = usePublicScheduleRequest<Schedule>();
  const { deleteMutation } = usePublicScheduleRequest<any>();
  const { updateMutation } = usePublicScheduleRequest<Schedule>();

  //1월 한달 일정 조회
  const {
    schedule: allSchedules,
    isLoading: allIsLoading,
    isError: allIsError,
    error: allError,
  } = usePublicScheduleGet('?start=2025-01-01&end=2025-01-31');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState<Schedule | null>(null);

  const { mutate: addSchedule } = createMutation;

  const handleDeleteSubmit = (id: number) => {
    deleteMutation.mutate({ url: `/public/${id}`, data: {} });
  };

  const handleOpenModal = (schedule: Schedule) => {
    setIsModalOpen(true);
    setSelectedSchedule(schedule);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setSelectedSchedule(null);
    setCurrentSchedule(null);
  };

  const handleSave = () => {
    if (isEditing && currentSchedule) {
      updateMutation.mutate({
        url: `/public/${currentSchedule.id}`,
        data: currentSchedule,
      });
    } else {
      if (currentSchedule?.classification === 'EVENT') {
        addSchedule({ url: '/public/event', data: currentSchedule });
      } else if (currentSchedule?.classification === 'JOB_NOTICE') {
        addSchedule({ url: '/public/job', data: currentSchedule });
      }
    }
    handleCloseModal();
  };

  const scheduleFormModal = (schedule: Schedule, isEditing: boolean) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setCurrentSchedule((prev) => (prev ? { ...prev, [name]: value } : null));
    };

    return (
      <div className='modal'>
        <h2>{isEditing ? '일정 수정' : '일정 추가'}</h2>
        <label>
          제목:{' '}
          <input
            type='text'
            name='title'
            value={currentSchedule?.title || schedule.title}
            onChange={handleChange}
          />
        </label>
        <label>
          내용:{' '}
          <input
            type='text'
            name='content'
            value={currentSchedule?.content || schedule.content}
            onChange={handleChange}
          />
        </label>
        <label>
          시작:{' '}
          <input
            type='datetime-local'
            name='startTime'
            value={currentSchedule?.startTime || schedule.startTime}
            onChange={handleChange}
          />
        </label>
        <label>
          종료:{' '}
          <input
            type='datetime-local'
            name='endTime'
            value={currentSchedule?.endTime || schedule.endTime}
            onChange={handleChange}
          />
        </label>
        <label>
          링크:{' '}
          <input
            type='text'
            name='link'
            value={currentSchedule?.link || schedule.link}
            onChange={handleChange}
          />
        </label>
        <button onClick={handleSave}>{isEditing ? '완료' : '등록'}</button>
        <button onClick={handleCloseModal}>닫기</button>
      </div>
    );
  };

  const scheduleDeatailModal = (schedule: Schedule) => {
    return (
      <div className='modal'>
        <h2>일정 상세</h2>
        <p>제목: {schedule.title}</p>
        <p>내용: {schedule.content}</p>
        <p>시작: {schedule.startTime}</p>
        <p>종료: {schedule.endTime}</p>
        <p>링크: {schedule.link}</p>
        <button
          onClick={() => {
            setIsEditing(true);
            setCurrentSchedule(schedule);
          }}
        >
          수정
        </button>
        <button
          onClick={() =>
            schedule.id !== undefined && handleDeleteSubmit(schedule.id)
          }
        >
          삭제
        </button>
        <button
          onAbort={() => {
            addSchedule({ url: `/public/${schedule.id}/`, data: schedule });
          }}
        >
          개인일정에 담기
        </button>
        <button onClick={handleCloseModal}>닫기</button>
      </div>
    );
  };

  return (
    <div>
      <div>
        <h3>All Schedules</h3>
        {allIsLoading && <p>Loading schedules...</p>}
        {allIsError && <p>Error: {(allError as Error)?.message}</p>}
        {!allIsLoading && !allIsError && (
          <ul>
            {Array.isArray(allSchedules?.content) &&
            allSchedules.content.length > 0 ? (
              allSchedules.content
                .filter(
                  (schedule: Schedule) =>
                    schedule.status === 'ACTIVATE' ||
                    schedule.status === 'DEACTIVATE'
                )
                .map((schedule: Schedule, index: number) => (
                  <li key={`${schedule.startTime}-${index}`}>
                    {schedule.id}: [{schedule.classification}] {schedule.title}
                    <button onClick={() => handleOpenModal(schedule)}>
                      상세보기
                    </button>
                  </li>
                ))
            ) : (
              <p>No schedules available</p>
            )}
          </ul>
        )}
      </div>
      <button
        onClick={() => {
          setIsModalOpen(true);
          setCurrentSchedule({
            classification: 'EVENT',
            eventTag: 'JOB_FORUM',
            author: 'seykim',
            title: '',
            content: '',
            link: '',
            startTime: '',
            endTime: '',
          });
        }}
      >
        일정 추가
      </button>
      {isModalOpen &&
        (selectedSchedule && !isEditing
          ? scheduleDeatailModal(selectedSchedule)
          : scheduleFormModal(currentSchedule, isEditing))}
    </div>
  );
};

export default Home;
