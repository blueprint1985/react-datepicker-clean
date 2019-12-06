"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var grid_header_1 = __importDefault(require("./grid-header"));
var grid_body_1 = __importDefault(require("./grid-body"));
require("./calendar-body.css");
var CalendarBody = function (props) {
    return (react_1.default.createElement("div", { className: "calendar-body" },
        react_1.default.createElement(grid_header_1.default, { weekStart: props.weekStart, weekHoliday: props.weekHoliday, showWeekNumber: props.showWeekNumber, locale: props.locale }),
        react_1.default.createElement(grid_body_1.default, { onDateClick: props.onDateClick, onDateHover: props.onDateHover, weeks: props.weeks, weekHoliday: props.weekHoliday, showWeekNumber: props.showWeekNumber, allowBefore: props.allowBefore, spanError: props.spanError })));
};
exports.default = CalendarBody;
