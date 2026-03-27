'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckSquare } from 'lucide-react';

export default function TasksPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">My Tasks</h1>
        <p className="text-slate-600">View and manage all your assigned tasks</p>
      </div>

      <Card className="border-dashed">
        <CardContent className="py-12 text-center">
          <CheckSquare className="w-16 h-16 mx-auto text-slate-300 mb-4" />
          <p className="text-slate-600 text-lg">No tasks assigned yet</p>
          <p className="text-slate-500 text-sm mt-2">Tasks from projects will appear here</p>
        </CardContent>
      </Card>
    </div>
  );
}
