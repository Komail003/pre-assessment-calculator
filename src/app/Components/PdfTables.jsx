import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  childrenDetailsState,
  financialAssetsState,
  incomeDetailsState,
  otherPropertyDetailsState,
  personalDataState,
  propertyDetailsState,
  selectedGoalsState,
} from "../Atom";
import { personalAssetsState } from "../Atom"; // Assuming you've defined this Recoil atom
import { usePathname } from "next/navigation";
const PdfTables = () => {
  // const childrenDetails = useRecoilValue(childrenDetailsState);
  // const incomeDetails = useRecoilValue(incomeDetailsState);
  // const propertyDetails = useRecoilValue(propertyDetailsState);

  // const formData = useRecoilValue(personalDataState);

  const calculateAnnualRepayments = () => {
    const rentReceived = parseFloat(propertyDetails.rentReceived) || 0;
    const frequencyMap = {
      Weekly: 52,
      Fortnightly: 26,
      Monthly: 12,
    };
    const frequency = frequencyMap[propertyDetails.rentOptions] || 1;
    return toCommaAndDollar(rentReceived * frequency);
  };

  const formatDateToAustralian = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0"); // Get the day and pad with leading zero if necessary
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Get the month (0-indexed, so add 1) and pad with leading zero
    const year = d.getFullYear(); // Get the full year

    return `${day}/${month}/${year}`; // Return in dd/mm/yyyy format
  };

  const [formData, setFormData] = useRecoilState(personalDataState);
  const [childrenDetails, setChildrenDetails] =
    useRecoilState(childrenDetailsState);
  const [incomeDetails, setIncomeDetails] = useRecoilState(incomeDetailsState);

  const [propertyDetails, setPropertyDetails] =
    useRecoilState(propertyDetailsState);

  const [personalAssets, setPersonalAssets] =
    useRecoilState(personalAssetsState);

  // const personalAssets = useRecoilValue(personalAssetsState);
  const [financialAssets, setFinancialAssets] =
    useRecoilState(financialAssetsState);
  const [otherProperty, setotherProperty] = useRecoilState(
    otherPropertyDetailsState
  ); // Use Recoil state
  const [selectedGoals, setSelectedGoals] = useRecoilState(selectedGoalsState); //
  // const [selectedGoals] = useRecoilState(selectedGoalsState);

  const Pathname = usePathname();

  useEffect(() => {
    GetDataFromSession(Pathname);
  }, [Pathname]);

  let GetDataFromSession = (path) => {
    console.log(path);
    if (sessionStorage.getItem("PersonalData")) {
      setFormData(
        JSON.parse(sessionStorage.getItem("PersonalData") || formData)
      );
    }
    if (sessionStorage.getItem("KidsDetails")) {
      setChildrenDetails(
        JSON.parse(sessionStorage.getItem("KidsDetails") || childrenDetails)
      );
    }
    if (sessionStorage.getItem("IncomeDetails")) {
      setIncomeDetails(
        JSON.parse(sessionStorage.getItem("IncomeDetails") || incomeDetails)
      );
    }
    if (sessionStorage.getItem("HomeDetails")) {
      // alert("home details is running");
      console.log("home details", sessionStorage.getItem("HomeDetails"));
      setPropertyDetails(
        JSON.parse(sessionStorage.getItem("HomeDetails") || propertyDetails)
      );
    }
    if (sessionStorage.getItem("PersonalAssets")) {
      setPersonalAssets(
        JSON.parse(sessionStorage.getItem("PersonalAssets") || personalAssets)
      );
    }
    if (sessionStorage.getItem("FinancialAssets")) {
      setFinancialAssets(
        JSON.parse(sessionStorage.getItem("FinancialAssets") || financialAssets)
      );
    }
    if (sessionStorage.getItem("OtherPropertyDetails")) {
      setotherProperty(
        JSON.parse(
          sessionStorage.getItem("OtherPropertyDetails") || otherProperty
        )
      );
    }
    if (sessionStorage.getItem("OtherIncome")) {
      setSelectedGoals(
        JSON.parse(sessionStorage.getItem("OtherIncome") || selectedGoals)
      );
      console.log("selectedGoals", selectedGoals);
    }
  };
  const toCommaAndDollar = (x) => {
    if (!x) return ""; // Return an empty string if x is empty
    return (
      "$" +
      Math.ceil(x)
        .toFixed(0)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );
  };
  const calculateAnnualRent = (property) => {
    // Parse the rentFrequency and rentReceived as floats
    const rentFrequency = property.rentFrequency;
    const rentReceived = parseFloat(property.rentReceived);

    // Determine the multiplier based on the rentFrequency
    let multiplier;
    switch (property.rentFrequency) {
      case "Monthly":
        multiplier = 12;
        break;
      case "Fortnightly":
        multiplier = 26;
        break;
      case "Weekly":
        multiplier = 52;
        break;
      default:
        multiplier = 1; // Default to 1 if frequencyType is not recognized
    }

    // Calculate and return the result
    return toCommaAndDollar(rentReceived * multiplier);
  };
  const calculateAnnualIncome = (property) => {
    // Parse the rentFrequency and rentReceived as floats
    const rentFrequency = property.frequencyOfRentMain;
    const rentReceived = parseFloat(property.rentReceivedMain);

    // Determine the multiplier based on the rentFrequency
    let multiplier;
    switch (rentFrequency) {
      case "Monthly":
        multiplier = 12;
        break;
      case "Fortnightly":
        multiplier = 26;
        break;
      case "Weekly":
        multiplier = 52;
        break;
      default:
        multiplier = 1; // Default to 1 if frequencyType is not recognized
    }

    // Calculate and return the result
    return toCommaAndDollar(rentReceived * multiplier);
  };

  return (
    <div className="p-3 d-none">
      <h2>Your Information</h2>
      <label htmlFor="">
        Below is the summary of the information that you have entered
      </label>
      <div className="pt-3 px-5 table-responsive">
        <table
          className="table table-striped table-bordered table-hover"
          id="resultTable1"
        >
          <thead>
            <tr>
              <th>Areas Of Advice</th>
            </tr>
          </thead>
          <tbody>
            {selectedGoals.length == 0 ? (
              <tr>
                <td>No Areas of advice details available</td>
              </tr>
            ) : (
              <>
                {selectedGoals.map((goal, index) => (
                  <tr key={index}>
                    <td>{goal.label}</td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
      <div className="pt-3 px-5 table-responsive">
        <table className="table table-striped table-bordered" id="resultTable2">
          <thead>
            <tr>
              <th onClick={() => console.log(formData)}>Personal Info</th>
              <th>Client</th>
              <th>Partner</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>First Name</td>
              <td>{formData.firstName || "N/A"}</td>
              <td>{formData.partnerFirstName || "N/A"}</td>
            </tr>
            <tr>
              <td>Surname</td>
              <td>{formData.surName || "N/A"}</td>
              <td>{formData.partnerSurName || "N/A"}</td>
            </tr>
            <tr>
              <td>Preferred Name</td>
              <td>{formData.preferredName || "N/A"}</td>
              <td>{formData.partnerPreferredName || "N/A"}</td>
            </tr>
            <tr>
              <td>DOB</td>
              <td>{formatDateToAustralian(formData.DOB) || "N/A"}</td>
              <td>{formatDateToAustralian(formData.partnerDOB) || "N/A"}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{formData.email || "N/A"}</td>
              <td>{formData.partnerEmail || "N/A"}</td>
            </tr>
            <tr>
              <td>Phone Number</td>
              <td>{formData.phoneNumber || "N/A"}</td>
              <td>{formData.partnerPhoneNumber || "N/A"}</td>
            </tr>
            <tr>
              <td>Relationship Status</td>
              <td>{formData.relationShipStatus || "N/A"}</td>
              <td>{formData.partnerRelationShipStatus || "N/A"}</td>
            </tr>
            <tr>
              <td>Occupation</td>
              <td>{formData.occupation || "N/A"}</td>
              <td>{formData.partnerOccupation || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="pt-3 px-5 table-responsive">
        <table className="table table-striped table-bordered" id="resultTable3">
          <thead>
            <tr>
              <th onClick={() => console.log(childrenDetails)}>
                Children Details
              </th>
              <th>Gender</th>
              <th>DOB</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(childrenDetails.children) &&
            childrenDetails.children.length > 0 ? (
              childrenDetails.children.map((child, index) => (
                <tr key={index}>
                  <td>{child.name || "N/A"}</td>
                  <td>{child.gender || "N/A"}</td>
                  <td>
                    {child.dob instanceof Date
                      ? formatDateToAustralian(child.dob)
                      : formatDateToAustralian(child.dob) || "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No children details available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="pt-3 px-5 table-responsive">
        <table className="table table-striped table-bordered" id="resultTable4">
          <thead>
            <tr>
              <th>Income</th>
              <th>Client</th>
              <th>Partner</th>
            </tr>
          </thead>
          <tbody>
            {incomeDetails.employmentIncome == "" &&
            incomeDetails.partnerEmploymentIncome == "" &&
            incomeDetails.businessIncome == "" &&
            incomeDetails.partnerBusinessIncome == "" &&
            incomeDetails.centrelinkPayments == "" &&
            incomeDetails.partnerCentrelinkPayments == "" &&
            incomeDetails.superPensionPayments == "" &&
            incomeDetails.partnerSuperPensionPayments == "" ? (
              <tr>
                <td colSpan="3">No Income details available</td>
              </tr>
            ) : (
              <>
                <tr>
                  <td>Employment Income</td>
                  <td>
                    {toCommaAndDollar(incomeDetails.employmentIncome) || "N/A"}
                  </td>
                  <td>
                    {toCommaAndDollar(incomeDetails.partnerEmploymentIncome) ||
                      ""}
                  </td>
                </tr>
                <tr>
                  <td>Business Income</td>
                  <td>
                    {toCommaAndDollar(incomeDetails.businessIncome) || "N/A"}
                  </td>
                  <td>
                    {toCommaAndDollar(incomeDetails.partnerBusinessIncome) ||
                      ""}
                  </td>
                </tr>
                <tr>
                  <td>Centrelink Payments</td>
                  <td>
                    {toCommaAndDollar(
                      parseFloat(incomeDetails.centrelinkPayments) * 26
                    ) || "N/A"}
                  </td>
                  <td>
                    {toCommaAndDollar(
                      parseFloat(incomeDetails.partnerCentrelinkPayments) * 26
                    ) || "N/A"}
                    {/* {toCommaAndDollar(incomeDetails.partnerCentrelinkPayments) ||
                  ""} */}
                  </td>
                </tr>
                <tr>
                  <td>Super Pension Payments</td>
                  <td>
                    {toCommaAndDollar(incomeDetails.superPensionPayments) || "N/A"}
                  </td>
                  <td>
                    {toCommaAndDollar(
                      incomeDetails.partnerSuperPensionPayments
                    ) || "N/A"}
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
      <div className="pt-3 px-5 table-responsive">
        <table className="table table-striped table-bordered" id="resultTable5">
          <thead>
            <tr>
              <th
                onClick={() => {
                  console.log(propertyDetails);
                }}
              >
                Home Details
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Market Value</td>
              <td>{toCommaAndDollar(propertyDetails.propertyValue) || "N/A"}</td>
            </tr>
            <tr>
              <td>Loan Balance</td>
              <td>{toCommaAndDollar(propertyDetails.loanBalance) || "N/A"}</td>
            </tr>
            <tr>
              <td>Repayments</td>
              <td>{toCommaAndDollar(propertyDetails.rentReceived) || "N/A"}</td>
            </tr>
            <tr>
              <td>Frequency</td>
              <td>{propertyDetails.rentOptions || "N/A"}</td>
            </tr>
            <tr>
              <td>Total Annual Repayments</td>
              <td>{calculateAnnualRepayments()}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="pt-3 px-5 table-responsive">
        <table
          className="table table-striped table-bordered mt-3"
          id="resultTable6"
        >
          <thead>
            <tr>
              <th>Lifestyle Assets</th>
              <th>Client</th>
              <th>Partner</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cars</td>
              <td>{toCommaAndDollar(personalAssets.husbandCars) || "N/A"}</td>
              <td>{toCommaAndDollar(personalAssets.partnerCars) || "N/A"}</td>
            </tr>
            <tr>
              <td>Household Contents</td>
              <td colSpan={2}>
                {toCommaAndDollar(personalAssets.husbandHousehold) || "N/A"}
              </td>
            </tr>
            <tr>
              <td>Boat</td>
              <td colSpan={2}>
                {toCommaAndDollar(personalAssets.husbandBoat) || "N/A"}
              </td>
            </tr>
            <tr>
              <td>Caravan</td>
              <td colSpan={2}>
                {toCommaAndDollar(personalAssets.husbandCaravan) || "N/A"}
              </td>
            </tr>
          </tbody>
        </table>
        <table
          className="table table-striped table-bordered mt-3"
          id="resultTable7"
        >
          <thead>
            <tr>
              <th >Credit Cards</th>
              <th >Client</th>
              <th >Partner</th>
            </tr>
          </thead>
          <tbody>
            {personalAssets.creditCards == 0 &&
            !personalAssets.partnerCredit ? (
              <tr>
                <td colSpan="3">No Credit card details available</td>
              </tr>
            ) : (
              <>
                
                <tr>
                  <td>Credit Card</td>
                  <td>{toCommaAndDollar(personalAssets.creditCards) || "N/A"}</td>
                  <td>
                    {toCommaAndDollar(personalAssets.partnerCredit) || "N/A"}
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>

        <table
          className="table table-striped table-bordered mt-3"
          id="resultTable8"
        >
          <thead>
            <tr>
              <th >Personal Loan</th>
              <th >Client</th>
              <th >Partner</th>
            </tr>
          </thead>
          <tbody>
            {personalAssets.personelLoan == 0 &&
            !personalAssets.partnerPersonelLoan ? (
              <tr>
                <td colSpan="3">No Personal loan details available</td>
              </tr>
            ) : (
              <>
              
                <tr>
                  <td>Personal Loan</td>
                  <td>{toCommaAndDollar(personalAssets.personelLoan) || "N/A"}</td>
                  <td>
                    {toCommaAndDollar(personalAssets.partnerPersonelLoan)|| "N/A"}
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
      <div className="pt-3 px-5 table-responsive">
        <table className="table table-striped table-bordered" id="resultTable9">
          <thead>
            <tr>
              <th>Financial Assets</th>
              <th>Client</th>
              <th>Partner</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Money in Bank Accounts/Offset/Term Deposits</td>
              <td>
                {toCommaAndDollar(financialAssets.bankAccounts.you) || "N/A"}
              </td>
              <td>
                {toCommaAndDollar(financialAssets.bankAccounts.partner) || "N/A"}
              </td>
            </tr>
            <tr>
              <td>Shares/ETFS</td>
              <td>{toCommaAndDollar(financialAssets.shares.you) || "N/A"}</td>
              <td>{toCommaAndDollar(financialAssets.shares.partner) || "N/A"}</td>
            </tr>
            <tr>
              <td>Managed Funds</td>
              <td>
                {toCommaAndDollar(financialAssets.managedFunds.you) || "N/A"}
              </td>
              <td>
                {toCommaAndDollar(financialAssets.managedFunds.partner) || "N/A"}
              </td>
            </tr>
            <tr>
              <td>Super</td>
              <td>{toCommaAndDollar(financialAssets.super.you) || "N/A"}</td>
              <td>{toCommaAndDollar(financialAssets.super.partner) || "N/A"}</td>
            </tr>
            <tr>
              <td>Account Based Pension</td>
              <td>{toCommaAndDollar(financialAssets.pension.you) || "N/A"}</td>
              <td>{toCommaAndDollar(financialAssets.pension.partner) || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {otherProperty.properties.map((property, index) => (
        <div className="pt-3 px-5 table-responsive">
          <table
            className="table table-striped table-bordered"
            id={`resultTable1${index}`}
          >
            <thead>
              <tr>
                <th colSpan={2}>Investment Property {index + 1}</th>
              </tr>
            </thead>
            <tbody>
              <React.Fragment key={index}>
                <tr>
                  <td>Market Value </td>
                  <td>{toCommaAndDollar(property.marketValue)}</td>
                </tr>
                <tr>
                  <td>Loan Balance </td>
                  <td>{toCommaAndDollar(property.loanBalance)}</td>
                </tr>
                <tr>
                  <td>Repayments</td>
                  <td>{toCommaAndDollar(property.rentReceived)}</td>
                </tr>
                <tr>
                  <td>Rent Frequency </td>
                  <td>{property.rentFrequency}</td>
                </tr>
                <tr>
                  <td>Total Annual Repayments </td>
                  <td>{calculateAnnualRent(property)}</td>
                </tr>
                <tr>
                  <td>Rental Income Received </td>
                  <td>{toCommaAndDollar(property.rentReceivedMain)}</td>
                </tr>
                <tr>
                  <td>Frequency </td>
                  <td>{property.frequencyOfRentMain}</td>
                </tr>
                <tr>
                  <td>Annual Rental Income </td>
                  {/* <td>Annual Rental Income</td> */}
                  <td>{calculateAnnualIncome(property)}</td>
                </tr>
              </React.Fragment>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default PdfTables;
