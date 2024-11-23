import { useState } from 'react';
import { useTaskStore } from '../../store/taskStore';
import TaskCompletionChart from './charts/TaskCompletionChart';
import TimeTrackingChart from './charts/TimeTrackingChart';
import TeamPerformanceChart from './charts/TeamPerformanceChart';
import KPIMetrics from './metrics/KPIMetrics';
import { GridLayout } from 'react-grid-layout';

export default function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState('week');
  const tasks = useTaskStore((state) => state.tasks);

  const calculateMetrics = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    const overdueTasks = tasks.filter(task => {
      return new Date(task.dueDate) < new Date() && task.status !== 'completed';
    }).length;

    return {
      completionRate: (completedTasks / totalTasks) * 100,
      overdueRate: (overdueTasks / totalTasks) * 100,
      averageCompletion: tasks.reduce((acc, task) => acc + task.progress, 0) / totalTasks,
    };
  };

  const metrics = calculateMetrics();

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="rounded-md border-gray-300"
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="quarter">Last Quarter</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <KPIMetrics
          title="Task Completion Rate"
          value={`${metrics.completionRate.toFixed(1)}%`}
          trend={metrics.completionRate > 75 ? 'up' : 'down'}
        />
        <KPIMetrics
          title="Overdue Tasks"
          value={`${metrics.overdueRate.toFixed(1)}%`}
          trend={metrics.overdueRate < 10 ? 'up' : 'down'}
        />
        <KPIMetrics
          title="Average Progress"
          value={`${metrics.averageCompletion.toFixed(1)}%`}
          trend={metrics.averageCompletion > 60 ? 'up' : 'down'}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Task Completion Trends</h3>
          <TaskCompletionChart dateRange={dateRange} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Time Tracking Analysis</h3>
          <TimeTrackingChart dateRange={dateRange} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Team Performance</h3>
          <TeamPerformanceChart dateRange={dateRange} />
        </div>
      </div>
    </div>
  );
}