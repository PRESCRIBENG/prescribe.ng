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

const LOGIN_PATH = "/clinician-portal/login";

const inputClass =
  "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal";

// Colour a status value green/amber/red based on common wording
const statusClass = (value?: string) => {
  const v = (value || "").toLowerCase();
  if (/(active|verified|approved|valid|complete)/.test(v))
    return "bg-green-100 text-green-800";
  if (/(pending|review|processing|awaiting)/.test(v))
    return "bg-amber-100 text-amber-800";
  if (v) return "bg-red-100 text-red-700";
  return "bg-gray-100 text-gray-600";
};

const initials = (name?: string) =>
  (name || "")
    .replace(/^dr\.?\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

const Dashboard = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [photoFailed, setPhotoFailed] = useState(false);

  // Change password state
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    newPasswordRepeat: "",
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    localStorage.removeItem("incompleteToken");
    router.push(LOGIN_PATH);
  };

  useEffect(() => {
    const loadUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push(LOGIN_PATH);
        return;
      }

      // Show cached data immediately, then refresh it (photo URLs expire)
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        try {
          setUserData(JSON.parse(storedUserData));
          setIsLoading(false);
        } catch {
          localStorage.removeItem("userData");
        }
      }

      try {
        // Using Next.js API route to avoid CORS issues
        const response = await fetch("/api/clinician/panel", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 401 || response.status === 403) {
          logout();
          return;
        }

        const data = await response.json();
        if (!response.ok || !data.userData) {
          throw new Error(data.message || "Failed to fetch user data");
        }

        setUserData(data.userData);
        setPhotoFailed(false);
        localStorage.setItem("userData", JSON.stringify(data.userData));
      } catch (err: unknown) {
        console.error("Dashboard load error:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
    if (passwordError) setPasswordError("");
    if (passwordSuccess) setPasswordSuccess("");
  };

  const closeChangePassword = () => {
    setShowChangePassword(false);
    setShowPasswords(false);
    setPasswordForm({ oldPassword: "", newPassword: "", newPasswordRepeat: "" });
    setPasswordError("");
  };

  const submitPasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (passwordForm.newPassword !== passwordForm.newPasswordRepeat) {
      setPasswordError("New passwords do not match");
      return;
    }
    if (passwordForm.newPassword === passwordForm.oldPassword) {
      setPasswordError("New password must be different from your current password");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      logout();
      return;
    }

    setPasswordLoading(true);
    try {
      // Using Next.js API route to avoid CORS issues
      const response = await fetch("/api/clinician/change_password", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passwordForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to change password");
      }

      closeChangePassword();
      setPasswordSuccess(data.message || "Password updated!");
    } catch (err: unknown) {
      setPasswordError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#0077B6]"></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4 max-w-md text-center">
          {error || "No user data found. Please log in again."}
        </div>
        <button
          onClick={logout}
          className="bg-[#0077B6] text-white py-2 px-4 rounded-md hover:bg-[#005d8f] transition"
        >
          Back to Login
        </button>
      </div>
    );
  }

  const profileData = [
    { key: "Registration No.", value: userData.userID },
    { key: "Folio Number", value: userData.folioNumber },
    { key: "Regulator", value: userData.userRegulator },
    { key: "Domain", value: userData.userDomain },
    { key: "Specialty", value: userData.specialty },
    { key: "Grade", value: userData.grade },
    { key: "License Expiry", value: userData.licenseExpiry },
    { key: "Email", value: userData.email },
    { key: "Mobile", value: userData.mobile },
  ];

  const statusData = [
    { key: "Account Status", value: userData.accountStatus },
    { key: "Vetting Status", value: userData.vettingStatus },
    { key: "Registration", value: userData.registrationVerification },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#F5F5F5] mt-20 text-[16px] p-4 md:px-[130px] md:py-16">
      <div className="max-w-[1100px] mx-auto space-y-6 text-[#002A40]">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm text-gray-600">Clinician Portal</p>
            <h1 className="text-[28px] md:text-[32px] font-montserrat font-extrabold leading-tight">
              Welcome, {userData.clinician}
            </h1>
          </div>
          <button
            onClick={logout}
            className="self-start sm:self-auto bg-[#F20D0D] text-white py-2 px-4 rounded-md hover:bg-[#c90b0b] transition"
          >
            Logout
          </button>
        </header>

        {error && (
          <div className="bg-amber-100 text-amber-800 p-3 rounded-md">
            Showing saved details — couldn&apos;t refresh: {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile card */}
          <section className="bg-white rounded-md shadow-md p-6 flex flex-col items-center text-center">
            {userData.photoUrl && !photoFailed ? (
              <Image
                src={userData.photoUrl}
                alt={`${userData.clinician} profile photo`}
                width={200}
                height={200}
                onError={() => setPhotoFailed(true)}
                className="w-[160px] h-[160px] rounded-full object-cover"
              />
            ) : (
              <div className="w-[160px] h-[160px] rounded-full bg-[#0077B6] flex items-center justify-center text-white text-4xl font-bold">
                {initials(userData.clinician) || "?"}
              </div>
            )}
            <h2 className="mt-4 text-lg font-bold">{userData.clinician}</h2>
            <p className="text-gray-600">{userData.specialty}</p>

            <div className="w-full mt-6 space-y-3 text-left">
              {statusData.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between gap-4"
                >
                  <span className="text-sm font-bold">{item.key}</span>
                  <span
                    className={`text-sm px-3 py-1 rounded-full capitalize ${statusClass(
                      item.value
                    )}`}
                  >
                    {item.value || "—"}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Details + security */}
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white rounded-md shadow-md p-6">
              <h2 className="text-lg font-bold mb-4">Profile Details</h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {profileData.map((item) => (
                  <div key={item.key} className="min-w-0">
                    <dt className="text-sm font-bold">{item.key}</dt>
                    <dd className="text-gray-700 break-words">
                      {item.value || "—"}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="bg-white rounded-md shadow-md p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold">Security</h2>
                  <p className="text-sm text-gray-600">
                    Update the password you use to sign in
                  </p>
                </div>
                {!showChangePassword && (
                  <button
                    onClick={() => {
                      setShowChangePassword(true);
                      setPasswordSuccess("");
                    }}
                    className="self-start sm:self-auto bg-[#0077B6] text-white py-2 px-4 rounded-md hover:bg-[#005d8f] transition"
                  >
                    Change Password
                  </button>
                )}
              </div>

              {passwordSuccess && (
                <div className="mt-4 bg-green-100 text-green-700 p-3 rounded-md">
                  {passwordSuccess}
                </div>
              )}

              {showChangePassword && (
                <form onSubmit={submitPasswordChange} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Current Password
                    </label>
                    <input
                      type={showPasswords ? "text" : "password"}
                      name="oldPassword"
                      placeholder="Enter your current password"
                      autoComplete="current-password"
                      required
                      value={passwordForm.oldPassword}
                      onChange={handlePasswordChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      New Password
                    </label>
                    <input
                      type={showPasswords ? "text" : "password"}
                      name="newPassword"
                      placeholder="Enter your new password"
                      autoComplete="new-password"
                      required
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type={showPasswords ? "text" : "password"}
                      name="newPasswordRepeat"
                      placeholder="Confirm your new password"
                      autoComplete="new-password"
                      required
                      value={passwordForm.newPasswordRepeat}
                      onChange={handlePasswordChange}
                      className={inputClass}
                    />
                  </div>

                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={showPasswords}
                      onChange={(e) => setShowPasswords(e.target.checked)}
                    />
                    Show passwords
                  </label>

                  {passwordError && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-md">
                      {passwordError}
                    </div>
                  )}

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={closeChangePassword}
                      className="py-2 px-4 rounded-md text-[#0077B6] hover:underline"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={passwordLoading}
                      className="w-[170px] bg-[#0077B6] text-white py-2 px-4 rounded-md hover:bg-[#005d8f] transition disabled:bg-gray-400"
                    >
                      {passwordLoading ? "Updating..." : "Update Password"}
                    </button>
                  </div>
                </form>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
