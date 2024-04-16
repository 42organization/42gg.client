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
} from 'types/admin/adminRecruitmentsTypes';
import useRecruitmentUserFilter from 'hooks/recruitments/useRecruitmentUserFilter';
import styles from 'styles/admin/recruitments/RecruitmentsUser.module.scss';
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

// FIXME : FilterQptionsUI 이름 변경하기 (의미를 알아보기 어려움)
function FilterQptionsUI(
  recruitUserData: IrecruitUserTable[],
  recruitId: number
) {
  const [answers, setAnswers] = useState<Array<IcheckItem>>([]);
  const { checklistIds, handleChecklistChange } =
    useRecruitmentUserFilter(recruitId);

  useEffect(() => {
    setAnswers(
      recruitUserData.reduce((acc, recruit) => {
        recruit.form.forEach((formItem) => {
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
                <ListItemText primary={answer.content} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default FilterQptionsUI;
