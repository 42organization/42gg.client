import { useRouter } from 'next/router';

export default function TeamDetail() {
  const router = useRouter();
  console.log(router.query);
  const { teamUID } = router.query;
  return (
    <>
      <div>team 상세정보</div>
      <div>teamKey: {teamUID}</div>
    </>
  );
}
