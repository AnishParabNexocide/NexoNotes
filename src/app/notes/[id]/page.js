"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

// Mock note data - in real app, this would come from API
const mockNotes = { /* your mockNotes object as before */ };

export default function NotePage() {
  const params = useParams();
  const router = useRouter();
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const noteData = mockNotes[params.id];
        if (noteData) {
          setNote(noteData);
        } else {
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Error fetching note:", error);
        router.push("/dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) fetchNote();
  }, [params.id, router]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (type) => {
    if (type.startsWith("image/"))
      return <svg className="w-5 h-5 text-green-500" /* ... */ />;
    if (type.includes("pdf"))
      return <svg className="w-5 h-5 text-red-500" /* ... */ />;
    if (type.includes("spreadsheet") || type.includes("excel"))
      return <svg className="w-5 h-5 text-green-600" /* ... */ />;
    return <svg className="w-5 h-5 text-blue-500" /* ... */ />;
  };

  const renderContent = (content) => {
    return content.split("\n").map((line, index) => {
      if (line.startsWith("# ")) return <h1 key={index} className="text-3xl font-bold text-gray-900 mb-4 mt-6">{line.slice(2)}</h1>;
      if (line.startsWith("## ")) return <h2 key={index} className="text-2xl font-semibold text-gray-800 mb-3 mt-5">{line.slice(3)}</h2>;
      if (line.startsWith("### ")) return <h3 key={index} className="text-xl font-medium text-gray-700 mb-2 mt-4">{line.slice(4)}</h3>;
      if (line.startsWith("- [ ]")) return <div key={index} className="flex items-center mb-1"><input type="checkbox" className="mr-2 h-4 w-4 text-blue-500 rounded border-gray-300" /> <span className="text-gray-700">{line.slice(5)}</span></div>;
      if (line.startsWith("- [x]")) return <div key={index} className="flex items-center mb-1"><input type="checkbox" checked className="mr-2 h-4 w-4 text-blue-500 rounded border-gray-300" /><span className="text-gray-700 line-through">{line.slice(5)}</span></div>;
      if (line.startsWith("- ")) return <li key={index} className="text-gray-700 mb-1">{line.slice(2)}</li>;
      if (line.match(/^\d+\./)) return <li key={index} className="text-gray-700 mb-1 list-decimal list-inside">{line}</li>;
      if (line.startsWith(">")) return <blockquote key={index} className="border-l-4 border-blue-400 pl-4 italic text-gray-600 my-4">{line.slice(1).trim()}</blockquote>;
      if (line.trim() === "") return <br key={index} />;
      return <p key={index} className="text-gray-700 mb-2">{line}</p>;
    });
  };

  if (isLoading)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center animate-pulse">
          <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-500 mx-auto" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-gray-500 mt-2">Loading note...</p>
        </div>
      </div>
    );

  if (!note)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Note not found</h2>
          <p className="text-gray-500 mb-4">The note you're looking for doesn't exist.</p>
          <Link href="/dashboard" className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 animate-fade-in">
      {/* Header */}
      <header className="bg-white shadow-md border-b animate-fade-in-down">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 hover:scale-110 transition-all duration-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-xl font-semibold text-gray-900 truncate max-w-md">{note.title}</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button onClick={() => setIsEditing(!isEditing)} className="text-gray-600 hover:text-blue-500 hover:scale-110 transition-all duration-200" title="Edit note">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <Link href="/" className="text-xl font-bold text-blue-500 hover:text-blue-700 transition-colors">NexoNotes</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Note Metadata */}
        <div className="bg-white rounded-lg shadow-md p-6 animate-slide-up">
          <div className="flex flex-wrap items-center justify-between mb-4">
            <div className="flex flex-wrap gap-2">
              {note.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">{tag}</span>
              ))}
            </div>
            <div className="text-sm text-gray-500 space-y-1">
              <div>Created: {formatDate(note.createdAt)}</div>
              <div>Updated: {formatDate(note.updatedAt)}</div>
            </div>
          </div>
        </div>

        {/* Note Content */}
        <div className="bg-white rounded-lg shadow-md p-8 animate-slide-up animation-delay-100 prose prose-lg max-w-none">
          {renderContent(note.content)}
        </div>

        {/* Attachments */}
        {note.attachments && note.attachments.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 animate-slide-up animation-delay-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Attachments ({note.attachments.length})</h3>
            <div className="space-y-3">
              {note.attachments.map((attachment) => (
                <div key={attachment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    {getFileIcon(attachment.type)}
                    <div>
                      <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(attachment.size)}</p>
                    </div>
                  </div>
                  <a href={attachment.url} className="text-blue-500 hover:text-blue-700 hover:scale-110 transition-all duration-200" title="Download file">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
