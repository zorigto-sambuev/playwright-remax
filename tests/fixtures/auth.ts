import { test as base, expect, type Page } from '@playwright/test';

// Declare the types for our fixtures
export type AuthFixtures = {
  authenticatedPage: void;
};

// Helper function for login
async function login(page: Page) {
  const loginButton = page.getByTestId('site-nav-header-login-button');
  await loginButton.click();

  const loginModal = page.getByRole('dialog');
  await expect(loginModal).toBeVisible();
  
  const emailInput = page.getByLabel(/email/i);
  const passwordInput = page.getByLabel(/password/i);
  const submitButton = page.getByRole('button', { name: /sign in/i });

  await emailInput.fill(process.env.LOGIN_EMAIL!);
  await passwordInput.fill(process.env.LOGIN_PASSWORD!);
  await submitButton.click();

  // Verify successful login
  await expect(page.locator('#d-site-header-account-button')).toBeVisible();
  await expect(loginButton).not.toBeVisible();
}

// Create the auth fixture
export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    await login(page);
    await use();
  }
});

export { expect }; 