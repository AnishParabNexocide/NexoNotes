// Test Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBrtKK_izlT0_xiVidLA9zkls400QOhupo",
  authDomain: "nexo-notes.firebaseapp.com",
  projectId: "nexo-notes",
  storageBucket: "nexo-notes.firebasestorage.app",
  messagingSenderId: "133337654732",
  appId: "1:133337654732:web:1029e6f96580a51bc86969",
  measurementId: "G-13FGXQBT7X"
};

try {
  console.log('Testing Firebase configuration...');
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  console.log('✅ Firebase initialized successfully!');
  console.log('Auth domain:', auth.app.options.authDomain);
  console.log('Project ID:', auth.app.options.projectId);
} catch (error) {
  console.error('❌ Firebase initialization failed:', error);
}
