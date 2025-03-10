import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMagicLinkEmail = async (
  email: string,
  token: string,
  url: string
) => {
  await resend.emails.send({
    from: "account@mail.bsws.in",
    to: email,

    subject: "Sign In",
    html: `
      <a href="${token}">token</a>
      <a href="${url}">Click here to Sign In</a>
    `,
  });
 
};
