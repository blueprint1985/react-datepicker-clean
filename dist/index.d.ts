import * as React from 'react';
import DayModel from './models/day';
import WeekModel from './models/week';
import { WeekDaysModel } from './models/week-days';
import './index.css';
interface BaseProps {
    onDateClick: Function;
    weekStart: WeekDaysModel;
    weekHoliday: WeekDaysModel | -1;
    showWeekNumber: boolean;
    multiChoice: boolean;
    multiSpan: boolean;
    allowBefore: boolean;
    chosenDates: Array<Date | string | number>;
    blockedDates: Array<Date | string | number>;
    holidayDates: Array<Date | string | number>;
    locale: string;
}
interface BaseState {
    currentMonth: number;
    currentYear: number;
    chosenDates: Array<Date>;
    blockedDates: Array<Date>;
    holidayDates: Array<Date>;
    spanDates: Array<Date>;
    isSpanChoosing: boolean;
    spanError: boolean;
}
declare class DatePicker extends React.Component<BaseProps, BaseState> {
    static defaultProps: Partial<BaseProps>;
    readonly state: BaseState;
    initDatesArray(type: string): Array<Date>;
    initMonthYear(iMonth: boolean): number;
    initWeeks(): Array<WeekModel>;
    checkOtherMonth(date: Date): boolean;
    checkBefore(date: Date): boolean;
    checkToday(date: Date): boolean;
    checkDateArray(date: Date, type: string): boolean;
    stepMonth: (next: boolean, block?: boolean) => void;
    changeMonth: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    changeYear: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    onDateClick: (day: DayModel) => void;
    onDateHover: (day: DayModel) => void;
    sortAndReturn(dates: Array<Date>): void;
    render(): JSX.Element;
}
export default DatePicker;
