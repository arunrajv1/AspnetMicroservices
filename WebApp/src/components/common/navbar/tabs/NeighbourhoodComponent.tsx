
import { Input, makeStyles, SelectTabData, SelectTabEvent, shorthands, Tab, TabList, TabValue, tokens } from "@fluentui/react-components";
import { Overflow, OverflowItem } from "@fluentui/react-components/unstable";
import React, { SyntheticEvent, useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { patientNameFields } from "../../../../constant/formFields";
import { setPatientDemographicDetails } from "../../../../redux/features/tabSwitchSlice";
import { RootState } from "../../../../redux/store";
import PatientDemographicComponent from "../../../patient/PatientDemographicComponent";
import PatientEmployerComponent from "../../../patient/patientEmployerComponent";
import PatientSearchComponent from "../../../patient/PatientSearchComponent";
import InputBox from "../../ElementsUI/InputBox";
import "../../../../style/CommonStyle.scss";
import { setSinglePatientDetails } from "../../../../redux/features/patientDemographicSlice";

const initialFormData: any = Object.freeze({
  middle_name: "",
  first_name: "",
  last_name: "",
  suffix: "",
});

const NeighbourhoodComponent = () => {

  const [selectedValue, setSelectedValue] = React.useState<TabValue>('demographic');

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
  };
  const [value, setValue] = useState("0");
  const [isDisable, setIsDisable] = useState(false);
  const [formData, updateFormData] = useState(initialFormData);
  const [hasError, setHasError] = useState(false);

  const dispatch = useDispatch();
  //const patientDemographicSelector = useAppSelector((state) => state.data.array);
  // const patientDemographics = useSelector((state: RootState) => state.patientDemographics.array)
  const singlePatientDemographics = useSelector((state: RootState) => state);
/*
  const onCallbackFunction  = useCallback(() => {
    console.log('single PatientDemographics use selector, callback', singlePatientDemographics);
    // updateFormData((t: any) => [...t, "New Todo"]);
  }, []);

  useEffect(() => {
    onCallbackFunction();
    console.log('single PatientDemographics use selector', singlePatientDemographics);
  }, [])*/

  const handleFormChange = (e: any) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const getPatientData = (inputData: any) => {
    let tempFormData = { ...inputData };
    updateFormData(tempFormData);
  };

  const changeFieldDisable = (inputData: any) => {
    setIsDisable(inputData);
  };

  const setDataOnTabChange = (inputData: any) => {
    dispatch(setPatientDemographicDetails(inputData));
    //console.log("patientDemographicSelector", patientDemographics);
  }

  const selectedPatientData = (inputData: any) =>{
    if(inputData.first_name && inputData.last_name){
      dispatch(setSinglePatientDetails(inputData));
      updateFormData(inputData);
      setIsDisable(true);
    }
  }

  return (
    <>
      <PatientSearchComponent onSelectedPatientData={selectedPatientData}></PatientSearchComponent>
      <div className="containerResponsiveAllignment">
        {patientNameFields.map((field: any, i: number) => (
          <div className="lg:col-span-1 md:col-span-4 sm:col-span-4" key={i}>
            <InputBox
              handleChange={handleFormChange}
              value={formData[field.name]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              maxLength={field.maxLength}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
              isDisabled={isDisable}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center bg-lime-500">
        <Overflow minimumVisible={6}>
          <TabList selectedValue={selectedValue} onTabSelect={onTabSelect}>
            <OverflowItem id="demographic">
              <Tab id="Demographic" value="demographic" >
                DEMOGRAPHIC
              </Tab>
            </OverflowItem>
            <OverflowItem id="billingAccounts">
              <Tab id="BillingAccounts" value="billingAccounts">
                BILLING ACCOUNTS
              </Tab>
            </OverflowItem>
            <OverflowItem id="otherInfo">
              <Tab id="OtherInfo" value="otherInfo">
                OTHER INFO
              </Tab></OverflowItem>
            <OverflowItem id="employer">
              <Tab id="Employer" value="employer">
                EMPLOYER
              </Tab></OverflowItem>
            <OverflowItem id="names">
              <Tab id="Names" value="names">
                NAMES
              </Tab></OverflowItem>
            <OverflowItem id="history">
              <Tab id="History" value="history">
                HISTORY
              </Tab></OverflowItem>
          </TabList>
        </Overflow>
      </div>
      <div className="">
        {selectedValue === 'demographic' && <PatientDemographicComponent formData={formData}
          onSavePatientData={getPatientData}
          onChangeDisable={changeFieldDisable}
          onTabChange={setDataOnTabChange} />}

        {selectedValue === 'employer' && <PatientEmployerComponent />}
      </div>
    </>
  );
};

export default NeighbourhoodComponent;
