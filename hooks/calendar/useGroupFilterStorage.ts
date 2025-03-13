import { useState, useEffect } from 'react';
import { ScheduleGroup } from 'types/calendar/groupType';
import { ScheduleFilter } from 'types/calendar/scheduleFilterType';

const publicGroupList: ScheduleGroup[] = [
  {
    classification: 'EVENT',
    title: '42행사',
    backgroundColor: '#785AD2',
    checked: true,
  },
  {
    classification: 'JOB_NOTICE',
    title: '취업공고',
    backgroundColor: '#A98CFF',
    checked: true,
  },
];

export default function useFilterStorage(privateGroupList: ScheduleGroup[]) {
  const [filterList, setFilterList] = useState<ScheduleFilter>({
    public: [],
    private: [],
  });

  useEffect(() => {
    const savedFilters = localStorage.getItem('scheduleFilters');

    if (savedFilters) {
      setFilterList(JSON.parse(savedFilters));
    } else {
      const initialFilterList: ScheduleFilter = {
        public: publicGroupList.map((group) => group.classification!),
        private: privateGroupList.map((group) => group.id!),
      };
      setFilterList(initialFilterList);
      localStorage.setItem(
        'scheduleFilters',
        JSON.stringify(initialFilterList)
      );
    }
  }, [privateGroupList]);

  const handleFilterChange = (
    type: 'public' | 'private',
    id?: number,
    classification?: string
  ) => {
    setFilterList((prev) => {
      let updatedPublic = prev.public;
      let updatedPrivate = prev.private;

      if (type === 'public') {
        updatedPublic = prev.public.includes(classification!)
          ? prev.public.filter((item) => item !== classification)
          : [...prev.public, classification!];
      } else {
        updatedPrivate = prev.private.includes(id!)
          ? prev.private.filter((item) => item !== id)
          : [...prev.private, id!];
      }

      const newFilterList = {
        ...prev,
        public: updatedPublic,
        private: updatedPrivate,
      };
      localStorage.setItem('scheduleFilters', JSON.stringify(newFilterList));

      return newFilterList;
    });
  };

  return { filterList, handleFilterChange };
}
