import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { storage } from './firebase';

// Upload a file to Firebase Storage
export const uploadFile = async (file, userId, noteId) => {
  try {
    // Create a unique filename
    const timestamp = Date.now();
    const fileName = `${userId}/${noteId}/${timestamp}_${file.name}`;
    
    // Create a reference to the file
    const fileRef = ref(storage, fileName);
    
    // Upload the file
    const snapshot = await uploadBytes(fileRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return {
      name: file.name,
      size: file.size,
      type: file.type,
      url: downloadURL,
      path: fileName
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

// Upload multiple files
export const uploadMultipleFiles = async (files, userId, noteId) => {
  try {
    const uploadPromises = files.map(file => uploadFile(file, userId, noteId));
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    console.error('Error uploading multiple files:', error);
    throw error;
  }
};

// Delete a file from Firebase Storage
export const deleteFile = async (filePath) => {
  try {
    const fileRef = ref(storage, filePath);
    await deleteObject(fileRef);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

// Get file size in human readable format
export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// Get file icon based on file type
export const getFileIcon = (type) => {
  if (type.startsWith("image/")) {
    return "image";
  } else if (type.includes("pdf")) {
    return "pdf";
  } else if (type.includes("spreadsheet") || type.includes("excel")) {
    return "spreadsheet";
  } else if (type.includes("word") || type.includes("document")) {
    return "document";
  } else {
    return "file";
  }
};
