import React from 'react';
import Week from '../models/week';
import { WeekDaysModel } from '../models/week-days';
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
declare const CalendarBody: React.FC<CalendarBodyProps>;
export default CalendarBody;
