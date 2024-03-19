import dynamic from 'next/dynamic';
import { Paper } from '@mui/material';
import { QUILL_EDIT_MODULES, QUILL_FORMATS } from 'types/quillTypes';
import 'react-quill/dist/quill.snow.css';
import styles from 'styles/admin/recruitments/recruitmentEdit/components/QuillDescriptionEditor.module.scss';

const Quill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

interface QuillDescriptionEditorProps {
  contents: string;
  setRecruitmentEditInfoField: (fieldName: string, value: any) => void;
}

export default function QuillDescriptionEditor({
  contents,
  setRecruitmentEditInfoField,
}: QuillDescriptionEditorProps) {
  const quillChangeHandler = (value: string) => {
    setRecruitmentEditInfoField('contents', value);
  };

  return (
    <Paper elevation={3} className={styles.quillEditorWrapper}>
      <Quill
        className={styles.quillEditor}
        modules={QUILL_EDIT_MODULES}
        formats={QUILL_FORMATS}
        theme='snow'
        value={contents}
        onChange={quillChangeHandler}
      />
    </Paper>
  );
}
