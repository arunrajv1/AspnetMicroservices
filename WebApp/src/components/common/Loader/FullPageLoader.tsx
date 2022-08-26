import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";

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
    <div style={{ textAlign: 'center', width: "100%" }}>
      <Spinner animation="grow" variant="success" />
    </div>
  );
};

export default FullPageLoader;
