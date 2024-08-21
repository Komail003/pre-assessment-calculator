import React, { useEffect, useState } from "react";
// import single from "../Svgs/single-2.svg";
// import couple from "../Svgs/couple-2.svg";
import SingleIcon from "../Svgs/single-2.svg";
import CoupleIcon from "../Svgs/couple-2.svg";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { personalDataState } from "../Atom";
import { useRecoilState } from "recoil";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa"; // Example using react-icons
import { autoPlacement, offset } from "@floating-ui/dom";

// import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import DynamicYesNo from "./DynamicYesNo/DynamicYesNo";
import { useRouter, usePathname } from "next/navigation";

function PersonalData(props) {
  const [formData, setFormData] = useRecoilState(personalDataState); // Using Recoil state
  // const [selectedDate, setSelectedDate] = useState(null);

  // const initialValues = formData;
  // const validationSchema = Yup.object({
  //   firstName: Yup.string().required("it is Requiresd"),
  // });
  const initialValues = {
    relationShipStatus: "single",
    partnerRelationShipStatus: "couple",
    firstName: "",
    partnerFirstName: "",
    surName: "",
    partnerSurName: "",
    preferredName: "",
    partnerPreferredName: "",
    DOB: "",
    partnerDOB: "",
    email: "",
    partnerEmail: "",
    phoneNumber: "",
    partnerPhoneNumber: "",
    occupation: "",
    partnerOccupation: "",
  };
  const router = useRouter();

  const onSubmit = (values) => {
    // console.log(values);
let Obj={};
if(values.relationShipStatus== "single"){
  Obj={
   relationShipStatus: values.relationShipStatus||"",
     firstName: values.firstName||"",
     surName: values.surName||"",
     preferredName: values.preferredName||"",
     DOB: values.DOB||"",
     email: values.email||"",
     phoneNumber: values.phoneNumber||"",
     occupation: values.occupation||"",
 }
}else{
  Obj={
    relationShipStatus:values.relationShipStatus||"",
    partnerRelationShipStatus:values.partnerRelationShipStatus||"",
    firstName:values.firstName||"",
    partnerFirstName:values.partnerFirstName||"",
    surName:values.surName||"",
    partnerSurName:values.partnerSurName||"",
    preferredName:values.preferredName||"",
    partnerPreferredName:values.partnerPreferredName||"",
    DOB:values.DOB||"",
    partnerDOB:values.partnerDOB||"",
    email:values.email||"",
    partnerEmail:values.partnerEmail||"",
    phoneNumber:values.phoneNumber||"",
    partnerPhoneNumber:values.partnerPhoneNumber||"",
    occupation:values.occupation||"",
    partnerOccupation:values.partnerOccupation||"",
  };

}
    sessionStorage.setItem("PersonalData", JSON.stringify(Obj));
    router.push("../KidsDetails");
    // props.handleStepChange();
  };
  const updateFieldValues = (setFieldValue) => {
    // alert("komail2");
    let data = JSON.parse(sessionStorage.getItem("PersonalData"));
    // console.log("Data",data)
    setFieldValue("relationShipStatus", data.relationShipStatus || "");
    setFieldValue(
      "partnerRelationShipStatus",
      data.partnerRelationShipStatus || ""
    );
    setFieldValue("firstName", data.firstName || "");
    setFieldValue("partnerFirstName", data.partnerFirstName || "");
    setFieldValue("surName", data.surName || "");
    setFieldValue("partnerSurName", data.partnerSurName || "");
    setFieldValue("preferredName", data.preferredName || "");
    setFieldValue("partnerPreferredName", data.partnerPreferredName || "");
    setFieldValue("DOB", data.DOB || "");
    setFieldValue("partnerDOB", data.partnerDOB || "");
    setFieldValue("email", data.email || "");
    setFieldValue("partnerEmail", data.partnerEmail || "");
    setFieldValue("phoneNumber", data.phoneNumber || "");
    setFieldValue("partnerPhoneNumber", data.partnerPhoneNumber || "");
    setFieldValue("occupation", data.occupation || "");
    setFieldValue("partnerOccupation", data.partnerOccupation || "");
  };
  return (
    <div className="container">
      <Formik
        initialValues={
          formData.firstName == "" && formData.email == ""
            ? initialValues
            : formData
        }
        // validationSchema={validationSchema}
        onSubmit={onSubmit}
        innerRef={props.FormReff}
      >
        {({ values, handleChange, setFieldValue, handleBlur }) => {
          useEffect(() => {
            // alert("komail");
            if (sessionStorage.getItem("PersonalData")) {
              // alert("komail1");
              updateFieldValues(setFieldValue);
            }
          }, []);

          return (
            <Form>
              <div className="row">
                <h2 className="Green fw-bold text-center mt-5">
                  Pre-Assessment Calculator
                </h2>

                <div className="col-md-4 mt-3"></div>
                <div className="col-md-4 mt-3 text-center">
                  <span className="fw-bold h5 ">Client </span>
                  <SingleIcon width={"20px"} className="mb-1" />
                </div>
                {values.relationShipStatus == "single" || (
                  <div className="col-md-4 mt-3 text-center largeScrnPartnerForm">
                    <span className="fw-bold h5">Partner </span>
                    <CoupleIcon className="mb-1" width={"25px"} />
                  </div>
                )}
              </div>
              <div className="row mt-3">
                <div className="col-md-4">
                  <label htmlFor="firstName">First Name</label>
                </div>
                <div className="col-md-4">
                  <Field
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="form-control"
                  />
                  <ErrorMessage
                    component={"div"}
                    name="firstName"
                    className="text-danger"
                  />
                </div>
                {values.relationShipStatus == "single" || (
                  <div className="col-md-4 largeScrnPartnerForm">
                    <Field
                      type="text"
                      name="partnerFirstName"
                      id="partnerFirstName"
                      className="form-control"
                    />
                  </div>
                )}
              </div>
              <div className="row mt-3">
                <div className="col-md-4">
                  <label htmlFor="">Surname</label>
                </div>
                <div className="col-md-4">
                  <Field type="text" name="surName" className="form-control" />
                </div>
                {values.relationShipStatus == "single" || (
                  <div className="col-md-4 largeScrnPartnerForm">
                    <Field
                      type="text"
                      name="partnerSurName"
                      className="form-control"
                    />
                  </div>
                )}
              </div>
              <div className="row mt-3">
                <div className="col-md-4">
                  <label htmlFor="">Preferred Name</label>
                </div>
                <div className="col-md-4">
                  <Field
                    type="text"
                    name="preferredName"
                    className="form-control"
                  />
                </div>
                {values.relationShipStatus == "single" || (
                  <div className="col-md-4 largeScrnPartnerForm">
                    <Field
                      type="text"
                      name="partnerPreferredName"
                      className="form-control"
                    />
                  </div>
                )}
              </div>
              <div className="row mt-3">
                <div className="col-md-4">
                  <label htmlFor="DOB">DOB</label>
                </div>
                <div className="col-md-4">
                  {/* <Field type="date" name="DOB" className="form-control" /> */}
                  <div
                  className="CalenderParent"
                    // style={{
                     
                    // }}
                  >
                    <DatePicker
                      id="DOB"
                      className="form-control inputDesign "
                      selected={values.DOB}
                      onChange={(date) => {
                        setFieldValue("DOB", date);
                      }}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="dd/mm/yyyy"
                      showYearDropdown
                      scrollableYearDropdown
                      onBlur={handleBlur}
                      name="DOB"
                      autocomplete="off"
                      maxDate={new Date()}
                      showMonthDropdown
                      dropdownMode="select"
                      wrapperClassName="w-100"
                    />
                    <FaCalendarAlt
                    className="CalenderIcon"
                    
                    />
                  </div>
                </div>
                {values.relationShipStatus == "single" || (
                  <div className="col-md-4 largeScrnPartnerForm">
                    <div
                      style={{
                        position: "relative",
                        display: "inline-block",
                        width: "100%",
                      }}
                    >
                      <DatePicker
                        id="partnerDOB"
                        className="form-control inputDesign "
                        selected={values.partnerDOB}
                        onChange={(date) => {
                          setFieldValue("partnerDOB", date);
                        }}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="dd/mm/yyyy"
                        showYearDropdown
                        scrollableYearDropdown
                        onBlur={handleBlur}
                        name="partnerDOB"
                        maxDate={new Date()}
                        showMonthDropdown
                        dropdownMode="select"
                        wrapperClassName="w-100"
                      />
                      <FaCalendarAlt
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          pointerEvents: "none",
                          color: "#36b446",
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="row mt-3">
                <div className="col-md-4">
                  <label htmlFor="email">Email</label>
                </div>
                <div className="col-md-4">
                  <Field type="email" name="email" className="form-control" />
                </div>
                {values.relationShipStatus == "single" || (
                  <div className="col-md-4 largeScrnPartnerForm">
                    <Field
                      type="email"
                      name="partnerEmail"
                      className="form-control"
                    />
                  </div>
                )}
              </div>
              <div className="row mt-3">
                <div className="col-md-4">
                  <label htmlFor="">Phone Number</label>
                </div>
                <div className="col-md-4">
                  <Field
                    type="text"
                    name="phoneNumber"
                    className="form-control"
                  />
                </div>
                {values.relationShipStatus == "single" || (
                  <div className="col-md-4 largeScrnPartnerForm">
                    <Field
                      type="text"
                      name="partnerPhoneNumber"
                      className="form-control"
                    />
                  </div>
                )}
              </div>
              <div className="row mt-3">
                <div className="col-md-4">
                  <label htmlFor="">Relationship Status</label>
                </div>
                <div className="col-md-4">
                  <div className="d-flex justify-content-center  align-items-center">
                    <div className="w-50 onMobile">
                      <DynamicYesNo
                        setValue={{ left: "single", Right: "couple" }}
                        name={`relationShipStatus`}
                        label={{ left: "Single", Right: "Couple" }}
                        values={values}
                        handleChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                {values.relationShipStatus == "single" || (
                  <div className="col-md-4 largeScrnPartnerForm">
                    <div className="d-flex justify-content-center  align-items-center">
                      <div className="w-25">
                        <div className="CoupleSelected">Couple</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="row mt-4">
                <div className="col-md-4">
                  <label htmlFor="">Occupation</label>
                </div>
                <div className="col-md-4">
                  <Field
                    type="text"
                    name="occupation"
                    id="occupation"
                    className="form-control"
                  />
                </div>
                {values.relationShipStatus == "single" || (
                  <div className="col-md-4 largeScrnPartnerForm">
                    <Field
                      type="text"
                      name="partnerOccupation"
                      id="occupation"
                      className="form-control"
                    />
                  </div>
                )}
                <div className="mobilePartnerForm">
                {values.relationShipStatus == "single" || (
                  <>
               
                  <div className="col-md-4 mt-5 text-center ">
                    <span className="fw-bold h5">Partner </span>
                    <CoupleIcon className="mb-1" width={"25px"} />
                  </div>
                    </>
                )}
                {values.relationShipStatus == "single" || (
                  <>
                    <div className="col-md-4">
                  <label htmlFor="firstName">First Name</label>
                </div>
                  <div className="col-md-4">
                    <Field
                      type="text"
                      name="partnerFirstName"
                      id="partnerFirstName"
                      className="form-control"
                    />
                  </div>
                </>
                )}
                {values.relationShipStatus == "single" || (
                    <>
                    <div className="col-md-4">
                    <label htmlFor="partnerSurName">Sur Name</label>
                  </div>
                  <div className="col-md-4">
                    <Field
                      type="text"
                      name="partnerSurName"
                      className="form-control"
                      />
                  </div>
                      </>
                )}

                {values.relationShipStatus == "single" || (
                  <>
                    <div className="col-md-4">
                    <label htmlFor="partnerPreferredName">Preferred Name</label>
                  </div>
                  <div className="col-md-4">
                    <Field
                      type="text"
                      name="partnerPreferredName"
                      className="form-control"
                    />
                  </div>
                  </>
                )}

                {values.relationShipStatus == "single" || (
                  <>
                   <div className="col-md-4">
                  <label htmlFor="partnerDOB">DOB</label>
                </div>
                  <div className="col-md-4">
                    <div
                      style={{
                        position: "relative",
                        display: "inline-block",
                        width: "100%",
                      }}
                      >
                      <DatePicker
                        id="partnerDOB"
                        className="form-control inputDesign "
                        selected={values.partnerDOB}
                        onChange={(date) => {
                          setFieldValue("partnerDOB", date);
                        }}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="dd/mm/yyyy"
                        showYearDropdown
                        scrollableYearDropdown
                        onBlur={handleBlur}
                        name="partnerDOB"
                        maxDate={new Date()}
                        showMonthDropdown
                        dropdownMode="select"
                        wrapperClassName="w-100"
                      />
                      <FaCalendarAlt
                        style={{
                          position: "absolute",
                          top: "33px",
                          right: "10px",
                          pointerEvents: "none",
                          color: "#36b446",
                        }}
                      />
                    </div>
                  </div>
                  </>
                )}

                {values.relationShipStatus == "single" || (
                  <>
                  <div className="col-md-4">
                 <label htmlFor="partnerEmail">Email</label>
               </div>
                  <div className="col-md-4">
                    <Field
                      type="email"
                      name="partnerEmail"
                      className="form-control"
                    />
                  </div>
                  </>
                )}

                {values.relationShipStatus == "single" || (
                   <>
                   <div className="col-md-4">
                  <label htmlFor="partnerPhoneNumber">Phone Number</label>
                </div>
                  <div className="col-md-4">
                    <Field
                      type="text"
                      name="partnerPhoneNumber"
                      className="form-control"
                    />
                  </div>
                  </>
                )}
                {values.relationShipStatus == "single" || (
                        <>
                        <div className="col-md-4">
                       <label htmlFor="partnerRelationShipStatus">RelationShip Status</label>
                     </div>
                  <div className="col-md-4">
                    <div className="d-flex justify-content-center  align-items-center onMobile">
                      <div className="w-25">
                        <div className="CoupleSelected">Couple</div>
                      </div>
                    </div>
                  </div>
                  </>
                )}
                {values.relationShipStatus == "single" || (
                       <>
                       <div className="col-md-4">
                      <label htmlFor="partnerOccupation">Occupation</label>
                    </div>
                 <div className="col-md-4">
                    <Field
                      type="text"
                      name="partnerOccupation"
                      id="occupation"
                      className="form-control"
                    />
                  </div>
                  </>
                )}
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default PersonalData;
