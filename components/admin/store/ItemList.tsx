import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Iitem, IitemInfo, IitemList } from 'types/admin/adminStoreTypes';
import { modalState } from 'utils/recoil/modal';
import { tableFormat } from 'constants/admin/table';
import { useMockAxiosGet } from 'hooks/useAxiosGet';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import styles from 'styles/admin/store/ItemList.module.scss';
import { mockInstance } from 'utils/mockAxios';
import { toastState } from 'utils/recoil/toast';
import useUploadImg from 'hooks/useUploadImg';

const itemListTableTitle: { [key: string]: string } = {
  itemId: 'ID',
  itemName: '아이템명',
  imageUrl: '이미지',
  content: '설명',
  originalPrice: '원가',
  discount: '할인율',
  salePrice: '판매가격',
  edit: '수정',
  delete: '삭제',
};

const tableColumnName = [
  'itemId',
  'itemName',
  'imageUrl',
  'content',
  'originalPrice',
  'discount',
  'salePrice',
  'edit',
  'delete',
];

function ItemList() {
  const [itemListData, setItemListData] = useState<IitemList>({
    itemList: [],
  });
  const setModal = useSetRecoilState(modalState);
  const setSnackBar = useSetRecoilState(toastState);

  // api 연결 시 instanceInManage로 변경
  const getItemListHandler = useCallback(async () => {
    try {
      const res = await mockInstance.get(`items/store`);
      setItemListData(res.data);
    } catch (e) {
      setSnackBar({
        toastName: 'get itemList',
        severity: 'error',
        message: 'API 요청에 문제가 발생했습니다.',
        clicked: true,
      });
    }
  }, []);

  // 아이템 수정, 삭제 기능 수정 필요
  // 아이템 input ref 적용 필요
  // 이미지 부분 수정 적용 유저 프로필 수정에서 가져와야
  const editItem = (itemInfo: IitemInfo) => {
    setModal({
      modalName: 'ADMIN-ITEM_EDIT',
      itemInfo: itemInfo,
    });
  };

  const deleteItem = (itemInfo: IitemInfo) => {
    setModal({
      modalName: 'ADMIN-ITEM_DELETE',
      itemInfo: itemInfo,
    });
  };

  useEffect(() => {
    getItemListHandler();
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label='customized table'>
          <TableHead>
            <TableRow>
              {tableColumnName.map((column, idx) => (
                <TableCell key={idx}>{itemListTableTitle[column]}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {itemListData.itemList.length > 0 ? (
              itemListData.itemList.map((item: Iitem) => (
                <TableRow key={item.itemId}>
                  {tableFormat['itemList'].columns.map(
                    (columnName: string, index: number) => {
                      return (
                        <TableCell key={index}>
                          {columnName === 'imageUrl' ? (
                            <Image
                              src={item[columnName]}
                              alt='Item Iamge'
                              width={30}
                              height={30}
                            />
                          ) : (
                            item[columnName as keyof Iitem].toString()
                          )}
                        </TableCell>
                      );
                    }
                  )}
                  <TableCell>
                    <button
                      onClick={() =>
                        editItem({
                          itemId: item.itemId,
                          itemName: item.itemName,
                          content: item.content,
                          imageUrl: item.imageUrl,
                          originalPrice: item.originalPrice,
                          discount: item.discount,
                        })
                      }
                    >
                      수정
                    </button>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() =>
                        deleteItem({
                          itemId: item.itemId,
                          itemName: item.itemName,
                          content: item.content,
                          imageUrl: item.imageUrl,
                        })
                      }
                    >
                      삭제
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>비어있습니다</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ItemList;
