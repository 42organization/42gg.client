import { useState } from 'react';
import { ApplicationFormType } from 'types/recruit/recruitments';
import ApplicationForm from 'components/recruit/ApplicationForm/ApplicationForm';
import StickyHeader from 'components/recruit/StickyHeader';

function Application() {
  const [mode, setMode] = useState<ApplicationFormType>('APPLY');
  const [test, setTest] = useState(0);
  const clickContent = () => {
    setTest((prev) => (prev + 1) % 3);
  };
  const clickMode = () => {
    if (mode === 'APPLY') setMode('VIEW');
    else if (mode === 'VIEW') setMode('EDIT');
    else setMode('APPLY');
  };

  return (
    <>
      <StickyHeader
        headerTitle={
          mode === 'APPLY'
            ? '지원서 작성'
            : mode === 'VIEW'
            ? '지원서 보기'
            : '지원서 수정'
        }
      />
      {/* todo: applicationId 처리 */}
      <ApplicationForm recruitId={test} applicationId={1} mode={mode} />
      <button onClick={() => clickContent()}>내용 테스트</button>
      <button onClick={() => clickMode()}>모드 테스트</button>
    </>
  );
}

export default Application;
