import { test as base, type Page } from '@playwright/test';

type AuthenticatedPage = Page;

export const test = base.extend<{ authenticatedPage: AuthenticatedPage }>({
  authenticatedPage: async ({ page }, use) => {
    await page.goto(process.env.BASE_URL!);
    
    // Click login button
    await page.getByRole('button', { name: 'Log In' }).click();
    
    // Fill login form
    await page.getByLabel('Email').fill(process.env.LOGIN_EMAIL!);
    await page.getByLabel('Password').fill(process.env.LOGIN_PASSWORD!);
    
    // Submit login form
    await page.getByRole('button', { name: 'Sign In' }).click();
    
    // Wait for navigation after login
    await page.waitForLoadState('networkidle');
    
    await use(page);
  },
}); 