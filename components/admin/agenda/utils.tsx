import { TableCell, TableRow } from '@mui/material';

interface INoContent {
  content: string;
  col: number;
}

export function NoContent({ content, col }: INoContent) {
  return (
    <TableRow>
      <TableCell colSpan={col} style={{ textAlign: 'center' }}>
        {content}
      </TableCell>
    </TableRow>
  );
}
