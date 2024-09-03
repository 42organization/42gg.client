import styles from 'styles/agenda/utils/AgendaTag.module.scss';

interface AgendaTagProps {
  tagName: string;
}

const AgendaTag: React.FC<AgendaTagProps> = ({ tagName }) => {
  const tagBackground = styles[tagName] || styles.default;

  return (
    <div className={`${styles.agendaTag} ${tagBackground}`}>#{tagName}</div>
  );
};

const DefaultTag = ({ tagName }: AgendaTagProps) => {
  if (!tagName) return null;
  return <div className={`${styles.defaultTag}`}>#{tagName}</div>;
};

export { AgendaTag, DefaultTag };
