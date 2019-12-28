export default class Utils {
  static createDate (
    fullDate?: Date | number | string | undefined | null,
    year?: number | undefined | null,
    month?: number | undefined | null,
    date?: number | undefined | null,
    hours?: number | undefined | null,
    minutes?: number | undefined | null,
    seconds?: number | undefined | null,
    milliseconds?: number | undefined | null,
  ): Date {
    let returnDate: Date = new Date();

    if (fullDate !== undefined && fullDate !== null) {
      returnDate = new Date(fullDate)
    }
    
    if (year !== undefined && year !== null) {
      returnDate.setFullYear(year);
    }

    if (month !== undefined && month !== null) {
      returnDate.setMonth(month);
    }

    if (date !== undefined && date !== null) {
      returnDate.setDate(date);
    }

    if (hours !== undefined && hours !== null) {
      returnDate.setHours(hours);
    } else {
      returnDate.setHours(0);
    }

    if (minutes !== undefined && minutes !== null) {
      returnDate.setMinutes(minutes);
    } else {
      returnDate.setMinutes(0);
    }

    if (seconds !== undefined && seconds !== null) {
      returnDate.setSeconds(seconds);
    } else {
      returnDate.setSeconds(0);
    }

    if (milliseconds !== undefined && milliseconds !== null) {
      returnDate.setMilliseconds(milliseconds);
    } else {
      returnDate.setMilliseconds(0);
    }

    return returnDate;
  }

  static createDateArray(
    startDate?: Date | number | string | undefined | null,
    endDate?: Date | number | string | undefined | null
  ) {
    const dateOne: Date = this.createDate(startDate);
    const dateTwo: Date = this.createDate(endDate);
    const firstDate: Date = this.createDate(Math.min(dateOne.getTime(), dateTwo.getTime()));
    const lastDate: Date = this.createDate(Math.max(dateOne.getTime(), dateTwo.getTime()));
    const returnArray: Array<Date> = [];
    let currentTimestamp: number = firstDate.getTime();

    while (currentTimestamp <= lastDate.getTime()) {
      returnArray.push(this.createDate(currentTimestamp));
      currentTimestamp += (1000 * 60 * 60 * 24);
    }

    return returnArray;
  }

  static hasKey<O>(obj: O, key: keyof any): key is keyof O {
    return key in obj
  }
}