import { useState } from 'react';
import { AgendaTabProps } from 'types/agenda/agendaDetail/tabs/agendaInfoTypes';
import { TABS, TabValues } from 'constants/agenda/agendaDetail/agendaTabs';
import TabContent from 'components/agenda/agendaDetail/TabContent';
import TabButtons from 'components/agenda/button/TabButtons';

export default function AgendaTab({
  agendaData,
  isHost,
  myTeam,
}: AgendaTabProps) {
  const [activeTab, setActiveTab] = useState<TabValues>(TABS.DESCRIPTION);

  return (
    <>
      <TabButtons tabs={TABS} activeTab={activeTab} onTabClick={setActiveTab} />
      <TabContent
        activeTab={activeTab}
        tabs={TABS}
        agendaData={agendaData}
        isHost={isHost}
        myTeam={myTeam}
      />
    </>
  );
}
