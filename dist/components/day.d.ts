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
declare const Day: React.FC<DayProps>;
export default Day;
