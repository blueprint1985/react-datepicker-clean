import React from 'react';
import { WeekDaysModel } from '../models/week-days';
import './grid-header.css';
interface GridHeaderProps {
    weekStart: WeekDaysModel;
    weekHoliday: WeekDaysModel | -1;
    showWeekNumber: boolean;
    locale: string;
}
declare const GridHeader: React.FC<GridHeaderProps>;
export default GridHeader;
