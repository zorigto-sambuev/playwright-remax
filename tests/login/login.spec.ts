import { test } from '../fixtures';
import { expect } from '@playwright/test';

test.describe('Login Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.BASE_URL!);
    const adModal = page.getByTestId('interstitial-ad-modal');
    const closeButton = page.getByTestId('interstitial-ad-close-button');
    try {
      await expect(adModal).toBeVisible({ timeout: 4000 });
      await closeButton.click();
      await expect(adModal).not.toBeVisible({ timeout: 3000 });
    } catch (error) {
        console.error('Error closing ad modal:');
    }
  });

  test('should open login modal and fill credentials', async ({ page }) => {
    const loginButton = page.getByTestId('site-nav-header-login-button');
    const loginModal = page.getByRole('dialog');
    const emailInput = page.getByLabel(/email/i);
    const passwordInput = page.getByLabel(/password/i);
    const submitButton = page.getByRole('button', { name: /sign in/i });

    await expect(loginButton).toBeVisible();
    await loginButton.click()
    await expect(loginModal).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await emailInput.fill(process.env.LOGIN_EMAIL!);
    await passwordInput.fill(process.env.LOGIN_PASSWORD!);
    await submitButton.click();
    await expect(page.locator('#d-site-header-account-button')).toBeVisible();
    await expect(page.getByTestId('site-nav-header-login-button')).not.toBeVisible();
  });

  test('should show validation for required fields', async ({ page }) => {
    const loginButton = page.getByTestId('site-nav-header-login-button');
    const loginModal = page.getByRole('dialog');
    const submitButton = page.getByRole('button', { name: /sign in/i });
    const emailValidation = page.getByText('Email is required');
    const passwordValidation = page.getByText('Password is required');

    await expect(loginButton).toBeVisible();
    await loginButton.click();
    await expect(loginModal).toBeVisible();
    await submitButton.click();
    await expect(emailValidation).toBeVisible();
    await expect(passwordValidation).toBeVisible();
  });
}); 
