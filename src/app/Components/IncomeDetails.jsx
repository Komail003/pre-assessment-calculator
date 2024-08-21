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
          className="img-responsive mt-3"
          width={70}
        />
      ),
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
    },
    {
      name: "Centrelink Payments",
      clientField: "centrelinkPayments",
      partnerField: "partnerCentrelinkPayments",
      icon: (
        <Gear
          alt="Centrelink Payments"
          className="img-responsive mt-3"
          style={{ height: "100px" }}
          width={70}
          />
        ),
      },
    {
      name: "Super Pension Payments",
      clientField: "superPensionPayments",
      partnerField: "partnerSuperPensionPayments",
      icon: (
        <Money
        alt="Super Pension Payments"
        className="img-responsive mt-3"
        width={70}
        />
      ),
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

  const onSubmit = async(values) => {
    const formattedValues = {};
     // Format client values
  for (const key in values) {
    if (key.startsWith('partner') && formData.relationShipStatus === "single") {
      continue; 
    }
    formattedValues[key] = parseNumberFromFormattedString(values[key]);
  }

    setIncomeDetails(formattedValues);
    sessionStorage.setItem("IncomeDetails", JSON.stringify(formattedValues));
    await router.push('../HomeDetails');
    // props.handleStepChange();
  };
  const updateFieldValues=(setFieldValue)=>{
    // alert("komail2");
    let data=JSON.parse(sessionStorage.getItem("IncomeDetails"));
    // console.log("Data",data)
    // setFieldValue("anyKids", data.anyKids || "") 
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
                // alert("komail");
                if(sessionStorage.getItem("IncomeDetails")){
                  // alert("komail1");
                  updateFieldValues(setFieldValue);
                }
              }, [])
              return(
          <Form className="text-center">
            <div className="row justify-content-center">
              <div className="col-md-5">
                {incomeTypes.map((type, index) => (
                  <div className="mt-4 border w-100" key={index} style={{ padding: "3rem 5rem 3rem 5rem" }}>
                    <h4 className="mb-3">{type.name}</h4>
                    {type.icon}
                    <label className="d-block mb-0 mt-2 " htmlFor={type.clientField}>
                      {formData.preferredName}
                    </label>
                    <Field
                      className="form-control w-75 mx-auto mt-1"
                      id={type.clientField}
                      name={type.clientField}
                      placeholder="Please Enter Value in $"
                      value={values[type.clientField]}
                      onChange={(e) => {
                        let rawValue = e.target.value.replace(/[^0-9.-]+/g, "");
                        let formattedValue = toCommaAndDollar(rawValue);
                        setFieldValue(type.clientField, formattedValue);
                      }}
                      type="text"
                    />

                    {formData.relationShipStatus === "couple" && (
                      <React.Fragment>
                        <label className="mt-3" htmlFor={type.partnerField}>
                          {formData.partnerPreferredName}
                        </label>
                        <Field
                          className="form-control w-75 mx-auto mt-1"
                          id={type.partnerField}
                          name={type.partnerField}
                          placeholder="Please Enter Value in $"
                          value={values[type.partnerField]}
                          onChange={(e) => {
                            let rawValue = e.target.value.replace(/[^0-9.-]+/g, "");
                            let formattedValue = toCommaAndDollar(rawValue);
                            setFieldValue(type.partnerField, formattedValue);
                          }}
                          type="text"
                        />
                      </React.Fragment>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Form>
        )}}
      </Formik>
    </div>
  );
}

export default IncomeDetails;
