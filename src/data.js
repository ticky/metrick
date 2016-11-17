import Unit from './unit';

export default class Data extends Unit {}

const KILO = 1000;
const KIBI = 1024;

// Base duration unit is bits
export const bit = new Data();
export const bits = bit;

export const nibble = new Data(4::bits);
export const nibbles = nibble;

export const kilobit = new Data(KILO::bits);
export const kilobits = kilobit;

export const kibibit = new Data(KIBI::bits);
export const kibibits = kibibit;

export const megabit = new Data(KILO::kilobits);
export const megabits = megabit;

export const mebibit = new Data(KIBI::kibibits);
export const mebibits = mebibit;

export const gigabit = new Data(KILO::megabits);
export const gigabits = gigabit;

export const gibibit = new Data(KIBI::mebibits);
export const gibibits = gibibit;

export const terabit = new Data(KILO::gigabits);
export const terabits = terabit;

export const tebibit = new Data(KIBI::gibibits);
export const tebibits = tebibit;

export const petabit = new Data(KILO::terabits);
export const petabits = petabit;

export const pebibit = new Data(KIBI::tebibits);
export const pebibits = pebibit;

export const exabit = new Data(KILO::petabits);
export const exabits = exabit;

export const exbibit = new Data(KIBI::pebibits);
export const exbibits = exbibit;

// Bytes

export const byte = new Data(8);
export const bytes = byte;

export const kilobyte = new Data(KILO::bytes);
export const kilobytes = kilobyte;

export const kibibyte = new Data(KIBI::bytes);
export const kibibytes = kibibyte;

export const megabyte = new Data(KILO::kilobytes);
export const megabytes = megabyte;

export const mebibyte = new Data(KIBI::kibibytes);
export const mebibytes = mebibyte;

export const gigabyte = new Data(KILO::megabytes);
export const gigabytes = gigabyte;

export const gibibyte = new Data(KIBI::mebibytes);
export const gibibytes = gibibyte;

export const terabyte = new Data(KILO::gigabytes);
export const terabytes = terabyte;

export const tebibyte = new Data(KIBI::gibibytes);
export const tebibytes = tebibyte;

export const petabyte = new Data(KILO::terabytes);
export const petabytes = petabyte;

export const pebibyte = new Data(KIBI::tebibytes);
export const pebibytes = pebibyte;

export const exabyte = new Data(KILO::petabytes);
export const exabytes = exabyte;

export const exbibyte = new Data(KIBI::pebibytes);
export const exbibytes = exbibyte;
