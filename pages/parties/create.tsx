import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { PartyCategory, PartyGameTemplete } from 'types/partyTypes';
import usePartyRoom from 'hooks/party/usePartyList';

export default function PartyCreatePage() {
  const { categorys } = usePartyRoom();
  const [categoryId, setCategoryId] = useState<number>();
  const [gameTempletes, setGameTempletes] = useState<PartyGameTemplete[]>([]);
  const [flag, setFlag] = useState<'category' | 'templete' | 'detail'>(
    'category'
  );
  const [gameDetail, setGameDetail] = useState<PartyGameTemplete>();
  const router = useRouter();

  useEffect(() => {
    console.log('카테고리 목록', categorys);
  }, []);

  return flag === 'category' ? (
    <div>
      {categorys.map((category: PartyCategory) => (
        <button
          className='create-button-category'
          key={category.categoryId}
          onClick={async () => {
            await axios
              // .get(`/party/categorys/${categoryId}/templates`)// TODO: api 경로 수정
              .get(`/api/pingpong/party/create/templates`)
              .then(({ data }) => {
                setGameTempletes(data);
                setFlag('templete');
                setCategoryId(category.categoryId);
              })
              .catch((err) => {
                console.log(err);
                alert('잘못된 요청입니다.');
                setCategoryId(undefined);
              });
          }}
        >
          {category.categoryName}
        </button>
      ))}
    </div>
  ) : flag === 'templete' ? (
    <div>
      <h3> category: {categoryId}</h3>
      <input type='text' placeholder='검색' autoFocus />

      {gameTempletes.map((templete: PartyGameTemplete) => (
        <div
          onClick={() => {
            setFlag('detail');
            setGameDetail(templete);
          }}
          key={templete.gameTemplateId}
        >
          <h4>게임 이름: {templete.gameName}</h4>
        </div>
      ))}
    </div>
  ) : gameDetail ? (
    <div>
      <h3> category: {categoryId}</h3>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          axios
            // .post(`/party/rooms`, { ...gameDetail, categoryId }) // TODO: api 경로 수정
            .post(`/api/pingpong/party/rooms`, {
              ...gameDetail,
              categoryId,
            })
            .then(({ data }) => {
              router.push(`/parties/${data.roomId}`);
            })
            .catch((err) => {
              alert('잘못된 요청입니다.');
              console.log(err);
              router.push(`/parties`);
            });
        }}
      >
        <input
          type='text'
          value={gameDetail.gameName}
          onChange={(event) =>
            setGameDetail({
              ...gameDetail,
              gameName: event.target.value,
            })
          }
        />
        <button type='submit'>게임 생성</button>
      </form>
    </div>
  ) : (
    <div>123</div>
  );
}