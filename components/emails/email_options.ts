const nodeMailer = require(`nodemailer`);
export let transporter = nodeMailer.createTransport({
  host: "smtp.zoho.com",
  secure: true,
  port: 465,
  auth: {
    user: "notifications@univora.co.ke",
    pass: process.env.EMAIL_PASSWORD_NOTIFICATIONS,
  },
});
interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export function mail_options({
  from,
  to,
  subject,
  html,
}: {
  from: string;
  to: string;
  subject: string;
  html: string;
}): EmailOptions {
  return {
    from,
    to,
    subject,
    html,
  };
}
