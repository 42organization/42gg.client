import { IRecruitmentResultMessage } from 'types/recruit/recruitments';
import styles from 'styles/admin/recruitments/RecruitmentResultTemplates.module.scss';

function TemplateEditor({ messageType, message }: IRecruitmentResultMessage) {
  const titles = {
    INTERVIEW: '면접',
    PASS: '합격',
    FAIL: '불합격',
  };

  return (
    <div className={styles.templateContainer}>
      <div className={styles.title}>{`${titles[messageType]} 안내`}</div>
      <textarea
        name='template'
        defaultValue={message}
        placeholder='템플릿을 입력해주세요.'
      />
      <button className={styles.button}>등록하기</button>
    </div>
  );
}

export default TemplateEditor;
