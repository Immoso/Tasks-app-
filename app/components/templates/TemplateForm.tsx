'use client';

import { useState } from 'react';
import { Step, Template } from '../../types';
import { usePermissions } from '../../hooks/usePermissions';

export default function TemplateForm() {
  const { canCreateTemplate } = usePermissions();
  const [steps, setSteps] = useState<Partial<Step>[]>([]);
  const [version, setVersion] = useState('1.0.0');

  if (!canCreateTemplate) {
    return (
      <div className="text-center p-4 bg-gray-50 rounded-lg">
        You don't have permission to create templates.
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const template: Partial<Template> = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      version,
      steps: steps as Step[],
      category: formData.get('category') as string,
      dependencies: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Handle template creation
    console.log('Creating template:', template);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <input
          type="text"
          name="category"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Version</label>
        <input
          type="text"
          value={version}
          onChange={(e) => setVersion(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Steps</label>
        {steps.map((step, index) => (
          <div key={index} className="mt-4 p-4 border rounded-lg">
            <input
              type="text"
              value={step.title || ''}
              onChange={(e) => {
                const newSteps = [...steps];
                newSteps[index] = { ...step, title: e.target.value };
                setSteps(newSteps);
              }}
              placeholder="Step Title"
              className="block w-full mb-2"
            />
            <textarea
              value={step.description || ''}
              onChange={(e) => {
                const newSteps = [...steps];
                newSteps[index] = { ...step, description: e.target.value };
                setSteps(newSteps);
              }}
              placeholder="Step Description"
              className="block w-full mb-2"
            />
            <button
              type="button"
              onClick={() => {
                setSteps(steps.filter((_, i) => i !== index));
              }}
              className="text-red-600 hover:text-red-800"
            >
              Remove Step
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setSteps([...steps, {}])}
          className="mt-2 text-blue-600 hover:text-blue-800"
        >
          Add Step
        </button>
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
      >
        Create Template
      </button>
    </form>
  );
}