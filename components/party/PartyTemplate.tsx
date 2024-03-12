import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { PartyGameTemplate } from 'types/partyTypes';
import { mockInstance } from 'utils/mockAxios';
import { modalState } from 'utils/recoil/modal';
import { tableFormat } from 'constants/admin/table';
import { AdminTableHead } from 'components/admin/common/AdminTable';
import styles from 'styles/party/PartyMain.module.scss';

const tableTitle: { [key: string]: string } = {
  gameTemplateId: '템플릿번호',
  categoryId: '카테고리',
  gameName: '템플릿이름',
  maxGamePeople: '최대인원',
  minGamePeople: '최소인원',
  maxGameTime: '최대게임시간',
  minGameTime: '최소게임시간',
  genre: '장르',
  difficulty: '난이도',
  summary: '요약',
  change: '수정',
  delete: '삭제',
};

export default function PartyTemplate() {
  const [templates, setTemplates] = useState<PartyGameTemplate[]>([]);
  const newTemplate = useState<PartyGameTemplate>({
    gameTemplateId: 0,
    categoryId: 0,
    gameName: '',
    maxGamePeople: 0,
    minGamePeople: 0,
    maxGameTime: 0,
    minGameTime: 0,
    genre: '',
    difficulty: '',
    summary: '',
  });
  const setModal = useSetRecoilState(modalState);

  useEffect(() => {
    fetchPartyPenalty();
  }, []);

  const handleAddOrEditTemplate = (template: PartyGameTemplate | null) => {
    if (template === null) {
      template = newTemplate;
    }
    setModal({ modalName: 'ADMIN-PARTY_TEMPLATE', template });
  };

  const fetchPartyPenalty = () => {
    mockInstance
      .get(`/party/templates`)
      .then(({ data }: { data: PartyGameTemplate[] }) => {
        setTemplates(data);
      })
      .catch((error) => {
        console.error('템플릿 정보를 가져오는 중 오류가 발생했습니다:', error);
      });
  };

  const deleteTemplate = (templateId: number) => {
    mockInstance
      .delete(`/party/admin/templates/${templateId}`)
      .then(() => {
        fetchPartyPenalty();
      })
      .catch((error) => {
        console.error('템플릿 삭제 중 오류가 발생했습니다:', error);
      });
  };
  return (
    <div>
      <div className={styles.userManagementWrap}>
        <div className={styles.header}>
          <span className={styles.title}>템플릿 관리</span>
        </div>
        <button
          onClick={() => handleAddOrEditTemplate(null)}
          className={`${styles.button_1} ${styles.add}`}
        >
          추가
        </button>
        <TableContainer className={styles.tableContainer} component={Paper}>
          <Table className={styles.table} aria-label='UserManagementTable'>
            <AdminTableHead tableName={'partyTemplate'} table={tableTitle} />
            <TableBody className={styles.tableBody}>
              {templates.map((t) => (
                <TableRow key={t.gameTemplateId} className={styles.tableRow}>
                  {tableFormat['partyTemplate'].columns.map((columnName) => {
                    return (
                      <TableCell
                        className={styles.tableBodyItem}
                        key={columnName}
                      >
                        {columnName === 'change' && (
                          <button
                            onClick={() => handleAddOrEditTemplate(t)}
                            className={`${styles.button_1} ${styles.add}`}
                          >
                            수정
                          </button>
                        )}
                        {columnName === 'delete' ? (
                          <button
                            onClick={() => deleteTemplate(t.gameTemplateId)}
                            className={`${styles.button_1} ${styles.delete}`}
                          >
                            삭제
                          </button>
                        ) : (
                          t[columnName as keyof PartyGameTemplate]?.toString()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
