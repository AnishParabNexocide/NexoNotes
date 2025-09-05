"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const mockUser = {
  name: "User",
  email: "user@example.com",
  avatar: "U",
};

const mockNotes = [
  {
    id: "1",
    title: "Meeting Notes - Q4 Planning",
    content:
      "Discussed quarterly goals and objectives for the upcoming quarter...",
    tags: ["work", "planning", "q4"],
    createdAt: "2024-08-20",
    updatedAt: "2024-08-20",
    hasAttachment: true,
  },
  {
    id: "2",
    title: "Personal Todo List",
    content: "1. Buy groceries\n2. Call dentist\n3. Finish project proposal...",
    tags: ["personal", "todo"],
    createdAt: "2024-08-19",
    updatedAt: "2024-08-21",
    hasAttachment: false,
  },
  {
    id: "3",
    title: "Book Summary: Atomic Habits",
    content: "Key takeaways from James Clear's Atomic Habits book...",
    tags: ["books", "self-improvement"],
    createdAt: "2024-08-18",
    updatedAt: "2024-08-18",
    hasAttachment: true,
  },
  {
    id: "4",
    title: "Recipe: Chocolate Chip Cookies",
    content: "Ingredients:\n- 2 cups flour\n- 1 cup sugar\n- 1/2 cup butter...",
    tags: ["recipes", "baking"],
    createdAt: "2024-08-17",
    updatedAt: "2024-08-17",
    hasAttachment: false,
  },
];

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [sortBy, setSortBy] = useState("updated");

  useEffect(() => {
    setNotes(mockNotes);
  }, []);

  const allTags = [...new Set(notes.flatMap((note) => note.tags))];

  const filteredNotes = notes
    .filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
    )
    .filter((note) => selectedTag === "" || note.tags.includes(selectedTag))
    .sort((a, b) => {
      if (sortBy === "updated") return new Date(b.updatedAt) - new Date(a.updatedAt);
      if (sortBy === "created") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl animate-ping"></div>
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-lg relative z-10 animate-fade-in-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link
                href="/"
                className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-indigo-600 hover:via-blue-600 hover:to-purple-600 transition-all duration-500 transform hover:scale-110"
              >
                NexoNotes
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/notes/create"
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-4 py-2 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 transform flex items-center space-x-2"
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
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                  {mockUser.avatar}
                </div>
                <span className="text-slate-800 font-medium">{mockUser.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 space-y-8">
        {/* Welcome */}
        <div className="animate-slide-up">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Welcome back, {mockUser.name}!
          </h1>
          <p className="text-slate-600">
            You have {notes.length} notes in your collection.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-lg p-6 animate-slide-up animation-delay-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Search Notes
              </label>
              <input
                type="text"
                placeholder="Search by title, content, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white/90 backdrop-blur-sm placeholder-slate-400 text-slate-800 font-medium transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Filter by Tag
              </label>
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white/90 backdrop-blur-sm text-slate-800 font-medium transition-all duration-300"
              >
                <option value="">All Tags</option>
                {allTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white/90 backdrop-blur-sm text-slate-800 font-medium transition-all duration-300"
              >
                <option value="updated">Last Updated</option>
                <option value="created">Date Created</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notes Grid */}
        {filteredNotes.length === 0 ? (
          <div className="text-center py-12 animate-fade-in">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-slate-900">
              No notes found
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              {searchTerm || selectedTag
                ? "Try adjusting your search or filters."
                : "Get started by creating your first note."}
            </p>
            <div className="mt-6">
              <Link
                href="/notes/create"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 transform"
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
                Create Note
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note, index) => (
              <Link
                key={note.id}
                href={`/notes/${note.id}`}
                className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 transform animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-slate-800 truncate">
                      {note.title}
                    </h3>
                    {note.hasAttachment && (
                      <svg
                        className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2"
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
                    )}
                  </div>

                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                    {truncateContent(note.content)}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {note.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                    {note.tags.length > 3 && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        +{note.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center text-xs text-slate-500">
                    <span>Updated {formatDate(note.updatedAt)}</span>
                    <span>Created {formatDate(note.createdAt)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
