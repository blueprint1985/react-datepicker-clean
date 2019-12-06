import React from 'react';
import './calendar-header.css';
interface CalendarHeaderProps {
    stepMonth: Function;
    changeMonth: Function;
    changeYear: Function;
    month: number;
    year: number;
    allowBefore: boolean;
    locale: string;
}
declare const CalendarHeader: React.FC<CalendarHeaderProps>;
export default CalendarHeader;
