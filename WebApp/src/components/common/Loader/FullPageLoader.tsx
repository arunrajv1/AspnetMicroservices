import { useState } from "react";

const FullPageLoader = () => {
  const [loading, setLoading] = useState(false);
  // return [
  //   loading ? (
  //     <Spinner animation="border" role="status">
  //       <span className="visually-hidden">Loading...</span>
  //     </Spinner>
  //   ) : null,
  //   () => setLoading(true),
  //   () => setLoading(false),
  // ];
  return (
    <div id='container' className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
      <div className="text-center">
        <div className="spinner-border text-info" style={{ width: "3rem", height: "3rem" }} role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    </div>
  );
};

export default FullPageLoader;
