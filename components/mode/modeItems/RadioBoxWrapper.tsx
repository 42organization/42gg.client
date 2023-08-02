import styles from 'styles/mode/ModeRadiobox.module.scss';

type RadioBoxWrapperProps = {
  children: React.ReactNode;
  page: 'GAME' | 'MATCH' | 'MANUAL' | 'STORE';
  zIndexList?: boolean;
};

export function RadioBoxWrapper({
  children,
  page,
  zIndexList,
}: RadioBoxWrapperProps) {
  console.log('RadioBoxWrapper: ', page);

  return (
    <div
      className={`${styles[page === 'STORE' ? 'twoButtons' : 'threeButtons']}
      ${styles[page.toLowerCase()]}
      ${zIndexList && styles['zIndexListButton']}`}
    >
      {children}
    </div>
  );
}
