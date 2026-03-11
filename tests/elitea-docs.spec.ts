import { test, expect } from '@playwright/test';

test.describe('ELITEA - Documentation link', () => {
  test('navigate from homepage to documentation', async ({ page }) => {
    // 1. Navigate to homepage
    await page.goto('https://elitea.ai/');

    // 2. Click on Documentation link (try common selectors)
    const docLink = page.locator('a[href*="/docs"], a[href*="docs"], a:has-text("Docs"), a:has-text("Documentation")').first();
    await docLink.click({ timeout: 10000 });

    // 3. Wait until the URL contains "docs"
    await page.waitForURL(/.*docs.*/,{ timeout: 15000 });
    await expect(page).toHaveURL(/.*docs.*/);
  });
});
