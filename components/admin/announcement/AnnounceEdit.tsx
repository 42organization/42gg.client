import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRecoilValue } from 'recoil';
import { userState } from 'utils/recoil/layout';
import instance from 'utils/axios';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { QUILL_EDIT_MODULES, QUILL_FORMATS } from 'types/quillTypes';
import styles from 'styles/admin/announcement/AnnounceEdit.module.scss';

// for test
import axios from 'axios';

const Quill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export default function AnnounceEdit() {
  const currentUserId = useRecoilValue(userState).intraId;
  const [content, setContent] = useState('');

  useEffect(() => {
    resetHandler();
  }, []);

  const resetHandler = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/pingpong/announcement`
      );
      setContent(res?.data.content);
    } catch (e) {
      alert(e);
    }
  };

  const postHandler = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/pingpong/admin/announcement`,
        {
          content,
          creatorIntraId: currentUserId,
          createdTime: new Date(),
        }
      );
      alert(res?.data.text);
    } catch (e) {
      alert(e);
    }
  };

  const deleteHandler = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/pingpong/admin/announcement`,
        {
          deleterIntraId: currentUserId,
          deletedTime: new Date(),
        }
      );
      alert(res?.data.text);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className={styles.container}>
      {content && (
        <div className={styles.announceModal}>
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
      )}
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
          <button onClick={postHandler}>생성</button>
          <button onClick={deleteHandler}>공지 삭제</button>
        </div>
      </div>
    </div>
  );
}
