'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export default function DocumentsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Documents</h1>
        <p className="text-slate-600">Manage project files and documents</p>
      </div>

      <Card className="border-dashed">
        <CardContent className="py-12 text-center">
          <FileText className="w-16 h-16 mx-auto text-slate-300 mb-4" />
          <p className="text-slate-600 text-lg">No documents yet</p>
          <p className="text-slate-500 text-sm mt-2">Upload files to your projects to get started</p>
        </CardContent>
      </Card>
    </div>
  );
}
