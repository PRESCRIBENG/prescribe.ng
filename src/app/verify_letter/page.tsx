"use client";

import { useState, useEffect } from "react";

const VerifyLetter = () => {
  const [referenceId, setReferenceId] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [step, setStep] = useState<"input" | "result">("input");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReferenceId(e.target.value);
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!referenceId.trim()) {
      setError("Please enter a reference ID");
      return;
    }

    setIsVerifying(true);
    setError("");

    try {
      const verificationUrl = `https://gelataskia.prescribe.ng/web/verify_correspondence?refID=${encodeURIComponent(
      //const verificationUrl = `https://127.0.0.1:5002/web/verify_correspondence?refID=${encodeURIComponent(
        referenceId
      )}`;

      const response = await fetch(verificationUrl);

      if (response.ok) {
        const pdfBlob = await response.blob();

        // Create an object URL for PDF
        const blobUrl = URL.createObjectURL(pdfBlob);

        // Store blob URL
        setPdfBlobUrl(blobUrl);

        // Move to result
        setStep("result");
      } else {
        setError("Invalid reference ID or medical report not found.");
      }
    } catch (err: unknown) {
      console.error("Verification error:", err);
      setError(
        "An error occurred while verifying the reference ID. Please try again."
      );
    } finally {
      setIsVerifying(false);
    }
  };

  // Clean up blob URL when component unmounts
  useEffect(() => {
    return () => {
      if (pdfBlobUrl) {
        URL.revokeObjectURL(pdfBlobUrl);
      }
    };
  }, [pdfBlobUrl]);

  if (step === "input") {
    return (
      <div className="overflow-hidden bg-[#F5F5F5] mt-20 text-[16px]">
        <div className="p-8 md:p-16 lg:p-[130px]">
          <div className="flex flex-col items-center space-y-8">
            <div className="space-y-[16px] text-[#002A40]">
              <h1 className="text-[32px] font-montserrat font-extrabold text-center leading-[50px]">
                Verify Medical Letters
              </h1>
              <p className="text-[16px] text-center">
                Enter the reference ID below to verify sick notes/exemption letter/medical reports/discharge summaries issued
                by any or our partner healthcare services providers.
              </p>
            </div>

            <div className="bg-white space-y-6 w-full max-w-3xl rounded-lg shadow-sm">
              <form
                onSubmit={handleSubmit}
                className="w-full px-8 py-8 space-y-8"
              >
                <div>
                  <label className="block text-sm font-medium text-[#002A40] mb-1">
                    Enter Reference ID
                  </label>
                  <input
                    type="text"
                    name="referenceId"
                    required
                    placeholder="Enter the reference ID"
                    value={referenceId}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 text-red-700 p-4 rounded-md">
                    {error}
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isVerifying}
                    className={`bg-[#0077B6] text-white py-2 px-6 rounded-md hover:bg-[#00669e] transition ${
                      isVerifying ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isVerifying ? "Verifying..." : "Verify Report"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <DonationFooter />
      </div>
    );
  }

  if (step === "result") {
    return (
      <div className="overflow-hidden bg-[#F5F5F5] mt-20 text-[16px]">
        <div className="p-8 md:p-16 lg:p-[130px]">
          <div className="flex flex-col items-center space-y-8">
            <div className="space-y-[16px] text-[#002A40]">
              <h1 className="text-[32px] font-montserrat font-extrabold text-center leading-[50px]">
                Verification Successful
              </h1>
            </div>

            {/* <div className="bg-green-50 text-green-700 p-4 rounded-md w-full max-w-3xl mb-6">
              <div className="flex items-start">
                <svg
                  className="h-6 w-6 mr-2 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p className="font-semibold">Verification Successful</p>
                  <p className="text-sm mt-1">
                    Medical report for reference ID{" "}
                    <strong>{referenceId}</strong> has been verified as
                    authentic.
                  </p>
                </div>
              </div>
            </div> */}

            <div className="w-full max-w-4xl bg-white p-6 rounded-lg">
              <div className="relative w-full h-screen max-h-[700px] border border-gray-200 rounded-md overflow-hidden bg-white">
                <iframe
                  src={
                    pdfBlobUrl
                      ? `${pdfBlobUrl}#toolbar=0&navpanes=0&scrollbar=0&statusbar=0`
                      : ""
                  }
                  width="100%"
                  height="100%"
                  className="absolute top-0 left-0"
                  style={{
                    minHeight: "600px",
                    border: "none",
                    backgroundColor: "white",
                  }}
                  title="Medical Report PDF"
                  frameBorder="0"
                  scrolling="auto"
                />
              </div>
            </div>
            <div className="w-full max-w-4xl">        
              <p className="mt-2">
                <span className="font-bold ">Verification check status:   </span>
                <span className="">Original</span>
              </p>
              <p className="mt-2">
                <span className="font-bold">Issued by: </span>
                Pincrest medical center{" "}
              </p>

              <div className="flex justify-between items-center mt-4">
                <a
                  href={pdfBlobUrl || "#"}
                  download={`medical_report_${referenceId}.pdf`}
                  className="text-[#0077B6] rounded-md font-extrabold transition flex items-center"
                >
                  Download PDF
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

const DonationFooter = () => {
  return (
    <div className="bg-[#FFF1E8] px-6 xl:px-[130px] py-12 space-y-4">
      <div className="flex flex-col items-center space-y-3">
        <h1 className="text-[32px] font-montserrat font-bold leading-[50px] text-[#002A40]">
          World-Class Healthcare. Built on Trust. Powered by Connection.
        </h1>
        <p className="text-[16px]">
          Every contribution, big or small, brings hope to those in need. Join
          us in making a difference today!
        </p>
      </div>
      <div className="flex justify-center">
        <button className="bg-[#0077B6] text-white py-2 px-4 rounded-[10px] text-[16px]">
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default VerifyLetter;