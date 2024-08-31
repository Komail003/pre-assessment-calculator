import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import Image from "next/image";
import Businessman from "../Svgs/businessman.svg";
import BusinessIncome from "../../../public/images/business-income.png";
import Gear from "../Svgs/gears-gear-svgrepo-com.svg";
import Money from "../Svgs/money-3.svg";
import { incomeDetailsState, personalDataState } from "../Atom";
import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FaCircleInfo, FaInfo } from "react-icons/fa6";

function IncomeDetails(props) {
  const [incomeDetails, setIncomeDetails] = useRecoilState(incomeDetailsState);
  const [formData] = useRecoilState(personalDataState);
  const incomeTypes = [
    {
      name: "Employment Income",
      clientField: "employmentIncome",
      partnerField: "partnerEmploymentIncome",
      icon: (
        <Businessman
          alt="Employment Income"
          className="img-responsive businessimg mt-3"
          width={70}
          height={100}
        />
      ),
      tooltip:
        "Enter in your gross Employment income. This also includes the Salary you receive from your own Business/Company.",
    },
    {
      name: "Business Income",
      clientField: "businessIncome",
      partnerField: "partnerBusinessIncome",
      icon: (
        <Image
          alt="Business Income"
          className="img-responsive businessimg mt-3"
          src={BusinessIncome}
          height={100}
          width={70}
        />
      ),
      tooltip:
        "This includes income you receive from a business that you run as a sole trader or via partnership.",
    },
    {
      name: "Centrelink Payments (per fortnight)",
      clientField: "centrelinkPayments",
      partnerField: "partnerCentrelinkPayments",
      icon: (
        <Gear
          alt="Centrelink Payments"
          className="img-responsive businessimg mt-3"
          style={{ height: "100px" }}
          width={70}
        />
      ),
      tooltip:
        "This includes payments you receive from Services Australia such as the Age or Disability Pension, Carer Payment and Allowance, Jobseeker and Family Tax Benefits A & B.",
    },
    {
      name: "Super Pension Payments",
      clientField: "superPensionPayments",
      partnerField: "partnerSuperPensionPayments",
      icon: (
        <Money
          alt="Super Pension Payments"
          className="img-responsive businessimg mt-3"
          width={70}
        />
      ),
      tooltip:
        "This includes income you receive on a regular basis that is paid into your bank account from a Superannuation fund.",
    },
  ];

  const toCommaAndDollar = (x) =>
    "$" +
    Math.ceil(x)
      .toFixed(0)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const parseNumberFromFormattedString = (str) => {
    return parseFloat(str.replace(/[^0-9.-]+/g, ""));
  };

  const initialValues = incomeTypes.reduce((values, type) => {
    values[type.clientField] = incomeDetails[type.clientField]
      ? toCommaAndDollar(incomeDetails[type.clientField])
      : "";
    values[type.partnerField] = incomeDetails[type.partnerField]
      ? toCommaAndDollar(incomeDetails[type.partnerField])
      : "";
    return values;
  }, {});
  const router = useRouter();

  const onSubmit = async (values) => {
    const formattedValues = {};
    // Format client values
    for (const key in values) {
      if (
        key.startsWith("partner") &&
        formData.relationShipStatus === "single"
      ) {
        continue;
      }
      formattedValues[key] = parseNumberFromFormattedString(values[key]);
    }

    setIncomeDetails(formattedValues);
    sessionStorage.setItem("IncomeDetails", JSON.stringify(formattedValues));
    await router.push("../HomeDetails");
    // props.handleStepChange();
  };

  const updateFieldValues = (setFieldValue) => {
    let data = JSON.parse(sessionStorage.getItem("IncomeDetails"));
    if (data) {
      Object.keys(data).forEach((key) => {
        setFieldValue(key, toCommaAndDollar(data[key]));
      });
    }
  };

  return (
    <div className="container-fluid">
      <h3 className="text-center Green mt-5">Income Details</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        innerRef={props.FormReff}
      >
        {({ values, handleChange, setFieldValue }) => {
          useEffect(() => {
            if (sessionStorage.getItem("IncomeDetails")) {
              updateFieldValues(setFieldValue);
            }
          }, []);
          return (
            <Form className="text-center">
              <div className="row justify-content-center">
                <div className="col-md-5">
                  {incomeTypes.map((type, index) => (
                    <div
                      className="mt-4 border w-100"
                      key={index}
                      style={{ padding: "3rem 5rem 3rem 5rem" }}
                    >
                      <div className="Center">
                        <h4 className="mb-3">{type.name}</h4>
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id={`tooltip-${type.clientField}`}>
                              {type.tooltip}
                            </Tooltip>
                          }
                        >
                          <span>
                            <FaCircleInfo
                              size={16}
                              style={{ marginTop: "5px" }}
                              className="ms-2"
                            />
                          </span>
                        </OverlayTrigger>
                      </div>
                      {type.icon}

                      <label
                        className="d-block mb-0 mt-2"
                        htmlFor={type.clientField}
                      >
                        {formData.preferredName}
                      </label>

                      <Field
                        className="form-control w-75 mx-auto mt-1"
                        id={type.clientField}
                        name={type.clientField}
                        placeholder="Please Enter Value in $"
                        value={values[type.clientField]}
                        onChange={(e) => {
                          let rawValue = e.target.value.replace(
                            /[^0-9.-]+/g,
                            ""
                          );
                          let formattedValue = toCommaAndDollar(rawValue);
                          setFieldValue(type.clientField, formattedValue);
                        }}
                        type="text"
                      />

                      {formData.relationShipStatus === "couple" && (
                        <>
                            <label
                              className="d-block mb-0"
                              htmlFor={type.partnerField}
                            >
                              {formData.partnerPreferredName}
                            </label>
                          <Field
                            className="form-control w-75 mx-auto mt-1"
                            id={type.partnerField}
                            name={type.partnerField}
                            placeholder="Please Enter Value in $"
                            value={values[type.partnerField]}
                            onChange={(e) => {
                              let rawValue = e.target.value.replace(
                                /[^0-9.-]+/g,
                                ""
                              );
                              let formattedValue = toCommaAndDollar(rawValue);
                              setFieldValue(type.partnerField, formattedValue);
                            }}
                            type="text"
                          />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default IncomeDetails;
