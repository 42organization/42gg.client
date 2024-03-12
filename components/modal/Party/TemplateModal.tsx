import React, { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { PartyGameTemplate } from 'types/partyTypes';
import { mockInstance } from 'utils/mockAxios';
import { modalState } from 'utils/recoil/modal';
import styles from 'styles/party/TemplateModal.module.scss';

export default function TemplateModal({
  template,
}: {
  template: PartyGameTemplate;
}) {
  const [formData, setFormData] = useState<PartyGameTemplate>({
    gameTemplateId: 0,
    categoryId: 0,
    gameName: '',
    maxGamePeople: 0,
    minGamePeople: 0,
    maxGameTime: 0,
    minGameTime: 0,
    genre: '',
    difficulty: '',
    summary: '',
  });
  const setModal = useSetRecoilState(modalState);

  useEffect(() => {
    if (template) {
      setFormData(template);
    }
  }, []);

  const handleSubmit = () => {
    console.log('submit');
  };

  return (
    <>
      <div className={styles['modal-overlay']}>
        <div className={styles['modal']}>
          <h2>
            {template.gameTemplateId == 0 ? '템플릿 변경' : '템플릿 추가'}
          </h2>
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
            <button type='submit' className={styles.button_2}>
              {template.gameTemplateId == 0 ? '변경' : '추가'}
            </button>
            <button
              className={styles.button_2}
              onClick={() => setModal({ modalName: null })}
            >
              닫기
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
