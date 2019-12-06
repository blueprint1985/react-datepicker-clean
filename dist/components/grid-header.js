"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var i18n_1 = require("../locales/i18n");
var utils_1 = __importDefault(require("../utils"));
require("./grid-header.css");
var GridHeader = function (props) {
    var translation = (utils_1.default.hasKey(i18n_1.translations, props.locale))
        ? i18n_1.translations[props.locale]
        : i18n_1.translations['en'];
    var moveDays = translation.weekdayNames.slice(0, props.weekStart);
    var restDays = translation.weekdayNames.slice(props.weekStart);
    var weekdayNames = restDays.concat(moveDays);
    return (react_1.default.createElement("div", { className: "grid-header" },
        props.showWeekNumber && (react_1.default.createElement("div", { className: "week-number-header" }, translation.week)),
        react_1.default.createElement("div", { className: "weekdays-container" }, weekdayNames.map(function (weekday) {
            return (react_1.default.createElement("div", { key: weekday, className: "weekday-header" }, weekday));
        }))));
};
exports.default = GridHeader;
