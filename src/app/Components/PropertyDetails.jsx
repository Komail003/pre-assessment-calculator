import React, { useEffect } from "react";
import Property from "../Svgs/property-value.svg";
import { Field, Form, Formik } from "formik";
import { propertyDetailsState } from "../Atom";
import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";

function PropertyDetails(props) {
  const [propertyDetails, setPropertyDetails] =
    useRecoilState(propertyDetailsState);

  const toCommaAndDollar = (x) =>
    "$" +
    Math.ceil(x)
      .toFixed(0)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const parseNumberFromFormattedString = (str) => {
    return parseFloat(str.replace(/[^0-9.-]+/g, ""));
  };

  // Set initialValues using the data from Recoil state
  const initialValues = {
    propertyValue: propertyDetails.propertyValue
      ? toCommaAndDollar(propertyDetails.propertyValue)
      : "",
    loanBalance: propertyDetails.loanBalance
      ? toCommaAndDollar(propertyDetails.loanBalance)
      : "",
    rentReceived: propertyDetails.rentReceived
      ? toCommaAndDollar(propertyDetails.rentReceived)
      : "",
    rentOptions: propertyDetails.rentOptions || "",
  };
  const router = useRouter();

  const onSubmit = (values) => {
    const formattedValues = {
      propertyValue: parseNumberFromFormattedString(values.propertyValue),
      loanBalance: parseNumberFromFormattedString(values.loanBalance),
      rentReceived: parseNumberFromFormattedString(values.rentReceived),
      rentOptions: values.rentOptions, // No formatting needed for this field
    };
    setPropertyDetails(formattedValues);
    console.log(formattedValues);
    sessionStorage.setItem("HomeDetails", JSON.stringify(formattedValues));
    router.push("../PersonalAssets");
    // props.handleStepChange();
  };
  const updateFieldValues = (setFieldValue) => {
    // alert("komail2");
    let data = JSON.parse(sessionStorage.getItem("HomeDetails"));
    // console.log("Data",data)
    // setFieldValue("anyKids", data.anyKids || "")
    if (data) {
      Object.keys(data).forEach((key) => {
        if (
          key === "propertyValue" ||
          key === "loanBalance" ||
          key === "rentReceived"
        ) {
          setFieldValue(key, toCommaAndDollar(data[key]));
        } else {
          setFieldValue(key, data[key]);
        }
      });
    }
  };

  return (
    <div className="container-fluid">
      <h3 className="text-center Green mt-5">Home Details</h3>
      <div className="mt-5">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          innerRef={props.FormReff}
        >
          {({ values, setFieldValue }) => {
            useEffect(() => {
              // alert("komail");
              if (sessionStorage.getItem("HomeDetails")) {
                // alert("komail1");
                updateFieldValues(setFieldValue);
              }
            }, []);
            return (
              <Form>
                <div className="row justify-content-center">
                  <div className="col-md-5 text-center pt-0">
                    <div
                      className="border w-100 "
                      style={{ padding: "3rem 5rem 3rem 5rem" }}
                    >
                      <div className="m-0 p-0">
                        <Property
                          className="img-responsive businessimg"
                          style={{ marginTop: "-40px" }}
                        />
                      </div>
                      <h4 className="text-center">Property Details</h4>
                      <label
                        className="text-center Center mt-3"
                        htmlFor="propertyValue"
                      >
                        Market Value
                      </label>
                      <Field
                        className="form-control  w-75 mx-auto"
                        id="propertyValue"
                        name="propertyValue"
                        placeholder="Please Enter Value in $"
                        value={values.propertyValue}
                        onChange={(e) => {
                          let rawValue = e.target.value.replace(
                            /[^0-9.-]+/g,
                            ""
                          );
                          let formattedValue = toCommaAndDollar(rawValue);
                          setFieldValue("propertyValue", formattedValue);
                        }}
                        type="text"
                      />

                      <h3 className="text-center mt-3">Loan Details</h3>
                      <label
                        className="text-center Center mt-2"
                        htmlFor="loanBalance"
                      >
                        Loan Balance
                      </label>
                      <Field
                        className="form-control w-75 mx-auto mt-2"
                        id="loanBalance"
                        name="loanBalance"
                        placeholder="Please Enter Value in $"
                        value={values.loanBalance}
                        onChange={(e) => {
                          let rawValue = e.target.value.replace(
                            /[^0-9.-]+/g,
                            ""
                          );
                          let formattedValue = toCommaAndDollar(rawValue);
                          setFieldValue("loanBalance", formattedValue);
                        }}
                        type="text"
                      />
                      <label className="mt-3" htmlFor="rentReceived">
                        Loan Repayments
                      </label>
                      <Field
                        className="form-control w-75 mx-auto mt-2"
                        id="rentReceived"
                        name="rentReceived"
                        placeholder="Please Enter Value in $"
                        value={values.rentReceived}
                        onChange={(e) => {
                          let rawValue = e.target.value.replace(
                            /[^0-9.-]+/g,
                            ""
                          );
                          let formattedValue = toCommaAndDollar(rawValue);
                          setFieldValue("rentReceived", formattedValue);
                        }}
                        type="text"
                      />
                      <label className="mt-3" htmlFor="rentOptions">
                        Frequency of Repayments
                      </label>
                      <Field
                        className="form-select w-75 mx-auto mt-2"
                        id="rentOptions"
                        name="rentOptions"
                        as="select"
                      >
                        <option value="">Select</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Fortnightly">Fortnightly</option>
                        <option value="Monthly">Monthly</option>
                      </Field>
                    </div>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default PropertyDetails;
