import { test, expect } from '@playwright/test';

test.describe('ELITEA site navigation', () => {
  test('go to docs from homepage', async ({ page }) => {
    // Navigate to homepage
    await page.goto('https://elitea.ai/');

    // Try to find Documentation link by role (accessible name) and click it.
    const docsLink = page.getByRole('link', { name: /Documentation|Docs/i });

    if (await docsLink.count() > 0) {
      await Promise.all([
        page.waitForURL(/.*docs.*/, { timeout: 15000 }),
        docsLink.first().click(),
      ]);
    } else {
      // Fallback: find anchor with href containing '/docs' and click
      const fallback = await page.$('a[href*="/docs"]');
      if (fallback) {
        await Promise.all([
          page.waitForURL(/.*docs.*/, { timeout: 15000 }),
          fallback.click(),
        ]);
      } else {
        throw new Error('Documentation link not found');
      }
    }

    // Verify URL contains 'docs'
    expect(page.url()).toContain('docs');
  });
});
