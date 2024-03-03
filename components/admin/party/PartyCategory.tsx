import { useEffect, useState } from 'react';
import { PartyCategory } from 'types/partyTypes';
import { mockInstance } from 'utils/mockAxios';
// import usePartyRoom from 'hooks/party/usePartyList';

export default function PartyCategory() {
  const [categories, setCategories] = useState<PartyCategory[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    mockInstance
      .get(`/party/categorys`)
      .then(({ data }: { data: PartyCategory[] }) => {
        setCategories(data);
      });
  }, []);

  const addCategory = () => {
    setShowInput(true);
  };

  const handleConfirm = () => {
    if (newCategoryName.trim() !== '') {
      const newCategory: PartyCategory = {
        categoryId: categories.length + 1,
        categoryName: newCategoryName,
      };
      mockInstance
        .post('/party/admin/categorys', newCategory)
        .then((response) => {
          console.log(response.data);
          setCategories([...categories, response.data]);
          setShowInput(false);
          setNewCategoryName('');
        })
        .catch((error) => {
          console.error('카테고리 추가 중 오류가 발생했습니다:', error);
        });
    }
  };

  const deleteCategory = (categoryId: number) => {
    mockInstance
      .delete(`/party/admin/categorys/${categoryId}`)
      .then((response) => {
        setCategories(
          categories.filter((category) => category.categoryId !== categoryId)
        );
      })
      .catch((error) => {
        console.error('카테고리 삭제 중 오류가 발생했습니다:', error);
      });
  };

  return (
    <>
      <div>
        <h2>카테고리 목록</h2>
        {!showInput && <button onClick={addCategory}>카테고리 추가</button>}
        {showInput && (
          <div>
            <input
              type='text'
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
            <button onClick={handleConfirm}>확인</button>
          </div>
        )}
        <table>
          <thead>
            <tr>
              <th>카테고리 번호</th>
              <th>카테고리 이름</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.categoryId}>
                <td>{category.categoryId}</td>
                <td>{category.categoryName}</td>
                <td>
                  <button onClick={() => deleteCategory(category.categoryId)}>
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
