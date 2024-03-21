import { useRouter } from 'next/router';
import { Button, Stack } from '@mui/material';
import { resultType } from 'types/recruit/recruitments';
import style from 'styles/recruit/Main/myRecruitment.module.scss';

const MyApplicationInfo = ({
  status,
  recruitId,
}: {
  status?: resultType;
  recruitId: string;
}) => {
  const router = useRouter();

  const onCheck = () => {
    // router.push(`/recruit/${recruitId}/applications?applicationId=${applicationId});
    router.push(`/recruit/${recruitId}/my-application?applicationId=${1}`);
  };

  if (!status)
    return (
      <div className={style.collapseContainer}>
        <span>지원 내역이 없습니다.</span>
      </div>
    );
  return (
    <div className={style.collapseContainer}>
      <Stack
        width={'100%'}
        alignItems={'center'}
        justifyContent={'space-between'}
        direction='row'
        spacing={2}
      >
        <div>지원서 제출 완료!</div>
        {/* TODO: 지원서 확인 페이지 url 확인 필요 */}
        <Button onClick={onCheck} size={'small'} variant='contained'>
          지원서 확인하기
        </Button>
      </Stack>
    </div>
  );
};

export default MyApplicationInfo;
