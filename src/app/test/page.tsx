const test = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 space-y-8 overflow-hidden">
      <div className="mt-[180px] px-8 pb-8 space-y-6">
        {/* Payment Amount Card */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              Verification Fee
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-[#002A40]">₦1000</div>
              <p className="text-gray-600 text-sm">
                Secure payment processing via Paystack
              </p>
            </div>
          </div>
        </div>

        {/* Payment Instructions */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-500 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-900">
                What happens next?
              </h3>
              <p className="mt-1 text-sm text-blue-800">
                You&apos;ll be redirected to Paystack&apos;s secure payment
                page. After successful payment, you&apos;ll receive verification
                codes to complete your registration.
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Payment Button */}
        <form className="space-y-6">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#0077B6] to-[#00A8CC] hover:from-[#005f94] hover:to-[#0086a3] disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center justify-center space-x-3"
          >
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Processing...</span>
            </>
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span>Proceed to Secure Payment</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </>
          </button>
        </form>
      </div>

      <div className="bg-white min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#0077B6] to-[#FF6B00] rounded-full mx-auto flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-[#002A40] tracking-tight">
              Verify Your Identity
            </h1>
            <p className="text-gray-600 leading-relaxed">
              We&apos;ve sent verification codes to your registered email and
              phone number. Please enter both codes below to continue.
            </p>
          </div>

          {/* Error Alert */}
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-red-400 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-red-800 text-sm font-medium">error</span>
              </div>
              <button className="text-red-400 hover:text-red-600 transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-6">
            {/* Email OTP */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#002A40]">
                Email Verification Code
              </label>
              <p className="text-xs text-gray-500 mb-3">Sent to</p>
              <div className="relative">
                <input
                  type="text"
                  name="otpEmail"
                  placeholder="Enter 6-digit code"
                  required
                  //   maxLength="6"
                  //   value={formData.otpEmail}
                  //   onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Mobile OTP */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#002A40]">
                SMS Verification Code
              </label>
              <p className="text-xs text-gray-500 mb-3">
                {/* Sent to {formData.registeredMobileNumber} */}
              </p>
              <div className="relative">
                <input
                  type="text"
                  name="otpMobile"
                  placeholder="Enter 6-digit code"
                  required
                  //   maxLength="6"
                  //   value={formData.otpMobile}
                  //   onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-900 bg-white placeholder-gray-500 font-sans text-base leading-normal"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#0077B6] to-[#005a8b] text-white py-3 px-6 rounded-lg font-semibold text-lg hover:from-[#005a8b] hover:to-[#004466] focus:outline-none focus:ring-4 focus:ring-[#0077B6]/30 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Verify & Continue
            </button>

            {/* Resend Options */}
            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600 mb-3">
                Didn&apos;t receive the codes?
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  type="button"
                  className="text-[#0077B6] text-sm font-medium hover:underline"
                >
                  Resend Email Code
                </button>
                <span className="text-gray-300">|</span>
                <button
                  type="button"
                  className="text-[#0077B6] text-sm font-medium hover:underline"
                >
                  Resend SMS Code
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default test;
