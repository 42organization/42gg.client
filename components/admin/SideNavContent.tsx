import Link from 'next/link';
import styles from 'styles/admin/SideNavContent.module.scss';

type SideNavContentProps = {
  url: string;
  menuName: string;
  currentPath: string;
  children: React.ReactNode;
};

export default function SideNavContent({
  url,
  menuName,
  currentPath,
  children,
}: SideNavContentProps) {
  return (
    <Link href={`/admin${url}`}>
      <div
        className={`${styles.content} ${
          currentPath === url && styles.selected
        }`}
      >
        {children}
        <div className={styles.contentText}>{menuName}</div>
      </div>
    </Link>
  );
}
