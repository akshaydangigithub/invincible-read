import ImageScroller from "@/components/Hero/ImageScroller";
import InfoCard from "@/components/Hero/InfoCard";
import InvestmentCard from "@/components/Section2/InvestmentCard";
import TransactionDashboard from "@/components/Section2/TransactionDashboard";
import React from "react";
import ReferAndEarn from "../components/section3/ReferAndEarn";
import LogoScroll from "@/components/LogoScroll";
import Authors from "@/components/Authors";
import TokenUtilityOverview from "../components/TokenUtilityOverview";
import Usp from "@/components/USP";
import UCNS from "../components/UCNS";
import Tokenomics from "@/components/Tokenomics";
import EventGallery from "@/components/EventGallery";
import FAQ from "@/components/FAQ/FAQ";
import EventsJourney from "@/components/Events/EventsJourney";
import MobileMenu from "@/components/MobileMenu";

const page = () => {
  return (
    <div className="pt-20 max-w-[1559px] mx-auto">
      <div className="w-[90%] mx-auto">
        <ImageScroller />
        <InfoCard />
      </div>
      <div
        className="py-10 relative mt-10"
        style={{
          backgroundImage: "url('/section2/Background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img
          src="/section2/bg1.png"
          alt=""
          className="absolute inset-0 w-full h-1/2 object-cover z-10"
        />
        <img
          src="/section2/bg2.png"
          alt=""
          className="absolute w-full h-1/2 object-cover z-10 bottom-0"
        />
        <div className="relative z-20">
          <InvestmentCard />
          <TransactionDashboard />
        </div>
      </div>

      <div className="relative overflow-hidden">
        <img
          src="/section3/vector1.png"
          alt=""
          className="w-[50%] absolute -bottom-[25%] -right-[15%] opacity-30 rotate-45"
        />
        <ReferAndEarn />
      </div>

      <LogoScroll />
      <Authors />
      <EventsJourney />
      <TokenUtilityOverview />
      <div className="relative">
        <img
          src="/section3/vector2.png"
          alt=""
          className="w-[50%] absolute -bottom-24 -left-[10%] opacity-30 rotate-45 md:visible hidden"
        />
        <Usp />
      </div>
      <div className="w-[90%] mx-auto">
        <UCNS />
        <section id="tokenomics">
          <Tokenomics />
        </section>
        <EventGallery />
        <FAQ />
      </div>

      <MobileMenu />
    </div>
  );
};

export default page;
