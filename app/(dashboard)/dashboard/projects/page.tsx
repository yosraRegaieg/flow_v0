'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { projects as projectsAPI } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus, Briefcase } from 'lucide-react';
import { CreateProjectDialog } from '@/components/dialogs/create-project-dialog';

export default function ProjectsPage() {
  const [open, setOpen] = useState(false);
  const { data: projectsData, isLoading, mutate } = useSWR('projects-list', () => projectsAPI.getAll());

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Projects</h1>
          <p className="text-slate-600">Manage all your projects in one place</p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      <CreateProjectDialog open={open} onOpenChange={setOpen} onSuccess={() => mutate()} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-3 text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-b-blue-600"></div>
          </div>
        ) : projectsData?.data?.length > 0 ? (
          projectsData.data.map((project: any) => (
            <Link key={project.id} href={`/dashboard/projects/${project.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <CardDescription>{project.code}</CardDescription>
                    </div>
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: project.color || '#3b82f6' }}
                    >
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {project.description && (
                      <p className="text-sm text-slate-600 line-clamp-2">{project.description}</p>
                    )}
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="text-sm">
                        <span className="font-medium">{project.members?.length || 0}</span>
                        <span className="text-slate-500"> members</span>
                      </div>
                      <span className="text-xs px-3 py-1 bg-slate-100 text-slate-700 rounded-full capitalize">
                        {project.template || 'scrum'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <div className="col-span-3">
            <Card className="border-dashed">
              <CardContent className="py-12 text-center">
                <Briefcase className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                <p className="text-slate-600 text-lg mb-4">No projects yet</p>
                <Button onClick={() => setOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create your first project
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
