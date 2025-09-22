'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
} from '@/components/ui/sidebar';
import {
  Bot,
  FileQuestion,
  FileText,
  History,
  LayoutGrid,
  Settings,
  BookOpenCheck,
  Crown,
  Rocket
} from 'lucide-react';

const menuItems = [
  { href: '/chat', label: 'Chat', icon: Bot },
  { href: '/quiz', label: 'Quiz Generator', icon: FileQuestion },
  { href: '/summarize', label: 'Summaries', icon: FileText },
  { href: '/diagram', label: 'Diagrams', icon: LayoutGrid },
  { href: '/study-plan', label: 'Study Plan', icon: BookOpenCheck },
  { href: '/history', label: 'History', icon: History },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="hidden md:flex items-center gap-2">
        <Link href="/" className='flex items-center gap-2'>
          <Rocket className="w-6 h-6 text-primary" />
          <h1 className="text-lg font-semibold font-headline text-primary">StudyWise AI</h1>
        </Link>
      </SidebarHeader>
      <SidebarMenu className="flex-1">
        {menuItems.map(({ href, label, icon: Icon }) => (
          <SidebarMenuItem key={href}>
            <Link href={href}>
              <SidebarMenuButton
                isActive={pathname.startsWith(href)}
                tooltip={{ children: label }}
              >
                <Icon />
                <span>{label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarMenuItem>
            <Link href="#">
              <SidebarMenuButton>
                <Crown />
                <span>Upgrade to Pro</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/settings">
              <SidebarMenuButton isActive={pathname === '/settings'}>
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
