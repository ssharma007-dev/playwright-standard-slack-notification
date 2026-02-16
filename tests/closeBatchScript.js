const { BatchClose } = require('@applitools/eyes-playwright');

async function closeBatch() {
  const batchId = process.env.APPLITOOLS_BATCH_ID;

  if (!batchId) {
    console.error('APPLITOOLS_BATCH_ID not set');
    process.exit(1);
  }

  const batchClose = new BatchClose();
  await batchClose.setBatchIds([batchId]).close();

  console.log('Batch closed:', batchId);
}

closeBatch();
