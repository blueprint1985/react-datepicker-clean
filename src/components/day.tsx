import React from 'react';

import DayModel from '../models/day';

import './day.css';

interface DayProps {
  onDateClick: Function;
  onDateHover: Function;
  day: DayModel;
  allowBefore: boolean;
  spanError: boolean;
}

const Day: React.FC<DayProps> = (props: DayProps) => {  
  let dayClass: string = 'day';
  const day: DayModel = props.day;

  if (!props.allowBefore && day.isBefore) {
    dayClass += ' before';
  }

  if (day.isBlocked) {
    dayClass += ' blocked';
  }

  if (day.isToday) {
    dayClass += ' today';
  }

  if (day.isChosen) {
    dayClass += ' chosen';
  }

  if (day.isOtherMonth) {
    dayClass += ' other';
  }

  if (day.isHoliday) {
    dayClass += ' holiday';
  }

  if (day.isSpan) {
    dayClass += ' span';
  }

  if (props.spanError) {
    dayClass += ' error';
  }

  return (
    <div
      className={dayClass}
      onClick={() => props.onDateClick(day)}
      onMouseOver={() => props.onDateHover(day)}>
      {props.day.date.getDate()}
    </div>
  );
}

export default Day;
