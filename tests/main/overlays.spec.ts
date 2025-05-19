import { test, expect } from '@playwright/test';

test.describe('Main Page Overlays Tests', () => {
    test.beforeEach(async ({ page }) => {
        const adModal = page.getByTestId('interstitial-ad-modal');
        const closeButton = page.getByTestId('interstitial-ad-close-button');
    
        await page.goto(process.env.BASE_URL!);
        if (await adModal.isVisible()) {
          await closeButton.click();
          await expect(adModal).not.toBeVisible();
        }
    });

    test('Worldwide overlay is displayed and clickable', async ({ page, context }) => {
        const worldwideOverlay = page.locator('.wcl.wcl--right.wcl--white');
        const worldwideTitle = page.getByTestId('d-text').filter({ hasText: 'Worldwide' });
        const searchGlobalbutton = page.getByTestId('Button-Global');
        const worldwideLogo = page.locator('img.wcl-icon[alt="Worldwide"]');
        const oneWorldoneSearchHeader = page.getByTestId('d-text').filter({ hasText: 'One World. One Search.'});
        
        await expect(worldwideOverlay).toBeVisible();
        await expect(worldwideTitle).toBeVisible();
        await expect(worldwideLogo).toBeVisible();
        await expect(oneWorldoneSearchHeader).toBeVisible();
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            searchGlobalbutton.click()
        ]);
        await newPage.waitForLoadState();
        await expect(newPage).toHaveURL('https://global.remax.com/');
        const countrySelector = newPage.getByRole('button', { name: 'Global' });
        await expect(countrySelector).toBeVisible();
    });

    test('Commercial overlay is displayed and clickable', async ({ page, context }) => {
        const commercialOverlay = page.locator('.wcl.wcl--left.wcl--black');
        const commercialTitle = page.getByRole('heading', { name: 'Commercial', exact: true });
        const commercialSubtitle = page.getByTestId('d-text').filter({ hasText: 'Commercial with Confidence' });
        const commercialLogo = page.locator('img.wcl-icon[alt="Commercial"]');
        const searchCommercialButton = page.getByTestId('Button-Commercial');
        const oneWorldoneSearchHeader = page.getByTestId('d-text').filter({ hasText: 'One World. One Search.'});
        
        await expect(commercialOverlay).toBeVisible();
        await expect(commercialTitle).toBeVisible();
        await expect(commercialLogo).toBeVisible();
        await expect(commercialSubtitle).toBeVisible();
        await expect(oneWorldoneSearchHeader).toBeVisible();
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            searchCommercialButton.click()
        ]);
        await newPage.waitForLoadState();
        await expect(newPage).toHaveURL('https://www.remaxcommercial.com/');
        const commercialPropertiesHeader = newPage.getByRole('heading', { name: 'Commercial Properties' });
        await expect(commercialPropertiesHeader).toBeVisible();
    });

    test('Luxury overlay is displayed and clickable', async ({ page, context }) => {
        const luxuryOverlay = page.locator('.wcl.wcl--right.wcl--blue');
        const luxuryTitle = page.getByRole('heading', { name: 'Luxury', exact: true });
        const luxurySubtitle = page.getByTestId('d-text').filter({ hasText: 'Fine Homes & Luxury Properties' });
        const luxuryLogo = page.locator('img.wcl-icon[alt="Luxury"]');
        const discoverLuxuryButton = page.getByTestId('Button-Luxury');
        const oneWorldoneSearchHeader = page.getByTestId('d-text').filter({ hasText: 'One World. One Search.'});
        const luxuryPropertiesHeader = page.getByRole('heading', { name: 'Find Homes and Luxury Properties in The RE/MAX Collection', level: 2 });
        
        await expect(luxuryOverlay).toBeVisible();
        await expect(luxuryTitle).toBeVisible();
        await expect(luxuryLogo).toBeVisible();
        await expect(luxurySubtitle).toBeVisible();
        await expect(oneWorldoneSearchHeader).toBeVisible();
        await discoverLuxuryButton.click();
        await expect(page).toHaveURL('https://www.remax.com/luxury/');
        await expect(luxuryPropertiesHeader).toBeVisible();
    });

});