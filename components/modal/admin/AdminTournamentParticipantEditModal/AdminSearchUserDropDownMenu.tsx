import { Menu, MenuItem } from '@mui/material';

interface AdminSearchUserDropDownMenuProps {
  inputRef: HTMLInputElement | null;
  menuOpen: boolean;
  onMenuClose: () => void;
  userList: string[];
  onMenuClick: (id: string) => void;
}

export default function AdminSearchUserDropDownMenu({
  inputRef,
  menuOpen,
  onMenuClose,
  userList,
  onMenuClick,
}: AdminSearchUserDropDownMenuProps) {
  return (
    <Menu
      id='simple-menu'
      anchorEl={inputRef}
      keepMounted
      open={menuOpen}
      onClose={onMenuClose}
    >
      {userList.map((id) => (
        <MenuItem key={id} onClick={() => onMenuClick(id)}>
          {id}
        </MenuItem>
      ))}
      <small>
        {' '}
        <b>esc</b>: 포커스 탈출{' '}
      </small>
    </Menu>
  );
}
