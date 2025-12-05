"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

// Sample developer data
const sampleDevelopers = [
  {
    id: 1,
    name: "Alaina Vikander",
    role: "iOS Developer",
    image: "https://i.pravatar.cc/150?img=1",
    technologies: ["Swift", "SwiftUI", "UIKit"]
  },
  {
    id: 2,
    name: "Jameson Kenter",
    role: "Backend Engineer",
    image: "https://i.pravatar.cc/150?img=13",
    technologies: ["Node.js", "Python", "PostgreSQL"]
  },
  {
    id: 3,
    name: "Sofia Chen",
    role: "Data Scientist",
    image: "https://i.pravatar.cc/150?img=5",
    technologies: ["Python", "TensorFlow", "Pandas"]
  },
  {
    id: 4,
    name: "Marcus Liu",
    role: "Web Frontend",
    image: "https://i.pravatar.cc/150?img=12",
    technologies: ["React", "TypeScript", "Next.js"]
  },
  {
    id: 5,
    name: "Chloe Davis",
    role: "DevOps Engineer",
    image: "https://i.pravatar.cc/150?img=9",
    technologies: ["Docker", "Kubernetes", "AWS"]
  },
  {
    id: 6,
    name: "Ben Carter",
    role: "Android Developer",
    image: "https://i.pravatar.cc/150?img=14",
    technologies: ["Kotlin", "Android Studio", "Firebase"]
  },
];

const filterTags = [
  "iOS Developer",
  "Backend Engineer",
  "Frontend Developer",
  "Data Scientist",
  "DevOps Engineer",
  "Mobile Developer"
];

export default function DevelopersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  
  // Fetch real developers from Convex
  const developers = useQuery(api.users.getAllDevelopers) || [];

  const filteredDevelopers = developers.filter((dev) => {
    const matchesSearch =
      dev.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dev.codingField?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dev.technologies?.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFilter = !selectedFilter || dev.codingField === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#1a202c] text-white">
      {/* Header */}
      <div className="sticky top-0 bg-[#1a202c] z-10 border-b border-gray-800">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Developers</h1>
            <Link href="/profile">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </Link>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex gap-4">
            <Link
              href="/developers"
              className="text-blue-500 font-semibold pb-2 border-b-2 border-blue-500"
            >
              Developers
            </Link>
            <Link
              href="/profile"
              className="text-gray-400 font-semibold pb-2 hover:text-white transition-colors"
            >
              Profile
            </Link>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, skill..."
            className="w-full bg-[#2d3748] text-white px-12 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
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

        {/* Filter Tags */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          <button
            onClick={() => setSelectedFilter(null)}
            className={`px-5 py-2 rounded-full whitespace-nowrap flex items-center gap-2 transition-colors ${
              !selectedFilter
                ? "bg-blue-600 text-white"
                : "bg-[#2d3748] text-gray-300 hover:bg-[#374151]"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </button>
          {filterTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedFilter(tag === selectedFilter ? null : tag)}
              className={`px-5 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedFilter === tag
                  ? "bg-blue-600 text-white"
                  : "bg-[#2d3748] text-gray-300 hover:bg-[#374151]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Developers List */}
        <div className="space-y-4">
          {filteredDevelopers.map((developer: any) => (
            <Link
              key={developer._id}
              href={`/profile/${developer._id}`}
              className="block bg-[#2d3748] rounded-xl p-5 hover:bg-[#374151] transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {developer.image ? (
                    <img
                      src={developer.image}
                      alt={developer.fullName}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-600 flex items-center justify-center text-2xl font-bold">
                      {developer.fullName?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold">{developer.fullName}</h3>
                    <p className="text-gray-400">{developer.codingField}</p>
                  </div>
                </div>
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredDevelopers.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-gray-400 text-lg">No developers found</p>
          </div>
        )}
      </div>
    </div>
  );
}
