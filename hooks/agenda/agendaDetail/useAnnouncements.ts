import { useEffect, useState } from 'react';
import { AnnouncementProps } from 'types/agenda/agendaDetail/announcementTypes';
import { instanceInAgenda } from 'utils/axios';

const mockData = [
  {
    id: 1,
    title: '첫 번째 공지사항',
    contents: '공지사항 이렇게 변경합니다 알아서 보세요.',
    createdAt: new Date(),
  },
  {
    id: 2,
    title: '두 번째 공지사항',
    contents: '공지사항 이렇게 변경합니다 알아서 보세요.',
    createdAt: new Date(),
  },
];

const useAnnouncements = (agendaKey: string) => {
  const [announcements, setAnnouncements] = useState<
    AnnouncementProps[] | null
  >(null);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      if (agendaKey) {
        try {
          const res = await instanceInAgenda.get(
            `/announcement/agenda_key=${agendaKey}`
          );
          setAnnouncements(res.data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    // fetchAnnouncement();
    setAnnouncements(mockData);
  }, [agendaKey]);

  return announcements;
};

export default useAnnouncements;
