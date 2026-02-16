const { test } = require('@playwright/test');
const {
  Eyes,
  VisualGridRunner,
  Configuration,
  BatchInfo,
  BatchClose,
  Target
} = require('@applitools/eyes-playwright');

const printedResultIds = new Set();

let runner;
let batch;
let config;
let eyes;

// ===================== SUITE SETUP =====================
test.setTimeout(600000);


test.beforeAll(async () => {

  runner = new VisualGridRunner(5); // testConcurrency(5)

  batch = new BatchInfo('Playwright Parallel test');

  //Make sure APPLITOOLS_DONT_CLOSE_BATCHES=true in env variable
  batch.setNotifyOnCompletion(true);
  batch.setId(process.env.APPLITOOLS_BATCH_ID);
  batch.addProperty('Name', 'AMCE Bank');

  config = new Configuration();
  config.setApiKey(process.env.APPLITOOLS_API_KEY);
  config.setBatch(batch);

  // UFG browsers
  config.addBrowser(1200, 800, 'chrome');
  config.addBrowser(1600, 900, 'firefox');
  config.addBrowser(1024, 768, 'safari');
});

test.describe.configure({ mode: 'parallel' });

// ===================== HELPER FUNCTION =====================

async function runVisualTest(page, testInfo, url, checkpointName) {

  eyes = new Eyes(runner);
  eyes.setConfiguration(config);

  await eyes.open(
    page,
    'OrangeHRM',
    testInfo.title,
    { width: 1200, height: 800 }
  );

  await page.goto(url, { waitUntil: 'load' });


  await eyes.check(checkpointName, Target.window().fully());

  await eyes.closeAsync();

  // Stream results for ~6 seconds
  for (let i = 0; i < 6; i++) {
    await printNewResultsOnce();
    await new Promise(r => setTimeout(r, 1000));
  }
}


async function printNewResultsOnce() {

  const summary = await runner.getAllTestResults(false);

  for (const container of summary) {

    const result = container.getTestResults?.();
    if (!result) continue;

    const resultId = result.getId();

    if (printedResultIds.has(resultId)) continue;
    printedResultIds.add(resultId);

    console.log('=======================================');
    console.log('VISUAL RESULT READY');
    console.log('Test name :', result.getName());
    console.log('Status    :', result.getStatus());
    console.log('Browser   :', result.getHostApp());
    console.log('URL       :', result.getUrl());
    console.log('=======================================');
  }
}


test('Bank Login Page', async ({ page }, testInfo) => {
  await runVisualTest(
    page,
    testInfo,
    'https://sandbox.applitools.com/bank',
    'Bank Login Page'
  );
});

test('OrangeHRM Login Page', async ({ page }, testInfo) => {
  await runVisualTest(
    page,
    testInfo,
    'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
    'OrangeHRM Login'
  );
});

test('GitHub Home Page', async ({ page }, testInfo) => {
  await runVisualTest(
    page,
    testInfo,
    'https://github.com',
    'GitHub Home'
  );
});

test('Wikipedia Article', async ({ page }, testInfo) => {
  await runVisualTest(
    page,
    testInfo,
    'https://en.wikipedia.org/wiki/Software_testing',
    'Wikipedia Article'
  );
});

test('StackOverflow Questions', async ({ page }, testInfo) => {
  await runVisualTest(
    page,
    testInfo,
    'https://stackoverflow.com/questions',
    'StackOverflow Questions'
  );
});



test('Netflix Landing Page', async ({ page }, testInfo) => {
  await runVisualTest(
    page,
    testInfo,
    'https://www.netflix.com',
    'Netflix Landing'
  );
});