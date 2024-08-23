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
// import './NavigationBar.css'; // Ensure CSS is imported

const NavigationBar = ({ currentPath }) => {
  const steps = [
    {
      path: "/PersonalData",
      label: "Personal Data",
      icon: <FaUser size={20} />,
    },
    {
      path: "/KidsDetails",
      label: "Kids Details",
      icon: <FaChild size={20} />,
    },
    {
      path: "/IncomeDetails",
      label: "Income Details",
      icon: <FaDollarSign size={20} />,
    },
    { path: "/HomeDetails", label: "Home Details", icon: <FaHome size={20} /> },
    {
      path: "/PersonalAssets",
      label: "Personal Assets",
      icon: <FaPiggyBank size={20} />,
    },
    {
      path: "/FinancialAssets",
      label: "Financial Assets",
      icon: <FaBuilding size={20} />,
    },
    {
      path: "/OtherPropertyDetails",
      label: "Other Property Details",
      icon: <FaClipboardList size={20} />,
    },
    {
      path: "/AreaOfAdvice",
      label: "Area Of Advice",
      icon: <FaLightbulb size={20} />,
    },
  ];

  return (
    <div className="navigation-bar d-flex justify-content-center">
      <ul className="nav">
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
