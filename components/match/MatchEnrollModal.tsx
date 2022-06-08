import { enrollInfoState } from "../../recoil/match";
import { EnrollInfo } from "../../types/matchTypes";
import { postData } from "../../utils/axios";
import { useRecoilState } from "recoil";

export default function MatchEnrollModal() {
  const [enrollInfo, setEnrollInfo] = useRecoilState<EnrollInfo | null>(
    enrollInfoState
  );

  if (!enrollInfo) return null;

  const onEnroll = async () => {
    const { slotId, type } = enrollInfo;
    const body = { slotId, type };
    const data = await postData(`/pingpong/match/tables/${1}`, body);
    alert(data.message);
    setEnrollInfo(null);
  };

  const onCancel = () => setEnrollInfo(null);

  return (
    <div>
      <div>
        play time : {enrollInfo.startTime} - {enrollInfo.endTime}
      </div>
      <div>참여하시겠습니까?</div>
      <button onClick={onEnroll}>확인</button>
      <button onClick={onCancel}>취소</button>
    </div>
  );
}
