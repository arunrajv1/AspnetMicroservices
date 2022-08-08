import { Dialog, Alert, AlertTitle } from "@mui/material";
import React, { useState } from "react";

const AlertDialog = (inputProps: any) => {
  const [open, setOpen] = useState(inputProps.alertProps.isAlertOpen);

  const handleClick = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClick}>
        <Alert variant="filled" severity={inputProps.alertProps.alertType} onClose={handleClick}>
          <AlertTitle>{inputProps.alertProps.alertTitle}</AlertTitle>
          {inputProps.alertProps.alertContent}
        </Alert>
      </Dialog>
    </>
  );
};

export default AlertDialog;
