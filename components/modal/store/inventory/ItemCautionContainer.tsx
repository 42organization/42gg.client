type ItemCautionContainerProps = {
  caution: string[];
};

export function ItemCautionContainer({ caution }: ItemCautionContainerProps) {
  return (
    <div>
      <h4>주의사항</h4>
      <ul>
        {caution.map((instruction, idx) => (
          <li key={idx}>{instruction}</li>
        ))}
      </ul>
    </div>
  );
}
