import { Button } from "@fluentui/react-components";
import React from "react";
import "../../../style/CommonStyle.scss";

const ButtonComponent = ({
  handleClick,
  type,
  action = "button",
  text,
  hidden,
  isDisabled,
}: any) => {
  return (
    <>
      {type === "Cancel" ? (
        <Button
          type={action}
          hidden={hidden}
          className="group buttonDanger"
          onClick={handleClick}
          style={{backgroundColor: "rgb(220 38 38)"}}
          disabled={isDisabled}
        >
          {text}
        </Button>
      ) : (
        // <button
        //   type={action}
        //   hidden={hidden}
        //   className="group buttonPrimary"
        //   onClick={handleClick}
        // >
        //   {text}
        // </button>
        <Button
          //appearance="primary"
          type={action}
          hidden={hidden}
          className="group buttonPrimary"
          onClick={handleClick}
          style={{ backgroundColor: "#97d700" }}
          disabled={isDisabled}
        >
          {text}
        </Button>
      )}
    </>
  );
};

export default ButtonComponent;
