import SubmitAgendaForm from 'components/agenda/Form/SubmitAgendaForm';
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
  submitId: string;
  stringKey: string;
}

const ModifyAgendaForm = ({
  data,
  submitId,
  stringKey,
}: ModifyAgendaFormProps) => {
  return (
    <>
      <AgendaForm
        isEdit={true}
        data={data}
        handleSubmit={SubmitAgendaForm}
        submitId={submitId}
        stringKey={stringKey}
      />
    </>
  );
};

export default ModifyAgendaForm;
