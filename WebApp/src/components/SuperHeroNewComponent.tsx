import axios from "axios";
import React, { useState } from "react";
import { baseUrl } from "../constant/api.url";
import { ISuperHero } from "../interface/ISuperHero";
import { postData } from "../services/SuperHeroServices";
import { ConfirmationModal } from "./common/confirmation-modal-popup/ConfirmationPopupComponent";


const initialFormData: any = Object.freeze({
  supId: 0,
  Name: "",
  FirstName: "",
  LastName: "",
  Place: "",
  Gender: "M",
  Skills: "",
});

const SuperHeroNewComponent: React.FC = () => {
  const [formData, updateFormData] = React.useState(initialFormData);
  const [skillsData, setSkillData] = React.useState<any>({ Skills: [] });
  const [alert, setAlert] = React.useState({
    type: "",
    text: "",
    show: false,
  });

  const nameRef = React.useRef();
  const firstNameRef = React.useRef();
  const lastNameRef = React.useRef();
  const genderRef = React.useRef();
  const skillsRef = React.useRef();
  const placeRef = React.useRef();

  const onShowAlert = (type: string, text: string) => {
    setAlert({
      type: type,
      text: text,
      show: true,
    });
  };

  const onCloseAlert = () => {
    setAlert({
      type: "",
      text: "",
      show: false,
    });
  };

  const handleChange = (e: any) => {
    const { name: blockName, checked, value } = e.target;
    if (e.target.name == "Skills") {
      if (checked) {
        skillsData[blockName].push(value);
      } else {
        const index = skillsData[blockName].indexOf(value);
        skillsData[blockName].splice(index, 1);
      }

      console.log("skills array", skillsData);
      setSkillData(skillsData);
    } else {
      updateFormData({
        ...formData,
        // Trimming any whitespace
        [e.target.name]: e.target.value.trim(),
      });
    }
  };

  const handleAPI = async (jsonBody: {}) => {
    const responseData = await postData(jsonBody);
    if (responseData.status === 200) {
      onShowAlert("success", "Data Inserted Successfully");
    } else {
      onShowAlert("error", "Data Inserted Error");
    }
    // const users = responseData.map(parseUserData);
    // return setState({ ...state, users: [...responseData] });
  };

  const saveAllDetails = (e: any) => {
    e.preventDefault();
    let skillsString: string = "";
    if (skillsData.Skills.length > 0) {
      skillsData.Skills.forEach((element: string) => {
        skillsString = skillsString + element + ",";
      });
      skillsString = skillsString.replace(/,\s*$/, ""); //remove last comma
    }
    formData.Skills = skillsString;
    handleAPI(formData);
  };

  return (
    <div className="card">
      <h5 className="card-header">Enter New Details</h5>
      <div className="card-body">
        {/* <h5 className="card-title">Enter New Details</h5> */}
        <form className="card-text" onSubmit={saveAllDetails}>
          <span className="col-md-12 d-flex">
            <div className="form-group col-md-3 p-2">
              <div className="d-flex justify-content-start">
                <label htmlFor="txt_name">Name</label>
              </div>
              <input
                type="text"
                id="txt_name"
                name="Name"
                ref={nameRef.current}
                placeholder="enter super hero name"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <div className="form-group col-md-3 p-2">
              <div className="d-flex justify-content-start">
                <label htmlFor="txt_name">First Name</label>
              </div>
              <input
                type="text"
                id="txt_firstName"
                name="FirstName"
                ref={firstNameRef.current}
                placeholder="enter first name"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <div className="form-group col-md-3 p-2">
              <div className="d-flex justify-content-start">
                <label htmlFor="txt_lastName">Last Name</label>
              </div>
              <input
                type="text"
                id="txt_lastName"
                name="LastName"
                ref={lastNameRef.current}
                placeholder="enter last name"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <div className="form-group col-md-3 p-2">
              <div className="d-flex justify-content-start">
                <label htmlFor="txt_lastName">Place</label>
              </div>
              <input
                type="text"
                id="txt_place"
                name="Place"
                ref={placeRef.current}
                placeholder="enter place name"
                className="form-control"
                onChange={handleChange}
              />
            </div>
          </span>
          <span className="col-md-12 d-flex ">
            <div className="form-group col-md-3 p-2">
              <div className="d-flex justify-content-start">
                <label htmlFor="txt_name">Select Gender</label>
              </div>
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="Gender"
                        id="rad_Male"
                        value="M"
                        ref={genderRef.current}
                        onChange={handleChange}
                        defaultChecked
                      />
                      <label className="form-check-label" htmlFor="rad_Male">
                        Male
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="Gender"
                        id="rad_Female"
                        value="F"
                        ref={genderRef.current}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="rad_Female">
                        Female
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="Gender"
                        id="rad_Other"
                        value="O"
                        ref={genderRef.current}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="rad_Other">
                        Other
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group col-md-6 p-2">
              <div className="d-flex justify-content-start">
                <label htmlFor="txt_name">Select Skills</label>
              </div>
              <span
                className="d-flex justify-content-between"
                onChange={handleChange}
                ref={skillsRef.current}
                id="skills"
              >
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="Fly"
                    id="chk_fly"
                    name="Skills"
                  />
                  <label className="form-check-label" htmlFor="chk_fly">
                    Fly
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="Super Strength"
                    id="defaultCheck2"
                    name="Skills"
                  />
                  <label className="form-check-label" htmlFor="defaultCheck2">
                    Super Strength
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="Bullet Proof"
                    id="defaultCheck2"
                    name="Skills"
                  />
                  <label className="form-check-label" htmlFor="defaultCheck2">
                    Bullet Proof
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="Martial Arts"
                    id="defaultCheck2"
                    name="Skills"
                  />
                  <label className="form-check-label" htmlFor="defaultCheck2">
                    Martial Arts
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="Use Weapons"
                    id="defaultCheck2"
                    name="Skills"
                  />
                  <label className="form-check-label" htmlFor="defaultCheck2">
                    Use Weapons
                  </label>
                </div>
              </span>
            </div>
          </span>
          <button type="submit" className="btn btn-primary">
            Save Details
          </button>
        </form>
      </div>
      {/* <AlertComponent type={"success"} text={"hello"} isShow={true}></AlertComponent> */}
    </div>
  );
};

export default SuperHeroNewComponent;
