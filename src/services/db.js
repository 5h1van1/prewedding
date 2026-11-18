/**
 * Database Service: Real-time Cloud Firestore with Local Fallback Store.
 *
 * Saves to the "rsvps" collection in Firebase Firestore when credentials exist in .env.
 * Uses unique document IDs per submission to prevent accidental overwriting of guests.
 * Maintains real-time public squad counter at "stats/squads".
 * If credentials are not configured, seamlessly runs in local fallback mode.
 */

import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  writeBatch,
  increment,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Safe environment variable resolution (Vite browser or Node)
const env = (typeof import.meta !== "undefined" && import.meta.env)
  ? import.meta.env
  : (typeof process !== "undefined" && process.env ? process.env : {});

// Firebase credentials from environment variables
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
};

// Check if valid Firebase credentials exist
export const isFirebaseReady = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  !String(firebaseConfig.apiKey).includes("YOUR_")
);

let app = null;
let db = null;
let auth = null;

if (isFirebaseReady) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    if (typeof window !== "undefined") {
      console.log("🔥 Firebase Firestore connected successfully to project:", firebaseConfig.projectId);
    }
  } catch (err) {
    console.warn("⚠️ Firebase init failed, falling back to local storage:", err);
    app = null;
    db = null;
    auth = null;
  }
} else {
  if (typeof window !== "undefined") {
    console.info("ℹ️ Running in local fallback store mode. Configure .env for Cloud Firestore.");
  }
}

export { app, db, auth };

// -------------------------------------------------------------
// LOCAL FALLBACK STORE & DEMO SEED DATA
// -------------------------------------------------------------
const LOCAL_STORAGE_KEY = "wedding_turf_rsvps_store";
const LOCAL_EVENT_KEY = "wedding_turf_rsvp_updated";

const INITIAL_DEMO_RSVPS = [
  {
    id: "demo_arjun_mehta",
    name: "Arjun Mehta",
    team: "groom",
    preferredDate: "2027-01-28",
    needsJersey: true,
    jerseySize: "L",
    jerseyNumber: "10",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    source: "demo",
  },
  {
    id: "demo_priya_sharma",
    name: "Priya Sharma",
    team: "bride",
    preferredDate: "2027-01-28",
    needsJersey: true,
    jerseySize: "S",
    jerseyNumber: "7",
    createdAt: new Date(Date.now() - 86400000 * 2.5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2.5).toISOString(),
    source: "demo",
  },
  {
    id: "demo_rohit_verma",
    name: "Rohit Verma",
    team: "groom",
    preferredDate: "2027-01-28",
    needsJersey: true,
    jerseySize: "XL",
    jerseyNumber: "18",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    source: "demo",
  },
  {
    id: "demo_sneha_patel",
    name: "Sneha Patel",
    team: "bride",
    preferredDate: "2027-01-28",
    needsJersey: true,
    jerseySize: "M",
    jerseyNumber: "99",
    createdAt: new Date(Date.now() - 86400000 * 1.5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1.5).toISOString(),
    source: "demo",
  },
  {
    id: "demo_vikram_singh",
    name: "Vikram Singh",
    team: "groom",
    preferredDate: "2027-01-28",
    needsJersey: false,
    jerseySize: "None",
    jerseyNumber: "None",
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    source: "demo",
  },
  {
    id: "demo_tanvi_deshmukh",
    name: "Tanvi Deshmukh",
    team: "bride",
    preferredDate: "2027-01-28",
    needsJersey: true,
    jerseySize: "S",
    jerseyNumber: "17",
    createdAt: new Date(Date.now() - 86400000 * 0.5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 0.5).toISOString(),
    source: "demo",
  },
];

// Safe storage resolution for Browser & Node environments
let memoryFallbackStore = null;
const safeStorage = {
  getItem: (key) => {
    if (typeof localStorage !== "undefined") return localStorage.getItem(key);
    return memoryFallbackStore;
  },
  setItem: (key, val) => {
    if (typeof localStorage !== "undefined") localStorage.setItem(key, val);
    else memoryFallbackStore = val;
  },
};

const safeWindow = typeof window !== "undefined" ? window : null;

export function getLocalRsvps() {
  try {
    const raw = safeStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      safeStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_RSVPS));
      return INITIAL_DEMO_RSVPS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Local storage read error", e);
    return INITIAL_DEMO_RSVPS;
  }
}

const memorySubscribers = new Set();

function setLocalRsvps(data) {
  try {
    safeStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    memorySubscribers.forEach((cb) => {
      try { cb(data); } catch (err) {}
    });
    if (safeWindow) {
      safeWindow.dispatchEvent(new Event(LOCAL_EVENT_KEY));
    }
  } catch (e) {
    console.error("Local storage write error", e);
  }
}

/**
 * Generate a cryptographically random unique document ID
 */
export function generateUniqueId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID().replace(/-/g, "").slice(0, 20);
  }
  return `rsvp_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
}

/**
 * Legacy helper for backwards-compatibility
 */
export function generateDocId(name) {
  return name.trim().toLowerCase().replace(/[^a-z0-9]/g, "_").slice(0, 50);
}

// -------------------------------------------------------------
// PUBLIC DATABASE API
// -------------------------------------------------------------

/**
 * Save an RSVP to Cloud Firestore (or local fallback store).
 * Uses unique document IDs to prevent accidental overwriting of guest records.
 * For new guest submissions, atomically bumps the public squad counter at stats/squads.
 *
 * @param {object} rsvpData - Guest RSVP payload (optionally including previousTeam for edits)
 * @returns {Promise<{success: boolean, docId: string, isCloud: boolean, isUpdate?: boolean, savedLocally?: boolean, error?: string}>}
 */
export async function saveRsvp(rsvpData) {
  const nowIso = new Date().toISOString();
  const cleanName = (rsvpData.name || "").trim();
  const isUpdate = Boolean(rsvpData.id);

  // Clean data payload matching strict Firestore schema
  const cleanRecord = {
    name: cleanName,
    team: rsvpData.team === "bride" ? "bride" : "groom",
    preferredDate: rsvpData.preferredDate || "2027-01-28",
    needsJersey: Boolean(rsvpData.needsJersey),
    jerseySize: rsvpData.needsJersey ? (rsvpData.jerseySize || "M") : "None",
    jerseyNumber: rsvpData.needsJersey ? (String(rsvpData.jerseyNumber || "").trim().slice(0, 10) || "None") : "None",
  };

  // 1. CLOUD FIRESTORE WRITE
  if (db) {
    try {
      const statsRef = doc(db, "stats", "squads");

      if (isUpdate) {
        const docRef = doc(db, "rsvps", rsvpData.id);
        const docId = docRef.id;

        // Admin edit: check if squad changed
        if (rsvpData.previousTeam && rsvpData.previousTeam !== cleanRecord.team) {
          const batch = writeBatch(db);
          batch.set(docRef, {
            ...cleanRecord,
            id: docId,
            updatedAt: serverTimestamp(),
            source: "cloud",
          }, { merge: true });

          batch.update(statsRef, {
            [rsvpData.previousTeam]: increment(-1),
            [cleanRecord.team]: increment(1),
          });

          try {
            await batch.commit();
          } catch (batchErr) {
            console.warn("⚠️ Batch update with squad counter failed, falling back to plain setDoc:", batchErr);
            await setDoc(docRef, {
              ...cleanRecord,
              id: docId,
              updatedAt: serverTimestamp(),
              source: "cloud",
            }, { merge: true });
          }
        } else {
          // Standard admin edit without squad change
          await setDoc(docRef, {
            ...cleanRecord,
            id: docId,
            updatedAt: serverTimestamp(),
            source: "cloud",
          }, { merge: true });
        }

        // Update local cache
        const localList = getLocalRsvps();
        const existingIdx = localList.findIndex((item) => item.id === docId);
        const localEntry = {
          ...cleanRecord,
          id: docId,
          createdAt: existingIdx >= 0 ? localList[existingIdx].createdAt : nowIso,
          updatedAt: nowIso,
          source: "cloud",
        };
        if (existingIdx >= 0) {
          localList[existingIdx] = localEntry;
        } else {
          localList.unshift(localEntry);
        }
        setLocalRsvps(localList);

        return {
          success: true,
          docId,
          isCloud: true,
          isUpdate: true,
        };
      }

      // -------------------------------------------------------------
      // New RSVP Submission: Atomic writeBatch with stats/squads +1 bump
      // -------------------------------------------------------------
      const colRef = collection(db, "rsvps");
      const docRef = doc(colRef);
      const docId = docRef.id;

      const batch = writeBatch(db);
      batch.set(docRef, {
        ...cleanRecord,
        id: docId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        source: "cloud",
      });

      batch.update(statsRef, {
        [cleanRecord.team]: increment(1),
        lastRsvpId: docId,
      });

      try {
        await batch.commit();
      } catch (batchErr) {
        console.warn("⚠️ Batch write with stats/squads counter failed, falling back to plain setDoc for RSVP:", batchErr);
        // Fall back to plain setDoc of the RSVP alone so RSVP is NEVER lost
        await setDoc(docRef, {
          ...cleanRecord,
          id: docId,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          source: "cloud",
        });
      }

      // Update local cache for smooth offline resiliency
      const localList = getLocalRsvps();
      const localEntry = {
        ...cleanRecord,
        id: docId,
        createdAt: nowIso,
        updatedAt: nowIso,
        source: "cloud",
      };
      localList.unshift(localEntry);
      setLocalRsvps(localList);

      return {
        success: true,
        docId,
        isCloud: true,
        isUpdate: false,
      };
    } catch (err) {
      console.error("❌ Cloud Firestore save failed:", err.code, err.message);

      // Save to local storage as an emergency offline backup so data is NEVER lost
      const fallbackId = rsvpData.id || generateUniqueId();
      const localList = getLocalRsvps();
      localList.unshift({
        ...cleanRecord,
        id: fallbackId,
        createdAt: nowIso,
        updatedAt: nowIso,
        source: "offline_backup",
      });
      setLocalRsvps(localList);

      return {
        success: false,
        error: err.message || "Failed to save RSVP to cloud database.",
        code: err.code,
        docId: fallbackId,
        savedLocally: true,
        isCloud: false,
      };
    }
  }

  // 2. LOCAL FALLBACK STORE (Demo / Testing Mode without Firebase credentials)
  const docId = rsvpData.id || generateUniqueId();
  const current = getLocalRsvps();
  const existingIdx = current.findIndex((item) => item.id === docId);

  const localRecord = {
    ...cleanRecord,
    id: docId,
    createdAt: isUpdate && existingIdx >= 0 ? current[existingIdx].createdAt : nowIso,
    updatedAt: nowIso,
    source: "local",
  };

  if (existingIdx >= 0) {
    current[existingIdx] = localRecord;
  } else {
    current.unshift(localRecord);
  }

  setLocalRsvps(current);
  return {
    success: true,
    docId,
    isCloud: false,
    isOffline: true,
    isUpdate,
  };
}

/**
 * Subscribe to the public real-time squad counts at stats/squads.
 * Only reads totals (bride and groom counts), never exposing guest list data.
 * If Firestore read fails or stats/squads doc does not exist, provides null counts.
 * Demo/mock data is strictly restricted to local fallback mode (when Firebase keys are absent).
 *
 * @param {Function} callback - Receives { bride: number|null, groom: number|null, isReady: boolean, isLocal?: boolean }
 * @returns {Function} Unsubscribe function
 */
export function subscribeToSquadCounts(callback) {
  if (db) {
    try {
      const statsRef = doc(db, "stats", "squads");
      const unsubscribe = onSnapshot(
        statsRef,
        (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            const bride = typeof data.bride === "number" ? data.bride : null;
            const groom = typeof data.groom === "number" ? data.groom : null;
            callback({
              bride,
              groom,
              isReady: bride !== null && groom !== null,
              isLocal: false,
            });
          } else {
            // Document does not exist yet (requires admin Recount)
            callback({
              bride: null,
              groom: null,
              isReady: false,
              isLocal: false,
            });
          }
        },
        (err) => {
          console.warn("Firestore stats/squads subscription error:", err.code, err.message);
          callback({
            bride: null,
            groom: null,
            isReady: false,
            isLocal: false,
            error: err,
          });
        }
      );
      return unsubscribe;
    } catch (err) {
      console.warn("Firestore stats/squads onSnapshot setup error:", err);
      callback({
        bride: null,
        groom: null,
        isReady: false,
        isLocal: false,
        error: err,
      });
      return () => {};
    }
  }

  // Local fallback mode (when no Firebase keys are configured)
  const computeLocalCounts = () => {
    const list = getLocalRsvps();
    const bride = list.filter((r) => r.team === "bride").length;
    const groom = list.filter((r) => r.team === "groom").length;
    callback({
      bride,
      groom,
      isReady: true,
      isLocal: true,
    });
  };

  memorySubscribers.add(computeLocalCounts);
  computeLocalCounts();

  const handleUpdate = () => computeLocalCounts();

  if (safeWindow) {
    safeWindow.addEventListener(LOCAL_EVENT_KEY, handleUpdate);
    safeWindow.addEventListener("storage", handleUpdate);
  }

  return () => {
    memorySubscribers.delete(computeLocalCounts);
    if (safeWindow) {
      safeWindow.removeEventListener(LOCAL_EVENT_KEY, handleUpdate);
      safeWindow.removeEventListener("storage", handleUpdate);
    }
  };
}

/**
 * Recount squad totals from all loaded RSVPs and update/create stats/squads in Firestore.
 * Admin-only operation. Also serves as the initial setup that creates stats/squads.
 *
 * @param {Array} rsvpsList - Array of RSVP objects loaded in admin dashboard
 * @returns {Promise<{success: boolean, bride: number, groom: number, error?: string, isLocal?: boolean}>}
 */
export async function recountSquads(rsvpsList = []) {
  const brideCount = rsvpsList.filter((r) => r.team === "bride").length;
  const groomCount = rsvpsList.filter((r) => r.team === "groom").length;

  if (db) {
    try {
      const statsRef = doc(db, "stats", "squads");
      await setDoc(statsRef, {
        bride: brideCount,
        groom: groomCount,
        lastRsvpId: "",
      });
      return { success: true, bride: brideCount, groom: groomCount, isLocal: false };
    } catch (err) {
      console.error("Firestore recountSquads error:", err);
      return { success: false, bride: brideCount, groom: groomCount, error: err.message || "Failed to update stats/squads" };
    }
  }

  // Local fallback mode
  if (safeWindow) {
    safeWindow.dispatchEvent(new Event(LOCAL_EVENT_KEY));
  }
  return { success: true, bride: brideCount, groom: groomCount, isLocal: true };
}

/**
 * Subscribe to real-time RSVPs (Admin feature only).
 * Calls callback(rsvpsList) immediately and on any changes in Firestore.
 *
 * @param {Function} callback - Receives array of RSVP objects
 * @param {Function} [onError] - Optional error handler
 * @returns {Function} Unsubscribe function
 */
export function subscribeToRsvps(callback, onError) {
  if (db) {
    try {
      const q = collection(db, "rsvps");
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const list = [];
          snapshot.forEach((docSnapshot) => {
            const data = docSnapshot.data();
            list.push({
              id: docSnapshot.id,
              ...data,
              createdAt: data.createdAt?.toDate
                ? data.createdAt.toDate().toISOString()
                : (data.createdAt || new Date().toISOString()),
              updatedAt: data.updatedAt?.toDate
                ? data.updatedAt.toDate().toISOString()
                : (data.updatedAt || new Date().toISOString()),
              isCloud: true,
            });
          });
          callback(list);
        },
        (err) => {
          console.warn("Firestore subscription event error:", err.code, err.message);
          if (onError) {
            onError(err);
          } else {
            callback(getLocalRsvps());
          }
        }
      );
      return unsubscribe;
    } catch (err) {
      console.warn("Firestore onSnapshot setup error:", err);
      if (onError) onError(err);
      return () => {};
    }
  }

  // Local Storage subscription for offline / demo mode
  const handleUpdate = () => {
    callback(getLocalRsvps());
  };

  memorySubscribers.add(callback);

  if (safeWindow) {
    safeWindow.addEventListener(LOCAL_EVENT_KEY, handleUpdate);
    safeWindow.addEventListener("storage", handleUpdate);
  }

  // Initial call with local data
  callback(getLocalRsvps());

  return () => {
    memorySubscribers.delete(callback);
    if (safeWindow) {
      safeWindow.removeEventListener(LOCAL_EVENT_KEY, handleUpdate);
      safeWindow.removeEventListener("storage", handleUpdate);
    }
  };
}

/**
 * Delete an RSVP from Firestore and local store (Admin feature).
 * In Firestore, atomically decrements the matching squad counter in stats/squads.
 *
 * @param {string} docId - RSVP document ID
 * @param {string} [team] - Guest's squad ('bride' or 'groom') to decrement counter
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function deleteRsvp(docId, team) {
  if (db) {
    try {
      const statsRef = doc(db, "stats", "squads");
      if (team === "bride" || team === "groom") {
        const batch = writeBatch(db);
        batch.delete(doc(db, "rsvps", docId));
        batch.update(statsRef, {
          [team]: increment(-1),
        });

        try {
          await batch.commit();
        } catch (batchErr) {
          console.warn("⚠️ Batch delete with squad counter failed, falling back to plain deleteDoc:", batchErr);
          await deleteDoc(doc(db, "rsvps", docId));
        }
      } else {
        await deleteDoc(doc(db, "rsvps", docId));
      }
    } catch (err) {
      console.error("Firestore delete error:", err);
      return { success: false, error: err.message };
    }
  }

  const current = getLocalRsvps();
  const filtered = current.filter((item) => item.id !== docId);
  setLocalRsvps(filtered);
  return { success: true };
}

/**
 * Update an RSVP record directly (Admin feature)
 *
 * @param {string} docId
 * @param {object} updatedFields
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function updateRsvp(docId, updatedFields) {
  return saveRsvp({
    ...updatedFields,
    id: docId,
  });
}

/**
 * Reset / Seed demo data for testing
 */
export function resetDemoData() {
  setLocalRsvps(INITIAL_DEMO_RSVPS);
}
