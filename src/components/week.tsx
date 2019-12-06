import React from 'react';

import WeekModel from '../models/week';
import { WeekDaysModel } from '../models/week-days';
import Day from './day';

import '../styles/week.css';
import DayModel from '../models/day';

interface WeekProps {
  onDateClick: Function;
  onDateHover: Function;
  week: WeekModel;
  weekHoliday: WeekDaysModel | -1;
  showWeekNumber: boolean;
  allowBefore: boolean;
  spanError: boolean;
}

const Week: React.FC<WeekProps> = (props: WeekProps) => {
  return (
    <div className="week">
      {props.showWeekNumber && (
        <div className="week-number">{props.week.weekNumber}</div>
      )}
      <div className="days-container">
        {props.week.days.map((day: DayModel) => {
          return (
            <Day
              key={day.date.getDate()}
              onDateClick={props.onDateClick}
              onDateHover={props.onDateHover}
              day={day}
              allowBefore={props.allowBefore}
              spanError={props.spanError}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Week;
