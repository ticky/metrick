import Unit from './unit';

export default class Duration extends Unit {}

// Base duration unit is seconds
export const second = new Duration();
export const seconds = second;

export const millisecond = new Duration((1 / 1000)::seconds);
export const milliseconds = millisecond;

export const minute = new Duration(60::seconds);
export const minutes = minute;

export const hour = new Duration(60::minutes);
export const hours = hour;

export const day = new Duration(24::hours);
export const days = day;

export const week = new Duration(7::days);
export const weeks = week;

export const month = new Duration(30.416666667::days);
export const months = month;

export const year = new Duration(365.3::days);
export const years = year;

// Override only after all values are set relative to each other; implicit unit is `second` until here
Duration.implicitUnit = millisecond;
