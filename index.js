"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var utils_1 = require("./utils");
var calendar_header_1 = require("./components/calendar-header");
var calendar_body_1 = require("./components/calendar-body");
require("./index.css");
var DatePicker = (function (_super) {
    __extends(DatePicker, _super);
    function DatePicker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            currentMonth: _this.initMonthYear(true),
            currentYear: _this.initMonthYear(false),
            chosenDates: _this.initDatesArray('chosenDates'),
            blockedDates: _this.initDatesArray('blockedDates'),
            holidayDates: _this.initDatesArray('holidayDates'),
            spanDates: _this.initDatesArray('spanDates'),
            isSpanChoosing: false,
            spanError: false,
        };
        _this.stepMonth = function (next, block) {
            if (!next && block) {
                return;
            }
            var currentMonth = _this.state.currentMonth;
            var currentYear = _this.state.currentYear;
            var newMonth = currentMonth;
            var newYear = currentYear;
            if (next && currentMonth >= 11) {
                newMonth = 0;
                newYear++;
            }
            else if (next && currentMonth < 11) {
                newMonth++;
            }
            else if (!next && currentMonth <= 0) {
                newMonth = 11;
                newYear--;
            }
            else if (!next && currentMonth > 0) {
                newMonth--;
            }
            _this.setState({ currentMonth: newMonth, currentYear: newYear });
        };
        _this.changeMonth = function (event) {
            var newMonth = parseInt(event.target.value);
            _this.setState({ currentMonth: newMonth });
        };
        _this.changeYear = function (event) {
            var newYear = parseInt(event.target.value);
            var today = utils_1.default.createDate();
            var todayYear = today.getFullYear();
            var todayMonth = today.getMonth();
            var newMonth = (!_this.props.allowBefore && newYear <= todayYear && _this.state.currentMonth < todayMonth)
                ? todayMonth
                : _this.state.currentMonth;
            _this.setState({ currentMonth: newMonth, currentYear: newYear });
        };
        _this.onDateClick = function (day) {
            if (day.isBlocked || (day.isBefore && !_this.props.allowBefore)) {
                return;
            }
            if (_this.state.spanError) {
                _this.sortAndReturn([]);
                _this.setState({ chosenDates: [], spanDates: [], isSpanChoosing: false, spanError: false });
                return;
            }
            if (!_this.props.multiChoice) {
                var chosenDates_1 = [day.date];
                _this.sortAndReturn(chosenDates_1);
                _this.setState({ chosenDates: chosenDates_1 });
                return;
            }
            if (!_this.props.multiSpan) {
                var chosenDates_2 = _this.state.chosenDates;
                var dateIndex = chosenDates_2.findIndex(function (cDate) {
                    return (day.date.getFullYear() === cDate.getFullYear() &&
                        day.date.getMonth() === cDate.getMonth() &&
                        day.date.getDate() === cDate.getDate());
                });
                if (dateIndex === -1) {
                    chosenDates_2.push(day.date);
                }
                else {
                    chosenDates_2.splice(dateIndex, 1);
                }
                chosenDates_2.sort(function (a, b) {
                    return b.getTime() - a.getTime();
                });
                _this.sortAndReturn(chosenDates_2);
                _this.setState({ chosenDates: chosenDates_2 });
                return;
            }
            if (!_this.state.isSpanChoosing) {
                var chosenDates_3 = [day.date];
                var spanDates = [];
                _this.setState({ chosenDates: chosenDates_3, spanDates: spanDates, isSpanChoosing: true });
                return;
            }
            var chosenDates = __spreadArrays(_this.state.chosenDates, [day.date]);
            chosenDates.sort(function (a, b) {
                return a.getTime() - b.getTime();
            });
            var currDate = utils_1.default.createDate(chosenDates[0], null, null, chosenDates[0].getDate() + 1);
            while (currDate < chosenDates[1]) {
                chosenDates.push(currDate);
                currDate = utils_1.default.createDate(currDate, null, null, currDate.getDate() + 1);
            }
            chosenDates.sort(function (a, b) {
                return b.getTime() - a.getTime();
            });
            _this.sortAndReturn(chosenDates);
            _this.setState({ chosenDates: chosenDates, spanDates: [], isSpanChoosing: false });
        };
        _this.onDateHover = function (day) {
            if (!_this.state.isSpanChoosing) {
                return;
            }
            var chosenDates = __spreadArrays(_this.state.chosenDates, [day.date]);
            chosenDates.sort(function (a, b) {
                return a.getTime() - b.getTime();
            });
            var spanDates = [];
            var currDate = utils_1.default.createDate(chosenDates[0], null, null, chosenDates[0].getDate() + 1);
            while (currDate < chosenDates[1]) {
                spanDates.push(currDate);
                currDate = utils_1.default.createDate(currDate, null, null, currDate.getDate() + 1);
            }
            var spanError = false;
            var today = utils_1.default.createDate();
            if (day.date < today && !_this.props.allowBefore) {
                spanError = true;
            }
            var dateIndex = _this.state.blockedDates.findIndex(function (bDate) {
                return bDate.getTime() === day.date.getTime();
            });
            if (dateIndex !== -1) {
                spanError = true;
            }
            var _loop_1 = function (i) {
                dateIndex = _this.state.blockedDates.findIndex(function (bDate) {
                    return bDate.getTime() === spanDates[i].getTime();
                });
                if (dateIndex !== -1) {
                    spanError = true;
                    return "break";
                }
            };
            for (var i = 0; i < spanDates.length; i++) {
                var state_1 = _loop_1(i);
                if (state_1 === "break")
                    break;
            }
            _this.setState({ spanDates: spanDates, spanError: spanError });
        };
        return _this;
    }
    DatePicker.prototype.initDatesArray = function (type) {
        var propDates;
        switch (type) {
            case 'chosenDates':
                propDates = this.props.chosenDates;
                break;
            case 'blockedDates':
                propDates = this.props.blockedDates;
                break;
            case 'holidayDates':
                propDates = this.props.holidayDates;
                break;
            case 'spanDates':
                propDates = [];
                break;
            default:
                propDates = [];
                break;
        }
        var returnDates = propDates.map(function (date) {
            return utils_1.default.createDate(date);
        });
        return returnDates
            .map(function (date) { return date.getTime(); })
            .filter(function (date, i, array) { return array.indexOf(date) === i; })
            .map(function (time) { return utils_1.default.createDate(time); });
    };
    DatePicker.prototype.initMonthYear = function (iMonth) {
        var today = utils_1.default.createDate();
        var propDates = this.props.chosenDates || [];
        var chosenDates = propDates.map(function (date) {
            return new Date(date);
        });
        if (!chosenDates || !chosenDates.length) {
            return (iMonth) ? today.getMonth() : today.getFullYear();
        }
        chosenDates.sort(function (a, b) {
            return b.getTime() - a.getTime();
        });
        if (chosenDates[0] <= today) {
            return (iMonth) ? today.getMonth() : today.getFullYear();
        }
        var first = utils_1.default.createDate();
        chosenDates.forEach(function (date) {
            first = (date > today) ? date : first;
        });
        return (iMonth) ? first.getMonth() : first.getFullYear();
    };
    DatePicker.prototype.initWeeks = function () {
        var currentFirst = utils_1.default.createDate(null, this.state.currentYear, this.state.currentMonth, 1);
        var currentLast = utils_1.default.createDate(null, this.state.currentYear, this.state.currentMonth + 1, 0);
        var firstWeekDay = currentFirst.getDay();
        var lastWeekDay = currentLast.getDay();
        var daysPastMonth = (this.props.weekStart - firstWeekDay - 7) % 7;
        var daysNextMonth = (7 - lastWeekDay + this.props.weekStart - 1) % 7;
        var days = [];
        var loopDate;
        for (var i = daysPastMonth + 1; i <= currentLast.getDate() + daysNextMonth; i++) {
            loopDate = utils_1.default.createDate(null, this.state.currentYear, this.state.currentMonth, i);
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
        var weeks = [];
        var firstDate;
        var onejan;
        var weekNumber;
        for (var i = 0; i < days.length; i += 7) {
            firstDate = days[i].date;
            onejan = new Date(firstDate.getFullYear(), 0, 1, 0, 0, 0, 0);
            weekNumber = Math.ceil((((firstDate.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
            weeks.push({
                weekNumber: weekNumber,
                days: days.slice(i, i + 7),
            });
        }
        return weeks;
    };
    DatePicker.prototype.checkOtherMonth = function (date) {
        return date.getMonth() !== this.state.currentMonth;
    };
    DatePicker.prototype.checkBefore = function (date) {
        var today = utils_1.default.createDate();
        return date < today;
    };
    DatePicker.prototype.checkToday = function (date) {
        var today = utils_1.default.createDate();
        return date.getTime() === today.getTime();
    };
    DatePicker.prototype.checkDateArray = function (date, type) {
        if (type === 'holidayDates' && date.getDay() === this.props.weekHoliday) {
            return true;
        }
        var stateDates;
        switch (type) {
            case 'chosenDates':
                stateDates = this.state.chosenDates;
                break;
            case 'blockedDates':
                stateDates = this.state.blockedDates;
                break;
            case 'holidayDates':
                stateDates = this.state.holidayDates;
                break;
            case 'spanDates':
                stateDates = this.state.spanDates;
                break;
            default:
                stateDates = [];
                break;
        }
        var isInArray = stateDates.findIndex(function (cDate) {
            return cDate.getTime() === date.getTime();
        });
        return isInArray !== -1;
    };
    DatePicker.prototype.sortAndReturn = function (dates) {
        dates.sort(function (a, b) {
            return a.getTime() - b.getTime();
        });
        this.props.onDateClick(dates);
    };
    DatePicker.prototype.render = function () {
        var weeks = this.initWeeks();
        return (React.createElement("div", { className: "datepicker-container" },
            React.createElement(calendar_header_1.default, { stepMonth: this.stepMonth, changeMonth: this.changeMonth, changeYear: this.changeYear, month: this.state.currentMonth, year: this.state.currentYear, allowBefore: this.props.allowBefore, locale: this.props.locale }),
            React.createElement(calendar_body_1.default, { onDateClick: this.onDateClick, onDateHover: this.onDateHover, weeks: weeks, weekStart: this.props.weekStart, weekHoliday: this.props.weekHoliday, showWeekNumber: this.props.showWeekNumber, allowBefore: this.props.allowBefore, spanError: this.state.spanError, locale: this.props.locale })));
    };
    DatePicker.defaultProps = {
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
    };
    return DatePicker;
}(React.Component));
exports.default = DatePicker;
