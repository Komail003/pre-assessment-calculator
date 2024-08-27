"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import logo from "../../../public/images/denarologo.png";
import { usePathname, useRouter } from "next/navigation";

const Result = () => {
  const router = useRouter();
  const Pathname = usePathname();
  const [stateCalifornia, setStateCalifornia] = useState(true);

  //   useEffect(() => {

  //     const handleBeforeUnload = async (Pathname, router) => {
  // if(stateCalifornia){

  //       const flag = sessionStorage.getItem("ReloadFlag");
  //       console.log(Pathname, flag);

  //       if (Pathname === "/Results" && flag === "true") {
  //         alert("page is reloaded");
  //         sessionStorage.clear();
  //         router.push("/");
  //       } else {
  //         alert("page reloaded without clearance");
  //         sessionStorage.setItem("ReloadFlag", true);
  //         setStateCalifornia(false);
  //       }

  //     }

  //     };

  //     // Add event listener to detect page reload or close
  //     window.addEventListener(
  //       "beforeunload",
  //       handleBeforeUnload(Pathname, router)
  //     );

  //     // // Cleanup the event listener on component unmount
  //     // return () => {
  //     //   window.removeEventListener(
  //     //     "beforeunload",
  //     //     handleBeforeUnload(Pathname, router)
  //     //   );
  //     // };
  //   }, []);

  var reloaded2 = true;
  useEffect(() => {
    if (reloaded2) {
      // Check if the page was reloaded
      const reloaded = sessionStorage.getItem("ReloadFlag");

      if (reloaded === "true") {
        // If the page was reloaded, clear session storage and navigate to home page
        // alert("page is reloaded");
        sessionStorage.clear();
        router.push("/");
      } else {
        // alert("page reloaded without clearance");
        // If it's the first time visiting the page, set the reloaded flag
        sessionStorage.setItem("ReloadFlag", "true");
        // sessionStorage.setItem("ReloadFlag2", "true");
      }
      // sessionStorage.setItem("ReloadFlag2", "false");
      reloaded2 = false;
    }
  }, [Pathname]);

  return (
    <div className="text-center py-5 container">
      <Image src={logo} alt="Logo" width={200} height={200} />
      <p>
        Thank you for completing the Client Discovery Form. Your information has
        been successfully submitted.
      </p>
      <p>
        We will review your details in preparation for our initial complimentary
        discovery meeting and tailor the session to your needs. If we need any
        additional information, we’ll reach out beforehand.
      </p>
      <p>
        If you have any questions in the meantime, feel free to get in touch
        with us on 03 9070 0116 or at admin@denarowealth.com.au
      </p>
      <p>We look forward to speaking with you soon!</p>
    </div>
  );
};

export default Result;
