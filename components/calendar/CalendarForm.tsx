import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from 'styles/calendar/Form/CalendarForm.module.scss';

interface CalendarFormProps {
  mode: 'add' | 'edit';
  isModal?: boolean;
  initialData?: {
    title: string;
    startDate: Date;
    endDate: Date;
    description: string;
    link?: string;
  };
  onClose?: () => void;
  onSubmit: (data: {
    title: string;
    startDate: Date;
    endDate: Date;
    description: string;
    link?: string;
  }) => void;
}

const CalendarForm: React.FC<CalendarFormProps> = ({
  mode,
  isModal = false,
  initialData,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    startDate: new Date(),
    endDate: new Date(),
    description: '',
    link: '',
  });

  const [selectedTag, setSelectedTag] = useState<'42서울일정' | '취업 공고'>(
    '42서울일정'
  );

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData(initialData);
    }
  }, [mode, initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name: 'startDate' | 'endDate', date: Date) => {
    setFormData((prev) => ({ ...prev, [name]: date }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (isModal && onClose) onClose();
  };

  return (
    <div className={styles.container}>
      <div className={styles.formHeaderContainer}>
        {mode === 'add' ? '일정 추가' : '일정 수정'}
        {/* ING */}
        {isModal && (
          <button className={styles.closeButton} onClick={onClose}>
            ✖
          </button>
        )}
        {/* ING */}
      </div>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.inputWrapper}>
          <div className={styles.label}>제목</div>
          <input
            name='title'
            value={formData.title}
            onChange={handleChange}
            placeholder='제목을 입력하세요.'
            required
            className={styles.inputField}
          />
        </div>

        <div className={styles.tagWrapper}>
          <div className={styles.label}>태그</div>
          <div className={styles.tagField}>
            <div className={styles.selectTagContainer}>
              <div
                className={`${styles.tagItem} ${
                  selectedTag === '42서울일정' ? styles.selected : ''
                }`}
                onClick={() => setSelectedTag('42서울일정')}
              >
                42서울일정
              </div>

              <div
                className={`${styles.tagItem} ${
                  selectedTag === '취업 공고' ? styles.selected : ''
                }`}
                onClick={() => setSelectedTag('취업 공고')}
              >
                취업 공고
              </div>
            </div>

            <div className={styles.selectTagContainer}>
              <div
                className={`${styles.tagItem} ${
                  selectedTag === '42서울일정' ? styles.selected : ''
                }`}
                onClick={() => setSelectedTag('42서울일정')}
              >
                42서울일정
              </div>
            </div>
          </div>
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.contentLabel}>내용</div>
          <textarea
            name='description'
            value={formData.description}
            onChange={handleChange}
            placeholder='내용을 입력하세요.'
            className={styles.textareaField}
          />
        </div>

        <div className={styles.inputWrapper}>
          <div className={styles.label}>날짜</div>
          <div className={styles.datePickerContainer}>
            <DatePicker
              selected={formData.startDate}
              name='startDate'
              showTimeSelect
              timeFormat='HH:mm'
              dateFormat='yyyy.MM.dd HH:mm'
              timeIntervals={30}
              onChange={(date) => handleDateChange('startDate', date as Date)}
              className={styles.datePicker}
            />
            <span></span>
            <DatePicker
              selected={formData.endDate}
              name='endDate'
              showTimeSelect
              timeFormat='HH:mm'
              dateFormat='yyyy.MM.dd HH:mm'
              timeIntervals={30}
              onChange={(date) => handleDateChange('endDate', date as Date)}
              className={styles.datePicker}
            />
          </div>
        </div>

        <div className={styles.inputWrapper}>
          <div className={styles.label}>링크</div>
          <input
            name='link'
            value={formData.link}
            onChange={handleChange}
            placeholder='관련 링크를 입력하세요.'
            className={styles.inputField}
          />
        </div>
      </form>

      <div className={styles.buttonContainer}>
        <button type='submit' className={styles.submitButton}>
          {mode === 'add' ? '등록' : '수정'}
        </button>
      </div>
    </div>
  );
};

export default CalendarForm;
