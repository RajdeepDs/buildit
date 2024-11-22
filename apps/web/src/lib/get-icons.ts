import { Icons } from '@/components/ui/icons'

/**
 * This file is used to get the icon component based on the icon name.
 * @param iconName The name of the icon.
 * @returns The icon component.
 */
export function getIcon(
  iconName: string | undefined,
): React.ElementType | null {
  return iconName ? Icons[iconName as keyof typeof Icons] : null
}
