import Image from 'next/image';
import styles from 'styles/agenda/agendaDetail/AgendaTab.module.scss';

interface AgendaPosterProps {
  poster: string | null | undefined;
}

const AgendaPoster = ({ poster }: AgendaPosterProps) => {
  return (
    <div className={styles.container}>
      {poster ? (
        <Image
          className={styles.contentWarp}
          src={poster}
          alt='poster'
          layout='responsive'
          width={300}
          height={300}
        />
      ) : (
        <div>등록된 포스터가 없습니다.</div>
      )}
    </div>
  );
};

export default AgendaPoster;
