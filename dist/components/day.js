"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./day.css");
var Day = function (props) {
    var dayClass = 'day';
    var day = props.day;
    if (!props.allowBefore && day.isBefore) {
        dayClass += ' before';
    }
    if (day.isBlocked) {
        dayClass += ' blocked';
    }
    if (day.isToday) {
        dayClass += ' today';
    }
    if (day.isChosen) {
        dayClass += ' chosen';
    }
    if (day.isOtherMonth) {
        dayClass += ' other';
    }
    if (day.isHoliday) {
        dayClass += ' holiday';
    }
    if (day.isSpan) {
        dayClass += ' span';
    }
    if (props.spanError) {
        dayClass += ' error';
    }
    return (react_1.default.createElement("div", { className: dayClass, onClick: function () { return props.onDateClick(day); }, onMouseOver: function () { return props.onDateHover(day); } }, props.day.date.getDate()));
};
exports.default = Day;
