import { useState } from 'react';
import { TABS, TabValues } from 'constants/agenda/agendaDetail/agendaTabs';
import TapContent from 'components/agenda/agendaDetail/TapContent';
import Taps from 'components/agenda/button/Taps';

export default function AgendaTap() {
  const [activeTab, setActiveTab] = useState<TabValues>(TABS.DESCRIPTION);

  return (
    <>
      <Taps tabs={TABS} activeTab={activeTab} onTabClick={setActiveTab} />
      <TapContent activeTab={activeTab} tabs={TABS} />
    </>
  );
}
