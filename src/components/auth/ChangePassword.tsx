"use client";

import { useState } from "react";
import Link from "next/link";
//import { useRouter } from "next/navigation";

const ChangePassword = () => {
  //const router = useRouter();
  
  // State for managing form data
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    newPasswordRepeat: ""
  });

  // States for handling API interactions
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle changes to inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear errors when user starts typing again
    if (error) setError("");
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      // Validate passwords match
      if (formData.newPassword !== formData.newPasswordRepeat) {
        setError("New passwords do not match");
        setIsLoading(false);
        return;
      }

      // Get token from local storage or context
      const token = localStorage.getItem('authToken') || '';
      
      if (!token) {
        setError("You are not logged in. Please log in to change your password.");
        setIsLoading(false);
        return;
      }

      // Using Next.js API route to avoid CORS issues
      const response = await fetch('/api/password/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
          newPasswordRepeat: formData.newPasswordRepeat
        }),
      });

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON response. Please try again later.");
      }

      const data = await response.json();
      
      if (response.ok) {
        setSuccess(data.message || "Password updated successfully");
        setFormData({
          oldPassword: "",
          newPassword: "",
          newPasswordRepeat: ""
        });
      } else {
        throw new Error(data.message || "Failed to update password. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error("Error during password change:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="overflow-hidden bg-[#F5F5F5] mt-20 text-[16px] p-4 md:p-[130px]">
      <div className="flex flex-col items-center space-y-8">
        <div className="space-y-[16px] text-[#002A40]">
          <h1 className="text-[32px] font-montserrat font-extrabold text-center leading-[50px]">
            Change Password
          </h1>
          <p className="text-[16px] text-center">
            Update your account password
          </p>
        </div>
        <div className="bg-white space-y-6 w-full max-w-[790px] shadow-md rounded-md">
          <form
            onSubmit={handleSubmit}
            className="w-full px-6 md:px-8 py-12 space-y-8"
          >
            <div>
              <label className="block text-sm font-medium text-[#002A40] mb-1">
                Current Password
              </label>
              <input
                type="password"
                name="oldPassword"
                placeholder="Enter your current password"
                required
                value={formData.oldPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#002A40] mb-1">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                placeholder="Enter your new password"
                required
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#002A40] mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                name="newPasswordRepeat"
                placeholder="Confirm your new password"
                required
                value={formData.newPasswordRepeat}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
              />
            </div>
            
            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded-md">
                {error}
              </div>
            )}
            
            {success && (
              <div className="bg-green-100 text-green-700 p-3 rounded-md">
                {success}
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <Link
                href="/dashboard"
                className="text-[#0077B6] hover:underline"
              >
                Back to Dashboard
              </Link>
              <button
                type="submit"
                disabled={isLoading}
                className="w-[154px] bg-[#0077B6] text-white py-2 px-2 rounded-md hover:bg-[#005d8f] transition disabled:bg-gray-400"
              >
                {isLoading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;