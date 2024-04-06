import React, { useState } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TableCell, TableRow, IconButton, TableRowProps } from '@mui/material';
import { IrecruitUserTable } from 'types/admin/adminRecruitmentsTypes';
import { DetailContentHover } from 'components/admin/common/AdminTable';
import styles from 'styles/admin/recruitments/RecruitmentsUser.module.scss';

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

function renderTableCells(recruit: IrecruitUserTable, questions: string[]) {
  const answers = questions.map((question) => {
    const formItem = recruit.form.find((form) => form.question === question);
    if (!formItem) return 'N/A';

    switch (formItem.inputType) {
      case 'TEXT':
        return formItem.answer;
      case 'SINGLE_CHECK':
        return formItem.checkedList?.map((item) => item.content).join(', ');
      case 'MULTI_CHECK':
        return formItem.checkedList?.map((item) => item.content).join(', ');
      default:
        return 'N/A';
    }
  });

  return (
    <ExpandableTableRow
      key={recruit.applicationId}
      expandComponent={
        <div style={{ padding: '16px' }}>
          <div>
            <strong>intraId:</strong> {recruit.intraId}
          </div>
          <div>
            <strong>status:</strong> {recruit.status}
          </div>
          {recruit.form.map((form, index) => (
            <div key={index}>
              <strong>{form.question}</strong>:{' '}
              {form.answer
                ? form.answer
                : form.checkedList?.map((item) => item.content).join(', ')}
            </div>
          ))}
        </div>
      }
    >
      <TableCell className={styles.tableBodyItem}>{recruit.intraId}</TableCell>
      <TableCell className={styles.tableBodyItem}>{recruit.status}</TableCell>
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

export default renderTableCells;
