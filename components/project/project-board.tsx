'use client';

import useSWR from 'swr';
import { tasks as tasksAPI } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckSquare } from 'lucide-react';

interface ProjectBoardProps {
  project: any;
}

const statusLabels = {
  todo: 'To Do',
  in_progress: 'In Progress',
  in_review: 'In Review',
  done: 'Done',
};

export function ProjectBoard({ project }: ProjectBoardProps) {
  const { data: tasksData, isLoading } = useSWR(`project-board-${project.id}`, () =>
    tasksAPI.getByProject(project.id)
  );

  const tasks = tasksData?.data || [];

  const columns = {
    todo: tasks.filter((t: any) => t.status === 'todo'),
    in_progress: tasks.filter((t: any) => t.status === 'in_progress'),
    in_review: tasks.filter((t: any) => t.status === 'in_review'),
    done: tasks.filter((t: any) => t.status === 'done'),
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-b-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Object.entries(columns).map(([status, statusTasks]: [string, any]) => (
        <div key={status} className="bg-slate-100 rounded-lg p-4">
          <div className="mb-4">
            <h3 className="font-semibold text-slate-900 text-sm">
              {statusLabels[status as keyof typeof statusLabels]}
            </h3>
            <p className="text-xs text-slate-500">{statusTasks.length} tasks</p>
          </div>

          <div className="space-y-3">
            {statusTasks.length > 0 ? (
              statusTasks.map((task: any) => (
                <Card key={task.id} className="cursor-move hover:shadow-md transition-shadow">
                  <CardContent className="p-3">
                    <div className="flex gap-2 items-start">
                      <CheckSquare className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 line-clamp-2">{task.title}</p>
                        <div className="flex gap-1 mt-2">
                          <span className="text-xs px-2 py-0.5 bg-slate-200 text-slate-700 rounded capitalize">
                            {task.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-slate-500 text-sm">No tasks</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
