"use client";
import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { otherPropertyDetailsState, selectedGoalsState } from "../Atom";
import Home from "../Svgs/home-svgrepo-com.svg";
import Time from "../Svgs/time-is-money.svg";
import Pig1 from "../../../public/images/piggy-bank.png";
import Loan from "../Svgs/loan.svg";
import Insurance from "../../../public/images/insurance.png";
import Gear from "../Svgs/gears-gear-svgrepo-com.svg";
import Inheritance from "../../../public/images/inheritance.png";
import Investing from "../Svgs/portfolio.svg";
import moneyBag from "../Svgs/money-bag-svgrepo-com.svg";
import Bill from "../../../public/images/bill.png";
import Payless from "../../../public/images/payless.png";
import medical from "../Svgs/medical-insurance-svgrepo-com.svg";
import jsPDF from "jspdf";
import "jspdf-autotable";
import fund from "../../../public/images/denarologo.png";
import { useRouter } from "next/navigation";

const goalsOptions = [
  { key: "buyAProperty", label: "Buy A Property", Icon: Home, isImage: false },
  {
    key: "payOffTheHomeLoan",
    label: "Pay Off The Home Loan",
    Icon: Loan,
    isImage: false,
  },
  {
    key: "lifeIncomeProtectionInsurance",
    label: "Life & Income Protection Insurance",
    Icon: Insurance,
    isImage: true,
  },
  {
    key: "buildUpSuperannuation",
    label: "Build Up Super",
    Icon: Pig1,
    isImage: true,
  },
  {
    key: "planForRetirement",
    label: "Plan For Retirement",
    Icon: Time,
    isImage: false,
  },
  {
    key: "eligibilityToCentrelink",
    label: "Eligibility To Centrelink",
    Icon: Gear,
    isImage: false,
  },
  {
    key: "investingMoney",
    label: "Investing Money",
    Icon: Investing,
    isImage: false,
  },
  {
    key: "manageMoneyFinances",
    label: "Manage Our Money And Finances Better",
    Icon: Bill,
    isImage: true,
  },
  { key: "payLessTax", label: "Pay Less Tax", Icon: Payless, isImage: true },
  {
    key: "anInheritance",
    label: "An Inheritance",
    Icon: Inheritance,
    isImage: true,
  },
  { key: "agedCare", label: "Aged Care", Icon: medical, isImage: false },
  {
    key: "SMSF",
    label: "Self Managed Super Fund",
    Icon: moneyBag,
    isImage: false,
  },
];

function AreaOfAdvice(props) {
  const [selectedGoals, setSelectedGoals] = useRecoilState(selectedGoalsState);
  const [personalData, setPersonalData] = useState("");
  // const [selectedGoals, setSelectedGoals] = useRecoilState(selectedGoalsState);

  // Initialize form values based on Recoil state
  const initialValues = goalsOptions.reduce(
    (acc, goal) => {
      acc[goal.key] = selectedGoals.some((g) => g.key === goal.key)
        ? "Yes"
        : "No";
      return acc;
    },
    { otherIncome: selectedGoals.length > 0 ? "Yes" : "No" }
  );

  const getGoalsWithYesValues = (values) => {
    return goalsOptions.filter((option) => values[option.key] === "Yes");
  };
  const [otherProperty, setotherProperty] = useRecoilState(
    otherPropertyDetailsState
  );
  const generatePDF = () => {
    const doc = new jsPDF("p", "pt", "letter");

    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    const specialElementHandlers = {
      "#bypassme": function (element, renderer) {
        // true = "handled elsewhere, bypass text extraction"
        return true;
      },
    };

    const margins = {
      top: 150,
      bottom: 60,
      left: 40,
      right: 40,
      width: 600,
    };

    const img = new window.Image();
    img.src = fund.src;

    return new Promise(async (resolve, reject) => {
      img.onload = () => {
        // Calculate x and y coordinates to center the image
        const x = (pageWidth - 200) / 2; // Center horizontally
        const y = (pageHeight - 200) / 2; // Center vertically

        // Add image to PDF once it has loaded
        doc.addImage(img, "PNG", x, 25, 200, 200); // x, y, width, height (in points)
        doc.setFontSize(52);
        doc.setFont("helvetica", "bold");
        doc.setTextColor("#36b446"); // Set font style to bold using setFont

        doc.text(310, 320, "CLIENT DISCOVERY REPORT", {
          maxWidth: 500,
          lineHeightFactor: 1.2,
          align: "center",
        });

        doc.setFontSize(13);
        doc.setFont("helvetica", "bold");
        doc.setTextColor("#000");
        let formData = JSON.parse(sessionStorage.getItem("PersonalData"));
        console.log(formData);

        doc.text(
          310,
          490,
          "Prepared for " +
            formData?.preferredName + " "+formData?.surName +
            " " +
            (formData?.partnerPreferredName !== undefined
              ? "and " + formData.partnerPreferredName + " " + formData.partnerSurName
                            : ""),
          {
            maxWidth: 500,
            lineHeightFactor: 1.2,
            align: "center",
          }
        );
        doc.setFontSize(8);

        doc.text(310, 710, "www.denarowealth.com.au", "center");
        doc.text(221, 720, "Denaro Wealth Pty Ltd. All Rights Reserved ");
        // doc.fontStyle("normal");
        doc.text(
          305,
          730,
          "Denaro Wealth Pty Ltd is an authorised representative of Lifespan Financial Planning Pty Ltd ASFL 229892",
          { maxWidth: 415, align: "center" }
        );

        doc.addPage();

        doc.setLineWidth(2);
        doc.setTextColor("#28a745"); // Set text color

        doc.setFontSize(22);
        doc.setFont("helvetica", "bold"); // Set font style to bold using setFont
        doc.text(55, 70, "Your Information");

        doc.setFontSize(13);
        doc.setTextColor(101, 101, 101);
        doc.setFont("helvetica", "normal");
        doc.text(
          55,
          100,
          "Below is a summary of the information that you have entered in the Denaro Wealth Client Discovery Form.",
          { maxWidth: 500, lineHeightFactor: 1.5, align: "justify" }
        );

        // Add table to PDF
        doc.autoTable({
          html: "#resultTable1",
          margin: { left: 55 },
          startY: 150, // Position table below the image
          theme: "grid",
          columnStyles: {
            0: {
              cellWidth: 500,
              valign: "middle",
            },
          },
          headStyles: {
            fillColor: "#28a745",
            valign: "middle",
            fontSize: 12,
          },
          styles: {
            minCellHeight: 40,
          },
        });

        // page 12 start
        doc.addPage();

        doc.autoTable({
          html: "#resultTable2",
          margin: { left: 55 },
          startY: 60, // Position table below the image
          theme: "grid",
          columnStyles: {
            0: {
              cellWidth: 253,
              valign: "middle",
            },

            1: {
              cellWidth: 126,
              valign: "middle",
            },

            2: {
              cellWidth: 126,
              valign: "middle",
            },
          },
          headStyles: {
            fillColor: "#28a745",
            valign: "middle",
            fontSize: 12,
          },
          styles: {
            minCellHeight: 40,
          },
        });

        doc.autoTable({
          html: "#resultTable3",
          margin: { left: 55 },
          startY: 440, // Position table below the image
          theme: "grid",
          columnStyles: {
            0: {
              cellWidth: 253,
              valign: "middle",
            },

            1: {
              cellWidth: 126,
              valign: "middle",
            },

            2: {
              cellWidth: 126,
              valign: "middle",
            },
          },
          headStyles: {
            fillColor: "#28a745",
            valign: "middle",
            fontSize: 12,
          },
          styles: {
            minCellHeight: 40,
          },
        });

        doc.addPage();

        doc.autoTable({
          html: "#resultTable4",
          margin: { left: 55 },
          startY: 60, // Position table below the image
          theme: "grid",
          columnStyles: {
            0: {
              cellWidth: 253,
              valign: "middle",
            },

            1: {
              cellWidth: 126,
              valign: "middle",
            },

            2: {
              cellWidth: 126,
              valign: "middle",
            },
          },
          headStyles: {
            fillColor: "#28a745",
            valign: "middle",
            fontSize: 12,
          },
          styles: {
            minCellHeight: 40,
          },
        });

        doc.autoTable({
          html: "#resultTable5",
          margin: { left: 55 },
          startY: 290, // Position table below the image
          theme: "grid",
          columnStyles: {
            0: {
              cellWidth: 379,
              valign: "middle",
            },

            1: {
              cellWidth: 126,
              valign: "middle",
            },
          },
          headStyles: {
            fillColor: "#28a745",
            valign: "middle",
            fontSize: 12,
          },
          styles: {
            minCellHeight: 40,
          },
        });

        doc.autoTable({
          html: "#resultTable6",
          margin: { left: 55 },
          startY: 550, // Position table below the image
          theme: "grid",
          columnStyles: {
            0: {
              cellWidth: 253,
              valign: "middle",
            },

            1: {
              cellWidth: 126,
              valign: "middle",
            },

            2: {
              cellWidth: 126,
              valign: "middle",
            },
          },
          headStyles: {
            fillColor: "#28a745",
            valign: "middle",
            fontSize: 12,
          },
          styles: {
            minCellHeight: 40,
          },
        });

        doc.addPage();

        doc.autoTable({
          html: "#resultTable7",
          margin: { left: 55 },
          startY: 60, // Position table below the image
          theme: "grid",
          columnStyles: {
            0: {
              cellWidth: 253,
              valign: "middle",
            },

            1: {
              cellWidth: 126,
              valign: "middle",
            },

            2: {
              cellWidth: 126,
              valign: "middle",
            },
          },
          headStyles: {
            fillColor: "#28a745",
            valign: "middle",
            fontSize: 12,
          },
          styles: {
            minCellHeight: 40,
          },
        });

        doc.autoTable({
          html: "#resultTable8",
          margin: { left: 55 },
          startY: 200, // Position table below the image
          theme: "grid",
          columnStyles: {
            0: {
              cellWidth: 253,
              valign: "middle",
            },

            1: {
              cellWidth: 126,
              valign: "middle",
            },

            2: {
              cellWidth: 126,
              valign: "middle",
            },
          },
          headStyles: {
            fillColor: "#28a745",
            valign: "middle",
            fontSize: 12,
          },
          styles: {
            minCellHeight: 40,
          },
        });

        doc.autoTable({
          html: "#resultTable9",
          margin: { left: 55 },
          startY: 350, // Position table below the image
          theme: "grid",
          columnStyles: {
            0: {
              cellWidth: 253,
              valign: "middle",
            },

            1: {
              cellWidth: 126,
              valign: "middle",
            },

            2: {
              cellWidth: 126,
              valign: "middle",
            },
          },
          headStyles: {
            fillColor: "#28a745",
            valign: "middle",
            fontSize: 12,
          },
          styles: {
            minCellHeight: 40,
          },
        });

        doc.addPage();
        if (sessionStorage.getItem("OtherPropertyDetails")) {
          const storedProperty = JSON.parse(
            sessionStorage.getItem("OtherPropertyDetails")
          );
          setotherProperty(storedProperty);
          const propertyLength = storedProperty.properties.length;

          console.log("length of array", propertyLength);

          for (let i = 0; i < propertyLength && i < 5; i++) {
            doc.autoTable({
              html: `#resultTable${10 + i}`,
              margin: { left: 55 },
              startY: 60, // Position table below the image
              theme: "grid",
              columnStyles: {
                0: {
                  cellWidth: 253,
                  valign: "middle",
                },
                1: {
                  cellWidth: 253,
                  valign: "middle",
                },
                2: {
                  cellWidth: 126,
                  valign: "middle",
                },
              },
              headStyles: {
                fillColor: "#28a745",
                valign: "middle",
                fontSize: 12,
              },
              styles: {
                minCellHeight: 40,
              },
            });

            // Add a new page after each table except the last one
            if (i < propertyLength - 1 && i < 4) {
              doc.addPage();
            }
          }
        }

        const pdfData = doc.output("blob");
        // window.open(URL.createObjectURL(pdfData));
        //
        console.log(pdfData, "inpdf Function ");

        resolve(pdfData);
      };

      img.onerror = (error) => {
        reject(new Error("Failed to load image."));
      };
    });
  };

  const convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const getBase64PDF = async () => {
    const pdfBlob = await generatePDF();
    console.log(pdfBlob, "after return =");
    // return false;
    const base64PDF = await convertBlobToBase64(pdfBlob);

    // console.log("base64PDF: ", base64PDF);
    let formData = await JSON.parse(sessionStorage.getItem("PersonalData"));
    setPersonalData(formData);
    if (formData && formData.DOB &&formData.partnerDOB) {
      // Create a new Date object from the DOB
      let dobDate = new Date(formData.DOB);
      let PartnerDobDate = new Date(formData.partnerDOB);

      // Format the date as DD/MM/YYYY
      let australianDate = dobDate.toLocaleDateString("en-AU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      let PartnerAustralianDate = PartnerDobDate.toLocaleDateString("en-AU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      // Update the DOB in formData with the formatted date
      formData.DOB = australianDate;
      formData.partnerDOB = PartnerAustralianDate;
      // console.log(formData.DOB,formData.partnerDOB )

    }else if(formData && formData.DOB){
      let dobDate = new Date(formData.DOB);
      let australianDate = dobDate.toLocaleDateString("en-AU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      formData.DOB = australianDate;
    }
     else {
      console.log("DOB not found in formData.");
    }
    // console.log("email sender", formData);
    let Data = JSON.stringify({
      to: formData.email,
      subject : `Online Client Discovery Form (${formData.firstName} ${formData.surName}${
        formData.partnerFirstName ? ` and ${formData.partnerFirstName} ${formData.partnerSurName}` : ""
      })`,
      text: "Please find the attached PDF document.",
      PersonalData: formData,
      base64PDF,
    });
    console.log("Data:", Data);

    const response = await fetch("/api/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: Data,
    });

    console.log("response", response);
    
    if (response.status !== 200) {
      console.log("Error Occured");
      // alert(
      //   "Your assessment has been successfully submitted. You will receive an email with the results shortly."
      // );

    }else{
      alert(
        "Your assessment has been successfully submitted. You will receive an email with the results shortly please wait!"
      );
    }
    return base64PDF;
  };
  const router = useRouter();

  const onSubmit = async (values) => {
    // return false;
    const selectedGoals = await getGoalsWithYesValues(values);
    // console.log(selectedGoals);
    await setSelectedGoals(selectedGoals);
    await sessionStorage.setItem("OtherIncome", JSON.stringify(selectedGoals));
    sessionStorage.setItem("ReloadFlag", false);
    sessionStorage.setItem("ReloadFlag2", "true");
    await getBase64PDF();
    router.push("/Results");

    // props.handleStepChange();
  };

  const goalsClick = (key, values, setFieldValue) => {
    const newValue = values[key] === "No" ? "Yes" : "No";
    setFieldValue(key, newValue);
  };
  const updateFieldValues = (setFieldValue) => {
    let data = JSON.parse(sessionStorage.getItem("OtherIncome"));
    if (data) {
      goalsOptions.forEach((goal) => {
        // setFieldValue("otherIncome", "Yes");
        const goalValue = data.some((g) => g.key === goal.key) ? "Yes" : "No";
        setFieldValue(goal.key, goalValue);
      });
    }
  };

  return (
    <div className="container-fluid">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        innerRef={props.FormReff}
      >
        {({ values, handleChange, setFieldValue }) => {
          useEffect(() => {
            // alert("komail");
            if (sessionStorage.getItem("OtherIncome")) {
              // alert("komail1");
              updateFieldValues(setFieldValue);
            }
          }, []);
          return (
            <Form className="text-center">
              <div className="row mt-5 py-4">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <h4 className="text-center Green">Areas of Advice</h4>
                </div>
              </div>
              <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                  <label className="mt-3">
                    What areas of advice are you seeking? Please select some of
                    the areas below.
                  </label>
                  <div className="d-flex flex-wrap justify-content-center">
                    {goalsOptions.map(({ key, label, Icon, isImage }) => (
                      <div
                        role="button"
                        key={key}
                        className={`goal-item  position-relative m-2 mt-3 ${
                          values[key] === "Yes" ? "customBorder" : "border"
                        }`}
                        onClick={() => goalsClick(key, values, setFieldValue)}
                        style={{
                          // flex: "1 1 30%",
                          margin: "10px",
                          border:
                            values[key] === "Yes"
                              ? "2px solid #36b446"
                              : "1px solid #ddd",
                          padding: "15px",
                          borderRadius: "8px",
                          backgroundColor:
                            values[key] === "Yes" ? "#36b44610" : "#fff",
                          textAlign: "center",
                        }}
                      >
                        <label className="form-label">{label}</label>
                        <div className="text-center">
                          <div className="mx-auto">
                            {isImage ? (
                              <Image
                                src={Icon}
                                alt={label}
                                className="img-responsive businessimg3"
                              />
                            ) : (
                              <Icon className="img-responsive businessimg3" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-md-2"></div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default AreaOfAdvice;
