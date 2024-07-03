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
import { modalState } from 'utils/recoil/modal';
import { tableFormat } from 'constants/takgu/admin/table';
import { AdminTableHead } from 'components/takgu/admin/common/AdminTable';
import { usePartyTemplate } from 'hooks/takgu/party/usePartyTemplate';
import styles from 'styles/admin/party/AdminPartyCommon.module.scss';

const tableTitle: { [key: string]: string } = {
  gameTemplateId: '템플릿번호',
  categoryName: '카테고리',
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
  const { templates, deleteTemplate } = usePartyTemplate();
  const setModal = useSetRecoilState(modalState);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    console.log('Render');
  }, [templates]);

  const handleEditTemplate = (template?: PartyGameTemplate) => {
    setModal({ modalName: 'ADMIN-PARTY_TEMPLATE', template });
  };

  const handleAddTemplate = () => {
    setModal({ modalName: 'ADMIN-PARTY_TEMPLATE' });
  };

  const deleteHandler = (gameTemplateId: number) => {
    deleteTemplate({ gameTemplateId });
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <div className={styles.AdminTableWrap}>
        <div className={styles.header}>
          <span className={styles.title}>템플릿 관리</span>
          <button
            onClick={handleAddTemplate}
            className={`${styles.button_1} ${styles.add}`}
          >
            추가
          </button>
        </div>
        <div className={styles.container}>
          <ul className={styles.ullist}>
            <li
              className={styles.lilist}
              onClick={() => handleCategorySelect('all')}
            >
              전체
            </li>
            <li
              className={styles.lilist}
              onClick={() => handleCategorySelect('콘솔게임')}
            >
              콘솔게임
            </li>
            <li
              className={styles.lilist}
              onClick={() => handleCategorySelect('보드게임')}
            >
              보드게임
            </li>
            <li
              className={styles.lilist}
              onClick={() => handleCategorySelect('기타')}
            >
              기타
            </li>
          </ul>
        </div>
        <TableContainer className={styles.tableContainer} component={Paper}>
          <Table className={styles.table} aria-label='UserManagementTable'>
            <AdminTableHead tableName={'partyTemplate'} table={tableTitle} />
            <TableBody className={styles.tableBody}>
              {templates
                .filter(
                  (t) =>
                    selectedCategory === 'all' ||
                    t.categoryName === selectedCategory
                )
                .map((t) => (
                  <TableRow key={t.gameTemplateId}>
                    {tableFormat['partyTemplate'].columns.map((columnName) => {
                      return (
                        <TableCell
                          key={columnName}
                          className={styles.tableBodyItem}
                        >
                          {columnName === 'change' && (
                            <button
                              onClick={() => handleEditTemplate(t)}
                              className={`${styles.button_1} ${styles.edit}`}
                            >
                              수정
                            </button>
                          )}
                          {columnName === 'delete' ? (
                            <button
                              onClick={() => deleteHandler(t.gameTemplateId)}
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
