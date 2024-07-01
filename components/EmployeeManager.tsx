import React, { useState } from 'react';
import { User, Availability, DayOfWeek } from '../types';
import { DAYS_OF_WEEK } from '../constants';
import { UsersIcon, PlusIcon, TrashIcon, ClockIcon } from './icons';

interface EmployeeManagerProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const AddAvailabilityForm: React.FC<{ userId: number, onAdd: (userId: number, availability: Availability) => void }> = ({ userId, onAdd }) => {
    const [day, setDay] = useState<DayOfWeek>(DayOfWeek.Monday);
    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('17:00');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!startTime || !endTime || startTime >= endTime) {
            alert('Please enter a valid start and end time.');
            return;
        }
        onAdd(userId, { day, startTime, endTime });
    };

    return (
         <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end bg-gray-50 p-3 rounded-md mt-2">
            <div className="flex flex-col">
                <label htmlFor={`avail-day-${userId}`} className="text-xs font-medium text-gray-600 mb-1">Day</label>
                <select id={`avail-day-${userId}`} value={day} onChange={e => setDay(e.target.value as DayOfWeek)} className="w-full p-2 text-sm border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                    {DAYS_OF_WEEK.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
            </div>
            <div className="flex flex-col">
                <label htmlFor={`avail-start-${userId}`} className="text-xs font-medium text-gray-600 mb-1">Start</label>
                <input id={`avail-start-${userId}`} type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className="w-full p-2 text-sm border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required />
            </div>
            <div className="flex flex-col">
                <label htmlFor={`avail-end-${userId}`} className="text-xs font-medium text-gray-600 mb-1">End</label>
                <input id={`avail-end-${userId}`} type="time" value={endTime} onChange={e => setEndTime(e.target.value)} className="w-full p-2 text-sm border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required />
            </div>
            <button type="submit" className="flex items-center justify-center w-full px-4 py-2 bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                <PlusIcon className="h-4 w-4 mr-1" />
                Add
            </button>
        </form>
    );
};


export const EmployeeManager: React.FC<EmployeeManagerProps> = ({ users, setUsers }) => {
  const [newUserName, setNewUserName] = useState('');

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUserName.trim() === '') return;
    const newUser: User = {
      id: Date.now(),
      name: newUserName.trim(),
      availability: [],
    };
    setUsers(prev => [...prev, newUser]);
    setNewUserName('');
  };

  const handleDeleteUser = (id: number) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  const handleAddAvailability = (userId: number, availability: Availability) => {
      setUsers(prevUsers => prevUsers.map(user => {
          if (user.id === userId) {
              return { ...user, availability: [...user.availability, availability] };
          }
          return user;
      }));
  };
  
  const handleDeleteAvailability = (userId: number, index: number) => {
      setUsers(prevUsers => prevUsers.map(user => {
          if (user.id === userId) {
              const newAvailability = [...user.availability];
              newAvailability.splice(index, 1);
              return { ...user, availability: newAvailability };
          }
          return user;
      }));
  };

  return (
    <div className="w-full">
      <div className="flex items-center text-lg font-semibold text-gray-800 mb-4">
        <UsersIcon className="h-6 w-6 mr-3 text-indigo-600" />
        <span>Employee Availability</span>
      </div>
      <div className="bg-gray-50/50 p-4 rounded-lg border border-gray-200">
        <form onSubmit={handleAddUser} className="flex items-center gap-4">
            <input 
                type="text" 
                value={newUserName}
                onChange={e => setNewUserName(e.target.value)}
                placeholder="Enter new employee name"
                className="flex-grow p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button type="submit" className="flex items-center justify-center px-4 py-2 bg-indigo-500 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Employee
            </button>
        </form>
      </div>

      <div className="mt-4 space-y-3 max-h-96 overflow-y-auto pr-2">
        {users.map(user => (
          <div key={user.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center">
                <h4 className="font-bold text-gray-800">{user.name}</h4>
                <button onClick={() => handleDeleteUser(user.id)} className="text-gray-400 hover:text-red-500 transition-colors" aria-label={`Delete ${user.name}`}>
                    <TrashIcon className="h-5 w-5" />
                </button>
            </div>
            
            <div className="mt-3 space-y-2">
                {user.availability.length > 0 ? (
                    user.availability.map((avail, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                            <div className="flex items-center text-sm text-gray-700">
                                <ClockIcon className="h-4 w-4 mr-2 text-gray-400" />
                                <span className="font-medium w-24">{avail.day}</span>
                                <span className="font-mono">{avail.startTime} - {avail.endTime}</span>
                            </div>
                             <button onClick={() => handleDeleteAvailability(user.id, index)} className="text-gray-400 hover:text-red-500 transition-colors" aria-label="Delete availability">
                                <TrashIcon className="h-4 w-4" />
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-xs text-gray-500 italic py-2">No availability set.</p>
                )}
            </div>
            <AddAvailabilityForm userId={user.id} onAdd={handleAddAvailability} />
          </div>
        ))}
      </div>
    </div>
  );
};
