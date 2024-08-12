
export const callFilterRules = [
  '(?:[KkNnWw][0-9][A-Za-z]{3})',
  '(?:[KkWw][A-Za-z][0-9][A-Za-z]{3})',
  '(?:[KkNnWw][A-Za-z]?[0-9][A-Za-z]{1,2})',
  '(?:(?:(?:[Aa][A-La-l])|(?:[KkNnWw][A-Za-z]))[0-9][A-Za-z]{1,2})',
  '(?:(?:(?:[KkNnWw][Ll])|(?:[NnWw][Pp])|(?:[KkNnWw][Hh]))[0-9][A-Za-z]{2})',
];

export const validCallFilter = new RegExp(`^(${callFilterRules.join('|')})$`);