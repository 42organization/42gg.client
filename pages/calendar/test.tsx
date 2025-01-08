import React, { useState } from 'react';
import { Schedule } from 'types/calendar/scheduleTypes';
import usePublicScheduleGet from 'hooks/calendar/usePublicScheduleGet';
import usePublicScheduleRequest from 'hooks/calendar/usePublicScheduleRequest';

const Home = () => {
  const { createMutation: eventMutation } =
    usePublicScheduleRequest<Schedule>();
  const { createMutation: jobMutation } = usePublicScheduleRequest<Schedule>();
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
  const [editedSchedule, setEditedSchedule] = useState<Schedule | null>(null);

  const { mutate: addEvent } = eventMutation;
  const { mutate: addJob } = jobMutation;

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
    setEditedSchedule(null);
  };

  const handleSave = () => {
    if (isEditing && editedSchedule) {
      updateMutation.mutate({
        url: `/public/${editedSchedule.id}`,
        data: editedSchedule,
      });
    } else {
      if (editedSchedule?.classification === 'EVENT') {
        addEvent({ url: '/public/event', data: editedSchedule });
      } else if (editedSchedule?.classification === 'JOB_NOTICE') {
        addJob({ url: '/public/job', data: editedSchedule });
      }
    }
    handleCloseModal();
  };

  const scheduleFormModal = (schedule: Schedule, isEditing: boolean) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setEditedSchedule((prev) => (prev ? { ...prev, [name]: value } : null));
    };

    return (
      <div className='modal'>
        <h2>{isEditing ? '일정 수정' : '일정 추가'}</h2>
        <label>
          제목:{' '}
          <input
            type='text'
            name='title'
            value={editedSchedule?.title || schedule.title}
            onChange={handleChange}
          />
        </label>
        <label>
          내용:{' '}
          <input
            type='text'
            name='content'
            value={editedSchedule?.content || schedule.content}
            onChange={handleChange}
          />
        </label>
        <label>
          시작:{' '}
          <input
            type='datetime-local'
            name='startTime'
            value={editedSchedule?.startTime || schedule.startTime}
            onChange={handleChange}
          />
        </label>
        <label>
          종료:{' '}
          <input
            type='datetime-local'
            name='endTime'
            value={editedSchedule?.endTime || schedule.endTime}
            onChange={handleChange}
          />
        </label>
        <label>
          링크:{' '}
          <input
            type='text'
            name='link'
            value={editedSchedule?.link || schedule.link}
            onChange={handleChange}
          />
        </label>
        <button onClick={handleSave}>{isEditing ? '수정' : '추가'}</button>
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
            setEditedSchedule(schedule);
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
                //.filter((schedule: Schedule) => schedule.status === 'ACTIVE')
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
          setEditedSchedule({
            classification: 'EVENT',
            eventTag: 'ETC',
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
          : scheduleFormModal(editedSchedule, isEditing))}
    </div>
  );
};

export default Home;
