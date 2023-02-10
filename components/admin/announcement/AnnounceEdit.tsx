import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRecoilValue } from 'recoil';
import { userState } from 'utils/recoil/layout';
import instance from 'utils/axios';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { QUILL_EDIT_MODULES, QUILL_FORMATS } from 'types/quillTypes';
import styles from 'styles/admin/announcement/AnnounceEdit.module.scss';

const Quill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export default function AnnounceEdit() {
  const currentUserId = useRecoilValue(userState).intraId;
  const [content, setContent] = useState('');
  const announceCreateResponse: { [key: string]: string } = {
    SUCCESS: '공지사항이 성공적으로 등록되었습니다.',
    AC001:
      '이미 활성화된 공지사항이 있습니다 새로운 공지사항을 등록하시려면 활성화된 공지사항을 삭제해 주세요.',
  };
  const announceDeleteResponse: { [key: string]: string } = {
    SUCCESS: '공지사항이 성공적으로 삭제되었습니다.',
    AD001: '삭제할 활성화된 공지사항이 없습니다',
  };

  useEffect(() => {
    resetHandler();
  }, []);

  const resetHandler = async () => {
    try {
      const res = await instance.get(`/pingpong/announcement`);
      setContent(res?.data.content);
    } catch (e) {
      alert(e);
    }
  };

  const postHandler = async () => {
    try {
      await instance.post(`/pingpong/admin/announcement`, {
        content,
        creatorIntraId: currentUserId,
        createdTime: new Date(),
      });
      alert(announceCreateResponse.SUCCESS);
    } catch (e: any) {
      alert(announceCreateResponse[e.response.data.code]);
    }
  };

  const deleteHandler = async () => {
    try {
      await instance.put(`/pingpong/admin/announcement`, {
        deleterIntraId: currentUserId,
        deletedTime: new Date(),
      });
      alert(announceDeleteResponse.SUCCESS);
    } catch (e: any) {
      alert(announceDeleteResponse[e.response.data.code]);
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
