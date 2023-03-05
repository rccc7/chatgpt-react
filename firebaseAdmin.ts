import admin from 'firebase-admin'
import { getApps } from 'firebase-admin/app'
// Here we use the service account key which can be obtained at our Cloud firestore page.
// This way, we can access Firebase and Firestore db from backend.
const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
)

// Initialize only if there are not apps already initialized
if(!getApps().length){
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    })
}

const adminDb = admin.firestore();

export {adminDb};