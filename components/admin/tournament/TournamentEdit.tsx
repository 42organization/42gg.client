import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { QUILL_EDIT_MODULES, QUILL_FORMATS } from 'types/quillTypes';
import { toastState } from 'utils/recoil/toast';
import { useUser } from 'hooks/Layout/useUser';
import styles from 'styles/admin/announcement/AnnounceEdit.module.scss';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { AdminTableHead } from '../common/AdminTable';

const Quill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const tableTitle: { [key: string]: string } = {
  tournamentName: '토너먼트 이름',
  startTime: '시작 시간',
  endTime: '종료 시간',
  tournamentType: '토너먼트 유형',
};

export default function TournamentEdit() {
  const user = useUser();
  const setSnackbar = useSetRecoilState(toastState);
  const [content, setContent] = useState('');
  const announceCreateResponse: { [key: string]: string } = {
    SUCCESS: '공지사항이 성공적으로 등록되었습니다.',
    AN300:
      '이미 활성화된 공지사항이 있습니다. 새로운 공지사항을 등록하시려면 활성화된 공지사항을 삭제해 주세요.',
  };
  const announceDeleteResponse: { [key: string]: string } = {
    SUCCESS: '공지사항이 성공적으로 삭제되었습니다.',
    AN100: '삭제 할 활성화된 공지사항이 없습니다.',
  };

  useEffect(() => {
    resetHandler();
  }, []);

  const resetHandler = async () => {
    try {
      //const res = await instance.get('/pingpong/announcement');
      setContent('가장 최근 토너먼트 내용'); //setContent(res?.data.content);
    } catch (e) {
      alert(e);
    }
  };

  if (!user) return null;

  const currentUserId = user.intraId;

  const postHandler = async () => {
    // try {
    //   await instanceInManage.post(`/announcement`, {
    //     content,
    //     creatorIntraId: currentUserId,
    //   });
    //   setSnackbar({
    //     toastName: `post request`,
    //     severity: 'success',
    //     message: `🔥 ${announceCreateResponse.SUCCESS} 🔥`,
    //     clicked: true,
    //   });
    // } catch (e: any) {
    //   setSnackbar({
    //     toastName: `bad request`,
    //     severity: 'error',
    //     message: `🔥 ${announceCreateResponse[e.response.data.code]} 🔥`,
    //     clicked: true,
    //   });
    // }
  };

  const deleteHandler = async () => {
    // try {
    //   await instanceInManage.delete(`/announcement/${currentUserId}`);
    //   setSnackbar({
    //     toastName: `delete request`,
    //     severity: 'success',
    //     message: `🔥 ${announceDeleteResponse.SUCCESS} 🔥`,
    //     clicked: true,
    //   });
    // } catch (e: any) {
    //   setSnackbar({
    //     toastName: `bad request`,
    //     severity: 'error',
    //     message: `🔥 ${announceDeleteResponse[e.response.data.code]} 🔥`,
    //     clicked: true,
    //   });
    // }
  };

  return (
    <div className={styles.container}>
      <div className={styles.announceModal}>
        <h1>추후 토너먼트 페이지 모달 완성시 추가 예정</h1>
        {/* {content ? (
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
        ) : (
          <div className={styles.noActive}>활성화된 공지사항이 없습니다 !</div>
        )} */}
      </div>
      <div className={styles.editorContainer}>
        <TableContainer className={styles.tableContainer} component={Paper}>
          <Table className={styles.table} aria-label='customized table'>
            <AdminTableHead tableName={'tournamentCreate'} table={tableTitle} />
            <TableBody className={styles.tableBody}>
              <TableRow>
                <TableCell className={styles.tableBodyItem}>
                  <input
                    type='text'
                    name='tournamentName'
                    // onChange={inputChangeHandler}
                  />
                </TableCell>
                <TableCell className={styles.tableBodyItem}>
                  <input
                    type='datetime-local'
                    name='startTime'
                    // onChange={inputChangeHandler}
                  />
                </TableCell>
                <TableCell className={styles.tableBodyItem}>
                  <input
                    type='datetime-local'
                    name='endTime'
                    // onChange={inputChangeHandler}
                  />
                </TableCell>
                <TableCell className={styles.tableBodyItem}>
                  <select
                    name='tournamentType'
                    // value={selectedValue}
                    // onChange={handleSelectChange}
                  >
                    <option value='CUSTOM'>CUSTOM</option>
                    <option value='ROOKIE'>ROOKIE</option>
                    <option value='MASTER'>MASTER</option>
                    {/* You can add more options here */}
                  </select>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
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
          <button onClick={deleteHandler}>토너먼트 삭제</button>
        </div>
      </div>
    </div>
  );
}
