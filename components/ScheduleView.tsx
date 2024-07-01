
import React from 'react';
import { Shift } from '../types';
import { DAYS_OF_WEEK } from '../constants';
import { CalendarIcon } from './icons';

interface ScheduleViewProps {
  schedule: Shift[];
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({ schedule }) => {
  if (schedule.length === 0) {
    return (
      <div className="text-center py-12 px-6 bg-white border border-dashed border-gray-300 rounded-lg">
        <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-xl font-semibold text-gray-800">Schedule Will Appear Here</h3>
        <p className="text-gray-500 mt-2">Enter user and shift data above, then click "Generate Schedule" to see the results.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
      {DAYS_OF_WEEK.map(day => {
        const shiftsForDay = schedule
            .filter(shift => shift.day === day)
            .sort((a,b) => a.startTime.localeCompare(b.startTime));

        return (
          <div key={day} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <h4 className="font-bold text-center text-indigo-700 mb-4 pb-2 border-b border-gray-200">{day}</h4>
            <div className="space-y-3">
              {shiftsForDay.length > 0 ? (
                shiftsForDay.map(shift => (
                  <div 
                    key={shift.id} 
                    className={`p-3 rounded-lg text-sm transition-all duration-200 ${shift.assignedUser ? 'bg-green-50 border-l-4 border-green-500' : 'bg-red-50 border-l-4 border-red-500'}`}
                  >
                    <p className="font-semibold text-gray-700">{shift.startTime} - {shift.endTime}</p>
                    <p className="mt-1">
                      {shift.assignedUser ? (
                        <span className="font-medium text-green-800">{shift.assignedUser.name}</span>
                      ) : (
                        <span className="font-medium text-red-800">Unassigned</span>
                      )}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-xs text-gray-500 italic py-4">No shifts scheduled</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
