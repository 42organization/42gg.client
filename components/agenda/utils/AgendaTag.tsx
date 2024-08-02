import styles from 'styles/agenda/utils/AgendaTag.module.scss';

interface AgendaTagProps {
  tagName: string;
}

const AgendaTag: React.FC<AgendaTagProps> = ({ tagName }) => {
  let backgroundColor;
  switch (tagName) {
    case '공식':
      backgroundColor = '#39B8FF';
      break;
    case '비공식':
      backgroundColor = '#FCBA03';
      break;
    case '팀':
      backgroundColor = '#FF5D5D';
      break;
    case '과제':
      backgroundColor = '#FFB039';
      break;
    default:
      backgroundColor = '#000000';
  }
  return (
    <div className={styles.agendaTag} style={{ backgroundColor }}>
      #{tagName}
    </div>
  );
};

export default AgendaTag;
