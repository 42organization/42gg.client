import { useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import styles from 'styles/user/Profile.module.scss';
import { modalState } from 'utils/recoil/modal';
import instance from 'utils/axios';

export default function AdminPenaltyModal(props: any) {
  const [userPenalty, setUserPenalty] = useState<any>();

  const setModal = useSetRecoilState(modalState);
  const onChange = (e: any) => {
    setUserPenalty(e.target.value);
  };
  return (
    <div>
      <div>intra ID: {props.value}</div>
      <div>사유:</div>
      <label>
        적용시간(분): <input onChange={onChange} />
      </label>
      <button onClick={() => console.log([`${props.value}`, { userPenalty }])}>
        적용
      </button>
      <button onClick={() => setModal({ modalName: null })}></button>
    </div>
  );
}
