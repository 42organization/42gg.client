import dynamic from 'next/dynamic';
import { QUILL_EDIT_MODULES, QUILL_FORMATS } from 'types/quillTypes';
import 'react-quill/dist/quill.snow.css';
import styles from 'styles/admin/recruitments/recruitmentEdit/components/QuillDescriptionEditor.module.scss';

const Quill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

interface QuillDescriptionEditorProps {
  content: string;
  setContent: (content: string) => void;
}

export default function QuillDescriptionEditor({
  content,
  setContent,
}: QuillDescriptionEditorProps) {
  const quillChangeHandler = (value: string) => {
    setContent(value);
  };

  return (
    <div className={styles.quillEditorWrapper}>
      <Quill
        className={styles.quillEditor}
        modules={QUILL_EDIT_MODULES}
        formats={QUILL_FORMATS}
        theme='snow'
        value={content}
        onChange={quillChangeHandler}
      />
    </div>
  );
}
