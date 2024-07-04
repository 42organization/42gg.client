import React from 'react';
import styles from 'styles/takgu/Layout/LoudSpeaker.module.scss';

const LoudSpeaker = () => {
  return (
    <svg
      className={styles.loudSpeaker}
      viewBox='0 0 15 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M14.2463 0.546631C14.1801 0.546631 14.1121 0.558936 14.0441 0.587061L3.99722 4.65815H1.13863C0.98524 4.65815 0.859741 4.78823 0.859741 4.94995V10.2058C0.859741 10.3675 0.98524 10.4976 1.13863 10.4976H2.90956C2.84507 10.7015 2.81195 10.9177 2.81195 11.1375C2.81195 12.2959 3.7497 13.238 4.9036 13.238C5.86924 13.238 6.68324 12.5771 6.92378 11.6841L14.0458 14.5705C14.1138 14.5968 14.1818 14.6109 14.248 14.6109C14.5426 14.6109 14.8058 14.3613 14.8058 14.0273V1.13022C14.8041 0.79624 14.5426 0.546631 14.2463 0.546631ZM4.9036 11.9777C4.44169 11.9777 4.06694 11.6015 4.06694 11.1375C4.06694 10.9406 4.13492 10.7525 4.25867 10.6031L5.73851 11.2025C5.70365 11.6349 5.34284 11.9777 4.9036 11.9777Z'
        fill='#270A46'
      />
    </svg>
  );
};

export default LoudSpeaker;
