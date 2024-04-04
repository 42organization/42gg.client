import { useRouter } from 'next/router';
import { PartyMain } from 'components/party/PartyMain';
import usePartyCategory from 'hooks/party/usePartyCategory';
import usePartyColorMode from 'hooks/party/usePartyColorMode';
import usePartyPenaltyTimer from 'hooks/party/usePartyPenaltyTimer';
import usePartyRoomList from 'hooks/party/usePartyRoomList';
import styles from 'styles/party/PartyMain.module.scss';

export default function PartyMainPage() {
  const router = useRouter();
  const titleQuery = Array.isArray(router.query.title)
    ? router.query.title[0]
    : router.query.title;
  const { partyRooms, joinedPartyRooms } = usePartyRoomList({
    withJoined: true,
    searchTitle: titleQuery,
  });
  const { categories, isCategoryLoading } = usePartyCategory();
  const { penaltyPeroid, isPenaltyLoading } = usePartyPenaltyTimer();

  usePartyColorMode('PARTY-MAIN');

  if (isCategoryLoading || isPenaltyLoading) return null;

  return (
    <div className={styles.pageContainer}>
      <PartyMain.JoinedRooms
        joinedPartyRooms={joinedPartyRooms}
        penaltyPeroid={penaltyPeroid}
      />
      <PartyMain.SearchBar titleQuery={titleQuery} />
      <PartyMain.AllRooms
        partyRooms={partyRooms}
        isSearchedResult={!!titleQuery}
        categories={categories}
      />
    </div>
  );
}
