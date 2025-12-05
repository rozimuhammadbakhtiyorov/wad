"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export default function ProfilePage() {
  const router = useRouter();
  
  // Get current user ID from localStorage
  const currentUserId = typeof window !== "undefined" ? localStorage.getItem("currentUserId") : null;
  
  // Fetch user data from Convex
  const profile = useQuery(
    api.users.getUserById,
    currentUserId ? { userId: currentUserId as Id<"users"> } : "skip"
  );

  const handleLogout = () => {
    // Clear any stored data
    localStorage.clear();
    router.push("/");
  };

  const handleDeleteAccount = async () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        // Delete account logic would go here
        // await deleteUser({ userId: currentUserId });
        localStorage.clear();
        router.push("/");
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("Failed to delete account. Please try again.");
      }
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#1a202c] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a202c] text-white">
      {/* Header */}
      <div className="sticky top-0 bg-[#1a202c] z-10 border-b border-gray-800">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/developers">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-2xl font-bold">Profile</h1>
            <Link href="/profile/edit" className="text-blue-500 hover:text-blue-400 font-medium">
              Edit
            </Link>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex gap-4">
            <Link
              href="/developers"
              className="text-gray-400 font-semibold pb-2 hover:text-white transition-colors"
            >
              Developers
            </Link>
            <Link
              href="/profile"
              className="text-blue-500 font-semibold pb-2 border-b-2 border-blue-500"
            >
              Profile
            </Link>
          </div>
        </div>
      </div>

      <div className="px-6 py-8">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={profile.image || "https://via.placeholder.com/300"}
            alt={profile.fullName}
            className="w-40 h-40 rounded-full object-cover mb-4 border-4 border-gray-700"
          />
          <h2 className="text-3xl font-bold mb-2">{profile.fullName}</h2>
          <p className="text-xl text-gray-400">{profile.codingField}</p>
        </div>

        {/* Social Links */}
        <div className="flex gap-4 mb-8 max-w-2xl mx-auto">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-[#2d3748] hover:bg-[#374151] text-white font-semibold py-3 rounded-xl text-center transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-center transition-colors"
          >
            GitHub
          </a>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto">
          <div className="bg-[#2d3748] p-6 rounded-xl">
            <p className="text-gray-400 text-sm mb-2">Experience</p>
            <p className="text-xl font-semibold">{profile.experience}</p>
          </div>
          <div className="bg-[#2d3748] p-6 rounded-xl">
            <p className="text-gray-400 text-sm mb-2">Email</p>
            <p className="text-lg font-semibold break-all">{profile.email}</p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="max-w-2xl mx-auto mb-8">
          <h3 className="text-2xl font-bold mb-6">My Tech Stack</h3>
          <div className="flex flex-wrap gap-3">
            {profile.technologies.map((tech) => (
              <span
                key={tech}
                className="bg-[#2d3748] px-6 py-3 rounded-full text-base font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="max-w-2xl mx-auto space-y-4 mt-12">
          <button
            onClick={handleLogout}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-colors"
          >
            Log Out
          </button>
          <button
            onClick={handleDeleteAccount}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-xl transition-colors"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
