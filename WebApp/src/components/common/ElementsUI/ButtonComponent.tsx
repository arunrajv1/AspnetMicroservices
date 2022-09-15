import { Button } from "@fluentui/react-components";
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
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
        <DefaultButton
          type={action}
          hidden={hidden}
          className="group buttonDanger"
          onClick={handleClick}
          style={{ backgroundColor: "rgb(220 38 38)" }}
          disabled={isDisabled}
          text={text}
        />

      ) : (
        <DefaultButton
          type={action}
          hidden={hidden}
          className="group buttonPrimary"
          onClick={handleClick}
          style={{ backgroundColor: "#97d700" }}
          disabled={isDisabled}
          text={text}
        />
      )}
    </>
  );
};

export default ButtonComponent;
