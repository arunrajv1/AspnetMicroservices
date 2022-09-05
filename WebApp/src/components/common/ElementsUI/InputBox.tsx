import { Input, Label, makeStyles, shorthands, } from "@fluentui/react-components";
import React, { useEffect } from "react";

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
  customClass,
  isDisabled
}: any) => {
  const styles = useStyles();

  useEffect(() => {
    if (value && value.length > 2) {
      isRequired = false
    }
  }, [value]);

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
          minLength={2}
          disabled={isDisabled}
        />
        {isRequired && (
          <div>
            <span className="text-red-500 text-xs italic">
              *Please fill out this field, min 2 characters.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputBox;
