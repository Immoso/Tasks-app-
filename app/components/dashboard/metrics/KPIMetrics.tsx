import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

interface KPIMetricsProps {
  title: string;
  value: string;
  trend: 'up' | 'down';
}

export default function KPIMetrics({ title, value, trend }: KPIMetricsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold">{value}</span>
        <div
          className={clsx(
            'flex items-center',
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          )}
        >
          {trend === 'up' ? (
            <ArrowUpIcon className="h-5 w-5" />
          ) : (
            <ArrowDownIcon className="h-5 w-5" />
          )}
        </div>
      </div>
    </div>
  );
}