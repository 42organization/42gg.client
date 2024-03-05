import dynamic from 'next/dynamic';
import { QUILL_EDIT_MODULES, QUILL_FORMATS } from 'types/quillTypes';
import styles from 'styles/admin/recruitments/recruitmentEdit/components/QuillDescriptionEditor.module.scss';

const Quill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export default function QuillDescriptionEditor() {
  const quillChangeHandler = (
    value: string,
    delta: any,
    source: string,
    editor: any
  ) => {
    console.log(value);
  };
  return (
    <>
      <Quill
        className={styles.quillEditor}
        modules={QUILL_EDIT_MODULES}
        formats={QUILL_FORMATS}
        theme='snow'
        value='' //{tournamentEditInfo.contents}
        onChange={quillChangeHandler}
      />
    </>
  );
}
