import { useState } from 'react';
import { TABS, TabValues } from 'constants/agenda/agendaDetail/agendaTabs';
import TapContent from 'components/agenda/agendaDetail/TapContent';
import TapButtons from 'components/agenda/button/TapButtons';

export default function AgendaTap() {
  const [activeTab, setActiveTab] = useState<TabValues>(TABS.DESCRIPTION);

  return (
    <>
      <TapButtons tabs={TABS} activeTab={activeTab} onTabClick={setActiveTab} />
      <TapContent activeTab={activeTab} tabs={TABS} />
    </>
  );
}
