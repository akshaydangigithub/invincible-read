import React from "react";
import Right from "./Right";
import Left from "./Left";

const FAQ = () => {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
      <Left />
      <Right />
    </div>
  );
};

export default FAQ;
