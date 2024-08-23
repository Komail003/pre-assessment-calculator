import React, { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { RecoilRoot } from "recoil";
import PdfTables from "./PdfTables";
import ProgressBar from "./ProgressBar/ProgressBar";
import NavigationBar from "./NavigationBar/NavigationBar";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const WithNavigation = ({ children }) => {
  const [progress, setProgress] = useState(0);
  const [BackShow, setBackShow] = useState(false);
  const [NextShow, setNextShow] = useState(false);
  const [flag, setFlag] = useState(false);
  const FormReff = useRef(null);

  const router = useRouter();
  const Pathname = usePathname();

  useEffect(() => {
    document.title = "Pre-Assessment-Calculator";
    SwitchButtonRender(Pathname);
    updateProgressBar(Pathname);
  }, [Pathname]);

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

  const prevStep = (path) => {
    switch (path) {
      case "/PersonalData":
        router.push("/");
        break;
      case "/KidsDetails":
        router.push("/PersonalData");
        break;
      case "/IncomeDetails":
        router.push("/KidsDetails");
        break;
      case "/HomeDetails":
        router.push("/IncomeDetails");
        break;
      case "/PersonalAssets":
        router.push("/HomeDetails");
        break;
      case "/FinancialAssets":
        router.push("/PersonalAssets");
        break;
      case "/OtherPropertyDetails":
        router.push("/FinancialAssets");
        break;
      case "/AreaOfAdvice":
        router.push("/OtherPropertyDetails");
        setBackShow(true);
        break;
      default:
        break;
    }
  };

  const updateProgressBar = (path) => {
    switch (path) {
      case "/PersonalData":
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
      case "/AreaOfAdvice":
        setProgress(100);
        break;
    }
  };

  const SwitchButtonRender = (path) => {
    if (path == "/AreaOfAdvice") {
      setFlag(true);
    } else {
      setFlag(false);
    }
    switch (path) {
      case "/":
        setBackShow(false);
        setNextShow(false);
        break;
      default:
        setBackShow(true);
        setNextShow(true);
        break;
    }
  };

  return (
    <RecoilRoot>
      <div className="container-fluid p-0 m-0 pt-4">
      {NextShow && (  
        <div className="d-flex justify-content-center">
          <div className="col-9">
            <NavigationBar currentPath={Pathname} />
            <ProgressBar progress={progress} />
          </div>
        </div>
        )}
        {children
          ? React.cloneElement(children, {
              FormReff,
            })
          : "no Child exist"}
        <div className="navigation-buttons text-center my-5">
          {BackShow && (
            <button
              className="btn btn-secondary me-5"
              onClick={() => {
                prevStep(Pathname);
              }}
            >
              <FaArrowLeftLong className="me-2" />
              Back
            </button>
          )}
          {NextShow && (
            <button
              className="btn btn-success"
              onClick={nextStep}
              type="button"
              // disabled={progress === 100}
            >
              {flag ? "Submit" : "Next"}
              <FaArrowRightLong className="ms-2 d-inline" />
            </button>
          )}
        </div>
        <PdfTables />
      </div>
    </RecoilRoot>
  );
};

export default WithNavigation;
