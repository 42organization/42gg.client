import dynamic from 'next/dynamic';
import { useState } from 'react';
import instance from 'utils/axios';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import styles from 'styles/admin/announcement/AnnounceEdit.module.scss';

// for test
import axios from 'axios';

const Quill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const QUILL_EDIT_MODULES = {
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

const QUILL_FORMATS = [
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
  // api url
  // const API_URL = `/pingpong/admin/announcement`;

  // test url
  const API_URL = `http://localhost:3000/api/pingpong/admin/announcement`;

  const resetHandler = async () => {
    try {
      const res = await axios.get(API_URL);
      alert(res?.data.text);
      setContent(res?.data.content);
    } catch (e) {
      alert(e);
      return;
    }
  };

  const postHandler = async () => {
    try {
      const res = await axios.post(API_URL, { content });
      alert(res?.data.text);
    } catch (e) {
      alert(e);
      return;
    }
  };

  const deleteHandler = async () => {
    try {
      const res = await axios.delete(API_URL);
      alert(res?.data.text);
    } catch (e) {
      alert(e);
      return;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.announceModalView}>
        <div className={styles.announceModalContainer}>
          <div className={styles.modalTitle}>Notice!</div>
          <Quill
            className={styles.quillViewer}
            readOnly={true}
            formats={QUILL_FORMATS}
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
          modules={QUILL_EDIT_MODULES}
          formats={QUILL_FORMATS}
          theme='snow'
          value={content}
          onChange={(content) => setContent(content)}
        />
        <div className={styles.editorBtnContainer}>
          <button onClick={resetHandler}>초기화</button>
          <button onClick={postHandler}>수정</button>
          <button onClick={deleteHandler}>공지 삭제</button>
        </div>
      </div>
    </div>
  );
}
