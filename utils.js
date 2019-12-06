"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = (function () {
    function Utils() {
    }
    Utils.createDate = function (fullDate, year, month, date, hours, minutes, seconds, milliseconds) {
        var returnDate = new Date();
        if (fullDate !== undefined && fullDate !== null) {
            returnDate = new Date(fullDate);
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
        }
        else {
            returnDate.setHours(0);
        }
        if (minutes !== undefined && minutes !== null) {
            returnDate.setMinutes(minutes);
        }
        else {
            returnDate.setMinutes(0);
        }
        if (seconds !== undefined && seconds !== null) {
            returnDate.setSeconds(seconds);
        }
        else {
            returnDate.setSeconds(0);
        }
        if (milliseconds !== undefined && milliseconds !== null) {
            returnDate.setMilliseconds(milliseconds);
        }
        else {
            returnDate.setMilliseconds(0);
        }
        return returnDate;
    };
    Utils.hasKey = function (obj, key) {
        return key in obj;
    };
    return Utils;
}());
exports.default = Utils;
