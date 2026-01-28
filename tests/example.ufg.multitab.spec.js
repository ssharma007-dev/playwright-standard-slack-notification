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

  const batchInfo = new BatchInfo('Slack Notification All');
  batchInfo.setNotifyOnCompletion(true);
  batchInfo.addProperty("Name","Slack");
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
    await page.goto('https://the-internet.herokuapp.com/windows');

    // Initial page
    await eyes.check({name: 'Initial Page', fully: true, page: page});

    // New tab/pop up object
    const [newTab] = await Promise.all([
      page.waitForEvent('popup'),
      page.click('text=Click Here')
    ]);

    // Screenshot of new tab/pop up
    await eyes.check({
      name: 'New Tab/Pop Up',
      page: newTab,
      fully: true
    });

    // Screenshot of Initial Page
    await eyes.check({name: 'Initial Page Again',page: page,fully: true});
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
