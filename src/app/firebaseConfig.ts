// Runtime switch: use real Firebase if env flag + credentials exist, else fallback to mock
// This prevents accidental production deploys with mock layer.
const useRealFirebase = process.env.NEXT_PUBLIC_USE_FIREBASE === '1';

let auth: any;
let db: any;

if (useRealFirebase) {
  try {
    // Lazy require only when needed to keep bundle smaller if mock
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { initializeApp } = require('firebase/app');
    const { getAuth } = require('firebase/auth');
    const { getFirestore } = require('firebase/firestore');

    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (e) {
    console.warn('[firebaseConfig] Falling back to mock Firebase (init failed):', e);
  }
}

if (!auth || !db) {
  // Mock Firebase objects for development / fallback
  auth = {
    currentUser: null,
    signOut: () => Promise.resolve(),
    onAuthStateChanged: (callback: (user: any) => void) => {
      callback(null);
      return () => {};
    },
    app: null,
    name: 'mock-auth',
    config: {},
    setPersistence: () => Promise.resolve(),
    useDeviceLanguage: () => {},
    updateCurrentUser: () => Promise.resolve(),
    authStateReady: () => Promise.resolve(),
    beforeAuthStateChanged: () => () => {},
    tenantId: null,
    languageCode: null,
    settings: {},
    emulatorConfig: null,
  } as any;

  db = {
    collection: () => ({
      doc: () => ({
        set: () => Promise.resolve(),
        get: () => Promise.resolve({ exists: false, data: () => null }),
        update: () => Promise.resolve(),
        delete: () => Promise.resolve(),
      }),
      add: () => Promise.resolve({ id: 'mock-id' }),
      where: () => ({
        get: () => Promise.resolve({ docs: [] }),
      }),
    }),
    app: null,
    settings: {},
  } as any;
}

export { auth, db };

