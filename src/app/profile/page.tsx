"use client";

import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig"; // real or mock based on env
import { onAuthStateChanged, doc, getDoc } from "../mockFirebase";
import MainLayout from "../component/MainLayout";

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserProfile(docSnap.data());
        } else {
          setUserProfile({ name: user.displayName, email: user.email });
        }
      } else {
        setUserProfile(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
        {!userProfile ? (
          <p className="text-lg font-semibold">Please log in to view profile.</p>
        ) : (
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg max-w-md w-full">
            <h1 className="text-2xl font-bold mb-4">User Profile</h1>
            <p><strong>Name:</strong> {userProfile.name}</p>
            <p><strong>Email:</strong> {userProfile.email}</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
