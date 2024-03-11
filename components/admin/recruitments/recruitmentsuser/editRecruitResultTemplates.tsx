import { useEffect, useState } from 'react';
// import { instanceInManage } from 'utils/axios';
import { useSetRecoilState } from 'recoil';
import {
  IRecruitmentTemplate,
  RecruitmentMessageType,
} from 'types/recruit/recruitments';
import { mockInstance } from 'utils/mockAxios';
import { toastState } from 'utils/recoil/toast';
import TemplateEditor from 'components/admin/recruitments/recruitmentsuser/tmplateEditor';
import styles from 'styles/admin/recruitments/RecruitmentResultTemplates.module.scss';

type TemplateListType = Record<RecruitmentMessageType, string>;

function EditRecruitResultTemplates() {
  const setSnackbar = useSetRecoilState(toastState);
  const [templates, setTemplates] = useState<TemplateListType>({
    INTERVIEW: '',
    PASS: '',
    FAIL: '',
  });
  const getTemplates = async () => {
    try {
      // const res = await instanceInManage.get('/recruitments/result/message');
      const res = await mockInstance.get('/admin/recruitments/result/message');
      const messages = res.data.messages.reduce(
        (acc: TemplateListType, curr: IRecruitmentTemplate) => {
          acc[curr.messageType] = curr.message;
          return acc;
        },
        {
          INTERVIEW: '',
          PASS: '',
          FAIL: '',
        }
      );
      setTemplates(messages);
    } catch (e: any) {
      setSnackbar({
        toastName: `api error`,
        severity: 'error',
        message: `API 요청에 문제가 발생했습니다.`,
        clicked: true,
      });
    }
  };

  useEffect(() => {
    getTemplates();
  }, []);

  return (
    <div className={styles.container}>
      <TemplateEditor messageType='INTERVIEW' message={templates.INTERVIEW} />
      <TemplateEditor messageType='PASS' message={templates.PASS} />
      <TemplateEditor messageType='FAIL' message={templates.FAIL} />
    </div>
  );
}

export default EditRecruitResultTemplates;
