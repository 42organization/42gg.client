import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAgendaInfo } from 'hooks/agenda/useAgendaInfo';
import { useUser } from 'hooks/takgu/Layout/useUser';
import styles from 'styles/agenda/pages/CreateAgenda.module.scss';

const ModifyAgenda = () => {
  const router = useRouter();
  const { agendaKey } = router.query;
  const agendaData = useAgendaInfo(agendaKey as string);
  const user = useUser();

  useEffect(() => {
    // 주최자 확인
    if (agendaData && user) {
      if (agendaData.agendaHost !== user.intraId) {
        alert('주최자만 접근 가능한 페이지입니다.');
        router.back();
      }
    }
  }, [agendaData, user, router]);

  return (
    <>
      <div className={styles.container}>
        {/* 공지사항 추가 */}
        {/* 아젠다 확정 */}
        {/* 아젠다 취소 */}
        {/* 아젠다 결과작성 */}
      </div>
    </>
  );
};

export default ModifyAgenda;
