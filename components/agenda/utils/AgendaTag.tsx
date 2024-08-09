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

export default AgendaTag;
