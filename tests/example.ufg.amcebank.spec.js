// tests/multiple-windows.spec.js
const { test } = require('@playwright/test');
const {
  Eyes,
  VisualGridRunner,
  Configuration,
  BatchInfo
} = require('@applitools/eyes-playwright');

let runner;
let config;
let eyes;

test.beforeAll(async () => {
  runner = new VisualGridRunner(5);

  config = new Configuration();

  const batchInfo = new BatchInfo('AMCE Bank');
  batchInfo.setNotifyOnCompletion(true);
  batchInfo.addProperty("Name","AMCE Bank");
  config.setBatch(batchInfo);
});

test.describe('Playwright Multi-page Visual Grid test', () => {

  test.beforeEach(async ({ page }) => {
    eyes = new Eyes(runner);
    eyes.setConfiguration(config);

    await eyes.open(
      page,
      'Playwright Multi-Window Demo',
      'Standard',
      { width: 1200, height: 800 }
    );
  });

  test('checks main page, popup, and returns', async ({ page }) => {
    await page.goto('https://demo.applitools.com/');

    // Initial page
    await eyes.check({name: 'ACME Bank', fully: true, page: page});
  });

  test.afterEach(async () => {
    await eyes.closeAsync();
  });
});

test.afterAll(async () => {

  /*
  Eyes SDKs will typically handle the closing of batches automatically when there is a call to the getAllTestResults API or equivalent for your selected SDK:
  https://applitools.com/docs/eyes/concepts/best-practices/batching#batching-parallel-executions-cicd
  */
  const results = await runner.getAllTestResults(); //This automatically closes the batchInfo
  console.log('Visual Grid results:', results);
});
