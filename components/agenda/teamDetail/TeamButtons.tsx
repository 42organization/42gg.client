import { agendaModal } from 'types/agenda/modalTypes';
import {
  TeamButtonsProps,
  BtnInfoProps,
} from 'types/agenda/teamDetail/TeamButtonsTypes';
import { Authority, TeamStatus } from 'constants/agenda/agenda';
import { useModal } from 'components/agenda/modal/useModal';
import styles from 'styles/agenda/TeamDetail/TeamButtons.module.scss';

interface CheckModalProps {
  title: string;
  description: string;
  onProceed: () => void;
  proceedText: string;
  cancelText: string;
  openModal: (props: agendaModal) => void;
}

const checkModal = ({
  title,
  description,
  onProceed,
  proceedText,
  cancelText,
  openModal,
}: CheckModalProps) => {
  openModal({
    type: 'proceedCheck',
    title: title,
    description: description,
    onProceed: onProceed,
    proceedText: proceedText,
    cancelText: cancelText,
  });
};

const renderButton = (
  firstBtnInfo: BtnInfoProps,
  secondBtnInfo?: BtnInfoProps
) => {
  return (
    <div className={styles.buttonContainer}>
      {firstBtnInfo ? (
        <button className={styles.button} onClick={firstBtnInfo.handleClick}>
          {firstBtnInfo.label}
        </button>
      ) : null}

      {secondBtnInfo ? (
        <button
          className={styles.confirm_button}
          onClick={secondBtnInfo.handleClick}
        >
          {secondBtnInfo.label}
        </button>
      ) : null}
    </div>
  );
};

const TeamButtons = ({
  authority,
  teamStatus,
  manageTeamDetail,
}: TeamButtonsProps) => {
  const { openModal } = useModal();

  switch (teamStatus) {
    case TeamStatus.CANCEL:
      return null;
    case TeamStatus.CONFIRM:
      if (authority === Authority.LEADER) {
        return renderButton({
          handleClick: () => {
            checkModal({
              title: '폭파하기',
              description: '확인 버튼을 누르면, 팀이 삭제됩니다.',
              onProceed: () =>
                manageTeamDetail && manageTeamDetail('PATCH', 'team/cancel'),
              proceedText: '확인',
              cancelText: '취소',
              openModal: openModal,
            });
          },
          label: '폭파하기',
        });
      } else {
        return null;
      }
    case TeamStatus.OPEN:
      if (authority === Authority.GEUST) {
        return renderButton({
          handleClick: () =>
            checkModal({
              title: '',
              description: '확인 버튼을 누르면, 팀에 참가됩니다.',
              onProceed: () =>
                manageTeamDetail && manageTeamDetail('POST', 'team/join'),
              proceedText: '확인',
              cancelText: '취소',
              openModal: openModal,
            }),
          label: '참가하기',
        });
      } else if (authority === Authority.MEMBER) {
        return renderButton({
          handleClick: () =>
            checkModal({
              title: '',
              description: '확인 버튼을 누르면, 팀에서 나가게 됩니다.',
              onProceed: () =>
                manageTeamDetail && manageTeamDetail('PATCH', 'team/cancel'),
              proceedText: '확인',
              cancelText: '취소',
              openModal: openModal,
            }),
          label: '나가기',
        });
      } else if (authority === Authority.LEADER) {
        return renderButton(
          {
            handleClick: () =>
              checkModal({
                title: '폭파하기',
                description: '확인 버튼을 누르면, 팀이 삭제됩니다.',
                onProceed: () =>
                  manageTeamDetail && manageTeamDetail('PATCH', 'team/cancel'),
                proceedText: '확인',
                cancelText: '취소',
                openModal: openModal,
              }),
            label: '폭파하기',
          },
          {
            handleClick: () =>
              checkModal({
                title: '확정하기',
                description: '확인 버튼을 누르면, 팀이 확정됩니다.',
                onProceed: () =>
                  manageTeamDetail && manageTeamDetail('PATCH', 'team/confirm'),
                proceedText: '확인',
                cancelText: '취소',
                openModal: openModal,
              }),
            label: '확정하기',
          }
        );
      } else {
        /** NONE, HOST */
        return null;
      }
  }
  return null;
};

export default TeamButtons;
