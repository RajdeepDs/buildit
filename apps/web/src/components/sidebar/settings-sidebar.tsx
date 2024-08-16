import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type { TTeam, TUser } from '@buildit/utils/types'
import type { TSettingsSidebar } from '@buildit/utils/types/configs'

import { Icons } from '@/components/ui/icons'
import VerticalTabs from '@/components/ui/vertical-tabs'
import {
  getSettingsSidebar,
  getSettingsTeamsNavigations,
} from '@/configs/settings-sidebar-navigations'

/**
 * The settings sidebar component. This is where we will have the sidebar of the settings pages.
 * @param props The props object.
 * @param props.user The user.
 * @param props.teams The teams.
 * @returns The settings sidebar component.
 */
export default function SettingsSidebar({
  user,
  teams,
}: {
  teams: TTeam[]
  user: TUser
}): JSX.Element {
  const pathname = usePathname()

  const settingsSidebar: TSettingsSidebar = getSettingsSidebar()

  const settingsTeamSidebar = getSettingsTeamsNavigations(teams)

  return (
    <div className='flex flex-col'>
      <Link
        href={`/my-issues`}
        className='my-6 flex cursor-pointer items-center gap-2 px-4'
      >
        <Icons.back className='h-4 w-4 text-default' />
        <span className='font-medium text-default'>Back</span>
      </Link>
      <div className='space-y-4 px-2'>
        {settingsSidebar.map((section, index) => {
          const TabIcon = Icons[section.icon as keyof typeof Icons]
          return (
            <div key={index} className='space-y-1'>
              {section.title === 'User' ? (
                <div className='flex items-center gap-2 px-2'>
                  {user.image && (
                    <>
                      <Image
                        src={user.image}
                        alt={user.name ?? 'User'}
                        width={16}
                        height={16}
                        className='rounded-full'
                      />
                      <span className='font-medium text-sm text-subtle'>
                        {user.name}
                      </span>
                    </>
                  )}
                </div>
              ) : (
                <div className='flex items-center gap-2 px-2'>
                  <TabIcon className='h-4 w-4 text-subtle' />
                  <span className='font-medium text-sm text-subtle'>
                    {section.title}
                  </span>
                </div>
              )}
              <ul className='flex flex-col gap-[1px] pr-4 pl-8'>
                {section.items.map((item, index) => {
                  return (
                    <li key={index}>
                      {item.href ? (
                        <Link key={index} href={item.href}>
                          <VerticalTabs
                            name={item.title}
                            href={item.href}
                            pathname={pathname}
                            icon={item.icon ?? ''}
                          />
                        </Link>
                      ) : (
                        <VerticalTabs
                          name={item.title}
                          pathname={pathname}
                          icon={item.icon ?? ''}
                        />
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
      <div className='my-4 px-2'>
        {settingsTeamSidebar.map((section, index) => {
          const TabIcon = Icons[section.icon as keyof typeof Icons]
          return (
            <div key={index} className='space-y-1'>
              <div className='mb-2 flex items-center gap-2 px-2'>
                <TabIcon className='h-4 w-4 text-subtle' />
                <span className='font-medium text-sm text-subtle'>
                  {section.title}
                </span>
              </div>
              <ul className='flex flex-col gap-[1px] pr-4 pl-8'>
                {section.items.map((item, index) => {
                  const ItemIcon = Icons[item.icon as keyof typeof Icons]
                  return (
                    <li key={index}>
                      {!item.button && (
                        <div className='mt-2'>
                          <div className='mb-1 flex items-center'>
                            <ItemIcon className='mr-2 h-4 w-4 text-subtle' />
                            <span className='font-medium text-sm'>
                              {item.title}
                            </span>
                          </div>

                          <ul className='flex flex-col gap-[1px] pl-4'>
                            {item.subItems.map((subItem, subItemIndex) => (
                              <Link key={subItemIndex} href={subItem.href}>
                                <VerticalTabs
                                  name={subItem.title}
                                  href={subItem.href}
                                  pathname={pathname}
                                />
                              </Link>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
