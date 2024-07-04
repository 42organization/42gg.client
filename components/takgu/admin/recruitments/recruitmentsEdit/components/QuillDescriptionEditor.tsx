import { Paper } from '@mui/material';
import { QUILL_EDIT_MODULES, QUILL_FORMATS } from 'types/takgu/quillTypes';
import 'react-quill/dist/quill.snow.css';
import DynamicQuill from 'components/DynamicQuill';
import styles from 'styles/takgu/admin/recruitments/recruitmentEdit/components/QuillDescriptionEditor.module.scss';
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
      <DynamicQuill
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
