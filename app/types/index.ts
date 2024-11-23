export type Role = 'admin' | 'manager' | 'member' | 'stakeholder';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  teams: string[];
}

export interface TimeEntry {
  id: string;
  taskId: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  description?: string;
}

export interface Step {
  id: string;
  title: string;
  description: string;
  timeEstimate: number;
  role: Role;
  attachments: Attachment[];
  isCompleted: boolean;
  assignedTo?: string;
  dependsOn?: string[];
  subTasks?: Task[];
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: 'document' | 'video' | 'link';
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  createdAt: Date;
  attachments: Attachment[];
}

export interface SOP {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  attachments: Attachment[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  version: string;
}

export interface Template {
  id: string;
  title: string;
  description: string;
  version: string;
  steps: Step[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  category: string;
  dependencies: string[];
  sop?: SOP;
  isPublic?: boolean;
  rating?: number;
  downloads?: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  templateId?: string;
  assignedTo: string;
  status: 'pending' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
  createdAt: Date;
  progress: number;
  feedback?: string;
  steps: Step[];
  comments: Comment[];
  sop?: SOP;
  dependencies: string[];
  watchers: string[];
  timeEntries: TimeEntry[];
}