import { useState } from 'react';
import ApplicationForm from 'components/recruit/ApplicationForm';
import applicationStyle from 'styles/recruit/application.module.scss';

function Application() {
  const [edit, setEdit] = useState(false);
  const [test, setTest] = useState(0);
  const click = () => {
    setTest((prev) => (prev + 1) % 2);
  };

  return (
    <div className={applicationStyle.container}>
      <div className={applicationStyle.stickyHeader}>
        <div className={applicationStyle.stickyContainer}>
          <div className={applicationStyle.headerTitle}>
            {edit ? '지원서 수정' : '지원서 작성'}
          </div>
        </div>
      </div>
      <ApplicationForm recruitId={test} />
      <button onClick={() => click()}>test</button>
    </div>
  );
}

export default Application;
