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
    isDisabled }: any) => {
    // console.log(`from parent value: ${value}`);
    // console.table('from parent optionsArray', optionsArray)
    return (
        <div>
            <label htmlFor={id}>{labelText}</label>
            <Dropdown
                id={id}
                placeholder={placeholder}
                selectedKey={value ? optionsArray.filter((x: any) => x.key === value)[0].key : ""}
                options={optionsArray}
                onChange={(e, opt) => handleChange(e, opt)}
                disabled={isDisabled}
                required={isRequired}

                onRenderCaretDown={() => {
                    return (
                        <ChevronDown16Filled />
                    );
                }}
            >
            </Dropdown>
        </div>
    )
}

export default DropdownComponent