'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Reports</h1>
        <p className="text-slate-600">Analyze project metrics and progress</p>
      </div>

      <Card className="border-dashed">
        <CardContent className="py-12 text-center">
          <BarChart3 className="w-16 h-16 mx-auto text-slate-300 mb-4" />
          <p className="text-slate-600 text-lg">Reports coming soon</p>
          <p className="text-slate-500 text-sm mt-2">Advanced analytics and reporting features will be available soon</p>
        </CardContent>
      </Card>
    </div>
  );
}
