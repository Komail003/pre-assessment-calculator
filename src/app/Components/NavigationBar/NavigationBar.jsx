import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaChild,
  FaDollarSign,
  FaHome,
  FaPiggyBank,
  FaBuilding,
  FaClipboardList,
  FaLightbulb,
  FaCar,
  FaMoneyBill,
} from "react-icons/fa";

// Define your steps
const steps0 = [
  { path: "/PersonalData", label: "Personal Data", icon: <FaUser size={18} /> },
  { path: "/KidsDetails", label: "Kids Details", icon: <FaChild size={18} /> },
  { path: "/IncomeDetails", label: "Income Details", icon: <FaDollarSign size={18} /> },
  { path: "/HomeDetails", label: "Home Details", icon: <FaHome size={18} /> },
  { path: "/PersonalAssets", label: "Personal Assets", icon: <FaCar size={18} /> },
  { path: "/FinancialAssets", label: "Financial Assets", icon: <FaMoneyBill size={18} /> },
  { path: "/OtherPropertyDetails", label: "Other Property Details", icon: <FaBuilding size={18} /> },
  { path: "/AreaOfAdvice", label: "Area Of Advice", icon: <FaLightbulb size={18} /> },
];

const steps = [
  { path: "/PersonalData", label: "Personal Data", icon: <FaUser size={18} /> },
  { path: "/KidsDetails", label: "Kids Details", icon: <FaChild size={18} /> },
  { path: "/IncomeDetails", label: "Income Details", icon: <FaDollarSign size={18} /> },
  { path: "/HomeDetails", label: "Home Details", icon: <FaHome size={18} /> },
];

const steps2 = [
  { path: "/PersonalAssets", label: "Personal Assets", icon: <FaCar size={18} /> },
  { path: "/FinancialAssets", label: "Financial Assets", icon: <FaMoneyBill size={18} /> },
  { path: "/OtherPropertyDetails", label: "Other Property Details", icon: <FaBuilding size={18} /> },
  { path: "/AreaOfAdvice", label: "Area Of Advice", icon: <FaLightbulb size={18} /> },
];

const NavigationBar = ({ currentPath }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Effect to detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600); // Mobile if screen width is 768px or less
    };

    // Set initial value
    handleResize();

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine which steps to render based on screen size
  const getStepsToRender = () => {
    if (!isMobile) {
      return steps0; // Large screens
    }
    if(currentPath=="/PersonalAssets"){
      return steps2; // Mobile screen (steps2)
    }else{
      return steps; // Mobile screen (steps)

    }
  };

  const stepsToRender = getStepsToRender();

  return (
    <div className="navigation-bar d-flex justify-content-center">
      <ul className="nav d-flex justify-content-center">
        {stepsToRender.map((step, index) => (
          <li
            key={index}
            className={`nav-item${currentPath === step.path ? " active" : ""}`}
          >
            <Link href={step.path} className="nav-link">
              <div className="Center">
                <div className="icon-container">
                  {React.cloneElement(step.icon, {
                    className: `icon ${
                      currentPath === step.path
                        ? "icon-active"
                        : "icon-inactive"
                    }`,
                  })}
                </div>
              </div>
              {step.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavigationBar;
