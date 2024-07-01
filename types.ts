
export enum DayOfWeek {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
}

export interface Availability {
  day: DayOfWeek;
  startTime: string; // "HH:mm" format
  endTime: string;   // "HH:mm" format
}

export interface User {
  id: number;
  name: string;
  availability: Availability[];
}

export interface Shift {
  id: number;
  day: DayOfWeek;
  startTime: string; // "HH:mm" format
  endTime: string;   // "HH:mm" format
  assignedUser?: User | null;
}
