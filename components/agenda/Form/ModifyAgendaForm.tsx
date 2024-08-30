import AgendaForm from './AgendaFrom';

interface ModifyAgendaFormProps {
  data: {
    agendaId: number;
    agendaKey: string;
    agendaTitle: string;
    agendaContent: string;
    agendaDeadLine: string;
    agendaStartTime: string;
    agendaEndTime: string;
    agendaCurrentTeam: number;
    agendaMinTeam: number;
    agendaMaxTeam: number;
    agendaMinPeople: number;
    agendaMaxPeople: number;
    agendaLocation: string;
    isRanking: boolean;
    isOfficial: boolean;
    agendaStatus: string;
    agendaPosterUrl: string;
  };
  stringKey: string;
  isAdmin?: boolean;
  onProceed?: () => void;
}

const ModifyAgendaForm = ({
  isAdmin,
  data,
  stringKey,
  onProceed,
}: ModifyAgendaFormProps) => {
  // onProceed를 전달하지 않으면 기본적으로 모달 닫기 실행
  return (
    <>
      <AgendaForm
        isAdmin={isAdmin}
        isEdit={true}
        data={data}
        stringKey={stringKey}
        onProceed={onProceed}
      />
    </>
  );
};

export default ModifyAgendaForm;
