# React DatePicker

A simple and configurable datepicker made for React, free from any dependencies other than React.

## Installation

Install it from [npm](https://github.com/npm/cli) and include it in your React build process (using [Webpack](https://webpack.js.org/), [Browserify](http://browserify.org/), etc):
```sh
npm install --save react-datepicker-clean
```
**Note** that [React](https://reactjs.org/) is needed in the project for this component to work and must be installed separatyely since it is not included in the package.

## Usage

Most basic usage:
```jsx
import React from "react";
import DatePicker from "react-datepicker";

class Example extends React.Component {
  constructor(props) {
    this.state = {
      dates: []
    };
  }

  handleChange = dates => {
    this.setState({ dates });
  };

  render() {
    return (
      <DatePicker
        onDateClick={this.handleChange}
      />
    );
  }
}
```

### Properties

This datepicker has a number of properties that can be used

**Mandatory properties:**

name | type | description 
--- | --- | ---
`onDateClick` | Function | Function to use when user clicks a date. <br>Must take array of dates as argument.

**Optional properties:**

name | type | default value | description 
--- | --- | --- | ---
`weekStart` | number<0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6> | `0` | Indicates which day is the first day of the week. `0` is Sunday, `6` is Saturday.
`weekHoliday` | number<-1 \| 0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 | `0`> | Indicates which date that should be designated weekly holiday (default red number instead of black). `0` is Sunday, `6` is Saturday. Set to `-1` to disable this option.
`showWeekNumber` | boolean | `true` | Set to `false` to hide week numbers.
`multiChoice` | boolean | `false` | Set to `true` if the user should be able to choose more than one date.
`multiSpan` | boolean | `false` | Set to `true` to make the choose a span of dates instead of multiple single dates. Disabled if `multiChoice` is set ti `false`.
`allowBefore` | boolean | `false` | Set to `true` if the user should be allowed to choose dates before the current date.
`chosenDates` | Array<Date \| string \| number> | `[]` | Any dates that should be chosen already. Can use same `state` element array that is updated in `onDateClick`. Elements can be Date object, [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) date string or UNIX timestamp.
`blockedDates` | Array<Date \| string \| number> | `[]` | Any dates that should be blocked from selecting. Elements can be Date object, [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) date string or UNIX timestamp.
`holidayDates` | Array<Date \| string \| number> | `[]` | Any holidays that should be marked as holiday (default red number instead of black). Elements can be Date object, [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) date string or UNIX timestamp.
`locale` | string | `'en'` | Locale to use. List of available locales can be found [here](https://github.com/blueprint1985/react-datepicker-clean/docs/locales.md). Use the value in the "Code" column.
## ToDo:

* Add custom styling properties.