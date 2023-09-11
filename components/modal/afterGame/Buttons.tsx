import {
  ModalButtonContainer,
  ModalButton,
} from 'components/modal/ModalButton';

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
          <ModalButton style='negative' value='다시입력' onClick={onReset} />
          <ModalButton
            style='positive'
            value='제출하기'
            onClick={onSubmit}
            isLoading={isLoading}
          />
        </>
      ) : (
        <ModalButton style='positive' value='확 인' onClick={onEnter} />
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
