import React from 'react';

import LocaleModel from '../models/locale';
import { translations } from '../locales/i18n';
import { WeekDaysModel } from '../models/week-days';
import Utils from '../helpers/utils';

import '../styles/grid-header.css';

interface GridHeaderProps {
  weekStart: WeekDaysModel;
  weekHoliday: WeekDaysModel | -1;
  showWeekNumber: boolean;
  locale: string;
}

const GridHeader: React.FC<GridHeaderProps> = (props: GridHeaderProps) => {
  const translation: LocaleModel = (Utils.hasKey(translations, props.locale))
    ? translations[props.locale]
    : translations['en'];

  const moveDays: Array<string> = translation.weekdayNames.slice(0, props.weekStart);
  const restDays: Array<string> = translation.weekdayNames.slice(props.weekStart);
  const weekdayNames: Array<string> = restDays.concat(moveDays);
  
  return (
    <div className="grid-header">
      {props.showWeekNumber && (
        <div className="week-number-header">{translation.week}</div>
      )}
      <div className="weekdays-container">
        {weekdayNames.map((weekday: string) => {
          return (<div key={weekday} className="weekday-header">{weekday}</div>);
        })}
      </div>
    </div>
  );
}

export default GridHeader;
