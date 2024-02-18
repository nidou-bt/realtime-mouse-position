import Footer from "@/components/Footer";
import MouseContainer from "@/components/MouseContainer";
import Navbar from "@/components/Navbar";
import React from "react";

const page = () => {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center relative">
      <Navbar />
      <MouseContainer />
      <Footer />
    </div>
  );
};

export default page;
