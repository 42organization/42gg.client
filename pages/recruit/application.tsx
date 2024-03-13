import { useState } from 'react';
import ApplicationForm from 'components/recruit/ApplicationForm';
import StickyHeader from 'components/recruit/StickyHeader';

function Application() {
  const [edit, setEdit] = useState(false);
  const [test, setTest] = useState(0);
  const click = () => {
    setTest((prev) => (prev + 1) % 2);
  };

  return (
    <>
      <StickyHeader headerTitle={edit ? '지원서 수정' : '지원서 작성'} />
      <ApplicationForm recruitId={test} />
      <button onClick={() => click()}>test</button>
    </>
  );
}

export default Application;
