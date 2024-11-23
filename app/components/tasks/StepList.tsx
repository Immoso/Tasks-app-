import { Task, Step } from '../../types';
import { useTaskStore } from '../../store/taskStore';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface StepListProps {
  task: Task;
}

export default function StepList({ task }: StepListProps) {
  const { updateStep, updateProgress } = useTaskStore();

  const handleStepComplete = (stepId: string, isCompleted: boolean) => {
    updateStep(task.id, stepId, { isCompleted });
    updateProgress(task.id);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Steps</h3>
      {task.steps.map((step) => (
        <div
          key={step.id}
          className={clsx(
            'p-4 rounded-lg border',
            step.isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
          )}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-medium">{step.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{step.description}</p>
              {step.dependsOn && step.dependsOn.length > 0 && (
                <div className="mt-2">
                  <span className="text-xs text-gray-500">Depends on:</span>
                  <div className="flex gap-2 mt-1">
                    {step.dependsOn.map((depId) => {
                      const depStep = task.steps.find((s) => s.id === depId);
                      return (
                        depStep && (
                          <span
                            key={depId}
                            className="text-xs bg-gray-100 px-2 py-1 rounded"
                          >
                            {depStep.title}
                          </span>
                        )
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => handleStepComplete(step.id, !step.isCompleted)}
              className={clsx(
                'ml-4 p-2 rounded-full',
                step.isCompleted
                  ? 'text-green-600 hover:text-green-800'
                  : 'text-gray-400 hover:text-gray-600'
              )}
            >
              <CheckCircleIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}