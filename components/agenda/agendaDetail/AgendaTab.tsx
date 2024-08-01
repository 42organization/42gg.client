import { useState } from 'react';
import { TABS, TabValues } from 'constants/agenda/agendaDetail/agendaTabs';
import TabContent from 'components/agenda/agendaDetail/TabContent';
import TabButtons from 'components/agenda/button/TabButtons';

export default function AgendaTab() {
  const [activeTab, setActiveTab] = useState<TabValues>(TABS.DESCRIPTION);

  return (
    <>
      <TabButtons tabs={TABS} activeTab={activeTab} onTabClick={setActiveTab} />
      <TabContent activeTab={activeTab} tabs={TABS} />
    </>
  );
}
