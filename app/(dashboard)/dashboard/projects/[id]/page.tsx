'use client';

import { useParams, useRouter } from 'next/navigation';
import useSWR from 'swr';
import { projects } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft } from 'lucide-react';
import { ProjectOverview } from '@/components/project/project-overview';
import { ProjectTasks } from '@/components/project/project-tasks';
import { ProjectBoard } from '@/components/project/project-board';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;

  const { data: project, isLoading } = useSWR(`project-${projectId}`, () => projects.getOne(projectId));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="p-8">
        <p>Project not found</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: project.color || '#3b82f6' }}
          >
            <span className="text-white font-bold">{project.code[0]}</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{project.name}</h1>
            <p className="text-slate-600">{project.code}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="board">Board</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <ProjectOverview project={project} />
        </TabsContent>

        <TabsContent value="board">
          <ProjectBoard project={project} />
        </TabsContent>

        <TabsContent value="tasks">
          <ProjectTasks project={project} />
        </TabsContent>

        <TabsContent value="members">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Members of this project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.members?.map((member: any) => (
                  <div key={member.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">
                        {member.user.firstName} {member.user.lastName}
                      </p>
                      <p className="text-sm text-slate-500">{member.user.email}</p>
                    </div>
                    <span className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full capitalize">
                      {member.role}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
