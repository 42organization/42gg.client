import styled from 'styled-components';

const CustomCalendar = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;

  .rbc-calendar {
    width: 95%;
    height: 90%;
    background-color: white;
    position: relative;
    padding: 2rem 1rem 1rem 1rem;
  }

  .rbc-header {
    height: 5vh;
    font-weight: normal;
    align-content: center;
    border-bottom: 1px solid #e8ebfc;
    padding: 0;
  }

  .rbc-header span {
    font-size: 14px;
    color: #505050;
  }

  .rbc-header + .rbc-header {
    border-left: 1px solid #e8ebfc;
  }

  .rbc-month-view {
    border-left: none;
    border-right: none;
    border-top: 1px solid #e8ebfc;
    border-bottom: 1px solid #e8ebfc;
  }

  .rbc-month-row {
    min-height: 100px;
  }

  .rbc-month-row + .rbc-month-row {
    border-top: 1px solid #e8ebfc;
  }

  .rbc-row-bg {
    right: 0;
  }

  .rbc-day-bg + .rbc-day-bg {
    border-left: 1px solid #e8ebfc;
  }

  .rbc-today {
    background-color: white;
  }

  .rbc-off-range {
    color: #cacaca;
  }

  .rbc-off-range-bg {
    background-color: #f8f9fc;
  }

  .rbc-date-cell {
    text-align: left;
    padding-top: 5px;
    padding-left: 5px;
    padding-bottom: 5px;
  }

  .rbc-button-link {
    text-indent: 5px;
    font-size: 14px;
    pointer-events: none;
  }

  .rbc-row-segment button {
    font-size: 13px;
    font-weight: 300;
    color: #505050;
    padding-left: 3px;
  }

  @media (max-width: 768px) {
    .rbc-calendar {
      padding: 1rem;
      width: 100%;
      height: 100%;
    }

    .rbc-date-cell {
      padding: 5px 0 0 2px;
    }
  }
`;

CustomCalendar.displayName = 'CustomCalendar';

export default CustomCalendar;
