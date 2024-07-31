import { useRouter } from 'next/router';

export default function Announcements() {
  const router = useRouter();
  const { agenda_key } = router.query;
  console.log(agenda_key);
  return (
    <>
      <p>here {agenda_key}</p>
      <p>announcementss</p>
    </>
  );
}
