import React, { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { PartyPenaltyAdmin, PartyPenaltyAdminSubmit } from 'types/partyTypes';
import { instanceInPartyManage } from 'utils/axios';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
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
      userIntraId: '',
    }
  );
  const setModal = useSetRecoilState(modalState);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const setSnackBar = useSetRecoilState(toastState);

  useEffect(() => {
    if (partyPenalty) {
      setIsUpdateMode(true);
    }
  }, []);

  const updatePenalty = (
    penaltyId: number,
    penalty: PartyPenaltyAdminSubmit
  ) => {
    instanceInPartyManage
      .patch(`/penalties /${penaltyId}`, penalty)
      .catch(() => {
        setSnackBar({
          toastName: 'PATCH request',
          message: '페널티 변경을 하는데 실패하였습니다.',
          severity: 'error',
          clicked: true,
        });
      });
  };

  const createPenalty = (penalty: PartyPenaltyAdminSubmit) => {
    instanceInPartyManage.post('/penalties', penalty).catch(() => {
      setSnackBar({
        toastName: 'POST request',
        message: '페널티 추가를 하는데 실패하였습니다.',
        severity: 'error',
        clicked: true,
      });
    });
  };

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
