import { NextRequest, NextResponse } from "next/server";
import { conn } from "@/models/mongo_db_connection";
import { mail_options, transporter } from "@/components/emails/email_options";
import { render } from "@react-email/render";
import { Contact_Form } from "@/components/emails/contact";
import { admin_email } from "@/utils/data";
export const dynamic = "force-dynamic";
export async function POST(req: NextRequest) {
  try {
    await conn();
    const { name, email, message } = await req.json();

    const contact_email = mail_options({
      from: '"UNIVORA" <notifications@univora.co.ke>',
      to: admin_email,
      subject: "Form Submission",
      html: render(
        Contact_Form({
          name,
          email,
          message,
        })
      ),
    });
    await Promise.all([transporter.sendMail(contact_email)]);

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
