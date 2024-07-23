import UploadButton from 'components/agenda/button/UploadButton';
import Share from 'public/image/agenda/share.svg';
import styles from 'styles/agenda/agendaDetail/AgendaInfo.module.scss';
export default function AgendaInfo({ type }: { type: string | undefined }) {
  const title = '아기다리고기다리던대회';
  const organizer = 'organizer';

  if (type === 'team') {
    return (
      <div className={styles.infoContainer}>
        <div className={styles.infoWarp}>
          <div className={styles.contentWarp}>
            <div className={styles.enrollWarp}>
              <UploadButton text='참여하기' />
            </div>
            {/* 태그 */}

            <div className={styles.titleWarp}>
              <h2>{title}</h2>
              <Share className={styles.shareBtn} />
            </div>

            <div className={styles.organizerWrap}>
              <span>주최자 : {organizer}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              <h2>{title}</h2>
              <Share className={styles.shareBtn} />
            </div>

            <div className={styles.organizerWrap}>
              <span>주최자 : {organizer}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
