const tagKeys = [
  'AIRPORT_LIST',
  'CITY_LIST',
  'HOTEL_LIST',
  'HOTEL_SEARCH_RESULT',
  'PROFILE_UPDATE',
  'HOLIDAY',
  'TRAVELERS',
  'COUNTRY_LIST',
  'FLIGHT_BOOK',
  'UMRAH',
  'DEPOSIT',
  'TRANSACTION',
  'INVOICE',
  'SUPPORT',
  'VISA',
] as const;

export const TagTypes = Object.fromEntries(tagKeys.map((key) => [key, key])) as {
  [K in (typeof tagKeys)[number]]: K;
};

export type TagType = (typeof TagTypes)[keyof typeof TagTypes];

export type Tag = {
  type: TagType;
  id: `${TagType}_ID`;
};

export function createTag(type: TagType): Tag {
  return {
    type,
    id: `${type}_ID`,
  };
}
