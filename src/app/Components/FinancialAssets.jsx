import React, { useEffect } from "react";
import { Field, Form, Formik } from "formik";
import Piggybank2 from "../Svgs/piggy-bank-new.svg";
import Piggybank from "../Svgs/piggy-bank.svg";
import Bank from "../Svgs/bank.svg";
import Portfolio from "../Svgs/portfolio.svg";
import Fund from "../Svgs/funds.svg";
import { financialAssetsState, personalDataState } from "../Atom";
import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FaCircleInfo } from "react-icons/fa6";

function FinancialAssets(props) {
  const [financialAssets, setFinancialAssets] =
    useRecoilState(financialAssetsState);
  const [formData] = useRecoilState(personalDataState);

  const toCommaAndDollar = (x) =>
    "$" +
    Math.ceil(x)
      .toFixed(0)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const initialValues = {
    bankAccounts: {
      you: financialAssets.bankAccounts?.you
        ? toCommaAndDollar(financialAssets.bankAccounts.you)
        : "",
      partner: financialAssets.bankAccounts?.partner
        ? toCommaAndDollar(financialAssets.bankAccounts.partner)
        : "",
    },
    shares: {
      you: financialAssets.shares?.you
        ? toCommaAndDollar(financialAssets.shares.you)
        : "",
      partner: financialAssets.shares?.partner
        ? toCommaAndDollar(financialAssets.shares.partner)
        : "",
    },
    managedFunds: {
      you: financialAssets.managedFunds?.you
        ? toCommaAndDollar(financialAssets.managedFunds.you)
        : "",
      partner: financialAssets.managedFunds?.partner
        ? toCommaAndDollar(financialAssets.managedFunds.partner)
        : "",
    },
    super: {
      you: financialAssets.super?.you
        ? toCommaAndDollar(financialAssets.super.you)
        : "",
      partner: financialAssets.super?.partner
        ? toCommaAndDollar(financialAssets.super.partner)
        : "",
    },
    pension: {
      you: financialAssets.pension?.you
        ? toCommaAndDollar(financialAssets.pension.you)
        : "",
      partner: financialAssets.pension?.partner
        ? toCommaAndDollar(financialAssets.pension.partner)
        : "",
    },
  };

  const router = useRouter();

  const onSubmit = (values) => {
    let formattedValues = {};
    if (formData.relationShipStatus === "couple") {
      formattedValues = {
        bankAccounts: {
          you: parseFloat(values.bankAccounts.you.replace(/[^0-9.-]+/g, "")),
          partner: parseFloat(
            values.bankAccounts.partner.replace(/[^0-9.-]+/g, "")
          ),
        },
        shares: {
          you: parseFloat(values.shares.you.replace(/[^0-9.-]+/g, "")),
          partner: parseFloat(values.shares.partner.replace(/[^0-9.-]+/g, "")),
        },
        managedFunds: {
          you: parseFloat(values.managedFunds.you.replace(/[^0-9.-]+/g, "")),
          partner: parseFloat(
            values.managedFunds.partner.replace(/[^0-9.-]+/g, "")
          ),
        },
        super: {
          you: parseFloat(values.super.you.replace(/[^0-9.-]+/g, "")),
          partner: parseFloat(values.super.partner.replace(/[^0-9.-]+/g, "")),
        },
        pension: {
          you: parseFloat(values.pension.you.replace(/[^0-9.-]+/g, "")),
          partner: parseFloat(values.pension.partner.replace(/[^0-9.-]+/g, "")),
        },
      };
    } else {
      formattedValues = {
        bankAccounts: {
          you: parseFloat(values.bankAccounts.you.replace(/[^0-9.-]+/g, "")),
          partner: "",
        },
        shares: {
          you: parseFloat(values.shares.you.replace(/[^0-9.-]+/g, "")),
          partner: "",
        },
        managedFunds: {
          you: parseFloat(values.managedFunds.you.replace(/[^0-9.-]+/g, "")),
          partner: "",
        },
        super: {
          you: parseFloat(values.super.you.replace(/[^0-9.-]+/g, "")),
          partner: "",
        },
        pension: {
          you: parseFloat(values.pension.you.replace(/[^0-9.-]+/g, "")),
          partner: "",
        },
      };
    }

    setFinancialAssets(formattedValues);
    sessionStorage.setItem("FinancialAssets", JSON.stringify(formattedValues));
    router.push("../OtherPropertyDetails");
  };

  const assetTypes = [
    {
      label: "Money in Bank Accounts / Offset / Term Deposits",
      icon: Bank,
      name: "bankAccounts",
    },
    { label: "Shares/ETFS", icon: Portfolio, name: "shares" },
    { label: "Managed Funds", icon: Fund, name: "managedFunds" },
    {
      label: "Super",
      icon: Piggybank,
      name: "super",
      tooltip: "This includes the total amount of all your super accounts.",
    },
    {
      label: "Account Based Pensions",
      icon: Piggybank2,
      name: "pension",
      tooltip:
        "This refers to money that you have with a super fund that you are receiving a regular payment from that is paid into your bank account.",
    },
  ];

  const updateFieldValues = (setFieldValue) => {
    let data = JSON.parse(sessionStorage.getItem("FinancialAssets"));
    if (data) {
      Object.keys(data).forEach((category) => {
        Object.keys(data[category]).forEach((type) => {
          const formattedValue = toCommaAndDollar(data[category][type]);
          setFieldValue(`${category}.${type}`, formattedValue);
        });
      });
    }
  };

  return (
    <div className="container-fluid">
      <h3 className="text-center Green mt-5">Financial Assets</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        innerRef={props.FormReff}
      >
        {({ values, setFieldValue }) => {
          useEffect(() => {
            if (sessionStorage.getItem("FinancialAssets")) {
              updateFieldValues(setFieldValue);
            }
          }, []);

          return (
            <Form className="text-center">
              <div className="row justify-content-center">
                <div className="col-md-5">
                  {assetTypes.map((asset) => (
                    <div
                      key={asset.name}
                      className="mt-4 border w-100"
                      style={{ padding: "3rem 5rem 3rem 5rem" }}
                    >
                      <div className="Center">
                        {" "}
                        <h4 className="text-center">{asset.label}</h4>
                        {asset.tooltip && (
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id={`tooltip-${asset.name}-you`}>
                                {asset.tooltip}
                              </Tooltip>
                            }
                          >
                            <span
                              style={{ marginTop: "3px" }}
                              className="ms-2"
                            >
                              <FaCircleInfo />
                            </span>
                          </OverlayTrigger>
                        )}
                      </div>
                      <asset.icon className="img-responsive businessimg1 mt-3" />
                      <div className=" mt-3">
                        <label
                          className="d-block mb-1"
                          htmlFor={`${asset.name}.you`}
                        >
                          {formData.preferredName}
                        </label>

                        <Field
                          className={`form-control w-75 mx-auto mt-2`}
                          id={`${asset.name}.you`}
                          name={`${asset.name}.you`}
                          placeholder="Please Enter Value in $"
                          value={values[asset.name]?.you}
                          onChange={(e) => {
                            const rawValue = e.target.value.replace(
                              /[^0-9.-]+/g,
                              ""
                            );
                            const formattedValue = toCommaAndDollar(rawValue);
                            setFieldValue(`${asset.name}.you`, formattedValue);
                          }}
                          type="text"
                        />
                        {formData.relationShipStatus === "couple" && (
                          <>
                            <label
                              className="mt-3"
                              htmlFor={`${asset.name}.partner`}
                            >
                              {formData.partnerPreferredName}
                            </label>
                            
                            <Field
                              className={`form-control w-75 mx-auto mt-2`}
                              id={`${asset.name}.partner`}
                              name={`${asset.name}.partner`}
                              placeholder="Please Enter Value in $"
                              value={values[asset.name]?.partner}
                              onChange={(e) => {
                                const rawValue = e.target.value.replace(
                                  /[^0-9.-]+/g,
                                  ""
                                );
                                const formattedValue =
                                  toCommaAndDollar(rawValue);
                                setFieldValue(
                                  `${asset.name}.partner`,
                                  formattedValue
                                );
                              }}
                              type="text"
                            />
                          </>
                        )}
                      </div>
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

export default FinancialAssets;
