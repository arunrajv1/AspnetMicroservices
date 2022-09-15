import { MaskedTextField, TextField } from "@fluentui/react";
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
    if ((name == "home_postal_code" || "home_phone") && errorMessage && errorMessage.length > 0) {
      setIsShowError(true);
    }
    if (value && value.length > minLength) {
      isRequired = false
    }
  }, [value, errorMessage]);

  return (
    <div className="grid grid-cols-1 gap-1 px-4">
      <div className="grid grid-cols-1">
        {(id === "txtHomePhone" || id === "txtWorkPhone") ? (
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
            prefix={contentBefore + "  "}
          />

        ) : (
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
          />
        )}
      </div>
    </div>
  );
};

export default InputBox;
