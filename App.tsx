import React, { useState, useCallback, useMemo } from 'react';
import { User, Shift } from './types';
import { DEFAULT_USERS_JSON, DEFAULT_SHIFTS_JSON } from './constants';
import { generateSchedule } from './services/schedulingService';
import { ScheduleView } from './components/ScheduleView';
import { EmployeeManager } from './components/EmployeeManager';
import { ShiftManager } from './components/ShiftManager';
import { SparklesIcon } from './components/icons';

const App: React.FC = () => {
    const initialUsers = useMemo(() => JSON.parse(DEFAULT_USERS_JSON), []);
    const initialShifts = useMemo(() => JSON.parse(DEFAULT_SHIFTS_JSON), []);

    const [users, setUsers] = useState<User[]>(initialUsers);
    const [shifts, setShifts] = useState<Shift[]>(initialShifts);
    
    const [schedule, setSchedule] = useState<Shift[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleGenerateSchedule = useCallback(() => {
        setIsLoading(true);
        setTimeout(() => {
            const newSchedule = generateSchedule(users, shifts);
            setSchedule(newSchedule);
            setIsLoading(false);
        }, 500);
    }, [users, shifts]);
    
    const handleReset = () => {
        setUsers(initialUsers);
        setShifts(initialShifts);
        setSchedule([]);
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <header className="bg-white shadow-md sticky top-0 z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <SparklesIcon className="h-8 w-8 text-indigo-600" />
                        <h1 className="text-2xl font-bold text-gray-800">Roster Scheduling Assistant</h1>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 mb-8">
                        <EmployeeManager users={users} setUsers={setUsers} />
                        <ShiftManager shifts={shifts} setShifts={setShifts} />
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 border-t border-gray-200 pt-8">
                        <button
                            onClick={handleGenerateSchedule}
                            disabled={isLoading}
                            className="flex items-center justify-center w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-all duration-300 order-1 sm:order-2"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <SparklesIcon className="h-5 w-5 mr-2" />
                                    Generate Schedule
                                </>
                            )}
                        </button>
                         <button
                            onClick={handleReset}
                            disabled={isLoading}
                            className="w-full sm:w-auto px-8 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all duration-300 order-2 sm:order-1"
                        >
                            Reset to Defaults
                        </button>
                    </div>
                </div>

                <div className="mt-10">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Generated Schedule</h2>
                    <ScheduleView schedule={schedule} />
                </div>
            </main>
             <footer className="text-center py-6 mt-8 text-gray-500 text-sm">
                <p>Built with React, TypeScript, and Tailwind CSS.</p>
            </footer>
        </div>
    );
};

export default App;
