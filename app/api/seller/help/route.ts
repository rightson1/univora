import { verifyIdToken } from "@/utils/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

const nodeMailer = require(`nodemailer`);
export async function POST(req: NextRequest, res: NextResponse) {
  await verifyIdToken(req);
  const { subject, message, email, sellerName } = await req.json();
  if (!subject || !message || !email || !sellerName) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }
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
    from: '"Univora Help" <notifications@univora.co.ke>',
    replyTo: email,
    to: "chari.rightson@gmail.com",
    subject: subject,
    html: `There is a new message from ${sellerName}, email ${email} <br> ${message}`,
  };
  console.log(mailOptions);
  const result = await transporter.sendMail(mailOptions);

  return NextResponse.json(result);
}
