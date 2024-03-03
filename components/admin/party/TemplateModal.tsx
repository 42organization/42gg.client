import React, { useState, useEffect } from 'react';
import { PartyGameTemplete } from 'types/partyTypes';
import { mockInstance } from 'utils/mockAxios';
import styles from '../../../styles/party/TemplateModal.module.scss';

interface TemplateModalProps {
  isOpen: boolean;
  closeModal: () => void;
  template?: PartyGameTemplete | null;
  categoryId: number;
}

const TemplateModal: React.FC<TemplateModalProps> = ({
  isOpen,
  closeModal,
  template,
  categoryId,
}) => {
  const [formData, setFormData] = useState<PartyGameTemplete>({
    gameTemplateId: 0,
    gameName: '',
    maxGamePeople: 0,
    minGamePeople: 0,
    maxGameTime: 0,
    minGameTime: 0,
    genre: '',
    difficulty: '',
    summary: '',
  });

  useEffect(() => {
    if (template) {
      setFormData(template);
    } else {
      setFormData({
        ...formData,
        gameTemplateId: 0,
      });
    }

    if (categoryId && template?.gameTemplateId) {
      mockInstance
        .get(
          `/party/categorys/${categoryId}/templates/${template.gameTemplateId}`
        )
        .then(({ data }: { data: PartyGameTemplete }) => {
          setFormData(data);
        })
        .catch((error) => {
          console.error(
            '템플릿 정보를 가져오는 중 오류가 발생했습니다:',
            error
          );
        });
    }
  }, [template, categoryId]);

  const handleSubmit = () => {
    closeModal();
  };

  return (
    <>
      {isOpen && (
        <div className={styles['modal-overlay']}>
          <div className={styles['modal']}>
            <h2>{template ? '템플릿 변경' : '템플릿 추가'}</h2>
            <form onSubmit={handleSubmit}>
              <label>게임 이름: </label>
              <input
                type='text'
                value={formData.gameName}
                onChange={(e) =>
                  setFormData({ ...formData, gameName: e.target.value })
                }
              />
              <label>최대 인원: </label>
              <input
                type='number'
                value={formData.maxGamePeople}
                onChange={(e) =>
                  setFormData({ ...formData, maxGamePeople: +e.target.value })
                }
              />
              <label>최소 인원: </label>
              <input
                type='number'
                value={formData.minGamePeople}
                onChange={(e) =>
                  setFormData({ ...formData, minGamePeople: +e.target.value })
                }
              />
              <label>최대 게임 시간: </label>
              <input
                type='number'
                value={formData.maxGameTime}
                onChange={(e) =>
                  setFormData({ ...formData, maxGameTime: +e.target.value })
                }
              />
              <label>최소 게임 시간: </label>
              <input
                type='number'
                value={formData.minGameTime}
                onChange={(e) =>
                  setFormData({ ...formData, minGameTime: +e.target.value })
                }
              />
              <label>장르: </label>
              <input
                type='text'
                value={formData.genre}
                onChange={(e) =>
                  setFormData({ ...formData, genre: e.target.value })
                }
              />
              <label>난이도: </label>
              <input
                type='text'
                value={formData.difficulty}
                onChange={(e) =>
                  setFormData({ ...formData, difficulty: e.target.value })
                }
              />
              <label>요약: </label>
              <input
                type='text'
                value={formData.summary}
                onChange={(e) =>
                  setFormData({ ...formData, summary: e.target.value })
                }
              />
              <button type='submit'>{template ? '변경' : '추가'}</button>
            </form>
            <button onClick={closeModal}>닫기</button>
          </div>
        </div>
      )}
    </>
  );
};

export default TemplateModal;
