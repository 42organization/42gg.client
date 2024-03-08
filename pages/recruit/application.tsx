import { useState } from 'react';
import ApplicationForm from 'components/recruit/ApplicationForm';
import StickyHeader from 'components/recruit/StickyHeader';
import applicationStyle from 'styles/recruit/application.module.scss';

function Application() {
  const [edit, setEdit] = useState(false);
  const [test, setTest] = useState(0);
  const click = () => {
    setTest((prev) => (prev + 1) % 3);
  };

  return (
    <div className={applicationStyle.container}>
      <StickyHeader headerTitle={edit ? '지원서 수정' : '지원서 작성'} />
      <ApplicationForm id={test} />
      <button onClick={() => click()}>test</button>
    </div>
  );
}

export default Application;
