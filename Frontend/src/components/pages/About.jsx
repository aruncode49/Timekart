import React from "react";
import Layout from "../layouts/Layout";
import aboutImage from "/images/about.jpg";

const About = () => {
  return (
    <Layout>
      <div className="md:flex items-center justify-center gap-4 pb-10">
        <img className="mx-auto w-[400px]" src={aboutImage} alt="About Logo" />
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
