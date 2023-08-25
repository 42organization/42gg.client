import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Iprofile, IprofileTable } from 'types/admin/adminReceiptType';
import { instanceInManage } from 'utils/axios';
import { getFormattedDateToString } from 'utils/handleTime';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
import { tableFormat } from 'constants/admin/table';
import AdminSearchBar from 'components/admin/common/AdminSearchBar';
import PageNation from 'components/Pagination';

const profileDeleteTableTitle: { [key: string]: string } = {
  profileId: 'ID',
  date: '사용일자',
  imageUri: '삭제한 사람',
  intraId: 'intra ID',
};

function ProfileDeleteHistoryList() {
  return <></>;
}
