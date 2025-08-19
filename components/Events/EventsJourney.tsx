"use client"

import React, { useState, useEffect } from "react";

// Types
interface Event {
    id: number;
    edition: string;
    date: string;
    crowd: number;
    venue: string;
    description: string;
    images: string[];
}

interface Position {
    x: number;
    y: number;
    isAbove: boolean;
}

// Mock Heading component
const Heading: React.FC = () => (
    <>
        <h2 className="text-center font-montserrat text-[40px] sm:text-[60px] leading-[1.2] tracking-wide uppercase">
            <span className="font-bold"> Events &</span> <br /> Presentation
        </h2>
        <p className='text-2xl font-thin mt-4 uppercase text-center text-white/80'>India’s biggest literature festival</p>
    </>
);

// Image Carousel Component
const ImageCarousel: React.FC<{ images: string[]; edition: string }> = ({ images, edition }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="relative overflow-hidden rounded-t-3xl h-48">
            <div
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`${edition} - Image ${index + 1}`}
                        className="w-full h-full object-cover flex-shrink-0"
                    />
                ))}
            </div>

            {/* Carousel Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${index === currentIndex
                            ? 'bg-white'
                            : 'bg-white/40'
                            }`}
                        type="button"
                        aria-label={`Go to image ${index + 1}`}
                    />
                ))}
            </div>

            {/* Gradient overlay */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent)'
                }}
            />
        </div>
    );
};

// Event Card Component
interface EventCardProps {
    event: Event;
    position: { x: number; y: number };
    onClose: () => void;
}

const EventCard = React.forwardRef<HTMLDivElement, EventCardProps>(
    ({ event, position, onClose }, ref) => {
        return (
            <div
                ref={ref}
                className="absolute z-20 transition-all duration-500 ease-out animate-fadeInScale shrink-0 w-96"
                style={{
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                    transform: 'translate(-50%, -50%)'
                }}
            >
                <div className="max-w-sm relative">
                    <div
                        className="relative rounded-3xl overflow-hidden shadow-2xl transform"
                        style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.85)',
                            backdropFilter: 'blur(16px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                    >
                        {/* Card Glow Effect */}
                        <div
                            className="absolute -inset-1 rounded-3xl opacity-75 blur-sm"
                            style={{
                                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3))'
                            }}
                        />

                        <div
                            className="relative rounded-3xl"
                            style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center"
                                type="button"
                                aria-label="Close event details"
                            >
                                <span className="text-white text-lg leading-none">×</span>
                            </button>

                            {/* Image Carousel */}
                            <ImageCarousel images={event.images} edition={event.edition} />

                            <div className="p-6">
                                <div className="text-center mb-4">
                                    <h3 className="text-2xl font-bold mb-2">
                                        <span
                                            className="bg-clip-text text-transparent"
                                            style={{
                                                backgroundImage: 'linear-gradient(to right, #ffffff, #d1d5db)'
                                            }}
                                        >
                                            {event.edition}
                                        </span>
                                    </h3>
                                    <p className="text-white/80 font-semibold text-base">{event.date}</p>
                                </div>

                                <p className="text-gray-300 text-sm leading-relaxed mb-6 text-center">
                                    {event.description}
                                </p>

                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white border-opacity-10">
                                    <div className="text-center">
                                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">CROWD</p>
                                        <p className="text-2xl font-bold">
                                            <span
                                                className="bg-clip-text text-transparent"
                                                style={{
                                                    backgroundImage: 'linear-gradient(to right, #a78bfa, #60a5fa)'
                                                }}
                                            >
                                                {event.crowd.toLocaleString()}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">VENUE</p>
                                        <p className="text-2xl font-bold">
                                            <span
                                                className="bg-clip-text text-transparent"
                                                style={{
                                                    backgroundImage: 'linear-gradient(to right, #a78bfa, #60a5fa)'
                                                }}
                                            >
                                                {event.venue}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

// Timeline Node Component
const TimelineNode: React.FC<{
    event: Event;
    position: Position;
    isSelected: boolean;
    onClick: (event: Event) => void;
}> = ({ event, position, isSelected, onClick }) => {
    const pillarHeight = position.isAbove ? '5rem' : '4rem';
    const selectedPillarHeight = position.isAbove ? '7rem' : '6rem';

    return (
        <div
            className="absolute"
            style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: 'translateX(-50%)'
            }}
        >
            {/* Vertical Pillar */}
            <div
                className="w-1 transition-all duration-500 mx-auto"
                style={{
                    height: isSelected ? selectedPillarHeight : pillarHeight,
                    background: position.isAbove
                        ? 'linear-gradient(to top, transparent, rgba(255, 255, 255, 0.8))'
                        : 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.8))',
                    boxShadow: isSelected ? '0 0 20px rgba(139, 92, 246, 0.5)' : 'none',
                    marginTop: position.isAbove ? 'auto' : '0',
                    marginBottom: position.isAbove ? '0' : 'auto'
                }}
            />

            {/* Glowing Node */}
            <button
                onClick={() => onClick(event)}
                className="absolute w-12 h-12 rounded-full border-2 transition-all duration-300 transform hover:scale-110 focus:outline-none"
                style={{
                    left: '50%',
                    [position.isAbove ? 'top' : 'bottom']: '-24px',
                    transform: 'translateX(-50%)',
                    borderColor: isSelected ? '#8b5cf6' : '#374151',
                    boxShadow: isSelected
                        ? '0 0 20px rgba(139, 92, 246, 0.6), inset 0 0 20px rgba(139, 92, 246, 0.2)'
                        : '0 4px 8px rgba(0, 0, 0, 0.3)'
                }}
                type="button"
                aria-label={`Select ${event.edition}`}
            >
                <div
                    className="w-full h-full rounded-full transition-all duration-300"
                    style={{
                        background: isSelected
                            ? 'linear-gradient(135deg, #8b5cf6, #3b82f6)'
                            : 'linear-gradient(135deg, #374151, #1f2937)',
                    }}
                />
            </button>

            {/* Event Label */}
            <div
                className="absolute text-center transition-all duration-300 whitespace-nowrap"
                style={{
                    left: '50%',
                    [position.isAbove ? 'bottom' : 'top']: '-4rem',
                    transform: 'translateX(-50%)',
                    color: isSelected ? '#8b5cf6' : '#9ca3af',
                    fontSize: isSelected ? '0.875rem' : '0.75rem',
                    fontWeight: isSelected ? '600' : '400'
                }}
            >
                {event.edition}
            </div>
        </div>
    );
};

// Timeline Curve Component
const TimelineCurve: React.FC = () => (
    <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
    >
        <defs>
            <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
            </linearGradient>

            <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>

        {/* Background glow effect */}
        <path
            d="M100,200 C300,120 400,260 550,180 C700,100 800,220 950,160 C1050,100 1100,140 1100,120"
            stroke="url(#glowGradient)"
            strokeWidth="20"
            fill="none"
            opacity="0.3"
        />

        {/* Main flowing curve */}
        <path
            d="M100,200 C300,120 400,260 550,180 C700,100 800,220 950,160 C1050,100 1100,140 1100,120"
            stroke="url(#curveGradient)"
            strokeWidth="6"
            fill="none"
            filter="url(#glow)"
        />
    </svg>
);

// Main EventsJourney Component
const EventsJourney: React.FC = () => {
    const [selected, setSelected] = useState<Event | null>(null);
    const cardRef = React.useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
                setSelected(null);
            }
        }
        if (selected) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [selected]);

    // Sample events data with multiple images
    const events: Event[] = [
        {
            id: 1,
            edition: "1ST EDITION",
            date: "Oct-Nov 2019",
            crowd: 150,
            venue: "DLF Cyberhub",
            description:
                "The opening act of daring writers in first print and emerging voices. The edition consisted of inspiring speeches of publishing pioneers, educators, and startup leaders and enabled Invincible to become a mission-driven entrepreneurship and empowerment organization.",
            images: [
                "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop",
                "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=250&fit=crop",
                "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=250&fit=crop"
            ],
        },
        {
            id: 2,
            edition: "2ND EDITION",
            date: "Nov 2020",
            crowd: 3000,
            venue: "Online",
            description:
                "A powerful gathering of 20+ speakers — from educators to startup founders — brought sharp focus on education reform, startup journeys, and youth-driven innovation. This edition celebrated the spark of young literary and entrepreneurial talent.",
            images: [
                "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=250&fit=crop",
                "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=400&h=250&fit=crop",
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop"
            ],
        },
        {
            id: 3,
            edition: "3RD EDITION",
            date: "Nov 2021",
            crowd: 8500,
            venue: "Online",
            description: "Leading an online event with more than 10,000 attendees, this season of the online festival addressed the topics such as mental health, online education, and pandemic resilience in their topicality. It presented authors, psychologists, and creators and gave out rays of hope and knowledge in times when one did not know what to expect.",
            images: [
                "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=250&fit=crop",
                "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=250&fit=crop",
                "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=250&fit=crop"
            ],
        },
        {
            id: 4,
            edition: "4TH EDITION",
            date: "Oct 2022",
            crowd: 38000,
            venue: "Cyberhub",
            description: "With a twist to the maker economy, this edition was an in-depth discussion on self-publishing, personal branding and influencer-driven storytelling. It equipped the voice of the next-gen with book launches to getting-down-to-business workshops in the art of creating content and public speaking.",
            images: [
                "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop",
                "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=250&fit=crop",
                "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=250&fit=crop"
            ],
        },
        {
            id: 5,
            edition: "5TH EDITION",
            date: "Feb 2023",
            crowd: 82000,
            venue: "Cyberhub",
            description: "A collaborative milestone that involves more than 50 educators, authors and investors. This edition was a match made in heaven between literature and innovative learning since it featured reward ceremonies in educational excellence, AI learning tool demonstrations, and launching of innovative books.",
            images: [
                "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=400&h=250&fit=crop",
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
                "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=250&fit=crop"
            ],
        },
        {
            id: 6,
            edition: "6TH EDITION",
            date: "Feb 2024",
            crowd: 150000,
            venue: "Ambience Mall",
            description: "The grandest edition yet — spotlighting leaders from AI, finance, and entrepreneurship. Packed with student-led interactions, live content creation, and deep conversations, it stood as India’s biggest celebration of youth, innovation, and authorship.",
            images: [
                "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=250&fit=crop",
                "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=250&fit=crop",
                "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop"
            ],
        },
    ];

    // Alternating positions (above and below curve)
    const getNodePositions = (): Position[] => [
        { x: 8.5, y: 28, isAbove: true },    // 1st - above
        { x: 25, y: 45, isAbove: false },    // 2nd - below
        { x: 41.5, y: 30, isAbove: true },   // 3rd - above  
        { x: 58, y: 40, isAbove: false },    // 4th - below
        { x: 74.5, y: 24, isAbove: true },   // 5th - above
        { x: 91, y: 35, isAbove: false }     // 6th - below
    ];

    const nodePositions = getNodePositions();

    const handleNodeClick = (event: Event): void => {
        setSelected(selected?.id === event.id ? null : event);
    };

    const handleCloseCard = (): void => {
        setSelected(null);
    };

    const getCardPosition = (eventId: number): { x: number; y: number } => {
        const eventIndex = events.findIndex(e => e.id === eventId);
        const nodePosition = nodePositions[eventIndex];

        // Position card relative to the node but ensure it stays within bounds
        let cardX = nodePosition.x;
        let cardY = nodePosition.isAbove ? nodePosition.y - 10 : nodePosition.y + 10;

        // Boundary checks
        if (cardX < 25) cardX = 25;
        if (cardX > 75) cardX = 75;
        if (cardY < 15) cardY = 15;
        if (cardY > 85) cardY = 85;

        return { x: cardX, y: cardY };
    };

    return (
        <section className="relative min-h-screen bg-black text-white overflow-hidden">
            <div className="relative z-10 px-6 pb-16">
                <Heading />

                <div className="relative max-w-6xl mx-auto mt-48">
                    <div className="relative h-96">
                        <TimelineCurve />

                        {/* Timeline Nodes */}
                        {events.map((event: Event, index: number) => (
                            <TimelineNode
                                key={event.id}
                                event={event}
                                position={nodePositions[index]}
                                isSelected={selected?.id === event.id}
                                onClick={handleNodeClick}
                            />
                        ))}

                        {/* Event Card positioned at node location */}
                        {selected && (
                            <EventCard
                                ref={cardRef}
                                event={selected}
                                position={
                                    typeof window !== "undefined" && window.innerWidth < 640
                                        ? { x: 50, y: 50 }
                                        : getCardPosition(selected.id)
                                }
                                onClose={handleCloseCard}
                            />
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInScale {
                    from {
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(1);
                    }
                }
                
                .animate-fadeInScale {
                    animation: fadeInScale 0.3s ease-out;
                }
            `}</style>
        </section>
    );
};

export default EventsJourney;