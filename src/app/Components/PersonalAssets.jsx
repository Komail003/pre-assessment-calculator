import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { personalAssetsState, personalDataState } from "../Atom";
import Car from "../Svgs/car.svg";
import Warehouse from "../Svgs/warehouse.svg";
import Boat from "../Svgs/boat.svg";
import Caravan from "../Svgs/trailer-caravan.svg";
import Credit from "../Svgs/credit-card.svg";
import MoneyBag from "../../../public/images/moneyGiving.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

function PersonalAssets(props) {
  const [personalAssets, setPersonalAssets] =
    useRecoilState(personalAssetsState);
  const [formData] = useRecoilState(personalDataState);

  const toCommaAndDollar = (x) =>
    "$" +
    Math.ceil(x)
      .toFixed(0)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      const parseNumberFromFormattedString = (str) => {
        if (!str) return 0; // Handle undefined, null, or empty strings
        return parseFloat(str.replace(/[^0-9.-]+/g, ""));
      };
      

  const assetTypes = [
    {
      key: "cars",
      label: "Cars",
      youId: "husbandCars",
      partnerId: "partnerCars",
      isPartnered: true,
      Icon: Car,
    },
    {
      key: "householdContents",
      label: "Household Contents",
      youId: "husbandHousehold",
      partnerId: "partnerHousehold",
      isPartnered: false,
      Icon: Warehouse,
    },
    {
      key: "boat",
      label: "Boat",
      youId: "husbandBoat",
      partnerId: "partnerBoat",
      isPartnered: false,
      Icon: Boat,
    },
    {
      key: "caravan",
      label: "Caravan",
      youId: "husbandCaravan",
      partnerId: "partnerCaravan",
      isPartnered: false,
      Icon: Caravan,
    },
    {
      key: "creditCards",
      label: "Credit Cards",
      youId: "creditCards",
      partnerId: "partnerCredit",
      isPartnered: true,
      Icon: Credit,
      isImage: false, // This indicates that we are using a Next.js Image component for this item
    },
    {
      key: "personalLoan",
      label: "Personal Loan",
      youId: "personelLoan",
      partnerId: "partnerPersonelLoan",
      isPartnered: true,
      Icon: MoneyBag,
      isImage: true, // This indicates that we are using a Next.js Image component for this item
    },
  ];

  const initialValues = assetTypes.reduce((acc, asset) => {
    acc[asset.youId] = personalAssets[asset.youId]
      ? toCommaAndDollar(personalAssets[asset.youId])
      : "";
    if (formData.relationShipStatus === "couple") {
      acc[asset.partnerId] = personalAssets[asset.partnerId]
        ? toCommaAndDollar(personalAssets[asset.partnerId])
        : "";
    }
    return acc;
  }, {});
  const router = useRouter();

  const onSubmit = (values) => {
    const formattedValues = assetTypes.reduce((acc, asset) => {
      // Ensure the value is a valid string or provide a default value
      const youValue = values[asset.youId] || "0";
      acc[asset.youId] = parseNumberFromFormattedString(youValue);
  
      if (formData.relationShipStatus === "couple") {
        const partnerValue = values[asset.partnerId] || "0";
        acc[asset.partnerId] = parseNumberFromFormattedString(partnerValue);
      }
  
      return acc;
    }, {});
  
    setPersonalAssets(formattedValues);
    console.log(formattedValues);
    sessionStorage.setItem("PersonalAssets", JSON.stringify(formattedValues));
    router.push("../FinancialAssets");
  };
  
  const updateFieldValues=(setFieldValue)=>{
    // alert("komail2");
    let data=JSON.parse(sessionStorage.getItem("PersonalAssets"));
    // console.log("Data",data)
    if (data) {
      Object.keys(data).forEach((key) => {
        const formattedValue = toCommaAndDollar(data[key]);
        setFieldValue(key, formattedValue);
      });
    }
  };

  return (
    <div className="container-fluid">
      <h3 className="text-center Green mt-5">Personal Assets & Debts</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        innerRef={props.FormReff}
      >
        {({ values, setFieldValue }) =>{
               useEffect(() => {
                // alert("komail");
                if(sessionStorage.getItem("PersonalAssets")){
                  // alert("komail1");
                  updateFieldValues(setFieldValue);
                }
              }, [])
          return(
          <Form className="text-center">
            <div className="row justify-content-center">
              <div className="col-md-5">
                {assetTypes.map((asset) => (
                  <div key={asset.key} className="asset-section mt-4 border w-100" style={{ padding: "2rem 5rem 3rem 5rem" }}>
                    <h4 className="text-center pt-3 mt-4">{asset.label}</h4>
                    {asset.isImage ? (
                      <Image
                        alt="img"
                        className="img-responsive mt-2 businessimg1"
                        src={asset.Icon}
                      />
                    ) : (
                      <asset.Icon
                        alt="img"
                        className="img-responsive svgs mt-3"
                      />
                    )}
                    <label className="d-block mt-3" htmlFor={asset.youId}>
                      {formData.preferredName}
                    </label>
                    <Field
                      className="form-control w-75 mx-auto mt-2"
                      id={asset.youId}
                      name={asset.youId}
                      placeholder="Please Enter Value in $"
                      value={values[asset.youId]}
                      onChange={(e) => {
                        let rawValue = e.target.value
                          ? e.target.value.replace(/[^0-9.-]+/g, "")
                          : "0";
                        let formattedValue = toCommaAndDollar(rawValue);
                        setFieldValue(asset.youId, formattedValue);
                      }}
                      type="text"
                    />
                    {formData.relationShipStatus === "couple" &&
                      asset.isPartnered == true && (
                        <React.Fragment>
                          <label className="mt-3" htmlFor={asset.partnerId}>
                            {formData.partnerPreferredName}
                          </label>
                          <Field
                            className="form-control w-75 mx-auto mt-2"
                            id={asset.partnerId}
                            name={asset.partnerId}
                            placeholder="Please Enter Value in $"
                            value={values[asset.partnerId]}
                            onChange={(e) => {
                              let rawValue = e.target.value
                                ? e.target.value.replace(/[^0-9.-]+/g, "")
                                : "0";
                              let formattedValue = toCommaAndDollar(rawValue);
                              setFieldValue(asset.partnerId, formattedValue);
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

export default PersonalAssets;
