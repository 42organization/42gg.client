import commonStyle from 'styles/recruit/common.module.scss';
import textStyle from 'styles/recruit/text.module.scss';

const StickyHeader = ({ headerTitle }: { headerTitle: string }) => {
  return (
    <div className={commonStyle.stickyHeader}>
      <div className={commonStyle.stickyContainer}>
        <span className={textStyle.pageTitle}>{headerTitle}</span>
      </div>
    </div>
  );
};

export default StickyHeader;
