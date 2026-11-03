import {
  saveRsvp,
  subscribeToRsvps,
  deleteRsvp,
  isFirebaseReady,
} from './src/services/db.js';

async function testRsvpFlow() {
  console.log('🧪 Starting RSVP Flow and Database Verification...\n');
  console.log(`Database Mode: ${isFirebaseReady ? 'Live Cloud Firestore (Firebase credentials loaded)' : 'Local Fallback Store (No .env loaded in this test runner)'}`);

  let currentRsvps = [];
  const unsub = subscribeToRsvps((list) => {
    currentRsvps = list;
  });

  console.log(`✓ Initial baseline RSVP count: ${currentRsvps.length}`);
  const initialCount = currentRsvps.length;

  // -------------------------------------------------------------
  // TEST 1: First Guest RSVP Submission (Create-Only Flow)
  // -------------------------------------------------------------
  console.log('\n[TEST 1] Submitting first guest RSVP for "Tanmay Bhat" (create-only, no ID passed)...');
  const res1 = await saveRsvp({
    name: 'Tanmay Bhat',
    team: 'groom',
    preferredDate: '2027-01-28',
    needsJersey: true,
    jerseySize: 'XL',
  });
  console.log('✓ Result 1:', res1);

  if (!res1.success || !res1.docId) {
    throw new Error('Expected saveRsvp to return success: true and a valid docId');
  }
  if (res1.isUpdate !== false) {
    throw new Error(`Expected isUpdate: false on new guest submission, but got: ${res1.isUpdate}`);
  }

  const found1 = currentRsvps.find((r) => r.id === res1.docId);
  console.log('✓ Verified document 1 in store:', found1 ? `${found1.name} (ID: ${found1.id}, Squad: ${found1.team}, Size: ${found1.jerseySize})` : 'NOT FOUND');
  if (currentRsvps.length !== initialCount + 1) {
    throw new Error(`Expected count to increase by 1, but got ${currentRsvps.length}`);
  }

  // -------------------------------------------------------------
  // TEST 2: Second Guest Submission (Must create a DISTINCT document ID)
  // -------------------------------------------------------------
  console.log('\n[TEST 2] Submitting second guest RSVP for "Tanmay Bhat" with changed squad/size (create-only, no ID)...');
  const res2 = await saveRsvp({
    name: 'Tanmay Bhat',
    team: 'bride',
    preferredDate: '2027-01-28',
    needsJersey: true,
    jerseySize: 'L',
  });
  console.log('✓ Result 2:', res2);

  if (!res2.success || !res2.docId) {
    throw new Error('Expected saveRsvp to return success: true and a valid docId');
  }
  if (res2.isUpdate !== false) {
    throw new Error(`Expected isUpdate: false on second guest submission, but got: ${res2.isUpdate}`);
  }

  // CRITICAL ASSERTION: Two submissions must create two distinct document IDs
  if (res1.docId === res2.docId) {
    throw new Error(`Duplicate ID collision! Both submissions received identical docId: ${res1.docId}`);
  }
  console.log(`✓ Distinct IDs confirmed: Doc1 ID = "${res1.docId}", Doc2 ID = "${res2.docId}"`);

  // Verify total count increased by 2
  if (currentRsvps.length !== initialCount + 2) {
    throw new Error(`Expected store count to increase by 2 (baseline ${initialCount} + 2), but got ${currentRsvps.length}`);
  }
  console.log(`✓ Store count correctly reflects both distinct submissions: ${currentRsvps.length}`);

  // -------------------------------------------------------------
  // TEST 3: Organizer Admin Edit (Only Admin passes explicit ID to update)
  // -------------------------------------------------------------
  console.log('\n[TEST 3] Testing Organizer Admin edit on Doc1 (explicitly passing ID to update)...');
  const resAdminEdit = await saveRsvp({
    id: res1.docId,
    name: 'Tanmay Bhat (Organizer Edited)',
    team: 'groom',
    preferredDate: '2027-01-28',
    needsJersey: true,
    jerseySize: 'XXL',
  });
  console.log('✓ Result Admin Edit:', resAdminEdit);

  if (resAdminEdit.isUpdate !== true) {
    throw new Error(`Expected isUpdate: true when admin passes explicit ID, but got: ${resAdminEdit.isUpdate}`);
  }

  const updatedDoc1 = currentRsvps.find((r) => r.id === res1.docId);
  if (!updatedDoc1 || updatedDoc1.jerseySize !== 'XXL') {
    throw new Error('Expected Doc1 to be updated with new values!');
  }
  console.log(`✓ Admin update verified: ${updatedDoc1.name} (Size: ${updatedDoc1.jerseySize})`);

  // -------------------------------------------------------------
  // TEST 4: Cleanup & Teardown
  // -------------------------------------------------------------
  console.log('\n[TEST 4] Cleaning up test records...');
  await deleteRsvp(res1.docId);
  await deleteRsvp(res2.docId);

  if (currentRsvps.length !== initialCount) {
    throw new Error(`Expected count to return to baseline ${initialCount}, but got ${currentRsvps.length}`);
  }
  console.log(`✓ Cleaned up both test records. Store count is back to: ${currentRsvps.length}`);

  unsub();
  console.log('\n🎉 ALL UNIT & INTEGRATION TESTS PASSED SUCCESSFULLY!');
}

testRsvpFlow().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
