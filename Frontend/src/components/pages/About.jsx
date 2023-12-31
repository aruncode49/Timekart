import React from "react";
import Layout from "../layouts/Layout";
import aboutImage from "/images/about.jpg";

const About = () => {
  return (
    <Layout title={"About Us - Timekart"}>
      <div className="max-w-screen-lg mx-auto md:flex items-center justify-center gap-8 mt-20">
        <img
          className="mx-auto w-[400px] mb-8 md:mb-0 rounded-2xl shadow-md"
          src={aboutImage}
          alt="About Logo"
        />
        <p className="text-lg text-center">
          "Elevate your online shopping experience with our cutting-edge
          e-commerce platform, powered by the robust MERN stack (MongoDB,
          Express.js, React.js, and Node.js). We've seamlessly combined the
          power of these technologies to bring you a feature-rich, user-friendly
          platform. Plus, we've enhanced your shopping journey with sleek and
          modern aesthetics, thanks to our use of Tailwind CSS for a visually
          stunning experience."
        </p>
      </div>
    </Layout>
  );
};

export default About;
