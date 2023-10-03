import React from "react";

const CardShimmer = () => {
  return (
    <div className="mt-5 flex flex-wrap gap-4 justify-center">
      {/* card container */}
      {Array(10)
        .fill("")
        .map((v, i) => (
          <div
            key={i}
            className="w-[250px] p-3 border border-gray-300 rounded-xl"
          >
            {/* image */}
            <div className="min-h-[150px] mx-auto rounded-xl bg-gray-300"></div>
            <div className="min-h-[10px] w-[70%] my-4 rounded-xl bg-gray-300"></div>
            <div className="min-h-[10px] w-[50%] rounded-xl bg-gray-300"></div>
          </div>
        ))}
    </div>
  );
};

export default CardShimmer;
