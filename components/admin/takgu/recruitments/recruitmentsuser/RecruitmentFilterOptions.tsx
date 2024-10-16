import React, { useState, useEffect, useCallback } from 'react';
import {
  FormControl,
  Select,
  OutlinedInput,
  MenuItem,
  ListItemText,
  SelectChangeEvent,
} from '@mui/material';
import {
  IcheckItem,
  IrecruitUserTable,
} from 'types/admin/takgu/adminRecruitmentsTypes';
import useRecruitmentUserFilter from 'hooks/takgu/recruitments/useRecruitmentUserFilter';
import styles from 'styles/admin/takgu/recruitments/RecruitmentsUser.module.scss';
import RecruitSearchBar from './RecruitSearchBar';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function RecruitmentFilterOptions({ recruitId }: { recruitId: number }) {
  const { checklistIds, handleChecklistChange, recruitUserData } =
    useRecruitmentUserFilter(recruitId);
  const [answers, setAnswers] = useState<Array<IcheckItem>>([]);

  useEffect(() => {
    setAnswers(
      recruitUserData.applicationResults.reduce((acc, recruit) => {
        recruit.forms?.forEach((formItem) => {
          if (formItem.inputType !== 'TEXT') {
            formItem.checkedList?.forEach((item) => {
              if (!acc.some((answer) => answer.checkId === item.checkId)) {
                acc.push(item);
              }
            });
          }
        });
        return acc;
      }, [] as Array<IcheckItem>)
    );
  }, [recruitUserData]);

  return (
    <div className={styles.filterWrap}>
      <div className={styles.searchWrap}>
        <RecruitSearchBar recruitId={recruitId} />
      </div>
      <div className={styles.selectWrap}>
        <FormControl sx={{ m: 1, width: 200 }}>
          <Select
            labelId='demo-multiple-checkbox-label'
            id='demo-multiple-checkbox'
            multiple
            value={checklistIds}
            onChange={handleChecklistChange}
            input={<OutlinedInput label='Tag' />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {answers.map((answer: IcheckItem, index) => (
              <MenuItem key={index} value={answer.checkId}>
                <ListItemText primary={answer.contents} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default RecruitmentFilterOptions;
