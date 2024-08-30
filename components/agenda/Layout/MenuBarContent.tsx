import { on } from 'events';
import Link from 'next/link';
import { ElementType, useContext } from 'react';
import styles from 'styles/agenda/Layout/MenuBar.module.scss';
import { HeaderContext, HeaderContextState } from './AgendaHeader';

interface MenuBarContentProps {
  as?: ElementType;
  content: string;
  href?: string;
  onClick?: () => void;
}

// onClick 혹은 href 둘 중 하나는 반드시 있어야 합니다.
const MenuBarContent = ({
  as,
  content,
  href,
  onClick,
}: MenuBarContentProps) => {
  const Elem = as || 'p';
  const closeMenuBar =
    useContext<HeaderContextState | null>(HeaderContext)
      ?.resetOpenMenuBarState ||
    function () {
      console.log('resetOpenMenuBarState is not defined');
    };

  return (
    <div className={styles.content}>
      {href && (
        <Link href={href} onClick={closeMenuBar}>
          <button className={styles.button}>
            <Elem>{content}</Elem>
          </button>
        </Link>
      )}
      {!href && onClick && (
        <button
          className={styles.button}
          onClick={() => {
            onClick();
            closeMenuBar();
          }}
        >
          <Elem>{content}</Elem>
        </button>
      )}
    </div>
  );
};

export default MenuBarContent;
