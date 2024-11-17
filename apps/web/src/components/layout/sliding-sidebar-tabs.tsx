import { Tabs, TabsContent, TabsList, TabsTrigger } from '@buildit/ui/tabs'

interface TabData {
  label: string
  content: React.ReactNode
}

interface SlidingSidebarTabsProps {
  tabsData: TabData[]
}

/**
 * The sliding sidebar tabs component. This component is used to display tabs with it's contents in a sliding sidebar.
 * @param props The component props.
 * @param props.tabsData The data for the tabs.
 * @returns The sliding sidebar tabs component.
 */
export default function SlidingSidebarTabs({
  tabsData,
}: SlidingSidebarTabsProps): JSX.Element {
  return (
    <Tabs defaultValue={tabsData[0]?.label?.toLowerCase() ?? ''}>
      <TabsList className='p-0.5 w-full gap-2.5'>
        {tabsData.map((tab) => (
          <TabsTrigger
            key={tab.label}
            value={tab.label.toLowerCase()}
            className='w-full'
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabsData.map((tab) => (
        <TabsContent
          key={tab.label}
          value={tab.label.toLowerCase()}
          className='text-center'
        >
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}
