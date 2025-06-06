import { test } from '../fixtures';
import { expect } from '@playwright/test';

test.describe('Main Page News Section Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(process.env.BASE_URL!);
        const adModal = page.getByTestId('interstitial-ad-modal');
        const closeButton = page.getByTestId('interstitial-ad-close-button');
        try {
            await expect(adModal).toBeVisible({ timeout: 3000 });
            await expect(closeButton).toBeVisible({ timeout: 3000 });
            await closeButton.click();
            await expect(adModal).not.toBeVisible({ timeout: 3000 });
        } catch (error) {
            console.error('Error closing ad modal:');
        }
    });

    test('should display RE/MAX News heading with correct attributes', async ({ page }) => {
        const newsHeading = page.getByRole('heading', { name: 'RE/MAX News', level: 2 });
        await expect(newsHeading).toBeVisible();
    });

    test('should display and allow interaction with blog post link and image', async ({ page, context }) => {
        const newsHeading = page.getByRole('heading', { name: 'RE/MAX News' });
        const newsContainer = page.getByTestId('blog-container');
        const imageLink = page.locator('a.blog-image[data-testid="d-link"]').first();
        const image = imageLink.getByTestId('d-img');
        const pagePromise = context.waitForEvent('page');

        await page.waitForLoadState('networkidle');
        await newsHeading.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);
        await expect(newsContainer).toBeVisible();
        await newsContainer.scrollIntoViewIfNeeded();
        await expect(imageLink).toHaveAttribute('href', 'https://news.remax.com/us-housing-inventory-up-35-from-last-year-according-to-new-data-from-remax');
        await imageLink.scrollIntoViewIfNeeded();
        await expect(imageLink).toBeVisible({ timeout: 30000 });
        await expect(image).toBeVisible();
        await expect(image).toHaveAttribute('alt', 'U.S. Housing Inventory Up 35% From Last Year, According to New Data From REMAX');
        await imageLink.click();
        const newPage = await pagePromise;
        expect(newPage.url()).toBe('https://news.remax.com/us-housing-inventory-up-35-from-last-year-according-to-new-data-from-remax');
        await newPage.close();
    });

    test('should display blog post tags and read more link', async ({ page, context }) => {
        const newsContainer = page.getByTestId('blog-container');
        const marketTrendsTag = page.getByText('Market Trends', { exact: true });
        const readMoreLink = page.getByTestId('blog-post-link');

        await page.waitForLoadState('networkidle');
        await newsContainer.scrollIntoViewIfNeeded();
        await expect(newsContainer).toBeVisible();
        await expect(marketTrendsTag).toBeVisible(); 
        await expect(readMoreLink).toBeVisible();
        await expect(readMoreLink).toHaveText('Read Post');
        await expect(readMoreLink).toHaveAttribute('href', 'https://news.remax.com/us-housing-inventory-up-35-from-last-year-according-to-new-data-from-remax');
        const pagePromise = context.waitForEvent('page');
        await readMoreLink.click();
        const newPage = await pagePromise;
        expect(newPage.url()).toBe('https://news.remax.com/us-housing-inventory-up-35-from-last-year-according-to-new-data-from-remax');
        await newPage.close();
    });
}); 