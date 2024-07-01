
import { DayOfWeek } from './types';

export const DAYS_OF_WEEK: DayOfWeek[] = [
  DayOfWeek.Monday,
  DayOfWeek.Tuesday,
  DayOfWeek.Wednesday,
  DayOfWeek.Thursday,
  DayOfWeek.Friday,
  DayOfWeek.Saturday,
  DayOfWeek.Sunday,
];

export const DEFAULT_USERS_JSON = JSON.stringify(
  [
    {
      "id": 1,
      "name": "Alice",
      "availability": [
        { "day": "Monday", "startTime": "09:00", "endTime": "17:00" },
        { "day": "Wednesday", "startTime": "09:00", "endTime": "17:00" },
        { "day": "Friday", "startTime": "09:00", "endTime": "13:00" }
      ]
    },
    {
      "id": 2,
      "name": "Bob",
      "availability": [
        { "day": "Tuesday", "startTime": "12:00", "endTime": "20:00" },
        { "day": "Thursday", "startTime": "12:00", "endTime": "20:00" },
        { "day": "Saturday", "startTime": "10:00", "endTime": "16:00" }
      ]
    },
    {
      "id": 3,
      "name": "Charlie",
      "availability": [
        { "day": "Monday", "startTime": "08:00", "endTime": "12:00" },
        { "day": "Tuesday", "startTime": "08:00", "endTime": "12:00" },
        { "day": "Wednesday", "startTime": "13:00", "endTime": "18:00" },
        { "day": "Friday", "startTime": "12:00", "endTime": "20:00" }
      ]
    },
    {
      "id": 4,
      "name": "Diana",
      "availability": [
        { "day": "Monday", "startTime": "09:00", "endTime": "17:00" },
        { "day": "Tuesday", "startTime": "09:00", "endTime": "17:00" },
        { "day": "Wednesday", "startTime": "09:00", "endTime": "17:00" },
        { "day": "Thursday", "startTime": "09:00", "endTime": "17:00" },
        { "day": "Friday", "startTime": "09:00", "endTime": "17:00" }
      ]
    }
  ],
  null,
  2
);

export const DEFAULT_SHIFTS_JSON = JSON.stringify(
  [
    { "id": 1, "day": "Monday", "startTime": "09:00", "endTime": "13:00" },
    { "id": 2, "day": "Monday", "startTime": "13:00", "endTime": "17:00" },
    { "id": 3, "day": "Tuesday", "startTime": "10:00", "endTime": "14:00" },
    { "id": 4, "day": "Tuesday", "startTime": "14:00", "endTime": "18:00" },
    { "id": 5, "day": "Wednesday", "startTime": "09:00", "endTime": "13:00" },
    { "id": 6, "day": "Wednesday", "startTime": "14:00", "endTime": "18:00" },
    { "id": 7, "day": "Thursday", "startTime": "13:00", "endTime": "19:00" },
    { "id": 8, "day": "Friday", "startTime": "09:00", "endTime": "12:00" },
    { "id": 9, "day": "Friday", "startTime": "13:00", "endTime": "19:00" },
    { "id": 10, "day": "Saturday", "startTime": "10:00", "endTime": "15:00" }
  ],
  null,
  2
);
