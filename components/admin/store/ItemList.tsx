import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Iitem, IitemList } from 'types/admin/adminStoreTypes';
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

const itemListTableTitle: { [key: string]: string } = {
  itemId: 'ID',
  itemName: '아이템명',
  content: '설명',
  imageUrl: '이미지',
  originalPrice: '원가',
  discount: '할인율',
  salePrice: '판매가격',
  edit: '수정',
  delete: '삭제',
};

const tableColumnName = [
  'itemId',
  'itemName',
  'content',
  'imageUrl',
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

  const testData = [
    {
      itemId: 3,
      itemName: '확성기',
      content: '확성기 설명',
      imageUrl: '/image/noti_empty.svg',
      originalPrice: 42,
      discount: 50,
      salePrice: 21,
    },
    {
      itemId: 2,
      itemName: '프로필 변경권',
      content: '프로필 설명',
      imageUrl: 'no',
      originalPrice: 50,
      discount: 50,
      salePrice: 25,
    },
    {
      itemId: 1,
      itemName: '프로필 배경 색상 변경',
      content: '배경 색상 설명',
      imageUrl: 'no',
      originalPrice: 10,
      discount: 50,
      salePrice: 5,
    },
  ];

  // store에서 사용하는 api라 mock api 겹칠까봐 사용안함
  // api 연결 시 useCallback, instanceInManage, try catch로 변경
  // const getItemListHandler = useMockAxiosGet<any>({
  //     url: `items/store`,
  //     setState: setItemListData,
  //     err:  'HJ06',
  //     type: 'setError'
  // });

  const setModal = useSetRecoilState(modalState);

  // 아이템 수정, 삭제 기능 추가
  // const editItem
  // const deleteItem

  useEffect(() => {
    // getItemListHandler();
    // 아래는 setter는 test용
    setItemListData({ itemList: testData });
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
                              width={30}
                              height={30}
                              alt='no'
                            />
                          ) : (
                            item[columnName as keyof Iitem].toString()
                          )}
                        </TableCell>
                      );
                    }
                  )}
                  <TableCell>
                    <button>수정</button>
                  </TableCell>
                  <TableCell>
                    <button>삭제</button>
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
