import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  IRecruitmentTemplate,
  RecruitmentMessageType,
} from 'types/takgu/recruit/recruitments';
import { instance } from 'utils/axios';
import { toastState } from 'utils/takgu/recoil/toast';
import TemplateEditor from 'components/takgu/admin/recruitments/recruitmentsuser/tmplateEditor';
import styles from 'styles/takgu/admin/modal/AdminRecruitMessageTemplateModal.module.scss';

type TemplateListType = Record<RecruitmentMessageType, string>;
function AdminRecruitMessageTemplateModal() {
  const setSnackbar = useSetRecoilState(toastState);
  const [templates, setTemplates] = useState<TemplateListType>({
    INTERVIEW: '',
    PASS: '',
    FAIL: '',
  });
  const getTemplates = async () => {
    try {
      const res = await instance.get('admin/recruitments/result/message');
      const messages = res.data.messages
        .filter((message: IRecruitmentTemplate) => message.isUse)
        .reduce(
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
      <TemplateEditor messageType='INTERVIEW' content={templates.INTERVIEW} />
      <TemplateEditor messageType='PASS' content={templates.PASS} />
      <TemplateEditor messageType='FAIL' content={templates.FAIL} />
    </div>
  );
}

export default AdminRecruitMessageTemplateModal;
