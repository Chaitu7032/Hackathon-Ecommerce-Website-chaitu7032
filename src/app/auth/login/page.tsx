"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        // Login
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Check profile in Firestore
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          // If profile not found, create one
          await setDoc(docRef, {
            uid: user.uid,
            name: user.displayName || "",
            email: user.email,
          });
        }

        // Redirect to profile page
        router.push("/profile");

      } else {
        // Sign up
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Update displayName in Firebase Auth
        await updateProfile(user, { displayName: name });

        // Create user profile in Firestore
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name,
          email,
        });

        // Redirect to profile page
        router.push("/profile");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 transition-all duration-500">
      <div className="bg-white/40 dark:bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 rounded-l-xl font-semibold transition ${
              isLogin
                ? "bg-yellow-400 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 rounded-r-xl font-semibold transition ${
              !isLogin
                ? "bg-yellow-400 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            Sign Up
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="block mb-1 text-sm font-medium">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm"
              />
            </div>
          )}

          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium">Password</label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white/90 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400/60 transition"
              autoComplete={isLogin ? "current-password" : "new-password"}
            />
            <div className="mt-2 flex items-center gap-2 select-none">
              <input
                id="showPassword"
                type="checkbox"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-indigo-500 focus:ring-indigo-400/60 cursor-pointer"
              />
              <label htmlFor="showPassword" className="text-xs font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                {showPassword ? "Hide password" : "Show password"}
              </label>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm font-medium">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl font-semibold text-sm tracking-wide text-[#2A254B] dark:text-gray-900 bg-gradient-to-br from-yellow-400 via-amber-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 shadow-sm hover:shadow-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70 active:translate-y-px"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
