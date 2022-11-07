import { Button } from './Buttons';
import Guide, { GuideLine } from './Guide';
import styles from 'styles/modal/AfterGameModal.module.scss';

interface DefaultGameProps {
  guideLine: GuideLine;
}

export default function DefaultGame({ guideLine }: DefaultGameProps) {
  return (
    <div className={styles.container}>
      <Guide condition={true} guideLine={guideLine} />
      <div className={styles.resultContainer}></div>
      <div className={styles.buttons}>
        <Button style={styles.positive} value='' onClick={() => {}} />
      </div>
    </div>
  );
}
