import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from '@fluentui/react-components/unstable';
import React, { useState } from 'react';
import { patientSearchFields } from '../../constant/formFields';
import "../../style/CommonStyle.scss";
import ButtonComponent from '../common/ElementsUI/ButtonComponent';
import InputBox from '../common/ElementsUI/InputBox';

const initialFormData: any = Object.freeze({
    name: "",
    mrn: "",
    gender: "",
    id: "",
});

const PatientSearchComponent = () => {
    const [formData, updateFormData] = useState(initialFormData);
    const [isDisable, setIsDisable] = useState(false);

    const changeFieldDisable = (inputData: any) => {
        setIsDisable(inputData);
    };
    const handleFormChange = (e: any) => {
        updateFormData({
            ...formData,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim(),
        });
    };
    const getPatientDetails = () => {
        console.log('get the details');
    }
    return (
        <div className='grid grid-rows-2 grid-flow-col justify-center'>
            <div className='flex col-span-2'>
                <label>Search By: </label>
                <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1'>
                    {patientSearchFields.map((field: any, i: number) => (
                        <div className="lg:col-span-1 md:col-span-4 sm:col-span-4" key={i}>
                            <InputBox
                                handleChange={handleFormChange}
                                value={formData[field.name]}
                                labelFor={field.labelFor}
                                id={field.id}
                                name={field.name}
                                type={field.type}
                                isRequired={field.isRequired}
                                placeholder={field.placeholder}
                                isDisabled={isDisable}
                            />
                        </div>
                    ))}
                </div>
                <ButtonComponent
                    handleClick={getPatientDetails}
                    type="Button"
                    text="Search"></ButtonComponent>
            </div>
            <div className='col-span-2'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>First Name</TableHeaderCell>
                            <TableHeaderCell>Last Name</TableHeaderCell>
                            <TableHeaderCell>Middle Name</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

        </div>
    )
}

export default PatientSearchComponent