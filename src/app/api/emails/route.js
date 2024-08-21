import nodemailer from 'nodemailer';

export async function POST(req) {

  // let formData=await JSON.parse(sessionStorage.getItem("PersonalData"));
  // console.log("formData: ",formData);
  try {
    // Parse the JSON body
    const { to, subject, text, base64PDF } = await req.json();

   

    // Log the received PDF data
    // console.log('Received PDF (base64):', base64PDF);

    // Log a shorter version if needed, to avoid cluttering the console
    // console.log('Received PDF (base64 - first 100 chars):', base64PDF.slice(0, 100));

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'fahadtech.fts@gmail.com',
        pass: 'szmb rvdp fuhg ydpb',
      },
      tls: {
        rejectUnauthorized: false, // Bypass self-signed certificate error
      },
    });
   
    // subject = `Pre-Assessment-Calculator-${formData.preferredName}`;
    // Define mail options
    const mailOptions = {
      from: 'fahadtech.fts@gmail.com',
      to,
      bcc:"usamafaheem80@gmail.com",
      subject,
      text,
      attachments: [
        {
          filename: 'Your Pre-Assessment Report.pdf',
          content: base64PDF.split('base64,')[1],
          encoding: 'base64',
        },
      ],
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: 'Email sent successfully!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending email:', error);

    return new Response(JSON.stringify({ message: 'Error sending email', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}