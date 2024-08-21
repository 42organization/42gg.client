import Link from 'next/link';
import { Component, ElementType } from 'react';
import styles from 'styles/agenda/Layout/MenuBar.module.scss';

interface MenuBarContentProps {
  as?: ElementType;
  content: string;
  href: string;
}

const MenuBarContent = ({ as, content, href }: MenuBarContentProps) => {
  const Elem = as || 'p';
  return (
    <div className={styles.content}>
      <Link href={href}>
        <Elem>{content}</Elem>
      </Link>
    </div>
  );
};

export default MenuBarContent;
