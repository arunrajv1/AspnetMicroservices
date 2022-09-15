import { TextField } from "@fluentui/react";
import { Label, makeStyles, shorthands, } from "@fluentui/react-components";
import React, { useEffect, useState } from "react";

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
  const [isShowError, setIsShowError] = useState(false);

  useEffect(() => {
    if (( name == "home_postal_code" || "home_phone" ) && errorMessage && errorMessage.length > 0) {
      setIsShowError(true);
    }
    if (value && value.length > minLength) {
      isRequired = false
    }
  }, [value, errorMessage]);

  return (
    <div className="grid grid-cols-1 gap-1 px-4">
      {/* <div className="flex grid-cols-6 justify-start">
        <Label htmlFor={labelFor}>{labelText}</Label>
      </div> */}
      <div className="grid grid-cols-1">
        <TextField
          placeholder={placeholder}
          id={id}
          onChange={handleChange}
          value={value}
          name={name}
          type={type}
          required={isRequired}
          minLength={minLength}
          maxLength={maxLength}
          disabled={isDisabled}
          errorMessage={errorMessage}
          label={labelText}
          onBeforeInput={contentBefore}
          //contentBefore={contentBefore}
        />
        {/* {isShowError ? (
          <div>
            <span className="text-red-500 text-xs italic">
              {errorMessage}
            </span>
          </div>
        ) : <></>} */}
      </div>
    </div>
  );
};

export default InputBox;
