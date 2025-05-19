import { test } from '../fixtures';
import { expect } from '@playwright/test';

test.describe('Main Page Search Tests', () => {
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

    test('should have heading visible', async ({ page }) => {
        const headerSearch = page.getByTestId('d-hero-section-text');
        await expect(headerSearch).toBeVisible();
        await expect(headerSearch).toHaveText('WHEN HOME MATTERS MOST, GO WITH THE MOST TRUSTED.');
    });

    test('should have specific search buttons visible', async ({ page }) => {
        const searchButtons = ['Buy', 'Rent', 'Sell', 'Agents', 'Offices'];

        for (const buttonText of searchButtons) {
            const buttonElement = page.locator(`[data-test-id="quicksearch-tab-${buttonText}-button"]`);
            await expect(buttonElement).toBeVisible();
            await expect(buttonElement).toHaveText(buttonText.toUpperCase());
            await buttonElement.click();
            await expect(buttonElement).toHaveClass(/active/);
            await expect(buttonElement).toHaveAttribute('aria-selected', 'true');
            for (const otherButton of searchButtons) {
                if (otherButton !== buttonText) {
                    const otherButtonElement = page.locator(`[data-test-id="quicksearch-tab-${otherButton}-button"]`);
                    await expect(otherButtonElement).toHaveAttribute('aria-selected', 'false');
                }
            }
        }
    });

    test('should show Placeholder is visible in search field', async ({ page }) => {
        const inputField = page.getByTestId('quicksearch-input');
        const moreTooltip = page.locator('span.tooltip-link.inside-input');
        const moreButtonExpanded = page.locator('.tooltip.tooltip-bottom');

        await expect(inputField).toBeVisible();
        await expect(inputField).toHaveAttribute('placeholder', 'Address, City, ZIP, and More');
        await expect(moreTooltip).toBeVisible();
        await expect(moreTooltip).toHaveText('More');
        await moreTooltip.click();
        await expect(moreButtonExpanded).toBeVisible()
        await expect(moreButtonExpanded).toHaveText('Additional search fields: Neighborhood, School District, or MLS');
    });

    test('should show Listing Data Last Updated visible', async ({ page }) => {
        const listingUpdateText = page.locator('p:has-text("Listing Data Last Updated")');
        await expect(listingUpdateText).toBeVisible();
        await expect(listingUpdateText).toHaveText(/Listing Data Last Updated .+ At \d{1,2}:\d{2} [AP]M/);
    });

    test('should have Search for RE/MAX properties in over 110 countries and territories visible', async ({ page }) => {
        const globalLink = page.locator('.d-link.global-desktop-link');
        const linkText = page.locator('.global-desktop-text');

        await expect(globalLink).toBeVisible();
        await expect(globalLink).toHaveAttribute('href', 'https://global.remax.com');
        await expect(linkText).toHaveText('Search for RE/MAX properties in over 110 countries and territories');
    });

    test('search suggestions by typing 4 numbers is visible with Buy search option', async ({ page }) => {
        const typed4numbers = '2089';
        const buttonBuyOption = page.locator(`[data-test-id="quicksearch-tab-Buy-button"]`);
        const inputField = page.getByTestId('quicksearch-input');
        const zipCodeCategory = page.locator('#d-autocomplete-banner-zip-codes');
        const adressesCategory = page.locator('#d-autocomplete-banner-addresses');
        const categoryIcon = zipCodeCategory.getByTestId('d-icon');
        const zipCodeOption = page.locator('#d-autocomplete-option-0');
        const primaryText = zipCodeOption.locator('.primary-text');
        
        await buttonBuyOption.click();
        await expect(buttonBuyOption).toHaveAttribute('aria-selected', 'true');
        await inputField.fill(`${typed4numbers}`);
        await page.waitForTimeout(1000);
        await expect(zipCodeCategory).toBeVisible();
        await expect(adressesCategory).toBeVisible();
        await expect(zipCodeCategory.locator('span')).toContainText('Zip Codes');
        await expect(adressesCategory.locator('span')).toContainText('Addresses');
        await expect(categoryIcon).toBeVisible();
        await expect(primaryText).toContainText(`${typed4numbers}`);
        const allOptions = await page.locator('li[data-testid="auto-complete-result"]').all();
        for (const option of allOptions) {
            const text = await option.textContent();
            expect(text).toContain(`${typed4numbers}`);
        }
    });

    test('search suggestions by typing 5 numbers is visible with Buy search option', async ({ page }) => {
        const typedZip = '84045';
        const buttonBuyOption = page.locator(`[data-test-id="quicksearch-tab-Buy-button"]`);
        const inputField = page.getByTestId('quicksearch-input');
        const zipCodeCategory = page.locator('#d-autocomplete-banner-zip-codes');
        const adressesCategory = page.locator('#d-autocomplete-banner-addresses');
        const mlsCategory = page.locator('#d-autocomplete-banner-mls-listings');
        const categoryIcon = zipCodeCategory.getByTestId('d-icon');
        const zipCodeOption = page.locator('#d-autocomplete-option-0');
        const primaryText = zipCodeOption.locator('.primary-text');
        
        await buttonBuyOption.click();
        await expect(buttonBuyOption).toHaveAttribute('aria-selected', 'true');
        await inputField.fill(`${typedZip}`);
        await page.waitForTimeout(1000);
        await expect(zipCodeCategory).toBeVisible();
        await expect(adressesCategory).toBeVisible();
        await expect(mlsCategory).toBeVisible();
        await expect(zipCodeCategory.locator('span')).toContainText('Zip Codes');
        await expect(adressesCategory.locator('span')).toContainText('Addresses');
        await expect(mlsCategory.locator('span')).toContainText('MLS Listings');
        await expect(categoryIcon).toBeVisible();
        await expect(primaryText).toHaveText(`${typedZip}`);
        const allOptions = await page.locator('li[data-testid="auto-complete-result"]').all();
        for (const option of allOptions) {
            const text = await option.textContent();
            expect(text).toContain(`${typedZip}`);
        }
    });

    test('search suggestions by typing City Name is visible with Buy search option', async ({ page }) => {
        const typedCity = 'Salt Lake City';
        const buttonBuyOption = page.locator(`[data-test-id="quicksearch-tab-Buy-button"]`);
        const inputField = page.getByTestId('quicksearch-input');
        const cityCategory = page.locator('#d-autocomplete-banner-cities');
        const neighborhoodCategory = page.locator('#d-autocomplete-banner-neighborhoods');
        const schoolDisctrictCategory = page.locator('#d-autocomplete-banner-school-districts');
        const adressesCategory = page.locator('#d-autocomplete-banner-addresses');
        
        await buttonBuyOption.click();
        await expect(buttonBuyOption).toHaveAttribute('aria-selected', 'true');
        await inputField.fill(`${typedCity}`);
        await page.waitForTimeout(1000);
        await expect(cityCategory).toBeVisible();
        await expect(adressesCategory).toBeVisible();
        await expect(neighborhoodCategory).toBeVisible();
        await expect(cityCategory.locator('span')).toContainText('Cities');
        await expect(neighborhoodCategory.locator('span')).toContainText('Neighborhoods');
        await expect(schoolDisctrictCategory.locator('span')).toContainText('School Districts');
        await expect(adressesCategory.locator('span')).toContainText('Addresses');
        const allOptions = await page.locator('li[data-testid="auto-complete-result"]').all();
        for (const option of allOptions) {
            const text = await option.textContent();
            expect(text).toContain(`${typedCity}`);
        }
    });

    test('search suggestions by typing 4 numbers is visible with Rent search option', async ({ page }) => {
        const typed4numbers = '2089';
        const buttonRentOption = page.locator(`[data-test-id="quicksearch-tab-Rent-button"]`);
        const inputField = page.getByTestId('quicksearch-input');
        const zipCodeCategory = page.locator('#d-autocomplete-banner-zip-codes');
        const adressesCategory = page.locator('#d-autocomplete-banner-addresses');
        const categoryIcon = zipCodeCategory.getByTestId('d-icon');
        const zipCodeOption = page.locator('#d-autocomplete-option-0');
        const primaryText = zipCodeOption.locator('.primary-text');
        
        await buttonRentOption.click();
        await inputField.fill(`${typed4numbers}`);
        await page.waitForTimeout(1000);
        await expect(zipCodeCategory).toBeVisible();
        await expect(adressesCategory).toBeVisible();
        await expect(zipCodeCategory.locator('span')).toContainText('Zip Codes');
        await expect(adressesCategory.locator('span')).toContainText('Addresses');
        await expect(categoryIcon).toBeVisible();
        await expect(primaryText).toContainText(`${typed4numbers}`);
        const allOptions = await page.locator('li[data-testid="auto-complete-result"]').all();
        for (const option of allOptions) {
            const text = await option.textContent();
            expect(text).toContain(`${typed4numbers}`);
        }
    });

    test('search suggestions by typing 5 numbers is visible with Rent search option', async ({ page }) => {
        const typedZip = '84045';
        const buttonRentOption = page.locator(`[data-test-id="quicksearch-tab-Rent-button"]`);
        const inputField = page.getByTestId('quicksearch-input');
        const zipCodeCategory = page.locator('#d-autocomplete-banner-zip-codes');
        const adressesCategory = page.locator('#d-autocomplete-banner-addresses');
        const mlsCategory = page.locator('#d-autocomplete-banner-mls-listings');
        const categoryIcon = zipCodeCategory.getByTestId('d-icon');
        const zipCodeOption = page.locator('#d-autocomplete-option-0');
        const primaryText = zipCodeOption.locator('.primary-text');
        
        await buttonRentOption.click();
        await inputField.fill(`${typedZip}`);
        await page.waitForTimeout(1000);
        await expect(zipCodeCategory).toBeVisible();
        await expect(adressesCategory).toBeVisible();
        await expect(mlsCategory).toBeVisible();
        await expect(zipCodeCategory.locator('span')).toContainText('Zip Codes');
        await expect(adressesCategory.locator('span')).toContainText('Addresses');
        await expect(mlsCategory.locator('span')).toContainText('MLS Listings');
        await expect(categoryIcon).toBeVisible();
        await expect(primaryText).toHaveText(`${typedZip}`);
        const allOptions = await page.locator('li[data-testid="auto-complete-result"]').all();
        for (const option of allOptions) {
            const text = await option.textContent();
            expect(text).toContain(`${typedZip}`);
        }
    });

    test('search suggestions by typing City Name is visible with Rent search option', async ({ page }) => {
        const typedCity = 'Salt Lake City';
        const buttonRentOption = page.locator(`[data-test-id="quicksearch-tab-Rent-button"]`);
        const inputField = page.getByTestId('quicksearch-input');
        const cityCategory = page.locator('#d-autocomplete-banner-cities');
        const neighborhoodCategory = page.locator('#d-autocomplete-banner-neighborhoods');
        const schoolDisctrictCategory = page.locator('#d-autocomplete-banner-school-districts');
        const adressesCategory = page.locator('#d-autocomplete-banner-addresses');
        
        await buttonRentOption.click();
        await inputField.fill(`${typedCity}`);
        await page.waitForTimeout(1000);
        await expect(cityCategory).toBeVisible();
        await expect(adressesCategory).toBeVisible();
        await expect(neighborhoodCategory).toBeVisible();
        await expect(cityCategory.locator('span')).toContainText('Cities');
        await expect(neighborhoodCategory.locator('span')).toContainText('Neighborhoods');
        await expect(schoolDisctrictCategory.locator('span')).toContainText('School Districts');
        await expect(adressesCategory.locator('span')).toContainText('Addresses');
        const allOptions = await page.locator('li[data-testid="auto-complete-result"]').all();
        for (const option of allOptions) {
            const text = await option.textContent();
            expect(text).toContain(`${typedCity}`);
        }
    });

}); 
//need to write test for Sell, Agents, Offices