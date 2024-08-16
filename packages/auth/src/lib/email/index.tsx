import 'server-only'

import React from 'react'

import type { ComponentProps } from 'react'
import type { ResetPasswordTemplate } from './templates/reset-password'

import { render } from '@react-email/render'
import { Resend } from 'resend'

import { env } from '@buildit/env/web/server'

import { EmailVerificationTemplate } from './templates/email-verification'

export enum EmailTemplate {
  EmailVerification = 'EmailVerification',
  PasswordReset = 'PasswordReset',
}

export interface PropsMap {
  [EmailTemplate.EmailVerification]: ComponentProps<
    typeof EmailVerificationTemplate
  >
  [EmailTemplate.PasswordReset]: ComponentProps<typeof ResetPasswordTemplate>
}

export const resend = new Resend(env.RESEND_API_KEY)

const getEmailTemplate = <T extends EmailTemplate>(
  template: T,
  props: PropsMap[NoInfer<T>],
) => {
  switch (template) {
    case EmailTemplate.EmailVerification:
      return {
        subject: 'Verify your email address',
        body: render(
          <EmailVerificationTemplate
            {...(props as PropsMap[EmailTemplate.EmailVerification])}
          />,
        ),
      }
    default:
      throw new Error('Invalid email template')
  }
}

export const sendEmail = async <T extends EmailTemplate>(
  to: string,
  template: T,
  props: PropsMap[NoInfer<T>],
) => {
  const { subject, body } = getEmailTemplate(template, props)

  await resend.emails.send({
    from: 'onboarding@resend.dev', // TODO: Update this to the correct email address
    to,
    subject,
    html: body,
  })
}
