import DayModel from './day';

export default interface WeekModel {
  weekNumber: number;
  days: Array<DayModel>;
}
