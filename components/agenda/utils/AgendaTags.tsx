import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaTypes';
import { AgendaLocation, AgendaStatus } from 'constants/agenda/agenda';
import { DefaultTag } from 'components/agenda/utils/AgendaTag';
import styles from 'styles/agenda/utils/AgendaTag.module.scss';

interface TagProps {
  agendaStatus?: AgendaStatus;
  agendaLocation: AgendaLocation;
  isOfficial: boolean;
  agendaMaxPeople: number;
  isRanking?: boolean;
}

const AgendaTags = (data: TagProps) => {
  const statusToTagName: Record<AgendaStatus, string> = {
    [AgendaStatus.CANCEL]: '취소',
    [AgendaStatus.OPEN]: '모집중',
    [AgendaStatus.CONFIRM]: '진행중',
    [AgendaStatus.FINISH]: '완료',
  };
  const LocationToTagName: Record<string, string> = {
    [AgendaLocation.SEOUL]: '서울',
    [AgendaLocation.GYEONGSAN]: '경산',
    [AgendaLocation.MIX]: '전국',
  };

  const status = data.agendaStatus ? statusToTagName[data.agendaStatus] : '';
  const location = LocationToTagName[data.agendaLocation];
  const tags = [
    data.isOfficial ? '공식' : '비공식',
    data.agendaMaxPeople === 1 ? '개인' : '팀',
    data.isRanking ? '대회' : null,
    location,
  ].filter(Boolean);
  status && tags.push(status);

  return (
    <div className={styles.agendaItemTagBox}>
      {tags.map((tagName) => (
        <DefaultTag key={tagName} tagName={tagName as string} />
      ))}
    </div>
  );
};

export default AgendaTags;
