import ImageScroller from "@/components/Hero/ImageScroller";
import InfoCard from "@/components/Hero/InfoCard";
import InvestmentCard from "@/components/Section2/InvestmentCard";
import TransactionDashbard from "@/components/Section2/TransactionDashbard";
import React from "react";

const page = () => {
  return (
    <div className="pt-20 max-w-[1559px] mx-auto">
      <ImageScroller />
      <InfoCard />
      <div className="py-10 relative mt-10"
        style={{
          backgroundImage: "url('/section2/Background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <img src="/section2/bg1.png" alt="" className="absolute inset-0 w-full h-1/2 object-cover z-10" />
        <div className="relative z-20">

          <InvestmentCard />
          <TransactionDashbard />
        </div>
      </div>
    </div>
  );
};

export default page;
