"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var i18n_1 = require("../locales/i18n");
var utils_1 = __importDefault(require("../utils"));
require("./calendar-header.css");
var CalendarHeader = function (props) {
    var translation = (utils_1.default.hasKey(i18n_1.translations, props.locale))
        ? i18n_1.translations[props.locale]
        : i18n_1.translations['en'];
    var today = utils_1.default.createDate();
    var blockGoBack = (!props.allowBefore &&
        ((props.month <= today.getMonth() && props.year <= today.getFullYear()) || props.year < today.getFullYear()));
    var prevClass = blockGoBack ? "change-prev blocked" : "change-prev";
    var startYear = (props.allowBefore) ? props.year - 100 : today.getFullYear();
    var startMonth = (!props.allowBefore && today.getFullYear() >= props.year) ? today.getMonth() : 0;
    var years = [];
    var months = [];
    for (var i = startYear; i <= props.year + 100; i++) {
        years.push(i);
    }
    for (var j = startMonth; j <= 11; j++) {
        months.push(j);
    }
    return (react_1.default.createElement("div", { className: "calendar-header" },
        react_1.default.createElement("div", { className: prevClass, onClick: function () { return props.stepMonth(false, blockGoBack); } }, "\u21E6"),
        react_1.default.createElement("div", { className: "month-year-container" },
            react_1.default.createElement("div", { className: "month-container" },
                react_1.default.createElement("select", { value: props.month, onChange: function (e) { return props.changeMonth(e); } }, months.map(function (mth) {
                    return (react_1.default.createElement("option", { key: mth, value: mth }, translation.monthNames[mth]));
                }))),
            react_1.default.createElement("div", { className: "year-container" },
                react_1.default.createElement("select", { value: props.year, onChange: function (e) { return props.changeYear(e); } }, years.map(function (yr) {
                    return (react_1.default.createElement("option", { key: yr, value: yr }, yr));
                })))),
        react_1.default.createElement("div", { className: "change-next", onClick: function () { return props.stepMonth(true); } }, "\u21E8")));
};
exports.default = CalendarHeader;
