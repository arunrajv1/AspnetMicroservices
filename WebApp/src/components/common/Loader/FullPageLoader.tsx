import { Spinner } from "@fluentui/react-components";
import { useState } from "react";

const FullPageLoader = () => {
  return (
    <div id='container' style={{position: "absolute"}} className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
      <div className="text-center">
        <Spinner size="huge" label="Loading..." />
      </div>
    </div>
  );
};

export default FullPageLoader;
