"use client";
import { encrypt } from "@/utils/security";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
const Page = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  // Forgot password state
  const [forgotMode, setForgotMode] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(0); // 120 seconds when running
  const [isSending, setIsSending] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error when user starts typing
    setInfo("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setInfo("");

    const encryptedformdata = encrypt(form);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_APP_URI}/adminlogin`, {
        payload: encryptedformdata
      });

      if (response.status === 200) {
        router.push("/dashboard");
      }
    } catch (error) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Forgot Password Handlers
  const startTimer = (secs: number) => {
    setSecondsLeft(secs);
  };

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);

  const handleSendOtp = async () => {
    try {
      setIsSending(true);
      setError("");
      setInfo("");
      if (!resetEmail) {
        setError("Please enter your admin email");
        return;
      }
      const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_URI}/admin/send-reset-otp`, { email: resetEmail });
      if (res.status === 200) {
        setInfo("OTP sent to your email. It is valid for 2 minutes.");
        startTimer(120);
      }
    } catch (err: any) {
      if (err?.response?.status === 429) {
        const retryAfter = err?.response?.data?.retryAfter ?? 0;
        setError(`Please wait ${retryAfter}s before requesting a new OTP.`);
        startTimer(retryAfter);
      } else if (err?.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to send OTP. Please try again.");
      }
    } finally {
      setIsSending(false);
    }
  };

  const handleVerifyReset = async () => {
    try {
      setIsSending(true);
      setError("");
      setInfo("");
      if (!resetEmail || !otp || !newPassword || !confirmPassword) {
        setError("Please fill all fields");
        return;
      }
      if (newPassword !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_URI}/admin/verify-reset`, {
        email: resetEmail,
        otp,
        newPassword,
      });
      if (res.status === 200) {
        setInfo("Password reset successfully. You can now login.");
        // Reset forgot state and prefill email for login form
        setForm((prev) => ({ ...prev, email: resetEmail }));
        setForgotMode(false);
        setOtp("");
        setNewPassword("");
        setConfirmPassword("");
        setSecondsLeft(0);
      }
    } catch (err: any) {
      if (err?.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to verify OTP. Please try again.");
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
      

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
          {!forgotMode ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Welcome Back</h2>
                <p className="text-gray-500 text-sm mt-1">Enter your credentials to continue</p>
              </div>

              {(error || info) && (
                <div className={`${error ? "bg-red-50 border-red-200 text-red-700" : "bg-green-50 border-green-200 text-green-700"} border px-4 py-3 rounded-lg text-sm`}>
                  {error || info}
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="admin@listy4u.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5D00] focus:border-[#FF5D00] transition-colors duration-200 bg-gray-50 focus:bg-white"
                    required
                  />
                  <svg
                    className="absolute right-3 top-3.5 h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5D00] focus:border-[#FF5D00] transition-colors duration-200 bg-gray-50 focus:bg-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword((s) => !s)}
                    className="absolute right-3 top-2.5 h-8 w-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
                    aria-label={showLoginPassword ? "Hide password" : "Show password"}
                  >
                    {showLoginPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 15.338 6.883 18 12 18c.993 0 1.94-.107 2.828-.308M6.228 6.228A10.45 10.45 0 0112 6c5.117 0 8.774 2.662 10.066 6a10.523 10.523 0 01-4.293 5.03M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644C3.423 7.51 7.36 5 12 5c4.64 0 8.577 2.51 9.964 6.678.07.207.07.435 0 .644C20.577 16.49 16.64 19 12 19c-4.64 0-8.577-2.51-9.964-6.678z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="flex justify-end">
                  <button type="button" className="text-sm text-[#FF5D00] hover:underline" onClick={() => {setForgotMode(true); setError(""); setInfo(""); setResetEmail(form.email);}}>
                    Forgot password?
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#FF5D00] hover:bg-[#E55A00] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Signing In...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="text-center mb-2">
                <h2 className="text-2xl font-semibold text-gray-800">Reset Password</h2>
                <p className="text-gray-500 text-sm mt-1">We will send an OTP to your admin email</p>
              </div>

              {(error || info) && (
                <div className={`${error ? "bg-red-50 border-red-200 text-red-700" : "bg-green-50 border-green-200 text-green-700"} border px-4 py-3 rounded-lg text-sm`}>
                  {error || info}
                </div>
              )}

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Admin Email</label>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => { setResetEmail(e.target.value); setError(""); setInfo(""); }}
                  placeholder="admin@listy4u.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5D00] focus:border-[#FF5D00] transition-colors duration-200 bg-gray-50 focus:bg-white"
                />
              </div>

              {/* OTP and password fields (enabled after OTP is sent) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">OTP</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="6-digit OTP"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5D00] focus:border-[#FF5D00] transition-colors duration-200 bg-gray-50 focus:bg-white"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={isSending || secondsLeft > 0}
                    className="w-full bg-[#FF5D00] hover:bg-[#E55A00] disabled:bg-gray-300 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200"
                  >
                    {secondsLeft > 0 ? `Resend OTP in ${Math.floor(secondsLeft/60)}:${(secondsLeft%60).toString().padStart(2,'0')}` : (isSending ? 'Sending...' : 'Send OTP')}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5D00] focus:border-[#FF5D00] transition-colors duration-200 bg-gray-50 focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword((s) => !s)}
                      className="absolute right-3 top-2.5 h-8 w-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
                      aria-label={showNewPassword ? "Hide password" : "Show password"}
                    >
                      {showNewPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 15.338 6.883 18 12 18c.993 0 1.94-.107 2.828-.308M6.228 6.228A10.45 10.45 0 0112 6c5.117 0 8.774 2.662 10.066 6a10.523 10.523 0 01-4.293 5.03M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L9.88 9.88" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644C3.423 7.51 7.36 5 12 5c4.64 0 8.577 2.51 9.964 6.678.07.207.07.435 0 .644C20.577 16.49 16.64 19 12 19c-4.64 0-8.577-2.51-9.964-6.678z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5D00] focus:border-[#FF5D00] transition-colors duration-200 bg-gray-50 focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((s) => !s)}
                      className="absolute right-3 top-2.5 h-8 w-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 15.338 6.883 18 12 18c.993 0 1.94-.107 2.828-.308M6.228 6.228A10.45 10.45 0 0112 6c5.117 0 8.774 2.662 10.066 6a10.523 10.523 0 01-4.293 5.03M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L9.88 9.88" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644C3.423 7.51 7.36 5 12 5c4.64 0 8.577 2.51 9.964 6.678.07.207.07.435 0 .644C20.577 16.49 16.64 19 12 19c-4.64 0-8.577-2.51-9.964-6.678z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => { setForgotMode(false); setError(""); setInfo(""); setSecondsLeft(0); }}
                  className="text-sm text-gray-600 hover:underline"
                >
                  Back to Login
                </button>
                <button
                  type="button"
                  onClick={handleVerifyReset}
                  disabled={isSending}
                  className="bg-[#FF5D00] hover:bg-[#E55A00] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200"
                >
                  {isSending ? 'Verifying...' : 'Verify & Reset Password'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Decoration */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center space-x-2 text-gray-400 text-sm">
            <div className="w-2 h-2 bg-[#FF5D00] rounded-full"></div>
            <span>Protected by advanced security</span>
            <div className="w-2 h-2 bg-[#FF5D00] rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
