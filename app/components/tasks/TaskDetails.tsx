'use client';

import { useState } from 'react';
import { Task, Comment } from '../../types';
import { useTaskStore } from '../../store/taskStore';
import { format } from 'date-fns';
import { usePermissions } from '../../hooks/usePermissions';
import { useSession } from 'next-auth/react';
import StepList from './StepList';
import CommentSection from './CommentSection';
import SOPViewer from '../sop/SOPViewer';
import TimeLog from './TimeLog';
import PrintableChecklist from './PrintableChecklist';

interface TaskDetailsProps {
  task: Task;
}

export default function TaskDetails({ task }: TaskDetailsProps) {
  const { data: session } = useSession();
  const { canProvideFeedback } = usePermissions();
  const { updateTask, addComment } = useTaskStore();
  const [feedback, setFeedback] = useState(task.feedback || '');

  const handleStatusChange = (status: Task['status']) => {
    updateTask(task.id, { status });
  };

  const handleCommentSubmit = (content: string, attachments: File[]) => {
    if (!session?.user?.id) return;

    const comment: Comment = {
      id: crypto.randomUUID(),
      content,
      userId: session.user.id,
      createdAt: new Date(),
      attachments: [], // Handle file uploads
    };
    addComment(task.id, comment);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{task.title}</h2>
        <p className="text-gray-600">{task.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Progress</h3>
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${task.progress}%` }}
              />
            </div>
            <span className="text-sm text-gray-500">
              Progress: {task.progress}%
            </span>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={task.status}
              onChange={(e) => handleStatusChange(e.target.value as Task['status'])}
              className="w-full rounded-md border-gray-300"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="review">Under Review</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <StepList task={task} />
          
          {session?.user?.id && (
            <TimeLog taskId={task.id} userId={session.user.id} />
          )}

          <div className="mt-6">
            <PrintableChecklist task={task} />
          </div>
        </div>

        <div>
          {task.sop && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">SOP Guide</h3>
              <SOPViewer sop={task.sop} />
            </div>
          )}

          {canProvideFeedback && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Feedback</h3>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                onBlur={() => updateTask(task.id, { feedback })}
                className="w-full p-2 border rounded-md"
                placeholder="Provide feedback..."
                rows={4}
              />
            </div>
          )}

          <CommentSection
            comments={task.comments}
            onCommentSubmit={handleCommentSubmit}
          />
        </div>
      </div>
    </div>
  );
}