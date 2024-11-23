'use client';

import { useSession } from 'next-auth/react';
import TaskList from './components/tasks/TaskList';
import TemplateForm from './components/templates/TemplateForm';
import { usePermissions } from './hooks/usePermissions';

export default function Home() {
  const { data: session, status } = useSession();
  const { canCreateTemplate } = usePermissions();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome to Project Manager</h1>
          <p className="text-gray-600">Please sign in to continue</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {canCreateTemplate && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Create Template</h2>
              <TemplateForm />
            </div>
          )}
          <div>
            <TaskList />
          </div>
        </div>
      </div>
    </main>
  );
}