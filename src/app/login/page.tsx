"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [totpToken, setTotpToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState("login"); // login, totp, or success

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear errors when user starts typing again
    if (error) setError("");
  };

  const handleTotpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTotpToken(e.target.value);
    if (error) setError("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Using next js to avoid CORS issues
      const loginResponse = await fetch('/api/clinician/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      // Check if response is JSON
      const contentType = loginResponse.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON response. Please try again later.");
      }

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error(loginData.message || 'Login failed');
      }

      // Store the incomplete token for TOTP verification
      localStorage.setItem('incompleteToken', loginData.token);
      
      // Move to TOTP verification step
      setStep("totp");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Login error:", err);
        setError(err.message || 'An error occurred during login');
      } else {
        setError('An unknown error occurred.');
      }
    }finally {
      setIsLoading(false);
    }
  };

  const handleTotpVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
  
    try {
      const incompleteToken = localStorage.getItem('incompleteToken');
      
      if (!incompleteToken) {
        throw new Error('Login session expired. Please login again.');
      }
  
      // Using Next.js API route to avoid CORS issues
      const totpResponse = await fetch('/api/clinician/verify-totp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${incompleteToken}` 
        },
        body: JSON.stringify({
          totp: totpToken
        }),
      });
  
      // Check if response is JSON
      const contentType = totpResponse.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON response. Please try again later.");
      }
  
      const totpData = await totpResponse.json();
  
      if (!totpResponse.ok) {
        throw new Error(totpData.message || 'TOTP verification failed');
      }
  
      // Store the complete token
      localStorage.setItem('token', totpData.token);
      
      // Fetch user data
      await fetchClinicianData(totpData.token);
      
      // Navigate to dashboard or clinician panel
      router.push('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Login error:", err);
        setError(err.message || 'An error occurred during login');
      } else {
        setError('An unknown error occurred.');
      }
    }
     finally {
      setIsLoading(false);
    }
  };

  const fetchClinicianData = async (token: string) => {
    try {
      // Using Next.js API route to avoid CORS issues
      const response = await fetch('/api/clinician/clinicianpanel', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON response. Please try again later.");
      }
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch clinician data');
      }
  
      // Store user data for use
      localStorage.setItem('userData', JSON.stringify(data.userData));
      return data.userData;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Login error:", err);
        setError(err.message || 'An error occurred during login');
      } else {
        setError('An unknown error occurred.');
      }
    }
    
  };

  // Render login form
  if (step === "login") {
    return (
      <div className="overflow-hidden bg-[#F5F5F5] mt-20 text-[16px] p-4 md:p-[130px]">
        <div className="flex flex-col items-center space-y-8">
          <div className="space-y-[16px] text-[#002A40]">
            <h1 className="text-[32px] font-montserrat font-extrabold text-center leading-[50px]">
              Clinician Login
            </h1>
            <p className="text-[16px] text-center">
              Access your Prescribeng account to manage your profile and services
            </p>
          </div>
          <div className="bg-white space-y-6 w-full max-w-[790px] shadow-md rounded-md">
            <form
              onSubmit={handleLogin}
              className="w-full px-6 md:px-8 py-12 space-y-8"
            >
              <div>
                <label className="block text-sm font-medium text-[#002A40] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#002A40] mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                />
              </div>
              {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded-md">
                  {error}
                </div>
              )}
              <div className="flex justify-between items-center">
                <Link href="/forgot-password" className="text-[#0077B6] hover:underline">
                  Forgot Password?
                </Link>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-[154px] bg-[#0077B6] text-white py-2 px-2 rounded-md hover:bg-[#005d8f] transition disabled:bg-gray-400"
                >
                  {isLoading ? "Loading..." : "Log In"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Render TOTP verification form
  if (step === "totp") {
    return (
      <div className="overflow-hidden bg-[#F5F5F5] mt-20 text-[16px] p-4 md:p-[130px]">
        <div className="flex flex-col items-center space-y-8">
          <div className="space-y-[16px] text-[#002A40]">
            <h1 className="text-[32px] font-montserrat font-extrabold text-center leading-[50px]">
              Two-Factor Authentication
            </h1>
            <p className="text-[16px] text-center">
              Enter the verification code from your authenticator app
            </p>
          </div>
          <div className="bg-white space-y-6 w-full max-w-[790px] shadow-md rounded-md">
            <form
              onSubmit={handleTotpVerification}
              className="w-full px-6 md:px-8 py-12 space-y-8"
            >
              <div>
                <label className="block text-sm font-medium text-[#002A40] mb-1">
                  Verification Code
                </label>
                <input
                  type="text"
                  placeholder="Enter 6-digit code"
                  required
                  maxLength={6}
                  pattern="[0-9]{6}"
                  value={totpToken}
                  onChange={handleTotpChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                />
              </div>
              {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded-md">
                  {error}
                </div>
              )}
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep("login")}
                  className="text-[#0077B6] hover:underline"
                >
                  Back to Login
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
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

  return null;
};

export default Login;