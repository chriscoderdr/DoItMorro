import admin from "firebase-admin";
import * as fs from "fs";
import * as path from "path";

/**
 * Load and parse the service account files
 */
const mobileServiceAccountPath = path.resolve(
    process.cwd(),
    "firebase-service-account.config.json",
);
const mobileServiceAccount = JSON.parse(fs.readFileSync(mobileServiceAccountPath, "utf8"));

/**
 * Initialize Firebase Admin SDK for the Admin API
 */

/**
 * Initialize Firebase Admin SDK for the Mobile API
 */
const firebaseApp = admin.initializeApp(
    {
        credential: admin.credential.cert(mobileServiceAccount),
    },
    "mobile-project",
);

const firebaseAuth = firebaseApp.auth();

export { firebaseApp, firebaseAuth };
