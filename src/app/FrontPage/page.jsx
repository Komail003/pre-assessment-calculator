// import { useRouter } from "next/router";
"use client";
import React, { useEffect, useState } from "react";
import WithNavigation from "../Components/WithNavigation";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../../public/images/denarologo.png";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
const Homepage = () => {
  const router = useRouter();
  const navigateTOCalculator = () => {
    // alert("hi");
    router.push("/PersonalData");
  };

  return (
    <div className="text-center px-4 pb-5 frontPage">
      <Image src={logo} alt="logo" width={200} height={200} />
      <h1 className="Green">CLIENT DISCOVERY FORM</h1>
      <button
        onClick={() => {
          navigateTOCalculator();
        }}
        className="btn btn-success startbtn"
      >
        <span className="d-flex justify-content-center"> 
        <MdKeyboardDoubleArrowRight size={24} className="fw-bold" />
        Start
        </span>
      </button>
      <br />
        <p style={{fontSize:"13px"}} className="mt-3 px-4 fw-semibold" >
          Denaro Wealth Pty Ltd (ABN 23 625 686 464 is a Corporate Authorised
          Representative (ASIC No. 1263750) of Lifespan Financial Planning Pty
          Ltd (AFSL: 229892)
        </p>
      <div className="text-center">
        <p className="mt-2">
          To ensure we fully understand your needs and goals, we’ve put together
          a short Client Discovery Form. Your responses will help us tailor our
          advice and services specifically to your circumstances.
        </p>
        <p className="mt-2">
          This form is designed to be quick and straightforward, and your input
          will allow us to provide the best possible guidance for your financial
          journey. Please take a few minutes to complete the form online at your
          convenience. Your privacy is our priority, and all information
          provided will be treated with the utmost confidentiality.
        </p>
        <p className="mt-2">
          If you have any questions, feel free to reach out. We’re here to help
          every step of the way. Thank you for your time and trust.
        </p>
      </div>
    </div>
  );
};

export default Homepage;
