# Deployment Guide for NexoNotes

## 🚀 Quick Deployment to Vercel

### Prerequisites
- GitHub account
- Vercel account
- Firebase project set up

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Initial commit with Firebase integration"
git push origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect it's a Next.js project

### Step 3: Configure Environment Variables
In your Vercel project dashboard:
1. Go to Settings > Environment Variables
2. Add the following variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Step 4: Deploy
1. Click "Deploy" in Vercel
2. Wait for deployment to complete
3. Your app will be available at `https://your-project-name.vercel.app`

## 🔧 Firebase Configuration

### 1. Enable Authentication
- Go to Firebase Console > Authentication
- Click "Get Started"
- Go to "Sign-in method" tab
- Enable "Email/Password"

### 2. Set up Firestore Database
- Go to Firebase Console > Firestore Database
- Click "Create database"
- Start in "test mode" for development
- Add the security rules from README.md

### 3. Set up Storage
- Go to Firebase Console > Storage
- Click "Get started"
- Start in "test mode" for development
- Add the storage rules from README.md

### 4. Get Configuration
- Go to Project Settings > General
- Scroll down to "Your apps"
- Click the web app icon
- Copy the configuration object

## 🔒 Security Rules

### Firestore Rules
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

### Storage Rules
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

## 🧪 Testing Your Deployment

1. **Test Authentication**
   - Try registering a new account
   - Try logging in
   - Verify logout works

2. **Test Note Creation**
   - Create a new note
   - Add some content and tags
   - Upload a file attachment

3. **Test Note Management**
   - View your notes on the dashboard
   - Search for notes
   - Filter by tags
   - Delete a note

4. **Test Responsive Design**
   - Check on mobile devices
   - Test different screen sizes

## 🐛 Troubleshooting

### Common Issues

1. **"Firebase: Error (auth/invalid-api-key)"**
   - Check that environment variables are set correctly in Vercel
   - Verify the API key is correct in Firebase Console

2. **"Permission denied" errors**
   - Check Firestore security rules
   - Ensure user is authenticated

3. **File upload not working**
   - Check Storage security rules
   - Verify storage bucket is configured

4. **Build failures**
   - Check that all environment variables are set
   - Verify Firebase configuration is correct

### Debug Steps

1. Check Vercel function logs
2. Check browser console for errors
3. Verify Firebase Console for authentication logs
4. Test with a fresh browser session

## 📈 Performance Optimization

1. **Enable Firebase Performance Monitoring**
2. **Set up Firebase Analytics**
3. **Configure CDN for static assets**
4. **Optimize images and file uploads**

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to your main branch. For other branches:
1. Push to a feature branch
2. Vercel creates a preview deployment
3. Test the preview
4. Merge to main for production deployment

## 📊 Monitoring

- Use Vercel Analytics for performance metrics
- Use Firebase Console for authentication and database monitoring
- Set up error tracking with Sentry (optional)

---

Your NexoNotes app should now be live and fully functional! 🎉
