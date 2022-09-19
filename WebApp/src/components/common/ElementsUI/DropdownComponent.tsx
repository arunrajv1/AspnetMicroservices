import { Dropdown } from '@fluentui/react';
import { ChevronDown16Filled } from '@fluentui/react-icons';
import React from 'react';

interface IDropDownOptions { text: string; key: string }

const DropdownComponent = ({
    handleChange,
    value,
    optionsArray,
    labelText,
    id,
    isRequired = false,
    placeholder,
    isDisabled,
    errorMessage }: any) => {
    // console.log(`from parent value: ${value}`);
    return (
        <div>
            {/* <label htmlFor={id}>{labelText}</label> */}
            <Dropdown
                id={id}
                placeholder={placeholder}
                selectedKey={value ? optionsArray.filter((x: any) => x.key === value)[0].key : ""}
                options={optionsArray}
                onChange={(e, opt) => handleChange(e, opt)}
                disabled={isDisabled}
                required={isRequired}
                label={labelText}
                errorMessage={(value && value.length == 0) ? errorMessage : ""}
            >
            </Dropdown>
        </div>
    )
}

export default DropdownComponent