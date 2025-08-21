"use client";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Function to check if all resources are loaded
        const handlePageLoad = () => {
            setLoading(false);
        };

        if (document.readyState === "complete") {
            // Page already loaded
            handlePageLoad();
        } else {
            // Wait for load
            window.addEventListener("load", handlePageLoad);
            return () => window.removeEventListener("load", handlePageLoad);
        }
    }, []);

    if (!loading) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-[9999]">
            {/* <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 border-solid"></div> */}
            {/* logo-gif */}
            <img src="/logo-gif.gif" alt="Loading..." className="h-56" />
        </div>
    );
}
