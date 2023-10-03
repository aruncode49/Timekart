import React from "react";
import { ColorRing } from "react-loader-spinner";

const ColorRingLoader = () => {
  return (
    <div className="grid h-[70vh] mx-auto place-items-center">
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
    </div>
  );
};

export default ColorRingLoader;
