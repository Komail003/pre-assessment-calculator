import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { childrenDetailsState } from "../Atom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import DynamicYesNo from "./DynamicYesNo/DynamicYesNo";

function KidsDetails(props) {
  const [childrenDetails, setChildrenDetails] =
    useRecoilState(childrenDetailsState);
  const children = [1, 2, 3, 4, 5];
  const [placement, setPlacement] = useState('bottom');

  useEffect(() => {
    const updatePlacement = () => {
      if (window.innerWidth <= 768) {
        setPlacement('right');
      } else {
        setPlacement('bottom');
      }
    };
     // Set initial placement
     updatePlacement();

     // Update placement on window resize
     window.addEventListener('resize', updatePlacement);
 
     // Cleanup on component unmount
     return () => window.removeEventListener('resize', updatePlacement);
   }, []);

  const initialValues = {
    anyKids: childrenDetails.anyKids,
    ...children.reduce((acc, child, index) => {
      acc[`nameOfChild${index + 1}`] = "";
      acc[`genderOfChild${index + 1}`] = "Male"; // Set initial gender to Male
      acc[`dOB${index + 1}`] = null; // Set the initial date of birth
      return acc;
    }, {}),
  };

  const router = useRouter();
  const onSubmit = (values) => {
    const kidsData = [];
    for (let i = 1; i <= 5; i++) {
      const name = values[`nameOfChild${i}`];
      const gender = values[`genderOfChild${i}`];
      const dob = values[`dOB${i}`];

      if (name && gender && dob) {
        kidsData.push({ name, gender, dob });
      }
    }

    let obj = { anyKids: values.anyKids, children: kidsData };
    console.log(obj);
    setChildrenDetails(obj);

    sessionStorage.setItem("KidsDetails", JSON.stringify(obj));
    router.push("../IncomeDetails");
  };
  const updateFieldValues = (setFieldValue) => {
    // alert("komail2");
    let data = JSON.parse(sessionStorage.getItem("KidsDetails"));
    // console.log("Data",data)
    // setFieldValue("anyKids", data.anyKids || "")
    if (data) {
      setFieldValue("anyKids", data.anyKids || "");
      data.children.forEach((child, index) => {
        setFieldValue(`nameOfChild${index + 1}`, child.name || "");
        setFieldValue(`genderOfChild${index + 1}`, child.gender || "Male");
        setFieldValue(`dOB${index + 1}`, new Date(child.dob) || null);
      });
    }
  };

  return (
    <div className="container-fluid ">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        innerRef={props.FormReff}
      >
        {({ values, handleChange, handleBlur, setFieldValue }) => {
          useEffect(() => {
            // alert("komail");
            if (sessionStorage.getItem("KidsDetails")) {
              // alert("komail1");
              updateFieldValues(setFieldValue);
            }
          }, []);
          return (
            <Form>
              <h6 className="mt-5 text-center" htmlFor="">
                Do you have any kids?
              </h6>
              <div className="form-check form-switch mt-3 p-0">
                <div className="radiobutton">
                  <input
                    type="radio"
                    name="anyKids"
                    className="form-check-input"
                    id="anyKids1"
                    value="No"
                    onChange={handleChange}
                    checked={values.anyKids === "No"}
                  />
                  <label htmlFor="anyKids1" className="label1 Center">
                    <span>No</span>
                  </label>
                  <input
                    type="radio"
                    name="anyKids"
                    id="anyKids2"
                    className="form-check-input"
                    value="Yes"
                    onChange={handleChange}
                    checked={values.anyKids === "Yes"}
                  />
                  <label htmlFor="anyKids2" className="label2 Center">
                    <span>Yes</span>
                  </label>
                </div>
              </div>
              {values.anyKids === "Yes" && (
                <div className="row mt-5">
                  <div className="col-md-2"></div>
                  <div className="col-md-8">
                    <div className="">
                      <table className="table table-bordered table-hover">
                        <thead className="text-center">
                          <tr>
                            <th scope="col">DOB</th>
                            <th scope="col">Gender</th>
                            <th
                              scope="col"
                              // onClick={() => {
                              //   console.log(values);
                              // }}
                            >
                              Children Details
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {children.map((child, index) => {
                            // setFieldValue("genderOfChild" + (index + 1), "Male")
                            return (
                              <tr key={index}>
                                 <td>
                                  <div
                                   className="CalenderParent"
                                  >
                                    <DatePicker
                                      id={`dOB${child}`}
                                      className="form-control inputDesign"
                                      selected={values[`dOB${child}`]}
                                      onChange={(date) => {
                                        setFieldValue(`dOB${child}`, date);
                                      }}
                                      dateFormat="dd/MM/yyyy"
                                      placeholderText="dd/mm/yyyy"
                                      showYearDropdown
                                      showPopperArrow={false} 
                                      scrollableYearDropdown
                                      autoComplete="off"
                                      onBlur={handleBlur}
                                      name={`dOB${child}`}
                                      
                                      maxDate={new Date()}
                                      showMonthDropdown
                                      tabIndex={1000}
                                      popperPlacement={placement}
                                      dropdownMode="select"
                                      // wrapperClassName="w-100"
                                      // popperModifiers={[
                                      //   {
                                      //    name: "preventOverflow",
                                      //    enabled: true,
                                      //   }
                                      //  ]}
                                      style={{
                                        width: "100%", // Ensure the input takes the full width of its container
                                      }}
                                    />
                                    <FaCalendarAlt
                                    className="CalenderIcon"
                                  
                                    />
                                  </div>
                                </td>
                                
                                <td className="tdmbl">
                                  <div className="d-flex justify-content-center  align-items-center">
                                    <div className="w-100">
                                      <DynamicYesNo
                                        setValue={{ left: "Female", Right: "Male" }}
                                        name={`genderOfChild${child}`}
                                        label={{ left: "Female", Right: "Male" }}
                                        values={values}
                                        handleChange={handleChange}
                                      />
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <Field
                                    type="text"
                                    className="form-control"
                                    name={`nameOfChild${child}`}
                                    placeholder="Name"
                                    id={`nameOfChild${child}`}
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-md-2"></div>
                </div>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default KidsDetails;
