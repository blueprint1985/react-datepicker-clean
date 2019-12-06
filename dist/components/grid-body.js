"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var week_1 = __importDefault(require("./week"));
require("./grid-body.css");
var GridBody = function (props) {
    return (react_1.default.createElement("div", { className: "grid-body" }, props.weeks.map(function (week) {
        return (react_1.default.createElement(week_1.default, { key: week.weekNumber, onDateClick: props.onDateClick, onDateHover: props.onDateHover, week: week, weekHoliday: props.weekHoliday, showWeekNumber: props.showWeekNumber, allowBefore: props.allowBefore, spanError: props.spanError }));
    })));
};
exports.default = GridBody;
