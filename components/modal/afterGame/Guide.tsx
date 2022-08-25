import styles from 'styles/modal/AfterGameModal.module.scss';

export interface GuideLine {
  before: string;
  after: string;
  explains: string[];
}

interface GuideProps {
  condition: boolean;
  guideLine: GuideLine;
}

export default function Guide({ condition, guideLine }: GuideProps) {
  const { before, after, explains } = guideLine;
  return (
    <>
      <div className={styles.phrase}>
        <div className={styles.emoji}>✅</div>
        <div>{condition ? before : after}</div>
      </div>
      <div className={styles.rules}>
        {explains.map((explain: string, i: number) => (
          <div key={i}>{explain}</div>
        ))}
      </div>
    </>
  );
}
