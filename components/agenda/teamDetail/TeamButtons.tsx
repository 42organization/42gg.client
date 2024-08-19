import {
  TeamButtonsProps,
  BtnInfoProps,
} from 'types/agenda/teamDetail/TeamButtonsTypes';
import { Authority, TeamStatus } from 'constants/agenda/agenda';
import { useModal } from 'components/agenda/modal/useModal';
import styles from 'styles/agenda/TeamDetail/TeamButtons.module.scss';

const TeamButtons = ({
  authority,
  teamStatus,
  manageTeamDetail,
}: TeamButtonsProps) => {
  const { openModal } = useModal();

  /** renderButton : 버튼 정보를 인자로 받아서 버튼을 생성하는 함수  */
  const renderButton = (fristBtn: BtnInfoProps, secondBtn?: BtnInfoProps) => {
    const handleClick = (description: string, onProceed: () => void) => {
      openModal({
        type: 'proceedCheck',
        description: description,
        onProceed: onProceed,
      });
    };

    return (
      <div className={styles.buttonContainer}>
        {fristBtn ? (
          <button
            className={styles.button}
            onClick={() =>
              handleClick(fristBtn.description, fristBtn.onProceed)
            }
          >
            {fristBtn.label}
          </button>
        ) : null}

        {secondBtn ? (
          <button
            className={styles.confirm_button}
            onClick={() =>
              handleClick(fristBtn.description, fristBtn.onProceed)
            }
          >
            {secondBtn.label}
          </button>
        ) : null}
      </div>
    );
  };

  /** TeamStatus, Authority에 따라 버튼 정보를 다르게 설정 */
  switch (teamStatus) {
    case TeamStatus.CONFIRM:
      if (authority === Authority.LEADER) {
        return renderButton({
          label: '팀 폭파하기',
          description: '확인 버튼을 누르면, 팀이 삭제됩니다.',
          onProceed: () =>
            manageTeamDetail && manageTeamDetail('PATCH', 'team/cancel'),
        });
      }
      return null;

    case TeamStatus.OPEN:
      if (authority === Authority.GEUST) {
        return renderButton({
          label: '팀 참가하기',
          description: '확인 버튼을 누르면, 팀에 참가됩니다.',
          onProceed: () =>
            manageTeamDetail && manageTeamDetail('POST', 'team/join'),
        });
      } else if (authority === Authority.MEMBER) {
        return renderButton({
          label: '팀 나가기',
          description: '확인 버튼을 누르면, 팀에서 나가게 됩니다.',
          onProceed: () =>
            manageTeamDetail && manageTeamDetail('PATCH', 'team/cancel'),
        });
      } else if (authority === Authority.LEADER) {
        return renderButton(
          {
            label: '팀 폭파하기',
            description: '확인 버튼을 누르면, 팀이 삭제됩니다.',
            onProceed: () =>
              manageTeamDetail && manageTeamDetail('PATCH', 'team/cancel'),
          },
          {
            label: '팀 확정하기',
            description: '확인 버튼을 누르면, 팀이 확정됩니다.',
            onProceed: () =>
              manageTeamDetail && manageTeamDetail('PATCH', 'team/confirm'),
          }
        );
      }
      return null; // NONE, HOST

    default: // CANCEL
      return null;
  }
};

export default TeamButtons;
