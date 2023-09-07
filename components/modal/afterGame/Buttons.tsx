import {
  ModalButtonContainer,
  ModalButton,
} from 'components/modal/ModalButton';
// FIXME - 동작 확인되면 주석 지울 것 (파일도 정리하기)
// import styles from 'styles/modal/afterGame/AfterGameModal.module.scss';

interface ButtonsProps {
  onCheck: boolean;
  isLoading: boolean;
  onEnter: () => void;
  onReset: () => void;
  onSubmit: () => void;
}

export function Buttons({
  onCheck,
  isLoading,
  onEnter,
  onReset,
  onSubmit,
}: ButtonsProps) {
  return (
    <ModalButtonContainer>
      {onCheck ? (
        <>
          <ModalButton
            style='negative'
            value='다시입력'
            onClick={onReset}
            isLoading={false}
          />
          <ModalButton
            style='positive'
            value='제출하기'
            onClick={onSubmit}
            isLoading={isLoading}
          />
          {/* FIXME - 동작 확인되면 주석 지울 것 */}
          {/* <Button style={styles.negative} value='다시입력' onClick={onReset} />
          <Button style={styles.positive} value='제출하기' onClick={onSubmit} /> */}
        </>
      ) : (
        <ModalButton
          style='positive'
          value='확 인'
          onClick={onEnter}
          isLoading={false}
        />
        // FIXME - 동작 확인되면 주석 지울 것
        // <Button style={styles.positive} value='확 인' onClick={onEnter} />
      )}
    </ModalButtonContainer>
  );
}

interface ButtonProps {
  style: string;
  value: string;
  onClick: () => void;
}

export function Button({ style, value, onClick }: ButtonProps) {
  return (
    <div className={style}>
      <input onClick={onClick} type='button' value={value} />
    </div>
  );
}
