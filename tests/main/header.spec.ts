import { test } from '../fixtures';
import { expect } from '@playwright/test';

test.describe('Main Page Header Tests', () => {
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

  test('should find and verify RE/MAX logo', async ({ page }) => {
    const logo = page.getByTestId('site-nav-logo-image');
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('alt', 'RE/MAX');
    await expect(logo).toHaveAttribute('src', '/images/design-system/logo/remax/logotype_color.svg');
    await expect(logo).toHaveAttribute('width', '320');
    await expect(logo).toHaveAttribute('height', '60');
  }); 

  test('should navigate to homes for sale page from Buy Property Search dropdown', async ({ page }) => {
    const buyButton = page.getByTestId('site-nav-button-Buy-text');
    const propertySearchLink = page.getByTestId('site-nav-link-Property Search');
    const pageTitle = page.locator('h1.title');

    await buyButton.click();
    await expect(propertySearchLink).toBeVisible();
    await expect(propertySearchLink).toHaveClass(/dropdown/);
    await expect(propertySearchLink).toHaveAttribute('href', '/homes-for-sale');
    await propertySearchLink.click();
    await expect(page).toHaveURL('https://www.remax.com/homes-for-sale');
    await expect(pageTitle).toBeVisible();
    await expect(pageTitle).toHaveText('Homes for Sale');
  });

  test('should navigate to homes for sale page from Buy Buying Guide dropdown', async ({ page }) => {
    const buyButton = page.getByTestId('site-nav-button-Buy-text');
    const buyingGuideLink = page.getByTestId('site-nav-link-Buying Guide');
    const pageTitle = page.locator('h1:text("Welcome to the REMAX Home Buyer’s Guide!")');

    await buyButton.click();
    await expect(buyingGuideLink).toBeVisible();
    await expect(buyingGuideLink).toHaveClass(/dropdown/);
    await expect(buyingGuideLink).toHaveAttribute('href', '/buy/buyers-guide');
    await buyingGuideLink.click();
    await expect(page).toHaveURL('https://www.remax.com/buy/buyers-guide');
    await expect(pageTitle).toBeVisible();
    // await expect(pageTitle).toHaveText('Welcome to the REMAX Home Buyer's Guide!');
  });

  test('should navigate to homes for sale page from Buy Virtual Home Buying dropdown', async ({ page }) => {
    const buyButton = page.getByTestId('site-nav-button-Buy-text');
    const virtualHomeBuyingLink = page.getByTestId('site-nav-link-Virtual Home Buying');
    const pageTitle = page.getByRole('heading', { name: 'Virtual Home Buying', level: 1 });

    await buyButton.click();
    await expect(virtualHomeBuyingLink).toBeVisible();
    await expect(virtualHomeBuyingLink).toHaveClass(/dropdown/);
    await expect(virtualHomeBuyingLink).toHaveAttribute('href', '/resources/virtual-home-buying');
    await virtualHomeBuyingLink.click();
    await expect(page).toHaveURL('https://www.remax.com/resources/virtual-home-buying');
    await expect(pageTitle).toBeVisible();
  });

  test('should navigate to homes for sale page from Sell Home Value Estimate dropdown', async ({ page }) => {
    const sellButton = page.getByTestId('site-nav-button-Sell-text');
    const homeValueEstimateLink = page.getByTestId('site-nav-link-Home Value Estimate');
    const pageTitle = page.getByText('What is Your Home Worth?');

    await sellButton.click();
    await expect(homeValueEstimateLink).toBeVisible();
    await expect(homeValueEstimateLink).toHaveClass(/dropdown/);
    await expect(homeValueEstimateLink).toHaveAttribute('href', '/home-value-estimates');
    await homeValueEstimateLink.click();
    await expect(page).toHaveURL('https://home-value-estimates.remax.com/');
    await expect(pageTitle).toBeVisible();
  });

  test('should navigate to homes for sale page from Sell Selling Guide dropdown', async ({ page }) => {
    const sellButton = page.getByTestId('site-nav-button-Sell-text');
    const sellingGuideLink = page.getByTestId('site-nav-link-Selling Guide');
    const pageTitle = page.locator('h1:text("Welcome to the REMAX Home Seller’s Guide!")');

    await sellButton.click();
    await expect(sellingGuideLink).toBeVisible();
    await expect(sellingGuideLink).toHaveClass(/dropdown/);
    await expect(sellingGuideLink).toHaveAttribute('href', '/sell/sellers-guide');
    await sellingGuideLink.click();
    await expect(page).toHaveURL('https://www.remax.com/sell/sellers-guide');
    await expect(pageTitle).toBeVisible();
  });

  test('should navigate to homes for sale page from Rent Rental Search dropdown', async ({ page }) => {
    const rentButton = page.getByTestId('site-nav-button-Rent-text');
    const rentalSearchLink = page.getByTestId('site-nav-link-Rental Search');
    const pageTitle = page.locator('h1.title');

    await rentButton.click();
    await expect(rentalSearchLink).toBeVisible();
    await expect(rentalSearchLink).toHaveClass(/dropdown/);
    await expect(rentalSearchLink).toHaveAttribute('href', '/homes-for-rent');
    await rentalSearchLink.click();
    await expect(page).toHaveURL('https://www.remax.com/homes-for-rent');
    await expect(pageTitle).toBeVisible();
    await expect(pageTitle).toHaveText('Homes for Rent');
  });

  test('should navigate to homes for sale page from Rent Find a Rental Agent dropdown', async ({ page }) => {
    const rentButton = page.getByTestId('site-nav-button-Rent-text');
    const findRentalAgentLink = page.getByTestId('site-nav-link-Find a Rental Agent');
    const pageTitle = page.getByRole('heading', { name: 'RE/MAX® Agent Search', level: 1 });

    await rentButton.click();
    await expect(findRentalAgentLink).toBeVisible();
    await expect(findRentalAgentLink).toHaveClass(/dropdown/);
    await findRentalAgentLink.click();
    await page.waitForURL('**/real-estate-agents?**');
    const url = new URL(page.url());
    await expect(url.pathname).toBe('/real-estate-agents');
    const searchQuery = decodeURIComponent(url.searchParams.get('searchQuery') || '');
    await expect(searchQuery).toContain('"subSpecialties":["Rentals"]');
    await expect(pageTitle).toBeVisible();
  });

  test('should navigate to agents page from Agents Agent Search dropdown', async ({ page }) => {
    const agentsButton = page.getByTestId('site-nav-button-Agents-text');
    const agentsSearchLink = page.getByTestId('site-nav-link-Agent Search');
    const pageTitle = page.getByRole('heading', { name: 'RE/MAX® Agent Search', level: 1 });

    await agentsButton.click();
    await expect(agentsSearchLink).toBeVisible();
    await expect(agentsSearchLink).toHaveClass(/dropdown/);
    await expect(agentsSearchLink).toHaveAttribute('href', '/real-estate-agents');
    await agentsSearchLink.click();
    await expect(page).toHaveURL('https://www.remax.com/real-estate-agents');
    await expect(pageTitle).toBeVisible();
  });

  test('should navigate to office page from Agents Office Search dropdown', async ({ page }) => {
    const agentsButton = page.getByTestId('site-nav-button-Agents-text');
    const officeSearchLink = page.getByTestId('site-nav-link-Office Search');
    const pageTitle = page.getByRole('heading', { name: 'RE/MAX® Office Search', level: 1 });

    await agentsButton.click();
    await expect(officeSearchLink).toBeVisible();
    await expect(officeSearchLink).toHaveClass(/dropdown/);
    await expect(officeSearchLink).toHaveAttribute('href', '/real-estate-offices');
    await officeSearchLink.click();
    await expect(page).toHaveURL('https://www.remax.com/real-estate-offices');
    await expect(pageTitle).toBeVisible();
  });

  test('should navigate to luxury page from More Luxury dropdown', async ({ page }) => {
    const moreButton = page.getByTestId('site-nav-button-More-text');
    const luxuryLink = page.getByTestId('site-nav-link-Luxury');
    const pageTitle = page.getByRole('heading', { name: 'Find Homes and Luxury Properties in The RE/MAX Collection', level: 2 });

    await moreButton.click();
    await expect(luxuryLink).toBeVisible();
    await expect(luxuryLink).toHaveClass(/dropdown/);
    await expect(luxuryLink).toHaveAttribute('href', '/luxury');
    await luxuryLink.click();
    await expect(page).toHaveURL('https://www.remax.com/luxury');
    await expect(pageTitle).toBeVisible();
  });

  test('should navigate to global page from More Global dropdown', async ({ page }) => {
    const moreButton = page.getByTestId('site-nav-button-More-text');
    const globalLink = page.getByTestId('site-nav-link-Global');
    const countrySelector = page.getByRole('button', { name: 'Global' });
    
    await moreButton.click();
    await expect(globalLink).toBeVisible();
    await expect(globalLink).toHaveClass(/dropdown/);
    await globalLink.click();
    await expect(page).toHaveURL('https://global.remax.com/');
    await expect(countrySelector).toBeVisible();
  });

  test('should navigate to commercial page from More Commercial dropdown', async ({ page }) => {
    const moreButton = page.getByTestId('site-nav-button-More-text');
    const commercialLink = page.getByTestId('site-nav-link-Commercial');
    const pageTitle = page.getByRole('heading', { name: 'Commercial Properties' });
    
    await moreButton.click();
    await expect(commercialLink).toBeVisible();
    await expect(commercialLink).toHaveClass(/dropdown/);
    await commercialLink.click();
    await expect(page).toHaveURL('https://www.remaxcommercial.com/');
    await expect(pageTitle).toBeVisible();
  });

  test('should navigate to articles and advice page from More Articles and Advice dropdown', async ({ page }) => {
    const moreButton = page.getByTestId('site-nav-button-More-text');
    const articlesAndAdviceLink = page.getByTestId('site-nav-link-Articles and Advice');
    const pageTitle = page.getByRole('heading', { name: 'Featured Videos' });
    
    await moreButton.click();
    await expect(articlesAndAdviceLink).toBeVisible();
    await expect(articlesAndAdviceLink).toHaveClass(/dropdown/);
    await articlesAndAdviceLink.click();
    await expect(page).toHaveURL('https://blog.remax.com/');
    await expect(pageTitle).toBeVisible();
  });

  test('should navigate to account benefits page from More Account Benefits dropdown', async ({ page }) => {
    const moreButton = page.getByTestId('site-nav-button-More-text');
    const accountBenefitsLink = page.getByTestId('site-nav-link-Account Benefits');
    const pageTitle = page.getByRole('heading', { name: 'REMAX Account Benefits' });
    
    await moreButton.click();
    await expect(accountBenefitsLink).toBeVisible();
    await expect(accountBenefitsLink).toHaveClass(/dropdown/);
    await expect(accountBenefitsLink).toHaveAttribute('href', '/account-benefits');
    await accountBenefitsLink.click();
    await expect(page).toHaveURL('https://www.remax.com/account-benefits');
    await expect(pageTitle).toBeVisible();
  });

  test('should navigate to Childrens Miracle Network Hospitals page from More Childrens Miracle Network Hospitals dropdown', async ({ page }) => {
    const moreButton = page.getByTestId('site-nav-button-More-text');
    const childrensMiracleNetworkHospitalsLink = page.getByTestId('site-nav-link-Childrens Miracle Network Hospitals');
    const pageTitle = page.getByRole('heading', { name: 'Agents Making A Difference' });
    
    await moreButton.click();
    await expect(childrensMiracleNetworkHospitalsLink).toBeVisible();
    await expect(childrensMiracleNetworkHospitalsLink).toHaveClass(/dropdown/);
    await expect(childrensMiracleNetworkHospitalsLink).toHaveAttribute('href', '/resources/childrensmiraclenetwork');
    await childrensMiracleNetworkHospitalsLink.click();
    await expect(page).toHaveURL('https://www.remax.com/resources/childrensmiraclenetwork');
    await expect(pageTitle).toBeVisible();
  });
});