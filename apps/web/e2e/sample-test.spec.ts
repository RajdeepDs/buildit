import { expect, test } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('/login')

  await expect(page).toHaveTitle('Log in')
})
