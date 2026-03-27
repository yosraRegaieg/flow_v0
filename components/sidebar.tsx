'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Briefcase, CheckSquare, LayoutGrid, FileText, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
  { name: 'Projects', href: '/dashboard/projects', icon: Briefcase },
  { name: 'Tasks', href: '/dashboard/tasks', icon: CheckSquare },
  { name: 'Documents', href: '/dashboard/documents', icon: FileText },
  { name: 'Reports', href: '/dashboard/reports', icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-white shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold">ProjectFlow</h1>
      </div>

      <nav className="mt-8 space-y-2 px-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              )}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
