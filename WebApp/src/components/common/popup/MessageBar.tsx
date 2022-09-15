import { Dismiss16Filled, DismissCircleRegular } from "@fluentui/react-icons";
import { Alert } from "@fluentui/react-components/unstable";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import "../../../style/CommonStyle.scss";

const MessageBar = ({ onClose, type, message }: any) => {
  useEffect(() => {
    setTimeout(() => {
      onClose(false);
    }, 5000);
  }, []);

  const onCloseMessageBar = () => {
    onClose(false);
  };

  return (
    <>
      {ReactDOM.createPortal(
        <Alert
          className="msgBar"
          style={{ backgroundColor: "#99CC00" }}
          intent={type}
          action={{
            icon: <DismissCircleRegular onClick={onCloseMessageBar} />,
          }}
        >
          {message}
        </Alert>,
        document.getElementById("overlay-root")!
      )}
    </>
  );
};

export default MessageBar;