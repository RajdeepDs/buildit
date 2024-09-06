import { cardConfig } from '@/config/features'

import Globe from './magicui/globe'
import {
  CardContainer,
  CardContent,
  CardDescription,
  CardFeature,
  CardFeatureContainer,
  CardHeader,
  CardIcon,
  CardTitle,
} from './ui/card'

/**
 * The Realtime component
 * @returns JSX.Element
 */
export default function Realtime() {
  const { icon, title, description, features } = cardConfig.realtime
  return (
    <CardContainer>
      <CardHeader>
        <CardIcon icon={icon} />
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Globe />
        <CardFeatureContainer>
          {features.map((feature) => (
            <CardFeature key={feature.catchline} {...feature} />
          ))}
        </CardFeatureContainer>
      </CardContent>
    </CardContainer>
  )
}
