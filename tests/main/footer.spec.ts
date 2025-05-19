import { test, expect } from '@playwright/test';

test.describe('Main Page Footer Tests', () => {
    test.beforeEach(async ({ page }) => {
        const adModal = page.getByTestId('interstitial-ad-modal');
        const closeButton = page.getByTestId('interstitial-ad-close-button');
    
        await page.goto(process.env.BASE_URL!);
        if (await adModal.isVisible()) {
          await closeButton.click();
          await expect(adModal).not.toBeVisible();
        }
    });

  test('should display copyright information', async ({ page }) => {
    const copyright = page.getByText(/©.*RE\/MAX/);
    await expect(copyright).toBeVisible();
  });

  test('should navigate to Real Estate Articles and Advice correctly', async ({ page }) => {
    const footer = page.getByRole('contentinfo');
    const blogLink = footer.getByRole('link', { name: 'Real Estate Articles and Advice' });
    const href = await blogLink.getAttribute('href');
    
    await expect(blogLink).toBeVisible();
    expect(href).toBe('https://blog.remax.com/');
    await blogLink.click();
    await page.waitForURL('https://blog.remax.com/');
    await expect(page.getByRole('heading', { name: 'Featured Videos' })).toBeVisible();
  });

  test('should display 1st column footer links and validate navigation', async ({ page, context }) => {
    const footer = page.getByRole('contentinfo');
    const expectedLinks = [
      { text: 'Worldwide Property Search', url: 'https://global.remax.com/default.aspx' },
      { text: 'RE/MAX Canada', url: 'https://www.remax.ca/' },
      { text: 'RE/MAX Commercial', url: 'https://www.remaxcommercial.com/' },
      { text: 'The RE/MAX Collection', url: 'https://www.remax.com/luxury' }
    ];

    for (const { text, url } of expectedLinks) {
        const link = footer.getByRole('link', { name: text });
        await expect(link).toBeVisible();
        const href = await link.getAttribute('href');
        expect(href?.toLowerCase()).toContain(new URL(url).pathname.toLowerCase());
        const pagePromise = context.waitForEvent('page');
        await link.click();
        const newPage = await pagePromise;
        await newPage.waitForLoadState();
        expect(newPage.url()).toMatch(new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
        await newPage.close();
      }
  
      const allFooterLinks = footer.getByRole('link');
      const visibleLinks = await allFooterLinks.count();
      expect(visibleLinks).toBeGreaterThanOrEqual(expectedLinks.length);
  });

  test('should display 2nd column footer links and validate navigation', async ({ page, context }) => {
    const footer = page.getByRole('contentinfo');
    const expectedLinks = [
      { text: 'New Listings For Sale', url: 'https://www.remax.com/new-listings' },
      { text: 'News', url: 'https://news.remax.com/' },
      { text: 'Leadership', url: 'https://news.remax.com/leadership' },
      { text: 'Investor Relations', url: 'https://investors.remaxholdings.com/overview/default.aspx' }
    ];

    for (const { text, url } of expectedLinks) {
        const link = footer.getByRole('link', { name: text });
        await expect(link).toBeVisible();
        const href = await link.getAttribute('href');
        expect(href?.toLowerCase()).toContain(new URL(url).pathname.toLowerCase());
        const pagePromise = context.waitForEvent('page');
        await link.click();
        const newPage = await pagePromise;
        await newPage.waitForLoadState();
        expect(newPage.url()).toMatch(new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
        await newPage.close();
      }
  
      const allFooterLinks = footer.getByRole('link');
      const visibleLinks = await allFooterLinks.count();
      expect(visibleLinks).toBeGreaterThanOrEqual(expectedLinks.length);
  });

  test('should display 3rd column footer links and validate navigation', async ({ page, context }) => {
    const footer = page.getByRole('contentinfo');
    
    // Define all expected footer links with their URLs
    const expectedLinks = [
      { text: 'RE/MAX Holdings', url: 'https://www.remaxholdings.com/' },
      { text: 'Invest in a RE/MAX Franchise', url: 'https://franchise.remax.com/' },
      { text: 'RE/MAX, LLC Careers', url: 'https://www.remax.com/careers' },
      { text: 'Become a RE/MAX Agent', url: 'https://join.remax.com/' }
    ];

    for (const { text, url } of expectedLinks) {
      const link = footer.getByRole('link', { name: text });
      await expect(link).toBeVisible();
      const href = await link.getAttribute('href');
      expect(href?.toLowerCase()).toContain(new URL(url).pathname.toLowerCase());
      const pagePromise = context.waitForEvent('page');
      await link.click();
      const newPage = await pagePromise;
      await newPage.waitForLoadState();
      expect(newPage.url()).toMatch(new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
      await newPage.close();
    }

    const allFooterLinks = footer.getByRole('link');
    const visibleLinks = await allFooterLinks.count();
    expect(visibleLinks).toBeGreaterThanOrEqual(expectedLinks.length);
  });

  test('should display 4rd column footer links and validate navigation', async ({ page, context }) => {
    const footer = page.getByRole('contentinfo');
    
    const expectedLinks = [
      { text: 'NAHREP English-Spanish Glossary of Real Estate Industry Terms', url: 'https://nahrep.org/glossary/' },
      { text: 'Advertise on the RE/MAX Media Network', url: 'https://www.remax.com/mediakit' },
      { text: 'LifeLock™ Home Title Protect', url: 'https://www.remax.com/lifelock-home-title-protect' }
    ];

    for (const { text, url } of expectedLinks) {
      const link = footer.getByRole('link', { name: text });
      await expect(link).toBeVisible();
      const href = await link.getAttribute('href');
      expect(href?.toLowerCase()).toContain(new URL(url).pathname.toLowerCase());
      const pagePromise = context.waitForEvent('page');
      await link.click();
      const newPage = await pagePromise;
      await newPage.waitForLoadState();
      expect(newPage.url()).toMatch(new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
      await newPage.close();
    }

    const allFooterLinks = footer.getByRole('link');
    const visibleLinks = await allFooterLinks.count();
    expect(visibleLinks).toBeGreaterThanOrEqual(expectedLinks.length);
  });
}); 