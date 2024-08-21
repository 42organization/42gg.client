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
  const context = useContext<HeaderContextState | null>(HeaderContext);
  const moveTo =
    context && context.moveTo && context.moveTo
      ? context.moveTo
      : () => {
          alert('Error: HeaderContext not found');
        };
  return (
    <div className={styles.content}>
      <button onClick={moveTo(href)} className={styles.button}>
        <Elem>{content}</Elem>
      </button>
    </div>
  );
};

export default MenuBarContent;
