import { createApp } from '../dist/app.js';
import { getDatabase } from '../dist/database.js';
import assert from 'node:assert';

async function runTests() {
  console.log('🧪 Starting Zippy Loan Connector Backend REST API Tests...\n');

  // Initialize DB & App
  getDatabase();
  const app = createApp();

  const server = app.listen(0); // Random free port
  const address = server.address();
  const port = typeof address === 'object' && address ? address.port : 5001;
  const baseUrl = `http://localhost:${port}`;

  try {
    // Test 1: Health Check Endpoint
    console.log('▶ Test 1: GET /api/v1/health');
    const healthRes = await fetch(`${baseUrl}/api/v1/health`);
    assert.strictEqual(healthRes.status, 200, 'Health check should return 200 OK');
    const healthData = await healthRes.json();
    assert.strictEqual(healthData.status, 'healthy');
    assert.strictEqual(healthData.database.status, 'connected');
    console.log('  ✔ Health check passed:', healthData.service, '| Database connected');

    // Test 2: Valid Loan Enquiry Submission
    console.log('\n▶ Test 2: POST /api/v1/loan-enquiries (Valid Payload)');
    const validPayload = {
      fullName: 'Venkatesh Rao',
      mobileNumber: '9848012345',
      email: 'venkatesh.rao@example.com',
      city: 'Hyderabad',
      loanCategory: 'Personal Loans',
      requiredAmount: 500000,
      employmentType: 'Salaried',
      monthlyIncome: 65000,
      additionalInfo: 'Interested in lowest interest personal loan referral',
      consent: true,
      sourceContext: 'Automated Integration Test'
    };

    const submitRes = await fetch(`${baseUrl}/api/v1/loan-enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validPayload)
    });

    assert.strictEqual(submitRes.status, 201, 'Should return 201 Created');
    const submitData = await submitRes.json();
    assert.strictEqual(submitData.success, true);
    assert.ok(submitData.referenceId.startsWith('ZIP-'), 'Reference ID must follow ZIP-YYYYMMDD-XXXX convention');
    console.log('  ✔ Valid submission created successfully. Ref ID:', submitData.referenceId);

    // Test 3: Fetch Enquiry by Reference ID
    console.log('\n▶ Test 3: GET /api/v1/loan-enquiries/:refId');
    const fetchRes = await fetch(`${baseUrl}/api/v1/loan-enquiries/${submitData.referenceId}`);
    assert.strictEqual(fetchRes.status, 200, 'Should return 200 OK');
    const fetchData = await fetchRes.json();
    assert.strictEqual(fetchData.data.referenceId, submitData.referenceId);
    assert.strictEqual(fetchData.data.loanCategory, 'Personal Loans');
    assert.strictEqual(fetchData.data.city, 'Hyderabad');
    console.log('  ✔ Retrieved enquiry by reference ID:', fetchData.data.referenceId, '| Status:', fetchData.data.status);

    // Test 4: Validation Failure on Invalid Indian Mobile Number
    console.log('\n▶ Test 4: POST /api/v1/loan-enquiries (Invalid Mobile Number)');
    const invalidMobilePayload = {
      ...validPayload,
      mobileNumber: '1234567890' // Starts with 1 (not 6-9)
    };

    const badMobileRes = await fetch(`${baseUrl}/api/v1/loan-enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invalidMobilePayload)
    });

    assert.strictEqual(badMobileRes.status, 400, 'Should return 400 Bad Request');
    const badMobileData = await badMobileRes.json();
    assert.strictEqual(badMobileData.success, false);
    assert.strictEqual(badMobileData.error, 'VALIDATION_ERROR');
    console.log('  ✔ Correctly rejected invalid mobile number:', badMobileData.details.mobileNumber);

    // Test 5: Validation Failure on Missing Consent
    console.log('\n▶ Test 5: POST /api/v1/loan-enquiries (Missing Consent)');
    const noConsentPayload = {
      ...validPayload,
      consent: false
    };

    const noConsentRes = await fetch(`${baseUrl}/api/v1/loan-enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(noConsentPayload)
    });

    assert.strictEqual(noConsentRes.status, 400, 'Should return 400 Bad Request');
    const noConsentData = await noConsentRes.json();
    assert.strictEqual(noConsentData.success, false);
    console.log('  ✔ Correctly rejected enquiry with missing consent');

    // Test 6: Root Welcome Endpoint
    console.log('\n▶ Test 6: GET /');
    const rootRes = await fetch(`${baseUrl}/`);
    assert.strictEqual(rootRes.status, 200);
    const rootData = await rootRes.json();
    assert.strictEqual(rootData.service, 'Zippy ICICI Loan Connector REST API');
    console.log('  ✔ Root endpoint verified');

    console.log('\n🎉 ALL BACKEND API INTEGRATION TESTS PASSED SUCCESSFULLY (6/6)!');
  } finally {
    server.close();
  }
}

runTests().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
