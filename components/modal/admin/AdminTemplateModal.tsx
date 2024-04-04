import React, { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { PartyGameTemplate, PartyTemplateForm } from 'types/partyTypes';
import { modalState } from 'utils/recoil/modal';
import { usePartyTemplate } from 'hooks/party/usePartyTemplate';
import styles from 'styles/party/TemplateModal.module.scss';

function isUpdate(formData: PartyTemplateForm): formData is PartyGameTemplate {
  return !!formData.gameTemplateId;
}

export default function TemplateModal({
  template,
}: {
  template?: PartyTemplateForm;
}) {
  const [formData, setFormData] = useState<PartyTemplateForm>(
    template ?? {
      gameName: '',
      categoryName: '기타',
      maxGamePeople: 1,
      minGamePeople: 1,
      maxGameTime: 1,
      minGameTime: 1,
      genre: '',
      difficulty: '',
      summary: '',
    }
  );
  const setModal = useSetRecoilState(modalState);
  const { createTemplate, updateTemplate } = usePartyTemplate();

  useEffect(() => {
    if (template) {
      setFormData(template);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isUpdate(formData)) updateTemplate(formData);
    else createTemplate(formData);
    setModal({ modalName: null });
  };

  return (
    <>
      <div className={styles.modal_overlay}>
        <div className={styles.modal}>
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
            <label>최소 인원: </label>
            <input
              type='number'
              value={formData.minGamePeople}
              onChange={(e) => {
                {
                  setFormData({
                    ...formData,
                    minGamePeople: +e.target.value,
                  });
                }
              }}
              min={1}
              max={formData.maxGamePeople}
            />
            <label>최대 인원: </label>
            <input
              type='number'
              value={formData.maxGamePeople}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  maxGamePeople: +e.target.value,
                });
              }}
              min={formData.minGamePeople}
            />
            <label>최소 게임 시간: </label>
            <input
              type='number'
              value={formData.minGameTime}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  minGameTime: +e.target.value,
                });
              }}
              min={1}
              max={formData.maxGameTime}
            />
            <label>최대 게임 시간: </label>
            <input
              type='number'
              value={formData.maxGameTime}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  maxGameTime: +e.target.value,
                });
              }}
              min={formData.minGameTime}
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
              {template ? '변경' : '추가'}
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
