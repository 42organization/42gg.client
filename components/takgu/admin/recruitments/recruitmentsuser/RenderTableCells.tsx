import React, { useState } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TableCell, TableRow, IconButton, TableRowProps } from '@mui/material';
import { IrecruitUserTable } from 'types/admin/adminRecruitmentsTypes';
import { DetailContentHover } from 'components/takgu/admin/common/AdminTable';
import styles from 'styles/takgu/admin/recruitments/RecruitmentsUser.module.scss';

interface ExpandableTableRowProps extends TableRowProps {
  children: React.ReactNode;
  expandComponent: React.ReactNode;
}

const ExpandableTableRow: React.FC<ExpandableTableRowProps> = ({
  children,
  expandComponent,
  ...otherProps
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenCount = React.Children.count(children);

  const expandedClickHandler = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <TableRow {...otherProps}>
        <TableCell padding='checkbox'>
          <IconButton onClick={expandedClickHandler}>
            {isExpanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          </IconButton>
        </TableCell>
        {children}
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell padding='checkbox' colSpan={childrenCount}>
            {expandComponent}
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

function RenderTableCells(
  recruit: IrecruitUserTable,
  questions: string[],
  status: string
) {
  const answers = questions.map((question) => {
    const formItem = recruit.forms.find((form) => form.question === question);
    if (!formItem) return 'N/A';
    switch (formItem.inputType) {
      case 'TEXT':
        return formItem.answer;
      case 'SINGLE_CHECK':
        return formItem.checkedList?.map((item) => item.contents).join(', ');
      case 'MULTI_CHECK':
        return formItem.checkedList?.map((item) => item.contents).join(', ');
      default:
        return 'N/A';
    }
  });
  if (recruit.status === 'PASS') status = '합격';
  else if (recruit.status === 'INTERVIEW_FAIL') {
    status = '면접 불합격';
  } else if (recruit.status === 'APPLICATION_FAIL') {
    status = '지원서 불합격';
  } else if (recruit.status === 'PROGRESS_DOCS') {
    status = '면접 시간 발표 전';
  } else if (recruit.status === 'INTERVIEW') {
    status = '면접 시간 공개';
  } else if (recruit.status === 'FAIL') {
    status = '불합격';
  } else {
    status = '심사중';
  }

  return (
    <ExpandableTableRow
      key={recruit.applicationId}
      expandComponent={
        <div className={styles.expandableTableRow}>
          <div>
            <strong>intraId:</strong> {recruit.intraId}
          </div>
          <div>
            <strong>status:</strong> {status}
          </div>
          {recruit.forms &&
            recruit.forms.map((form, index) => (
              <div key={index}>
                <strong>{form.question}</strong>:{' '}
                {form.answer
                  ? form.answer
                  : form.checkedList?.map((item) => item.contents).join(', ')}
              </div>
            ))}
        </div>
      }
    >
      <TableCell className={styles.tableBodyItem}>{recruit.intraId}</TableCell>
      <TableCell className={styles.tableBodyItem}>{status}</TableCell>
      {answers.map(
        (answer: string | undefined, index: React.Key | null | undefined) => (
          <TableCell className={styles.tableBodyItem} key={index}>
            <div className={styles.tableBodyItem}>
              <DetailContentHover content={answer} maxLen={16} />
            </div>
          </TableCell>
        )
      )}
    </ExpandableTableRow>
  );
}

export default RenderTableCells;
