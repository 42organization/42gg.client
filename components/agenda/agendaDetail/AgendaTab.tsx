import { useState } from 'react';
import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaDataTypes';
import { TeamDataProps } from 'types/agenda/team/teamDataTypes';
import { TABS, TabValues } from 'constants/agenda/agendaDetail/agendaTabs';
import TabContent from 'components/agenda/agendaDetail/TabContent';
import TabButtons from 'components/agenda/button/TabButtons';

interface AgendaTabProps {
  agendaData: AgendaDataProps;
  isHost: boolean;
  myTeam?: TeamDataProps | null;
}

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
