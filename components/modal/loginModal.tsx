import { Link } from 'react-router-dom';
import styles from '../../styles/InputScoreModal.module.scss';

type Props = {
  openLoginModalHandler: () => void;
};

function LoginModal({ openLoginModalHandler }: Props) {
  return (
    <div className={styles.backdrop} /*onClick={openLoginModalHandler}*/>
      <div
        className={
          styles.modalContainer
        } /*onClick={(e) => e.stopPropagation()*/
      >
        {/* <TopBar>
            <PageName></PageName>
            <Squares>
              <div>&#9866;</div>
              <div>&#10064;</div>
              <div onClick={openLoginModalHandler}>&times;</div>
            </Squares>
          </TopBar>
          <ContentContainer>
            <TextWrap>로그인이 필요합니다.</TextWrap>
            <Buttons>
              <Link to="/login">
                <input type="button" value="로그인하기" />
              </Link>
            </Buttons>
          </ContentContainer> */}
        <Link to='/login'>
          <input type='button' value='로그인하기' />
        </Link>
      </div>
    </div>
  );
}

export default LoginModal;
