import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { IRecruitMessageTemplate } from 'types/takgu/recruit/recruitments';
import { instance } from 'utils/axios';
import { toastState } from 'utils/recoil/toast';
import styles from 'styles/takgu/admin/modal/AdminRecruitMessageTemplateModal.module.scss';

function TemplateEditor({ messageType, content }: IRecruitMessageTemplate) {
  const [template, setTemplate] = useState<IRecruitMessageTemplate>({
    messageType: messageType,
    content: content,
  });
  const [alert, setAlert] = useState<string>('새로운 내용을 입력해주세요');
  const setSnackbar = useSetRecoilState(toastState);
  const titles = {
    INTERVIEW: '면접',
    PASS: '합격',
    FAIL: '불합격',
  };
  const DATE = '${선택날짜}'; // 치환 문구

  const inputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const message = e.target.value;
    if (!message) {
      setAlert(`내용을 입력해주세요.`);
    } else if (messageType === 'INTERVIEW' && !message.includes(DATE)) {
      setAlert(`${DATE}를 포함해주세요.`);
    } else {
      setAlert('');
      setTemplate({ ...template, content: message });
    }
  };

  const onClick = async () => {
    if (alert) {
      setSnackbar({
        toastName: `alert`,
        severity: 'error',
        message: alert,
        clicked: true,
      });
      return;
    }
    try {
      await instance.post('admin/recruitments/result/message', template);
      setSnackbar({
        toastName: `post request`,
        severity: 'success',
        message: `템플릿이 성공적으로 등록되었습니다.`,
        clicked: true,
      });
    } catch (e: any) {
      setSnackbar({
        toastName: `bad request`,
        severity: 'error',
        message: `템플릿 등록에 문제가 발생했습니다.`,
        clicked: true,
      });
    }
  };

  return (
    <div className={styles.templateContainer}>
      <div>{`${titles[messageType]} 안내`}</div>
      <div className={styles.textarea}>
        <textarea
          name='template'
          defaultValue={content}
          placeholder='템플릿을 입력해주세요.'
          rows={10}
          onChange={inputHandler}
        />
        <div className={styles.alertText}>{alert}</div>
      </div>
      <button className={styles.button} onClick={onClick}>
        등록하기
      </button>
    </div>
  );
}

export default TemplateEditor;
