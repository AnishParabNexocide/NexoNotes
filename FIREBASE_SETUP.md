# Firebase Setup Guide for NexoNotes

## 🎉 Your Firebase Project is Ready!

**Project ID:** `nexo-notes`  
**Project URL:** https://console.firebase.google.com/project/nexo-notes

## 🔧 Required Services Setup

### 1. Enable Authentication
1. Go to [Firebase Console](https://console.firebase.google.com/project/nexo-notes)
2. Click on "Authentication" in the left sidebar
3. Click "Get Started"
4. Go to "Sign-in method" tab
5. Click on "Email/Password"
6. Toggle "Enable" and click "Save"

### 2. Set up Firestore Database
1. Click on "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location (choose closest to your users)
5. Click "Done"

**Add Security Rules:**
1. Go to "Rules" tab in Firestore
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /notes/{noteId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

3. Click "Publish"

### 3. Set up Storage
1. Click on "Storage" in the left sidebar
2. Click "Get started"
3. Choose "Start in test mode" (for development)
4. Select the same location as Firestore
5. Click "Done"

**Add Security Rules:**
1. Go to "Rules" tab in Storage
2. Replace the default rules with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{userId}/{noteId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Click "Publish"

### 4. Enable Analytics (Optional)
1. Click on "Analytics" in the left sidebar
2. Click "Get started"
3. Follow the setup wizard
4. This will help you track app usage

## 🚀 Test Your Setup

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open your app:** http://localhost:3000

3. **Test the features:**
   - Register a new account
   - Login with your account
   - Create a new note
   - Upload a file attachment
   - Search and filter notes
   - Delete a note

## 🔍 Troubleshooting

### Common Issues:

1. **"Firebase: Error (auth/invalid-api-key)"**
   - Check that your `.env.local` file exists
   - Verify the API key is correct

2. **"Permission denied" errors**
   - Check Firestore security rules
   - Ensure user is authenticated

3. **File upload not working**
   - Check Storage security rules
   - Verify storage bucket is configured

4. **Build errors**
   - Make sure all environment variables are set
   - Check Firebase configuration

### Debug Steps:

1. Check browser console for errors
2. Check Firebase Console for authentication logs
3. Verify all services are enabled
4. Test with a fresh browser session

## 📊 Monitoring

- **Authentication:** Check "Users" tab in Authentication
- **Database:** Check "Data" tab in Firestore
- **Storage:** Check "Files" tab in Storage
- **Analytics:** Check "Analytics" dashboard

## 🎯 Next Steps

1. ✅ Firebase project created
2. ✅ Environment variables configured
3. ✅ App built successfully
4. 🔄 Enable Authentication, Firestore, and Storage
5. 🚀 Test the app locally
6. 📤 Deploy to Vercel

Your NexoNotes app is ready to go! 🎉
