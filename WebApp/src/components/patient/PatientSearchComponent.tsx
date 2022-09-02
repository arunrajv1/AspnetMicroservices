import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from '@fluentui/react-components/unstable';
import React, { useState } from 'react';
import { patientSearchFields } from '../../constant/formFields';
import "../../style/CommonStyle.scss";
import ButtonComponent from '../common/ElementsUI/ButtonComponent';
import InputBox from '../common/ElementsUI/InputBox';
import { getPatientDetails } from "../../services/PatientServices";
import DropdownComponent from '../common/ElementsUI/DropdownComponent';
import { genderOptions } from '../../constant/optionsArray';
import FullPageLoader from '../common/Loader/FullPageLoader';
import AlertPopup from '../common/popup/AlertPopup';

const initialFormData: any = Object.freeze({
    name: "",
    mrn: "",
    gender: "",
    id: "",
});

const genderArray = genderOptions;

const PatientSearchComponent = () => {
    const [formData, updateFormData] = useState(initialFormData);
    const [isDisable, setIsDisable] = useState(false);
    const [alertState, setAlertState] = useState(false);
    const [alertBoxText, setAlertBoxText] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchResult, setSearchResults] = useState([]);

    const changeFieldDisable = (inputData: any) => {
        setIsDisable(inputData);
    };
    const handleFormChange = (e: any, option?: any) => {
        if (e.target.id === "gender") {
            updateFormData({
                ...formData,
                // Trimming any whitespace
                [e.target.id]: option.key,
            });
        }
        else {
            updateFormData({
                ...formData,
                // Trimming any whitespace
                [e.target.name]: e.target.value.trim(),
            });
        }
    };
    const getDetails = async () => {
        setLoading(true);
        await getPatientDetails(formData).then((response) => {
            console.log('get the details', response);
            if (response.status === 200 && response.statusText === "OK" && response.data) {
                setLoading(false);
                setAlertState(true);
                setAlertBoxText("Records Found");
                setSearchResults([]);
                setSearchResults(response.data)
            } else {
                setLoading(false);
                setAlertState(true);
                setAlertBoxText("No Records Found");
            }
        })
    }
    return (
        <>
            <div className='grid grid-rows-12 grid-flow-col justify-center pb-8'>
                <div className='flex gap-4'>
                    <label>Search By: </label>
                    <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1'>
                        {patientSearchFields.map((field: any, i: number) => (
                            <div className="lg:col-span-1 md:col-span-3 sm:col-span-3" key={i}>
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
                        <div>
                            <DropdownComponent
                                handleChange={handleFormChange}
                                value={formData.gender}
                                optionsArray={genderArray}
                                id="gender"
                                isRequired={false}
                                placeholder="Select Gender"
                            //isDisabled={isAllDisable} 
                            /></div>
                    </div>
                    <ButtonComponent
                        handleClick={getDetails}
                        type="Button"
                        text="Search"></ButtonComponent>
                </div>
            </div>
            {searchResult.length > 0 &&
                <div className="px-8 pb-8">
                    <div className='col-span-2 m-4' >
                        <Table sortable={true}>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderCell style={{ maxWidth: "80px" }}>Id</TableHeaderCell>
                                    <TableHeaderCell>First Name</TableHeaderCell>
                                    <TableHeaderCell>Last Name</TableHeaderCell>
                                    <TableHeaderCell>Country</TableHeaderCell>
                                    <TableHeaderCell>State</TableHeaderCell>
                                    <TableHeaderCell>City</TableHeaderCell>
                                    <TableHeaderCell>Contact Number</TableHeaderCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <div style={{ maxHeight: "200px", overflowY: "scroll" }}>
                                    {searchResult.map((row: any, index: number) => (
                                        <TableRow key={index} onDoubleClick={() => console.log(`row clicked id ${row.id} name ${row.first_name}`)}>
                                            <TableCell style={{ maxWidth: "80px" }}>{row.id}</TableCell>
                                            <TableCell>{row.first_name}</TableCell>
                                            <TableCell>{row.last_name}</TableCell>
                                            <TableCell>{row.home_country}</TableCell>
                                            <TableCell>{row.home_state}</TableCell>
                                            <TableCell>{row.home_city}</TableCell>
                                            <TableCell>{row.home_postal_code}</TableCell>
                                        </TableRow>
                                    ))}
                                </div>
                            </TableBody>
                        </Table>
                    </div></div>
            }
            {loading && (
                <div style={{ textAlign: "center", width: "100%" }}>
                    <FullPageLoader></FullPageLoader>
                </div>
            )}
            {alertState ? (
                <AlertPopup
                    onClose={() => setAlertState(false)}
                    text={alertBoxText}
                ></AlertPopup>
            ) : (
                <></>
            )}
        </>
    )
}

export default PatientSearchComponent