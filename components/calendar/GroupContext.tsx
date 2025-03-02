import React, { createContext, useContext, useEffect, useState } from 'react';
import { ScheduleGroup } from 'types/calendar/groupType';
import useScheduleGroupGet from 'hooks/calendar/useScheduleGroupGet';

const GroupContext = createContext<{
  groupList: ScheduleGroup[];
}>({
  groupList: [],
});

export const GroupProvider = ({ children }: { children: React.ReactNode }) => {
  const [groupList, setGroupList] = useState<ScheduleGroup[]>([]);
  const { scheduleGroup: groups } = useScheduleGroupGet('custom');

  useEffect(() => {
    setGroupList(groups);
  }, [groups]);

  return (
    <GroupContext.Provider value={{ groupList }}>
      {children}
    </GroupContext.Provider>
  );
};

export const useGroup = () => useContext(GroupContext);
