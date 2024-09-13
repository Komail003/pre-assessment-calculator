import Link from "next/link";
import React from "react";
import {
  FaUser,
  FaChild,
  FaDollarSign,
  FaHome,
  FaPiggyBank,
  FaBuilding,
  FaClipboardList,
  FaLightbulb,
} from "react-icons/fa";
import { FaBuildingFlag, FaCar, FaCashRegister, FaMoneyBill } from "react-icons/fa6";
// import './NavigationBar.css'; // Ensure CSS is imported

const NavigationBar = ({ currentPath }) => {
  const steps = [
    {
      path: "/PersonalData",
      label: "Personal Data",
      icon: <FaUser size={18} />,
    },
    {
      path: "/KidsDetails",
      label: "Kids Details",
      icon: <FaChild size={18} />,
    },
    {
      path: "/IncomeDetails",
      label: "Income Details",
      icon: <FaDollarSign size={18} />,
    },
    { path: "/HomeDetails", label: "Home Details", icon: <FaHome size={18} /> },
    {
      path: "/PersonalAssets",
      label: "Personal Assets",
      icon: <FaCar size={18} />,
    },
    {
      path: "/FinancialAssets",
      label: "Financial Assets",
      icon: <FaMoneyBill size={18} />,
    },
    {
      path: "/OtherPropertyDetails",
      label: "Other Property Details",
      icon: <FaBuilding size={18} />,
    },
    {
      path: "/AreaOfAdvice",
      label: "Area Of Advice",
      icon: <FaLightbulb size={18} />,
    },
  ];

  return (
    <div className="navigation-bar d-flex justify-content-center">
      <ul className="nav d-flex justify-content-center">
        {steps.map((step, index) => (
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
