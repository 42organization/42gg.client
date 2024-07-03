import { ChangeEvent, RefObject, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { ITournamentEditInfo } from 'types/admin/adminTournamentTypes';
import { QUILL_EDIT_MODULES, QUILL_FORMATS } from 'types/quillTypes';
import { instanceInManage } from 'utils/axios';
import { dateToKRIOSString, dateToKRLocaleTimeString } from 'utils/handleTime';
import { toastState } from 'utils/recoil/toast';
import DynamicQuill from 'components/DynamicQuill';
import styles from 'styles/admin/tournament/TournamentEdit.module.scss';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import TournamentModalPreview from './TournamentModalPreview';
import { AdminTableHead } from '../common/AdminTable';

const tableTitle: { [key: string]: string } = {
  title: '토너먼트 이름',
  startTime: '시작 시간',
  endTime: '종료 시간',
  type: '유형',
};

interface TournamentEditProps {
  editorRef: RefObject<HTMLDivElement>;
  tournamentEditInfo: ITournamentEditInfo;
  inputChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  selectChangehandler: (event: ChangeEvent<HTMLSelectElement>) => void;
  quillChangeHandler: (
    value: string,
    delta: any,
    source: string,
    editor: any
  ) => void;
  resetHandler: () => Promise<void>;
}

export default function TournamentEdit({
  editorRef,
  tournamentEditInfo,
  inputChangeHandler,
  selectChangehandler,
  quillChangeHandler,
  resetHandler,
}: TournamentEditProps) {
  const tournamentPatchResponse: { [key: string]: string } = {
    SUCCESS: '토너먼트가 성공적으로 수정되었습니다.',
  };
  const tournamentCreateResponse: { [key: string]: string } = {
    SUCCESS: '토너먼트가 성공적으로 등록되었습니다.',
  };

  const setSnackbar = useSetRecoilState(toastState);

  useEffect(() => {
    resetHandler();
  }, []);

  const patchHandler = async () => {
    try {
      const req = {
        title: tournamentEditInfo.title,
        contents: tournamentEditInfo.contents,
        startTime: dateToKRIOSString(new Date(tournamentEditInfo.startTime)),
        endTime: dateToKRIOSString(new Date(tournamentEditInfo.endTime)),
        type: tournamentEditInfo.type,
      };
      await instanceInManage.patch(
        `/tournaments/${tournamentEditInfo.tournamentId}`,
        req
      );
      setSnackbar({
        toastName: `patch request`,
        severity: 'success',
        message: `🔥 ${tournamentPatchResponse.SUCCESS} 🔥`,
        clicked: true,
      });
    } catch (e: any) {
      setSnackbar({
        toastName: `bad request`,
        severity: 'error',
        message: `🔥 ${e.response.data.message} 🔥`,
        clicked: true,
      });
    }
  };

  const postHandler = async () => {
    try {
      await instanceInManage.post(`/tournaments`, {
        title: tournamentEditInfo.title,
        contents: tournamentEditInfo.contents,
        startTime: dateToKRIOSString(new Date(tournamentEditInfo.startTime)),
        endTime: dateToKRIOSString(new Date(tournamentEditInfo.endTime)),
        type: tournamentEditInfo.type,
      });
      setSnackbar({
        toastName: `post request`,
        severity: 'success',
        message: `🔥 ${tournamentCreateResponse.SUCCESS} 🔥`,
        clicked: true,
      });
    } catch (e: any) {
      setSnackbar({
        toastName: `bad request`,
        severity: 'error',
        message: `🔥 ${e.response.data.message} 🔥`,
        clicked: true,
      });
    }
  };

  return (
    <div className={styles.container} ref={editorRef}>
      <div className={styles.tournamentModal}>
        <TournamentModalPreview
          tournamentEditInfo={tournamentEditInfo}
        ></TournamentModalPreview>
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
                    name='title'
                    value={tournamentEditInfo.title}
                    onChange={inputChangeHandler}
                  />
                </TableCell>
                <TableCell className={styles.tableBodyItem}>
                  <input
                    type='datetime-local'
                    name='startTime'
                    value={tournamentEditInfo.startTime}
                    step='60'
                    onChange={inputChangeHandler}
                  />
                </TableCell>
                <TableCell className={styles.tableBodyItem}>
                  <input
                    type='datetime-local'
                    name='endTime'
                    value={tournamentEditInfo.endTime}
                    step='60'
                    onChange={inputChangeHandler}
                  />
                </TableCell>
                <TableCell className={styles.tableBodyItem}>
                  <select
                    name='type'
                    value={tournamentEditInfo.type ?? ''}
                    onChange={selectChangehandler}
                  >
                    <option value='CUSTOM'>CUSTOM</option>
                    <option value='ROOKIE'>ROOKIE</option>
                    <option value='MASTER'>MASTER</option>
                  </select>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <DynamicQuill
          className={styles.quillEditor}
          modules={QUILL_EDIT_MODULES}
          formats={QUILL_FORMATS}
          theme='snow'
          value={tournamentEditInfo.contents}
          onChange={quillChangeHandler}
        />
        <div className={styles.editorBtnContainer}>
          <button onClick={resetHandler}>초기화</button>
          {tournamentEditInfo.tournamentId ? (
            <button className={styles.edit} onClick={patchHandler}>
              수정
            </button>
          ) : (
            <button className={styles.create} onClick={postHandler}>
              생성
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
