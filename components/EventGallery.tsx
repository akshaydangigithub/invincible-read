import React from "react";

const EventGallery = () => {
  return (
    <section className="text-white py-6 px-4 sm:py-8 sm:px-6 lg:py-10 lg:px-6 w-[90%] mx-auto">
      <h2 className="text-center text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
        EVENTS <span className="font-light">SNAPS</span>
      </h2>

      {/* Desktop Layout (lg and above) */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-4 lg:min-h-[700px]">
        {/* Left Column */}
        <div className="col-span-3 flex flex-col gap-4 h-full">
          <div className="flex-1">
            <img
              src="/events/img1.png"
              alt="event1"
              className="h-full w-full object-cover rounded-lg"
            />
          </div>
          <div className="flex-1">
            <img
              src="/events/img2.png"
              alt="event2"
              className="h-full w-full object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Middle Column */}
        <div className="col-span-6 flex flex-col gap-4 h-full">
          {/* Top row with 2 images */}
          <div className="flex gap-4 flex-1">
            <div className="flex-1">
              <img
                src="/events/img3.png"
                alt="event3"
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <img
                src="/events/img4.png"
                alt="event4"
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Middle large image */}
          <div className="flex-[1.5]">
            <img
              src="/events/img5.png"
              alt="event5"
              className="h-full w-full object-cover rounded-lg"
            />
          </div>

          {/* Bottom row with 2 images */}
          <div className="flex gap-4 flex-1">
            <div className="flex-1">
              <img
                src="/events/img6.png"
                alt="event6"
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <img
                src="/events/img7.png"
                alt="event7"
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-3 h-full">
          <img
            src="/events/img8.png"
            alt="event8"
            className="h-full w-full object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Tablet Layout (md to lg) */}
      <div className="hidden md:grid lg:hidden grid-cols-2 gap-4">
        <div className="space-y-4">
          <img
            src="/events/img1.png"
            alt="event1"
            className="w-full h-48 object-cover rounded-lg"
          />
          <img
            src="/events/img3.png"
            alt="event3"
            className="w-full h-48 object-cover rounded-lg"
          />
          <img
            src="/events/img5.png"
            alt="event5"
            className="w-full h-48 object-cover rounded-lg"
          />
          <img
            src="/events/img7.png"
            alt="event7"
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
        <div className="space-y-4">
          <img
            src="/events/img2.png"
            alt="event2"
            className="w-full h-48 object-cover rounded-lg"
          />
          <img
            src="/events/img4.png"
            alt="event4"
            className="w-full h-48 object-cover rounded-lg"
          />
          <img
            src="/events/img6.png"
            alt="event6"
            className="w-full h-48 object-cover rounded-lg"
          />
          <img
            src="/events/img8.png"
            alt="event8"
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Mobile Layout (below md) */}
      <div className="grid md:hidden grid-cols-1 gap-4">
        <img
          src="/events/img1.png"
          alt="event1"
          className="w-full h-56 object-cover rounded-lg"
        />
        <img
          src="/events/img2.png"
          alt="event2"
          className="w-full h-56 object-cover rounded-lg"
        />
        <img
          src="/events/img3.png"
          alt="event3"
          className="w-full h-56 object-cover rounded-lg"
        />
        <img
          src="/events/img4.png"
          alt="event4"
          className="w-full h-56 object-cover rounded-lg"
        />
        <img
          src="/events/img5.png"
          alt="event5"
          className="w-full h-64 object-cover rounded-lg"
        />
        <img
          src="/events/img6.png"
          alt="event6"
          className="w-full h-56 object-cover rounded-lg"
        />
        <img
          src="/events/img7.png"
          alt="event7"
          className="w-full h-56 object-cover rounded-lg"
        />
        <img
          src="/events/img8.png"
          alt="event8"
          className="w-full h-56 object-cover rounded-lg"
        />
      </div>

      <button className="mt-8 sm:mt-10 block mx-auto px-12 sm:px-16 cursor-pointer uppercase py-2 bg-[#2B2B2B] text-white rounded-full hover:bg-[#404040] transition-colors duration-200">
        Load more
      </button>
    </section>
  );
};

export default EventGallery;
