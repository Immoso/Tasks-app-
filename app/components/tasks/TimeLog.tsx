'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';

interface TimeEntry {
  id: string;
  taskId: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  description?: string;
}

interface TimeLogProps {
  taskId: string;
  userId: string;
}

export default function TimeLog({ taskId, userId }: TimeLogProps) {
  const [isTracking, setIsTracking] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<TimeEntry | null>(null);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);

  const startTracking = () => {
    const entry: TimeEntry = {
      id: crypto.randomUUID(),
      taskId,
      userId,
      startTime: new Date(),
    };
    setCurrentEntry(entry);
    setIsTracking(true);
  };

  const stopTracking = (description?: string) => {
    if (currentEntry) {
      const completedEntry: TimeEntry = {
        ...currentEntry,
        endTime: new Date(),
        description,
      };
      setTimeEntries([...timeEntries, completedEntry]);
      setCurrentEntry(null);
      setIsTracking(false);
    }
  };

  const getTotalTime = () => {
    return timeEntries.reduce((total, entry) => {
      if (entry.endTime) {
        return total + (entry.endTime.getTime() - entry.startTime.getTime());
      }
      return total;
    }, 0);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Time Tracking</h3>
        {isTracking ? (
          <button
            onClick={() => stopTracking()}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Stop Tracking
          </button>
        ) : (
          <button
            onClick={startTracking}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Start Tracking
          </button>
        )}
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Time Entries</h4>
        <div className="space-y-2">
          {timeEntries.map((entry) => (
            <div
              key={entry.id}
              className="flex justify-between items-center bg-white p-2 rounded border"
            >
              <div>
                <p className="text-sm text-gray-600">
                  {format(entry.startTime, 'MMM dd, yyyy HH:mm')} -{' '}
                  {entry.endTime && format(entry.endTime, 'HH:mm')}
                </p>
                {entry.description && (
                  <p className="text-sm text-gray-500">{entry.description}</p>
                )}
              </div>
              <span className="text-sm font-medium">
                {entry.endTime &&
                  `${Math.round(
                    (entry.endTime.getTime() - entry.startTime.getTime()) /
                      (1000 * 60)
                  )} min`}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 text-right">
          <p className="text-sm font-medium">
            Total Time: {Math.round(getTotalTime() / (1000 * 60))} minutes
          </p>
        </div>
      </div>
    </div>
  );
}