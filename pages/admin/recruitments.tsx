import { useState } from 'react';
import RecruitmentsMain from 'components/admin/recruitments/recruitmentsMain';

export default function Recruitments() {
  const InitJSX = <></>;
  const [page, setPage] = useState<JSX.Element>(InitJSX);

  if (page == InitJSX) setPage(<RecruitmentsMain setPage={setPage} />);

  return <>{page}</>;
}
