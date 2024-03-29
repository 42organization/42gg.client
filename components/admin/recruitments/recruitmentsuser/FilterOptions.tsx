import React, { useState, useEffect, useCallback } from 'react';
import {
  FormControl,
  Select,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
  SelectChangeEvent,
 TableRowProps } from '@mui/material';
import {
  IcheckItem,
  IrecruitUserTable,
} from 'types/admin/adminRecruitmentsTypes';
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

function FilterQptionsUI(
  recruitUserData: IrecruitUserTable[],
  questions: string[]
) {
  const [answers, setAnswers] = useState<Array<IcheckItem>>([]);
  const [checklistIds, setChecklistIds] = useState<Array<IcheckItem>>([]);
  const [searchString, setSearchString] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const initSearch = useCallback((searchString?: string) => {
    setSearchString(searchString || '');
    setCurrentPage(1);
  }, []);

  const handleChecklistChange = (
    event: SelectChangeEvent<typeof checklistIds>
  ) => {
    const {
      target: { value },
    } = event;
    typeof value !== 'string' ? setChecklistIds(value) : value;
  };

  useEffect(() => {
    const newAnswers: Array<IcheckItem> = [];

    recruitUserData.forEach((recruit) => {
      recruit.form.forEach((formItem) => {
        if (formItem.inputType !== 'TEXT') {
          formItem.checkedList?.forEach((item) => {
            if (!newAnswers.some((answer) => answer.checkId === item.checkId)) {
              newAnswers.push(item);
            }
          });
        }
      });
    });

    setAnswers(newAnswers);
  }, [recruitUserData, questions]);

  return (
    <div className={styles.filterWrap}>
      <div className={styles.searchWrap}>
        <RecruitSearchBar initSearch={initSearch} />
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
              <MenuItem key={index} value={answer.content}>
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
