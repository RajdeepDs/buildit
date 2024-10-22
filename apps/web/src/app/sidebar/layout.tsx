import { SidebarProvider } from '@buildit/ui/sidebar'

import { AppSidebar } from '@/components/app-sidebar'

/**
 *
 * @param root0
 * @param root0.children
 */
export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      {children}
    </SidebarProvider>
  )
}
