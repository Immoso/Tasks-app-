import { Task } from '../types';
import { useTaskStore } from '../store/taskStore';
import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <span
          className={clsx(
            'px-2 py-1 rounded-full text-sm',
            statusColors[task.status]
          )}
        >
          {task.status}
        </span>
      </div>
      <p className="text-gray-600 mb-4">{task.description}</p>
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <ClockIcon className="h-4 w-4 mr-1" />
        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Assigned to: {task.assignedTo}
        </span>
        <button
          onClick={() =>
            updateTaskStatus(
              task.id,
              task.status === 'completed' ? 'in-progress' : 'completed'
            )
          }
          className="flex items-center text-sm text-blue-600 hover:text-blue-800"
        >
          <CheckCircleIcon className="h-4 w-4 mr-1" />
          {task.status === 'completed' ? 'Reopen' : 'Complete'}
        </button>
      </div>
    </div>
  );
}