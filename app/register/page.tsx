"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function RegisterPage() {
  const router = useRouter();
  const registerUser = useMutation(api.users.registerUser);
  const [formData, setFormData] = useState({
    image: "",
    fullName: "",
    codingField: "",
    experience: "",
    linkedin: "",
    github: "",
    email: "",
    password: "",
  });
  const [imagePreview, setImagePreview] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Store step 1 data in localStorage for step 2
      localStorage.setItem("registrationStep1", JSON.stringify(formData));
      router.push("/register/step-2");
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#1a202c] text-white px-6 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <Link href="/" className="inline-block mb-8">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>

        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-8">Basic Info</h1>

        {/* Progress Indicators */}
        <div className="flex gap-2 mb-12">
          <div className="flex-1 h-1 bg-blue-600 rounded"></div>
          <div className="flex-1 h-1 bg-gray-700 rounded"></div>
          <div className="flex-1 h-1 bg-gray-700 rounded"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <div className="w-40 h-40 rounded-full bg-[#d4a574] flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-32 h-40 bg-white rounded"></div>
                )}
              </div>
              <label
                htmlFor="image-upload"
                className="absolute bottom-0 right-0 bg-blue-600 p-3 rounded-full cursor-pointer hover:bg-blue-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            <p className="mt-4 text-lg font-medium">Upload Photo</p>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-base font-medium mb-2">Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Enter your full name"
              className="w-full bg-[#2d3748] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* Coding Field */}
          <div>
            <label className="block text-base font-medium mb-2">Coding Field</label>
            <input
              type="text"
              value={formData.codingField}
              onChange={(e) => setFormData({ ...formData, codingField: e.target.value })}
              placeholder="e.g. Frontend, Backend, Mobile"
              className="w-full bg-[#2d3748] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* Years of Experience */}
          <div>
            <label className="block text-base font-medium mb-2">Years of Experience</label>
            <input
              type="number"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              placeholder="Enter number of years"
              className="w-full bg-[#2d3748] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* LinkedIn Profile */}
          <div>
            <label className="block text-base font-medium mb-2">LinkedIn Profile</label>
            <input
              type="url"
              value={formData.linkedin}
              onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
              placeholder="https://linkedin.com/in/username"
              className="w-full bg-[#2d3748] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* GitHub Profile */}
          <div>
            <label className="block text-base font-medium mb-2">GitHub Profile</label>
            <input
              type="url"
              value={formData.github}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              placeholder="https://github.com/username"
              className="w-full bg-[#2d3748] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-base font-medium mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email"
              className="w-full bg-[#2d3748] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-base font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter your password"
                className="w-full bg-[#2d3748] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
            <p className="text-sm text-gray-400 mt-2">Must be at least 8 characters.</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-4 rounded-full transition-all duration-200 mt-8"
          >
            Continue
          </button>

          {/* Sign In Link */}
          <p className="text-center text-gray-400 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:text-blue-400">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
