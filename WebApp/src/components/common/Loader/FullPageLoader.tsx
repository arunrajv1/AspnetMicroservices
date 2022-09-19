import { Dialog, DialogSurface } from "@fluentui/react-components/unstable";
import { Spinner } from "@fluentui/react-components";
import { useState } from "react";

const FullPageLoader = () => {
  return (
    <Dialog open={true}>
      <div id='container' className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
        <div className="text-center">
          <Spinner size="huge" label="Loading..." />
        </div>
      </div>
    </Dialog>
  );
};

export default FullPageLoader;
