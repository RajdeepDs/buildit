import React from 'react'

import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

export interface EmailVerificationTemplateProps {
  code: string
  name: string
}

export const EmailVerificationTemplate = ({
  code,
  name,
}: EmailVerificationTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>
        Please verify your email address by entering the following code: {code}
      </Preview>
      <Tailwind>
        <Body className='bg-white my-auto mx-auto font-sans px-2'>
          <Container className='border border-[#CACFD8] border-solid rounded my-[40px] mx-auto p-[20px] max-w-[465px]'>
            <Section>
              <Text className='text-[#0E121B] font-semibold text-lg'>
                Welcome to BuildIt!
              </Text>
              <Text className='text-[#0E121B] leading-[24px]'>
                Hello <span className='font-medium'>{name}</span>,
              </Text>
              <Text className='text-[#4b4d52] text-sm'>
                Thank you for signing up for{' '}
                <span className='text-[#0E121B] font-medium'>BuildIt!</span> To
                start building and collaborating with the team. Please verify
                your email address by entering the following code:
              </Text>
              <Text className='bg-[#F5F7FA] text-[#525866] border border-[#CACFD8] border-solid px-4 py-3 rounded tabular-nums text-center'>
                {code}
              </Text>
              <Text className='text-[#525866] text-sm'>
                Thank you for choosing BuildIt. We're excited to have you on
                board!
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
