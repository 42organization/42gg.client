import styles from 'styles/agenda/Layout/MenuBar.module.scss';
import MenuBarContent from './MenuBarContent';

const MenuBar = () => {
  return (
    <div className={styles.container}>
      <MenuBarContent content='Agenda' href='/agenda/ticket' as='h1' />
      <MenuBarContent content='진행중인 대회' href='/agenda' />
      <MenuBarContent content='프로필' href='/agenda/profile' />
      <MenuBarContent content='티켓 확인하기' href='/agenda/ticket' />
    </div>
  );
};

export default MenuBar;
