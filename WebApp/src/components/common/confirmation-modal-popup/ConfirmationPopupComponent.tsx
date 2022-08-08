import React, { FunctionComponent } from "react";
import "./ConfirmationPopup.css";

interface IConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

export const ConfirmationModal: FunctionComponent<IConfirmationModalProps> = (
  props
) => {
  return (
    <>
      <React.Fragment>
        <div className="Message">{props.message}</div>
      <div className="ConfirmationButtons">
        <div className="YesButton" onClick={props.onConfirm}>Yes</div>
        <div className="NoButton" onClick={props.onCancel}>No</div>
      </div>
      </React.Fragment>
    </>
  );
};
