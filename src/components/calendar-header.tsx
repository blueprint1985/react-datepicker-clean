import React from 'react';

import LocaleModel from '../models/locale';
import { translations } from '../locales/i18n';
import Utils from '../helpers/utils';

import '../styles/calendar-header.css';

interface CalendarHeaderProps {
  stepMonth: Function;
  changeMonth: Function;
  changeYear: Function;
  month: number;
  year: number;
  yearsDiff: number;
  allowBefore: boolean;
  locale: string;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = (props: CalendarHeaderProps) => {
  const translation: LocaleModel = (Utils.hasKey(translations, props.locale))
    ? translations[props.locale]
    : translations['en'];

  const today: Date = Utils.createDate();
  const blockGoBack: boolean = (
    !props.allowBefore &&
    ((props.month <= today.getMonth() && props.year <= today.getFullYear()) || props.year < today.getFullYear())
  );
  
  const prevClass: string = blockGoBack ? "change-prev blocked" : "change-prev";
  const startYear: number = (props.allowBefore) ? props.year - props.yearsDiff : today.getFullYear();
  const startMonth: number = (!props.allowBefore && today.getFullYear() >= props.year) ? today.getMonth() : 0;
  const years: Array<number> = [];
  const months: Array<number> = [];
  
  for (let i: number = startYear; i <= props.year + props.yearsDiff; i++) {
    years.push(i);
  }

  for (let j: number = startMonth; j <= 11; j++) {
    months.push(j);
  }
  
  return (
    <div className="calendar-header">
      <div className={prevClass} onClick={() => props.stepMonth(false, blockGoBack)}>&#8678;</div>
      <div className="month-year-container">
        <div className="month-container">
          <select value={props.month} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => props.changeMonth(e)}>
            {months.map((mth: number) => {
              return (<option key={mth} value={mth}>{translation.monthNames[mth]}</option>);
            })}
          </select>
        </div>
        <div className="year-container">
          <select value={props.year} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => props.changeYear(e)}>
            {years.map((yr: number) => {
              return (<option key={yr} value={yr}>{yr}</option>);
            })}
          </select>
        </div>
      </div>
      <div className="change-next" onClick={() => props.stepMonth(true)}>&#8680;</div>
    </div>
  );
}

export default CalendarHeader;
