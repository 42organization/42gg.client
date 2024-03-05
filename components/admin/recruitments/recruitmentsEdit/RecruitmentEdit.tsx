// import { Dispatch, SetStateAction } from 'react';
// import RecruitmentsMain from 'components/admin/recruitments/RecruitmentsMain';
// import styles from 'styles/admin/recruitments/RecruitmentEdit/RecruitmentEdit.module.scss';
// import TitleTimeRangeSelector from './components/TitleTimeRangeSelector';
// import QuillDescriptionEditor from './components/QuillDescriptionEditor';
// import QuestionFormBuilder from './components/QuestionFormBuilder';
// import ActionSelectorButtons from './components/ActionSelectorButtons';

// interface RecruitmentEditProps {
//   setPage: Dispatch<SetStateAction<JSX.Element>>;
// }
// export default function RecruitmentEdit({ setPage }: RecruitmentEditProps) {
//   return (
//     <div className={styles.container}>
//       <button
//         onClick={() => {
//           setPage(<RecruitmentsMain setPage={setPage} />);
//         }}
//       >
//         메인으로가기
//       </button>
//       <TitleTimeRangeSelector />
//       <QuillDescriptionEditor />
//       <QuestionFormBuilder />
//       <ActionSelectorButtons />
//     </div>
//   );
// }
