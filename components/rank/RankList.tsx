import React, { useEffect, useRef } from 'react';
import styles from '../../styles/RankList.module.css';
import { useObserver } from '../../utils/useObserver';
import { Rank, RankData } from '../../types/rankTypes';
import infScroll from '../../utils/infinityScroll';
import { useInfiniteQuery } from 'react-query';
import RankItem from './RankItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';

type RankType = {
  isMain: boolean;
};

export default function RankList({ isMain }: RankType) {
  const result = infScroll('/pingpong/ranks/');

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = result;

  return isMain ? (
    <div>
      {data?.pages
        .filter((item) => item.rank < 4)
        .map((item: Rank) => (
          <RankItem key={item.userId} user={item} isMain={isMain} />
        ))}
    </div>
  ) : (
    <>
      <InfiniteScroll
        dataLength={data?.pages.length! * 8}
        next={fetchNextPage}
        hasMore={hasNextPage!}
        loader={<h4>Loading...</h4>}
      >
        <div className={styles.title}>Ranking</div>
        <div className={styles.container}>
          <div className={styles.division}>
            <div className={styles.rank}>랭킹</div>
            <div className={styles.userId}>유저 (점수)</div>
            <div className={styles.statusMessage}>상태메시지</div>
            <div className={styles.winRate}>승률</div>
          </div>
          {status === 'success' && (
            <>
              {data?.pages.map((group, index) => (
                <div key={index}>
                  {group.rankList.map((item: Rank) => (
                    <div key={item.userId}>
                      <RankItem user={item} isMain={isMain} />
                    </div>
                  ))}
                </div>
              ))}
            </>
          )}
          {/* <div ref={bottom} /> */}
        </div>
      </InfiniteScroll>
    </>
  );
}
