export default class Utils {
    static createDate(fullDate?: Date | number | string | undefined | null, year?: number | undefined | null, month?: number | undefined | null, date?: number | undefined | null, hours?: number | undefined | null, minutes?: number | undefined | null, seconds?: number | undefined | null, milliseconds?: number | undefined | null): Date;
    static hasKey<O>(obj: O, key: keyof any): key is keyof O;
}
