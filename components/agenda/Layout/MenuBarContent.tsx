import Link from 'next/link';
import { ElementType, useContext } from 'react';
import styles from 'styles/agenda/Layout/MenuBar.module.scss';
import { HeaderContext, HeaderContextState } from './AgendaHeader';

interface MenuBarContentProps {
  as?: ElementType;
  content: string;
  href: string;
}

const MenuBarContent = ({ as, content, href }: MenuBarContentProps) => {
  const Elem = as || 'p';
  const closeMenuBar =
    useContext<HeaderContextState | null>(HeaderContext)
      ?.resetOpenMenuBarState ||
    function () {
      console.log('resetOpenMenuBarState is not defined');
    };

  return (
    <div className={styles.content}>
      <Link href={href} onClick={closeMenuBar}>
        <button className={styles.button}>
          <Elem>{content}</Elem>
        </button>
      </Link>
    </div>
  );
};

export default MenuBarContent;
