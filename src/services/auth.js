/**
 * Authentication Service: Firebase Email/Password Authentication for Organizer Portal.
 * Handles sign in, sign out, and real-time auth state listener.
 */

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { app, isFirebaseReady } from "./db";

// Initialize Firebase Auth instance if Firebase is ready
export const auth = isFirebaseReady && app ? getAuth(app) : null;

/**
 * Sign in administrator with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{success: boolean, user?: object, error?: string}>}
 */
export async function signInAdmin(email, password) {
  if (!auth) {
    return {
      success: false,
      error: "Firebase Authentication is not configured. Please check environment variables.",
    };
  }

  const cleanEmail = (email || "").trim();
  const cleanPassword = (password || "").trim();

  if (!cleanEmail || !cleanPassword) {
    return {
      success: false,
      error: "Please enter both administrator email and password.",
    };
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, cleanPassword);
    return {
      success: true,
      user: userCredential.user,
    };
  } catch (err) {
    console.error("Firebase Auth sign-in error:", err.code, err.message);

    let friendlyMessage = "Sign-in failed. Please check your credentials.";
    switch (err.code) {
      case "auth/invalid-credential":
      case "auth/wrong-password":
      case "auth/user-not-found":
        friendlyMessage = "Invalid email or password. Please check your credentials and try again.";
        break;
      case "auth/invalid-email":
        friendlyMessage = "Please enter a valid email address.";
        break;
      case "auth/user-disabled":
        friendlyMessage = "This organizer account has been disabled.";
        break;
      case "auth/too-many-requests":
        friendlyMessage = "Too many failed login attempts. Please wait a moment and try again.";
        break;
      case "auth/network-request-failed":
        friendlyMessage = "Network error. Please check your internet connection.";
        break;
      default:
        friendlyMessage = err.message || "Failed to sign in. Please try again.";
    }

    return {
      success: false,
      error: friendlyMessage,
      code: err.code,
    };
  }
}

/**
 * Sign out current administrator
 */
export async function signOutAdmin() {
  if (!auth) return;
  try {
    await signOut(auth);
  } catch (err) {
    console.error("Firebase Auth sign-out error:", err);
    throw err;
  }
}

/**
 * Subscribe to real-time auth state changes
 * @param {Function} callback - Called with (user | null)
 * @returns {Function} Unsubscribe function
 */
export function subscribeToAuth(callback) {
  if (!auth) {
    // If auth is not available, notify with null
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}

/**
 * Get currently authenticated user synchronously
 * @returns {object|null}
 */
export function getCurrentUser() {
  return auth?.currentUser || null;
}
