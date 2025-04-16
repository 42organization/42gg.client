import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarFormData } from 'types/calendar/formType';
import {
  CalendarClassification,
  CalendarEventTag,
  CalendarJobTag,
  CalendarTechTag,
  eventTagLabels,
  jobTagLabels,
  techTagLabels,
} from 'constants/calendar/calendarConstants';
import styles from 'styles/calendar/Form/CalendarForm.module.scss';

interface CalendarFormProps {
  initialData?: Partial<CalendarFormData>;
  onSubmit: (data: CalendarFormData) => void;
}

const CalendarCreateForm: React.FC<CalendarFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<CalendarFormData>({
    title: '',
    startDate: new Date(),
    endDate: new Date(),
    description: '',
    classificationTag: CalendarClassification.EVENT,
    eventTag: CalendarEventTag.OFFICIAL_EVENT,
    jobTag: undefined,
    techTag: undefined,
    link: '',
  });

  const [selectedClassificationTag, setSelectedClassificationTag] =
    useState<CalendarClassification>(CalendarClassification.EVENT);
  const [selectedEventTag, setSelectedEventTag] = useState<CalendarEventTag>(
    CalendarEventTag.OFFICIAL_EVENT
  );
  const [selectedJobTag, setSelectedJobTag] = useState<
    CalendarJobTag | undefined
  >(undefined);
  const [selectedTechTag, setSelectedTechTag] = useState<
    CalendarTechTag | undefined
  >(undefined);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      classificationTag: selectedClassificationTag,
      eventTag:
        selectedClassificationTag === CalendarClassification.EVENT
          ? selectedEventTag
          : undefined,
      jobTag:
        selectedClassificationTag === CalendarClassification.JOB
          ? selectedJobTag
          : undefined,
      techTag:
        selectedClassificationTag === CalendarClassification.JOB
          ? selectedTechTag
          : undefined,
    }));
  }, [
    selectedClassificationTag,
    selectedEventTag,
    selectedJobTag,
    selectedTechTag,
  ]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name: 'startDate' | 'endDate', date: Date) => {
    setFormData((prev) => ({ ...prev, [name]: date }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const availableTags = Object.values(CalendarClassification).filter(
    (tag) => tag !== CalendarClassification.PRIVATE
  );

  return (
    <div className={styles.container}>
      <div className={styles.formHeaderContainer}>일정 추가</div>

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
              {availableTags.map((tag) => (
                <div
                  key={tag}
                  className={`${styles.tagItem} ${
                    selectedClassificationTag === tag ? styles.selected : ''
                  }`}
                  onClick={() => {
                    setSelectedClassificationTag(tag);
                    setSelectedJobTag(undefined);
                    setSelectedTechTag(undefined);
                  }}
                >
                  {tag === CalendarClassification.EVENT
                    ? '42서울일정'
                    : '취업 공고'}
                </div>
              ))}
            </div>

            {selectedClassificationTag === CalendarClassification.EVENT && (
              <div className={styles.subTagWrapper}>
                {Object.values(CalendarEventTag).map((tag) => (
                  <div
                    key={tag}
                    className={`${styles.subTagItem} ${
                      selectedEventTag === tag ? styles.subTagSelected : ''
                    }`}
                    onClick={() => setSelectedEventTag(tag)}
                  >
                    # {eventTagLabels[tag]}
                  </div>
                ))}
              </div>
            )}

            {selectedClassificationTag === CalendarClassification.JOB && (
              <div className={styles.subTagJobWrapper}>
                {Object.values(CalendarJobTag).map((tag) => (
                  <div
                    key={tag}
                    className={`${styles.subTagItem} ${
                      selectedJobTag === tag ? styles.subTagSelected : ''
                    }`}
                    onClick={() => setSelectedJobTag(tag)}
                  >
                    # {jobTagLabels[tag]}
                  </div>
                ))}
              </div>
            )}

            {selectedClassificationTag === CalendarClassification.JOB &&
              selectedJobTag && (
                <div className={styles.subTagWrapper}>
                  {Object.values(CalendarTechTag).map((tag) => (
                    <div
                      key={tag}
                      className={`${styles.subTagTechItem} ${
                        selectedTechTag === tag ? styles.subTagSelected : ''
                      }`}
                      onClick={() => setSelectedTechTag(tag)}
                    >
                      # {techTagLabels[tag]}
                    </div>
                  ))}
                </div>
              )}
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
            required
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
            <span> - </span>
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

        <div className={styles.buttonContainer}>
          <button type='submit' className={styles.submitButton}>
            등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default CalendarCreateForm;
