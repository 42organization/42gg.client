import React, { useEffect, useState } from 'react';
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
import { tableFormat } from 'constants/admin/table';
import { AdminTableHead } from 'components/admin/common/AdminTable';
import styles from 'styles/party/PartyMain.module.scss';
import TemplateModal from './TemplateModal';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(
    null
  );
  //파티모달 머지후 적용시켜야함
  const handleAddOrEditTemplate = (templateId?: number) => {
    if (templateId) {
      setSelectedTemplateId(templateId);
    } else {
      setSelectedTemplateId(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTemplateId(null);
  };

  useEffect(() => {
    mockInstance
      .get(`/party/templates`)
      .then(({ data }: { data: PartyGameTemplate[] }) => {
        setTemplates(data);
      })
      .catch((error) => {
        console.error('템플릿 정보를 가져오는 중 오류가 발생했습니다:', error);
      });
  }, []);

  const deleteTemplate = (templateId: number) => {
    mockInstance
      .delete(`/party/admin/templates/${templateId}`)
      .then(() => {
        setTemplates(
          templates.filter((template) => template.gameTemplateId !== templateId)
        );
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
        <button onClick={() => handleAddOrEditTemplate()}>추가</button>
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
                            onClick={() =>
                              handleAddOrEditTemplate(t.gameTemplateId)
                            }
                          >
                            수정
                          </button>
                        )}
                        {columnName === 'delete' ? (
                          <button
                            onClick={() => deleteTemplate(t.gameTemplateId)}
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
      <div>
        <TemplateModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          template={
            selectedTemplateId !== null
              ? templates.find(
                  (template) => template.gameTemplateId === selectedTemplateId
                )
              : undefined
          }
        />
      </div>
    </div>
  );
}
