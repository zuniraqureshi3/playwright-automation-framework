// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import { environments } from './config/environments';

dotenv.config();

const envName = process.env.TEST_ENV || 'qa';

if (!(envName in environments)) {
    throw new Error(`Unknown environment: ${envName}`);
}

/** @type {keyof typeof environments} */
const environment = envName;

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  testMatch: ['**/*.spec.js', '**/*.auth.js'],
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
      baseURL: environments[environment].baseURL,
      trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
        name: 'setup',
        testMatch: '**/setup.auth.js',
    },
    {
        name: 'unauthenticated',
        testMatch: '**/auth/login.spec.js',
        use: {
          ...devices['Desktop Chrome'],
          storageState: undefined,
        },
    },
    {
        name: 'chromium',
        testIgnore: ['**/setup.auth.js','**/auth/login.spec.js'],
        dependencies: ['setup'],
        use: {...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
        },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

