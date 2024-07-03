import styles from 'styles/modal/store/InventoryModal.module.scss';

type ItemCautionContainerProps = {
  caution: string[];
};

export function ItemCautionContainer({ caution }: ItemCautionContainerProps) {
  return (
    <div className={styles.itemCautionContainer}>
      <div className={styles.title}>주의사항</div>
      <ul className={styles.list}>
        {caution.map((instruction, idx) => (
          <li key={idx}>{instruction}</li>
        ))}
      </ul>
    </div>
  );
}
