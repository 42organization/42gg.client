import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { IrecruitEditInfo } from 'types/admin/adminRecruitmentsTypes';
import styles from 'styles/admin/recruitments/recruitmentEdit/components/ActionSelectorButtons.module.scss';

interface ActionSelectorButtonsProps {
  recruitmentEditInfo: IrecruitEditInfo;
  actionType: 'CREATE' | 'MODIFY';
}

export default function recruitmentsEdit({
  recruitmentEditInfo,
  actionType,
}: ActionSelectorButtonsProps) {
  return (
    <div className={styles.mainContainer}>
      {actionType === 'CREATE' ? (
        <div className={styles.importWrapper}>
          <FormControl fullWidth size='small'>
            <InputLabel>기존 공고</InputLabel>
            <Select
              value='TEXT'
              label='기존 공고'
              style={{ backgroundColor: 'white' }}
              // onChange={selectChangehandler}
            >
              <MenuItem value={'TEXT'}>1회 모집공고</MenuItem>
              <MenuItem value={'SINGLE_CHECK'}>2회 모집공고</MenuItem>
              <MenuItem value={'MULTI_CHECK'}>3회 모집공고</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant='contained'
            style={{ marginLeft: '0.5rem', width: '8rem' }}
          >
            불러오기
          </Button>
        </div>
      ) : (
        <></>
      )}
      {actionType === 'CREATE' && (
        <Button variant='contained'>공고 생성</Button>
      )}
      {actionType === 'MODIFY' && (
        <Button variant='contained'>공고 수정</Button>
      )}
    </div>
  );
}
