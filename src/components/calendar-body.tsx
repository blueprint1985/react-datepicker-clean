import React from 'react';

import Week from '../models/week';
import { WeekDaysModel } from '../models/week-days';
import GridHeader from './grid-header';
import GridBody from './grid-body';

import './calendar-body.css';

interface CalendarBodyProps {
  onDateClick: Function;
  onDateHover: Function;
  weeks: Array<Week>;
  weekStart: WeekDaysModel;
  weekHoliday: WeekDaysModel | -1;
  showWeekNumber: boolean;
  allowBefore: boolean;
  spanError: boolean;
  locale: string;
}

const CalendarBody: React.FC<CalendarBodyProps> = (props: CalendarBodyProps) => {
  return (
    <div className="calendar-body">
      <GridHeader
        weekStart={props.weekStart}
        weekHoliday={props.weekHoliday}
        showWeekNumber={props.showWeekNumber}
        locale={props.locale}
      />
      <GridBody
        onDateClick={props.onDateClick}
        onDateHover={props.onDateHover}
        weeks={props.weeks}
        weekHoliday={props.weekHoliday}
        showWeekNumber={props.showWeekNumber}
        allowBefore={props.allowBefore}
        spanError={props.spanError}
      />
    </div>
  );
}

export default CalendarBody;
