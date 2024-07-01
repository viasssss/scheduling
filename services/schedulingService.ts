
import { User, Shift } from '../types';
import { DAYS_OF_WEEK } from '../constants';

const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const isTimeRangeContained = (
  startA: string,
  endA: string,
  startB: string,
  endB: string
): boolean => {
  return timeToMinutes(startA) <= timeToMinutes(startB) && timeToMinutes(endA) >= timeToMinutes(endB);
};

const doTimeRangesOverlap = (
    startA: string,
    endA: string,
    startB: string,
    endB: string
): boolean => {
    const startAMin = timeToMinutes(startA);
    const endAMin = timeToMinutes(endA);
    const startBMin = timeToMinutes(startB);
    const endBMin = timeToMinutes(endB);
    return startAMin < endBMin && endAMin > startBMin;
}

export const generateSchedule = (users: User[], shifts: Shift[]): Shift[] => {
  const schedule: Shift[] = shifts.map(s => ({ ...s, assignedUser: null }));

  const dayIndexMap = new Map(DAYS_OF_WEEK.map((day, index) => [day, index]));

  schedule.sort((a, b) => {
    const dayAIndex = dayIndexMap.get(a.day) ?? -1;
    const dayBIndex = dayIndexMap.get(b.day) ?? -1;
    if (dayAIndex !== dayBIndex) {
        return dayAIndex - dayBIndex;
    }
    return timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
  });

  const assignedShiftsForUser = new Map<number, Shift[]>();
  users.forEach(u => assignedShiftsForUser.set(u.id, []));

  for (const shiftToFill of schedule) {
    const availableUsers = users.filter(user => {
      const availability = user.availability.find(
        a => a.day === shiftToFill.day && isTimeRangeContained(a.startTime, a.endTime, shiftToFill.startTime, shiftToFill.endTime)
      );
      if (!availability) return false;

      const userAssignedShifts = assignedShiftsForUser.get(user.id) || [];
      const hasOverlap = userAssignedShifts.some(
        assignedShift =>
          assignedShift.day === shiftToFill.day &&
          doTimeRangesOverlap(assignedShift.startTime, assignedShift.endTime, shiftToFill.startTime, shiftToFill.endTime)
      );
      return !hasOverlap;
    });

    if (availableUsers.length > 0) {
      const userToAssign = availableUsers[0];
      shiftToFill.assignedUser = userToAssign;
      
      const userShifts = assignedShiftsForUser.get(userToAssign.id);
      if(userShifts) {
          userShifts.push(shiftToFill);
      }
    }
  }

  return schedule;
};
