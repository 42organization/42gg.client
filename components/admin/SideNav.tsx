import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsAwardFill } from 'react-icons/bs';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa';
import { IoPeople } from 'react-icons/io5';
import { RiPingPongFill } from 'react-icons/ri';
import SideNavAgenda from 'components/admin/agenda/SideNavAgenda';
import SideNavCalendar from 'components/admin/calendar/SideNavCalendar';
import SideNavParty from 'components/admin/takgu/SideNavParty';
import SideNavTakgu from 'components/admin/takgu/SideNavTakgu';
import styles from 'styles/admin/SideNav.module.scss';

export default function SideNav() {
  const [isTakguOpen, setTakguOpen] = useState(false);
  const [isPartyOpen, setPartyOpen] = useState(false);
  const [isAgendaOpen, setAgendaOpen] = useState(false);
  const [isCalendarOpen, setCalendarOpen] = useState(false);

  const presentPath = useRouter().asPath;
  useEffect(() => {
    switch (true) {
      case presentPath.includes('/admin/takgu'):
        setTakguOpen(true);
        break;
      case presentPath.includes('/admin/party'):
        setTakguOpen(true);
        setPartyOpen(true);
        break;
      case presentPath.includes('/admin/agenda'):
        setAgendaOpen(true);
        break;
      case presentPath.includes('/admin/calendar'):
        setCalendarOpen(true);
        break;
    }
  }, [presentPath]);

  return (
    <div className={styles.container}>
      <div
        className={styles.menuItem}
        onClick={() => setTakguOpen(!isTakguOpen)}
      >
        <RiPingPongFill />
        <span className={styles.menuName}>42gg 관리</span>
        {isTakguOpen ? <FaAngleDown /> : <FaAngleRight />}
      </div>

      {isTakguOpen && (
        <div className={styles.subMenu}>
          <SideNavTakgu />

          <div
            className={styles.menuItem}
            onClick={() => setPartyOpen(!isPartyOpen)}
          >
            <IoPeople />
            <span className={styles.menuName}>파티 관리</span>
            {isPartyOpen ? <FaAngleDown /> : <FaAngleRight />}
          </div>

          {isPartyOpen && (
            <div className={styles.subMenu}>
              <SideNavParty />
            </div>
          )}
        </div>
      )}
      {/* ------------------------------------- */}
      <div
        className={styles.menuItem}
        onClick={() => setAgendaOpen(!isAgendaOpen)}
      >
        <BsAwardFill />
        <span className={styles.menuName}>Agenda 관리</span>
        {isAgendaOpen ? <FaAngleDown /> : <FaAngleRight />}
      </div>

      {isAgendaOpen && (
        <div className={styles.subMenu}>
          <SideNavAgenda />
        </div>
      )}
      {/* ------------------------------------- */}
      <div
        className={styles.menuItem}
        onClick={() => setCalendarOpen(!isCalendarOpen)}
      >
        <BsAwardFill />
        <span className={styles.menuName}>Calendar 관리</span>
        {isCalendarOpen ? <FaAngleDown /> : <FaAngleRight />}
      </div>

      {isCalendarOpen && (
        <div className={styles.subMenu}>
          <SideNavCalendar />
        </div>
      )}
    </div>
  );
}
