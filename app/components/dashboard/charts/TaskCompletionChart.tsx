import { ResponsiveLine } from '@nivo/line';
import { useTaskStore } from '../../../store/taskStore';
import { subDays, format } from 'date-fns';

interface TaskCompletionChartProps {
  dateRange: string;
}

export default function TaskCompletionChart({ dateRange }: TaskCompletionChartProps) {
  const tasks = useTaskStore((state) => state.tasks);

  const getDaysInRange = () => {
    switch (dateRange) {
      case 'week':
        return 7;
      case 'month':
        return 30;
      case 'quarter':
        return 90;
      case 'year':
        return 365;
      default:
        return 7;
    }
  };

  const generateChartData = () => {
    const days = getDaysInRange();
    const data = [];

    for (let i = days; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const completedTasks = tasks.filter(
        task => 
          task.status === 'completed' && 
          new Date(task.createdAt).toDateString() === date.toDateString()
      ).length;

      data.push({
        x: format(date, 'MMM dd'),
        y: completedTasks,
      });
    }

    return [
      {
        id: 'completed tasks',
        data,
      },
    ];
  };

  return (
    <div style={{ height: '400px' }}>
      <ResponsiveLine
        data={generateChartData()}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        enablePointLabel={true}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            symbolSize: 12,
            symbolShape: 'circle',
          },
        ]}
      />
    </div>
  );
}