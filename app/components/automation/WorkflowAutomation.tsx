import { useState } from 'react';
import { useTaskStore } from '../../store/taskStore';
import { Task, User } from '../../types';

interface AutomationRule {
  id: string;
  condition: {
    type: 'status' | 'dueDate' | 'priority';
    value: string;
  };
  action: {
    type: 'assign' | 'notify' | 'updateStatus';
    value: string;
  };
}

export default function WorkflowAutomation() {
  const [rules, setRules] = useState<AutomationRule[]>([]);
  const tasks = useTaskStore((state) => state.tasks);

  const addRule = (rule: AutomationRule) => {
    setRules([...rules, rule]);
  };

  const executeRules = (task: Task) => {
    rules.forEach(rule => {
      switch (rule.condition.type) {
        case 'status':
          if (task.status === rule.condition.value) {
            applyAction(task, rule.action);
          }
          break;
        case 'dueDate':
          const daysUntilDue = Math.floor(
            (new Date(task.dueDate).getTime() - new Date().getTime()) / 
            (1000 * 60 * 60 * 24)
          );
          if (daysUntilDue <= parseInt(rule.condition.value)) {
            applyAction(task, rule.action);
          }
          break;
        case 'priority':
          if (task.priority === rule.condition.value) {
            applyAction(task, rule.action);
          }
          break;
      }
    });
  };

  const applyAction = (task: Task, action: AutomationRule['action']) => {
    switch (action.type) {
      case 'assign':
        // Assign task to user
        break;
      case 'notify':
        // Send notification
        break;
      case 'updateStatus':
        // Update task status
        break;
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Workflow Automation</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Create New Rule</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              When
            </label>
            <select className="mt-1 block w-full rounded-md border-gray-300">
              <option value="status">Task Status Changes</option>
              <option value="dueDate">Due Date Approaches</option>
              <option value="priority">Priority is Set</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Then
            </label>
            <select className="mt-1 block w-full rounded-md border-gray-300">
              <option value="assign">Assign to Team Member</option>
              <option value="notify">Send Notification</option>
              <option value="updateStatus">Update Status</option>
            </select>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Create Rule
          </button>
        </form>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Active Rules</h3>
        <div className="space-y-4">
          {rules.map(rule => (
            <div
              key={rule.id}
              className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <p className="font-medium">
                  When {rule.condition.type} is {rule.condition.value}
                </p>
                <p className="text-sm text-gray-600">
                  Then {rule.action.type} {rule.action.value}
                </p>
              </div>
              <button
                onClick={() => setRules(rules.filter(r => r.id !== rule.id))}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}