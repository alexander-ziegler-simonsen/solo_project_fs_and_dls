import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto( process.env.BASE_CLIENT_URL + 'product');
  await page.locator('#header').click();
  await page.getByRole('img', { name: 'Online Rizz Shop logo' }).click();
  await page.getByRole('heading', { name: 'Online Rizz Shop' }).click();
  await page.getByRole('heading', { name: 'ProductPage' }).click();
});