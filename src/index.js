import unitConstructor from './unit';

export const Unit = unitConstructor;

const { default: dataConstructor, ...dataUnits } = require('./data');

export const Data = dataConstructor;
export const data = dataUnits;

const { default: durationConstructor, ...durationUnits } = require('./duration');

export const Duration = durationConstructor;
export const duration = durationUnits;
