import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

// Notes collection reference
const notesCollection = collection(db, 'notes');

// Create a new note
export const createNote = async (noteData, userId) => {
  try {
    const docRef = await addDoc(notesCollection, {
      ...noteData,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};

// Get all notes for a user
export const getUserNotes = async (userId) => {
  try {
    // First get all notes for the user (without ordering to avoid index requirement)
    const q = query(
      notesCollection,
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    
    // Sort in JavaScript instead of Firestore
    const notes = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate?.() || new Date()
    }));
    
    // Sort by updatedAt in descending order
    return notes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  } catch (error) {
    console.error('Error getting user notes:', error);
    throw error;
  }
};

// Get a single note by ID
export const getNote = async (noteId) => {
  try {
    const noteDoc = doc(notesCollection, noteId);
    const noteSnap = await getDoc(noteDoc);
    
    if (noteSnap.exists()) {
      const data = noteSnap.data();
      return {
        id: noteSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || new Date(),
        updatedAt: data.updatedAt?.toDate?.() || new Date()
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting note:', error);
    throw error;
  }
};

// Update a note
export const updateNote = async (noteId, updateData) => {
  try {
    const noteDoc = doc(notesCollection, noteId);
    await updateDoc(noteDoc, {
      ...updateData,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating note:', error);
    throw error;
  }
};

// Delete a note
export const deleteNote = async (noteId) => {
  try {
    const noteDoc = doc(notesCollection, noteId);
    await deleteDoc(noteDoc);
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};

// Search notes
export const searchNotes = async (userId, searchTerm) => {
  try {
    // Get all notes for the user (without ordering to avoid index requirement)
    const q = query(
      notesCollection,
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    
    const allNotes = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate?.() || new Date()
    }));

    // Filter notes based on search term
    const filteredNotes = allNotes.filter(note => 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (note.tags && note.tags.some(tag => 
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      ))
    );

    // Sort by updatedAt in descending order
    return filteredNotes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  } catch (error) {
    console.error('Error searching notes:', error);
    throw error;
  }
};
