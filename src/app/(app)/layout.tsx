import AppHeader from '@/components/app-header';
import AppSidebar from '@/components/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { SettingsProvider } from '@/contexts/settings-context';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SettingsProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-col h-screen">
            <AppHeader />
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </SettingsProvider>
  );
}
