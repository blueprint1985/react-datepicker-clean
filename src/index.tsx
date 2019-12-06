import * as React from 'react';

import DayModel from './models/day';
import WeekModel from './models/week';
import { WeekDaysModel } from './models/week-days';
import Utils from './helpers/utils';
import CalendarHeader from './components/calendar-header';
import CalendarBody from './components/calendar-body';

import './styles/index.css';

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
  spanDates:  Array<Date>;
  isSpanChoosing: boolean;
  spanError: boolean;
}

type InputDate = Date | string | number;
type PropDates = Array<InputDate>;

class DatePicker extends React.Component<BaseProps, BaseState> {
  static defaultProps: Partial<BaseProps> = {
    weekStart: 0,
    weekHoliday: 0,
    showWeekNumber: true,
    multiChoice: false,
    multiSpan: false,
    allowBefore: false,
    chosenDates: [],
    blockedDates: [],
    holidayDates: [],
    locale: 'en',
  }

  readonly state: BaseState = {
    currentMonth: this.initMonthYear(true),
    currentYear: this.initMonthYear(false),
    chosenDates: this.initDatesArray('chosenDates'),
    blockedDates: this.initDatesArray('blockedDates'),
    holidayDates: this.initDatesArray('holidayDates'),
    spanDates: this.initDatesArray('spanDates'),
    isSpanChoosing: false,
    spanError: false,
  }

  initDatesArray(type: string): Array<Date> {
    let propDates: PropDates;

    switch (type) {
      case 'chosenDates': propDates = this.props.chosenDates; break;
      case 'blockedDates': propDates = this.props.blockedDates; break;
      case 'holidayDates': propDates = this.props.holidayDates; break;
      case 'spanDates': propDates = []; break;
      default: propDates = []; break;
    }

    const returnDates: Array<Date> = propDates.map((date: InputDate) => {
      return Utils.createDate(date);
    });

    return returnDates
      .map((date: Date) => { return date.getTime() })
      .filter((date: number, i: number, array: Array<number>) => { return array.indexOf(date) === i; })
      .map((time: number) => { return Utils.createDate(time); });
  }

  initMonthYear(iMonth: boolean): number {
    const today: Date = Utils.createDate();
    const propDates: PropDates = this.props.chosenDates || [];

    const chosenDates: Array<Date> = propDates.map((date: InputDate) => {
      return new Date(date);
    });

    if (!chosenDates || !chosenDates.length) {
      return (iMonth) ? today.getMonth() : today.getFullYear();
    }
    
    chosenDates.sort((a: Date, b: Date) => {
      return b.getTime() - a.getTime();
    });

    if (chosenDates[0] <= today) {
      return (iMonth) ? today.getMonth() : today.getFullYear();
    }

    let first: Date = Utils.createDate();

    chosenDates.forEach((date: Date) => {
      first = (date > today) ? date : first;
    });

    return (iMonth) ? first.getMonth() : first.getFullYear();
  }

  initWeeks(): Array<WeekModel> {
    const currentFirst: Date = Utils.createDate(null, this.state.currentYear, this.state.currentMonth, 1);
    const currentLast: Date = Utils.createDate(null, this.state.currentYear, this.state.currentMonth + 1, 0);
    const firstWeekDay: number = currentFirst.getDay();
    const lastWeekDay: number = currentLast.getDay();
    const daysPastMonth: number = (this.props.weekStart - firstWeekDay - 7) % 7;
    const daysNextMonth: number = (7 - lastWeekDay + this.props.weekStart - 1) % 7;

    const days: Array<DayModel> = [];
    let loopDate: Date;

    for (let i: number = daysPastMonth + 1; i <= currentLast.getDate() + daysNextMonth; i++) {
      loopDate = Utils.createDate(null, this.state.currentYear, this.state.currentMonth, i);
      days.push({
        date: loopDate,
        isOtherMonth: this.checkOtherMonth(loopDate),
        isBefore: this.checkBefore(loopDate),
        isToday: this.checkToday(loopDate),
        isChosen: this.checkDateArray(loopDate, 'chosenDates'),
        isBlocked: this.checkDateArray(loopDate, 'blockedDates'),
        isHoliday: this.checkDateArray(loopDate, 'holidayDates'),
        isSpan: this.checkDateArray(loopDate, 'spanDates'),
      });
    }

    const weeks: Array<WeekModel> = [];
    let firstDate: Date;
    let onejan: Date;
    let weekNumber: number;

    for (let i = 0; i < days.length; i += 7) {
      firstDate = days[i].date;
      onejan = new Date(firstDate.getFullYear(),0,1,0,0,0,0);
      weekNumber = Math.ceil((((firstDate.getTime() - onejan.getTime()) / 86400000) + onejan.getDay()+1)/7);

      weeks.push({
        weekNumber,
        days: days.slice(i, i+7),
      });
    }
    
    return weeks;
  }

  checkOtherMonth(date: Date): boolean {
    return date.getMonth() !== this.state.currentMonth;
  }

  checkBefore(date: Date): boolean {
    const today: Date = Utils.createDate();
    return date < today;
  }

  checkToday(date: Date): boolean {
    const today: Date = Utils.createDate();
    return date.getTime() === today.getTime();
  }

  checkDateArray(date: Date, type: string): boolean {
    if (type === 'holidayDates' && date.getDay() === this.props.weekHoliday) {
      return true;
    }

    let stateDates: Array<Date>;
    
    switch (type) {
      case 'chosenDates': stateDates = this.state.chosenDates; break;
      case 'blockedDates': stateDates = this.state.blockedDates; break;
      case 'holidayDates': stateDates = this.state.holidayDates; break;
      case 'spanDates': stateDates = this.state.spanDates; break;
      default: stateDates = []; break;
    }

    const isInArray: number = stateDates.findIndex((cDate: Date) => {
      return cDate.getTime() === date.getTime();
    });

    return isInArray !== -1;
  }

  stepMonth = (next: boolean, block?: boolean): void => {
    if (!next && block) {
      return;
    }

    const currentMonth: number = this.state.currentMonth;
    const currentYear: number = this.state.currentYear;
    let newMonth: number = currentMonth;
    let newYear: number = currentYear;

    if (next && currentMonth >= 11) {
      newMonth = 0;
      newYear++;
    } else if (next  && currentMonth < 11) {
      newMonth++;
    } else if (!next && currentMonth <= 0) {
      newMonth = 11;
      newYear--;
    } else if (!next && currentMonth > 0) {
      newMonth--;
    }

    this.setState({ currentMonth: newMonth, currentYear: newYear });
  }

  changeMonth = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const newMonth: number = parseInt(event.target.value);
    this.setState({ currentMonth: newMonth });
  }

  changeYear = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const newYear: number = parseInt(event.target.value);
    const today: Date = Utils.createDate();
    const todayYear: number = today.getFullYear();
    const todayMonth: number = today.getMonth();

    const newMonth: number = (!this.props.allowBefore && newYear <= todayYear && this.state.currentMonth < todayMonth)
      ? todayMonth
      : this.state.currentMonth

    this.setState({ currentMonth: newMonth, currentYear: newYear });
  }

  onDateClick = (day: DayModel): void => {
    if (day.isBlocked || (day.isBefore && !this.props.allowBefore)) {
      return;
    }

    if (this.state.spanError) {
      this.sortAndReturn([]);
      this.setState({chosenDates: [], spanDates: [], isSpanChoosing: false, spanError: false});
      return;
    }

    if (!this.props.multiChoice) {
      const chosenDates: Array<Date> = [day.date];
      this.sortAndReturn(chosenDates);
      this.setState({ chosenDates });
      return;
    }

    if (!this.props.multiSpan) {
      const chosenDates: Array<Date> = this.state.chosenDates;

      const dateIndex: number = chosenDates.findIndex(cDate => {
        return (
          day.date.getFullYear() === cDate.getFullYear() &&
          day.date.getMonth() === cDate.getMonth() &&
          day.date.getDate() === cDate.getDate()
        );
      });

      if (dateIndex === -1) {
        chosenDates.push(day.date);
      } else {
        chosenDates.splice(dateIndex, 1);
      }

      chosenDates.sort((a: Date, b: Date) => {
        return b.getTime() - a.getTime();
      });

      this.sortAndReturn(chosenDates);
      this.setState({ chosenDates });
      return;
    }

    if (!this.state.isSpanChoosing) {
      const chosenDates: Array<Date> = [day.date];
      const spanDates: Array<Date> = [];
      this.setState({ chosenDates, spanDates, isSpanChoosing: true });
      return;
    }

    const chosenDates: Array<Date> = [...this.state.chosenDates, day.date];
    chosenDates.sort((a: Date, b: Date) => {
      return a.getTime() - b.getTime();
    });

    let currDate: Date = Utils.createDate(chosenDates[0], null, null, chosenDates[0].getDate() + 1)

    while (currDate < chosenDates[1]) {
      chosenDates.push(currDate);
      currDate = Utils.createDate(currDate, null, null, currDate.getDate() + 1)
    }

    chosenDates.sort((a: Date, b: Date) => {
      return b.getTime() - a.getTime();
    });

    this.sortAndReturn(chosenDates);
    this.setState({ chosenDates, spanDates: [], isSpanChoosing: false });
  }

  onDateHover = (day: DayModel): void => {
    if (!this.state.isSpanChoosing) {
      return;
    }

    const chosenDates: Array<Date> = [...this.state.chosenDates, day.date];
    chosenDates.sort((a: Date, b: Date) => {
      return a.getTime() - b.getTime();
    });

    const spanDates: Array<Date> = [];

    let currDate: Date = Utils.createDate(chosenDates[0], null, null, chosenDates[0].getDate() + 1)

    while (currDate < chosenDates[1]) {
      spanDates.push(currDate);
      currDate = Utils.createDate(currDate, null, null, currDate.getDate() + 1)
    }

    let spanError: boolean = false;
    const today: Date = Utils.createDate();

    if (day.date < today && !this.props.allowBefore) {
      spanError = true;
    }

    let dateIndex = this.state.blockedDates.findIndex((bDate: Date) => {
      return bDate.getTime() === day.date.getTime();
    });

    if (dateIndex !== -1) {
      spanError = true;
    }

    for (let i = 0; i < spanDates.length; i++) {
      dateIndex = this.state.blockedDates.findIndex((bDate: Date) => {
        return bDate.getTime() === spanDates[i].getTime();
      });
      
      if (dateIndex !== -1) {
        spanError = true;
        break;
      }
    }

    this.setState({ spanDates, spanError });
  }

  sortAndReturn(dates: Array<Date>): void {
    dates.sort((a: Date, b: Date) => {
      return a.getTime() - b.getTime();
    });

    this.props.onDateClick(dates);
  }

  render(): JSX.Element {
    const weeks: Array<WeekModel> = this.initWeeks();

    return (
      <div className="datepicker-container">
        <CalendarHeader
          stepMonth={this.stepMonth}
          changeMonth={this.changeMonth}
          changeYear={this.changeYear}
          month={this.state.currentMonth} 
          year={this.state.currentYear}
          allowBefore={this.props.allowBefore}
          locale={this.props.locale}
        />
        <CalendarBody
          onDateClick={this.onDateClick}
          onDateHover={this.onDateHover}
          weeks={weeks}
          weekStart={this.props.weekStart}
          weekHoliday={this.props.weekHoliday}
          showWeekNumber={this.props.showWeekNumber}
          allowBefore={this.props.allowBefore}
          spanError={this.state.spanError}
          locale={this.props.locale}
        />
      </div>
    );
  }
}

export default DatePicker;