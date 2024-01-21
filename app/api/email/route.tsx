import { NextRequest, NextResponse } from "next/server";
// import { Resend } from "resend";
const nodeMailer = require(`nodemailer`);
export async function GET(req: NextRequest, res: NextResponse) {
  let transporter = nodeMailer.createTransport({
    host: "smtp.zoho.com",
    secure: true,
    port: 465,
    auth: {
      user: "notifications@univora.co.ke",
      pass: process.env.EMAIL_PASSWORD_NOTIFICATIONS,
    },
  });
  const mailOptions = {
    from: '"Univora" <notifications@univora.co.ke>',
    to: "chari.rightson@gmail.com",
    subject: "Test Email",
    html: `
    <h1>
    Hello There
    </h1>
    <p>
    You have a new order from Rightsons Store
    </p>
    `,
  };
  const result = await transporter.sendMail(mailOptions);

  return NextResponse.json(result);
}
