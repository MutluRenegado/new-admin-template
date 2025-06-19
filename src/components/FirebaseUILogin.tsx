'use client';

import { useEffect, useRef } from 'react';
import { getAuth, GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css'; // Import FirebaseUI styles

// Your Firebase config - replace with your actual config
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function FirebaseUILogin() {
  const uiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!uiRef.current) return;

    // FirebaseUI config
    const uiConfig = {
      signInOptions: [
        EmailAuthProvider.PROVIDER_ID,
        GoogleAuthProvider.PROVIDER_ID,
        // Add more providers here if needed
      ],
      signInSuccessUrl: '/', // Redirect after successful login
      tosUrl: '/terms',      // Terms of service url
      privacyPolicyUrl: '/privacy', // Privacy policy url
    };

    // Initialize the FirebaseUI Widget using Firebase.
    let ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(auth);

    ui.start(uiRef.current, uiConfig);

    // Cleanup UI on unmount
    return () => {
      ui.delete();
    };
  }, []);

  return (
    <div style={{ maxWidth: 320, margin: '3rem auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
        Sign in to Your App
      </h2>
      <div ref={uiRef}></div>
    </div>
  );
}
