import Unit from './unit';

export default class Length extends Unit {}

// Base length unit is metres
export const metre = new Length();
export const metres = metre;

export const centimetre = new Length((1 / 100)::metres);
export const centimetres = centimetre;

export const millimetre = new Length((1 / 10)::centimetres);
export const millimetres = millimetre;

export const kilometre = new Length(1000::metres);
export const kilometres = kilometre;

export const astronomicalUnit = new Length(149597870700::metres);
export const astronomicalUnits = astronomicalUnit;

// Imperial zone

export const inch = new Length(2.54::centimetres);
export const inches = inch;

export const foot = new Length(12::inches);
export const feet = foot;

export const pace = new Length(2.5::feet);
export const paces = pace;

export const yard = new Length(3::feet);
export const yards = yard;

export const chain = new Length(66::feet);
export const chains = chain;

export const mile = new Length(80::chains);
export const miles = mile;

// Weird stuff

export const spat = new Length(1000000000::kilometres);
export const spats = spat;

export const twip = new Length((1 / 1440)::inches);
export const twips = twip;
