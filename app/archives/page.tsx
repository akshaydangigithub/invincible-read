'use client'; // ✅ Required for useEffect

import Image from 'next/image';
import React, { useEffect } from 'react';

const injectBreadcrumbs = () => {
  if (typeof window === 'undefined') return;

  const existing = document.getElementById('breadcrumb-json-ld');
  if (existing) return;

  const script = document.createElement('script');
  script.id = 'breadcrumb-json-ld';
  script.type = 'application/ld+json';
  script.innerHTML = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://invincibleread.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Archives",
        "item": "https://invincibleread.com/archives"
      }
    ]
  });
  document.head.appendChild(script);
};

const images = [
  '/archive/1.jpg', '/archive/2.jpg', '/archive/3.jpg', '/archive/4.jpg', '/archive/5.jpg',
  '/archive/6.jpg', '/archive/8.jpg', '/archive/9.jpg', '/archive/10.jpg', '/archive/11.jpg',
  '/archive/12.jpg', '/archive/13.jpg', '/archive/14.jpg', '/archive/15.jpg', '/archive/16.jpg',
  '/archive/17.jpg', '/archive/18.jpg', '/archive/19.jpg', '/archive/20.jpg', '/archive/21.jpg',
  '/archive/22.jpg', '/archive/23.jpg', '/archive/24.jpg', '/archive/25.jpg', '/archive/26.jpg',
  '/archive/27.jpg', '/archive/28.jpg', '/archive/29.jpg', '/archive/30.jpg', '/archive/31.jpg',
  '/archive/32.jpg', '/archive/33.jpg', '/archive/34.jpg', '/archive/35.jpg', '/archive/36.jpg',
  '/archive/37.jpg', '/archive/38.jpg', '/archive/39.jpg', '/archive/40.jpg', '/archive/41.jpg',
  '/archive/42.jpg', '/archive/43.jpg', '/archive/44.jpg', '/archive/45.jpg',
];

export default function ArchivesPage() {
  // useEffect(() => {
  //   injectBreadcrumbs();
  // }, []);

  useEffect(() => {
    scrollTo(0, 0);
  })

  return (
    <section className="w-[90%] mx-auto min-h-screen bg-black text-white px-20 mt-16 py-12 sm:py-20">
      <h1 className="text-center text-[36px] sm:text-[60px] font-montserrat font-medium leading-tight uppercase tracking-wide mb-12">
        Invincible Event Archive
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((src, index) => (
          <div
            key={index}
            className={`relative rounded-xl overflow-hidden ${index % 7 === 0 ? 'row-span-2 col-span-2' : ''
              }`}
          >
            <Image
              src={src}
              alt={`Event ${index + 1}`}
              width={600}
              height={600}
              className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
