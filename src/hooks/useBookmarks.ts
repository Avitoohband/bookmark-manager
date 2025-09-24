"use client";

import { useState, useEffect } from "react";
import { Bookmark, CreateBookmarkData } from "@/types/bookmark";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      setError(null);
      const response = await fetch("/api/bookmarks");

      if (!response.ok) {
        throw new Error("Failed to fetch bookmarks");
      }

      const data = await response.json();
      setBookmarks(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }    
  };

  const addBookmark = async (data: CreateBookmarkData) => {
    try {
      setError(null);
      const response = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to add bookmark");
      }

      const newBookmark = await response.json();
      setBookmarks([newBookmark, ...bookmarks]);
      return newBookmark;
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  const deleteBookmark = async (id: string) => {
    try {
      setError(null);
      const response = await fetch(`/api/bookmarks/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete bookmark");
      }
      setBookmarks((prevBookmarks) =>
        prevBookmarks.filter((bookmark) => bookmark.id !== id)
      );
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return {
    bookmarks,
    loading,
    error,
    addBookmark,
    deleteBookmark,
    refetch: fetchBookmarks,
  };
}
