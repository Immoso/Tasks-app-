'use client';

import { useSession } from 'next-auth/react';
import { Role } from '../types';

interface Permissions {
  canCreateTemplate: boolean;
  canEditTemplate: boolean;
  canAssignTasks: boolean;
  canViewReports: boolean;
  canManageUsers: boolean;
  canProvideFeedback: boolean;
}

const rolePermissions: Record<Role, Permissions> = {
  admin: {
    canCreateTemplate: true,
    canEditTemplate: true,
    canAssignTasks: true,
    canViewReports: true,
    canManageUsers: true,
    canProvideFeedback: true,
  },
  manager: {
    canCreateTemplate: true,
    canEditTemplate: true,
    canAssignTasks: true,
    canViewReports: true,
    canManageUsers: false,
    canProvideFeedback: true,
  },
  member: {
    canCreateTemplate: false,
    canEditTemplate: false,
    canAssignTasks: false,
    canViewReports: false,
    canManageUsers: false,
    canProvideFeedback: true,
  },
  stakeholder: {
    canCreateTemplate: false,
    canEditTemplate: false,
    canAssignTasks: false,
    canViewReports: true,
    canManageUsers: false,
    canProvideFeedback: true,
  },
};

export function usePermissions() {
  const { data: session } = useSession();
  const userRole = (session?.user?.role as Role) || 'member';

  return {
    ...rolePermissions[userRole],
    role: userRole,
  };
}