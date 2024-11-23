'use client';

import { create } from 'zustand';
import { Task, Comment, Step } from '../types';

interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  updateStep: (taskId: string, stepId: string, updates: Partial<Step>) => void;
  addComment: (taskId: string, comment: Comment) => void;
  assignTask: (taskId: string, userId: string) => void;
  updateProgress: (taskId: string) => void;
  updateTaskStatus: (taskId: string, status: Task['status']) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [
    // Sample task for development
    {
      id: '1',
      title: 'Sample Task',
      description: 'This is a sample task for development purposes.',
      templateId: '1',
      assignedTo: 'member',
      status: 'in-progress',
      priority: 'medium',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      createdAt: new Date(),
      progress: 0,
      steps: [],
      comments: [],
      watchers: [],
      dependencies: [],
    },
  ],
  
  addTask: (task) => 
    set((state) => ({ tasks: [...state.tasks, task] })),
  
  updateTask: (taskId, updates) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updates } : task
      ),
    })),
  
  updateStep: (taskId, stepId, updates) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              steps: task.steps.map((step) =>
                step.id === stepId ? { ...step, ...updates } : step
              ),
            }
          : task
      ),
    })),
  
  addComment: (taskId, comment) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? { ...task, comments: [...task.comments, comment] }
          : task
      ),
    })),
  
  assignTask: (taskId, userId) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, assignedTo: userId } : task
      ),
    })),
  
  updateProgress: (taskId) =>
    set((state) => ({
      tasks: state.tasks.map((task) => {
        if (task.id === taskId) {
          const completedSteps = task.steps.filter((step) => step.isCompleted).length;
          const progress = (completedSteps / task.steps.length) * 100;
          return { ...task, progress };
        }
        return task;
      }),
    })),

  updateTaskStatus: (taskId, status) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, status } : task
      ),
    })),
}));