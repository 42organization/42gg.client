import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CustomGroup } from 'types/calendar/customGroupType';
import { Schedule } from 'types/calendar/scheduleTypes';
import DownSVG from 'public/image/calendar/downToggle.svg';
import LinkSVG from 'public/image/calendar/linkIcon.svg';
import styles from 'styles/calendar/modal/PrivateScheduleAddModal.module.scss';
import GroupSelect from './GroupSelect';

interface PrivateScheduleAddModalProps {
  schedule: Schedule;
  onClose: () => void;
}

const defaultGroup: CustomGroup = {
  id: 1,
  title: '기본',
  backgroundColor: '#9C57BC',
};

const PrivateScheduleAddModal = ({
  schedule,
  onClose,
}: PrivateScheduleAddModalProps) => {
  const [inputLink, setInputLink] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [inputTitle, setInputTitle] = useState('');
  const [inputContent, setInputContent] = useState('');
  const [isDropdown, setIsDropdown] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<CustomGroup>(defaultGroup);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.target.value);
  };

  const handleTitleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputContent(e.target.value);
  };

  const handleContentInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = e.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLink(e.target.value);
    console.log(inputLink);
  };

  const handleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  return (
    <div className={styles.bubbleModal}>
      <div className={styles.titleContainer}>
        <input
          type='text'
          placeholder='제목을 입력하세요'
          className={styles.bigField}
          value={inputTitle}
          onChange={handleTitleChange}
          onInput={handleTitleInput}
          style={{ color: selectedGroup.backgroundColor }}
        />
        <div className={styles.groupSelect} onClick={handleDropdown}>
          <div
            className={styles.nowGroup}
            style={{ backgroundColor: selectedGroup.backgroundColor }}
          />
          <div className={styles.changeGroup}>
            <DownSVG
              width={14}
              height={9}
              fill='#785AD2'
              transform='rotate(180)'
            />
            <DownSVG width={14} height={9} fill='#785AD2' />
          </div>
          {isDropdown && (
            <GroupSelect
              isDropdown={isDropdown}
              setIsDropdown={setIsDropdown}
              selectedGroup={selectedGroup}
              setSelectedGroup={setSelectedGroup}
            />
          )}
        </div>
      </div>
      <div className={styles.content}>
        <textarea
          value={inputContent}
          onChange={handleContentChange}
          onInput={handleContentInput}
          placeholder='내용을 입력하세요'
          className={styles.field}
          rows={1}
        />
      </div>
      <div className={styles.divider} />
      <div className={styles.date}>
        <div className={styles.datePickerContainer}>
          <DatePicker
            selected={startDate}
            name='startDate'
            showTimeSelect
            timeFormat='HH:mm'
            dateFormat='yyyy.MM.dd HH시 mm분'
            timeIntervals={30}
            onChange={(date) => {
              setStartDate(date as Date);
            }}
            className={styles.datePicker}
          />
        </div>
        <span>-</span>
        <div className={styles.datePickerContainer}>
          <DatePicker
            selected={endDate}
            name='endDate'
            showTimeSelect
            timeFormat='HH:mm'
            dateFormat='yyyy.MM.dd HH시 mm분'
            timeIntervals={30}
            onChange={(date) => {
              setEndDate(date as Date);
            }}
            className={styles.datePickerEnd}
          />
        </div>
      </div>
      <div className={styles.divider} />
      <div className={styles.link}>
        <LinkSVG
          stroke={inputLink.length > 0 ? '#000000' : '#C1C8F0'}
          width={13}
          height={14}
        />
        <input
          type='text'
          placeholder='링크를 입력하세요'
          className={styles.field}
          value={inputLink}
          onChange={handleLinkChange}
        />
      </div>
      <div className={styles.divider} />
      <div className={styles.buttonContainer}>
        <div
          className={
            inputTitle && inputContent
              ? styles.buttonActive
              : styles.buttonInactive
          }
        >
          등록
        </div>
      </div>
    </div>
  );
};

export default PrivateScheduleAddModal;
