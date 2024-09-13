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
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [renderBtn, setRenderBtn] = useState(false);
  const [formData, setFormData] = useRecoilState(personalDataState); // Using Recoil state
  // const [selectedDate, setSelectedDate] = useState(null);

  // const initialValues = formData;
  // const validationSchema = Yup.object({
  //   firstName: Yup.string().required("it is Requiresd"),
  // });

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial size

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth < 768) {
      // alert('Screen size is below 768 pixels!');
      setRenderBtn(true);
    } else {
      setRenderBtn(false);
    }
  }, [windowWidth]);

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
    gender: "",
    partnerGender: "",
    partnerOccupation: "",
  };
  const router = useRouter();

  const onSubmit = (values) => {
    // console.log(values);
    let Obj = {};
    if (values.relationShipStatus == "single") {
      Obj = {
        relationShipStatus: values.relationShipStatus || "",
        firstName: values.firstName || "",
        surName: values.surName || "",
        preferredName: values.preferredName || "",
        DOB: values.DOB || "",
        email: values.email || "",
        phoneNumber: values.phoneNumber || "",
        occupation: values.occupation || "",
        gender: values.gender || "",
      };
    } else {
      Obj = {
        relationShipStatus: values.relationShipStatus || "",
        partnerRelationShipStatus: "couple",
        firstName: values.firstName || "",
        partnerFirstName: values.partnerFirstName || "",
        gender: values.gender || "",
        partnerGender: values.partnerGender || "",
        partnerFirstName: values.partnerFirstName || "",
        surName: values.surName || "",
        partnerSurName: values.partnerSurName || "",
        preferredName: values.preferredName || "",
        partnerPreferredName: values.partnerPreferredName || "",
        DOB: values.DOB || "",
        partnerDOB: values.partnerDOB || "",
        email: values.email || "",
        partnerEmail: values.partnerEmail || "",
        phoneNumber: values.phoneNumber || "",
        partnerPhoneNumber: values.partnerPhoneNumber || "",
        occupation: values.occupation || "",
        partnerOccupation: values.partnerOccupation || "",
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
    setFieldValue("gender", data.gender || "");
    setFieldValue("partnerGender", data?.partnerGender || "");
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

  const parseDateString = (value) => {
    const [day, month, year] = value.split("/");
    return new Date(year, month - 1, day);
  };

  const formatToDateString = (value) => {
    if (value.length === 8) {
      return value.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
    }
    return value;
  };

  const isValidDateFromFormat = (input) => {
    if (typeof input === "string" && /^\d{8}$/.test(input)) {
      const day = parseInt(input.slice(0, 2), 10);
      const month = parseInt(input.slice(2, 4), 10);
      const year = parseInt(input.slice(4), 10);
      const date = new Date(year, month - 1, day);

      return (
        date.getDate() === day &&
        date.getMonth() === month - 1 &&
        date.getFullYear() === year
      );
    }
    return false;
  };

  const handleDateBlur = (e, setFieldValue, key) => {
    console.log("event", e);
    const rawValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    const formattedDateStr = formatToDateString(rawValue);

    // Validate the formatted date string
    if (isValidDateFromFormat(rawValue)) {
      const parsedDate = parseDateString(formattedDateStr);
      setFieldValue(key, parsedDate);
    } else {
      // Handle invalid date case (e.g., setFieldValue to null or show an error)
      const currentDate = new Date();

      setFieldValue(key, currentDate);
      // Optionally, you can also show an error message here
    }

    // Optional: Call handleBlur if needed
    // handleBlur(e);
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
                  {/* ___________________ */}
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
                      // selected={values.DOB}
                      selected={values.DOB ? new Date(values.DOB) : null}
                      onChange={(date) => {
                        // console.log(date, "date");
                        setFieldValue("DOB", date);
                        // date.persist();
                      }}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="dd/mm/yyyy"
                      showYearDropdown
                      onFocus={(e) => {
                        if (!e.target.value) {
                          e.target.value = "dd/mm/yyyy";
                        }
                        // e.persist();
                      }}
                      scrollableYearDropdown
                      onBlur={(e) => {
                        handleDateBlur(event, setFieldValue, "DOB");
                        handleBlur();
                        // e.persist();
                      }}
                      name="DOB"
                      autocomplete="off"
                      maxDate={new Date()}
                      showMonthDropdown
                      dropdownMode="select"
                      wrapperClassName="w-100"
                    />
                    <FaCalendarAlt className="CalenderIcon" />
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
                        className="form-control inputDesign"
                        selected={
                          values.partnerDOB ? new Date(values.partnerDOB) : null
                        } // Ensure selected value is a Date object
                        onChange={(date) => setFieldValue("partnerDOB", date)}
                        onFocus={(e) => {
                          if (!e.target.value) {
                            e.target.value = "dd/mm/yyyy";
                          }
                        }}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="dd/mm/yyyy"
                        showYearDropdown
                        scrollableYearDropdown
                        autoComplete="off"
                        onBlur={(e) => {
                          handleDateBlur(e, setFieldValue, "partnerDOB");
                          handleBlur();
                        }}
                        name="partnerDOB"
                        maxDate={new Date()}
                        showMonthDropdown
                        dropdownMode="select"
                        wrapperClassName="w-100"
                      />
                      <FaCalendarAlt
                        style={{
                          position: "absolute",
                          top: "13px",
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
                <div className="col-md-4 mb-3">
                  <label
                    htmlFor="email"
                    onClick={() => {
                      console.log(values.partnerGender);
                    }}
                  >
                    Gender
                  </label>
                </div>
                <div className="col-md-4">
                  <div className="">
                    <Field
                      as="select"
                      className="form-select"
                      name={`gender`}
                      id={`gender`}
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Field>
                  </div>
                </div>
                {values.relationShipStatus == "single" || (
                  <div className="col-md-4 largeScrnPartnerForm ">
                    <div className="">
                    <Field
                      as="select"
                      className="form-select"
                      name={`partnerGender`}
                      id={`partnerGender`}
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Field>
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
                      <label htmlFor="partnerPreferredName">
                        Preferred Name
                      </label>
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
                          autocomplete="off"
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
                    {renderBtn ? (
                      <>
                        <div className="col-md-4 mb-3">
                          <label htmlFor="partnerGender mb-4">Gender</label>
                        </div>
                        <div className="col-md-4">
                          <div className="">
                          <Field
                      as="select"
                      className="form-select"
                      name={`partnerGender`}
                      id={`partnerGender`}
                    >
                      <option value="">Select</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </Field>
                          </div>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
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
                {values.relationShipStatus == "single" || (
                  <>
                    <div className="col-md-4">
                      <label htmlFor="partnerRelationShipStatus">
                        RelationShip Status
                      </label>
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
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default PersonalData;
