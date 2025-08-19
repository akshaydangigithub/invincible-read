"use client";
import { useState } from "react";

const faqs = [
    {
        question: "What is Invincible Read?",
        answer:
            "Invincible Read is India’s first Read-to-Earn app, designed to turn your reading habit into real rewards. By reading books, taking quizzes, and earning tokens, users can engage with content, learn smarter, and accumulate rewards in the form of tokens that can be converted to crypto, points, or cash prizes. It’s a gamified way to make learning more fun and rewarding.",
    },
    {
        question: "How does $READ incentivize learning?",
        answer:
            "The $READ token is the core incentive within the Invincible Read ecosystem. By reading books and taking quizzes, users accumulate $READ tokens based on their performance and engagement. These tokens can be used for various rewards such as redeeming gifts, staking, or cashing out. This creates a cycle of motivation, rewarding continuous learning and interaction with the app.",
    },
    {
        question: "How to Participate in the Invincible Read Pre-Sale?",
        answer:
            "Install Wallet\n• MetaMask or Trust Wallet → switch network to BNB Chain (BEP-20).\n\nFund Wallet\n• Deposit USDT (BEP-20).\n• Keep a small BNB balance for gas.\n\nVisit Pre-Sale Site\n• Go to invincibleread.com → click Connect Wallet.\n\nApprove & Buy\n• Approve USDT spend.\n• Click Buy $READ.\n\nClaim Tokens\n• Return on TGE day → press Claim $READ → tokens land in your wallet.\n\nTo know more  - https://medium.com/@invincibleread/how-to-participate-in-the-invincible-read-pre-sale-step-by-step-guide-510e316b428d",
    },
    {
        question: "What is the purpose of Soulbound Credentials?",
        answer:
            "Soulbound Credentials are a unique feature of Invincible Read that ensures a user’s learning achievements, progress, and rewards are permanently linked to their account. These credentials are non-transferable and act as a proof of your knowledge and progress within the app. This helps track your journey and provides a tangible, verified record of your learning accomplishments over time.",
    },
    {
        question: "How is content verified?",
        answer:
            "Content on Invincible Read is verified by leveraging a combination of machine learning algorithms, peer reviews, and external sources to ensure accuracy. This process guarantees that the learning material is credible and up-to-date, ensuring that users receive quality educational content that can contribute to their knowledge and earning potential.",
    },
    {
        question: "Is Invincible Read audited?",
        answer:
            "Yes, Invincible Read is audited by recognized third-party security firms to ensure that all financial and data transactions within the app are secure, transparent, and compliant with industry standards. Regular audits ensure that the app operates with integrity, providing a safe platform for users to engage with content, learn, and earn rewards.",
    },
    {
        question: "How can creators earn?",
        answer:
            "Creators can earn by publishing content on Invincible Read, including books, quizzes, and educational material. They are rewarded through a revenue-sharing model where they receive a percentage of the earnings based on user engagement and token consumption. Creators can also receive $READ tokens when users interact with their content, encouraging high-quality submissions and continuous content creation on the platform.",
    },
    {
        question: "How can I claim my tokens after the Token Generation Event (TGE)?",
        answer:
            "After TGE, eligible users will be able to claim their tokens through our official platform/dashboard. If you participated in any pre-sale or public sale, connect your wallet to the dashboard, and your unlocked tokens will be available for claim. Make sure to use the same wallet address you registered with during the sale.",
    },
    {
        question: "What is the vesting and cliff period for the token distribution?",
        answer:
            "Vesting and cliff periods differ based on your allocation type:\n\n- Pre Sale 1, 2 & 3: 10% claimable at TGE, 6-month cliff, remaining vested over 12 months\n- Team & Advisors: 10% claimable at TGE, 1-year cliff, then vested over 3 years\n- Marketing & Partnerships: 10% claimable at TGE, remaining vested over 3 years\n- Rewards: Distributed over 5 years based on activity\n\nRead more on the Tokenomics page.",
    },
    {
        question: "Is there a cliff period before I can claim more tokens?",
        answer:
            "Yes. For example:\n\n- Pre Sales have a 6-month cliff after the initial 10% TGE claim\n- Team & Advisors have a 1-year cliff after the 10% TGE claim\n\nDuring this period, no additional tokens can be claimed.",
    },
    {
        question: "Where can I track my vesting and claim schedule?",
        answer:
            "You can log in to our vesting dashboard post-TGE to view your claim schedule, unlocked tokens, and future vesting milestones. Just connect your wallet to access your allocation details.",
    },
    {
        question: "What happens if I don’t claim my tokens immediately?",
        answer:
            "Unclaimed tokens remain secure in the vesting contract. You can claim them anytime during the vesting period. However, it's best to stay updated via our announcements to avoid missing important claim dates.",
    },

];

function renderFormattedAnswer(answer: string) {
    const lines = answer.split("\n").filter(Boolean);
    const output: React.ReactNode[] = [];

    lines.forEach((line, index) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;

        if (line.startsWith("•") || line.startsWith("-")) {
            const content = line.replace(/^[-•]\s*/, "").trim();
            output.push(
                <ul key={`ul-${index}`} className="list-disc list-inside mb-2">
                    <li>{content}</li>
                </ul>
            );
        } else if (urlRegex.test(line)) {
            const parts = line.split(urlRegex);
            output.push(
                <p key={`p-${index}`} className="mb-2">
                    {parts.map((part, i) =>
                        urlRegex.test(part) ? (
                            <a
                                key={`link-${index}-${i}`}
                                href={part}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 underline"
                            >
                                {part.includes("medium") ? "Read more on Medium" : part}
                            </a>
                        ) : (
                            <span key={`text-${index}-${i}`}>{part}</span>
                        )
                    )}
                </p>
            );
        } else {
            output.push(
                <p key={`p-${index}`} className="mb-2">
                    {line}
                </p>
            );
        }
    });

    return output;
}


const Right = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    return (
        <div className="w-full flex justify-center items-center py-16">
            <div className="w-[768px] px-8 pt-10 pb-10 bg-white/5 rounded-[20px] border-l border-t border-white/30 backdrop-blur-[2.5px] inline-flex flex-col items-center gap-10">
                {/* Heading */}
                <div className="text-center leading-[64px]">
                    <span className="text-white text-5xl font-bold font-['Montserrat'] tracking-tight">
                        Frequently{" "}
                    </span>
                    <span className="text-white text-5xl font-normal font-['Montserrat'] tracking-tight">
                        Asked Questions
                    </span>
                </div>

                {/* Questions */}
                <div className="w-full flex flex-col gap-5">
                    {faqs.map((faq, index) => (
                        <div key={index} className="w-full border-b border-white/20 pb-4">
                            <div
                                className="flex justify-between items-start cursor-pointer group"
                                onClick={() => toggleFAQ(index)}
                            >
                                <div className="text-white text-base font-light font-['Poppins'] leading-6 tracking-wide">
                                    {faq.question}
                                </div>
                                <div className="w-5 h-7 flex items-center justify-center relative mt-[2px]">
                                    <div
                                        className={`w-4 h-0.5 bg-white transition-transform duration-300 ${openIndex === index ? "rotate-90" : ""
                                            }`}
                                    />
                                </div>
                            </div>

                            {/* Answer */}
                            {openIndex === index && (
                                <div className="mt-3 text-white/80 text-sm font-['Poppins'] leading-relaxed tracking-wide">
                                    {renderFormattedAnswer(faq.answer)}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Right