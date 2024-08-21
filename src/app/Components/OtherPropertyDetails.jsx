import React from "react";
import Property from "../Svgs/property-value.svg";
import Business from "../Svgs/businessman.svg";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { otherPropertyDetailsState, personalDataState } from "../Atom";
import { useRecoilState } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
function OtherPropertyDetails(props) {
  const [formData] = useRecoilState(personalDataState);
  const [otherProperty, setOtherProperty] = useRecoilState(
    otherPropertyDetailsState
  );

  const toCommaAndDollar = (x) => {
    if (isNaN(x) || x === "") return "$0";
    return (
      "$" +
        Math.ceil(parseFloat(x))
          .toFixed(0)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "$0"
    );
  };
  const parseNumberFromFormattedString = (str) => {
    // console.log("Parsing value:", str); // Debugging line

    // Ensure str is a valid string
    if (typeof str !== "string") {
      // console.error("Invalid input for parsing:", str); // Debugging line
      return 0;
    }

    const cleanedStr = str.replace(/[^0-9.-]+/g, "");
    const number = parseFloat(cleanedStr);
    // console.log("Parsed number:", number); // Debugging line
    return isNaN(number) ? 0 : number;
  };

  const formatCurrency = (value) => {
    return value
      ? "$" +
          Math.ceil(parseFloat(value))
            .toFixed(0)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : "$0";
  };
  const initialValues = {
    otherProperties: otherProperty.otherProperties || "No",
    howMany: otherProperty.properties.length,
    ...Object.fromEntries(
      otherProperty.properties.flatMap((property, index) => [
        [`PropertyValue${index}`, formatCurrency(property.marketValue || 0)],
        [`loanBalance${index}`, formatCurrency(property.loanBalance || 0)],
        [`rentReceived${index}`, formatCurrency(property.rentReceived || 0)],
        [`rentOptions${index}`, property.rentFrequency || ""],
        [
          `rentReceivedMain${index}`,
          formatCurrency(property.rentReceivedMain) || "",
        ],
        [`frequencyOfRentMain${index}`, property.frequencyOfRentMain || ""],
        [
          `annualExpenses${index}`,
          formatCurrency(property.annualExpenses) || "",
        ],
      ])
    ),
  };
  const router = useRouter();

  const onSubmit = (values) => {
    console.log("Other Properties values :", values);
    const updatedData = {
      otherProperties: values.otherProperties,
      properties: Array.from({ length: values.howMany }).map((_, index) => ({
        marketValue: parseNumberFromFormattedString(
          values[`PropertyValue${index}`]
        ),
        loanBalance: parseNumberFromFormattedString(
          values[`loanBalance${index}`]
        ),
        rentReceived: parseNumberFromFormattedString(
          values[`rentReceived${index}`]
        ),
        rentFrequency: values[`rentOptions${index}`] || "",
        rentReceivedMain:
          parseNumberFromFormattedString(values[`rentReceivedMain${index}`]) ||
          "",
        frequencyOfRentMain: values[`frequencyOfRentMain${index}`] || "",
        annualExpenses:
          parseNumberFromFormattedString(values[`annualExpenses${index}`]) ||
          "",
      })),
    };
    console.log("updatedData", updatedData);
    setOtherProperty(updatedData);
    // props.handleStepChange();
    sessionStorage.setItem("OtherPropertyDetails", JSON.stringify(updatedData));
    router.push("../OtherIncome");
  };

  const validationSchema = Yup.object({
    howMany: Yup.number()
      .min(1, "Value must be at least 1")
      .max(5, "Value must be 5 or less")
      .required("This field is required"),
  });

  // Tooltip render function
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props} className="custom-tooltip">
      <span className="w-100 text-justify">This includes interest on the loan, council and water rates,
      insurances/body corporate fees, land tax, repairs, and maintenance.</span></Tooltip>
  );

  let handleInput = (e, setFieldValue) => {
    const value =
      e.target.value > 5 ? 5 : e.target.value < 0 ? 0 : e.target.value;

    setFieldValue(e.target.id, value);
  };
  return (
    <div className="container-fluid">
      <div className="mt-5">
        <Formik
          initialValues={initialValues}
          // validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize={true}
          innerRef={props.FormReff}
        >
          {({ values, handleChange, handleBlur, setFieldValue }) => (
            <Form>
              <h3 className="text-center Green mt-5">
                Other Properties (excluding your home)
              </h3>
              <label className="Center mt-3">
                Does {formData.preferredName} own any other property other than your home?
              </label>
              <div className="row my-3">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <div className="form-check form-switch m-0 p-0">
                    <div className="radiobutton">
                      <input
                        type="radio"
                        name="otherProperties"
                        className="form-check-input"
                        id="otherProperties1"
                        value="No"
                        onChange={handleChange}
                        checked={values.otherProperties === "No"}
                        onBlur={handleBlur}
                      />
                      <label
                        htmlFor="otherProperties1"
                        className="label1 Center"
                      >
                        <span>No</span>
                      </label>
                      <input
                        type="radio"
                        name="otherProperties"
                        id="otherProperties2"
                        className="form-check-input"
                        value="Yes"
                        onChange={handleChange}
                        checked={values.otherProperties === "Yes"}
                        onBlur={handleBlur}
                      />
                      <label
                        htmlFor="otherProperties2"
                        className="label2 Center"
                      >
                        <span>Yes</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-4"></div>
              </div>
              {values.otherProperties === "Yes" && (
                <React.Fragment>
                  <div className="row mb-4">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                      <label
                        htmlFor="howMany"
                        className="mt-3 Center"
                        onClick={() => {
                          console.log([...Array(values.howMany)]);
                        }}
                      >
                        How many?
                      </label>
                      <Field
                        className="form-control w-75 mx-auto mt-2"
                        id="howMany"
                        name="howMany"
                        type="number"
                        onChange={(e) => {
                          handleInput(e, setFieldValue);
                        }}
                      />
                      <ErrorMessage
                        component="div"
                        className="text-danger"
                        name="howMany"
                      />
                    </div>
                  </div>
                  {values.howMany > 0 && values.howMany < 6 ? (
                    <React.Fragment>
                      <div className="row justify-content-center">
                        <div className="col-md-5 text-center">
                          {Array.from({ length: values.howMany }).map(
                            (_, index) => (
                              <div
                                key={index}
                                className="mt-4 border w-100"
                                style={{ padding: "2rem 4.5rem 3rem 4.5rem" }}
                              >
                                <Property
                                  alt="img"
                                  className="img-responsive svgs"
                                />
                                <h4 className="text-center">
                                  Property Details {index + 1}
                                </h4>
                                <label
                                  className="text-center Center mt-3"
                                  htmlFor={`PropertyValue${index}`}
                                >
                                  Market Value
                                </label>
                                <Field
                                  className="form-control w-75 mx-auto mt-2"
                                  id={`PropertyValue${index}`}
                                  name={`PropertyValue${index}`}
                                  type="text"
                                  onChange={(e) => {
                                    const rawValue = e.target.value.replace(
                                      /[^0-9.-]+/g,
                                      ""
                                    );
                                    setFieldValue(
                                      `PropertyValue${index}`,
                                      toCommaAndDollar(rawValue)
                                    );
                                  }}
                                  onBlur={handleBlur}
                                  value={formatCurrency(
                                    parseNumberFromFormattedString(
                                      values[`PropertyValue${index}`] || "$0"
                                    )
                                  )}
                                />

                                <h3 className="text-center mt-4">
                                  Loan Details
                                </h3>
                                <label
                                  className="text-center Center mt-3"
                                  htmlFor={`loanBalance${index}`}
                                >
                                  Loan Balance
                                </label>
                                <Field
                                  className="form-control w-75 mx-auto mt-2"
                                  id={`loanBalance${index}`}
                                  name={`loanBalance${index}`}
                                  type="text"
                                  onChange={(e) => {
                                    const rawValue = e.target.value.replace(
                                      /[^0-9.-]+/g,
                                      ""
                                    );
                                    setFieldValue(
                                      `loanBalance${index}`,
                                      toCommaAndDollar(rawValue)
                                    );
                                  }}
                                  onBlur={handleBlur}
                                  value={formatCurrency(
                                    parseNumberFromFormattedString(
                                      values[`loanBalance${index}`]
                                    )
                                  )}
                                />

                                <label
                                  className="mt-3"
                                  htmlFor={`rentReceived${index}`}
                                >
                                    Loan Repayments
                                </label>
                                <Field
                                  className="form-control w-75 mx-auto mt-2"
                                  id={`rentReceived${index}`}
                                  name={`rentReceived${index}`}
                                  type="text"
                                  onChange={(e) => {
                                    const rawValue = e.target.value.replace(
                                      /[^0-9.-]+/g,
                                      ""
                                    );
                                    setFieldValue(
                                      `rentReceived${index}`,
                                      toCommaAndDollar(rawValue)
                                    );
                                  }}
                                  onBlur={handleBlur}
                                  value={formatCurrency(
                                    parseNumberFromFormattedString(
                                      values[`rentReceived${index}`]
                                    )
                                  )}
                                />
                                <label
                                  className="mt-3"
                                  htmlFor={`rentOptions${index}`}
                                >
                                  Frequency of Repayments
                                </label>
                                <Field
                                  className="form-select w-75 mx-auto mt-2"
                                  id={`rentOptions${index}`}
                                  name={`rentOptions${index}`}
                                  as="select"
                                >
                                  <option value="">Select</option>
                                  <option value="Weekly">Weekly</option>
                                  <option value="Fortnightly">
                                    Fortnightly
                                  </option>
                                  <option value="Monthly">Monthly</option>
                                </Field>
                                <h4 className="text-center mt-3">
                                  Income Details {index + 1}
                                </h4>
                                <label htmlFor="otherIncome" className="query w-100">
                                  Does {formData.preferredName} have any other income as below?
                                </label>
                                
                                <label
                                  className="text-center Center mt-3"
                                  htmlFor={`frequencyOfRentMain${index}`}
                                >
                                  Frequency of Rent
                                </label>
                                <Field
                                  className="form-select w-75 mx-auto mt-2"
                                  id={`frequencyOfRentMain${index}`}
                                  name={`frequencyOfRentMain${index}`}
                                  as="select"
                                >
                                  <option value="">Select</option>
                                  <option value="Weekly">Weekly</option>
                                  <option value="Fortnightly">
                                    Fortnightly
                                  </option>
                                  <option value="Monthly">Monthly</option>
                                </Field>
                                <label
                                  className="mt-3"
                                  htmlFor={`rentReceivedMain${index}`}
                                >
                                  Rent Received
                                </label>
                                <Field
                                  className="form-control w-75 mx-auto mt-2"
                                  id={`rentReceivedMain${index}`}
                                  name={`rentReceivedMain${index}`}
                                  type="text"
                                  onChange={(e) => {
                                    const rawValue = e.target.value.replace(
                                      /[^0-9.-]+/g,
                                      ""
                                    );
                                    const formattedValue =
                                      toCommaAndDollar(rawValue);
                                    setFieldValue(
                                      `rentReceivedMain${index}`,
                                      formattedValue
                                    );
                                  }}
                                  onBlur={handleBlur}
                                  value={formatCurrency(
                                    parseNumberFromFormattedString(
                                      values[`rentReceivedMain${index}`]
                                    )
                                  )}
                                />
                                <label
                                  className="mt-3"
                                  htmlFor={`annualExpenses${index}`}
                                >
                                  Annual Expenses{" "}
                                  <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltip}
                                  >
                                    <FontAwesomeIcon
                                      icon={faQuestionCircle}
                                      className="ml-2"
                                    />
                                  </OverlayTrigger>
                                </label>
                                <Field
                                  className="form-control w-75 mx-auto mt-2"
                                  id={`annualExpenses${index}`}
                                  name={`annualExpenses${index}`}
                                  type="text"
                                  onChange={(e) => {
                                    const rawValue = e.target.value.replace(
                                      /[^0-9.-]+/g,
                                      ""
                                    );
                                    setFieldValue(
                                      `annualExpenses${index}`,
                                      toCommaAndDollar(rawValue)
                                    );
                                  }}
                                  onBlur={handleBlur}
                                  value={formatCurrency(
                                    parseNumberFromFormattedString(
                                      values[`annualExpenses${index}`]
                                    )
                                  )}
                                />
                                
                             
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </React.Fragment>
                  ) : null}
                </React.Fragment>
              )}

              {/* <button type="submit">submit</button> */}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default OtherPropertyDetails;
