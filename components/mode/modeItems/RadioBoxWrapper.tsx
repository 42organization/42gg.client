import styles from 'styles/mode/ModeRadiobox.module.scss';

type RadioBoxWrapperProps = {
  children: React.ReactNode;
  page: 'GAME' | 'MATCH' | 'MANUAL' | 'STORE' | 'STORE_MANUAL';
  zIndexList?: boolean;
};

export function RadioBoxWrapper({
  children,
  page,
  zIndexList,
}: RadioBoxWrapperProps) {
  return (
    <div
      className={`${
        styles[page.startsWith('STORE') ? 'twoButtons' : 'threeButtons']
      }
      ${styles[page.toLowerCase()]}
      ${zIndexList && styles['zIndexListButton']}`}
    >
      {children}
    </div>
  );
}
