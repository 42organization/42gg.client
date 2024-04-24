import React, { useState, useEffect } from 'react';
import {
  FormControl,
  Select,
  OutlinedInput,
  MenuItem,
  ListItemText,
} from '@mui/material';
import {
  IcheckItem,
  IrecruitArrayTable,
} from 'types/admin/adminRecruitmentsTypes';
import styles from 'styles/admin/recruitments/RecruitmentsUser.module.scss';

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

interface IRecruitmentFilterOptions {
  checkIds: IcheckItem;
  questionId: number | undefined | null;
}

function RecruitmentFilterOptions({
  recruitId,
  checklistIds,
  handleChecklistChange,
  recruitUserData,
}: {
  recruitId: number;
  checklistIds: Array<string>;
  handleChecklistChange: any;
  recruitUserData: IrecruitArrayTable;
}) {
  const [answers, setAnswers] = useState<Array<IRecruitmentFilterOptions>>([]);
  useEffect(() => {
    setAnswers(
      recruitUserData.applicationResults.reduce((acc, recruit) => {
        recruit.forms?.forEach((formItem) => {
          if (formItem.inputType !== 'TEXT') {
            formItem.checkedList?.forEach((item) => {
              if (
                !acc.some((answer) => answer.checkIds.checkId === item.checkId)
              ) {
                acc.push({ checkIds: item, questionId: formItem.questionId });
              }
            });
          }
        });
        return acc;
      }, [] as Array<IRecruitmentFilterOptions>)
    );
  }, [recruitUserData]);

  return (
    <div className={styles.selectWrap}>
      <FormControl sx={{ m: 1, width: 200 }}>
        <Select
          labelId='multiple-checkbox-label'
          id='multiple-checkbox'
          multiple
          value={checklistIds}
          onChange={handleChecklistChange}
          input={<OutlinedInput label='Tag' />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {answers.map((answer: IRecruitmentFilterOptions, index) => (
            <MenuItem key={index} value={answer.checkIds.contents}>
              <ListItemText primary={answer.checkIds.contents} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default RecruitmentFilterOptions;
