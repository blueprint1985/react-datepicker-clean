"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var day_1 = __importDefault(require("./day"));
require("./week.css");
var Week = function (props) {
    return (react_1.default.createElement("div", { className: "week" },
        props.showWeekNumber && (react_1.default.createElement("div", { className: "week-number" }, props.week.weekNumber)),
        react_1.default.createElement("div", { className: "days-container" }, props.week.days.map(function (day) {
            return (react_1.default.createElement(day_1.default, { key: day.date.getDate(), onDateClick: props.onDateClick, onDateHover: props.onDateHover, day: day, allowBefore: props.allowBefore, spanError: props.spanError }));
        }))));
};
exports.default = Week;
