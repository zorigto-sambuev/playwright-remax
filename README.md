# Playwright Testing Framework for Remax

This repository contains automated tests using Playwright for the Remax project.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```
Then update the environment variables as needed.

## Running Tests

- Run all tests:
```bash
npm test
```

- Run tests in headed mode:
```bash
npm run test:headed
```

- Run tests with UI mode:
```bash
npm run test:ui
```

- View test report:
```bash
npm run report
```

## CI/CD

The project includes GitHub Actions workflow that:
- Runs on push to main/master branches
- Runs on pull requests to main/master branches
- Installs dependencies and browsers
- Sets up environment variables
- Runs tests
- Uploads test reports as artifacts

## Project Structure

- `/tests` - Test files
- `playwright.config.ts` - Playwright configuration
- `.env` - Environment variables (not committed)
- `.github/workflows` - CI/CD configuration 