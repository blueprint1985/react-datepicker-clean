import React from 'react';
import WeekModel from '../models/week';
import { WeekDaysModel } from '../models/week-days';
import './grid-body.css';
interface GridBodyProps {
    onDateClick: Function;
    onDateHover: Function;
    weeks: Array<WeekModel>;
    weekHoliday: WeekDaysModel | -1;
    showWeekNumber: boolean;
    allowBefore: boolean;
    spanError: boolean;
}
declare const GridBody: React.FC<GridBodyProps>;
export default GridBody;
