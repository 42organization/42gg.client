type tmpProps = {
  item: {
    color: string;
    backgroundColor: string;
    fontSize: number;
  };
};

export default function TMP({ item }: tmpProps) {
  return (
    <div
      style={{
        color: item.color,
        backgroundColor: item.backgroundColor,
        fontSize: item.fontSize,
      }}
    >
      TMP
    </div>
  );
}
