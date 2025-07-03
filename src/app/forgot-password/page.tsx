"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const router = useRouter();

  // State for managing form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    code: ["", "", "", "", "", ""], // Array for the 6-digit code
  });

  // State for managing the current step in the flow
  const [step, setStep] = useState("email-request"); // email-request, code-verification, new-password, success

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

  // Handle changes to code inputs
  const handleCodeChange = (index: number, value: string) => {
    // Update the code array at the specified index
    const newCode = [...formData.code];
    newCode[index] = value;
    setFormData({ ...formData, code: newCode });

    // Clear errors when user starts typing again
    if (error) setError("");

    // Auto-focus next input if value is entered
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      // Email request step - send request for password reset link
      if (step === "email-request") {
        // Using Next.js API route to avoid CORS issues
        const response = await fetch(
          "/api/clinician/generate_password_reset_link",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: formData.email }),
          }
        );

        // Check if response is JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error(
            "Server returned non-JSON response. Please try again later."
          );
        }

        const data = await response.json();

        if (response.ok) {
          setSuccess(
            data.message || "Password reset link has been sent to your email"
          );
          setStep("code-verification");
        } else {
          throw new Error(
            data.message || "Failed to send reset link. Please try again."
          );
        }
      }
      // Code verification step - this would typically validate the code
      else if (step === "code-verification") {
        // For now, simulate success and move to the next step
        const fullCode = formData.code.join("");
        if (fullCode.length === 6) {
          setSuccess("Code verified successfully");
          setStep("new-password");
        } else {
          setError("Please enter a valid 6-digit code");
        }
      }
      // New password step - update the password
      else if (step === "new-password") {
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          setIsLoading(false);
          return;
        }

        // Get the verification code
        const verificationCode = formData.code.join("");

        // Using Next.js API route to avoid CORS issues
        const response = await fetch("/api/clinician/change_password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            code: verificationCode,
            newPassword: formData.password,
            newPasswordRepeat: formData.confirmPassword,
          }),
        });

        // Check if response is JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error(
            "Server returned non-JSON response. Please try again later."
          );
        }

        const data = await response.json();

        if (response.ok) {
          setSuccess(data.message || "Password updated successfully");
          setStep("success");
        } else {
          throw new Error(
            data.message || "Failed to update password. Please try again."
          );
        }
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error("Error during password reset:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Email request step UI
  if (step === "email-request") {
    return (
      <div className="overflow-hidden bg-[#F5F5F5] mt-20 text-[16px] p-4 md:p-[130px]">
        <div className="flex flex-col items-center space-y-8">
          <div className="space-y-[16px] text-[#002A40]">
            <h1 className="text-[32px] font-montserrat font-extrabold text-center leading-[50px]">
              Forgot Password
            </h1>
            <p className="text-[16px] text-center">
              Enter the email address you registered with to receive a password
              reset code
            </p>
          </div>
          <div className="bg-white space-y-6 w-full max-w-[790px] shadow-md rounded-md">
            <form
              onSubmit={handleSubmit}
              className="w-full px-6 md:px-8 py-12 space-y-8"
            >
              <div>
                <label className="block text-sm font-medium text-[#002A40] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
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
                <Link href="/login" className="text-[#0077B6] hover:underline">
                  Back to Login
                </Link>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-[154px] bg-[#0077B6] text-white py-2 px-2 rounded-md hover:bg-[#005d8f] transition disabled:bg-gray-400"
                >
                  {isLoading ? "Sending..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Code verification step UI
  if (step === "code-verification") {
    return (
      <div className="overflow-hidden bg-[#F5F5F5] mt-20 text-[16px] p-4 md:p-[130px]">
        <div className="flex flex-col items-center space-y-8">
          <div className="space-y-[16px] text-[#002A40]">
            <h1 className="text-[32px] font-montserrat font-extrabold text-center leading-[50px]">
              Verify Password Reset
            </h1>
            <p className="text-[16px] text-center">
              Enter the verification code sent to your email {formData.email}
            </p>
          </div>
          <div className="bg-white space-y-6 w-full max-w-[790px] shadow-md rounded-md">
            <form
              onSubmit={handleSubmit}
              className="w-full px-6 md:px-8 py-12 space-y-8"
            >
              <div className="flex flex-wrap justify-center gap-4">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    id={`code-input-${index}`}
                    type="text"
                    maxLength={1}
                    value={formData.code[index]}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                  />
                ))}
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
                <button
                  type="button"
                  onClick={() => setStep("email-request")}
                  className="text-[#0077B6] hover:underline"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading || formData.code.join("").length !== 6}
                  className="w-[154px] bg-[#0077B6] text-white py-2 px-2 rounded-md hover:bg-[#005d8f] transition disabled:bg-gray-400"
                >
                  {isLoading ? "Verifying..." : "Verify"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // New password step UI
  if (step === "new-password") {
    return (
      <div className="overflow-hidden bg-[#F5F5F5] mt-20 text-[16px] p-4 md:p-[130px]">
        <div className="flex flex-col items-center space-y-8">
          <div className="space-y-[16px] text-[#002A40]">
            <h1 className="text-[32px] font-montserrat font-extrabold text-center leading-[50px]">
              Create New Password
            </h1>
            <p className="text-[16px] text-center">
              Enter and confirm your new password
            </p>
          </div>
          <div className="bg-white space-y-6 w-full max-w-[790px] shadow-md rounded-md">
            <form
              onSubmit={handleSubmit}
              className="w-full px-6 md:px-8 py-12 space-y-8"
            >
              <div>
                <label className="block text-sm font-medium text-[#002A40] mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your new password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#002A40] mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your new password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
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
                <button
                  type="button"
                  onClick={() => setStep("code-verification")}
                  className="text-[#0077B6] hover:underline"
                >
                  Back
                </button>
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
  }

  // Success step UI
  if (step === "success") {
    return (
      <div className="overflow-hidden bg-[#F5F5F5] mt-20 text-[16px] p-4 md:p-[130px]">
        <div className="flex flex-col items-center space-y-8">
          <div className="space-y-[16px] text-[#002A40]">
            <h1 className="text-[32px] font-montserrat font-extrabold text-center leading-[50px]">
              Password Reset Successful
            </h1>
            <p className="text-[16px] text-center">
              Your password has been successfully updated
            </p>
          </div>
          <div className="bg-white space-y-6 w-full max-w-[790px] shadow-md rounded-md p-8 text-center">
            <div className="py-8">
              <svg
                className="w-16 h-16 text-green-500 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <p className="mt-4 text-lg">{success}</p>
            </div>
            <button
              onClick={() => router.push("/login")}
              className="inline-block w-[154px] bg-[#0077B6] text-white py-2 px-2 rounded-md hover:bg-[#005d8f] transition text-center"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ForgotPassword;
