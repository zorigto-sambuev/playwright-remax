import { test, expect } from '../fixtures/auth';

test.describe('Account Page Tests', () => {
    test.beforeEach(async ({ page }) => {
        const adModal = page.getByTestId('interstitial-ad-modal');
        const closeButton = page.getByTestId('interstitial-ad-close-button');
    
        await page.goto('https://www.remax.com/');
        if (await adModal.isVisible()) {
          await closeButton.click();
          await expect(adModal).not.toBeVisible();
        }
      });

      test('should navigate to favorite page from Favorites dropdown', async ({ page, authenticatedPage }) => {
        const accountButton = page.locator('#d-site-header-account-button');
        const favoritesButton = page.getByTestId('site-nav-header-Favorites');
        const pageTitle = page.getByRole('heading', { name: 'Favorite Properties', level: 1 });

        await expect(accountButton).toBeVisible();
        await accountButton.click();
        await expect(favoritesButton).toHaveAttribute('href', '/account/favorite-properties');
        await favoritesButton.click();
        await expect(page).toHaveURL('https://www.remax.com/account/favorite-properties');
        await expect(pageTitle).toBeVisible();
      });
});