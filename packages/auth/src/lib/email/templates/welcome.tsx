import React from 'react'

import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

export interface WelcomeTemplateProps {
  name: string
}

interface WelcomeEmailProps {
  name?: string
  steps?: {
    id: number
    Description: React.ReactNode
  }[]
}

const PropDefaults: WelcomeEmailProps = {
  steps: [
    {
      id: 1,
      Description: (
        <li className='mb-10' key={1}>
          <strong>Get Started with Your First Project</strong>. Create issues,
          assign priorities, and track progress—all in one streamlined
          dashboard. BuildIt helps your team stay aligned and productive.
        </li>
      ),
    },
    {
      id: 2,
      Description: (
        <li className='mb-10' key={2}>
          <strong>Stay Focused and Organized</strong>. Simplify your workflow
          with powerful filters, smart search, and easy navigation. BuildIt
          ensures you spend less time managing and more time building.
        </li>
      ),
    },
  ],
}

export const WelcomeTemplate = ({
  name,
  steps = PropDefaults.steps,
}: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Build better, Together with BuildIt!</Preview>
      <Tailwind>
        <Body className='bg-white my-auto mx-auto font-sans px-2'>
          <Container className='border border-[#CACFD8] border-solid rounded my-[40px] mx-auto p-[20px] max-w-[465px]'>
            <Heading className='text-center my-0 leading-8'>
              Welcome to BuildIt
            </Heading>
            <Section>
              <Text className='text-[#0E121B] font-semibold text-base text-center'>
                We're thrilled to have you on board, {name}!
              </Text>
              <Text className='text-[#0E121B] leading-[24px]'>
                Hi <span className='font-medium'>{name}</span>,
              </Text>
              <Text className='text-[#4b4d52] text-sm'>
                Congratulations on completing your onboarding! 🎉
              </Text>
              <Text className='text-[#525866] text-sm'>
                We're excited to welcome you to BuildIt, where teams like yours
                can collaborate better, track progress seamlessly, and achieve
                goals faster.
              </Text>
            </Section>
            <Section>
              <Row>
                <Text className='text-sm'>Here's how to get started:</Text>
              </Row>
              <ul>{steps?.map(({ Description }) => Description)}</ul>
            </Section>
            <Section className='text-center mb-10'>
              <Button
                className='bg-[#0E121B] text-white rounded-lg py-3 px-[18px]'
                href='https://app.buildit.codes/'
              >
                Go to your dashboard
              </Button>
            </Section>
            <Section>
              <Row>
                <Column>
                  <Link
                    className='text-[#525866] font-bold mr-4 text-lg'
                    href='https://buildit.codes/'
                  >
                    BuildIt
                  </Link>{' '}
                  <Link
                    className='text-[#525866] underline font-bold mr-4'
                    href='https://github.com/RajdeepDs/buildit'
                  >
                    GitHub
                  </Link>{' '}
                  <Link
                    className='text-[#525866] underline font-bold'
                    href='https://x.com/Rajdeep__ds'
                  >
                    Twitter
                  </Link>{' '}
                </Column>
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
