"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const technologies = {
  "Web Development": [
    "HTML", "CSS", "JavaScript", "TypeScript", "React", "Angular", "Vue.js", 
    "Next.js", "Node.js", "Express.js", "Python", "Django", "Flask", "Java", 
    "Spring Boot", "C#", "ASP.NET Core", "Go", "Ruby on Rails", "PostgreSQL", 
    "MySQL", "MongoDB", "Redis", "Tailwind CSS", "Bootstrap"
  ],
  "Mobile Development": [
    "Kotlin", "Swift", "Java", "Flutter", "Dart", "React Native", "Xcode", "Android Studio"
  ],
  "DevOps": [
    "Git", "GitHub", "GitLab", "Docker", "Kubernetes", "AWS", "Microsoft Azure", 
    "GCP", "Jenkins", "GitHub Actions", "Terraform", "Ansible", "Prometheus", 
    "Grafana", "Splunk", "ELK Stack"
  ],
  "Data Science": [
    "Python", "SQL", "R", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", 
    "PyTorch", "Jupyter Notebook", "Apache Spark", "Matplotlib", "Seaborn", 
    "Tableau", "Databricks", "AWS SageMaker"
  ],
  "Cybersecurity": [
    "Kali Linux", "Wireshark", "Nmap", "Metasploit", "Burp Suite", "Nessus", 
    "Snort", "Splunk", "Python", "Bash"
  ]
};

export default function TechnologiesPage() {
  const router = useRouter();
  const registerUser = useMutation(api.users.registerUser);
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [customTechs, setCustomTechs] = useState<string[]>([]);
  const [customInput, setCustomInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["Web Development"]);

  const toggleTech = (tech: string) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const addCustomTech = () => {
    if (customInput.trim() && !customTechs.includes(customInput.trim())) {
      setCustomTechs([...customTechs, customInput.trim()]);
      setSelectedTechs([...selectedTechs, customInput.trim()]);
      setCustomInput("");
    }
  };

  const removeCustomTech = (tech: string) => {
    setCustomTechs(customTechs.filter((t) => t !== tech));
    setSelectedTechs(selectedTechs.filter((t) => t !== tech));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Get step 1 data from localStorage
      const step1Data = localStorage.getItem("registrationStep1");
      if (!step1Data) {
        alert("Please complete step 1 first");
        router.push("/register");
        return;
      }

      const userData = JSON.parse(step1Data);
      
      // Register user in Convex database
      const userId = await registerUser({
        email: userData.email,
        password: userData.password,
        fullName: userData.fullName,
        image: userData.image || undefined,
        codingField: userData.codingField,
        experience: userData.experience,
        linkedin: userData.linkedin,
        github: userData.github,
        technologies: selectedTechs,
      });

      // Store user ID in localStorage for session
      localStorage.setItem("currentUserId", userId);
      localStorage.setItem("isAuthenticated", "true");
      
      // Clear registration data
      localStorage.removeItem("registrationStep1");
      localStorage.removeItem("registrationStep2");
      
      // Redirect to developers page
      router.push("/developers");
    } catch (error: any) {
      console.error("Registration error:", error);
      if (error.message?.includes("already exists")) {
        alert("An account with this email already exists. Please login instead.");
        router.push("/login");
      } else {
        alert("Registration failed. Please try again.");
      }
    }
  };

  const filteredTechnologies = Object.entries(technologies).reduce((acc, [category, techs]) => {
    const filtered = techs.filter((tech) =>
      tech.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <div className="min-h-screen bg-[#1a202c] text-white px-6 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <Link href="/register" className="inline-block mb-8">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>

        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-8">Technologies</h1>

        {/* Progress Indicators */}
        <div className="flex gap-2 mb-12">
          <div className="flex-1 h-1 bg-blue-600 rounded"></div>
          <div className="flex-1 h-1 bg-blue-600 rounded"></div>
          <div className="flex-1 h-1 bg-gray-700 rounded"></div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Description */}
          <p className="text-gray-400 mb-6">Choose the tools and frameworks you're proficient with.</p>

          {/* Search Bar */}
          <div className="relative mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a technology"
              className="w-full bg-[#2d3748] text-white px-12 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
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

          {/* Technology Categories */}
          <div className="space-y-4 mb-8">
            {Object.entries(filteredTechnologies).map(([category, techs]) => {
              const isExpanded = expandedCategories.includes(category);
              const selectedCount = techs.filter((tech) => selectedTechs.includes(tech)).length;

              return (
                <div key={category} className="bg-[#2d3748] rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleCategory(category)}
                    className="w-full flex items-center justify-between px-6 py-4 hover:bg-[#374151] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-semibold">{category}</span>
                      {selectedCount > 0 && (
                        <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                          {selectedCount}
                        </span>
                      )}
                    </div>
                    <svg
                      className={`w-6 h-6 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isExpanded && (
                    <div className="px-6 pb-6 pt-2 space-y-3">
                      {techs.map((tech) => (
                        <label key={tech} className="flex items-center cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={selectedTechs.includes(tech)}
                            onChange={() => toggleTech(tech)}
                            className="hidden"
                          />
                          <div
                            className={`w-6 h-6 rounded border-2 flex items-center justify-center mr-3 ${
                              selectedTechs.includes(tech)
                                ? "bg-blue-600 border-blue-600"
                                : "border-gray-500 group-hover:border-blue-400"
                            }`}
                          >
                            {selectedTechs.includes(tech) && (
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className="text-base">{tech}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Custom Tools Section */}
          <div className="bg-[#2d3748] rounded-lg p-6 mb-8 border-2 border-dashed border-gray-600">
            <h3 className="text-lg font-semibold mb-4">Custom Tools</h3>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCustomTech())}
                placeholder="Add a custom technology"
                className="flex-1 bg-[#1a202c] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="button"
                onClick={addCustomTech}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                + Add
              </button>
            </div>
            {customTechs.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {customTechs.map((tech) => (
                  <span
                    key={tech}
                    className="bg-[#1a202c] px-4 py-2 rounded-full flex items-center gap-2"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeCustomTech(tech)}
                      className="text-gray-400 hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            disabled={selectedTechs.length === 0}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold text-lg py-4 rounded-full transition-all duration-200"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
