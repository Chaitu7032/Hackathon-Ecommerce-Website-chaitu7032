// Mock Firebase functions for development

// Mock Firebase Auth functions
export const createUserWithEmailAndPassword = async (auth: any, email: string, password: string) => {
  console.log('Mock: createUserWithEmailAndPassword called with:', email);
  return {
    user: {
      uid: 'mock-uid-' + Date.now(),
      email: email,
      displayName: null,
      photoURL: null,
    }
  };
};

export const signInWithEmailAndPassword = async (auth: any, email: string, password: string) => {
  console.log('Mock: signInWithEmailAndPassword called with:', email);
  return {
    user: {
      uid: 'mock-uid-' + Date.now(),
      email: email,
      displayName: null,
      photoURL: null,
    }
  };
};

export const updateProfile = async (user: any, profile: any) => {
  console.log('Mock: updateProfile called with:', profile);
  return Promise.resolve();
};

export const onAuthStateChanged = (auth: any, callback: (user: any) => void) => {
  console.log('Mock: onAuthStateChanged called');
  // Immediately call with null user
  callback(null);
  return () => {}; // Unsubscribe function
};

export const signOut = async (auth: any) => {
  console.log('Mock: signOut called');
  return Promise.resolve();
};

// Mock Firestore functions
export const doc = (db: any, collection: string, id: string) => {
  console.log('Mock: doc called for:', collection, id);
  return { id: id, path: `${collection}/${id}` };
};

export const setDoc = async (docRef: any, data: any) => {
  console.log('Mock: setDoc called with:', data);
  return Promise.resolve();
};

export const getDoc = async (docRef: any) => {
  console.log('Mock: getDoc called');
  return {
    exists: () => false,
    data: () => null,
    id: docRef.id,
  };
};