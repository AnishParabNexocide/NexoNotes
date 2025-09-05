# NexoNotes - Full-Stack Note-Taking App

A modern, full-stack note-taking application built with Next.js and Firebase. Features authentication, real-time data sync, file uploads, and a beautiful responsive UI.

## 🚀 Features

- **Authentication**: Firebase Auth with email/password
- **Real-time Database**: Firestore for storing notes and user data
- **File Storage**: Firebase Storage for attachments
- **Rich Text Editor**: Create formatted notes with text styling
- **Search & Filter**: Find notes by title, content, or tags
- **Responsive Design**: Beautiful UI that works on all devices
- **Protected Routes**: Secure access to user-specific content
- **CRUD Operations**: Create, read, update, and delete notes

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase account
- Git

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd nexo-notes
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable the following services:
   - **Authentication** (Email/Password)
   - **Firestore Database** (Start in test mode)
   - **Storage** (Start in test mode)

4. Go to Project Settings > General > Your apps
5. Click "Add app" and select Web
6. Copy the Firebase configuration

### 4. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 5. Firebase Security Rules

Update your Firestore rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Notes collection - users can only access their own notes
    match /notes/{noteId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

Update your Storage rules:

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

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard page
│   ├── login/            # Login page
│   ├── register/         # Registration page
│   ├── notes/            # Notes pages
│   │   ├── create/       # Create note page
│   │   └── [id]/         # Individual note page
│   ├── globals.css       # Global styles
│   └── layout.js         # Root layout
├── components/           # Reusable components
│   └── ProtectedRoute.js # Route protection wrapper
├── contexts/            # React contexts
│   └── AuthContext.js   # Authentication context
└── lib/                 # Utility libraries
    ├── firebase.js      # Firebase configuration
    ├── firestore.js     # Firestore operations
    └── storage.js       # Storage operations
```

## 🔐 Authentication Flow

1. **Registration**: Users create accounts with email/password
2. **Login**: Secure authentication with Firebase Auth
3. **Protected Routes**: Automatic redirect to login if not authenticated
4. **Persistent Sessions**: Users stay logged in across browser sessions

## 📝 Note Management

- **Create**: Rich text editor with formatting options
- **Read**: View notes with markdown-like rendering
- **Update**: Edit existing notes (future feature)
- **Delete**: Remove notes with confirmation
- **Search**: Find notes by title, content, or tags
- **Filter**: Sort by date created, updated, or title

## 📎 File Uploads

- Support for images, PDFs, documents
- Drag & drop interface
- File size validation
- Secure storage with Firebase Storage

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to add all Firebase environment variables in your Vercel project settings.

## 🧪 Testing

```bash
# Run the development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 UI Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark/Light Mode**: Automatic theme detection
- **Animations**: Smooth transitions and micro-interactions
- **Loading States**: User-friendly loading indicators
- **Error Handling**: Clear error messages and recovery options

## 🔒 Security Features

- **Authentication Required**: All note operations require login
- **User Isolation**: Users can only access their own notes
- **Input Validation**: Form validation and sanitization
- **Secure Storage**: Files stored securely in Firebase Storage

## 📱 Mobile Support

- Responsive design that works on all screen sizes
- Touch-friendly interface
- Optimized for mobile performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the Firebase console for errors
2. Verify environment variables are set correctly
3. Ensure Firebase services are enabled
4. Check browser console for client-side errors

## 🔮 Future Features

- [ ] Real-time collaboration
- [ ] Note sharing
- [ ] Categories and folders
- [ ] Export to PDF
- [ ] Offline support
- [ ] Mobile app
- [ ] Advanced search filters
- [ ] Note templates

---

Built with ❤️ using Next.js and Firebase