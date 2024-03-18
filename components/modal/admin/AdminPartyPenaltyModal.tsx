import React, { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { PartyPenaltyAdmin, PartyPenaltyAdminSubmit } from 'types/partyTypes';
import { modalState } from 'utils/recoil/modal';
import usePartyPenalty from 'hooks/party/usePartyPenalty';
import styles from 'styles/party/TemplateModal.module.scss';

export default function PartyPenaltyModal({
  partyPenalty,
}: {
  partyPenalty?: PartyPenaltyAdmin;
}) {
  const [formData, setFormData] = useState<PartyPenaltyAdminSubmit>(
    partyPenalty ?? {
      penaltyType: '',
      message: '',
      penaltyTime: 0,
    }
  );
  const setModal = useSetRecoilState(modalState);
  const { createPenalty, updatePenalty } = usePartyPenalty();
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  useEffect(() => {
    if (partyPenalty) {
      setIsUpdateMode(true);
      setFormData({
        penaltyType: partyPenalty.penaltyType,
        message: partyPenalty.message,
        penaltyTime: partyPenalty.penaltyTime,
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isUpdateMode && partyPenalty) updatePenalty(partyPenalty.id, formData);
    else createPenalty(formData);
    setModal({ modalName: null });
  };

  return (
    <>
      <div className={styles.modal_overlay}>
        <div className={styles.modal}>
          <h2>{partyPenalty ? '페널티 변경' : '페널티 추가'}</h2>
          <form onSubmit={handleSubmit}>
            <label>페널티 타입: </label>
            <input
              type='text'
              value={formData.penaltyType}
              onChange={(e) =>
                setFormData({ ...formData, penaltyType: e.target.value })
              }
            />
            <label>내용 : </label>
            <input
              type='text'
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />
            <label>패널티 시간: </label>
            <input
              type='number'
              value={formData.penaltyTime}
              onChange={(e) =>
                setFormData({ ...formData, penaltyTime: +e.target.value })
              }
            />
            <button type='submit' className={styles.button_2}>
              {partyPenalty ? '변경' : '추가'}
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
