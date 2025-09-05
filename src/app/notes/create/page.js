"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function CreateNote() {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });

  const [attachments, setAttachments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileSelect = (files) => {
    const newAttachments = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
    }));
    setAttachments((prev) => [...prev, ...newAttachments]);
  };

  const handleFileInputChange = (e) => {
    if (e.target.files) {
      handleFileSelect(e.target.files);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const removeAttachment = (id) => {
    setAttachments((prev) => prev.filter((att) => att.id !== id));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (type) => {
    if (type.startsWith("image/")) {
      return (
        <svg
          className="w-6 h-6 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      );
    } else if (type.includes("pdf")) {
      return (
        <svg
          className="w-6 h-6 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      );
    } else {
      return (
        <svg
          className="w-6 h-6 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Note data:", {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        attachments: attachments.map((att) => ({
          name: att.name,
          size: att.size,
          type: att.type,
        })),
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("Error creating note:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 animate-fade-in">
      {/* Header */}
      <header className="bg-white shadow-md border-b animate-fade-in-down">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900 hover:scale-110 transition-transform duration-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 tracking-wide">
                Create New Note
              </h1>
            </div>
            <Link
              href="/"
              className="text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors"
            >
              NexoNotes
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-up border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Note Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter a descriptive title for your note..."
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
            />
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-up animation-delay-100 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <label
              htmlFor="content"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Note Content
            </label>
            <textarea
              id="content"
              name="content"
              required
              rows={12}
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Start writing your note content here..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 resize-none"
            />
          </div>

          {/* Tags */}
          <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-up animation-delay-200 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <label
              htmlFor="tags"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Tags (optional)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="work, personal, important (separate with commas)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
            />
            <p className="mt-1 text-sm text-gray-500">
              Add tags to organize your notes. Separate multiple tags with
              commas.
            </p>
          </div>

          {/* File Upload */}
          <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-up animation-delay-300 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Attachments (optional)
            </label>

            {/* Drop Zone */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                dragActive
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <svg
                className="mx-auto h-12 w-12 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <div className="space-y-2">
                <p className="text-lg font-medium text-gray-900">
                  {dragActive
                    ? "Drop files here"
                    : "Drop files here, or click to select"}
                </p>
                <p className="text-sm text-gray-500">
                  Upload images, PDFs, documents, and more
                </p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:scale-105 transition-all duration-200"
                >
                  Select Files
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileInputChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.svg"
                />
              </div>
            </div>

            {/* Attached Files */}
            {attachments.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Attached Files ({attachments.length})
                </h4>
                <div className="space-y-2">
                  {attachments.map((attachment) => (
                    <div
                      key={attachment.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        {getFileIcon(attachment.type)}
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {attachment.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(attachment.size)}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAttachment(attachment.id)}
                        className="text-red-500 hover:text-red-700 hover:scale-110 transition-all duration-200"
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 animate-slide-up animation-delay-400">
            <Link
              href="/dashboard"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:scale-105 transition-all duration-200"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={
                isSubmitting ||
                !formData.title.trim() ||
                !formData.content.trim()
              }
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200 flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                  Creating...
                </>
              ) : (
                <>
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Create Note
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
