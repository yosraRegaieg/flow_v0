'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ProjectOverviewProps {
  project: any;
}

export function ProjectOverview({ project }: ProjectOverviewProps) {
  return (
    <div className="space-y-6 mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-600">Status</p>
              <p className="font-semibold text-slate-900 capitalize">{project.status}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Template</p>
              <p className="font-semibold text-slate-900 capitalize">{project.template}</p>
            </div>
            {project.startDate && (
              <div>
                <p className="text-sm text-slate-600">Start Date</p>
                <p className="font-semibold text-slate-900">{new Date(project.startDate).toLocaleDateString()}</p>
              </div>
            )}
            {project.endDate && (
              <div>
                <p className="text-sm text-slate-600">End Date</p>
                <p className="font-semibold text-slate-900">{new Date(project.endDate).toLocaleDateString()}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {project.description && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700">{project.description}</p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.members?.length || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.tasks?.length || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Active Sprints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.sprints?.length || 0}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
