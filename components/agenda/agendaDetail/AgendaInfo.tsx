import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AgendaStatus } from 'constants/agenda/agenda';
import UploadButton from 'components/agenda/button/UploadButton';
import Share from 'public/image/agenda/share.svg';
import styles from 'styles/agenda/agendaDetail/AgendaInfo.module.scss';
// 목데이터 생성
const mockData = {
  agendaTitle: '아 기다리고기다리던대회',
  agendaContents:
    '이 대회는 언제부터 시작되어 어쩌구저쩌구 뭐를 겨루려고 했는데 비밀이에요',
  agendaDeadLine: new Date('2024-07-20'),
  agendaStartTime: new Date('2024-07-25'),
  agendaEndTime: new Date('2024-07-30'),
  agendaMinTeam: 3,
  agendaMaxTeam: 10,
  agendaCurrentTeam: 5,
  agendaMinPeople: 2,
  agendaMaxPeople: 5,
  agendaPoster: null, // 이미지가 없는 경우 null로 설정
  agendaHost: 'iamgroot',
  agendaLocation: '서울',
  agendaStatus: AgendaStatus.ON_GOING,
  createdAt: new Date('2024-07-01'),
  announcementTitle: '대회 공지사항',
  isOfficial: true,
};

export default function AgendaInfo() {
  const router = useRouter();
  const { agendaKey } = router.query;
  // axios로 받아온 데이터
  // agenda?agenda_id=${agendaKey}
  const [agendaData, setAgendaData] = useState(null);

  useEffect(() => {
    // axios.get(`/api/agenda?agenda_id=${agendaKey}`)
    //   .then(response => setAgendaData(response.data))
    //   .catch(error => console.error(error));

    // 목데이터 설정
    setAgendaData(mockData);
  }, [agendaKey]);

  if (!agendaData) {
    return <div>Loading...</div>;
  }

  const { agendaTitle, agendaHost } = agendaData;

  return (
    <>
      <div className={styles.infoContainer}>
        <div className={styles.infoWarp}>
          <div className={styles.contentWarp}>
            <div className={styles.enrollWarp}>
              <UploadButton text='참여하기' />
            </div>
            {/* 태그 */}

            <div className={styles.titleWarp}>
              <h2>{agendaTitle}</h2>
              <Share className={styles.shareBtn} />
            </div>

            <div className={styles.organizerWrap}>
              <span>주최자 : {agendaHost}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
