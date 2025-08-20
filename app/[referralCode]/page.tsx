"use client";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const ReferralPage = () => {
  const { referralCode } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!referralCode || typeof referralCode !== "string") return;

    // Save the referral code
    localStorage.setItem("referralCode", referralCode);

    // Redirect to homepage
    router.replace("/");
  }, [referralCode, router]);

  return (
    <div className="text-center mt-44 text-white">
      <h1 className="text-2xl font-bold">Redirecting...</h1>
    </div>
  );
};

export default ReferralPage;
