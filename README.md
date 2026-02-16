Eyes Playwright Standard ( Without Fixtures )

Pre-requisite
(1) set environment variable
APPLITOOLS_BATCH_ID = <custom_batch_id>
APPLITOOLS_API_KEY = <applitools_api_key>
APPLITOOLS_DONT_CLOSE_BATCHES=true

Make sure you have added slack/teams integration
![alt text](image.png)

![alt text](<screenshot/image copy 6.png>)

Execute 
(1) npx playwright test
(2) node closeBatchScript.js

![    ](<screenshot/image copy.png>)
![alt text](screenshot/s1.png)
![alt text](screenshot/image.png)

### Output 
Slack
![alt text](<screenshot/image copy 2.png>)

Teams
![alt text](<screenshot/image copy 3.png>)


Applitools Dashboard
![alt text](<screenshot/image copy 4.png>)

Reference
(1) https://applitools.com/docs/eyes/sdks/playwright-ts-standard/batch-close