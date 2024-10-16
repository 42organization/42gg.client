import { useState } from 'react';
import { KeyboardArrowDown } from '@mui/icons-material';
import { Collapse, ListItemButton, ListItemText } from '@mui/material';
import style from 'styles/takgu/recruit/Main/collapseListItem.module.scss';

function CollapseListItem({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);

  return (
    <>
      <ListItemButton
        className={style.listButton}
        onClick={() => setOpen((prev) => !prev)}
      >
        <ArrowIcon open={open} />
        <ListItemText
          primaryTypographyProps={{ className: style.listButtonText }}
          primary={title}
        />
      </ListItemButton>
      {/* TODO : Collapse 옵션 좀 더 찾아볼것 */}
      <Collapse in={open}>{children}</Collapse>
    </>
  );
}

const ArrowIcon = ({ open }: { open: boolean }) => {
  return (
    <KeyboardArrowDown
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
    />
  );
};

export default CollapseListItem;
