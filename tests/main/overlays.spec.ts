import { test } from '../fixtures';
import { expect } from '@playwright/test';

test.describe('Main Page Overlays Tests', () => {
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

    test('Real Estate Listings By City is displayed and clickable', async ({ page, context }) => {
        const cities = [
            { name: 'Atlanta', state: 'GA' },
            { name: 'Nashville', state: 'TN' },
            { name: 'Phoenix', state: 'AZ' },
            { name: 'San Francisco', state: 'CA' },
            { name: 'Austin', state: 'TX' },
            { name: 'New York', state: 'NY' },
            { name: 'Raleigh', state: 'NC' },
            { name: 'Seattle', state: 'WA' },
            { name: 'Denver', state: 'CO' },
            { name: 'Orlando', state: 'FL' },
            { name: 'San Antonio', state: 'TX' },
            { name: 'Tampa', state: 'FL' }
        ];
        const listingsByCityHeader = page.getByRole('heading', { name: 'Real Estate Listings By City' });
        await expect(listingsByCityHeader).toBeVisible();

        for (const city of cities) {
            const houseForSaleCity = page.getByTestId('d-link').filter({ hasText: `Houses for sale in ${city.name}` });
            const listingsByCitySubtitle = page.getByTestId('d-text').filter({ hasText: `${city.name}, ${city.state} Real Estate and Homes for Sale` });
            
            await expect(houseForSaleCity).toBeVisible();
            await houseForSaleCity.click();
            const cityUrlName = city.name.toLowerCase().replace(/\s+/g, '-');
            await expect(page.url()).toContain(`homes-for-sale/${city.state.toLowerCase()}/${cityUrlName}/city`);
            await expect(listingsByCitySubtitle).toBeVisible();
            await page.goto(process.env.BASE_URL!);
        }
    });

    test('Popular Searches Nearby is displayed and clickable', async ({ page, context }) => {
        const popularSearchesOption = [
            { name: 'New Listings', urlParam: 'newListing' },
            { name: 'Virtual Tours', urlParam: 'hasVirtualTour' },
            { name: 'Open Houses', urlParam: 'openHouse' },
            { name: 'Homes For Sale', urlParam: 'PropertyType' },
            { name: 'Price Reductions', urlParam: 'priceReduced' }
        ];
        const popularSearchesNearbyHeader = page.locator('h3.popular-links-header');
        await expect(popularSearchesNearbyHeader).toBeVisible();

        for (const option of popularSearchesOption) {
            const popularSearchesOption = page.getByTestId('d-link').filter({ hasText: `${option.name} Near Me`});
            
            await expect(popularSearchesOption).toBeVisible();
            await popularSearchesOption.click();
            await expect(page.url()).toContain(option.urlParam);
            await page.goto(process.env.BASE_URL!);
        }
    });
});