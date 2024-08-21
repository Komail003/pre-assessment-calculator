import React, { useEffect, useRef, useState } from "react";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import PdfTables from "./PdfTables";
import { RecoilRoot } from "recoil";
import ProgressBar from "./ProgressBar/ProgressBar";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const WithNavigation = ({ children }) => {
  const [step, setStep] = useState(0);
  const [BackShow, setBackShow] = useState(false);
  const [flag, setFlag] = useState(false);
  const [progress, setProgress] = useState(0);

  const FormReff = useRef(null);

  const nextStep = async () => {
    if (FormReff.current) {
      try {
        await FormReff.current.handleSubmit();
      } catch (error) {
        console.error("Error during form submission", error);
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const prevStep = () => {
    router.back();
  };

  const router = useRouter();
  const Pathname = usePathname();

  // const goToAbout = () => {
  //   alert("jump")
  //   router.push('../KidsDetails');
  // };

  useEffect(() => {
    document.title = "Pre-Assessment-Calculator";
    SwitchButtonRender(Pathname);
    updateProgressBar(Pathname);
  }, [Pathname]);
  let updateProgressBar = (path) => {
    switch (path) {
      case "/":
        setProgress(0);
        break;
      case "/KidsDetails":
        setProgress(14);
        break;
      case "/IncomeDetails":
        setProgress(28);
        break;
      case "/HomeDetails":
        setProgress(42);
        break;
      case "/PersonalAssets":
        setProgress(56);
        break;
      case "/FinancialAssets":
        setProgress(70);
        break;
      case "/OtherPropertyDetails":
        setProgress(85);
        break;
      case "/OtherIncome":
        setProgress(100);
        break;
    }
  };

  let SwitchButtonRender = (path) => {
    console.log(path);
    if (path == "/OtherIncome") {
      setFlag(true);
    } else {
      setFlag(false);
    }
    switch (path) {
      case "/":
        setBackShow(false);

        break;
      case "/KidsDetails":
      case "/IncomeDetails":
      case "/HomeDetails":
      case "/PersonalAssets":
      case "/FinancialAssets":
      case "/OtherPropertyDetails":
      case "/OtherIncome":
        setBackShow(true);
        break;

      default:
        break;
    }
  };

  return (
    <RecoilRoot>
      <div className="container-fluid p-0 m-0 pt-4">
        <div className="d-flex justify-content-center" >
          <div className="col-9">
          <ProgressBar progress={progress} />
          </div>
        </div>
        {children
          ? React.cloneElement(children, {
              FormReff,
            })
          : "no Child exist"}

        <div className="navigation-buttons text-center my-5">
          {BackShow && (
            <button
              className="btn btn-secondary me-5"
              onClick={prevStep}
            >
              <FaArrowLeftLong className="me-2"/>
              Back
            </button>
          )}
          <button
            className="btn btn-success"
            onClick={nextStep}
            type="button"
            disabled={step === children.length}
          >
            {flag == true ? "Submit" : "Next"}
            <FaArrowRightLong className="ms-2 d-inline"/>
          </button>
        </div>
        <PdfTables />
      </div>
    </RecoilRoot>
  );
};

export default WithNavigation;
