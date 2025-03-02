import React, { createContext, useContext, useEffect, useState } from 'react';
import { ScheduleGroup } from 'types/calendar/groupType';
import useScheduleGroupGet from 'hooks/calendar/useScheduleGroupGet';

const GroupContext = createContext<{
  groupList: ScheduleGroup[];
}>({
  groupList: [],
});

export const GroupProvider = ({ children }: { children: React.ReactNode }) => {
  const { scheduleGroup: groups } = useScheduleGroupGet('custom');
  const [groupList, setGroupList] = useState<ScheduleGroup[]>([]);

  useEffect(() => {
    if (groups.length > 0 && groupList.length === 0) {
      setGroupList(groups);
    }
  }, [groups, groupList]);

  return (
    <GroupContext.Provider value={{ groupList }}>
      {children}
    </GroupContext.Provider>
  );
};

export const useGroup = () => useContext(GroupContext);
