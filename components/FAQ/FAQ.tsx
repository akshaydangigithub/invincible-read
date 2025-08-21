import React from "react";
import Right from "./Right";
import Left from "./Left";

const FAQ = () => {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
      {/* On mobile: Right first, then Left | On desktop: Left first, then Right */}
      <div className="order-2 lg:order-1 flex items-center justify-center">
        <Left />
      </div>
      <div className="order-1 lg:order-2">
        <Right />
      </div>
    </div>
  );
};

export default FAQ;
