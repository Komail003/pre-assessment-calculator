import nodemailer from "nodemailer";
const path = require("path");

export async function POST(req) {
  try {
    // Parse the JSON body
    const { to, subject, PersonalData, base64PDF } = await req.json();
    console.log("PersonalData: ", PersonalData);
    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "fahadtech.fts@gmail.com",
        pass: "szmb rvdp fuhg ydpb",
      },
      tls: {
        rejectUnauthorized: false, // Bypass self-signed certificate error
      },
    });

    // Send email to the main recipient
    const clientMailOptions = {
      from: "fahadtech.fts@gmail.com",
      to,
      subject,
      html: generateClientHTMLTemplate(PersonalData), // Use your client-specific template here
      attachments: [
        {
          filename: "Your Pre-Assessment Calculator Report.pdf",
          content: base64PDF.split("base64,")[1],
          encoding: "base64",
        },
        {
          filename: "denaro.png", // File name
          path: path.join(process.cwd(), "public/denaro.png"),
          cid: "image001", // Same CID as in the img src in the HTML template
        },
      ],
    };

    // Send email to BCC (yourself or another recipient) with a different template
    const bccMailOptions = {
      from: "fahadtech.fts@gmail.com",
      // to: "admin@denarowealth.com.au", // You can add multiple BCC recipients here if needed
      // to: "komailabbas376@gmail.com", // You can add multiple BCC recipients here if needed
      to: "wahabhameed2160@gmail.com", // You can add multiple BCC recipients here if needed
      subject,
      html: generateBccHTMLTemplate(PersonalData), // Use your BCC-specific template here
      attachments: [
        {
          filename: "Client Discovery Report.pdf",
          content: base64PDF.split("base64,")[1],
          encoding: "base64",
        },
        {
          filename: "denaro.png", // File name
          path: path.join(process.cwd(), "public/denaro.png"),
          cid: "image001", // Same CID as in the img src in the HTML template
        },
      ],
    };

    // Send emails
    await transporter.sendMail(clientMailOptions);
    await transporter.sendMail(bccMailOptions);

    return new Response(
      JSON.stringify({ message: "Emails sent successfully!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);

    return new Response(
      JSON.stringify({ message: "Error sending email", error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

let generateBccHTMLTemplate =
  (PersonalData) => ` <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
        <!--[if gte mso 9]>
        <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="x-apple-disable-message-reformatting">
          <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
          <title></title>

            <style type="text/css">
              @media only screen and (min-width: 620px) {
          .u-row {
            width: 600px !important;
          }
          .u-row .u-col {
            vertical-align: top;
          }

          .u-row .u-col-100 {
            width: 600px !important;
          }

        }

        @media (max-width: 620px) {
          .u-row-container {
            max-width: 100% !important;
            padding-left: 0px !important;
            padding-right: 0px !important;
          }
          .u-row .u-col {
            min-width: 320px !important;
            max-width: 100% !important;
            display: block !important;
          }
          .u-row {
            width: 100% !important;
          }
          .u-col {
            width: 100% !important;
          }
          .u-col > div {
            margin: 0 auto;
          }
        }
        body {
          margin: 0;
          padding: 0;
        }

        table,
        tr,
        td {
          vertical-align: top;
          border-collapse: collapse;
        }

        p {
          margin: 0;
        }

        .ie-container table,
        .mso-container table {
          table-layout: fixed;
        }

        * {
          line-height: inherit;
        }

        a[x-apple-data-detectors="true"] {
          color: inherit !important;
          text-decoration: none !important;
        }

        table, td { color: #000000; } #u_body a { color: #0000ee; text-decoration: underline; }
            </style>

        <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Raleway:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->

        </head>

        <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
          <!--[if IE]><div class="ie-container"><![endif]-->
          <!--[if mso]><div class="mso-container"><![endif]-->
          <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 620px;Margin: 0 auto;background-color: #ffffff;width:100%" cellpadding="0" cellspacing="0">
          <tbody>
          <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->

        <div class="u-row-container" style="padding: 0px;background-color: transparent">
          <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
            <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->

        <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
          <div style="height: 100%;width: 100% !important;">
          <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->

        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 0px;font-family:arial,helvetica,sans-serif;" align="left">

          <div style="font-family: "Raleway",sans-serif; line-height: 140%; text-align: justify; word-wrap: break-word;">
            <p style="line-height: 140%;text-align: justify;">We have received a completed Online Discovery Form  for <strong> ${PersonalData.preferredName} ${PersonalData.partnerPreferredName? ` and ${PersonalData.partnerPreferredName}`:``} </strong> through our website.  Attached is a copy of their  results.  The clients details are as follows:</p>
          </div>

              </td>
            </tr>
          </tbody>
        </table>

        <table id="u_body" style="padding: 0px 30px; border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 300px;Margin: 0 auto;background-color: #ffffff;width:100%" cellpadding="0" cellspacing="0">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
          <div class="u-row-container" style="padding: 0px;background-color: transparent">
            <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 700px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
              <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                <div class="u-col u-col-100" style="max-width: 320px;min-width: 700px;display: table-cell;vertical-align: top;">
                  <div style="height: 100%;width: 100% !important;">
                    <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">

                      <!-- Table with Personal Information -->
                      <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;" border="1">
                        <thead>
                          <tr style="  background-color: #36b446;color:white">
                            <th style="padding: 10px; ">Personal Info</th>
                            <th style="padding: 10px;">Client</th>
                            <th style="padding: 10px;">Partner</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style="padding: 10px;">First Name</td>
                            <td style="padding: 10px;">${PersonalData.firstName || "N/A"}</td>
                            <td style="padding: 10px;">${PersonalData.partnerFirstName || "N/A"}</td>
                          </tr>
                          <tr>
                            <td style="padding: 10px;">Surname</td>
                            <td style="padding: 10px;">${PersonalData.surName || "N/A"}</td>
                            <td style="padding: 10px;">${PersonalData.partnerSurName|| "N/A"}</td>
                          </tr>
                          <tr>
                            <td style="padding: 10px;">Preferred Name</td>
                            <td style="padding: 10px;">${PersonalData.preferredName || "N/A"}</td>
                            <td style="padding: 10px;">${PersonalData.partnerPreferredName || "N/A"}</td>
                          </tr>
                          <tr>
                            <td style="padding: 10px;">DOB</td>
                            <td style="padding: 10px;">${PersonalData.DOB || "N/A"}</td>
                            <td style="padding: 10px;">${PersonalData.partnerDOB || "N/A"}</td>
                          </tr>
                          <tr>
                            <td style="padding: 10px;">Email</td>
                            <td style="padding: 10px;">${PersonalData.email || "N/A"}</td>
                            <td style="padding: 10px;">${PersonalData.partnerEmail || "N/A"}</td>
                          </tr>
                          <tr>
                            <td style="padding: 10px;">Phone Number</td>
                            <td style="padding: 10px;">${PersonalData.phoneNumber || "N/A"}</td>
                            <td style="padding: 10px;">${PersonalData.partnerPhoneNumber || "N/A"}</td>
                          </tr>
                        </tbody>
                      </table>

         <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 0px ;font-family:arial,helvetica,sans-serif;" align="left">

          <div style="font-family: "Raleway",sans-serif; line-height: 120%; text-align: justify; word-wrap: break-word;">
          <img style="width: 100px; height: auto;" src="cid:image001" alt="Image"/>
          </div>

              </td>
            </tr>
          </tbody>
        </table>

        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">

          <div style="font-family: "Raleway",sans-serif; font-size: 9px; line-height: 140%; text-align: justify; word-wrap: break-word;">
            <p style="line-height: 140%; text-align: justify;font-size: 9px;">You received this email because you have downloaded a resource from our website.This email contains information that is general in nature and does not take into account the objectives, financial situation or needs of any particular person. It does not represent legal, tax, or personal advice and should not be relied on as such. You should obtain financial advice relevant to your circumstances before making any decisions.</p>
          </div>

              </td>
            </tr>
          </tbody>
        </table>

        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">

          <div style="font-family: "Raleway",sans-serif; font-size: 9px; line-height: 140%; text-align: justify; word-wrap: break-word;">
            <p style="line-height: 140%; text-align: justify; font-size: 9px;">Denaro Wealth Pty Ltd, ABN 23 625 686 464. Corporate Authorised Representative (NO. 1263750) of Lifespan Financial Planning Pty Ltd ABN 23 065 921 735, Australian Financial Services Licensee and Australian Credit Licence No. 229892.</p>
          </div>

              </td>
            </tr>
          </tbody>
        </table>

        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">

          <div style="font-family: "Raleway",sans-serif; font-size: 9px; line-height: 140%; text-align: justify; word-wrap: break-word;">
            <p style="line-height: 140%; font-size: 9px;">Ground Floor, Corporate One, 84 Hotham Street, Preston VIC 3072.</p>
          </div>

              </td>
            </tr>
          </tbody>
        </table>

          <!--[if mso]></div><![endif]-->
          <!--[if IE]></div><![endif]-->
        </body>

        </html>`;

// let generateBccHTMLTemplate = (
//   PersonalData
// ) => ` <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
//         <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
//         <head>
//         <!--[if gte mso 9]>
//         <xml>
//           <o:OfficeDocumentSettings>
//             <o:AllowPNG/>
//             <o:PixelsPerInch>96</o:PixelsPerInch>
//           </o:OfficeDocumentSettings>
//         </xml>
//         <![endif]-->
//           <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <meta name="x-apple-disable-message-reformatting">
//           <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
//           <title></title>
          
//             <style type="text/css">
//               @media only screen and (min-width: 820px) {
//           .u-row {
//             width: 600px !important;
//           }
//           .u-row .u-col {
//             vertical-align: top;
//           }
        
//           .u-row .u-col-100 {
//             width: 600px !important;
//           }
        
//         }
        
//         @media (max-width: 820px) {
//           .u-row-container {
//             max-width: 100% !important;
//             padding-left: 0px !important;
//             padding-right: 0px !important;
//           }
//           .u-row .u-col {
//             min-width: 320px !important;
//             max-width: 100% !important;
//             display: block !important;
//           }
//           .u-row {
//             width: 100% !important;
//           }
//           .u-col {
//             width: 100% !important;
//           }
//           .u-col > div {
//             margin: 0 auto;
//           }
//         }
//         body {
//           margin: 0;
//           padding: 0;
//         }
        
//         table,
//         tr,
//         td {
//           vertical-align: top;
//           border-collapse: collapse;
//         }
        
//         p {
//           margin: 0;
//         }
        
//         .ie-container table,
//         .mso-container table {
//           table-layout: fixed;
//         }
        
//         * {
//           line-height: inherit;
//         }
        
//         a[x-apple-data-detectors="true"] {
//           color: inherit !important;
//           text-decoration: none !important;
//         }
        
//         table, td { color: #000000; } #u_body a { color: #0000ee; text-decoration: underline; }
//             </style>
          
          
        
//         <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Raleway:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->
        
//         </head>
        
//         <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
//           <!--[if IE]><div class="ie-container"><![endif]-->
//           <!--[if mso]><div class="mso-container"><![endif]-->
//           <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 820px;Margin: 0 auto;background-color: #ffffff;width:100%" cellpadding="0" cellspacing="0">
//           <tbody>
//           <tr style="vertical-align: top">
//             <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
//             <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->
            
        
//         <div class="u-row-container" style="padding: 0px;background-color: transparent">
//           <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
//             <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
//               <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
              
//         <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//         <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
//           <div style="height: 100%;width: 100% !important;">
//           <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
          
       
        
//         <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
//           <tbody>
//             <tr>
//               <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 0px;font-family:arial,helvetica,sans-serif;" align="left">
                
//           <div style="font-family: "Raleway",sans-serif; line-height: 140%; text-align: justify; word-wrap: break-word;">
//             <p style="line-height: 140%;text-align: justify;">We have received a completed Online Discovery Form  for <strong> ${
//               PersonalData.preferredName
//             } ${
//   PersonalData.partnerPreferredName
//     ? ` and ${PersonalData.partnerPreferredName}`
//     : ``
// }and </strong> through our website.  Attached is a copy of their  results.  The clients details are as follows:</p>
//           </div>
        
//               </td>
//             </tr>
//           </tbody>
//         </table>

//         <table id="u_body" style="padding: 0px 30px; border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 600px;Margin: 0 auto;background-color: #ffffff;width:100%" cellpadding="0" cellspacing="0">
//     <tbody>
//       <tr style="vertical-align: top">
//         <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
//           <div class="u-row-container" style="padding: 0px;background-color: transparent">
//             <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
//               <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
//                 <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
//                   <div style="height: 100%;width: 100% !important;">
//                     <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">

//                       <!-- Table with Personal Information -->
//                       <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;" border="1">
//                         <thead>
//                           <tr style="  background-color: #36b446;color:white">
//                             <th style="padding: 10px; ">Personal Info</th>
//                             <th style="padding: 10px;">Client</th>
//                             <th style="padding: 10px;">Partner</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           <tr>
//                             <td style="padding: 10px;">First Name</td>
//                             <td style="padding: 10px;">${
//                               PersonalData.firstName || "N/A"
//                             }</td>
//                             <td style="padding: 10px;">${
//                               PersonalData.partnerFirstName || "N/A"
//                             }</td>
//                           </tr>
//                           <tr>
//                             <td style="padding: 10px;">Last Name</td>
//                             <td style="padding: 10px;">${
//                               PersonalData.lastName || "N/A"
//                             }</td>
//                             <td style="padding: 10px;">${
//                               PersonalData.partnerLastName || "N/A"
//                             }</td>
//                           </tr>
//                           <tr>
//                             <td style="padding: 10px;">Preferred Name</td>
//                             <td style="padding: 10px;">${
//                               PersonalData.preferredName || "N/A"
//                             }</td>
//                             <td style="padding: 10px;">${
//                               PersonalData.partnerPreferredName || "N/A"
//                             }</td>
//                           </tr>
//                           <tr>
//                             <td style="padding: 10px;">Email Address</td>
//                             <td style="padding: 10px;">${
//                               PersonalData.email || "N/A"
//                             }</td>
//                             <td style="padding: 10px;">${
//                               PersonalData.partnerEmail || "N/A"
//                             }</td>
//                           </tr>
//                           <tr>
//                             <td style="padding: 10px;">Phone Number</td>
//                             <td style="padding: 10px;">${
//                               PersonalData.phone || "N/A"
//                             }</td>
//                             <td style="padding: 10px;">${
//                               PersonalData.partnerPhone || "N/A"
//                             }</td>
//                           </tr>
//                           <tr>
//                             <td style="padding: 10px;">Date of Birth</td>
//                             <td style="padding: 10px;">${
//                               PersonalData.dob || "N/A"
//                             }</td>
//                             <td style="padding: 10px;">${
//                               PersonalData.partnerDob || "N/A"
//                             }</td>
//                           </tr>
//                         </tbody>
//                       </table>

//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </td>
//       </tr>
//     </tbody>
//   </table>
//           <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
//           <tbody>
//             <tr>
//               <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                
//           <div style="font-family: "Raleway",sans-serif; font-size: 9px; line-height: 140%; text-align: justify; word-wrap: break-word;">
//             <p style="line-height: 140%; text-align: justify;font-size: 9px;">You received this email because you have downloaded a resource from our website.This email contains information that is general in nature and does not take into account the objectives, financial situation or needs of any particular person. It does not represent legal, tax, or personal advice and should not be relied on as such. You should obtain financial advice relevant to your circumstances before making any decisions.</p>
//           </div>
        
//               </td>
//             </tr>
//           </tbody>
//         </table>
        
//         <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
//           <tbody>
//             <tr>
//               <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                
//           <div style="font-family: "Raleway",sans-serif; font-size: 9px; line-height: 140%; text-align: justify; word-wrap: break-word;">
//             <p style="line-height: 140%; text-align: justify; font-size: 9px;">Denaro Wealth Pty Ltd, ABN 23 625 686 464. Corporate Authorised Representative (NO. 1263750) of Lifespan Financial Planning Pty Ltd ABN 23 065 921 735, Australian Financial Services Licensee and Australian Credit Licence No. 229892.</p>
//           </div>
        
//               </td>
//             </tr>
//           </tbody>
//         </table>
        
//         <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
//           <tbody>
//             <tr>
//               <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                
//           <div style="font-family: "Raleway",sans-serif; font-size: 9px; line-height: 140%; text-align: justify; word-wrap: break-word;">
//             <p style="line-height: 140%; font-size: 9px;">Ground Floor, Corporate One, 84 Hotham Street, Preston VIC 3072.</p>
//           </div>
        
//               </td>
//             </tr>
//           </tbody>
//         </table>
        
       
//           <!--[if mso]></div><![endif]-->
//           <!--[if IE]></div><![endif]-->
//         </body>
        
//         </html>
//   `;

// export { generateBccHTMLTemplate };

let generateClientHTMLTemplate = (
  PersonalData
) => ` <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
        <!--[if gte mso 9]>
        <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="x-apple-disable-message-reformatting">
          <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
          <title></title>
          
            <style type="text/css">
              @media only screen and (min-width: 520px) {
          .u-row {
            width: 500px !important;
          }
          .u-row .u-col {
            vertical-align: top;
          }
        
          .u-row .u-col-100 {
            width: 500px !important;
          }
        
        }
        
        @media (max-width: 520px) {
          .u-row-container {
            max-width: 100% !important;
            padding-left: 0px !important;
            padding-right: 0px !important;
          }
          .u-row .u-col {
            min-width: 320px !important;
            max-width: 100% !important;
            display: block !important;
          }
          .u-row {
            width: 100% !important;
          }
          .u-col {
            width: 100% !important;
          }
          .u-col > div {
            margin: 0 auto;
          }
        }
        body {
          margin: 0;
          padding: 0;
        }
        
        table,
        tr,
        td {
          vertical-align: top;
          border-collapse: collapse;
        }
        
        p {
          margin: 0;
        }
        
        .ie-container table,
        .mso-container table {
          table-layout: fixed;
        }
        
        * {
          line-height: inherit;
        }
        
        a[x-apple-data-detectors="true"] {
          color: inherit !important;
          text-decoration: none !important;
        }
        
        table, td { color: #000000; } #u_body a { color: #0000ee; text-decoration: underline; }
            </style>
          
          
        
        <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Raleway:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->
        
        </head>
        
        <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
          <!--[if IE]><div class="ie-container"><![endif]-->
          <!--[if mso]><div class="mso-container"><![endif]-->
          <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%" cellpadding="0" cellspacing="0">
          <tbody>
          <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->
            
        
        <div class="u-row-container" style="padding: 0px;background-color: transparent">
          <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
            <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
              
        <!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
        <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
          <div style="height: 100%;width: 100% !important;">
          <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
          
        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                
          <div style="font-family: "Raleway",sans-serif; line-height: 140%; text-align: left; word-wrap: break-word;">
            <p style="line-height: 140%;">Hi ${PersonalData.preferredName},</p>
          </div>
        
              </td>
            </tr>
          </tbody>
        </table>
        
        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                
          <div style="font-family: "Raleway",sans-serif; line-height: 140%; text-align: justify; word-wrap: break-word;">
            <p style="line-height: 140%;text-align: justify;">Thanks for completing the Denaro Wealth Online Discovery Form. Please find attached a copy of your results.</p>
          </div>
        
              </td>
            </tr>
          </tbody>
        </table>

        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                
          <div style="font-family: "Raleway",sans-serif; line-height: 140%; text-align: justify; word-wrap: break-word;">
            <p style="line-height: 140%;text-align: justify;">We will review your details in preparation for our initial complimentary discovery meeting and tailor the session to your needs. If we need any additional information, we’ll reach out beforehand.</p>
          </div>
        
              </td>
            </tr>
          </tbody>
        </table>
        
        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                
          <div style="font-family: "Raleway",sans-serif; line-height: 140%; text-align: justify; word-wrap: break-word;">
            <p style="line-height: 140%; text-align: justify;">If you have any questions in the meantime, feel free to get in touch with us on 03 9070 0116 or at <span style="color: #000000; line-height: 19.6px;"> <span style="line-height: 19.6px; color: #2dc26b;"><a rel="noopener" href="mailto:admin@denarowealth.com.au" target="_blank" style="color: #2dc26b;"><span style="text-decoration: underline; line-height: 19.6px;">admin@denarowealth.com.au</span></a></span></span></p>
          </div>
        
              </td>
            </tr>
          </tbody>
        </table>
        
        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                
          <div style="font-family: "Raleway",sans-serif; line-height: 140%; text-align: justify; word-wrap: break-word;">
            <p style="line-height: 140%; text-align: justify;">We look forward to speaking with you soon!</p>
          </div>
        
              </td>
            </tr>
          </tbody>
        </table>


         <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                
          <div style="font-family: "Raleway",sans-serif; line-height: 140%; text-align: justify; word-wrap: break-word;">
          <img style="width: 150px; height: auto;" src="cid:image001" alt="Image"/>
          </div>
        
              </td>
            </tr>
          </tbody>
        </table>
        
    
        
       
        
        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                
          <div style="font-family: "Raleway",sans-serif; font-size: 9px; line-height: 140%; text-align: justify; word-wrap: break-word;">
            <p style="line-height: 140%; text-align: justify;font-size: 9px;">You received this email because you have downloaded a resource from our website.This email contains information that is general in nature and does not take into account the objectives, financial situation or needs of any particular person. It does not represent legal, tax, or personal advice and should not be relied on as such. You should obtain financial advice relevant to your circumstances before making any decisions.</p>
          </div>
        
              </td>
            </tr>
          </tbody>
        </table>
        
        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                
          <div style="font-family: "Raleway",sans-serif; font-size: 9px; line-height: 140%; text-align: justify; word-wrap: break-word;">
            <p style="line-height: 140%; text-align: justify; font-size: 9px;">Denaro Wealth Pty Ltd, ABN 23 625 686 464. Corporate Authorised Representative (NO. 1263750) of Lifespan Financial Planning Pty Ltd ABN 23 065 921 735, Australian Financial Services Licensee and Australian Credit Licence No. 229892.</p>
          </div>
        
              </td>
            </tr>
          </tbody>
        </table>
        
        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                
          <div style="font-family: "Raleway",sans-serif; font-size: 9px; line-height: 140%; text-align: justify; word-wrap: break-word;">
            <p style="line-height: 140%; font-size: 9px;">Ground Floor, Corporate One, 84 Hotham Street, Preston VIC 3072.</p>
          </div>
        
              </td>
            </tr>
          </tbody>
        </table>
        
       
          <!--[if mso]></div><![endif]-->
          <!--[if IE]></div><![endif]-->
        </body>
        
        </html>`;
