import { useState } from 'react';
import { useTaskStore } from '../store/taskStore';

export default function SOPForm() {
  const addSOP = useTaskStore((state) => state.addSOP);
  const [steps, setSteps] = useState<string[]>(['']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    addSOP({
      id: crypto.randomUUID(),
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      steps: steps.filter(Boolean),
      createdBy: 'current-user',
      createdAt: new Date(),
    });

    form.reset();
    setSteps(['']);
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
        <label className="block text-sm font-medium text-gray-700">Steps</label>
        {steps.map((step, index) => (
          <div key={index} className="flex gap-2 mt-2">
            <input
              type="text"
              value={step}
              onChange={(e) => {
                const newSteps = [...steps];
                newSteps[index] = e.target.value;
                setSteps(newSteps);
              }}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => {
                const newSteps = steps.filter((_, i) => i !== index);
                setSteps(newSteps.length ? newSteps : ['']);
              }}
              className="px-3 py-2 text-sm text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setSteps([...steps, ''])}
          className="mt-2 text-sm text-blue-600 hover:text-blue-800"
        >
          Add Step
        </button>
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Create SOP Template
      </button>
    </form>
  );
}