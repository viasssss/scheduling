import React, { useState } from 'react';
import { Shift, DayOfWeek } from '../types';
import { DAYS_OF_WEEK } from '../constants';
import { CalendarIcon, PlusIcon, TrashIcon } from './icons';

interface ShiftManagerProps {
  shifts: Shift[];
  setShifts: React.Dispatch<React.SetStateAction<Shift[]>>;
}

export const ShiftManager: React.FC<ShiftManagerProps> = ({ shifts, setShifts }) => {
  const [day, setDay] = useState<DayOfWeek>(DayOfWeek.Monday);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');

  const handleAddShift = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startTime || !endTime || startTime >= endTime) {
      alert('Please enter a valid start and end time.');
      return;
    }
    const newShift: Shift = {
      id: Date.now(), // simple unique id
      day,
      startTime,
      endTime,
    };
    setShifts(prev => [...prev, newShift].sort((a,b) => DAYS_OF_WEEK.indexOf(a.day) - DAYS_OF_WEEK.indexOf(b.day) || a.startTime.localeCompare(b.startTime)));
  };

  const handleDeleteShift = (id: number) => {
    setShifts(prev => prev.filter(shift => shift.id !== id));
  };
  
  const shiftsByDay = DAYS_OF_WEEK.reduce((acc, day) => {
      acc[day] = shifts.filter(s => s.day === day);
      return acc;
  }, {} as Record<DayOfWeek, Shift[]>);

  return (
    <div className="w-full">
      <div className="flex items-center text-lg font-semibold text-gray-800 mb-4">
        <CalendarIcon className="h-6 w-6 mr-3 text-indigo-600" />
        <span>Required Shifts</span>
      </div>
      <div className="bg-gray-50/50 p-4 rounded-lg border border-gray-200">
        <form onSubmit={handleAddShift} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
            <div className="flex flex-col">
                <label htmlFor="shift-day" className="text-sm font-medium text-gray-700 mb-1">Day</label>
                <select id="shift-day" value={day} onChange={e => setDay(e.target.value as DayOfWeek)} className="w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                    {DAYS_OF_WEEK.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
            </div>
            <div className="flex flex-col">
                <label htmlFor="shift-start" className="text-sm font-medium text-gray-700 mb-1">Start Time</label>
                <input id="shift-start" type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className="w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required />
            </div>
            <div className="flex flex-col">
                <label htmlFor="shift-end" className="text-sm font-medium text-gray-700 mb-1">End Time</label>
                <input id="shift-end" type="time" value={endTime} onChange={e => setEndTime(e.target.value)} className="w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required />
            </div>
            <button type="submit" className="flex items-center justify-center w-full px-4 py-2 bg-indigo-500 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Shift
            </button>
        </form>
      </div>
      <div className="mt-4 space-y-2 max-h-80 overflow-y-auto pr-2">
        {shifts.length > 0 ? (
            DAYS_OF_WEEK.map(day => {
                const dayShifts = shifts.filter(s => s.day === day);
                if (dayShifts.length === 0) return null;

                return (
                    <div key={day}>
                        <h4 className="font-semibold text-gray-600 text-sm mt-3">{day}</h4>
                        {dayShifts.map(shift => (
                            <div key={shift.id} className="flex items-center justify-between bg-white p-2.5 rounded-md border border-gray-200 mt-1">
                                <span className="font-mono text-sm text-gray-800">{shift.startTime} - {shift.endTime}</span>
                                <button onClick={() => handleDeleteShift(shift.id)} className="text-gray-400 hover:text-red-500 transition-colors" aria-label="Delete shift">
                                    <TrashIcon className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                );
            })
        ) : (
             <p className="text-center text-sm text-gray-500 py-4">No shifts added yet.</p>
        )}
      </div>
    </div>
  );
};
