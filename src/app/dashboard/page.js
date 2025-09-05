"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getUserNotes, searchNotes } from "@/lib/firestore";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [sortBy, setSortBy] = useState("updated");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        setError(null);
        const userNotes = await getUserNotes(user.uid);
        setNotes(userNotes);
      } catch (err) {
        console.error("Error fetching notes:", err);
        setError("Failed to load notes. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, [user]);

  // Handle search
  useEffect(() => {
    const performSearch = async () => {
      if (!user) return;
      
      try {
        if (!searchTerm.trim()) {
          // If no search term, fetch all notes
          const userNotes = await getUserNotes(user.uid);
          setNotes(userNotes);
        } else {
          // If search term exists, perform search
          const searchResults = await searchNotes(user.uid, searchTerm);
          setNotes(searchResults);
        }
      } catch (err) {
        console.error("Error fetching/searching notes:", err);
        setError("Failed to load notes. Please try again.");
      }
    };

    const timeoutId = setTimeout(performSearch, 300); // Debounce search
    return () => clearTimeout(timeoutId);
  }, [searchTerm, user]);

  // Get all unique tags
  const allTags = [...new Set(notes.flatMap((note) => note.tags || []))];

  // Filter and sort notes
  const filteredNotes = notes
    .filter((note) => selectedTag === "" || (note.tags && note.tags.includes(selectedTag)))
    .sort((a, b) => {
      if (sortBy === "updated") {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      } else if (sortBy === "created") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 animate-fade-in">
      {/* Header */}
      <header className="glass-effect shadow-elevation-2 border-b animate-fade-in-down sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link
                href="/"
                className="text-2xl font-bold text-gradient hover:scale-105 transition-all duration-300 animate-pop-up text-shadow-soft"
              >
                NexoNotes
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/notes/create"
                className="btn-primary-enhanced micro-interaction flex items-center space-x-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span>New Note</span>
              </Link>
              <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center font-semibold shadow-elevation-1 float-animation">
                  {user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"}
                </div>
                <span className="text-gray-700 font-medium text-shadow-soft">
                  {user?.displayName || user?.email || "User"}
                </span>
                <button
                  onClick={handleLogout}
                  className="ml-2 p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200"
                  title="Logout"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-slide-up">
          <div className="glass-effect rounded-2xl p-8 border shadow-elevation-2">
            <h1 className="text-4xl font-bold text-gradient mb-3 text-shadow-soft">
              Welcome back, {user?.displayName || "User"}! 👋
            </h1>
            <p className="text-gray-600 text-lg">
              You have{" "}
              <span className="font-semibold text-blue-600">
                {isLoading ? "..." : notes.length}
              </span>{" "}
              notes in your collection.
            </p>
            <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full pulse-animation"></div>
                <span>All systems operational</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Last sync: Just now</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="gradient-border mb-8 animate-slide-up animation-delay-200">
          <div className="gradient-border-inner">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span>Find Your Notes</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Search */}
              <div className="space-y-2">
                <label
                  htmlFor="search"
                  className="block text-sm font-medium text-gray-700"
                >
                  Search Notes
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="search"
                    placeholder="Search by title, content, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-elevation-1 hover:shadow-elevation-2 placeholder-black"
                  />
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Tag Filter */}
              <div className="space-y-2">
                <label
                  htmlFor="tag-filter"
                  className="block text-sm font-medium text-gray-700"
                >
                  Filter by Tag
                </label>
                <div className="relative">
                  <select
                    id="tag-filter"
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-elevation-1 hover:shadow-elevation-2 appearance-none bg-white placeholder-black"
                  >
                    <option value="">All Tags</option>
                    {allTags.map((tag) => (
                      <option key={tag} value={tag}>
                        #{tag}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* Sort */}
              <div className="space-y-2">
                <label
                  htmlFor="sort"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sort By
                </label>
                <div className="relative">
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-elevation-1 hover:shadow-elevation-2 appearance-none bg-white placeholder-black"
                  >
                    <option value="updated">📅 Last Updated</option>
                    <option value="created">🆕 Date Created</option>
                    <option value="title">🔤 Title</option>
                  </select>
                  <svg
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4 animate-fade-in">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="glass-effect rounded-2xl p-12 max-w-md mx-auto">
              <div className="float-animation mb-6">
                <svg
                  className="animate-spin h-12 w-12 text-blue-600 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Loading your notes...
              </h3>
              <p className="text-gray-600">
                Please wait while we fetch your content.
              </p>
            </div>
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="glass-effect rounded-2xl p-12 max-w-md mx-auto">
              <div className="mb-6">
                <svg
                  className="mx-auto h-16 w-16 text-gray-400 float-animation"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm || selectedTag
                  ? "No matching notes found"
                  : "No notes yet"}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || selectedTag
                  ? "Try adjusting your search criteria or create a new note."
                  : "Start building your knowledge base by creating your first note."}
              </p>
              <Link
                href="/notes/create"
                className="btn-primary-enhanced inline-flex items-center micro-interaction"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create Your First Note
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6 animate-slide-up animation-delay-300">
              <h2 className="text-2xl font-semibold text-gray-900">
                {searchTerm || selectedTag ? (
                  <>
                    Found {filteredNotes.length} note
                    {filteredNotes.length !== 1 ? "s" : ""}
                    {searchTerm && (
                      <span className="text-blue-600">
                        {" "}
                        for &ldquo;{searchTerm}&rdquo;
                      </span>
                    )}
                    {selectedTag && (
                      <span className="text-purple-600">
                        {" "}
                        in #{selectedTag}
                      </span>
                    )}
                  </>
                ) : (
                  `Your Notes (${filteredNotes.length})`
                )}
              </h2>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z"
                  />
                </svg>
                <span>
                  Sorted by{" "}
                  {sortBy === "updated"
                    ? "last updated"
                    : sortBy === "created"
                    ? "date created"
                    : "title"}
                </span>
              </div>
            </div>

            {/* Notes Grid */}
            <div className="notes-grid">
              {filteredNotes.map((note, index) => (
                <Link
                  key={note.id}
                  href={`/notes/${note.id}`}
                  className="dashboard-card group micro-interaction animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="p-6">
                    {/* Note Header */}
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 text-shadow-soft">
                        {note.title}
                      </h3>
                      <div className="flex items-center space-x-2 flex-shrink-0 ml-3">
                        {note.attachments && note.attachments.length > 0 && (
                          <div className="relative">
                            <svg
                              className="w-5 h-5 text-blue-500 group-hover:text-blue-600 transition-colors"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                              />
                            </svg>
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full pulse-animation"></div>
                          </div>
                        )}
                        <svg
                          className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Note Content Preview */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {truncateContent(note.content)}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {note.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 hover:from-blue-200 hover:to-purple-200 transition-all duration-200"
                          style={{
                            animationDelay: `${index * 100 + tagIndex * 50}ms`,
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                      {note.tags.length > 3 && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                          +{note.tags.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Note Footer */}
                    <div className="flex justify-between items-center text-xs text-gray-500 pt-3 border-t border-gray-100">
                      <div className="flex items-center space-x-1">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>Updated {formatDate(note.updatedAt)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-9 0h10a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z"
                          />
                        </svg>
                        <span>Created {formatDate(note.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </main>
      </div>
    </ProtectedRoute>
  );
}
