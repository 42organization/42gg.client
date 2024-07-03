import { useRouter } from 'next/router';
import StyledButton from 'components/UI/StyledButton';
import styles from 'styles/Layout/Layout.module.scss';

const PlayButton = () => {
  const presentPath = useRouter().asPath;
  const router = useRouter();

  const onClickMatch = () => {
    router.replace('/takgu');
    router.push(`/takgu/match`);
  };

  if (
    presentPath === '/takgu/match' ||
    presentPath === '/takgu/manual' ||
    presentPath === '/takgu/store' ||
    presentPath.startsWith('/takgu/party')
  )
    return null;
  return (
    <div className={styles.buttonContainer}>
      <div className={styles.buttonWrapper}>
        <StyledButton onClick={onClickMatch} width={'5.5rem'}>
          Play
        </StyledButton>
      </div>
    </div>
  );
};

export default PlayButton;
