import React from 'react';
import WeekModel from '../models/week';
import { WeekDaysModel } from '../models/week-days';
import './week.css';
interface WeekProps {
    onDateClick: Function;
    onDateHover: Function;
    week: WeekModel;
    weekHoliday: WeekDaysModel | -1;
    showWeekNumber: boolean;
    allowBefore: boolean;
    spanError: boolean;
}
declare const Week: React.FC<WeekProps>;
export default Week;
