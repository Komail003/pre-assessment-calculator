import Image from "next/image";
import React from "react";
import logo from "../../../public/images/denarologo.png";
const Result = () => {
  return (
      <div className="text-center py-5 container">
        <Image src={logo} alt="Logo" width={200} height={200}/>
       <p>
        Thank you for completing the Client Discovery Form. Your information has been successfully submitted.
       </p>
       <p>We will review your details in preparation for our initial complimentary discovery meeting and tailor the session to your needs. If we need any additional information, we’ll reach out beforehand.</p>
      <p>If you have any questions in the meantime, feel free to get in touch with us  on 03 9070 0116 or at admin@denarowealth.com.au</p>
      <p>We look forward to speaking with you soon!</p>
      </div>
  );
};

export default Result;
