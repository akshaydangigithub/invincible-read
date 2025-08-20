"use client";

import React, { useState } from "react";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { motion, AnimatePresence } from "framer-motion";

interface SignupFormData {
  username: string;
  email: string;
  walletAddress: string;
}

const SignupModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  connectedAddress?: string;
}> = ({ isOpen, onClose, connectedAddress }) => {
  const [formData, setFormData] = useState<SignupFormData>({
    username: "",
    email: "",
    walletAddress: connectedAddress || "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<SignupFormData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof SignupFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<SignupFormData> = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.walletAddress.trim()) {
      newErrors.walletAddress = "Wallet address is required";
    } else if (!formData.walletAddress.startsWith("0x") || formData.walletAddress.length !== 42) {
      newErrors.walletAddress = "Please enter a valid wallet address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Handle successful signup here
      console.log("Signup successful:", formData);

      // Reset form and close modal
      setFormData({ username: "", email: "", walletAddress: connectedAddress || "" });
      onClose();

      // You can add success notification here
      alert("Successfully signed up for $READ Airdrop!");

    } catch (error) {
      console.error("Signup failed:", error);
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 h-screen backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleOverlayClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 500 }}
            className="bg-gradient-to-br relative from-gray-900 via-gray-800 to-black border border-white/20 rounded-2xl p-8 w-full max-w-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute cursor-pointer top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl sm:text-3xl font-bold text-white mb-2"
              >
                Signup Now
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg sm:text-xl text-white"
              >
                for <span className="font-bold text-blue-400">$READ Airdrop</span>
              </motion.p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Username Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <input
                  type="text"
                  name="username"
                  placeholder="Enter Username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 bg-black/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${errors.username
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                />
                {errors.username && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-red-400 text-sm mt-1"
                  >
                    {errors.username}
                  </motion.p>
                )}
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 bg-black/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${errors.email
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-red-400 text-sm mt-1"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </motion.div>

              {/* Wallet Address Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <input
                  type="text"
                  name="walletAddress"
                  placeholder="Wallet Address"
                  value={formData.walletAddress}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 bg-black/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${errors.walletAddress
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                />
                {errors.walletAddress && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-red-400 text-sm mt-1"
                  >
                    {errors.walletAddress}
                  </motion.p>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                disabled={isLoading}
                onClick={handleSubmit}
                className={`w-full py-4 rounded-full font-semibold text-white text-lg uppercase tracking-wide transition-all ${isLoading
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-[#3730A3] shadow-lg hover:shadow-xl'
                  }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Signing Up...
                  </div>
                ) : (
                  'SIGN UP'
                )}
              </motion.button>
            </div>

            {/* Footer */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-center text-gray-400 text-sm mt-6"
            >
              By signing up, you agree to receive $READ airdrop notifications
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const NavButtons: React.FC = () => {
  const { open } = useAppKit();
  const { isConnected, address } = useAppKitAccount();
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const label =
    isConnected && address
      ? `${address.slice(0, 6)}…${address.slice(-4)}`
      : "Connect Wallet";

  const handleSignupClick = () => {
    setIsSignupModalOpen(true);
  };

  const closeSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <div
          className="px-4 sm:px-[31.78px] py-2.5 sm:py-[12.54px] bg-white rounded-full flex items-center cursor-pointer whitespace-nowrap"
          onClick={() =>
            open({
              view: isConnected ? "Account" : "Connect",
              namespace: "eip155",
            })
          }
        >
          <span className="text-[#2B23B8] text-xs sm:text-[11.15px] font-montserrat font-semibold uppercase">
            {label}
          </span>
        </div>

        <div
          className="px-4 sm:px-[31.78px] py-2.5 sm:py-[12.54px] bg-[#2B23B8] rounded-full md:flex hidden items-center cursor-pointer hover:bg-[#2c26a0] duration-200"
          onClick={handleSignupClick}
        >
          <span className="text-white text-xs sm:text-[11.15px] font-montserrat font-semibold uppercase">
            SIGN UP
          </span>
        </div>
      </div>

      {/* Signup Modal */}
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={closeSignupModal}
        connectedAddress={address}
      />
    </>
  );
};

export default NavButtons;