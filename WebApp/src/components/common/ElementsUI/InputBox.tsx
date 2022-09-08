import { Input, Label, makeStyles, shorthands, } from "@fluentui/react-components";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("20px"),
    // Prevent the example from taking the full width of the page (optional)
    // maxWidth: '400px',
    // Stack the label above the field (with 2px gap per the design system)
    "> div": {
      display: "flex",
      flexDirection: "column",
      ...shorthands.gap("2px"),
    },
  },
});

const InputBox = ({
  handleChange,
  value,
  labelText,
  labelFor,
  id,
  name,
  type,
  isRequired = false,
  placeholder,
  errorMessage,
  isDisabled,
  maxLength = 0,
  minLength = 0,
  contentBefore
}: any) => {
  const styles = useStyles();
  const [isShowError, setIsShowError] = useState(false);

  useEffect(() => {
    if (name == "home_postal_code" && errorMessage && errorMessage.length > 0) {
      setIsShowError(true);
    }
    if (value && value.length > minLength) {
      isRequired = false
    }
  }, [value, errorMessage]);

  return (
    <div className="grid grid-cols-1 gap-1 px-4">
      <div className="flex grid-cols-6 justify-start">
        <Label htmlFor={labelFor}>{labelText}</Label>
      </div>
      <div className="grid grid-cols-1">
        <Input
          placeholder={placeholder}
          id={id}
          onChange={handleChange}
          value={value}
          name={name}
          type={type}
          required={isRequired}
          //className="inputBox"
          minLength={minLength}
          maxLength={maxLength}
          disabled={isDisabled}
          contentBefore={contentBefore}
        />
        {/* {isRequired && (
          <div>
            <span className="text-red-500 text-xs italic">
              *Please fill out this field, min 2 characters.
            </span>
          </div>
        )} */}
        {isShowError ? (
          <div>
            <span className="text-red-500 text-xs italic">
              {errorMessage}
            </span>
          </div>
        ) : <></>}
      </div>
    </div>
  );
};

export default InputBox;
