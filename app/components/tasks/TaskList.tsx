'use client';

import { useEffect, useState } from 'react';
import { Task } from '../../types';
import { usePermissions } from '../../hooks/usePermissions';
import TaskCard from './TaskCard';

export default function TaskList() {
  const { role } = usePermissions();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'assigned' | 'completed'>('all');

  useEffect(() => {
    // Fetch tasks based on user role and filter
    // This would typically come from your API
    const fetchTasks = async () => {
      // Simulated task data
      const mockTasks: Task[] = [];
      setTasks(mockTasks);
    };

    fetchTasks();
  }, [role, filter]);

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as typeof filter)}
          className="rounded-md border-gray-300"
        >
          <option value="all">All Tasks</option>
          <option value="assigned">Assigned to Me</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        {tasks.length === 0 && (
          <p className="text-center text-gray-500">No tasks found</p>
        )}
      </div>
    </div>
  );
}