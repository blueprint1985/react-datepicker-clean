export default interface DayModel {
  date: Date
  isOtherMonth: boolean;
  isBefore: boolean;
  isToday: boolean;
  isChosen: boolean;
  isBlocked: boolean;
  isHoliday: boolean;
  isSpan: boolean;
}
