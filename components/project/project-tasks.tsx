'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { tasks as tasksAPI } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, CheckSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProjectTasksProps {
  project: any;
}

const priorityColors = {
  low: 'bg-blue-100 text-blue-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-orange-100 text-orange-700',
  urgent: 'bg-red-100 text-red-700',
};

const statusColors = {
  todo: 'bg-slate-100 text-slate-700',
  in_progress: 'bg-blue-100 text-blue-700',
  in_review: 'bg-purple-100 text-purple-700',
  done: 'bg-green-100 text-green-700',
};

export function ProjectTasks({ project }: ProjectTasksProps) {
  const { data: tasksData, isLoading } = useSWR(`project-tasks-${project.id}`, () =>
    tasksAPI.getByProject(project.id)
  );

  const tasks = tasksData?.data || [];

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Tasks</CardTitle>
            <CardDescription>Manage all project tasks</CardDescription>
          </div>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-b-blue-600"></div>
          </div>
        ) : tasks.length > 0 ? (
          <div className="space-y-3">
            {tasks.map((task: any) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <CheckSquare className="w-5 h-5 text-slate-400" />
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{task.title}</p>
                    <p className="text-xs text-slate-500">ID: {task.id.substring(0, 8)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded capitalize ${statusColors[task.status as keyof typeof statusColors]}`}>
                    {task.status.replace('_', ' ')}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded capitalize ${priorityColors[task.priority as keyof typeof priorityColors]}`}
                  >
                    {task.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <CheckSquare className="w-12 h-12 mx-auto text-slate-300 mb-4" />
            <p className="text-slate-600">No tasks yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
