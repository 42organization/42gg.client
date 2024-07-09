import { useSetRecoilState } from 'recoil';
import { Modal } from 'types/takgu/modalTypes';
import { instance } from 'utils/axios';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/takgu/modal';
interface Report {
  category: string;
  content: string;
}

type useReportHandlerReturn = () => Promise<void>;

const useReportHandler = (report: Report): useReportHandlerReturn => {
  const setModal = useSetRecoilState<Modal>(modalState);
  const setError = useSetRecoilState<string>(errorState);
  const reportResponse: { [key: string]: string } = {
    SUCCESS: '의견 주셔서 감사합니다 ❤️',
    REJECT: '마음을 담아 의견을 보내주세요 ❤️',
  };

  const reportHandler = async () => {
    if (report.category && report.content.replace(/^\s+|\s+$/g, '')) {
      try {
        await instance.post('/pingpong/feedback', report);
        setModal({ modalName: null });
        alert(reportResponse.SUCCESS);
      } catch (e) {
        setError('JH06');
      }
    } else {
      alert(reportResponse.REJECT);
    }
  };

  return reportHandler;
};

export default useReportHandler;
