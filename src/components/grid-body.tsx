import React from 'react';

import WeekModel from '../models/week';
import { WeekDaysModel } from '../models/week-days';
import Week from './week';

import '../styles/grid-body.css';

interface GridBodyProps {
  onDateClick: Function;
  onDateHover: Function;
  weeks: Array<WeekModel>;
  weekHoliday: WeekDaysModel | -1;
  showWeekNumber: boolean;
  allowBefore: boolean;
  spanError: boolean;
}

const GridBody: React.FC<GridBodyProps> = (props: GridBodyProps) => {
  return (
    <div className="grid-body">
      {props.weeks.map((week: WeekModel) => {
        return (
          <Week
            key={week.weekNumber}
            onDateClick={props.onDateClick}
            onDateHover={props.onDateHover}
            week={week}
            weekHoliday={props.weekHoliday}
            showWeekNumber={props.showWeekNumber}
            allowBefore={props.allowBefore}
            spanError={props.spanError}
          />
        );
      })}
    </div>
  );
}

export default GridBody;
