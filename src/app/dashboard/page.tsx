"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// TypeScript interface for user data
interface UserData {
  accountStatus: string;
  clinician: string;
  email: string;
  folioNumber: string;
  grade: string;
  licenseExpiry: string;
  mobile: string;
  photoUrl: string;
  registrationVerification: string;
  specialty: string;
  userDomain: string;
  userRegulator: string;
  userID: string;
  vettingStatus: string;
}

const Dashboard = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const profileData = [
    {
      key: "Regulator",
      value: userData?.userRegulator,
    },
    {
      key: "Domain",
      value: userData?.userDomain,
    },
    {
      key: "Specialty",
      value: userData?.specialty,
    },
    {
      key: "Grade",
      value: userData?.grade,
    },
    {
      key: "License Expiry",
      value: userData?.licenseExpiry,
    },
    {
      key: "Email",
      value: userData?.email,
    },
    {
      key: "Mobile",
      value: userData?.mobile,
    },
    {
      key: "Account Status",
      value: userData?.accountStatus,
    },
  ];

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if token exists
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        // Get user data from localStorage
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
          setIsLoading(false);
          return;
        }

        // If not in localStorage, fetch from API
        const response = await fetch(
          "https://gelataskia.prescribe.ng/clinicianpanel",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data.userData);
        localStorage.setItem("userData", JSON.stringify(data.userData));
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "An error occurred");
          if (err.message.includes("auth") || err.message.includes("token")) {
            localStorage.removeItem("token");
            localStorage.removeItem("userData");
            router.push("/login");
          }
        } else {
          setError("An unknown error occurred");
        }
      }finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    localStorage.removeItem("incompleteToken");
    router.push("/login");
  };

  const changePassword = () => {
    router.push("/login");
  };


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#0077B6]"></div>
      </div>
    );
  }

  if (error && !userData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4 max-w-md">
          {error}
        </div>
        <button
          onClick={() => router.push("/login")}
          className="bg-[#0077B6] text-white py-2 px-4 rounded-md"
        >
          Back to Login
        </button>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p>No user data found. Please log in again.</p>
        <button
          onClick={() => router.push("/login")}
          className="mt-4 bg-[#0077B6] text-white py-2 px-4 rounded-md"
        >
          Go to Login
        </button>
      </div>
    );
  }

  //const formatDate = (dateString: string) => {
    //const date = new Date(dateString);
    //return new Intl.DateTimeFormat("en-US", {
      //day: "numeric",
      //month: "long",
      //year: "numeric",
    //}).format(date);
  //};

  return (
    <div className="min-h-screen overflow-hidden bg-[#F5F5F5] mt-20 text-[16px] p-4 md:p-[130px]">
      {/* Header */}
      <header className="flex justify-end">
        <button
          onClick={handleLogout}
          className="bg-[#F20D0D] text-white py-2 px-4 rounded-md hover:bg-[#F20D0D]"
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className=" overflow-hidden mb-4 relative">
              <p className="mb-4">
                Welcome, <span className="font-medium">{userData.clinician}</span>
              </p>
              {userData.photoUrl ? (
                <>
                  <Image
                    src={userData.photoUrl}
                    alt={"Profile"}
                    width={342}
                    height={178}
                    className="w-[329px] h-[329px] rounded-full object-cover"
                  />
                  
                  <button
                    className="absolute bottom-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => {
                      /* Add edit function */
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-gray-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </button>
                </>
              ) : (
                <div className="h-full w-full bg-[#0077B6] flex items-center justify-center text-white text-4xl font-bold relative">
                  <button
                    className="absolute bottom-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => {
                      /* Add your edit function here */
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-gray-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            <div>
              <div className="mb-6">
                <div className="space-y-3 text-[16px">
                  {profileData.map((item, index) => (
                    <div key={index} className="">
                      <div className="flex gap-[58px]  mt-4">
                        <h2 className="w-[134px] text-[16px] font-bold text-[#002A40]">
                          {item.key}
                        </h2>
                        <h2 className="w-[253px] text-[#002A40]">{item.value}</h2>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={changePassword}
                    className="bg-[#0077B6] text-white py-2 px-4 rounded-md hover:bg-[#F20D0D]"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
