import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import styles from 'styles/admin/announcement/AnnounceEdit.module.scss';
import { useState } from 'react';

const Quill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const editorModules = {
  toolbar: [
    [{ header: [] }, { size: [] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ align: [] }],
    ['link'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'bullet',
  'indent',
  'align',
  'link',
];

export default function AnnounceEdit() {
  const [content, setContent] = useState('');

  return (
    <div className={styles.container}>
      <div className={styles.announceModalView}>
        <div className={styles.announceModalContainer}>
          <div className={styles.modalTitle}>Notice!</div>
          <Quill
            className={styles.quillViewer}
            readOnly={true}
            formats={formats}
            value={content}
            theme='bubble'
          />
          <div className={styles.checkBox}>
            <input type='checkbox' id='neverSeeAgain' name='neverSeeAgain' />
            <label htmlFor='neverSeeAgain'>
              <div>하루 동안 열지 않기</div>
            </label>
          </div>
          <div className={styles.buttons}>
            <div className={styles.positive}>
              <input type='button' value='닫기' />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.editorContainer}>
        <Quill
          className={styles.quillEditor}
          modules={editorModules}
          formats={formats}
          theme='snow'
          onChange={(e) => setContent(e)}
        />
        <div className={styles.editorBtnContainer}>
          <button>초기화</button>
          <button>수정</button>
          <button>공지 삭제</button>
        </div>
      </div>
    </div>
  );
}
